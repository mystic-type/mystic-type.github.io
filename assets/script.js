// Drag any .os-window by its titlebar.
const desktop = document.getElementById('desktop');
const isMobile = () => window.matchMedia('(max-width: 860px)').matches;
 
let dragging = null;
let offsetX = 0, offsetY = 0;
let topZ = 10;
 
desktop.addEventListener('pointerdown', (e) => {
  const win = e.target.closest('.os-window');
  if (!win) return;
 
  win.style.zIndex = ++topZ;
 
  const titlebar = e.target.closest('.titlebar');
  if (!titlebar || isMobile()) return;
 
  const rect = win.getBoundingClientRect();
  offsetX = e.clientX - rect.left;
  offsetY = e.clientY - rect.top;
  dragging = win;
  titlebar.setPointerCapture(e.pointerId);
});
 
desktop.addEventListener('pointermove', (e) => {
  if (!dragging) return;
  const desk = desktop.getBoundingClientRect();
  const x = Math.max(0, e.clientX - desk.left - offsetX);
  const y = Math.max(0, e.clientY - desk.top - offsetY);
  dragging.style.setProperty('--x', `${x}px`);
  dragging.style.setProperty('--y', `${y}px`);
});
 
desktop.addEventListener('pointerup', () => { dragging = null; });
desktop.addEventListener('pointercancel', () => { dragging = null; });

//online offline
async function updateDiscordStatus() {
  const el = document.getElementById('discord-status');
  try {
    const res = await fetch(`https://api.lanyard.rest/v1/users/268592810045865985`);
    const { data } = await res.json();
    const online = data?.discord_status && data.discord_status !== 'offline';
    el.textContent = online ? 'Yes :D' : 'No :(';
    el.classList.toggle('accent-text', online);
  } catch {
    // landyard is down or something
  }
}

updateDiscordStatus();
setInterval(updateDiscordStatus, 30000);