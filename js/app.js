import { dict } from './dictionary.js';
import { cctvBrands, cctvDB } from './data/cctv.js';
import { securityBrands, securityDB } from './data/security.js';
import { accessBrands, accessDB } from './data/access.js';
import { fireBrands, fireDB } from './data/fire.js';
import { gateBrands, gateDB } from './data/gate.js';
import { cableBrands, cableDB } from './data/cables.js';

const brandsData = {
    cctv: cctvBrands, security: securityBrands, access: accessBrands,
    fire: fireBrands, gate: gateBrands, cable: cableBrands
};

const productDB = {
    cctv: cctvDB, security: securityDB, access: accessDB,
    fire: fireDB, gate: gateDB, cable: cableDB
};

const categoryIcons = {
    cctv: ['icons/cctv/cctv1.png', 'icons/cctv/cctv2.png', 'icons/cctv/cctv3.png', 'icons/cctv/cctv4.png', 'icons/cctv/cctv5.png', 'icons/cctv/cctv6.png', 'icons/cctv/cctv7.png', 'icons/cctv/cctv8.png', 'icons/cctv/cctv9.png', 'icons/cctv/cctv10.png', 'icons/cctv/cctv11.avif', 'icons/cctv/cctv12.jpg', 'icons/cctv/cctv13.png', 'icons/cctv/cctv14.jpg'],
    security: ['icons/security/security1.png', 'icons/security/security2.jpg', 'icons/security/security3.jpg', 'icons/security/security4.webp', 'icons/security/security5.png', 'icons/security/security6.jpg', 'icons/security/security7.png', 'icons/security/security8.webp', 'icons/security/security9.png', 'icons/security/security10.png'],
    access: ['icons/access/reader.png', 'icons/access/keypad.png', 'icons/access/lock.png'],
    fire: ['icons/fire/smoke.png', 'icons/fire/heat.png', 'icons/fire/mcp.png'],
    gate: ['icons/gate/barrier.png', 'icons/gate/gate.png', 'icons/gate/turnstile.png']
};

const loadedIcons = {};
Object.values(categoryIcons).forEach(arr => arr.forEach(src => { const img = new Image(); img.src = src; img.onload = () => draw(); loadedIcons[src] = img; }));

// Global State
let currentLang = 'en', currentCat = 'cctv';
let blueprint = null, blueprintData = null; 
let devices = [], cables = [];
let selectedDevice = null, isDragging = false, activePath = null, mousePos = {x:0, y:0};
let currentProduct = null, currentIcon = '';
let blueprints = [], activeBlueprintId = null;

// Wizard State
let blueprintsPendingSetup = [];
let isWizardActive = false;
let wizardBlueprint = null;
let currentWizardStep = 1;
let scaleStartPos = null, scaleCurrentPos = null;
let cropStartPos = null, cropCurrentPos = null, isCroppingCanvas = false;

// Settings Default
let globalIconSize = 24;

const canvas = document.getElementById('plannerCanvas'); 
const ctx = canvas.getContext('2d', { willReadFrequently: true });
const fovInput = document.getElementById('fovInput'), distInput = document.getElementById('distInput'), sensInput = document.getElementById('sensInput');
const brandSelect = document.getElementById('brandSelect'), subSelect = document.getElementById('subCatSelect'), prodListDiv = document.getElementById('product-list-container');
const bomList = document.getElementById('bom-list'), iconPickerList = document.getElementById('icon-picker-list');

canvas.width = 1000; canvas.height = 700;

// Helper: Convert hex color to rgba for drawing FOV
function hexToRgba(hex, alpha) {
    if(!hex) return `rgba(79, 70, 229, ${alpha})`; 
    let r = parseInt(hex.slice(1, 3), 16),
        g = parseInt(hex.slice(3, 5), 16),
        b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

// Get standard category color
function getCatColor(cat) {
    return {cctv:'#4f46e5', security:'#b400ff', access:'#0088ff', fire:'#ef4444', gate:'#f59e0b'}[cat] || '#4f46e5';
}

// ==========================================
// WINDOW EXPORTS
// ==========================================
window.setLanguage = (lang) => {
    currentLang = lang; 
    document.getElementById('btn-en').classList.toggle('active', lang === 'en'); 
    document.getElementById('btn-is').classList.toggle('active', lang === 'is');
    document.querySelectorAll('[data-i18n]').forEach(el => { if(dict[lang][el.getAttribute('data-i18n')]) el.innerHTML = dict[lang][el.getAttribute('data-i18n')]; });
    updateUIForCategory(); draw(); 
};

window.setCategory = (cat, btn) => {
    if (isWizardActive) return; 
    currentCat = cat; 
    document.querySelectorAll('.tool-btn').forEach(b => b.classList.remove('active')); 
    btn.classList.add('active');
    selectedDevice = null; 
    closePropertiesPanel(); 
    if(activePath) finishCable(); 
    updateUIForCategory(); draw();
};

window.deleteSelected = () => { 
    if (selectedDevice) { 
        devices = devices.filter(d => d !== selectedDevice); 
        selectedDevice = null; 
        document.getElementById('deleteBtn').classList.remove('visible'); 
        closePropertiesPanel();
        draw(); 
    } 
};

window.clearCanvas = () => { 
    if(confirm(dict[currentLang].msg_clear)) { 
        devices = []; cables = []; selectedDevice = null; activePath = null; 
        closePropertiesPanel();
        draw(); 
    } 
};

window.removeOneItem = (itemName, type) => {
    if (type === 'device') {
        for (let i = devices.length - 1; i >= 0; i--) {
            let d = devices[i], n = `${d.brand} ${d.product.name} (${dict[currentLang].sub[d.cat][d.subIndex]})`;
            if (n === itemName) { 
                if (selectedDevice === d) { 
                    selectedDevice = null; document.getElementById('deleteBtn').classList.remove('visible'); 
                    closePropertiesPanel();
                } 
                devices.splice(i, 1); break; 
            }
        }
    } else if (type === 'cable') {
        for (let i = cables.length - 1; i >= 0; i--) {
            let c = cables[i], n = dict[currentLang].sub['cable'][c.subIndex] + " (Run)";
            if (n === itemName) { cables.splice(i, 1); break; }
        }
    }
    draw(); 
};

window.exportLayout = (format) => {
    let counts = {};
    devices.forEach(d => { const n = `${d.brand} ${d.product.name} (${dict[currentLang].sub[d.cat][d.subIndex]})`; counts[n] = (counts[n]||0)+1; });
    cables.forEach(c => { const n = dict[currentLang].sub['cable'][c.subIndex]+" (Run)"; counts[n] = (counts[n]||0)+1; });

    const tempCanvas = document.createElement('canvas'); tempCanvas.width = Math.max(canvas.width, 800); tempCanvas.height = canvas.height + (Object.keys(counts).length * 35 + 120);
    const tCtx = tempCanvas.getContext('2d');
    
    tCtx.fillStyle = '#ffffff'; tCtx.fillRect(0, 0, tempCanvas.width, tempCanvas.height); tCtx.drawImage(canvas, 0, 0);
    tCtx.fillStyle = '#121212'; tCtx.fillRect(0, canvas.height, tempCanvas.width, tempCanvas.height - canvas.height); 
    tCtx.fillStyle = '#4f46e5'; tCtx.font = "bold 24px 'Segoe UI'"; tCtx.fillText(dict[currentLang].export_title, 40, canvas.height + 50);
    tCtx.fillStyle = '#ffffff'; tCtx.font = "bold 18px 'Segoe UI'"; tCtx.fillText(dict[currentLang].export_subtitle + " | " + new Date().toLocaleDateString(), 40, canvas.height + 80);

    let y = canvas.height + 120; tCtx.font = "16px 'Segoe UI'";
    for (let [item, data] of Object.entries(counts)) { tCtx.fillStyle = '#cccccc'; tCtx.fillText(item, 40, y); tCtx.fillStyle = '#4f46e5'; tCtx.font = "bold 16px 'Segoe UI'"; tCtx.fillText(data.count + "x", 600, y); y += 35; }

    const imgData = tempCanvas.toDataURL('image/jpeg', 0.95);
    if (format === 'jpg') { 
        const link = document.createElement('a'); link.download = `CCTV-Design-${currentLang}.jpg`; link.href = imgData; link.click(); 
    }
    else if (format === 'pdf') { 
        const { jsPDF } = window.jspdf; const pdf = new jsPDF({ orientation: tempCanvas.width > tempCanvas.height ? 'l' : 'p', unit: 'px', format: [tempCanvas.width, tempCanvas.height] }); pdf.addImage(imgData, 'JPEG', 0, 0, tempCanvas.width, tempCanvas.height); pdf.save(`CCTV-Design-${currentLang}.pdf`); 
    }
};

// ==========================================
// INTERNAL UI LOGIC
// ==========================================
function renderIconPicker(catOverride) {
    if (!iconPickerList) return;
    const cat = catOverride || currentCat; iconPickerList.innerHTML = '';
    if(!categoryIcons[cat]) { document.getElementById('icon-picker-group').classList.add('hidden'); return; }
    document.getElementById('icon-picker-group').classList.remove('hidden');
    
    categoryIcons[cat].forEach((iconPath, index) => {
        const btn = document.createElement('div'); btn.className = 'icon-btn';
        btn.innerHTML = `<img src="${iconPath}" alt="icon">`;
        if (selectedDevice && selectedDevice.cat !== 'cable') { 
            if (iconPath === selectedDevice.icon) btn.classList.add('active'); 
        } else if (index === 0) { 
            btn.classList.add('active'); currentIcon = iconPath; 
        }
        
        btn.onclick = () => { 
            document.querySelectorAll('.icon-btn').forEach(b => b.classList.remove('active')); 
            btn.classList.add('active'); 
            currentIcon = iconPath; 
        };
        iconPickerList.appendChild(btn);
    });
}

function updateUIForCategory() {
    if (isWizardActive) return;
    document.getElementById('deleteBtn').classList.remove('visible');
    
    if (currentCat === 'select') {
        ['brand-selector-group', 'equip-selector-group', 'product-list-group'].forEach(id => document.getElementById(id).classList.add('hidden')); 
        document.getElementById('mode-hint').innerHTML = dict[currentLang].hint_edit;
        
        if(selectedDevice && selectedDevice.cat !== 'cable') {
            document.getElementById('deleteBtn').classList.add('visible'); 
        } 
    } else if (currentCat === 'cable') {
        ['brand-selector-group', 'product-list-group', 'dynamic-controls', 'icon-picker-group'].forEach(id => document.getElementById(id).classList.add('hidden')); 
        document.getElementById('equip-selector-group').classList.remove('hidden'); 
        document.getElementById('mode-hint').innerHTML = dict[currentLang].hint_cable; 
        populateSubCategories();
    } else {
        ['brand-selector-group', 'equip-selector-group', 'product-list-group'].forEach(id => document.getElementById(id).classList.remove('hidden')); 
        document.getElementById('mode-hint').innerHTML = dict[currentLang].hint_place;
        
        if(brandsData[currentCat]) { 
            brandSelect.innerHTML = ''; 
            brandsData[currentCat].forEach(b => { const opt = document.createElement('option'); opt.value = b; opt.innerText = b; brandSelect.appendChild(opt); }); 
        }
        populateSubCategories(); 
        renderIconPicker();
    }
}

function populateSubCategories() {
    if (currentCat === 'select') return;
    subSelect.innerHTML = ''; 
    dict[currentLang].sub[currentCat].forEach((item, index) => { 
        const opt = document.createElement('option'); opt.value = index; opt.innerText = item; subSelect.appendChild(opt); 
    });
    renderProductList();
}

brandSelect.addEventListener('change', renderProductList); 
subSelect.addEventListener('change', renderProductList);

// UPDATED TO SUPPORT CUSTOM IMAGES, 64px PADDED BOXES & PURPLE TEXT
function renderProductList() {
    if (currentCat === 'select' || currentCat === 'cable') return;
    prodListDiv.innerHTML = '';

    const brand = brandSelect.value;
    const typeIndex = subSelect.value;
    let catDB = productDB[currentCat];
    let products = (catDB && catDB[brand] && catDB[brand][typeIndex]) ? catDB[brand][typeIndex] : [];

    products.forEach((prod) => {
        const item = document.createElement('div');
        item.className = 'product-item';
        item.onclick = () => selectProduct(prod, item);

        // Build the HTML card
        item.innerHTML = `
            <div class="product-img" style="background: #ffffff; border-radius: 12px; width: 64px; height: 64px; flex-shrink: 0; overflow: hidden; display: flex; align-items: center; justify-content: center; border: 1px solid rgba(255,255,255,0.1); padding: 4px;">
                <img src="${prod.img}" alt="${prod.name}" 
                     style="width: 100%; height: 100%; object-fit: contain;" 
                     onerror="this.src='https://img.icons8.com/ios/100/64748b/camera.png';">
            </div>
            <div class="product-info" style="display: flex; flex-direction: column; justify-content: center; margin-left: 12px;">
                <div class="product-name" style="font-size: 0.95rem; font-weight: 700;">${prod.name}</div>
                <div class="product-desc" style="font-size: 0.75rem; color: #8b949e; margin-top: 2px;">${prod.desc}</div>
                <div class="product-specs" style="font-size: 0.75rem; color: #8b5cf6; font-weight: 600; margin-top: 4px;">${prod.specs}</div>
            </div>`; 

        prodListDiv.appendChild(item);
    });
    if(products.length > 0) selectProduct(products[0], prodListDiv.firstChild);
}

function selectProduct(prod, element) {
    currentProduct = prod; 
    document.querySelectorAll('.product-item').forEach(el => el.classList.remove('active')); 
    if(element) element.classList.add('active');
    
    const isGate = (currentCat === 'gate'); 
    document.getElementById('fovLabelText').innerText = isGate ? dict[currentLang].lbl_width : dict[currentLang].lbl_angle; 
    document.getElementById('distLabelText').innerText = isGate ? dict[currentLang].lbl_length : dict[currentLang].lbl_range;
    
    const engName = dict['en'].sub[currentCat][subSelect.value || 0]; 
    const needsVision = ((['cctv', 'gate'].includes(currentCat) && !engName.includes('NVR')) || (currentCat === 'security' && (engName.includes('Motion') || engName.includes('Smoke')))); 
    document.getElementById('dynamic-controls').classList.toggle('hidden', !needsVision);
    
    fovInput.value = prod.defFov; distInput.value = prod.defRange; 
}


// ==========================================
// DYNAMIC PROPERTIES PANEL LOGIC
// ==========================================

function openPropertiesPanel(dev) {
    const panel = document.getElementById('properties-panel');
    panel.classList.remove('hidden');
    document.getElementById('prop-title').innerText = dev.cat === 'cctv' ? '📷 Camera Properties' : '📡 Sensor Properties';
    
    // Inject values from device
    document.getElementById('prop-height-slider').value = dev.height || 3;
    document.getElementById('prop-height-num').value = dev.height || 3;
    
    document.getElementById('prop-pitch-slider').value = dev.pitch || 45;
    document.getElementById('prop-pitch-num').value = dev.pitch || 45;
    
    document.getElementById('prop-fov-slider').value = dev.fov || 75;
    document.getElementById('prop-fov-num').value = dev.fov || 75;
    
    document.getElementById('prop-color-picker').value = dev.color || getCatColor(dev.cat);
    
    document.getElementById('prop-size-slider').value = dev.size || globalIconSize;
    document.getElementById('prop-size-num').value = dev.size || globalIconSize;
    
    document.getElementById('prop-rotation-slider').value = dev.iconRot || 0;
    document.getElementById('prop-rotation-num').value = dev.iconRot || 0;

    // --- NEW: Update Information Tab ---
    document.getElementById('info-prod-name').innerText = dev.brand + ' ' + dev.product.name;
    document.getElementById('info-prod-desc').innerText = dev.product.desc;
    document.getElementById('info-prod-specs').innerText = dev.product.specs;
    
    // Smart Fallback Search Links (in case you don't have explicit URLs yet)
    let searchUrl = `https://www.google.com/search?q=${encodeURIComponent(dev.brand + ' ' + dev.product.name)}`;
    document.getElementById('info-link-manuf').href = dev.product.url || searchUrl;
    document.getElementById('info-link-ds').href = dev.product.datasheet || (searchUrl + '+datasheet+pdf');
    // -----------------------------------

    // Build icon list inside panel
    const pIconList = document.getElementById('prop-icon-list');
    pIconList.innerHTML = '';
    if(categoryIcons[dev.cat]) {
        categoryIcons[dev.cat].forEach((iconPath) => {
            const btn = document.createElement('div'); btn.className = 'icon-btn';
            btn.innerHTML = `<img src="${iconPath}" alt="icon">`;
            if (iconPath === dev.icon) btn.classList.add('active');
            
            btn.onclick = () => { 
                document.querySelectorAll('#prop-icon-list .icon-btn').forEach(b => b.classList.remove('active')); 
                btn.classList.add('active'); 
                selectedDevice.icon = iconPath;
                draw();
            };
            pIconList.appendChild(btn);
        });
    }
    
    window.updateDiagramAndRange();
}

function closePropertiesPanel() {
    document.getElementById('properties-panel').classList.add('hidden');
}

window.updateDiagramAndRange = () => {
    if(!selectedDevice) return;
    
    let h = parseFloat(document.getElementById('prop-height-num').value) || 3;
    let pitch = parseFloat(document.getElementById('prop-pitch-num').value) || 45;
    
    // TRIGONOMETRY: Dist = Height * Tan(angle from vertical)
    let angleRad = pitch * Math.PI / 180;
    let distReal = h * Math.tan(angleRad);
    
    document.getElementById('prop-calc-dist').innerText = distReal.toFixed(2);
    
    // Save state back to device
    selectedDevice.height = h;
    selectedDevice.pitch = pitch;
    selectedDevice.fov = parseFloat(document.getElementById('prop-fov-num').value) || 75;
    selectedDevice.color = document.getElementById('prop-color-picker').value;
    selectedDevice.size = parseInt(document.getElementById('prop-size-num').value) || globalIconSize;
    selectedDevice.iconRot = parseInt(document.getElementById('prop-rotation-num').value) || 0;
    
    // Scale distance to pixels
    let activeScale = 20;
    if (activeBlueprintId !== null) {
        let currentBp = blueprints.find(b => b.id === activeBlueprintId);
        if (currentBp && currentBp.pxPerMeter) activeScale = currentBp.pxPerMeter;
    }
    selectedDevice.range = distReal * activeScale;

    drawSideDiagram(h, distReal, pitch);
    draw(); 
};

// Visualize the Side-Profile Triangle Diagram
function drawSideDiagram(h, d, angle) {
    const canvas = document.getElementById('angleDiagramCanvas');
    if(!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    const padX = 50; const padY = 20;
    const maxW = canvas.width - padX * 2;
    const maxH = canvas.height - padY * 2;
    
    const scale = Math.min(maxW / Math.max(d, 1), maxH / Math.max(h, 1));
    
    const originX = padX;
    const originY = padY;
    const floorY = originY + h * scale;
    const targetX = originX + d * scale;
    
    // Background Grid
    ctx.strokeStyle = 'rgba(255,255,255,0.05)';
    ctx.beginPath();
    for(let i=0; i<canvas.width; i+=20) { ctx.moveTo(i, 0); ctx.lineTo(i, canvas.height); }
    for(let i=0; i<canvas.height; i+=20) { ctx.moveTo(0, i); ctx.lineTo(canvas.width, i); }
    ctx.stroke();

    // Height Vertical Line
    ctx.beginPath(); ctx.moveTo(originX, originY); ctx.lineTo(originX, floorY);
    ctx.strokeStyle = '#4f46e5'; ctx.lineWidth = 3; ctx.lineCap = 'round'; ctx.stroke();
    
    // Floor Horizontal Line
    ctx.beginPath(); ctx.moveTo(originX, floorY); ctx.lineTo(targetX, floorY);
    ctx.strokeStyle = '#f9fafb'; ctx.lineWidth = 3; ctx.stroke();
    
    // Hypotenuse FOV line
    ctx.beginPath(); ctx.moveTo(originX, originY); ctx.lineTo(targetX, floorY);
    ctx.strokeStyle = '#14b8a6'; ctx.lineWidth = 2; ctx.setLineDash([6, 6]); ctx.stroke(); ctx.setLineDash([]);
    
    // Simple Camera Icon representation
    ctx.save();
    ctx.translate(originX, originY);
    ctx.rotate(angle * -Math.PI / 180 + Math.PI/2);
    ctx.fillStyle = '#14b8a6';
    ctx.fillRect(-6, -6, 12, 12);
    ctx.beginPath(); ctx.moveTo(6, -4); ctx.lineTo(14, -8); ctx.lineTo(14, 8); ctx.lineTo(6, 4); ctx.fill();
    ctx.restore();
}

// ==========================================
// CANVAS INTERACTION
// ==========================================
function getMousePos(e) { 
    const rect = canvas.getBoundingClientRect(); 
    return { x: (e.clientX - rect.left) * (canvas.width / rect.width), y: (e.clientY - rect.top) * (canvas.height / rect.height) }; 
}

canvas.addEventListener('mousedown', (e) => {
    if (e.button === 2) return; 
    const pos = getMousePos(e);
    
    if (isWizardActive) {
        if (currentWizardStep === 1) { 
            if (!scaleStartPos) scaleStartPos = pos; else finishWizardScale(pos);
            drawWizardOverlay(); return;
        } else if (currentWizardStep === 2 && !isCroppingCanvas) { 
            cropStartPos = pos; isCroppingCanvas = true; drawWizardOverlay(); return;
        }
        return; 
    }

    if (currentCat === 'select') {
        selectedDevice = null; 
        for (let i = devices.length - 1; i >= 0; i--) { 
            if (Math.hypot(devices[i].x - pos.x, devices[i].y - pos.y) < 20) { 
                selectedDevice = devices[i]; 
                isDragging = true; 
                break; 
            } 
        }
        
        if (selectedDevice && selectedDevice.cat !== 'cable') {
            const engName = dict['en'].sub[selectedDevice.cat][selectedDevice.subIndex]; 
            const hasFOV = ((['cctv', 'gate'].includes(selectedDevice.cat) && !engName.includes('NVR')) || engName.includes('Motion')); 
            
            if (hasFOV) {
                openPropertiesPanel(selectedDevice);
            } else {
                closePropertiesPanel();
            }
        } else {
            closePropertiesPanel();
        }
        
        updateUIForCategory(); draw();

    } else if (currentCat === 'cable') {
        if (!activePath) activePath = { cat: 'cable', subIndex: parseInt(subSelect.value), points: [] }; 
        activePath.points.push(pos); draw();
    } else {
        const newDev = { 
            cat: currentCat, 
            subIndex: parseInt(subSelect.value), 
            brand: brandSelect.value, 
            product: currentProduct, 
            x: pos.x, y: pos.y, 
            rotation: 0, 
            iconRot: 0,
            fov: parseInt(fovInput.value), 
            range: parseInt(distInput.value), 
            height: 3, pitch: 45, 
            color: getCatColor(currentCat),
            icon: currentIcon, 
            size: globalIconSize 
        }; 
        devices.push(newDev); selectedDevice = null; draw();
    }
});

canvas.addEventListener('mousemove', (e) => {
    mousePos = getMousePos(e);
    
    if (isWizardActive) {
        if (currentWizardStep === 1 && scaleStartPos) { scaleCurrentPos = mousePos; drawWizardOverlay(); }
        else if (currentWizardStep === 2 && isCroppingCanvas) { cropCurrentPos = mousePos; drawWizardOverlay(); }
        return;
    }
    
    if (isDragging && selectedDevice) { selectedDevice.x = mousePos.x; selectedDevice.y = mousePos.y; draw(); }
    if (activePath) draw(); 
});

canvas.addEventListener('mouseup', () => { 
    if (isWizardActive && currentWizardStep === 2 && isCroppingCanvas) isCroppingCanvas = false;
    isDragging = false; 
});

canvas.addEventListener('contextmenu', (e) => { 
    e.preventDefault(); 
    if(isWizardActive) resetWizardRuler(); else finishCable(); 
});

canvas.addEventListener('wheel', (e) => { 
    e.preventDefault(); 
    if(isWizardActive) return; 
    let t = (currentCat === 'select') ? selectedDevice : (devices.length>0 ? devices[devices.length-1] : null); 
    if (t && t.cat!=='cable') { t.rotation += e.deltaY * 0.05; draw(); } 
});

document.addEventListener('keydown', (e) => { 
    if (isWizardActive && e.key === 'Escape') resetWizardRuler();
    if (e.key === 'Escape') { finishCable(); selectedDevice = null; document.getElementById('deleteBtn').classList.remove('visible'); closePropertiesPanel(); draw(); } 
    if (e.key === 'Delete' && selectedDevice) { window.deleteSelected(); } 
});

// ==========================================
// DRAWING ENGINE
// ==========================================
function finishCable() { if (activePath && activePath.points.length > 1) cables.push(activePath); activePath = null; draw(); }

function checkWall(cx, cy, sens) { 
    if (!blueprintData) return false; 
    let x = Math.floor(cx), y = Math.floor(cy); 
    if (x < 0 || x >= canvas.width || y < 0 || y >= canvas.height) return false; 
    let idx = (y * canvas.width + x) * 4; 
    return ((blueprintData.data[idx] + blueprintData.data[idx+1] + blueprintData.data[idx+2]) / 3) < sens; 
}

function drawCable(cab, isPreview = false) { 
    if(cab.points.length === 0) return; 
    ctx.beginPath(); ctx.moveTo(cab.points[0].x, cab.points[0].y); 
    for (let i=1; i<cab.points.length; i++) ctx.lineTo(cab.points[i].x, cab.points[i].y); 
    if (isPreview) ctx.lineTo(mousePos.x, mousePos.y); 
    ctx.strokeStyle = ['#007bff', '#dc3545', '#fd7e14'][cab.subIndex]; ctx.lineWidth = 3; ctx.lineJoin = 'round'; ctx.lineCap = 'round'; 
    if (isPreview) ctx.setLineDash([5, 5]); else ctx.setLineDash([]); 
    ctx.stroke(); ctx.setLineDash([]); 
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (blueprint) ctx.drawImage(blueprint, 0, 0, canvas.width, canvas.height);
    cables.forEach(c => drawCable(c)); if (activePath) drawCable(activePath, true);
    let sens = parseInt(sensInput.value);
    
    devices.forEach((d) => {
        const engName = dict['en'].sub[d.cat][d.subIndex]; 
        const hasFOV = ((['cctv', 'gate'].includes(d.cat) && !engName.includes('NVR')) || engName.includes('Motion'));
        
        let activeColor = d.color || getCatColor(d.cat);
        let activeSize = d.size || globalIconSize;
        let activeRot = d.iconRot || 0;
        
        if(hasFOV) {
            ctx.beginPath(); ctx.moveTo(d.x, d.y); 
            ctx.fillStyle = hexToRgba(activeColor, 0.25);
            const start = (d.rotation - d.fov / 2) * Math.PI / 180, end = (d.rotation + d.fov / 2) * Math.PI / 180;
            
            let scaledRange = d.range;
            
            for (let a = start; a <= end; a += 0.05) {
                let hit = {x: d.x + Math.cos(a)*scaledRange, y: d.y + Math.sin(a)*scaledRange};
                if(d.cat !== 'gate') { 
                    for(let dist=0; dist<scaledRange; dist+=8) { 
                        let cx = d.x + Math.cos(a)*dist, cy = d.y + Math.sin(a)*dist; 
                        if(checkWall(cx, cy, sens)) { hit = {x:cx, y:cy}; break; } 
                    } 
                }
                ctx.lineTo(hit.x, hit.y);
            }
            ctx.lineTo(d.x, d.y); ctx.fill();
        }
        
        ctx.beginPath(); ctx.arc(d.x, d.y, activeSize/2 + 2, 0, Math.PI*2); ctx.fillStyle = "#ffffff"; ctx.fill(); ctx.strokeStyle = activeColor; ctx.lineWidth = 2.5; ctx.stroke();
        
        if (d === selectedDevice) { 
            ctx.beginPath(); ctx.arc(d.x, d.y, activeSize/2 + 8, 0, Math.PI*2); ctx.strokeStyle = "#ffffff"; ctx.lineWidth = 2; ctx.setLineDash([4, 4]); ctx.stroke(); ctx.setLineDash([]); 
        }
        
        if (d.icon && loadedIcons[d.icon] && loadedIcons[d.icon].complete && loadedIcons[d.icon].naturalWidth > 0) { 
            ctx.save();
            ctx.translate(d.x, d.y);
            ctx.rotate(activeRot * Math.PI / 180);
            ctx.drawImage(loadedIcons[d.icon], -activeSize/2, -activeSize/2, activeSize, activeSize); 
            ctx.restore();
        } else { 
            ctx.fillStyle = "#333333"; ctx.textAlign = "center"; ctx.textBaseline = "middle"; ctx.font = "bold 9px 'Segoe UI'"; 
            let code = (d.product ? d.product.name : engName).replace(/[^a-zA-Z0-9 ]/g, "").substring(0,3).toUpperCase(); 
            ctx.fillText(code, d.x, d.y + 1); 
        }
    });
    
    document.getElementById('fovVal').innerText = fovInput.value + "°"; 
    document.getElementById('distVal').innerText = (distInput.value / 20).toFixed(1) + " m"; 
    document.getElementById('sensVal').innerText = sensInput.value;
    updateEquipmentList();
}

function updateEquipmentList() {
    if (devices.length === 0 && cables.length === 0) { bomList.innerHTML = `<div style="color:#8b949e; font-size:0.8rem; text-align:center;">${dict[currentLang].msg_empty}</div>`; return; }
    let counts = {};
    devices.forEach(d => { const n = `${d.brand} ${d.product.name} (${dict[currentLang].sub[d.cat][d.subIndex]})`; counts[n] = (counts[n]||0)+1; });
    cables.forEach(c => { const n = dict[currentLang].sub['cable'][c.subIndex] + " (Run)"; counts[n] = (counts[n]||0)+1; });
    bomList.innerHTML = '';
    for (let [item, count] of Object.entries(counts)) { const safeItemName = item.replace(/'/g, "\\'"); bomList.innerHTML += `<div class="bom-item"><span>${item}</span><div class="bom-actions"><span class="bom-count">${count}x</span><span class="bom-delete" title="Remove one" onclick="removeOneItem('${safeItemName}', 'device')">✖</span></div></div>`; }
}


// ==========================================
// MULTI-STEP SETUP WIZARD LOGIC
// ==========================================

function processNextWizardFile() {
    if (blueprintsPendingSetup.length > 0) {
        const file = blueprintsPendingSetup.shift();
        const reader = new FileReader();
        
        reader.onload = (e) => {
            const img = new Image();
            img.onload = () => {
                wizardBlueprint = { name: file.name, img: img, pxPerMeter: null, imgData: null };
                launchWizardStep(1); 
            };
            img.src = e.target.result;
        };
        reader.readAsDataURL(file);
    } else {
        wizardFinishAll(); 
    }
}

function startSetupWizard() {
    isWizardActive = true;
    document.getElementById('setup-wizard').classList.remove('hidden');
    processNextWizardFile();
}

function launchWizardStep(step) {
    currentWizardStep = step;
    ['scale', 'crop', 'settings'].forEach(s => document.getElementById(`wizard-panel-${s}`).classList.add('hidden'));
    
    const skipBtn = document.getElementById('wizard-skip-btn');
    if (skipBtn) {
        if (step === 3) skipBtn.classList.add('hidden');
        else skipBtn.classList.remove('hidden');
    }
    
    ctx.setLineDash([]); ctx.lineDashOffset = 0;
    const scrim = document.getElementById('scrim-layer');

    if (step === 1) {
        document.getElementById('wizard-panel-scale').classList.remove('hidden');
        document.getElementById('wizard-instruction-text').innerText = "Draw a line with a known real-world distance.";
        blueprint = wizardBlueprint.img; canvas.width = blueprint.width; canvas.height = blueprint.height;
        resetWizardRuler(); drawWizardOverlay();

    } else if (step === 2) {
        document.getElementById('wizard-panel-crop').classList.remove('hidden');
        document.getElementById('wizard-instruction-text').innerText = "Crop the image and rotate as needed.";
        resetWizardCrop(); drawWizardOverlay();

    } else if (step === 3) {
        document.getElementById('wizard-panel-settings').classList.remove('hidden');
        document.getElementById('wizard-instruction-text').innerText = "Set default icon size and scrim contrast layer.";
        document.getElementById('wizard-finish-btn').classList.remove('hidden');
        document.getElementById('wizard-next-btn').classList.add('hidden');
        if(scrim.style.display === 'block') scrim.style.display = 'block';
    }
}

function resetWizardRuler() { scaleStartPos = null; scaleCurrentPos = null; drawWizardOverlay(); }
function resetWizardCrop() { cropStartPos = null; cropCurrentPos = null; isCroppingCanvas = false; drawWizardOverlay(); }

function drawWizardOverlay() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (blueprint) ctx.drawImage(blueprint, 0, 0, canvas.width, canvas.height);

    if (currentWizardStep === 1) { 
        if (scaleStartPos && scaleCurrentPos) {
            ctx.beginPath(); ctx.moveTo(scaleStartPos.x, scaleStartPos.y); ctx.lineTo(scaleCurrentPos.x, scaleCurrentPos.y);
            ctx.strokeStyle = '#ec4899'; ctx.lineWidth = 3; ctx.stroke();
            ctx.beginPath(); ctx.arc(scaleStartPos.x, scaleStartPos.y, 6, 0, Math.PI*2); ctx.fillStyle = '#ec4899'; ctx.fill();
            ctx.beginPath(); ctx.arc(scaleCurrentPos.x, scaleCurrentPos.y, 6, 0, Math.PI*2); ctx.fillStyle = '#ec4899'; ctx.fill();
        }
    } else if (currentWizardStep === 2) { 
        if (cropStartPos && cropCurrentPos) {
            ctx.beginPath();
            const x = Math.min(cropStartPos.x, cropCurrentPos.x); const y = Math.min(cropStartPos.y, cropCurrentPos.y);
            const w = Math.abs(cropStartPos.x - cropCurrentPos.x); const h = Math.abs(cropStartPos.y - cropCurrentPos.y);
            ctx.rect(x, y, w, h); ctx.strokeStyle = '#4f46e5'; ctx.lineWidth = 2; ctx.setLineDash([6, 6]); ctx.stroke();
        }
    } else if (currentWizardStep === 3) { 
        ctx.beginPath(); ctx.arc(canvas.width / 2, canvas.height / 2, globalIconSize/2 + 2, 0, Math.PI*2); 
        ctx.fillStyle = "#ffffff"; ctx.fill(); ctx.strokeStyle = "#4f46e5"; ctx.lineWidth = 2.5; ctx.stroke();
        ctx.fillStyle = "#333333"; ctx.textAlign = "center"; ctx.textBaseline = "middle"; ctx.font = "bold 9px 'Segoe UI'"; 
        ctx.fillText("CAM", canvas.width / 2, canvas.height / 2 + 1);
    }
}

window.applyWizardScale = () => {
    const valInput = document.getElementById('ruler-val-input').value;
    const distReal = parseFloat(valInput);
    if(!isNaN(distReal) && distReal > 0) {
        const distPx = Math.hypot(scaleCurrentPos.x - scaleStartPos.x, scaleCurrentPos.y - scaleStartPos.y);
        wizardBlueprint.pxPerMeter = distPx / distReal;
        document.getElementById('ruler-value-modal').classList.add('hidden');
        document.getElementById('ruler-val-input').value = '';
        resetWizardRuler();
        Toast.show('success', `Scale set: ${wizardBlueprint.pxPerMeter.toFixed(2)} px/m`);
        wizardNextStep(); 
    } else {
        Toast.show('error', 'Please enter a valid distance.');
    }
};

function finishWizardScale(endPos) {
    document.getElementById('ruler-value-modal').classList.remove('hidden');
}

window.wizardStartCrop = () => {
    if (!cropStartPos || !cropCurrentPos) { Toast.show('warning', 'Please draw a crop area first.'); return; }
    
    const x = Math.min(cropStartPos.x, cropCurrentPos.x);
    const y = Math.min(cropStartPos.y, cropCurrentPos.y);
    const w = Math.abs(cropStartPos.x - cropCurrentPos.x);
    const h = Math.abs(cropStartPos.y - cropCurrentPos.y);

    if (w < 10 || h < 10) { Toast.show('error', 'Crop area too small.'); return; }

    const tempCanvas = document.createElement('canvas'); tempCanvas.width = w; tempCanvas.height = h;
    const tempCtx = tempCanvas.getContext('2d');
    
    tempCtx.drawImage(blueprint, x, y, w, h, 0, 0, w, h);
    
    const newImg = new Image();
    newImg.onload = () => {
        wizardBlueprint.img = newImg; 
        blueprint = newImg;           
        canvas.width = newImg.width;  
        canvas.height = newImg.height;
        launchWizardStep(2); 
        Toast.show('success', 'Image cropped successfully.');
    };
    newImg.src = tempCanvas.toDataURL();
}

window.wizardRotate = (angle) => { 
    const tempCanvas = document.createElement('canvas');
    if (Math.abs(angle) === 90) { tempCanvas.width = wizardBlueprint.img.height; tempCanvas.height = wizardBlueprint.img.width; } 
    else { tempCanvas.width = wizardBlueprint.img.width; tempCanvas.height = wizardBlueprint.img.height; }
    
    const tempCtx = tempCanvas.getContext('2d');
    tempCtx.translate(tempCanvas.width / 2, tempCanvas.height / 2);
    tempCtx.rotate(angle * Math.PI / 180);
    tempCtx.drawImage(wizardBlueprint.img, -wizardBlueprint.img.width / 2, -wizardBlueprint.img.height / 2);
    
    const newImg = new Image();
    newImg.onload = () => {
        wizardBlueprint.img = newImg; 
        blueprint = newImg;           
        canvas.width = newImg.width;  
        canvas.height = newImg.height;
        launchWizardStep(2); 
        Toast.show('success', `Rotated ${angle}°`);
    };
    newImg.src = tempCanvas.toDataURL();
}

window.wizardUpdateIconSize = (val) => { document.getElementById('wizard-iconsize-val').innerText = `${val}px`; globalIconSize = parseInt(val); drawWizardOverlay(); }
window.wizardUpdateScrim = (active) => { document.getElementById('scrim-layer').style.display = active ? 'block' : 'none'; drawWizardOverlay(); }

window.wizardNextStep = () => {
    if (currentWizardStep === 1 && !wizardBlueprint.pxPerMeter) wizardBlueprint.pxPerMeter = 20; 
    if (currentWizardStep < 3) launchWizardStep(currentWizardStep + 1);
}

window.wizardFinish = () => {
    try {
        const scrimLayer = document.getElementById('scrim-layer');
        scrimLayer.style.display = document.getElementById('wizard-scrim-toggle').checked ? 'block' : 'none';
        
        const finalTempCanvas = document.createElement('canvas');
        finalTempCanvas.width = wizardBlueprint.img.width; finalTempCanvas.height = wizardBlueprint.img.height;
        finalTempCanvas.getContext('2d', { willReadFrequently: true }).drawImage(wizardBlueprint.img, 0, 0);
        wizardBlueprint.imgData = finalTempCanvas.getContext('2d').getImageData(0, 0, wizardBlueprint.img.width, wizardBlueprint.img.height);

        const finalBlueprint = {
            id: Date.now(),
            name: wizardBlueprint.name || "Floorplan",
            img: wizardBlueprint.img,
            imgData: wizardBlueprint.imgData,
            pxPerMeter: wizardBlueprint.pxPerMeter || 20,
            devices: [], cables: [] 
        };
        blueprints.push(finalBlueprint);
        processNextWizardFile();
        
    } catch (error) {
        console.error("Error finalizing blueprint:", error);
        Toast.show('error', 'Failed to save blueprint.');
    }
}

function wizardFinishAll() {
    isWizardActive = false;
    document.getElementById('setup-wizard').classList.add('hidden');
    document.getElementById('wizard-finish-btn').classList.add('hidden');
    document.getElementById('wizard-next-btn').classList.remove('hidden');

    if(blueprints.length > 0) {
        window.switchBlueprint(blueprints[0].id); 
        Toast.show('success', `${blueprints.length} floorplans ready in workspace!`);
    } else { clearCanvas(); }
}


// ==========================================
// MULTIPLE BLUEPRINT & UPLOAD LOGIC
// ==========================================
window.switchBlueprint = (id) => {
    if (isWizardActive) return;
    if (activeBlueprintId !== null) { let currentBp = blueprints.find(b => b.id === activeBlueprintId); if (currentBp) { currentBp.devices = [...devices]; currentBp.cables = [...cables]; } }
    activeBlueprintId = id; let nextBp = blueprints.find(b => b.id === id);
    if (nextBp) { blueprint = nextBp.img; blueprintData = nextBp.imgData; devices = [...nextBp.devices]; cables = [...nextBp.cables]; selectedDevice = null; activePath = null; document.getElementById('deleteBtn').classList.remove('visible'); canvas.width = blueprint.width; canvas.height = blueprint.height; canvas.style.backgroundImage = 'none'; }
    renderBlueprintList(); draw();
};

window.deleteBlueprint = (id, event) => { 
    if (event) event.stopPropagation(); 
    if (!confirm("Are you sure?")) return; 
    blueprints = blueprints.filter(b => b.id !== id); 
    if (blueprints.length === 0) { activeBlueprintId = null; blueprint = null; blueprintData = null; devices = []; cables = []; ctx.clearRect(0, 0, canvas.width, canvas.height); canvas.width = 1000; canvas.height = 700; } else if (activeBlueprintId === id) { window.switchBlueprint(blueprints[0].id); } else { renderBlueprintList(); } 
};

function renderBlueprintList() { 
    const list = document.getElementById('blueprint-list'); if (!list) return; list.innerHTML = ''; 
    blueprints.forEach(bp => { 
        const item = document.createElement('div'); item.className = `blueprint-item ${bp.id === activeBlueprintId ? 'active' : ''}`; 
        item.style.display = 'flex'; item.style.justifyContent = 'space-between'; item.style.alignItems = 'center'; 
        item.innerHTML = `<span>${bp.name}</span><button class="delete-bp-btn" onclick="deleteBlueprint(${bp.id}, event)" style="background: none; border: none; color: #ef4444; font-size: 1.1rem; cursor: pointer; padding: 0 4px; transition: transform 0.2s;">✖</button>`; 
        item.onclick = (e) => { if(e.target.tagName !== 'BUTTON') window.switchBlueprint(bp.id); }; list.appendChild(item); 
    }); 
}

// RESTORED: DOM File Event Bindings
const workspaceDropZone = document.getElementById('drop-zone'); 
const workspaceUpload = document.getElementById('upload');
if (workspaceDropZone && workspaceUpload) {
    workspaceDropZone.addEventListener('click', () => workspaceUpload.click()); 
    workspaceDropZone.addEventListener('dragover', (e) => { e.preventDefault(); workspaceDropZone.style.borderColor = '#ffffff'; workspaceDropZone.style.backgroundColor = 'rgba(255,255,255,0.05)'; }); 
    workspaceDropZone.addEventListener('dragleave', (e) => { e.preventDefault(); workspaceDropZone.style.borderColor = ''; workspaceDropZone.style.backgroundColor = ''; });
    workspaceDropZone.addEventListener('drop', (e) => { e.preventDefault(); workspaceDropZone.style.borderColor = ''; workspaceDropZone.style.backgroundColor = ''; if (e.dataTransfer.files.length > 0) handleFiles(e.dataTransfer.files, true); });
    workspaceUpload.onchange = (e) => { handleFiles(e.target.files, true); e.target.value = ''; };
}

// RESTORED: SPA LANDING PAGE MULTI-UPLOAD
let pendingLandingFiles = [];
const landingOverlay = document.getElementById('landing-overlay');
const landingDropZone = document.getElementById('landing-drop-zone');
const landingUpload = document.getElementById('landing-upload');
const landingGallery = document.getElementById('landing-gallery');
const launchBtn = document.getElementById('launch-btn');

if (landingDropZone && landingUpload) {
    landingDropZone.onclick = () => landingUpload.click(); 
    landingUpload.onchange = (e) => handleFiles(e.target.files, false);
    landingDropZone.ondragover = (e) => { e.preventDefault(); landingDropZone.style.background = 'rgba(255,255,255,0.05)'; }; 
    landingDropZone.ondragleave = () => { landingDropZone.style.background = 'rgba(255, 255, 255, 0.02)'; };
    landingDropZone.ondrop = (e) => { e.preventDefault(); landingDropZone.style.background = 'rgba(255, 255, 255, 0.02)'; handleFiles(e.dataTransfer.files, false); };
}

function handleFiles(files, isWorkspaceDirect) {
    if(!isWorkspaceDirect) {
        Array.from(files).forEach(file => { if (file.type.startsWith('image/')) pendingLandingFiles.push(file); });
        renderLandingGallery();
    } else {
        blueprintsPendingSetup = Array.from(files);
        startSetupWizard();
    }
}

function renderLandingGallery() { 
    if(!landingGallery) return;
    landingGallery.innerHTML = ''; 
    pendingLandingFiles.forEach((file, index) => { 
        const item = document.createElement('div'); item.className = 'blueprint-item'; 
        item.innerHTML = `<div style="display:flex; align-items:center; gap:10px; overflow:hidden;"><span style="font-size:1.2rem;">📄</span><span style="font-size:0.85rem; white-space:nowrap; text-overflow:ellipsis; overflow:hidden;">${file.name}</span></div><button onclick="removePendingFile(${index})" style="background:none; border:none; color:#ef4444; cursor:pointer; font-size:1.1rem; transition: transform 0.2s;">✖</button>`; 
        landingGallery.appendChild(item); 
    }); 
    if(launchBtn) launchBtn.innerText = pendingLandingFiles.length > 0 ? `Launch & Setup (${pendingLandingFiles.length} files) ➔` : 'Launch Environment ➔'; 
}

window.removePendingFile = (index) => { pendingLandingFiles.splice(index, 1); renderLandingGallery(); };

if (launchBtn && landingOverlay) {
    launchBtn.onclick = async () => { 
        const projName = document.getElementById('project-name-input').value || 'Untitled Project'; 
        const projNameUI = document.getElementById('active-project-name');
        if(projNameUI) projNameUI.innerText = projName; 
        
        landingOverlay.style.opacity = '0'; 
        setTimeout(() => { 
            landingOverlay.style.display = 'none'; 
            blueprintsPendingSetup = [...pendingLandingFiles]; 
            pendingLandingFiles = []; 
            if (blueprintsPendingSetup.length > 0) {
                startSetupWizard(); 
            } else {
                document.getElementById('setup-wizard').classList.add('hidden');
            }
        }, 400); 
    };
}

// --- INITIALIZATION ---
window.setLanguage('en'); 
updateUIForCategory(); draw();