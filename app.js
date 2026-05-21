/**
 * ==========================================================================
 * VÉSTIER LUXURY RENTALS - PROTOCOLO DE INTERACTIVIDAD (app.js)
 * Sistema de Control Integrado para Demo de Ventas
 * ==========================================================================
 */

// --- BASE DE DATOS LOCAL EN MEMORIA (Estado de la Aplicación) ---
const state = {
  activeSede: 'cali', // 'cali' o 'buga'
  activeRole: 'propietaria', // 'propietaria' o 'asesora'
  activeTab: 'dashboard',
  
  // Catálogo de Prendas Únicas de Alta Costura (Módulo 1)
  dresses: [
    {
      id: 'DG-001',
      brand: 'Dolce & Gabbana',
      name: 'Floral Silk Gown',
      size: 'S (6)',
      status: 'Disponible',
      quality: 'A+',
      rentals: 4,
      revenue: 1800000,
      commercialValue: 12000000,
      rentPrice: 450000, // Precio por evento (3 días)
      depreciationLimit: 12,
      composition: '100% Seda Genuina Italiana, Forro de satén',
      image: './assets/dg_dress.png',
      sede: 'cali'
    },
    {
      id: 'LV-002',
      brand: 'Louis Vuitton',
      name: 'Structural Evening Dress',
      size: 'M (8)',
      status: 'Alquilada',
      quality: 'A',
      rentals: 3,
      revenue: 1560000,
      commercialValue: 15000000,
      rentPrice: 520000,
      depreciationLimit: 10,
      composition: 'Crepé de lana estructurado, cierres de bronce pulido',
      image: './assets/lv_dress.png',
      sede: 'cali'
    },
    {
      id: 'VS-003',
      brand: 'Versace',
      name: 'Draped Gold Cocktail',
      size: 'S (6)',
      status: 'Disponible',
      quality: 'A',
      rentals: 2,
      revenue: 960000,
      commercialValue: 9800000,
      rentPrice: 480000,
      depreciationLimit: 10,
      composition: 'Malla metálica ligera, forro elástico premium',
      image: './assets/versace_dress.png',
      sede: 'cali'
    },
    {
      id: 'ST-004',
      brand: 'Silvia Tcherassi',
      name: 'Tropical Resort Midi',
      size: 'M (8)',
      status: 'En Limpieza',
      quality: 'B+',
      rentals: 5,
      revenue: 1900000,
      commercialValue: 7500000,
      rentPrice: 380000,
      depreciationLimit: 15,
      composition: 'Lino premium estampado, volantes asimétricos',
      image: './assets/silvia_dress.png',
      sede: 'cali'
    },
    {
      id: 'CH-005',
      brand: 'Chanel',
      name: 'Classic Tweed Dress',
      size: 'S (6)',
      status: 'Disponible',
      quality: 'A+',
      rentals: 1,
      revenue: 600000,
      commercialValue: 18000000,
      rentPrice: 600000,
      depreciationLimit: 8,
      composition: 'Tweed de lana virgen, botones joya grabados',
      image: 'https://images.unsplash.com/photo-1596783074918-c84cb06531ca?q=80&w=400&auto=format&fit=crop',
      sede: 'cali'
    },
    {
      id: 'DR-006',
      brand: 'Dior',
      name: 'Organza Midi Dress',
      size: 'XS (4)',
      status: 'Disponible',
      quality: 'A+',
      rentals: 0,
      revenue: 0,
      commercialValue: 14000000,
      rentPrice: 420000,
      depreciationLimit: 10,
      composition: 'Organza plisada de seda, forro interior satinado',
      image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=400&auto=format&fit=crop',
      sede: 'buga' // Sede Buga para demostrar la multisede
    }
  ],

  // Base de Datos de Clientes de Alta Categoría (Módulo 6 - CRM)
  customers: [
    {
      id: 'C-01',
      name: 'María Claudia Pardo',
      email: 'mclaudiapardo@outlook.com',
      phone: '315 780 4421',
      city: 'Santiago de Cali',
      address: 'B/ Ciudad Jardín, Casa 12',
      size: 'S (6)',
      vipTier: 'VIP',
      scoring: 96,
      history: ['DG-001', 'ST-004'],
      notes: 'Prefiere vestidos largos. Siempre devuelve a tiempo. Le gusta recibir fotos preliminares del inventario A+.'
    },
    {
      id: 'C-02',
      name: 'Natalia Restrepo',
      email: 'natalia.restrepo@gmail.com',
      phone: '318 450 9988',
      city: 'Santiago de Cali',
      address: 'Edificio Torre Real, Apto 902',
      size: 'M (8)',
      vipTier: 'Platinum VIP',
      scoring: 100,
      history: ['LV-002', 'CH-005'],
      notes: 'Clienta ultra-premium. Solo alquila prendas en categorías A+ o A. Requiere servicio de asesoría y planchado a vapor en sitio.'
    },
    {
      id: 'C-03',
      name: 'Sofía Gómez',
      email: 'sofia.gomez11@hotmail.com',
      phone: '312 890 5566',
      city: 'Guadalajara de Buga',
      address: 'Calle 5 # 12-40',
      size: 'S (6)',
      vipTier: 'Estándar',
      scoring: 72,
      history: ['ST-004'],
      notes: 'Suele alquilar vestidos de lino o midi para eventos campestres en Buga. Devolvió una prenda con mancha menor.'
    },
    {
      id: 'C-04',
      name: 'Valentina Varela',
      email: 'valvarela@yahoo.com',
      phone: '316 453 2211',
      city: 'Santiago de Cali',
      address: 'Condominio Pance, Apto 401',
      size: 'XS (4)',
      vipTier: 'Gold VIP',
      scoring: 88,
      history: ['VS-003'],
      notes: 'Talla XS. Le encantan los diseños audaces y colores metálicos (Versace, D&G). Frecuenta cocteles y desfiles.'
    }
  ],

  // Reservas activas y buffers en Calendario (Módulo 2)
  bookings: [
    {
      id: 'B-101',
      dressId: 'LV-002',
      customerId: 'C-02',
      startDate: '2026-05-18',
      endDate: '2026-05-20',
      type: 'reserva',
      sede: 'cali'
    },
    {
      id: 'B-101-buf',
      dressId: 'LV-002',
      startDate: '2026-05-21',
      endDate: '2026-05-21',
      type: 'buffer',
      sede: 'cali'
    },
    {
      id: 'B-102',
      dressId: 'ST-004',
      customerId: 'C-03',
      startDate: '2026-05-19',
      endDate: '2026-05-21',
      type: 'reserva',
      sede: 'cali'
    },
    {
      id: 'B-102-buf',
      dressId: 'ST-004',
      startDate: '2026-05-22',
      endDate: '2026-05-22',
      type: 'buffer',
      sede: 'cali'
    }
  ],

  // Bitácora de Auditoría Inmutable (Módulo 8)
  auditLogs: [
    { time: '08:00:15', msg: 'Bitácora de auditoría encriptada iniciada. <strong>Multitenant y Multisede activo</strong>.' },
    { time: '08:01:22', msg: 'Sincronización segura con Neon PostgreSQL exitosa mediante Prisma ORM.' },
    { time: '08:05:00', msg: 'Conexión lista con pasarela de pago <strong>Wompi API v2</strong>.' },
    { time: '08:10:45', msg: 'Agente conversacional Celia indexado al catálogo de lujo.' },
    { time: '08:12:00', msg: 'Notificaciones preparadas mediante el proveedor <strong>Resend</strong>.' }
  ]
};

// --- ELEMENTOS DEL DOM ---
const DOM = {
  tabs: document.querySelectorAll('.menu-item'),
  panes: document.querySelectorAll('.tab-pane'),
  sedeSelector: document.getElementById('sede-selector'),
  roleSelector: document.getElementById('role-selector'),
  topbarTitle: document.getElementById('topbar-title'),
  userDisplayName: document.getElementById('user-display-name'),
  userDisplayRole: document.getElementById('user-display-role'),
  currentDateText: document.getElementById('current-date'),
  
  // Dashboard Stats
  statRevenue: document.getElementById('stat-revenue'),
  statActiveRentals: document.getElementById('stat-active-rentals'),
  statCleaning: document.getElementById('stat-cleaning'),
  topDressesTbody: document.getElementById('top-dresses-tbody'),

  // Inventario
  dressesGrid: document.getElementById('dresses-grid'),
  searchInventory: document.getElementById('inventory-search'),
  filterBrand: document.getElementById('filter-brand'),
  filterStatus: document.getElementById('filter-status'),

  // Calendario
  calendarDays: document.getElementById('calendar-days'),
  calendarMonthYear: document.getElementById('calendar-month-year'),
  btnPrevMonth: document.getElementById('btn-prev-month'),
  btnNextMonth: document.getElementById('btn-next-month'),

  // CRM
  crmSearch: document.getElementById('crm-search-input'),
  customerListNodes: document.getElementById('customer-list-nodes'),
  crmDetailView: document.getElementById('crm-detail-view'),

  // POS
  posForm: document.getElementById('pos-rental-form'),
  posSelectCustomer: document.getElementById('pos-select-customer'),
  posSelectDress: document.getElementById('pos-select-dress'),
  posStartDate: document.getElementById('pos-start-date'),
  posEndDate: document.getElementById('pos-end-date'),
  posExclusivityAlert: document.getElementById('exclusivity-alert-pos'),
  posContractArea: document.getElementById('contract-area'),
  posContractText: document.getElementById('contract-text-body'),
  posBtnCalculate: document.getElementById('btn-pos-calculate'),
  posBtnSubmit: document.getElementById('btn-pos-submit'),
  posSummaryBody: document.getElementById('pos-summary-body'),
  signatureCanvas: document.getElementById('signature-canvas'),
  btnClearSig: document.getElementById('btn-clear-sig'),
  btnNewRentalQuick: document.getElementById('btn-new-rental'),

  // Bitácora
  auditLogsViewport: document.getElementById('audit-logs-viewport'),
  btnQuickAudit: document.getElementById('btn-quick-audit'),

  // Smartphone
  phoneMiniCatalog: document.getElementById('phone-mini-catalog'),
  phonePwaHome: document.getElementById('phone-pwa-home'),
  phonePwaScanner: document.getElementById('phone-pwa-scanner'),
  phonePwaProduct: document.getElementById('phone-pwa-product'),
  phoneQrScanBtn: document.getElementById('phone-qr-scan-btn'),
  btnCancelScan: document.getElementById('btn-cancel-scan'),
  phoneProductBack: document.getElementById('phone-product-back'),
  phoneProductTitle: document.getElementById('phone-product-title'),
  phoneProductImg: document.getElementById('phone-product-img'),
  phoneProductName: document.getElementById('phone-product-name'),
  phoneProductPrice: document.getElementById('phone-product-price'),
  phoneProductStatus: document.getElementById('phone-product-status'),
  phoneProductQuality: document.getElementById('phone-product-quality'),
  phoneProductSize: document.getElementById('phone-product-size'),
  phoneProductAvail: document.getElementById('phone-product-avail'),
  phoneWhatsappLink: document.getElementById('phone-whatsapp-link'),

  // AI Chat
  aiChatForm: document.getElementById('ai-chat-form'),
  aiChatInput: document.getElementById('ai-chat-input'),
  aiChatBody: document.getElementById('ai-chat-body'),
  aiQuickBtns: document.querySelectorAll('.btn-quick-ask')
};

// Canvas context for signature
let sigCtx = null;
let isDrawingSignature = false;
let signatureSigned = false;

// Calendar Date State (May 2026 as per local context)
let currentCalendarDate = new Date(2026, 4, 1); // Mayo 2026

// --- LOGICA DE MENU HAMBURGUESA (RESPONSIVE) ---
function setupHamburgerMenu() {
  const hamburgerBtn = document.getElementById('hamburger-btn');
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('sidebar-overlay');

  if (!hamburgerBtn || !sidebar || !overlay) return;

  hamburgerBtn.addEventListener('click', () => {
    sidebar.classList.toggle('open');
    overlay.classList.toggle('active');
    const icon = hamburgerBtn.querySelector('i');
    if (sidebar.classList.contains('open')) {
      icon.className = 'fa-solid fa-xmark';
    } else {
      icon.className = 'fa-solid fa-bars';
    }
  });

  overlay.addEventListener('click', () => {
    sidebar.classList.remove('open');
    overlay.classList.remove('active');
    hamburgerBtn.querySelector('i').className = 'fa-solid fa-bars';
  });
}

function closeMobileMenu() {
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('sidebar-overlay');
  const hamburgerBtn = document.getElementById('hamburger-btn');
  if (sidebar) sidebar.classList.remove('open');
  if (overlay) overlay.classList.remove('active');
  if (hamburgerBtn) hamburgerBtn.querySelector('i').className = 'fa-solid fa-bars';
}

// --- LOGICA DE NAVEGACION POR PESTAÑAS ---
function setupTabs() {
  DOM.tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      DOM.tabs.forEach(t => t.classList.remove('active'));
      DOM.panes.forEach(p => p.classList.remove('active'));
      
      tab.classList.add('active');
      const targetTab = tab.getAttribute('data-tab');
      state.activeTab = targetTab;
      
      const activePane = document.getElementById(`tab-${targetTab}`);
      if (activePane) {
        activePane.classList.add('active');
      }

      // Update Title
      const tabTitles = {
        dashboard: 'Operaciones de Lujo',
        inventory: 'Inventario Inteligente',
        calendar: 'Calendario Visual y Buffers',
        crm: 'Gestión de Clientes & VIP Scoring',
        pos: 'Punto de Venta (POS) y Checkout'
      };
      DOM.topbarTitle.innerText = tabTitles[targetTab] || 'VÉSTIER';

      closeMobileMenu();

      logAudit(`Usuario cambió vista a módulo: <strong>${tabTitles[targetTab]}</strong>`);
      
      // If opening POS, redraw/resize signature canvas
      if (targetTab === 'pos') {
        resizeSignatureCanvas();
      }
    });
  });

  DOM.btnNewRentalQuick.addEventListener('click', () => {
    const posTab = document.querySelector('[data-tab="pos"]');
    if (posTab) posTab.click();
  });
}

// --- LOGICA DE MULTISEDE Y PERFILES DE ACCESO (RBAC) ---
function setupSedeAndRole() {
  DOM.sedeSelector.addEventListener('change', (e) => {
    state.activeSede = e.target.value;
    const sedeName = state.activeSede === 'cali' ? 'Cali - Av. 6 Oeste' : 'Buga - Centro Histórico';
    DOM.currentDateText.innerText = `${sedeName.split(' - ')[0]}, 21 de Mayo de 2026`;
    
    logAudit(`Inquilino cambió a sede activa: <strong>${sedeName}</strong>. Filtrando datos...`, 'status-change');
    
    // Refresh modules affected by Sede
    renderDashboard();
    renderInventory();
    renderCalendar();
  });

  DOM.roleSelector.addEventListener('change', (e) => {
    state.activeRole = e.target.value;
    const roleTitles = {
      propietaria: { name: 'María Paula O.', role: 'Propietaria' },
      asesora: { name: 'Asesora Cali', role: 'Asesora Comercial' }
    };
    
    DOM.userDisplayName.innerText = roleTitles[state.activeRole].name;
    DOM.userDisplayRole.innerText = roleTitles[state.activeRole].role;
    
    logAudit(`Control de Acceso (RBAC): Rol activo cambiado a <strong>${roleTitles[state.activeRole].role}</strong>`, 'status-change');
  });
}

// --- BITÁCORA DE AUDITORÍA (Módulo 8) ---
function logAudit(message, customClass = '') {
  const now = new Date();
  const timeStr = now.toTimeString().split(' ')[0];
  
  state.auditLogs.unshift({ time: timeStr, msg: message });
  
  const entry = document.createElement('div');
  entry.className = 'audit-log-entry';
  entry.innerHTML = `
    <span class="audit-time">[${timeStr}]</span>
    <span class="audit-msg ${customClass}">${message}</span>
  `;
  
  DOM.auditLogsViewport.insertBefore(entry, DOM.auditLogsViewport.firstChild);
}

function initAuditLogs() {
  DOM.auditLogsViewport.innerHTML = '';
  // Load initial seed
  [...state.auditLogs].reverse().forEach(log => {
    const entry = document.createElement('div');
    entry.className = 'audit-log-entry';
    entry.innerHTML = `
      <span class="audit-time">[${log.time}]</span>
      <span class="audit-msg">${log.msg}</span>
    `;
    DOM.auditLogsViewport.appendChild(entry);
  });
  
  DOM.btnQuickAudit.addEventListener('click', () => {
    logAudit(`<strong>Auditoría Completa Exportada</strong> (Inquilino: María Paula Orejuela, Sede: ${state.activeSede.toUpperCase()})`);
    alert(`Bitácora de auditoría inmutable activa. Los registros de base de datos están firmados criptográficamente.`);
  });
}

// --- 1. RENDERIZACIÓN DE DASHBOARD ---
function renderDashboard() {
  // Filter stats by active Sede
  const sedeDresses = state.dresses.filter(d => d.sede === state.activeSede);
  
  // Totals
  const totalRevenue = sedeDresses.reduce((sum, d) => sum + d.revenue, 0);
  const activeRentals = sedeDresses.filter(d => d.status === 'Alquilada' || d.status === 'En Tránsito').length;
  const inCleaning = sedeDresses.filter(d => d.status === 'En Limpieza').length;
  
  // Update HTML
  DOM.statRevenue.innerText = `$${totalRevenue.toLocaleString('es-CO')} COP`;
  DOM.statActiveRentals.innerText = activeRentals;
  DOM.statCleaning.innerText = inCleaning;

  // Render Top CPW dresses
  // CPW = Valor Comercial / Alquileres (o acumulados). En este caso, el CPW del negocio de lujo se mide como:
  // CPW = Valor Comercial / Veces alquilado. Entre más alquileres, más bajo el Costo por Uso (mejor retorno).
  const sortedDresses = [...sedeDresses].sort((a, b) => b.rentals - a.rentals);
  
  DOM.topDressesTbody.innerHTML = '';
  sortedDresses.forEach(dress => {
    const cpw = dress.rentals > 0 ? Math.round(dress.commercialValue / dress.rentals) : dress.commercialValue;
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td><strong>${dress.name}</strong></td>
      <td><span class="vip-badge-small vip">${dress.brand.split(' ')[0]}</span></td>
      <td>${dress.rentals}</td>
      <td>$${dress.revenue.toLocaleString('es-CO')}</td>
      <td><span class="gold-icon"><i class="fa-solid fa-calculator"></i></span> $${cpw.toLocaleString('es-CO')}</td>
    `;
    DOM.topDressesTbody.appendChild(tr);
  });

  // Simple animation for bars
  const bars = document.querySelectorAll('.bar-bar');
  bars.forEach(bar => {
    bar.style.height = '0%';
    setTimeout(() => {
      if (bar.classList.contains('secondary-bar')) {
        bar.style.height = state.activeSede === 'cali' ? '48%' : '90%';
      } else {
        bar.style.height = state.activeSede === 'cali' ? '85%' : '30%';
      }
    }, 100);
  });
}

// --- 2. RENDERIZACIÓN DE INVENTARIO INTELIGENTE ---
function renderInventory() {
  const searchTerm = DOM.searchInventory.value.toLowerCase();
  const selectedBrand = DOM.filterBrand.value;
  const selectedStatus = DOM.filterStatus.value;
  
  const filtered = state.dresses.filter(dress => {
    // Sede filter
    if (dress.sede !== state.activeSede) return false;
    
    // Search
    const matchesSearch = dress.brand.toLowerCase().includes(searchTerm) || 
                          dress.name.toLowerCase().includes(searchTerm) ||
                          dress.id.toLowerCase().includes(searchTerm) ||
                          dress.size.toLowerCase().includes(searchTerm);
                          
    // Brand
    const matchesBrand = selectedBrand === 'all' || dress.brand === selectedBrand;
    
    // Status
    const matchesStatus = selectedStatus === 'all' || dress.status === selectedStatus;
    
    return matchesSearch && matchesBrand && matchesStatus;
  });

  DOM.dressesGrid.innerHTML = '';
  
  if (filtered.length === 0) {
    DOM.dressesGrid.innerHTML = `
      <div class="empty-state" style="grid-column: 1/-1;">
        <i class="fa-solid fa-shirt"></i>
        <p>No se encontraron prendas con los filtros seleccionados.</p>
      </div>
    `;
    return;
  }

  filtered.forEach(dress => {
    const cpw = dress.rentals > 0 ? Math.round(dress.commercialValue / dress.rentals) : dress.commercialValue;
    const depPercent = Math.min(100, Math.round((dress.rentals / dress.depreciationLimit) * 100));
    
    const card = document.createElement('div');
    card.className = 'dress-card';
    card.innerHTML = `
      <div class="dress-card-img-wrapper">
        <img src="${dress.image}" alt="${dress.name}" class="dress-card-img" onerror="this.src='https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=300'">
        <span class="status-badge ${dress.status.toLowerCase().replace(' ', '-')}">${dress.status}</span>
        <span class="quality-badge">${dress.quality}</span>
      </div>
      <div class="dress-card-body">
        <span class="dress-brand">${dress.brand}</span>
        <h4 class="dress-name">${dress.name}</h4>
        <div class="dress-details-row">
          <span><i class="fa-solid fa-expand"></i> ${dress.size}</span>
          <span><i class="fa-solid fa-coins"></i> $${dress.rentPrice.toLocaleString('es-CO')}</span>
          <span><i class="fa-solid fa-arrow-rotate-left"></i> ${dress.rentals} Usos</span>
          <span><i class="fa-solid fa-piggy-bank"></i> $${dress.revenue.toLocaleString('es-CO')}</span>
        </div>
        
        <div class="depreciation-section">
          <div class="depreciation-info">
            <span>Depreciación de Exclusividad</span>
            <span>${dress.rentals}/${dress.depreciationLimit} Rents (${depPercent}%)</span>
          </div>
          <div class="progress-track">
            <div class="progress-bar" style="width: ${depPercent}%"></div>
          </div>
        </div>
        
        <div class="dress-actions">
          <button class="btn btn-secondary btn-small btn-pwa-view-details" data-id="${dress.id}">
            <i class="fa-solid fa-eye"></i> Demo PWA
          </button>
          <button class="btn btn-primary btn-small btn-qr" data-id="${dress.id}" title="Simular Código QR">
            <i class="fa-solid fa-qrcode"></i>
          </button>
        </div>
      </div>
    `;
    DOM.dressesGrid.appendChild(card);
  });
  
  // Attach events
  document.querySelectorAll('.btn-pwa-view-details').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const dressId = btn.getAttribute('data-id');
      showPwaProductDetails(dressId);
    });
  });

  document.querySelectorAll('.btn-qr').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const dressId = btn.getAttribute('data-id');
      triggerQrScanSimulation(dressId);
    });
  });
}

// Search and filter listeners
DOM.searchInventory.addEventListener('input', renderInventory);
DOM.filterBrand.addEventListener('change', renderInventory);
DOM.filterStatus.addEventListener('change', renderInventory);


// --- 3. RENDERIZACIÓN DE CALENDARIO VISUAL ---
function renderCalendar() {
  const month = currentCalendarDate.getMonth();
  const year = currentCalendarDate.getFullYear();
  
  const monthNames = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
  ];
  DOM.calendarMonthYear.innerText = `${monthNames[month]} de ${year}`;

  const firstDayIndex = new Date(year, month, 1).getDay();
  const lastDay = new Date(year, month + 1, 0).getDate();
  
  DOM.calendarDays.innerHTML = '';
  
  // Fill empty days at start of grid
  for (let i = 0; i < firstDayIndex; i++) {
    const emptyDay = document.createElement('div');
    emptyDay.className = 'calendar-day empty';
    DOM.calendarDays.appendChild(emptyDay);
  }

  // Active days
  for (let day = 1; day <= lastDay; day++) {
    const dateString = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    const dayDiv = document.createElement('div');
    dayDiv.className = 'calendar-day';
    
    // Check today (simulate May 21, 2026)
    if (day === 21 && month === 4 && year === 2026) {
      dayDiv.classList.add('today');
    }
    
    dayDiv.innerHTML = `<span class="day-number">${day}</span><div class="day-slots"></div>`;
    
    // Filter bookings on this date for the active Sede
    const dayBookings = state.bookings.filter(b => b.startDate <= dateString && b.endDate >= dateString && b.sede === state.activeSede);
    const slotsContainer = dayDiv.querySelector('.day-slots');
    
    dayBookings.forEach(booking => {
      const dress = state.dresses.find(d => d.id === booking.dressId);
      if (dress) {
        const strip = document.createElement('div');
        strip.className = `booking-strip ${booking.type}`;
        
        if (booking.type === 'reserva') {
          const customer = state.customers.find(c => c.id === booking.customerId);
          const custName = customer ? customer.name.split(' ')[0] : 'Cliente';
          strip.innerText = `${dress.brand.split(' ')[0]}: ${custName}`;
          strip.title = `Alquiler de ${dress.brand} - ${dress.name} por ${customer ? customer.name : ''}`;
        } else {
          strip.innerText = `[Buf] ${dress.brand.split(' ')[0]}`;
          strip.title = `Buffer de Limpieza y desinfección preventiva - 24 horas`;
        }
        
        slotsContainer.appendChild(strip);
      }
    });

    // Add click event to book directly from calendar day
    dayDiv.addEventListener('click', () => {
      // Direct routing to POS
      const posTab = document.querySelector('[data-tab="pos"]');
      if (posTab) {
        posTab.click();
        
        // Fill dates automatically
        DOM.posStartDate.value = dateString;
        // set end date + 2 days (standard 3 days rental)
        const endD = new Date(year, month, day + 2);
        DOM.posEndDate.value = `${endD.getFullYear()}-${String(endD.getMonth() + 1).padStart(2, '0')}-${String(endD.getDate()).padStart(2, '0')}`;
        
        logAudit(`Asistente preparó alquiler desde el calendario para fecha: <strong>${dateString}</strong>`);
      }
    });

    DOM.calendarDays.appendChild(dayDiv);
  }
}

// Calendar Navigation
DOM.btnPrevMonth.addEventListener('click', () => {
  currentCalendarDate.setMonth(currentCalendarDate.getMonth() - 1);
  renderCalendar();
});
DOM.btnNextMonth.addEventListener('click', () => {
  currentCalendarDate.setMonth(currentCalendarDate.getMonth() + 1);
  renderCalendar();
});


// --- 4. RENDERIZACIÓN DE CRM & VIP SCORING ---
function renderCrm() {
  const searchTerm = DOM.crmSearch.value.toLowerCase();
  
  const filtered = state.customers.filter(c => {
    return c.name.toLowerCase().includes(searchTerm) || 
           c.email.toLowerCase().includes(searchTerm) ||
           c.phone.includes(searchTerm) ||
           c.vipTier.toLowerCase().includes(searchTerm);
  });

  DOM.customerListNodes.innerHTML = '';
  
  filtered.forEach((customer, index) => {
    const node = document.createElement('div');
    node.className = 'customer-node';
    node.setAttribute('data-id', customer.id);
    
    // Avatar generator
    const avatarSeed = customer.vipTier === 'Platinum VIP' ? 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=128' :
                       customer.vipTier === 'Gold VIP' ? 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=128' :
                       customer.vipTier === 'VIP' ? 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=128' :
                       'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=128';
    
    node.innerHTML = `
      <img src="${avatarSeed}" alt="${customer.name}" class="cust-node-avatar">
      <div class="cust-node-info">
        <h4>${customer.name}</h4>
        <p>${customer.city}</p>
      </div>
      <span class="vip-badge-small ${customer.vipTier === 'Estándar' ? 'regular' : 'vip'}">${customer.vipTier}</span>
    `;
    
    node.addEventListener('click', () => {
      document.querySelectorAll('.customer-node').forEach(n => n.classList.remove('active'));
      node.classList.add('active');
      showCustomerDetails(customer.id, avatarSeed);
    });

    DOM.customerListNodes.appendChild(node);
  });
}

function showCustomerDetails(customerId, avatarUrl) {
  const customer = state.customers.find(c => c.id === customerId);
  if (!customer) return;

  DOM.crmDetailView.innerHTML = `
    <div class="crm-header-card">
      <img src="${avatarUrl}" alt="${customer.name}" class="crm-large-avatar">
      <div class="crm-header-info">
        <h3>${customer.name}</h3>
        <p>
          <span><i class="fa-solid fa-location-dot"></i> ${customer.city}</span>
          <span><i class="fa-solid fa-phone"></i> ${customer.phone}</span>
          <span class="vip-pill ${customer.vipTier === 'Estándar' ? 'regular' : ''}">${customer.vipTier}</span>
        </p>
      </div>
    </div>
    
    <div class="crm-details-grid">
      <div class="crm-detail-block">
        <h5>Tallas &amp; Preferencias</h5>
        <p><i class="fa-solid fa-expand gold-icon"></i> ${customer.size}</p>
      </div>
      <div class="crm-detail-block">
        <h5>Scoring Confianza</h5>
        <p><i class="fa-solid fa-shield-halved gold-icon"></i> ${customer.scoring}%</p>
      </div>
      <div class="crm-detail-block">
        <h5>Límite Crédito / Garantía</h5>
        <p><i class="fa-solid fa-vault gold-icon"></i> Exento de Depósito</p>
      </div>
    </div>

    <div class="crm-detail-block" style="margin-bottom: 1.5rem;">
      <h5>Notas de Asesoras Comerciales</h5>
      <p style="font-weight: normal; font-style: italic; color: var(--color-text-secondary); font-size: 0.8rem;">
        "${customer.notes}"
      </p>
    </div>

    <div class="crm-history-section">
      <h4><i class="fa-solid fa-clock-rotate-left"></i> Historial de Alquileres de Lujo</h4>
      <table class="luxury-table">
        <thead>
          <tr>
            <th>Prenda</th>
            <th>Marca</th>
            <th>Talla</th>
            <th>Estado Final</th>
          </tr>
        </thead>
        <tbody>
          ${customer.history.map(dressId => {
            const dress = state.dresses.find(d => d.id === dressId);
            if (!dress) return '';
            return `
              <tr>
                <td><strong>${dress.name}</strong></td>
                <td><span class="vip-badge-small vip">${dress.brand}</span></td>
                <td>${dress.size}</td>
                <td><span class="status-badge disponible" style="position:static; font-size:0.55rem; padding: 1px 6px;">Devuelto Impecable</span></td>
              </tr>
            `;
          }).join('')}
        </tbody>
      </table>
    </div>
  `;
  
  logAudit(`CRM consultó Ficha 360° de clienta: <strong>${customer.name}</strong>`);
}

DOM.crmSearch.addEventListener('input', renderCrm);


// --- 5. INTERACTIVIDAD DEL PUNTO DE VENTA (POS / CAJA) ---
function initPosForm() {
  // Populate select boxes
  DOM.posSelectCustomer.innerHTML = '<option value="">-- Selecciona una clienta --</option>';
  state.customers.forEach(c => {
    DOM.posSelectCustomer.innerHTML += `<option value="${c.id}">${c.name} (${c.vipTier})</option>`;
  });

  DOM.posSelectDress.innerHTML = '<option value="">-- Selecciona una prenda --</option>';
  state.dresses.filter(d => d.sede === state.activeSede).forEach(d => {
    const disabledText = d.status !== 'Disponible' ? ` - NO DISPONIBLE (${d.status})` : '';
    DOM.posSelectDress.innerHTML += `<option value="${d.id}" ${d.status !== 'Disponible' ? 'disabled' : ''}>${d.brand} - ${d.name} (${d.size})${disabledText}</option>`;
  });

  // Watch for VIP Exclusivity rule (Module 6 / Rule 3)
  DOM.posSelectDress.addEventListener('change', checkExclusivityRule);
  DOM.posSelectCustomer.addEventListener('change', checkExclusivityRule);
  
  // Form dates setup (default current date)
  const today = new Date(2026, 4, 21); // 21 Mayo 2026
  const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
  DOM.posStartDate.value = todayStr;
  
  const end = new Date(2026, 4, 24);
  const endStr = `${end.getFullYear()}-${String(end.getMonth() + 1).padStart(2, '0')}-${String(end.getDate()).padStart(2, '0')}`;
  DOM.posEndDate.value = endStr;

  // Calculate triggers
  DOM.posStartDate.addEventListener('change', () => DOM.posBtnCalculate.disabled = false);
  DOM.posEndDate.addEventListener('change', () => DOM.posBtnCalculate.disabled = false);
  DOM.posSelectDress.addEventListener('change', () => DOM.posBtnCalculate.disabled = false);
  DOM.posSelectCustomer.addEventListener('change', () => DOM.posBtnCalculate.disabled = false);

  DOM.posBtnCalculate.addEventListener('click', calculatePosValues);
  DOM.posForm.addEventListener('submit', finalizeRental);
  
  setupSignaturePad();
}

function checkExclusivityRule() {
  const custId = DOM.posSelectCustomer.value;
  const dressId = DOM.posSelectDress.value;
  
  if (!custId || !dressId) {
    DOM.posExclusivityAlert.style.display = 'none';
    DOM.posBtnCalculate.disabled = true;
    return;
  }

  const customer = state.customers.find(c => c.id === custId);
  const dress = state.dresses.find(d => d.id === dressId);
  
  // Rules: Category A+ (Editorial) is reserved ONLY for VIP/Gold/Platinum VIP
  if (dress.quality === 'A+' && customer.vipTier === 'Estándar') {
    DOM.posExclusivityAlert.style.display = 'flex';
    DOM.posBtnCalculate.disabled = true;
    DOM.posContractArea.style.display = 'none';
    DOM.posBtnSubmit.disabled = true;
    
    logAudit(`<strong>RESTRICCIÓN VIP BLOQUEADA:</strong> Clienta regular ${customer.name} no califica para prenda Editorial A+ ${dress.brand}`, 'alert-danger');
  } else {
    DOM.posExclusivityAlert.style.display = 'none';
    DOM.posBtnCalculate.disabled = false;
  }
}

function calculatePosValues() {
  const custId = DOM.posSelectCustomer.value;
  const dressId = DOM.posSelectDress.value;
  const sDateStr = DOM.posStartDate.value;
  const eDateStr = DOM.posEndDate.value;

  if (!custId || !dressId || !sDateStr || !eDateStr) return;

  const customer = state.customers.find(c => c.id === custId);
  const dress = state.dresses.find(d => d.id === dressId);

  // Calculate rental days
  const sDate = new Date(sDateStr);
  const eDate = new Date(eDateStr);
  const diffTime = Math.abs(eDate - sDate);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) || 1;

  // Base price (3 days event base)
  const basePrice = dress.rentPrice;
  let extraDaysCost = 0;
  if (diffDays > 3) {
    extraDaysCost = (diffDays - 3) * 80000; // Extra day fee
  }
  const subtotal = basePrice + extraDaysCost;
  
  // Security deposit (50% value commercial unless VIP/Platinum which are EXEMPT)
  const isVipExempt = customer.vipTier.includes('VIP') || customer.vipTier.includes('Platinum');
  const deposit = isVipExempt ? 0 : Math.round(dress.commercialValue * 0.5);
  
  // Premium protection insurance (optional / flat fee)
  const protectionFee = 45000;
  const total = subtotal + protectionFee;

  // Render Receipt Sidebar
  DOM.posSummaryBody.innerHTML = `
    <div class="receipt-wrapper">
      <div class="receipt-dress-preview">
        <img src="${dress.image}" alt="${dress.name}" class="receipt-dress-img">
        <div class="receipt-dress-info">
          <h4>${dress.name}</h4>
          <p>${dress.brand} · Talla ${dress.size}</p>
        </div>
      </div>
      
      <div class="receipt-detail-list">
        <div class="receipt-row">
          <span>Días de Alquiler</span>
          <span><strong>${diffDays} días</strong></span>
        </div>
        <div class="receipt-row">
          <span>Tarifa Evento (3 días base)</span>
          <span>$${basePrice.toLocaleString('es-CO')}</span>
        </div>
        ${extraDaysCost > 0 ? `
        <div class="receipt-row">
          <span>Días Extras (${diffDays - 3})</span>
          <span>$${extraDaysCost.toLocaleString('es-CO')}</span>
        </div>` : ''}
        <div class="receipt-row">
          <span>Protección Premium Integral</span>
          <span>$${protectionFee.toLocaleString('es-CO')}</span>
        </div>
        <div class="receipt-row">
          <span>Depósito en Garantía (Garantía Civil)</span>
          <span>${isVipExempt ? '<strong style="color:#2ecc71;">EXENTO (VIP)</strong>' : `$${deposit.toLocaleString('es-CO')}`}</span>
        </div>
        <div class="receipt-row total-row">
          <span>Total a Pagar</span>
          <span>$${total.toLocaleString('es-CO')} COP</span>
        </div>
      </div>

      <div class="wompi-trust-badge">
        <i class="fa-solid fa-shield-halved"></i>
        <div>
          <strong>Transacción Protegida por Wompi</strong>
          <p style="font-size:0.55rem; color:var(--color-text-muted);">Comisión 2.85% + PSE / Nequi nativo</p>
        </div>
      </div>
    </div>
  `;

  // Generate Responsibility Contract (Module 4)
  generateResponsibilityContract(customer, dress, sDateStr, eDateStr, deposit);

  DOM.posContractArea.style.display = 'block';
  DOM.posBtnSubmit.disabled = false;
  
  logAudit(`Valores de caja calculados. Subtotal: $${subtotal.toLocaleString('es-CO')} · Clienta: <strong>${customer.name}</strong>`);
}

function generateResponsibilityContract(customer, dress, sDate, eDate, deposit) {
  DOM.posContractText.innerHTML = `
    <p><strong>CONTRATO DE ALQUILER DE PRENDA DE ALTA COSTURA Y RESPONSABILIDAD CIVIL</strong></p>
    <p>Con fecha de inicio el <strong>${sDate}</strong> y fecha de finalización el <strong>${eDate}</strong>, se celebra el presente acuerdo entre la boutique <strong>VÉSTIER Luxury Rentals</strong> (representada por el operador César Andrés Lozano) y la clienta firmante <strong>${customer.name}</strong> identificada en la base de datos CRM.</p>
    <p><strong>1. PRENDA:</strong> La clienta recibe en perfecto estado de conservación (Categoría de calidad actual: <strong>${dress.quality}</strong>) el vestido marca <strong>${dress.brand}</strong>, modelo <strong>${dress.name}</strong>, talla <strong>${dress.size}</strong>, compuesto por ${dress.composition}.</p>
    <p><strong>2. DEVOLUCIÓN:</strong> La prenda debe entregarse antes de las 18:00 horas del día de finalización del contrato. Cualquier retraso injustificado incurrirá en una multa de <strong>$100.000 COP por día calendario</strong>, notificada automáticamente a través de correo electrónico (Resend API).</p>
    <p><strong>3. DEPÓSITO Y DAÑOS:</strong> El depósito en garantía establecido es de <strong>$${deposit.toLocaleString('es-CO')} COP</strong> ${deposit === 0 ? '(EXENTO POR CATEGORÍA DE CLIENTELA VIP)' : ''}. La clienta asume la responsabilidad total por rasgaduras, quemaduras, manchas irreparables o pérdida. En caso de pérdida total, se facturará el valor comercial de la prenda: <strong>$${dress.commercialValue.toLocaleString('es-CO')} COP</strong>.</p>
    <p>La firma electrónica estampada a continuación constituye la plena aceptación y firma inalterable del contrato digital.</p>
  `;
}

// Canvas Drawing Signature logic
function setupSignaturePad() {
  sigCtx = DOM.signatureCanvas.getContext('2d');
  sigCtx.strokeStyle = '#C5A880';
  sigCtx.lineWidth = 2;
  
  DOM.signatureCanvas.addEventListener('mousedown', startDrawingSig);
  DOM.signatureCanvas.addEventListener('mousemove', drawSig);
  DOM.signatureCanvas.addEventListener('mouseup', stopDrawingSig);
  DOM.signatureCanvas.addEventListener('mouseout', stopDrawingSig);

  // Mobile touch
  DOM.signatureCanvas.addEventListener('touchstart', (e) => {
    e.preventDefault();
    const touch = e.touches[0];
    const mouseEvent = new MouseEvent('mousedown', {
      clientX: touch.clientX,
      clientY: touch.clientY
    });
    DOM.signatureCanvas.dispatchEvent(mouseEvent);
  });
  DOM.signatureCanvas.addEventListener('touchmove', (e) => {
    e.preventDefault();
    const touch = e.touches[0];
    const mouseEvent = new MouseEvent('mousemove', {
      clientX: touch.clientX,
      clientY: touch.clientY
    });
    DOM.signatureCanvas.dispatchEvent(mouseEvent);
  });
  
  DOM.btnClearSig.addEventListener('click', clearSignature);
}

function resizeSignatureCanvas() {
  // Reset signature canvas size matching visual wrapper width
  const wrapper = DOM.signatureCanvas.parentElement;
  if (wrapper) {
    DOM.signatureCanvas.width = wrapper.clientWidth - 2;
    DOM.signatureCanvas.height = 120;
    clearSignature();
  }
}

function startDrawingSig(e) {
  isDrawingSignature = true;
  sigCtx.beginPath();
  // Get coordinate offset relative to canvas
  const rect = DOM.signatureCanvas.getBoundingClientRect();
  sigCtx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
}

function drawSig(e) {
  if (!isDrawingSignature) return;
  const rect = DOM.signatureCanvas.getBoundingClientRect();
  sigCtx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
  sigCtx.stroke();
  signatureSigned = true;
}

function stopDrawingSig() {
  isDrawingSignature = false;
}

function clearSignature() {
  if (!sigCtx) return;
  sigCtx.clearRect(0, 0, DOM.signatureCanvas.width, DOM.signatureCanvas.height);
  signatureSigned = false;
}

function finalizeRental(e) {
  e.preventDefault();
  
  if (!signatureSigned) {
    alert('Por favor, firme el contrato digital antes de confirmar el alquiler.');
    return;
  }

  const custId = DOM.posSelectCustomer.value;
  const dressId = DOM.posSelectDress.value;
  const sDateStr = DOM.posStartDate.value;
  const eDateStr = DOM.posEndDate.value;
  const payMethod = document.querySelector('input[name="pay-method"]:checked')?.value || 'wompi';

  const customer = state.customers.find(c => c.id === custId);
  const dress = state.dresses.find(d => d.id === dressId);

  // Update Dress state
  dress.status = 'Alquilada';
  dress.rentals += 1;
  dress.revenue += dress.rentPrice;

  // Add Reservation
  const newBookingId = 'B-' + Date.now();
  state.bookings.push({
    id: newBookingId,
    dressId: dress.id,
    customerId: customer.id,
    startDate: sDateStr,
    endDate: eDateStr,
    type: 'reserva',
    sede: state.activeSede
  });

  // AUTOMATIC CLEANING BUFFER (Module 2): Add 24h cleaning block day after return
  const endDate = new Date(eDateStr);
  const bufferDay = new Date(endDate);
  bufferDay.setDate(endDate.getDate() + 1);
  const bufferDayStr = `${bufferDay.getFullYear()}-${String(bufferDay.getMonth() + 1).padStart(2, '0')}-${String(bufferDay.getDate()).padStart(2, '0')}`;

  state.bookings.push({
    id: `${newBookingId}-buf`,
    dressId: dress.id,
    startDate: bufferDayStr,
    endDate: bufferDayStr,
    type: 'buffer',
    sede: state.activeSede
  });

  // Log in Audit Trail
  logAudit(`<strong>Contrato Creado:</strong> Alquiler #${newBookingId.split('-')[1]} autorizado mediante firma biométrica.`, 'contract');
  logAudit(`<strong>Cobro Caja (POS):</strong> Transacción Wompi aprobada por $${(dress.rentPrice + 45000).toLocaleString('es-CO')} COP.`, 'contract');
  logAudit(`<strong>Buffer de Limpieza Activo:</strong> Prenda ${dress.brand} bloqueada para saneamiento el día ${bufferDayStr}.`, 'status-change');

  // Depreciación inteligente (Module 1 / Rule 4)
  if (dress.rentals >= dress.depreciationLimit) {
    const oldQual = dress.quality;
    dress.quality = dress.quality === 'A+' ? 'A' :
                    dress.quality === 'A' ? 'B+' :
                    dress.quality === 'B+' ? 'B' : 'C';
    logAudit(`<strong>Depreciación Automática:</strong> Prenda ${dress.id} superó ${dress.rentals} alquileres. Degradada de ${oldQual} a ${dress.quality}.`, 'status-change');
  }

  // Refresh modules
  renderDashboard();
  renderInventory();
  renderCalendar();
  
  // Dynamic Success State on Receipt Sidebar
  DOM.posSummaryBody.innerHTML = `
    <div class="empty-receipt" style="color:#2ecc71;">
      <i class="fa-solid fa-circle-check" style="color:#2ecc71; font-size:3.5rem; filter: drop-shadow(0 0 10px rgba(46, 204, 113, 0.4));"></i>
      <h3 style="color:#FAF9F6; font-family:var(--font-display); font-size:1.35rem; margin-top:0.75rem;">¡Alquiler Completado!</h3>
      <p style="font-size:0.75rem; max-width:240px; margin: 0.5rem 0;">Contrato digital firmado, guardado y enviado automáticamente por Resend a <strong>${customer.email}</strong>.</p>
      
      <button class="btn btn-primary btn-small" id="btn-download-pdf-demo" style="margin-top:1rem;">
        <i class="fa-solid fa-file-pdf"></i> Descargar Contrato PDF
      </button>
    </div>
  `;

  document.getElementById('btn-download-pdf-demo').addEventListener('click', () => {
    alert('Simulador de Generación PDF: Descargando "Contrato_Responsabilidad_Véstier_' + newBookingId + '.pdf"');
  });

  // Reset form
  DOM.posForm.reset();
  clearSignature();
  DOM.posContractArea.style.display = 'none';
  DOM.posBtnSubmit.disabled = true;

  // Show alert
  alert('Alquiler procesado exitosamente. Se ha bloqueado el vestido en el inventario y se ha programado el buffer de limpieza.');
}


// --- 6. SIMULACIÓN DE AUTOGESTIÓN QR & SIMULADOR SMARTPHONE (Módulo 3) ---
function initSmartphoneSimulator() {
  renderMobileCatalog();
  
  DOM.phoneQrScanBtn.addEventListener('click', () => {
    DOM.phonePwaHome.style.display = 'none';
    DOM.phonePwaProduct.style.display = 'none';
    DOM.phonePwaScanner.style.display = 'flex';
    
    logAudit(`PWA Cliente: <strong>Simulador de Cámara QR Abierto</strong> en Smartphone`);
  });

  DOM.btnCancelScan.addEventListener('click', () => {
    DOM.phonePwaScanner.style.display = 'none';
    DOM.phonePwaHome.style.display = 'flex';
  });

  DOM.phoneProductBack.addEventListener('click', () => {
    DOM.phonePwaProduct.style.display = 'none';
    DOM.phonePwaHome.style.display = 'flex';
  });
}

function renderMobileCatalog() {
  DOM.phoneMiniCatalog.innerHTML = '';
  // Show 4 catalog dresses
  const mobileDresses = state.dresses.filter(d => d.sede === state.activeSede).slice(0, 4);
  
  mobileDresses.forEach(dress => {
    const card = document.createElement('div');
    card.className = 'phone-mini-card';
    card.innerHTML = `
      <img src="${dress.image}" alt="${dress.name}" class="phone-mini-img" onerror="this.src='https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=150'">
      <div class="phone-mini-info">
        <span class="phone-mini-brand">${dress.brand.split(' ')[0]}</span>
        <h5 class="phone-mini-name">${dress.name}</h5>
      </div>
    `;
    card.addEventListener('click', () => {
      showPwaProductDetails(dress.id);
    });
    DOM.phoneMiniCatalog.appendChild(card);
  });
}

function triggerQrScanSimulation(dressId) {
  // If scanner isn't open, open it
  DOM.phonePwaHome.style.display = 'none';
  DOM.phonePwaProduct.style.display = 'none';
  DOM.phonePwaScanner.style.display = 'flex';
  
  logAudit(`Asesora comercial activó simulador de escaneo para etiqueta QR de prenda: <strong>${dressId}</strong>`);
  
  // Simulate delay, beep and unlock
  setTimeout(() => {
    // Flash scanner overlay
    const overlay = document.querySelector('.phone-scanner-overlay');
    if (overlay) {
      overlay.style.background = 'rgba(46, 204, 113, 0.4)';
      setTimeout(() => {
        overlay.style.background = 'transparent';
        
        // Show PWA Product page
        showPwaProductDetails(dressId);
        logAudit(`PWA Cliente: <strong>Etiqueta QR Escaneada con Éxito</strong>. Redirigiendo a ficha pública...`, 'contract');
      }, 500);
    }
  }, 1000);
}

function showPwaProductDetails(dressId) {
  const dress = state.dresses.find(d => d.id === dressId);
  if (!dress) return;

  // Toggle views
  DOM.phonePwaHome.style.display = 'none';
  DOM.phonePwaScanner.style.display = 'none';
  DOM.phonePwaProduct.style.display = 'flex';

  // Fill details
  DOM.phoneProductTitle.innerText = dress.brand;
  DOM.phoneProductImg.src = dress.image;
  DOM.phoneProductName.innerText = dress.name;
  DOM.phoneProductPrice.innerText = `$${dress.rentPrice.toLocaleString('es-CO')} / Evento`;
  DOM.phoneProductQuality.innerText = dress.quality;
  DOM.phoneProductSize.innerText = dress.size;
  
  // Status badge PWA
  DOM.phoneProductStatus.innerText = dress.status;
  DOM.phoneProductStatus.className = `phone-status-badge ${dress.status === 'Disponible' ? 'available' : 'rented'}`;

  // Direct WhatsApp query
  const textMsg = encodeURIComponent(`Hola VÉSTIER, escaneé el código QR del vestido ${dress.brand} - ${dress.name} (${dress.id}) en Cali y me gustaría reservarlo.`);
  DOM.phoneWhatsappLink.href = `https://wa.me/573164984843?text=${textMsg}`;

  // Availability calendar strip
  DOM.phoneProductAvail.innerHTML = '';
  // Show next 7 days in PWA strip
  for (let i = 0; i < 7; i++) {
    const d = new Date(2026, 4, 21 + i); // May 21 + i
    const dStr = `2026-05-${21 + i}`;
    
    // Check state on this date
    const booking = state.bookings.find(b => b.startDate <= dStr && b.endDate >= dStr && b.dressId === dress.id);
    let dayClass = 'available';
    let statusLabel = 'Libre';
    
    if (booking) {
      if (booking.type === 'reserva') {
        dayClass = 'rented';
        statusLabel = 'Rented';
      } else {
        dayClass = 'buffer';
        statusLabel = 'Clean';
      }
    }

    const dayName = d.toLocaleDateString('es-CO', { weekday: 'short' }).charAt(0).toUpperCase() + d.toLocaleDateString('es-CO', { weekday: 'short' }).slice(1, 2);
    
    DOM.phoneProductAvail.innerHTML += `
      <div class="phone-cal-day ${dayClass}">
        <span>${dayName}</span>
        <span class="pcd-num">${21 + i}</span>
        <span style="font-size:0.35rem; font-weight:600; text-transform:uppercase;">${statusLabel}</span>
      </div>
    `;
  }
}


// --- 7. AGENTE DE INTELIGENCIA ARTIFICIAL (Módulo 7 - CELIA) ---
function initAiChatbot() {
  DOM.aiChatForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const query = DOM.aiChatInput.value;
    if (!query) return;
    
    handleAiQuery(query);
    DOM.aiChatInput.value = '';
  });

  DOM.aiQuickBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const query = btn.getAttribute('data-query');
      handleAiQuery(query);
    });
  });
}

function handleAiQuery(query) {
  // Push user message
  const userMsg = document.createElement('div');
  userMsg.className = 'ai-message user';
  userMsg.innerHTML = `<p>${query}</p>`;
  DOM.aiChatBody.appendChild(userMsg);
  DOM.aiChatBody.scrollTop = DOM.aiChatBody.scrollHeight;

  logAudit(`AI Agent: <strong>Consulta recibida:</strong> "${query}"`);

  // Simulate thinking and answer
  setTimeout(() => {
    let response = "";
    const lowerQuery = query.toLowerCase();

    if (lowerQuery.includes('disponible') || lowerQuery.includes('catálogo') || lowerQuery.includes('vestidos')) {
      const avail = state.dresses.filter(d => d.status === 'Disponible' && d.sede === state.activeSede);
      response = `Actualmente en la sede de <strong>${state.activeSede.toUpperCase()}</strong> tengo ${avail.length} vestidos listos para entrega inmediata: <br>` +
                 avail.map(d => `· <strong>${d.brand}</strong> - ${d.name} (Talla ${d.size}) - $${d.rentPrice.toLocaleString('es-CO')} COP`).join('<br>');
    } 
    else if (lowerQuery.includes('multa') || lowerQuery.includes('demora') || lowerQuery.includes('devolución') || lowerQuery.includes('tardía')) {
      response = `De acuerdo con la <strong>política de VÉSTIER</strong>, la entrega debe realizarse antes de las 18:00 horas del día de finalización. La devolución tardía incurre en una multa de <strong>$100.000 COP por día calendario</strong>. Notificamos automáticamente el vencimiento vía SMS y correo Resend.`;
    } 
    else if (lowerQuery.includes('rentable') || lowerQuery.includes('ingresos') || lowerQuery.includes('cpw')) {
      // Find dress with highest revenue
      const top = [...state.dresses].sort((a, b) => b.revenue - a.revenue)[0];
      const cpw = top.rentals > 0 ? Math.round(top.commercialValue / top.rentals) : top.commercialValue;
      response = `Analizando las métricas en Neon DB, la prenda más rentable es el <strong>${top.brand} - ${top.name}</strong> con <strong>${top.rentals} alquileres</strong> y un retorno acumulado de <strong>$${top.revenue.toLocaleString('es-CO')} COP</strong>. Su Costo por Uso (CPW) es de $${cpw.toLocaleString('es-CO')} COP.`;
    } 
    else if (lowerQuery.includes('garantía') || lowerQuery.includes('depósito') || lowerQuery.includes('seguridad')) {
      response = `Para garantizar el activo de lujo, exigimos un depósito de seguridad del <strong>50% del valor comercial</strong> de la prenda. <em>Nota:</em> Las clientas en categoría VIP o Platinum VIP del CRM están <strong>100% exentas</strong> de este depósito.`;
    } 
    else {
      response = `Entendido. Te comento que en VÉSTIER trabajamos con marcas exclusivas como Dolce & Gabbana, Louis Vuitton, Silvia Tcherassi y Versace. Puedes reservar citas en Cali (Av 6 Oeste) o en Buga llamando al 316 498 4843. ¿Te gustaría saber si hay alguna talla en particular disponible?`;
    }

    const botMsg = document.createElement('div');
    botMsg.className = 'ai-message bot';
    botMsg.innerHTML = `<p>${response}</p>`;
    DOM.aiChatBody.appendChild(botMsg);
    DOM.aiChatBody.scrollTop = DOM.aiChatBody.scrollHeight;
    
    logAudit(`AI Agent: <strong>Respuesta enviada</strong> exitosamente.`);
  }, 800);
}


// --- INITIALIZATION ON DOCUMENT LOAD ---
document.addEventListener('DOMContentLoaded', () => {
  setupHamburgerMenu();
  setupTabs();
  setupSedeAndRole();
  initAuditLogs();
  
  // Modules default
  renderDashboard();
  renderInventory();
  renderCalendar();
  renderCrm();
  initPosForm();
  
  // Smartphone PWA
  initSmartphoneSimulator();
  initAiChatbot();
  
  logAudit('<strong>Consola Administrativa de Ventas Cargada</strong>. Listo para demostración interactiva.');
});
