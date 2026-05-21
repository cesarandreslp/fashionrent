/**
 * VÉSTIER LUXURY RENTALS - app.js
 * Role-based interactive demo
 */

const state = {
  activeRole: null,
  activeSede: 'cali',
  activeTab: 'dashboard',

  dresses: [
    {
      id: 'DG-001', brand: 'Dolce & Gabbana', name: 'Floral Silk Gown',
      size: 'S (6)', status: 'Disponible', quality: 'A+', rentals: 4,
      revenue: 1800000, commercialValue: 12000000, rentPrice: 450000,
      depreciationLimit: 12, composition: '100% Seda Genuina Italiana, forro de satén',
      image: './assets/dg_dress.png', sede: 'cali'
    },
    {
      id: 'LV-002', brand: 'Louis Vuitton', name: 'Structural Evening Dress',
      size: 'M (8)', status: 'Alquilada', quality: 'A', rentals: 3,
      revenue: 1560000, commercialValue: 15000000, rentPrice: 520000,
      depreciationLimit: 10, composition: 'Crepé de lana estructurado, cierres de bronce pulido',
      image: './assets/lv_dress.png', sede: 'cali'
    },
    {
      id: 'VS-003', brand: 'Versace', name: 'Draped Gold Cocktail',
      size: 'S (6)', status: 'Disponible', quality: 'A', rentals: 2,
      revenue: 960000, commercialValue: 9800000, rentPrice: 480000,
      depreciationLimit: 10, composition: 'Malla metálica ligera, forro elástico premium',
      image: './assets/versace_dress.png', sede: 'cali'
    },
    {
      id: 'ST-004', brand: 'Silvia Tcherassi', name: 'Tropical Resort Midi',
      size: 'M (8)', status: 'En Limpieza', quality: 'B+', rentals: 5,
      revenue: 1900000, commercialValue: 7500000, rentPrice: 380000,
      depreciationLimit: 15, composition: 'Lino premium estampado, volantes asimétricos',
      image: './assets/silvia_dress.png', sede: 'cali'
    },
    {
      id: 'CH-005', brand: 'Chanel', name: 'Classic Tweed Dress',
      size: 'S (6)', status: 'Disponible', quality: 'A+', rentals: 1,
      revenue: 600000, commercialValue: 18000000, rentPrice: 600000,
      depreciationLimit: 8, composition: 'Tweed de lana virgen, botones joya grabados',
      image: 'https://images.unsplash.com/photo-1596783074918-c84cb06531ca?q=80&w=400&auto=format&fit=crop',
      sede: 'cali'
    },
    {
      id: 'DR-006', brand: 'Dior', name: 'Organza Midi Dress',
      size: 'XS (4)', status: 'Disponible', quality: 'A+', rentals: 0,
      revenue: 0, commercialValue: 14000000, rentPrice: 420000,
      depreciationLimit: 10, composition: 'Organza plisada de seda, forro interior satinado',
      image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=400&auto=format&fit=crop',
      sede: 'buga'
    }
  ],

  customers: [
    {
      id: 'C-01', name: 'María Claudia Pardo', email: 'mclaudiapardo@outlook.com',
      phone: '315 780 4421', city: 'Santiago de Cali', address: 'B/ Ciudad Jardín, Casa 12',
      size: 'S (6)', vipTier: 'VIP', scoring: 96, history: ['DG-001', 'ST-004'],
      notes: 'Prefiere vestidos largos. Siempre devuelve a tiempo.'
    },
    {
      id: 'C-02', name: 'Natalia Restrepo', email: 'natalia.restrepo@gmail.com',
      phone: '318 450 9988', city: 'Santiago de Cali', address: 'Edificio Torre Real, Apto 902',
      size: 'M (8)', vipTier: 'Platinum VIP', scoring: 100, history: ['LV-002', 'CH-005'],
      notes: 'Clienta ultra-premium. Solo alquila prendas A+ o A.'
    },
    {
      id: 'C-03', name: 'Sofía Gómez', email: 'sofia.gomez11@hotmail.com',
      phone: '312 890 5566', city: 'Guadalajara de Buga', address: 'Calle 5 # 12-40',
      size: 'S (6)', vipTier: 'Estándar', scoring: 72, history: ['ST-004'],
      notes: 'Alquila vestidos midi para eventos campestres.'
    },
    {
      id: 'C-04', name: 'Valentina Varela', email: 'valvarela@yahoo.com',
      phone: '316 453 2211', city: 'Santiago de Cali', address: 'Condominio Pance, Apto 401',
      size: 'XS (4)', vipTier: 'Gold VIP', scoring: 88, history: ['VS-003'],
      notes: 'Talla XS. Diseños audaces y colores metálicos.'
    }
  ],

  bookings: [
    { id: 'B-101', dressId: 'LV-002', customerId: 'C-02', startDate: '2026-05-18', endDate: '2026-05-20', type: 'reserva', sede: 'cali' },
    { id: 'B-101-buf', dressId: 'LV-002', startDate: '2026-05-21', endDate: '2026-05-21', type: 'buffer', sede: 'cali' },
    { id: 'B-102', dressId: 'ST-004', customerId: 'C-03', startDate: '2026-05-19', endDate: '2026-05-21', type: 'reserva', sede: 'cali' },
    { id: 'B-102-buf', dressId: 'ST-004', startDate: '2026-05-22', endDate: '2026-05-22', type: 'buffer', sede: 'cali' }
  ],

  auditLogs: [
    { time: '08:00:15', msg: 'Sistema de auditoría iniciado. <strong>Multisede activo</strong>.' },
    { time: '08:01:22', msg: 'Sincronización con <strong>Neon PostgreSQL</strong> exitosa.' },
    { time: '08:05:00', msg: 'Pasarela <strong>Wompi API v2</strong> conectada.' },
    { time: '08:10:45', msg: 'Agente IA Celia indexado al catálogo.' }
  ]
};

// ── DOM Cache ──
const $ = id => document.getElementById(id);
const $$ = sel => document.querySelectorAll(sel);

let sigCtx = null;
let isDrawingSignature = false;
let signatureSigned = false;
let currentCalendarDate = new Date(2026, 4, 1);

// ══════════════════════════════════════════════════
// INITIALIZATION & ROLE SELECTION
// ══════════════════════════════════════════════════
function setupApp() {
  initClientPortal();

  $('btn-staff-login').addEventListener('click', () => {
    $('staff-modal').style.display = 'flex';
  });

  $('staff-modal-close').addEventListener('click', () => {
    $('staff-modal').style.display = 'none';
  });

  $('staff-modal').addEventListener('click', (e) => {
    if (e.target === $('staff-modal')) $('staff-modal').style.display = 'none';
  });

  $$('.role-card-modal').forEach(card => {
    card.addEventListener('click', () => {
      const role = card.dataset.role;
      $('staff-modal').style.display = 'none';
      enterRole(role);
    });
  });
}

function enterRole(role) {
  state.activeRole = role;
  $('client-portal').style.display = 'none';
  $('app-container').style.display = 'grid';
  initAdminApp(role);
}

function logout() {
  state.activeRole = null;
  $('app-container').style.display = 'none';
  $('client-portal').style.display = 'block';
}

// ══════════════════════════════════════════════════
// ADMIN APP INITIALIZATION
// ══════════════════════════════════════════════════
function initAdminApp(role) {
  const roleConfig = {
    propietaria: { name: 'María Paula O.', title: 'Propietaria', defaultTab: 'dashboard' },
    asesora: { name: 'Asesora Cali', title: 'Asesora Comercial', defaultTab: 'inventory' }
  };

  const config = roleConfig[role];
  $('user-display-name').innerText = config.name;
  $('user-display-role').innerText = config.title;

  // Show/hide menu items based on role
  $$('.menu-item').forEach(item => {
    const roles = item.dataset.roles.split(',');
    if (roles.includes(role)) {
      item.classList.remove('hidden-role');
    } else {
      item.classList.add('hidden-role');
    }
  });

  // Audit trail visibility
  $('audit-trail-footer').style.display = role === 'propietaria' ? 'flex' : 'none';

  // Navigate to default tab
  const defaultTabBtn = document.querySelector(`.menu-item[data-tab="${config.defaultTab}"]`);
  if (defaultTabBtn) defaultTabBtn.click();

  setupHamburgerMenu();
  setupTabs();
  setupSede();
  initAuditLogs();
  renderDashboard();
  renderInventory();
  renderCalendar();
  renderCrm();
  initPosForm();
  initAiChatbot();
  setupAiPanel();

  $('btn-logout').addEventListener('click', logout);

  logAudit(`<strong>${config.title}</strong> inició sesión en consola administrativa.`);
}

// ── Hamburger Menu ──
function setupHamburgerMenu() {
  const btn = $('hamburger-btn');
  const sidebar = $('sidebar');
  const overlay = $('sidebar-overlay');

  btn.addEventListener('click', () => {
    sidebar.classList.toggle('open');
    overlay.classList.toggle('active');
    btn.querySelector('i').className = sidebar.classList.contains('open') ? 'fa-solid fa-xmark' : 'fa-solid fa-bars';
  });

  overlay.addEventListener('click', closeMobileMenu);
}

function closeMobileMenu() {
  const sidebar = $('sidebar');
  const overlay = $('sidebar-overlay');
  const btn = $('hamburger-btn');
  if (sidebar) sidebar.classList.remove('open');
  if (overlay) overlay.classList.remove('active');
  if (btn) btn.querySelector('i').className = 'fa-solid fa-bars';
}

// ── AI Panel Toggle ──
function setupAiPanel() {
  $('btn-toggle-ai').addEventListener('click', () => {
    const panel = $('right-panel');
    const container = $('app-container');
    panel.classList.toggle('open');
    container.classList.toggle('ai-open');
  });

  $('btn-close-ai').addEventListener('click', () => {
    $('right-panel').classList.remove('open');
    $('app-container').classList.remove('ai-open');
  });
}

// ── Tab Navigation ──
function setupTabs() {
  const tabTitles = {
    dashboard: 'Dashboard Financiero',
    inventory: 'Inventario Inteligente',
    calendar: 'Calendario y Reservas',
    crm: 'CRM & VIP Scoring',
    pos: 'Punto de Venta (POS)'
  };

  $$('.menu-item').forEach(tab => {
    tab.addEventListener('click', () => {
      $$('.menu-item').forEach(t => t.classList.remove('active'));
      $$('.tab-pane').forEach(p => p.classList.remove('active'));

      tab.classList.add('active');
      const target = tab.dataset.tab;
      state.activeTab = target;

      const pane = $(`tab-${target}`);
      if (pane) pane.classList.add('active');

      $('topbar-title').innerText = tabTitles[target] || 'VÉSTIER';
      closeMobileMenu();

      if (target === 'pos') resizeSignatureCanvas();

      logAudit(`Vista cambiada a: <strong>${tabTitles[target]}</strong>`);
    });
  });

  $('btn-new-rental').addEventListener('click', () => {
    const posTab = document.querySelector('[data-tab="pos"]');
    if (posTab && !posTab.classList.contains('hidden-role')) posTab.click();
  });
}

// ── Sede ──
function setupSede() {
  $('sede-selector').addEventListener('change', (e) => {
    state.activeSede = e.target.value;
    const name = state.activeSede === 'cali' ? 'Cali' : 'Buga';
    $('current-date').innerText = `${name}, 21 de Mayo de 2026`;
    logAudit(`Sede activa: <strong>${name}</strong>`);
    renderDashboard();
    renderInventory();
    renderCalendar();
  });
}

// ── Audit Trail ──
function logAudit(message, cls = '') {
  const time = new Date().toTimeString().split(' ')[0];
  state.auditLogs.unshift({ time, msg: message });

  const el = $('audit-logs-viewport');
  if (!el) return;
  const entry = document.createElement('div');
  entry.className = 'audit-log-entry';
  entry.innerHTML = `<span class="audit-time">[${time}]</span><span class="audit-msg ${cls}">${message}</span>`;
  el.insertBefore(entry, el.firstChild);
}

function initAuditLogs() {
  const el = $('audit-logs-viewport');
  el.innerHTML = '';
  [...state.auditLogs].reverse().forEach(log => {
    const entry = document.createElement('div');
    entry.className = 'audit-log-entry';
    entry.innerHTML = `<span class="audit-time">[${log.time}]</span><span class="audit-msg">${log.msg}</span>`;
    el.appendChild(entry);
  });

  $('btn-quick-audit').addEventListener('click', () => {
    logAudit(`<strong>Auditoría exportada</strong> (Sede: ${state.activeSede.toUpperCase()})`);
  });
}

// ══════════════════════════════════════════════════
// DASHBOARD
// ══════════════════════════════════════════════════
function renderDashboard() {
  const dresses = state.dresses.filter(d => d.sede === state.activeSede);
  const revenue = dresses.reduce((s, d) => s + d.revenue, 0);
  const active = dresses.filter(d => d.status === 'Alquilada' || d.status === 'En Tránsito').length;
  const cleaning = dresses.filter(d => d.status === 'En Limpieza').length;

  $('stat-revenue').innerText = `$${revenue.toLocaleString('es-CO')} COP`;
  $('stat-active-rentals').innerText = active;
  $('stat-cleaning').innerText = cleaning;

  const sorted = [...dresses].sort((a, b) => b.rentals - a.rentals);
  const tbody = $('top-dresses-tbody');
  tbody.innerHTML = '';
  sorted.forEach(d => {
    const cpw = d.rentals > 0 ? Math.round(d.commercialValue / d.rentals) : d.commercialValue;
    const tr = document.createElement('tr');
    tr.innerHTML = `<td><strong>${d.name}</strong></td><td><span class="vip-badge-small vip">${d.brand.split(' ')[0]}</span></td><td>${d.rentals}</td><td>$${d.revenue.toLocaleString('es-CO')}</td><td>$${cpw.toLocaleString('es-CO')}</td>`;
    tbody.appendChild(tr);
  });
}

// ══════════════════════════════════════════════════
// INVENTORY
// ══════════════════════════════════════════════════
function renderInventory() {
  const search = $('inventory-search').value.toLowerCase();
  const brand = $('filter-brand').value;
  const status = $('filter-status').value;

  const filtered = state.dresses.filter(d => {
    if (d.sede !== state.activeSede) return false;
    const matchSearch = d.brand.toLowerCase().includes(search) || d.name.toLowerCase().includes(search) || d.id.toLowerCase().includes(search);
    const matchBrand = brand === 'all' || d.brand === brand;
    const matchStatus = status === 'all' || d.status === status;
    return matchSearch && matchBrand && matchStatus;
  });

  const grid = $('dresses-grid');
  grid.innerHTML = '';

  if (!filtered.length) {
    grid.innerHTML = '<div class="empty-state" style="grid-column:1/-1"><i class="fa-solid fa-shirt"></i><p>No se encontraron prendas.</p></div>';
    return;
  }

  filtered.forEach(d => {
    const dep = Math.min(100, Math.round((d.rentals / d.depreciationLimit) * 100));
    const card = document.createElement('div');
    card.className = 'dress-card';
    card.innerHTML = `
      <div class="dress-card-img-wrapper">
        <img src="${d.image}" alt="${d.name}" class="dress-card-img" onerror="this.src='https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=300'">
        <span class="status-badge ${d.status.toLowerCase().replace(' ', '-')}">${d.status}</span>
        <span class="quality-badge">${d.quality}</span>
      </div>
      <div class="dress-card-body">
        <span class="dress-brand">${d.brand}</span>
        <h4 class="dress-name">${d.name}</h4>
        <div class="dress-details-row">
          <span><i class="fa-solid fa-expand"></i> ${d.size}</span>
          <span><i class="fa-solid fa-coins"></i> $${d.rentPrice.toLocaleString('es-CO')}</span>
          <span><i class="fa-solid fa-arrow-rotate-left"></i> ${d.rentals} Usos</span>
          <span><i class="fa-solid fa-piggy-bank"></i> $${d.revenue.toLocaleString('es-CO')}</span>
        </div>
        <div class="depreciation-section">
          <div class="depreciation-info"><span>Depreciación</span><span>${d.rentals}/${d.depreciationLimit} (${dep}%)</span></div>
          <div class="progress-track"><div class="progress-bar" style="width:${dep}%"></div></div>
        </div>
        <div class="dress-actions">
          <button class="btn btn-secondary btn-small btn-qr" data-id="${d.id}" title="Simular QR"><i class="fa-solid fa-qrcode"></i></button>
        </div>
      </div>`;
    grid.appendChild(card);
  });

  $$('.btn-qr').forEach(btn => {
    btn.addEventListener('click', () => logAudit(`QR escaneado para prenda: <strong>${btn.dataset.id}</strong>`));
  });
}

$('inventory-search').addEventListener('input', renderInventory);
$('filter-brand').addEventListener('change', renderInventory);
$('filter-status').addEventListener('change', renderInventory);

// ══════════════════════════════════════════════════
// CALENDAR
// ══════════════════════════════════════════════════
function renderCalendar() {
  const month = currentCalendarDate.getMonth();
  const year = currentCalendarDate.getFullYear();
  const names = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];
  $('calendar-month-year').innerText = `${names[month]} de ${year}`;

  const firstDay = new Date(year, month, 1).getDay();
  const lastDay = new Date(year, month + 1, 0).getDate();
  const container = $('calendar-days');
  container.innerHTML = '';

  for (let i = 0; i < firstDay; i++) {
    const empty = document.createElement('div');
    empty.className = 'calendar-day empty';
    container.appendChild(empty);
  }

  for (let day = 1; day <= lastDay; day++) {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    const div = document.createElement('div');
    div.className = 'calendar-day';
    if (day === 21 && month === 4 && year === 2026) div.classList.add('today');

    div.innerHTML = `<span class="day-number">${day}</span><div class="day-slots"></div>`;
    const slots = div.querySelector('.day-slots');

    state.bookings
      .filter(b => b.startDate <= dateStr && b.endDate >= dateStr && b.sede === state.activeSede)
      .forEach(booking => {
        const dress = state.dresses.find(d => d.id === booking.dressId);
        if (!dress) return;
        const strip = document.createElement('div');
        strip.className = `booking-strip ${booking.type === 'reserva' ? 'alquilado' : 'buffer'}`;
        if (booking.type === 'reserva') {
          const cust = state.customers.find(c => c.id === booking.customerId);
          strip.innerText = `${dress.brand.split(' ')[0]}: ${cust ? cust.name.split(' ')[0] : ''}`;
        } else {
          strip.innerText = `[Buf] ${dress.brand.split(' ')[0]}`;
        }
        slots.appendChild(strip);
      });

    container.appendChild(div);
  }
}

$('btn-prev-month').addEventListener('click', () => { currentCalendarDate.setMonth(currentCalendarDate.getMonth() - 1); renderCalendar(); });
$('btn-next-month').addEventListener('click', () => { currentCalendarDate.setMonth(currentCalendarDate.getMonth() + 1); renderCalendar(); });

// ══════════════════════════════════════════════════
// CRM
// ══════════════════════════════════════════════════
function renderCrm() {
  const search = $('crm-search-input').value.toLowerCase();
  const filtered = state.customers.filter(c => c.name.toLowerCase().includes(search) || c.vipTier.toLowerCase().includes(search));

  const list = $('customer-list-nodes');
  list.innerHTML = '';

  const avatars = {
    'Platinum VIP': 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=128',
    'Gold VIP': 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=128',
    'VIP': 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=128',
    'Estándar': 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=128'
  };

  filtered.forEach(c => {
    const avatar = avatars[c.vipTier] || avatars['Estándar'];
    const node = document.createElement('div');
    node.className = 'customer-node';
    node.innerHTML = `
      <img src="${avatar}" alt="${c.name}" class="cust-node-avatar">
      <div class="cust-node-info"><h4>${c.name}</h4><p>${c.city}</p></div>
      <span class="vip-badge-small ${c.vipTier === 'Estándar' ? 'regular' : 'vip'}">${c.vipTier}</span>`;

    node.addEventListener('click', () => {
      $$('.customer-node').forEach(n => n.classList.remove('active'));
      node.classList.add('active');
      showCustomerDetail(c.id, avatar);
    });

    list.appendChild(node);
  });
}

function showCustomerDetail(id, avatar) {
  const c = state.customers.find(x => x.id === id);
  if (!c) return;

  $('crm-detail-view').innerHTML = `
    <div class="crm-header-card">
      <img src="${avatar}" alt="${c.name}" class="crm-large-avatar">
      <div class="crm-header-info">
        <h3>${c.name}</h3>
        <p><span><i class="fa-solid fa-location-dot"></i> ${c.city}</span>
           <span><i class="fa-solid fa-phone"></i> ${c.phone}</span>
           <span class="vip-pill ${c.vipTier === 'Estándar' ? 'regular' : ''}">${c.vipTier}</span></p>
      </div>
    </div>
    <div class="crm-details-grid">
      <div class="crm-detail-block"><h5>Talla</h5><p>${c.size}</p></div>
      <div class="crm-detail-block"><h5>Scoring</h5><p>${c.scoring}%</p></div>
      <div class="crm-detail-block"><h5>Depósito</h5><p>${c.vipTier.includes('VIP') ? 'Exento' : '50% valor'}</p></div>
    </div>
    <div class="crm-detail-block" style="margin-bottom:1.5rem">
      <h5>Notas</h5><p style="font-weight:normal;font-style:italic;color:var(--color-text-secondary);font-size:0.8rem">"${c.notes}"</p>
    </div>
    <div class="crm-history-section">
      <h4><i class="fa-solid fa-clock-rotate-left"></i> Historial</h4>
      <table class="luxury-table"><thead><tr><th>Prenda</th><th>Marca</th><th>Estado</th></tr></thead>
      <tbody>${c.history.map(did => {
        const d = state.dresses.find(x => x.id === did);
        return d ? `<tr><td><strong>${d.name}</strong></td><td><span class="vip-badge-small vip">${d.brand}</span></td><td><span class="status-badge disponible" style="position:static;font-size:0.55rem;padding:1px 6px">Devuelto</span></td></tr>` : '';
      }).join('')}</tbody></table>
    </div>`;

  logAudit(`CRM: Ficha 360° de <strong>${c.name}</strong>`);
}

$('crm-search-input').addEventListener('input', renderCrm);

// ══════════════════════════════════════════════════
// POS
// ══════════════════════════════════════════════════
function initPosForm() {
  const custSel = $('pos-select-customer');
  const dressSel = $('pos-select-dress');

  custSel.innerHTML = '<option value="">-- Selecciona clienta --</option>';
  state.customers.forEach(c => { custSel.innerHTML += `<option value="${c.id}">${c.name} (${c.vipTier})</option>`; });

  dressSel.innerHTML = '<option value="">-- Selecciona prenda --</option>';
  state.dresses.filter(d => d.sede === state.activeSede).forEach(d => {
    const dis = d.status !== 'Disponible' ? ` - ${d.status}` : '';
    dressSel.innerHTML += `<option value="${d.id}" ${d.status !== 'Disponible' ? 'disabled' : ''}>${d.brand} - ${d.name}${dis}</option>`;
  });

  const today = '2026-05-21';
  $('pos-start-date').value = today;
  $('pos-end-date').value = '2026-05-24';

  dressSel.addEventListener('change', checkExclusivity);
  custSel.addEventListener('change', checkExclusivity);
  [custSel, dressSel, $('pos-start-date'), $('pos-end-date')].forEach(el => el.addEventListener('change', () => $('btn-pos-calculate').disabled = false));

  $('btn-pos-calculate').addEventListener('click', calculatePos);
  $('pos-rental-form').addEventListener('submit', finalizeRental);

  $$('.pay-method-card').forEach(card => {
    card.addEventListener('click', () => {
      $$('.pay-method-card').forEach(c => c.classList.remove('active'));
      card.classList.add('active');
    });
  });

  setupSignaturePad();
}

function checkExclusivity() {
  const cust = state.customers.find(c => c.id === $('pos-select-customer').value);
  const dress = state.dresses.find(d => d.id === $('pos-select-dress').value);
  if (!cust || !dress) { $('exclusivity-alert-pos').style.display = 'none'; return; }

  if (dress.quality === 'A+' && cust.vipTier === 'Estándar') {
    $('exclusivity-alert-pos').style.display = 'flex';
    $('btn-pos-calculate').disabled = true;
    $('btn-pos-submit').disabled = true;
    logAudit(`<strong>RESTRICCIÓN:</strong> ${cust.name} no califica para prenda A+ ${dress.brand}`, 'status-change');
  } else {
    $('exclusivity-alert-pos').style.display = 'none';
    $('btn-pos-calculate').disabled = false;
  }
}

function calculatePos() {
  const cust = state.customers.find(c => c.id === $('pos-select-customer').value);
  const dress = state.dresses.find(d => d.id === $('pos-select-dress').value);
  if (!cust || !dress) return;

  const days = Math.max(1, Math.ceil(Math.abs(new Date($('pos-end-date').value) - new Date($('pos-start-date').value)) / 86400000));
  const extra = days > 3 ? (days - 3) * 80000 : 0;
  const subtotal = dress.rentPrice + extra;
  const protection = 45000;
  const total = subtotal + protection;
  const isVip = cust.vipTier.includes('VIP');
  const deposit = isVip ? 0 : Math.round(dress.commercialValue * 0.5);

  $('pos-summary-body').innerHTML = `
    <div class="receipt-wrapper">
      <div class="receipt-dress-preview">
        <img src="${dress.image}" alt="${dress.name}" class="receipt-dress-img">
        <div class="receipt-dress-info"><h4>${dress.name}</h4><p>${dress.brand} · ${dress.size}</p></div>
      </div>
      <div class="receipt-detail-list">
        <div class="receipt-row"><span>Días</span><span><strong>${days} días</strong></span></div>
        <div class="receipt-row"><span>Tarifa base</span><span>$${dress.rentPrice.toLocaleString('es-CO')}</span></div>
        ${extra ? `<div class="receipt-row"><span>Días extras (${days-3})</span><span>$${extra.toLocaleString('es-CO')}</span></div>` : ''}
        <div class="receipt-row"><span>Protección Premium</span><span>$${protection.toLocaleString('es-CO')}</span></div>
        <div class="receipt-row"><span>Depósito</span><span>${isVip ? '<strong style="color:#2ecc71">EXENTO VIP</strong>' : `$${deposit.toLocaleString('es-CO')}`}</span></div>
        <div class="receipt-row total-row"><span>Total</span><span>$${total.toLocaleString('es-CO')} COP</span></div>
      </div>
      <div class="wompi-trust-badge"><i class="fa-solid fa-shield-halved"></i><div><strong>Protegido por Wompi</strong></div></div>
    </div>`;

  generateContract(cust, dress, $('pos-start-date').value, $('pos-end-date').value, deposit);
  $('contract-area').style.display = 'block';
  $('btn-pos-submit').disabled = false;
  logAudit(`Caja: Valores calculados para <strong>${cust.name}</strong> · $${total.toLocaleString('es-CO')}`);
}

function generateContract(cust, dress, start, end, deposit) {
  $('contract-text-body').innerHTML = `
    <p><strong>CONTRATO DE ALQUILER Y RESPONSABILIDAD CIVIL</strong></p>
    <p>Fechas: <strong>${start}</strong> a <strong>${end}</strong>. Boutique <strong>VÉSTIER Luxury Rentals</strong> y clienta <strong>${cust.name}</strong>.</p>
    <p><strong>PRENDA:</strong> ${dress.brand} - ${dress.name}, talla ${dress.size}, calidad ${dress.quality}. Composición: ${dress.composition}.</p>
    <p><strong>DEVOLUCIÓN:</strong> Antes de las 18:00 del día final. Multa: $100.000 COP/día por retraso.</p>
    <p><strong>DEPÓSITO:</strong> $${deposit.toLocaleString('es-CO')} COP ${deposit === 0 ? '(EXENTO VIP)' : ''}. Pérdida total: $${dress.commercialValue.toLocaleString('es-CO')} COP.</p>`;
}

function setupSignaturePad() {
  const canvas = $('signature-canvas');
  sigCtx = canvas.getContext('2d');
  sigCtx.strokeStyle = '#C5A880';
  sigCtx.lineWidth = 2;

  canvas.addEventListener('mousedown', (e) => { isDrawingSignature = true; sigCtx.beginPath(); const r = canvas.getBoundingClientRect(); sigCtx.moveTo(e.clientX - r.left, e.clientY - r.top); });
  canvas.addEventListener('mousemove', (e) => { if (!isDrawingSignature) return; const r = canvas.getBoundingClientRect(); sigCtx.lineTo(e.clientX - r.left, e.clientY - r.top); sigCtx.stroke(); signatureSigned = true; });
  canvas.addEventListener('mouseup', () => isDrawingSignature = false);
  canvas.addEventListener('mouseout', () => isDrawingSignature = false);

  canvas.addEventListener('touchstart', (e) => { e.preventDefault(); const t = e.touches[0]; canvas.dispatchEvent(new MouseEvent('mousedown', { clientX: t.clientX, clientY: t.clientY })); });
  canvas.addEventListener('touchmove', (e) => { e.preventDefault(); const t = e.touches[0]; canvas.dispatchEvent(new MouseEvent('mousemove', { clientX: t.clientX, clientY: t.clientY })); });

  $('btn-clear-sig').addEventListener('click', clearSig);
}

function resizeSignatureCanvas() {
  const canvas = $('signature-canvas');
  const w = canvas.parentElement;
  if (w) { canvas.width = w.clientWidth - 2; canvas.height = 120; clearSig(); }
}

function clearSig() {
  if (sigCtx) sigCtx.clearRect(0, 0, $('signature-canvas').width, $('signature-canvas').height);
  signatureSigned = false;
}

function finalizeRental(e) {
  e.preventDefault();
  if (!signatureSigned) { alert('Firme el contrato antes de confirmar.'); return; }

  const cust = state.customers.find(c => c.id === $('pos-select-customer').value);
  const dress = state.dresses.find(d => d.id === $('pos-select-dress').value);
  const start = $('pos-start-date').value;
  const end = $('pos-end-date').value;

  dress.status = 'Alquilada';
  dress.rentals += 1;
  dress.revenue += dress.rentPrice;

  const bookId = 'B-' + Date.now();
  state.bookings.push({ id: bookId, dressId: dress.id, customerId: cust.id, startDate: start, endDate: end, type: 'reserva', sede: state.activeSede });

  const bufDay = new Date(end);
  bufDay.setDate(bufDay.getDate() + 1);
  const bufStr = `${bufDay.getFullYear()}-${String(bufDay.getMonth() + 1).padStart(2, '0')}-${String(bufDay.getDate()).padStart(2, '0')}`;
  state.bookings.push({ id: `${bookId}-buf`, dressId: dress.id, startDate: bufStr, endDate: bufStr, type: 'buffer', sede: state.activeSede });

  logAudit(`<strong>Alquiler registrado:</strong> ${dress.brand} → ${cust.name}`, 'contract');
  logAudit(`<strong>Buffer limpieza:</strong> ${dress.brand} bloqueado ${bufStr}`, 'status-change');

  renderDashboard();
  renderInventory();
  renderCalendar();

  $('pos-summary-body').innerHTML = `
    <div class="empty-receipt" style="color:#2ecc71">
      <i class="fa-solid fa-circle-check" style="color:#2ecc71;font-size:3.5rem"></i>
      <h3 style="color:#FAF9F6;font-family:var(--font-display);font-size:1.35rem;margin-top:0.75rem">¡Alquiler Completado!</h3>
      <p style="font-size:0.75rem;max-width:240px;margin:0.5rem 0">Contrato firmado y enviado a <strong>${cust.email}</strong></p>
    </div>`;

  $('pos-rental-form').reset();
  clearSig();
  $('contract-area').style.display = 'none';
  $('btn-pos-submit').disabled = true;
}

// ══════════════════════════════════════════════════
// AI CHATBOT (Celia)
// ══════════════════════════════════════════════════
function initAiChatbot() {
  $('ai-chat-form').addEventListener('submit', (e) => { e.preventDefault(); const q = $('ai-chat-input').value; if (q) { handleAi(q); $('ai-chat-input').value = ''; } });
  $$('.btn-quick-ask').forEach(btn => btn.addEventListener('click', () => handleAi(btn.dataset.query)));
}

function handleAi(query) {
  const body = $('ai-chat-body');
  const userEl = document.createElement('div');
  userEl.className = 'ai-message user';
  userEl.innerHTML = `<p>${query}</p>`;
  body.appendChild(userEl);
  body.scrollTop = body.scrollHeight;

  setTimeout(() => {
    let resp = '';
    const q = query.toLowerCase();

    if (q.includes('disponible') || q.includes('vestido')) {
      const avail = state.dresses.filter(d => d.status === 'Disponible' && d.sede === state.activeSede);
      resp = `En <strong>${state.activeSede.toUpperCase()}</strong> hay ${avail.length} prendas disponibles:<br>` +
        avail.map(d => `· <strong>${d.brand}</strong> - ${d.name} ($${d.rentPrice.toLocaleString('es-CO')})`).join('<br>');
    } else if (q.includes('multa') || q.includes('tardía') || q.includes('devolución')) {
      resp = 'La devolución tardía tiene multa de <strong>$100.000 COP/día</strong>. Notificamos automáticamente por correo y SMS.';
    } else if (q.includes('rentable') || q.includes('cpw')) {
      const top = [...state.dresses].sort((a, b) => b.revenue - a.revenue)[0];
      resp = `La más rentable es <strong>${top.brand} - ${top.name}</strong> con ${top.rentals} alquileres y $${top.revenue.toLocaleString('es-CO')} de retorno.`;
    } else {
      resp = 'En VÉSTIER trabajamos con D&G, Louis Vuitton, Versace y Silvia Tcherassi. Reserva en Cali (Av 6 Oeste) o Buga al 316 498 4843.';
    }

    const botEl = document.createElement('div');
    botEl.className = 'ai-message bot';
    botEl.innerHTML = `<p>${resp}</p>`;
    body.appendChild(botEl);
    body.scrollTop = body.scrollHeight;
  }, 600);
}

// ══════════════════════════════════════════════════
// CLIENT PORTAL
// ══════════════════════════════════════════════════
function initClientPortal() {
  renderClientCatalog();
  initHeroParticles();
  initScrollAnimations();
  initNavScroll();
  initSmoothScroll();

  $('client-qr-btn').addEventListener('click', () => {
    $('client-scanner').style.display = 'flex';
    setTimeout(() => {
      $('client-scanner').style.display = 'none';
      const avail = state.dresses.filter(d => d.status === 'Disponible' && d.sede === 'cali');
      if (avail.length) showClientProduct(avail[0].id);
    }, 2000);
  });

  $('client-cancel-scan').addEventListener('click', () => $('client-scanner').style.display = 'none');

  $('client-product-back').addEventListener('click', () => {
    $('client-product-detail').style.display = 'none';
    $('cp-catalog-section').style.display = 'block';
  });
}

function initHeroParticles() {
  const container = $('cp-hero-particles');
  if (!container) return;
  for (let i = 0; i < 20; i++) {
    const p = document.createElement('div');
    p.className = 'cp-particle';
    p.style.left = Math.random() * 100 + '%';
    p.style.animationDelay = Math.random() * 6 + 's';
    p.style.animationDuration = (4 + Math.random() * 4) + 's';
    container.appendChild(p);
  }
}

function initScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
  }, { threshold: 0.15 });
  $$('.animate-on-scroll').forEach(el => observer.observe(el));
}

function initNavScroll() {
  const nav = $('cp-nav');
  if (!nav) return;
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 80);
  });
}

function initSmoothScroll() {
  $$('.cp-nav-link, .cp-hero-cta-row a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (!href.startsWith('#')) return;
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
}

function renderClientCatalog() {
  const grid = $('client-catalog-grid');
  grid.innerHTML = '';

  state.dresses.filter(d => d.sede === 'cali').forEach(d => {
    const card = document.createElement('div');
    card.className = 'client-catalog-card';
    card.innerHTML = `
      <img src="${d.image}" alt="${d.name}" onerror="this.src='https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=300'">
      <div class="client-card-info">
        <span class="dress-brand">${d.brand}</span>
        <h4>${d.name}</h4>
        <div class="client-card-meta">
          <span class="client-card-price">$${d.rentPrice.toLocaleString('es-CO')}</span>
          <span class="client-card-status ${d.status.toLowerCase().replace(' ', '-')}">${d.status}</span>
        </div>
      </div>`;

    card.addEventListener('click', () => showClientProduct(d.id));
    grid.appendChild(card);
  });
}

function showClientProduct(id) {
  const d = state.dresses.find(x => x.id === id);
  if (!d) return;

  $('cp-catalog-section').style.display = 'none';
  $('client-product-detail').style.display = 'block';
  window.scrollTo({ top: 0, behavior: 'smooth' });

  $('client-product-img').src = d.image;
  $('client-product-brand').innerText = d.brand;
  $('client-product-name').innerText = d.name;
  $('client-product-size').innerText = d.size;
  $('client-product-price').innerText = `$${d.rentPrice.toLocaleString('es-CO')}`;
  $('client-product-quality').innerText = d.quality;
  $('client-product-composition').innerText = d.composition;

  const statusEl = $('client-product-status');
  statusEl.innerText = d.status;
  statusEl.className = `status-badge ${d.status.toLowerCase().replace(' ', '-')}`;

  const avail = $('client-product-avail');
  avail.innerHTML = '';
  for (let i = 0; i < 7; i++) {
    const date = new Date(2026, 4, 21 + i);
    const dStr = `2026-05-${String(21 + i).padStart(2, '0')}`;
    const booking = state.bookings.find(b => b.startDate <= dStr && b.endDate >= dStr && b.dressId === d.id);
    let cls = 'available', label = 'Libre';
    if (booking) { cls = booking.type === 'reserva' ? 'rented' : 'buffer'; label = booking.type === 'reserva' ? 'Ocupado' : 'Limpieza'; }
    const dayName = date.toLocaleDateString('es-CO', { weekday: 'short' }).slice(0, 2);
    avail.innerHTML += `<div class="phone-cal-day ${cls}"><span>${dayName}</span><span class="pcd-num">${21+i}</span><span style="font-size:0.4rem;font-weight:600">${label}</span></div>`;
  }

  const msg = encodeURIComponent(`Hola VÉSTIER, me interesa el vestido ${d.brand} - ${d.name} (${d.id}). ¿Está disponible?`);
  $('client-whatsapp-link').href = `https://wa.me/573164984843?text=${msg}`;
}

// ══════════════════════════════════════════════════
// INIT
// ══════════════════════════════════════════════════
document.addEventListener('DOMContentLoaded', setupApp);
