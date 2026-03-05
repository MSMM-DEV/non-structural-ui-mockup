/* ============================================================
   ElevateNOLA — Application Logic
   UI Mockup — All interactions, maps, charts, animations
   ============================================================ */

// ==================== STATE ====================
let currentScreen = 'login';
let currentRole = null;
let screenHistory = [];
let homeownerMap = null;
let inspectorMap = null;
let adminHeatmap = null;
let burnRateChart = null;
let photosUploaded = 0;

// ==================== MOCK DATA ====================
const mockProperties = [
  { id: 1, addr: '1247 Cypress Creek Dr', city: 'Mandeville', zip: '70471', status: 'green', lat: 30.3585, lng: -90.0654, type: 'Elevation Survey', owner: 'M. Thi****ux', score: 72 },
  { id: 2, addr: '892 Magnolia Blvd', city: 'Slidell', zip: '70458', status: 'blue', lat: 30.2752, lng: -89.7811, type: 'Environmental', owner: 'J. Bou****rd', score: 81 },
  { id: 3, addr: '3401 Pontchartrain Dr', city: 'Slidell', zip: '70458', status: 'blue', lat: 30.2844, lng: -89.7709, type: 'Cultural / Historic', owner: 'R. Lan****ry', score: 65 },
  { id: 4, addr: '567 Oak Harbor Blvd', city: 'Slidell', zip: '70461', status: 'yellow', lat: 30.2820, lng: -89.7935, type: 'Structural', owner: 'C. Dub****is', score: 58 },
  { id: 5, addr: '2100 Pine St', city: 'Covington', zip: '70433', status: 'grey', lat: 30.4854, lng: -90.1009, type: 'Elevation Survey', owner: 'P. Gui****ot', score: null },
  { id: 6, addr: '445 Bayou Ln', city: 'Mandeville', zip: '70471', status: 'green', lat: 30.3621, lng: -90.0823, type: 'Structural', owner: 'A. Fon****ot', score: 77 },
  { id: 7, addr: '1890 Lakeshore Dr', city: 'Mandeville', zip: '70448', status: 'orange', lat: 30.3685, lng: -90.0975, type: 'Elevation Survey', owner: 'L. Tra****an', score: 44 },
  { id: 8, addr: '302 Fremaux Ave', city: 'Slidell', zip: '70458', status: 'green', lat: 30.2781, lng: -89.7746, type: 'Environmental', owner: 'D. Ric****rd', score: 83 },
  { id: 9, addr: '718 Tchefuncte Rd', city: 'Covington', zip: '70433', status: 'grey', lat: 30.4766, lng: -90.1110, type: 'Elevation Survey', owner: 'S. Mor****au', score: null },
  { id: 10, addr: '1555 Hwy 190', city: 'Covington', zip: '70433', status: 'yellow', lat: 30.4700, lng: -90.0960, type: 'Structural', owner: 'K. Ber****nd', score: 61 },
  { id: 11, addr: '200 Marina Del Rey', city: 'Mandeville', zip: '70471', status: 'orange', lat: 30.3720, lng: -90.0710, type: 'Environmental', owner: 'W. Leb****nc', score: 39 },
  { id: 12, addr: '4120 Gause Blvd', city: 'Slidell', zip: '70461', status: 'green', lat: 30.2890, lng: -89.7550, type: 'Elevation Survey', owner: 'N. Pet****rs', score: 79 },
  { id: 13, addr: '1612 W 21st Ave', city: 'Covington', zip: '70433', status: 'green', lat: 30.4830, lng: -90.1065, type: 'Structural', owner: 'T. Heb****rt', score: 74 },
  { id: 14, addr: '508 N Columbia St', city: 'Covington', zip: '70433', status: 'yellow', lat: 30.4870, lng: -90.1038, type: 'Environmental', owner: 'B. Bre****ux', score: 55 },
  { id: 15, addr: '2745 Bayou Liberty Rd', city: 'Slidell', zip: '70460', status: 'grey', lat: 30.3120, lng: -89.8200, type: 'Elevation Survey', owner: 'E. The****ot', score: null },
  { id: 16, addr: '119 Jahncke Ave', city: 'Covington', zip: '70433', status: 'blue', lat: 30.4810, lng: -90.0990, type: 'Cultural / Historic', owner: 'M. Cha****on', score: 69 },
  { id: 17, addr: '4502 Pontchartrain Dr', city: 'Slidell', zip: '70458', status: 'green', lat: 30.2780, lng: -89.7620, type: 'Elevation Survey', owner: 'D. Gui****ry', score: 85 },
  { id: 18, addr: '780 Girod St', city: 'Mandeville', zip: '70448', status: 'orange', lat: 30.3745, lng: -90.0880, type: 'Structural', owner: 'J. Tra****an', score: 42 },
  { id: 19, addr: '1220 Lafitte St', city: 'Slidell', zip: '70458', status: 'yellow', lat: 30.2830, lng: -89.7880, type: 'Environmental', owner: 'C. Ric****ux', score: 50 },
  { id: 20, addr: '305 E Rutland St', city: 'Covington', zip: '70433', status: 'green', lat: 30.4890, lng: -90.0940, type: 'Elevation Survey', owner: 'A. Mel****on', score: 76 },
  { id: 21, addr: '2888 Old Spanish Trl', city: 'Slidell', zip: '70461', status: 'blue', lat: 30.2860, lng: -89.8050, type: 'Structural', owner: 'R. Fav****ot', score: 88 },
  { id: 22, addr: '617 Gerard St', city: 'Mandeville', zip: '70448', status: 'grey', lat: 30.3610, lng: -90.0750, type: 'Environmental', owner: 'L. Dub****is', score: null },
  { id: 23, addr: '1401 Front St', city: 'Slidell', zip: '70458', status: 'green', lat: 30.2770, lng: -89.7700, type: 'Cultural / Historic', owner: 'H. Bla****rd', score: 71 },
  { id: 24, addr: '950 N Causeway Blvd', city: 'Mandeville', zip: '70471', status: 'yellow', lat: 30.3650, lng: -90.0680, type: 'Elevation Survey', owner: 'F. Ste****ns', score: 63 },
];

// House photos for property detail and upload mock
const houseImages = {
  front: 'Images/0f2ac102cc1af419c9b7642b03c83b8d-cc_ft_1536.jpg',
  back: 'Images/9109c9b248e8959b195c348ea478fef0-cc_ft_1536.jpg',
  left: 'Images/5acbce5a520e42e755492dfc478887d9-cc_ft_1536.jpg',
  right: 'Images/genIslnoResize.2542662_0.webp'
};

const statusLabels = {
  grey: 'No Response',
  yellow: 'In Progress',
  green: 'ROE Signed',
  blue: 'Inspected',
  orange: 'Construction'
};

// ==================== NAVIGATION ====================
function navigateTo(screenId) {
  const prevScreen = document.getElementById('screen-' + currentScreen);
  const nextScreen = document.getElementById('screen-' + screenId);
  if (!prevScreen || !nextScreen || currentScreen === screenId) return;

  screenHistory.push(currentScreen);
  prevScreen.classList.remove('active');
  prevScreen.classList.add('exit-left');
  setTimeout(() => prevScreen.classList.remove('exit-left'), 500);

  nextScreen.classList.add('active');
  currentScreen = screenId;

  updateNav();
  updateStepper();

  // Trigger screen-specific init
  if (screenId === 'inspector-map') initInspectorMap();
  if (screenId === 'admin') initAdminDashboard();
  if (screenId === 'verification') runVerificationAnimation();
  if (screenId === 'report') animateReport();
}

function goBack() {
  if (screenHistory.length === 0) return;
  const prevId = screenHistory.pop();
  const currScreen = document.getElementById('screen-' + currentScreen);
  const prevScreen = document.getElementById('screen-' + prevId);

  currScreen.classList.remove('active');
  prevScreen.classList.add('active');
  currentScreen = prevId;
  updateNav();
  updateStepper();
}

function updateNav() {
  const nav = document.getElementById('app-nav');
  const badge = document.getElementById('nav-role-badge');
  const stepper = document.getElementById('mobile-stepper');
  const backBtn = document.getElementById('nav-back-btn');

  if (currentScreen === 'login') {
    nav.classList.add('hidden');
    return;
  }
  nav.classList.remove('hidden');

  // Show role badge
  if (currentRole === 'homeowner') badge.textContent = 'Homeowner';
  else if (currentRole === 'inspector') badge.textContent = 'Inspector';
  else if (currentRole === 'admin') badge.textContent = 'Admin';

  // Show stepper only for homeowner flow
  const homeownerScreens = ['homeowner-landing', 'verification', 'docusign', 'photo-upload', 'report'];
  const showStepper = currentRole === 'homeowner' && homeownerScreens.includes(currentScreen);
  if (showStepper) {
    stepper.classList.remove('hidden');
    document.body.classList.add('stepper-visible');
  } else {
    stepper.classList.add('hidden');
    document.body.classList.remove('stepper-visible');
  }

  // Inspector mobile bottom nav (CSS controls visibility at breakpoints)
  const inspMobileNav = document.getElementById('insp-mobile-nav');
  const inspScreens = ['inspector-map', 'inspector-workorders'];
  if (currentRole === 'inspector' && inspScreens.includes(currentScreen)) {
    inspMobileNav.classList.add('insp-nav-active');
    document.body.classList.add('has-insp-bottom-nav');
    // Update active tab
    document.getElementById('insp-tab-map').classList.toggle('active', currentScreen === 'inspector-map');
    document.getElementById('insp-tab-wo').classList.toggle('active', currentScreen === 'inspector-workorders');
  } else {
    inspMobileNav.classList.remove('insp-nav-active');
    document.body.classList.remove('has-insp-bottom-nav');
  }

  // Show back button
  backBtn.style.display = screenHistory.length > 0 ? 'flex' : 'none';
}

function updateStepper() {
  const steps = document.querySelectorAll('.stepper-step');
  const connectors = document.querySelectorAll('.stepper-connector');
  const screenOrder = ['homeowner-landing', 'verification', 'docusign', 'photo-upload', 'report'];
  const idx = screenOrder.indexOf(currentScreen);
  if (idx === -1) return;

  steps.forEach((step, i) => {
    step.classList.remove('active', 'completed');
    if (i < idx) step.classList.add('completed');
    else if (i === idx) step.classList.add('active');
  });
  connectors.forEach((conn, i) => {
    conn.classList.toggle('filled', i < idx);
  });
}

// ==================== ROLE SELECTION ====================
function selectRole(role) {
  currentRole = role;
  if (role === 'homeowner') navigateTo('homeowner-landing');
  else if (role === 'inspector') navigateTo('inspector-map');
  else if (role === 'admin') navigateTo('admin');
}

// ==================== HOMEOWNER FLOW ====================
function submitHomeownerForm(e) {
  e.preventDefault();
  const name = document.getElementById('ho-name').value;
  const addr = document.getElementById('ho-address').value;
  if (!name || !addr) return;

  // Store for later screens
  window._hoName = name;
  window._hoAddr = addr;

  const btn = document.getElementById('ho-submit-btn');
  btn.disabled = true;
  btn.querySelector('span').textContent = 'Checking...';

  setTimeout(() => {
    btn.disabled = false;
    btn.querySelector('span').textContent = 'Check My Eligibility';
    document.getElementById('ho-map-section').style.display = 'block';
    initHomeownerMap();
    document.getElementById('ho-map-section').scrollIntoView({ behavior: 'smooth' });
  }, 1200);
}

function initHomeownerMap() {
  if (homeownerMap) return;
  homeownerMap = L.map('homeowner-map', {
    zoomControl: false,
    attributionControl: false
  }).setView([30.3585, -90.0654], 16);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 19 }).addTo(homeownerMap);

  // Add property marker
  const markerIcon = L.divIcon({
    className: 'custom-marker green',
    iconSize: [16, 16]
  });
  L.marker([30.3585, -90.0654], { icon: markerIcon }).addTo(homeownerMap);

  // Add pulse effect
  const pulseIcon = L.divIcon({
    className: '',
    html: '<div style="width:40px;height:40px;border-radius:50%;border:2px solid #1B54A4;animation:scanPulse 2s ease-out infinite;position:relative;left:-12px;top:-12px;"></div>',
    iconSize: [16, 16]
  });
  L.marker([30.3585, -90.0654], { icon: pulseIcon }).addTo(homeownerMap);

  setTimeout(() => homeownerMap.invalidateSize(), 300);
}

// ==================== VERIFICATION ====================
function runVerificationAnimation() {
  const scanning = document.getElementById('verify-scanning');
  const result = document.getElementById('verify-result');
  scanning.style.display = 'block';
  result.style.display = 'none';

  const steps = ['ss-1', 'ss-2', 'ss-3', 'ss-4'];
  let delay = 0;

  // Reset all steps
  steps.forEach(id => {
    const el = document.getElementById(id);
    el.classList.remove('active', 'done');
  });
  document.getElementById('ss-1').classList.add('active');

  steps.forEach((id, i) => {
    setTimeout(() => {
      // Mark previous as done
      if (i > 0) {
        document.getElementById(steps[i - 1]).classList.remove('active');
        document.getElementById(steps[i - 1]).classList.add('done');
      }
      document.getElementById(id).classList.add('active');
    }, delay);
    delay += 900;
  });

  // Final step done + show result
  setTimeout(() => {
    document.getElementById(steps[steps.length - 1]).classList.remove('active');
    document.getElementById(steps[steps.length - 1]).classList.add('done');
  }, delay);

  setTimeout(() => {
    scanning.style.display = 'none';
    result.style.display = 'block';
    result.scrollIntoView({ behavior: 'smooth' });

    // Update with user data
    if (window._hoName) {
      document.getElementById('vr-user-name').textContent = window._hoName;
      document.getElementById('ds-name').textContent = window._hoName;
    }
    if (window._hoAddr) {
      document.getElementById('vr-user-addr').textContent = window._hoAddr;
      document.getElementById('ds-addr').textContent = window._hoAddr;
    }
  }, delay + 600);
}

// ==================== DOCUSIGN ====================
function signDocument() {
  const placeholder = document.getElementById('ds-sig-placeholder');
  const signed = document.getElementById('ds-sig-signed');
  const sigArea = document.getElementById('ds-sig-area');
  const dateDisplay = document.getElementById('ds-date-display');
  const sigDate = document.getElementById('ds-sig-date');

  placeholder.style.display = 'none';
  signed.style.display = 'block';
  sigArea.style.borderColor = 'rgba(34,197,94,0.3)';
  sigArea.style.borderStyle = 'solid';

  const now = new Date();
  const dateStr = now.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  dateDisplay.textContent = dateStr;
  sigDate.textContent = dateStr;

  // Update sig text with user name
  if (window._hoName) {
    signed.querySelector('.sig-text').textContent = window._hoName;
  }

  // Confetti!
  setTimeout(() => {
    if (typeof confetti === 'function') {
      confetti({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#1B54A4', '#3478D4', '#16A34A', '#FFD700', '#F97316']
      });
    }
    // Show success card
    const successCard = document.getElementById('docusign-success');
    successCard.style.display = 'block';
    successCard.scrollIntoView({ behavior: 'smooth' });
  }, 400);
}

// ==================== PHOTO UPLOAD ====================
function mockUploadPhoto(zone) {
  if (zone.classList.contains('uploaded')) return;
  zone.classList.add('uploaded');
  zone.querySelector('.pz-inner').style.display = 'none';
  zone.querySelector('.pz-uploaded').style.display = 'flex';

  // Set background image based on side
  const side = zone.dataset.side;
  const thumb = zone.querySelector('.pz-thumb');
  if (side && houseImages[side] && thumb) {
    thumb.style.backgroundImage = `url('${houseImages[side]}')`;
    thumb.style.backgroundSize = 'cover';
    thumb.style.backgroundPosition = 'center';
    thumb.style.borderRadius = '6px';
    thumb.textContent = '';
  }

  photosUploaded++;
  if (photosUploaded >= 4) {
    document.getElementById('analyze-photos-btn').disabled = false;
  }
}

function startAIAnalysis() {
  const overlay = document.getElementById('ai-scan-overlay');
  overlay.style.display = 'flex';

  const items = ['asi-1', 'asi-2', 'asi-3', 'asi-4', 'asi-5', 'asi-6'];
  let delay = 0;

  // Reset
  items.forEach(id => {
    const el = document.getElementById(id);
    el.classList.remove('active', 'done');
  });

  items.forEach((id, i) => {
    setTimeout(() => {
      if (i > 0) {
        document.getElementById(items[i - 1]).classList.remove('active');
        document.getElementById(items[i - 1]).classList.add('done');
      }
      document.getElementById(id).classList.add('active');
    }, delay);
    delay += 800;
  });

  setTimeout(() => {
    document.getElementById(items[items.length - 1]).classList.remove('active');
    document.getElementById(items[items.length - 1]).classList.add('done');
  }, delay);

  setTimeout(() => {
    overlay.style.display = 'none';
    navigateTo('report');
  }, delay + 700);
}

// ==================== REPORT ====================
function animateReport() {
  // Animate score arc
  setTimeout(() => {
    const arc = document.querySelector('.score-arc');
    if (arc) {
      // 72/100 = 72%  → dashoffset = 339.3 * (1 - 0.72) = ~95
      arc.style.strokeDashoffset = '95';
    }
  }, 300);

  // Stagger report cards
  const cards = document.querySelectorAll('.report-card');
  cards.forEach((card, i) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(15px)';
    setTimeout(() => {
      card.style.transition = 'all 400ms ease-out';
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
    }, 400 + i * 120);
  });

  // Update address if available
  if (window._hoAddr) {
    document.getElementById('report-address').textContent = window._hoAddr;
  }
}

// ==================== INSPECTOR MAP ====================
function initInspectorMap() {
  if (inspectorMap) {
    setTimeout(() => inspectorMap.invalidateSize(), 200);
    return;
  }

  inspectorMap = L.map('inspector-map', {
    zoomControl: true,
    attributionControl: false
  }).setView([30.34, -89.95], 11);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 19 }).addTo(inspectorMap);

  // Add property markers
  mockProperties.forEach(prop => {
    const icon = L.divIcon({
      className: 'custom-marker ' + prop.status,
      iconSize: [16, 16]
    });
    const marker = L.marker([prop.lat, prop.lng], { icon });
    marker.on('click', () => openPropertyDetail(prop));
    marker.addTo(inspectorMap);
  });

  // Populate sidebar list
  populatePropertyList();

  // Update legend count
  const legendCount = document.getElementById('legend-count');
  if (legendCount) legendCount.textContent = mockProperties.length + ' properties in view';

  setTimeout(() => inspectorMap.invalidateSize(), 300);
}

function populatePropertyList() {
  const list = document.getElementById('insp-property-list');
  list.innerHTML = '';
  mockProperties.forEach(prop => {
    const item = document.createElement('div');
    item.className = 'insp-prop-item';
    item.innerHTML = `
      <div class="prop-status-dot" style="background:${getStatusColor(prop.status)}"></div>
      <div class="prop-info">
        <strong>${prop.addr}</strong>
        <small>${prop.city} &middot; ${statusLabels[prop.status]}</small>
      </div>
      ${prop.status === 'green' ? '<span class="prop-action">View</span>' : ''}
    `;
    item.addEventListener('click', () => {
      openPropertyDetail(prop);
      // Fly to on map
      if (inspectorMap) inspectorMap.flyTo([prop.lat, prop.lng], 15, { duration: 0.8 });
    });
    list.appendChild(item);
  });
}

function getStatusColor(status) {
  const colors = { grey: '#9CA3AF', yellow: '#FACC15', green: '#22C55E', blue: '#3B82F6', orange: '#F97316' };
  return colors[status] || '#9CA3AF';
}

function openPropertyDetail(prop) {
  const panel = document.getElementById('insp-detail-panel');
  const content = document.getElementById('detail-content');

  const scoreDisplay = prop.score !== null
    ? `<span class="detail-flag">Score: ${prop.score}/100 — ${prop.score >= 70 ? 'Good' : prop.score >= 50 ? 'Moderate' : 'Needs Attention'}</span>`
    : '<span class="detail-flag" style="opacity:0.5">No assessment yet</span>';

  content.innerHTML = `
    <h3>${prop.owner}</h3>
    <p class="detail-addr">${prop.addr}, ${prop.city}, LA ${prop.zip || ''}</p>
    <div class="detail-photos">
      <div class="detail-photo" style="background-image:url('${houseImages.front}')"><span>Front</span></div>
      <div class="detail-photo" style="background-image:url('${houseImages.back}')"><span>Back</span></div>
      <div class="detail-photo" style="background-image:url('${houseImages.left}')"><span>Left</span></div>
      <div class="detail-photo" style="background-image:url('${houseImages.right}')"><span>Right</span></div>
    </div>
    <div class="detail-flags">
      ${scoreDisplay}
      <span class="detail-flag ok">No flood damage</span>
    </div>
    <p style="font-size:0.8rem;color:var(--gray);margin-bottom:12px;">Assessment: ${prop.type}</p>
    <p style="font-size:0.75rem;color:var(--gray);margin-bottom:16px;">Status: <strong style="color:${getStatusColor(prop.status)}">${statusLabels[prop.status]}</strong></p>
    ${prop.status === 'green' ? `
      <button class="btn-primary btn-full" onclick="alert('Inspection scheduled (mock)')">
        <span>Schedule Inspection</span>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
      </button>
    ` : ''}
  `;

  panel.style.display = 'block';
}

function closeDetailPanel() {
  document.getElementById('insp-detail-panel').style.display = 'none';
}

function toggleInspSidebar() {
  const sidebar = document.getElementById('insp-sidebar');
  if (window.innerWidth <= 768) {
    sidebar.classList.toggle('mobile-open');
  } else {
    sidebar.classList.toggle('collapsed');
  }
  setTimeout(() => { if (inspectorMap) inspectorMap.invalidateSize(); }, 350);
}

// ==================== WORK ORDERS ====================
function updateWorkOrderStatus(btn, status) {
  const card = btn.closest('.wo-card');
  const actions = card.querySelectorAll('.wo-action-btn');
  const statusBadge = card.querySelector('.wo-status-badge');

  const now = new Date();
  const timeStr = now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });

  if (status === 'arrived') {
    btn.classList.add('active-state');
    btn.textContent = `Arrived ${timeStr}`;
    btn.disabled = true;
    actions[1].disabled = false;
    statusBadge.className = 'wo-status-badge in-progress';
    statusBadge.textContent = 'In Progress';
  } else if (status === 'progress') {
    btn.classList.add('active-state');
    btn.textContent = `In Progress ${timeStr}`;
    btn.disabled = true;
    actions[2].disabled = false;
  } else if (status === 'complete') {
    btn.classList.add('active-state');
    btn.textContent = `Complete ${timeStr}`;
    btn.disabled = true;
    statusBadge.className = 'wo-status-badge completed';
    statusBadge.textContent = 'Completed';
  }
}

// ==================== ADMIN DASHBOARD ====================
function initAdminDashboard() {
  animateKPIs();
  animateFunnel();
  animateBurnRateOverview();
  initBurnRateChart();
  initROEPieChart();
  initAdminHeatmap();
}

// Burn Rate Overview gauge animation
function animateBurnRateOverview() {
  const pctEl = document.getElementById('bro-gauge-pct');
  if (!pctEl) return;

  // Animate the percentage counter 0 -> 8.3
  const target = 8.3;
  const startTime = performance.now();
  const duration = 1500;

  function updatePct(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = (target * eased).toFixed(1);
    pctEl.textContent = current + '%';
    if (progress < 1) requestAnimationFrame(updatePct);
  }
  requestAnimationFrame(updatePct);

  // The arc stroke-dashoffset is already set in HTML for the final state
  // 326.7 total circumference, 8.3% = 326.7 * (1 - 0.083) = ~299.6
  // Animate from full offset (326.7) to target (299.8)
  const arc = document.querySelector('.bro-arc');
  if (arc) {
    arc.style.strokeDashoffset = '326.7';
    setTimeout(() => {
      arc.style.strokeDashoffset = '299.8';
    }, 100);
  }

  // AI Predicted gauge: 19.5% = 326.7 * (1 - 0.195) = ~263.0
  const aiPctEl = document.getElementById('bro-gauge-ai-pct');
  if (aiPctEl) {
    const aiTarget = 19.5;
    const aiStart = performance.now();
    function updateAiPct(currentTime) {
      const elapsed = currentTime - aiStart;
      const progress = Math.min(elapsed / 1500, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      aiPctEl.textContent = (aiTarget * eased).toFixed(1) + '%';
      if (progress < 1) requestAnimationFrame(updateAiPct);
    }
    requestAnimationFrame(updateAiPct);
  }

  const aiArc = document.querySelector('.bro-arc-ai');
  if (aiArc) {
    aiArc.style.strokeDashoffset = '326.7';
    setTimeout(() => {
      aiArc.style.strokeDashoffset = '263.0';
    }, 100);
  }
}

// Schedule form toggle
function toggleScheduleForm() {
  const form = document.getElementById('sr-form-wrap');
  if (form.style.display === 'none') {
    form.style.display = 'block';
    form.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  } else {
    form.style.display = 'none';
  }
}

// Mock save schedule
function mockSaveSchedule() {
  const form = document.getElementById('sr-form-wrap');
  form.style.display = 'none';
  alert('Report schedule created successfully! (mock)');
}

function animateKPIs() {
  const kpiValues = document.querySelectorAll('.kpi-value');
  kpiValues.forEach(el => {
    const target = parseInt(el.dataset.target);
    if (!target) return;
    animateCounter(el, 0, target, 1500);
  });
}

function animateCounter(el, start, end, duration) {
  const startTime = performance.now();
  const diff = end - start;

  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    // Ease out cubic
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = Math.round(start + diff * eased);
    el.textContent = current.toLocaleString();
    if (progress < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}

function animateFunnel() {
  const stages = document.querySelectorAll('.funnel-stage');
  stages.forEach((stage, i) => {
    const width = stage.dataset.width;
    const fill = stage.querySelector('.funnel-fill');
    setTimeout(() => {
      fill.style.width = width + '%';
    }, 200 + i * 150);
  });
}

function initBurnRateChart() {
  if (burnRateChart) return;
  const ctx = document.getElementById('burn-rate-chart');
  if (!ctx) return;

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  burnRateChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: months,
      datasets: [
        {
          label: 'Allocated',
          data: [12, 18, 24, 30, 36, 42, 48, 54, 60, 66, 72, 78],
          borderColor: '#1B54A4',
          backgroundColor: 'rgba(27,84,164,0.06)',
          fill: true,
          tension: 0.4,
          pointRadius: 3,
          pointBackgroundColor: '#1B54A4',
          borderWidth: 2
        },
        {
          label: 'Expended',
          data: [4, 8, 14, 18, 23, 29, 34, 40, null, null, null, null],
          borderColor: '#F97316',
          backgroundColor: 'rgba(249,115,22,0.08)',
          fill: true,
          tension: 0.4,
          pointRadius: 3,
          pointBackgroundColor: '#F97316',
          borderWidth: 2,
          spanGaps: false
        },
        {
          label: 'Projected',
          data: [null, null, null, null, null, null, null, 40, 47, 55, 63, 72],
          borderColor: 'rgba(0,0,0,0.15)',
          borderDash: [6, 4],
          fill: false,
          tension: 0.4,
          pointRadius: 0,
          borderWidth: 1.5,
          spanGaps: true
        },
        {
          label: 'AI Projected Burn Rate',
          data: [null, null, null, null, null, null, null, 40, 50, 62, 76, 94],
          borderColor: '#8B5CF6',
          backgroundColor: 'rgba(139,92,246,0.06)',
          fill: true,
          tension: 0.4,
          pointRadius: 4,
          pointBackgroundColor: '#8B5CF6',
          pointBorderColor: '#FFFFFF',
          pointBorderWidth: 2,
          borderWidth: 2.5,
          borderDash: [2, 3],
          spanGaps: true
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: { intersect: false, mode: 'index' },
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: 'rgba(26,35,50,0.92)',
          titleColor: '#FFFFFF',
          bodyColor: '#C8D0DC',
          borderColor: 'rgba(0,0,0,0.1)',
          borderWidth: 1,
          cornerRadius: 8,
          padding: 10,
          callbacks: {
            label: function(ctx) {
              if (ctx.raw === null) return null;
              return ctx.dataset.label + ': $' + ctx.raw + 'M';
            }
          }
        }
      },
      scales: {
        x: {
          grid: { color: 'rgba(0,0,0,0.05)', drawBorder: false },
          ticks: { color: '#8896A6', font: { size: 11 } }
        },
        y: {
          grid: { color: 'rgba(0,0,0,0.05)', drawBorder: false },
          ticks: {
            color: '#8896A6',
            font: { size: 11 },
            callback: v => '$' + v + 'M'
          },
          beginAtZero: true
        }
      }
    }
  });
}

let roePieChart = null;
function initROEPieChart() {
  if (roePieChart) return;
  const ctx = document.getElementById('roe-pie-chart');
  if (!ctx) return;

  roePieChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ['70458 - Slidell (E)', '70461 - Slidell (W)', '70460 - Pearl River', '70471 - Mandeville', '70448 - Mandeville (S)', '70433 - Covington', '70452 - Madisonville'],
      datasets: [{
        data: [341, 236, 262, 148, 82, 97, 37],
        backgroundColor: [
          '#EF4444',
          '#F97316',
          '#FBBF24',
          '#1B54A4',
          '#3478D4',
          '#8B5CF6',
          '#64748B'
        ],
        borderColor: '#FFFFFF',
        borderWidth: 2.5,
        hoverOffset: 8
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      cutout: '52%',
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            padding: window.innerWidth <= 480 ? 8 : 14,
            usePointStyle: true,
            pointStyle: 'circle',
            font: { family: "'Outfit', sans-serif", size: window.innerWidth <= 480 ? 9 : 11 },
            color: '#4A5B6E',
            boxWidth: window.innerWidth <= 480 ? 8 : 12
          }
        },
        tooltip: {
          backgroundColor: 'rgba(26,35,50,0.92)',
          titleColor: '#FFFFFF',
          bodyColor: '#C8D0DC',
          borderColor: 'rgba(0,0,0,0.1)',
          borderWidth: 1,
          cornerRadius: 8,
          padding: 10,
          callbacks: {
            label: function(ctx) {
              const total = ctx.dataset.data.reduce((a, b) => a + b, 0);
              const pct = ((ctx.raw / total) * 100).toFixed(1);
              return ctx.label + ': ' + ctx.raw + ' (' + pct + '%)';
            }
          }
        }
      },
      animation: {
        animateRotate: true,
        duration: 1200,
        easing: 'easeOutQuart'
      }
    }
  });
}

function initAdminHeatmap() {
  if (adminHeatmap) {
    setTimeout(() => adminHeatmap.invalidateSize(), 200);
    return;
  }

  adminHeatmap = L.map('admin-heatmap', {
    zoomControl: false,
    attributionControl: false
  }).setView([30.38, -89.95], 10);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 19 }).addTo(adminHeatmap);

  // Simulated heatmap via circles
  const heatPoints = [
    { lat: 30.28, lng: -89.78, intensity: 0.9 },
    { lat: 30.35, lng: -90.07, intensity: 0.7 },
    { lat: 30.29, lng: -89.80, intensity: 0.85 },
    { lat: 30.36, lng: -90.09, intensity: 0.5 },
    { lat: 30.48, lng: -90.10, intensity: 0.3 },
    { lat: 30.27, lng: -89.76, intensity: 0.95 },
    { lat: 30.34, lng: -90.05, intensity: 0.65 },
    { lat: 30.31, lng: -89.85, intensity: 0.75 },
    { lat: 30.47, lng: -90.08, intensity: 0.25 },
    { lat: 30.40, lng: -90.00, intensity: 0.4 },
    { lat: 30.33, lng: -89.90, intensity: 0.55 },
    { lat: 30.25, lng: -89.79, intensity: 0.8 },
  ];

  heatPoints.forEach(p => {
    const color = getHeatColor(p.intensity);
    L.circle([p.lat, p.lng], {
      radius: 1800 + p.intensity * 2000,
      fillColor: color,
      fillOpacity: 0.25 + p.intensity * 0.2,
      stroke: false
    }).addTo(adminHeatmap);

    // Inner circle
    L.circle([p.lat, p.lng], {
      radius: 600 + p.intensity * 800,
      fillColor: color,
      fillOpacity: 0.3 + p.intensity * 0.25,
      stroke: false
    }).addTo(adminHeatmap);
  });

  setTimeout(() => adminHeatmap.invalidateSize(), 300);
}

function getHeatColor(intensity) {
  if (intensity > 0.7) return '#EF4444';
  if (intensity > 0.5) return '#F97316';
  if (intensity > 0.3) return '#1B54A4';
  return 'rgba(27,84,164,0.5)';
}

// ==================== HEATMAP TOGGLES ====================
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('hm-toggle')) {
    document.querySelectorAll('.hm-toggle').forEach(t => t.classList.remove('active'));
    e.target.classList.add('active');
  }
  if (e.target.classList.contains('filter-chip')) {
    const parent = e.target.closest('.filter-chips');
    parent.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
    e.target.classList.add('active');
  }
});

// ==================== PARTICLES ====================
function createParticles() {
  const container = document.getElementById('login-particles');
  if (!container) return;
  for (let i = 0; i < 30; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    p.style.left = Math.random() * 100 + '%';
    p.style.top = (40 + Math.random() * 60) + '%';
    p.style.animationDelay = Math.random() * 8 + 's';
    p.style.animationDuration = (6 + Math.random() * 6) + 's';
    const size = 2 + Math.random() * 3;
    p.style.width = size + 'px';
    p.style.height = size + 'px';
    container.appendChild(p);
  }
}

// ==================== INSPECTOR TAB SWITCHING (MOBILE) ====================
function switchInspectorTab(screenId) {
  if (currentScreen === screenId) return;
  // Switch tabs without pushing to history (sibling navigation)
  const prevScreen = document.getElementById('screen-' + currentScreen);
  const nextScreen = document.getElementById('screen-' + screenId);
  if (!prevScreen || !nextScreen) return;

  prevScreen.classList.remove('active');
  prevScreen.classList.add('exit-left');
  setTimeout(() => prevScreen.classList.remove('exit-left'), 500);
  nextScreen.classList.add('active');
  currentScreen = screenId;

  updateNav();
  addInspectorNav();
  if (screenId === 'inspector-map') initInspectorMap();
}

// ==================== INSPECTOR NAV LINKS ====================
// Add work orders nav link for inspector
function addInspectorNav() {
  const breadcrumb = document.getElementById('nav-breadcrumb');
  if (currentRole === 'inspector') {
    breadcrumb.innerHTML = `
      <button class="nav-tab ${currentScreen === 'inspector-map' ? 'active' : ''}" onclick="switchInspectorTab('inspector-map')" style="
        background: none; border: none; color: ${currentScreen === 'inspector-map' ? 'var(--teal)' : 'var(--gray)'};
        font-size: 0.8rem; font-weight: 600; padding: 6px 14px; cursor: pointer; transition: color 0.3s;
        border-bottom: 2px solid ${currentScreen === 'inspector-map' ? 'var(--teal)' : 'transparent'};
      ">Map</button>
      <button class="nav-tab ${currentScreen === 'inspector-workorders' ? 'active' : ''}" onclick="switchInspectorTab('inspector-workorders')" style="
        background: none; border: none; color: ${currentScreen === 'inspector-workorders' ? 'var(--teal)' : 'var(--gray)'};
        font-size: 0.8rem; font-weight: 600; padding: 6px 14px; cursor: pointer; transition: color 0.3s;
        border-bottom: 2px solid ${currentScreen === 'inspector-workorders' ? 'var(--teal)' : 'transparent'};
      ">Work Orders</button>
    `;
  } else {
    breadcrumb.innerHTML = '';
  }
}

// Override navigateTo to also update inspector nav
const _origNavigateTo = navigateTo;
navigateTo = function(screenId) {
  _origNavigateTo(screenId);
  addInspectorNav();
};

// ==================== INIT ====================
document.addEventListener('DOMContentLoaded', () => {
  createParticles();
  updateNav();

  // Pre-fill for demo convenience
  document.getElementById('ho-name').value = 'Maria Thibodaux';
  document.getElementById('ho-address').value = '1247 Cypress Creek Dr, Mandeville, LA 70471';
});
