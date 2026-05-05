// IMPORT DICTIONARY AND MODULE DATA
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

// --- UPDATED: ORGANIZED SUBFOLDER PATHS ---
const categoryIcons = {
    cctv: ['icons/cctv/cctv1.png', 'icons/cctv/cctv2.png', 'icons/cctv/cctv3.png', 'icons/cctv/cctv4.png', 'icons/cctv/cctv5.png', 'icons/cctv/cctv6.png', 'icons/cctv/cctv7.png', 'icons/cctv/cctv8.png', 'icons/cctv/cctv9.png', 'icons/cctv/cctv10.png', 'icons/cctv/cctv11.avif', 'icons/cctv/cctv12.jpg', 'icons/cctv/cctv13.png', 'icons/cctv/cctv14.jpg'],
    security: ['icons/security/security1.png', 'icons/security/security2.jpg', 'icons/security/security3.jpg', 'icons/security/security4.webp', 'icons/security/security5.png', 'icons/security/security6.jpg', 'icons/security/security7.png', 'icons/security/security8.webp', 'icons/security/security9.png', 'icons/security/security10.png'],
    access: ['icons/access/reader.png', 'icons/access/keypad.png', 'icons/access/lock.png'],
    fire: ['icons/fire/smoke.png', 'icons/fire/heat.png', 'icons/fire/mcp.png'],
    gate: ['icons/gate/barrier.png', 'icons/gate/gate.png', 'icons/gate/turnstile.png']
};

// Pre-load images into memory for instant Canvas drawing
const loadedIcons = {};
Object.values(categoryIcons).forEach(arr => {
    arr.forEach(src => {
        const img = new Image();
        img.src = src;
        img.onload = () => { draw(); }; 
        loadedIcons[src] = img;
    });
});

// Application State
let currentLang = 'en', currentCat = 'cctv';
let blueprint = null;
let blueprintData = null; 
let devices = [], cables = [];
let selectedDevice = null, isDragging = false, activePath = null, mousePos = {x:0, y:0};
let currentProduct = null;
let currentIcon = '';
let blueprints = []; 
let activeBlueprintId = null;

// UI Elements
const canvas = document.getElementById('plannerCanvas');
const ctx = canvas.getContext('2d', { willReadFrequently: true });
const fovInput = document.getElementById('fovInput');
const distInput = document.getElementById('distInput');
const sensInput = document.getElementById('sensInput');
const brandSelect = document.getElementById('brandSelect');
const subSelect = document.getElementById('subCatSelect');
const prodListDiv = document.getElementById('product-list-container');
const bomList = document.getElementById('bom-list');
const iconPickerList = document.getElementById('icon-picker-list');

canvas.width = 1000; canvas.height = 700;

// WINDOW EXPORTS
window.setLanguage = (lang) => {
    currentLang = lang;
    document.getElementById('btn-en').classList.toggle('active', lang === 'en');
    document.getElementById('btn-is').classList.toggle('active', lang === 'is');
    document.querySelectorAll('[data-i18n]').forEach(el => { if(dict[lang][el.getAttribute('data-i18n')]) el.innerHTML = dict[lang][el.getAttribute('data-i18n')]; });
    updateUIForCategory(); draw(); 
};

window.setCategory = (cat, btn) => {
    currentCat = cat;
    document.querySelectorAll('.tool-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    
    selectedDevice = null; 
    if(activePath) finishCable();
    
    if(brandsData[cat]) {
        brandSelect.innerHTML = '';
        brandsData[cat].forEach(b => {
            const opt = document.createElement('option'); opt.value = b; opt.innerText = b;
            brandSelect.appendChild(opt);
        });
    }
    updateUIForCategory(); draw();
};

window.deleteSelected = () => { 
    if (selectedDevice) { 
        devices = devices.filter(d => d !== selectedDevice); 
        selectedDevice = null; 
        document.getElementById('deleteBtn').classList.remove('visible'); draw(); 
    } 
};

window.clearCanvas = () => { 
    if(confirm(dict[currentLang].msg_clear)) { 
        devices = []; cables = []; selectedDevice = null; activePath = null; draw(); 
    } 
};

window.removeOneItem = (itemName, type) => {
    if (type === 'device') {
        for (let i = devices.length - 1; i >= 0; i--) {
            let d = devices[i];
            let n = `${d.brand} ${d.product.name} (${dict[currentLang].sub[d.cat][d.subIndex]})`;
            if (n === itemName) {
                if (selectedDevice === d) {
                    selectedDevice = null;
                    document.getElementById('deleteBtn').classList.remove('visible');
                }
                devices.splice(i, 1);
                break;
            }
        }
    } else if (type === 'cable') {
        for (let i = cables.length - 1; i >= 0; i--) {
            let c = cables[i];
            let n = dict[currentLang].sub['cable'][c.subIndex] + " (Run)";
            if (n === itemName) {
                cables.splice(i, 1);
                break;
            }
        }
    }
    draw(); 
};

window.exportLayout = (format) => {
    let counts = {};
    devices.forEach(d => { const n = `${d.brand} ${d.product.name} (${dict[currentLang].sub[d.cat][d.subIndex]})`; counts[n] = (counts[n]||0)+1; });
    cables.forEach(c => { const n = dict[currentLang].sub['cable'][c.subIndex]+" Run"; counts[n] = (counts[n]||0)+1; });

    const tempCanvas = document.createElement('canvas'); 
    tempCanvas.width = Math.max(canvas.width, 800); 
    tempCanvas.height = canvas.height + (Object.keys(counts).length * 35 + 120);
    const tCtx = tempCanvas.getContext('2d');
    
    tCtx.fillStyle = '#ffffff'; tCtx.fillRect(0, 0, tempCanvas.width, tempCanvas.height); tCtx.drawImage(canvas, 0, 0);
    tCtx.fillStyle = '#121212'; tCtx.fillRect(0, canvas.height, tempCanvas.width, tempCanvas.height - canvas.height); 
    tCtx.fillStyle = '#4f46e5'; tCtx.font = "bold 24px 'Segoe UI'"; tCtx.fillText(dict[currentLang].export_title, 40, canvas.height + 50);
    tCtx.fillStyle = '#ffffff'; tCtx.font = "bold 18px 'Segoe UI'"; tCtx.fillText(dict[currentLang].export_subtitle + " | " + new Date().toLocaleDateString(), 40, canvas.height + 80);

    let y = canvas.height + 120; tCtx.font = "16px 'Segoe UI'";
    for (let [item, count] of Object.entries(counts)) { tCtx.fillStyle = '#cccccc'; tCtx.fillText(item, 40, y); tCtx.fillStyle = '#4f46e5'; tCtx.font = "bold 16px 'Segoe UI'"; tCtx.fillText(count + "x", 600, y); y += 35; }

    const imgData = tempCanvas.toDataURL('image/jpeg', 0.95);
    if (format === 'jpg') { 
        const link = document.createElement('a'); link.download = `CCTV-Design-${currentLang}.jpg`; link.href = imgData; link.click(); 
    } else if (format === 'pdf') { 
        const { jsPDF } = window.jspdf; 
        const pdf = new jsPDF({ orientation: tempCanvas.width > tempCanvas.height ? 'l' : 'p', unit: 'px', format: [tempCanvas.width, tempCanvas.height] }); 
        pdf.addImage(imgData, 'JPEG', 0, 0, tempCanvas.width, tempCanvas.height); pdf.save(`CCTV-Design-${currentLang}.pdf`); 
    }
};

// INTERNAL LOGIC
function renderIconPicker(catOverride) {
    if (!iconPickerList) return;
    const cat = catOverride || currentCat;
    iconPickerList.innerHTML = '';
    
    if(!categoryIcons[cat]) {
        document.getElementById('icon-picker-group').classList.add('hidden');
        return;
    }
    
    document.getElementById('icon-picker-group').classList.remove('hidden');
    
    categoryIcons[cat].forEach((iconPath, index) => {
        const btn = document.createElement('div');
        btn.className = 'icon-btn';
        
        btn.innerHTML = `<img src="${iconPath}" alt="icon" onerror="this.style.display='none'">`;
        
        if (selectedDevice && selectedDevice.cat !== 'cable') {
            if (iconPath === selectedDevice.icon) btn.classList.add('active');
        } else if (index === 0) {
            btn.classList.add('active');
            currentIcon = iconPath;
        }
        
        btn.onclick = () => {
            document.querySelectorAll('.icon-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentIcon = iconPath;
            
            if(currentCat === 'select' && selectedDevice && selectedDevice.cat !== 'cable') {
                selectedDevice.icon = currentIcon;
                draw();
            }
        };
        iconPickerList.appendChild(btn);
    });
}

function updateUIForCategory() {
    document.getElementById('deleteBtn').classList.remove('visible');
    
    if (currentCat === 'select') {
        ['brand-selector-group', 'equip-selector-group', 'product-list-group'].forEach(id => document.getElementById(id).classList.add('hidden'));
        document.getElementById('mode-hint').innerHTML = dict[currentLang].hint_edit;
        
        if(selectedDevice && selectedDevice.cat !== 'cable') {
            document.getElementById('deleteBtn').classList.add('visible');
            const engName = dict['en'].sub[selectedDevice.cat][selectedDevice.subIndex];
            const needsVision = ((['cctv', 'gate'].includes(selectedDevice.cat) && !engName.includes('NVR')) || engName.includes('Motion'));
            document.getElementById('dynamic-controls').classList.toggle('hidden', !needsVision);
            
            renderIconPicker(selectedDevice.cat);
        } else {
            document.getElementById('dynamic-controls').classList.add('hidden');
            document.getElementById('icon-picker-group').classList.add('hidden');
            if(selectedDevice) document.getElementById('deleteBtn').classList.add('visible');
        }
    } else if (currentCat === 'cable') {
        ['brand-selector-group', 'product-list-group', 'dynamic-controls', 'icon-picker-group'].forEach(id => document.getElementById(id).classList.add('hidden'));
        document.getElementById('equip-selector-group').classList.remove('hidden');
        document.getElementById('mode-hint').innerHTML = dict[currentLang].hint_cable;
        populateSubCategories();
    } else {
        ['brand-selector-group', 'equip-selector-group', 'product-list-group'].forEach(id => document.getElementById(id).classList.remove('hidden'));
        document.getElementById('mode-hint').innerHTML = dict[currentLang].hint_place;
        populateSubCategories();
        renderIconPicker();
    }
}

function populateSubCategories() {
    if (currentCat === 'select') return;
    const savedIndex = subSelect.selectedIndex;
    subSelect.innerHTML = '';
    dict[currentLang].sub[currentCat].forEach((item, index) => {
        const opt = document.createElement('option'); opt.value = index; opt.innerText = item;
        subSelect.appendChild(opt);
    });
    if (savedIndex >= 0 && savedIndex < subSelect.options.length) subSelect.selectedIndex = savedIndex;
    renderProductList();
}

brandSelect.addEventListener('change', renderProductList);
subSelect.addEventListener('change', renderProductList);

function renderProductList() {
    if (currentCat === 'select' || currentCat === 'cable') return;
    prodListDiv.innerHTML = '';
    
    const brand = brandSelect.value;
    const typeIndex = subSelect.value;
    let catDB = productDB[currentCat];
    let products = (catDB && catDB[brand] && catDB[brand][typeIndex]) ? catDB[brand][typeIndex] : (catDB['Generic'] ? catDB['Generic']['default'] : []);

    products.forEach((prod) => {
        const item = document.createElement('div');
        item.className = 'product-item';
        item.onclick = () => selectProduct(prod, item);
        
        let imgCode = prod.name.split(' ')[0]; 
        let icon = brand === 'IDIS' ? `<img src="https://www.idisglobal.com/img/products/${imgCode}_front.jpg" onerror="this.outerHTML='📷'">` : `📷`;

        item.innerHTML = `
            <div class="product-img">${icon}</div>
            <div class="product-info">
                <div class="product-name">${prod.name}</div>
                <div class="product-desc">${prod.desc}</div>
                <div class="product-specs">${prod.specs}</div>
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

    fovInput.value = prod.defFov;
    distInput.value = prod.defRange;
    updateDeviceSpecs();
}

const updateDeviceSpecs = () => {
    if (currentCat === 'select' && selectedDevice && selectedDevice.cat !== 'cable') {
        selectedDevice.fov = parseInt(fovInput.value);
        selectedDevice.range = parseInt(distInput.value);
    }
    draw();
};

[fovInput, distInput, sensInput].forEach(el => el.oninput = updateDeviceSpecs);

function getMousePos(e) {
    const rect = canvas.getBoundingClientRect();
    return { x: (e.clientX - rect.left) * (canvas.width / rect.width), y: (e.clientY - rect.top) * (canvas.height / rect.height) };
}

canvas.addEventListener('mousedown', (e) => {
    if (e.button === 2) return;
    const pos = getMousePos(e);

    if (currentCat === 'select') {
        selectedDevice = null;
        for (let i = devices.length - 1; i >= 0; i--) {
            if (Math.hypot(devices[i].x - pos.x, devices[i].y - pos.y) < 16) {
                selectedDevice = devices[i]; isDragging = true;
                fovInput.value = selectedDevice.fov; distInput.value = selectedDevice.range; break;
            }
        }
        updateUIForCategory(); 
        draw();
    } else if (currentCat === 'cable') {
        if (!activePath) activePath = { cat: 'cable', subIndex: parseInt(subSelect.value), points: [] };
        activePath.points.push(pos); draw();
    } else {
        const newDev = { 
            cat: currentCat, subIndex: parseInt(subSelect.value), brand: brandSelect.value, product: currentProduct,
            x: pos.x, y: pos.y, rotation: 0, fov: parseInt(fovInput.value), range: parseInt(distInput.value),
            icon: currentIcon 
        };
        devices.push(newDev); 
        
        selectedDevice = null; 
        draw();
    }
});

canvas.addEventListener('mousemove', (e) => {
    mousePos = getMousePos(e);
    if (isDragging && selectedDevice) { selectedDevice.x = mousePos.x; selectedDevice.y = mousePos.y; draw(); }
    if (activePath) draw(); 
});

canvas.addEventListener('mouseup', () => { isDragging = false; });
canvas.addEventListener('contextmenu', (e) => { e.preventDefault(); finishCable(); });

canvas.addEventListener('wheel', (e) => { 
    e.preventDefault(); 
    let t = (currentCat === 'select') ? selectedDevice : (devices.length>0 ? devices[devices.length-1] : null); 
    if (t && t.cat!=='cable') { t.rotation += e.deltaY * 0.05; draw(); } 
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') { 
        finishCable(); selectedDevice = null; document.getElementById('deleteBtn').classList.remove('visible'); draw(); 
    }
    if ((e.key === 'Delete' || e.key === 'Backspace') && selectedDevice) {
        e.preventDefault(); 
        window.deleteSelected();
    }
});

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
        
        if(hasFOV) {
            ctx.beginPath(); ctx.moveTo(d.x, d.y);
            // UPDATED: Electric Indigo Color (#4f46e5)
            ctx.fillStyle = d.cat==='cctv' ? "rgba(79, 70, 229, 0.25)" : d.cat==='security' ? "rgba(180, 0, 255, 0.2)" : "rgba(255, 165, 0, 0.3)"; 
            const start = (d.rotation - d.fov / 2) * Math.PI / 180, end = (d.rotation + d.fov / 2) * Math.PI / 180;
            
            for (let a = start; a <= end; a += 0.05) {
                let hit = {x: d.x + Math.cos(a)*d.range, y: d.y + Math.sin(a)*d.range};
                if(d.cat !== 'gate') {
                    for(let dist=0; dist<d.range; dist+=8) { 
                        let cx = d.x + Math.cos(a)*dist, cy = d.y + Math.sin(a)*dist;
                        if(checkWall(cx, cy, sens)) { hit = {x:cx, y:cy}; break; } 
                    }
                }
                ctx.lineTo(hit.x, hit.y);
            }
            ctx.lineTo(d.x, d.y); ctx.fill();
        }

        // UPDATED: Solid Indigo accent color
        const catColor = {cctv:'#4f46e5', security:'#b400ff', access:'#0088ff', fire:'#ef4444', gate:'#f59e0b'}[d.cat];
        
        ctx.beginPath(); 
        ctx.arc(d.x, d.y, 14, 0, Math.PI*2);
        ctx.fillStyle = "#ffffff"; 
        ctx.fill();
        ctx.strokeStyle = catColor; 
        ctx.lineWidth = 2.5; 
        ctx.stroke();

        if (d === selectedDevice) {
            ctx.beginPath(); ctx.arc(d.x, d.y, 19, 0, Math.PI*2); 
            ctx.strokeStyle = "#ffffff"; ctx.lineWidth = 2; ctx.setLineDash([4, 4]); ctx.stroke(); ctx.setLineDash([]);
        }

        if (d.icon && loadedIcons[d.icon] && loadedIcons[d.icon].complete && loadedIcons[d.icon].naturalWidth > 0) {
            ctx.drawImage(loadedIcons[d.icon], d.x - 10, d.y - 10, 20, 20);
        } else {
            ctx.fillStyle = "#333333"; 
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.font = "bold 9px 'Segoe UI'";
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
    if (devices.length === 0 && cables.length === 0) { 
        bomList.innerHTML = `<div style="color:#8b949e; font-size:0.8rem; text-align:center;">${dict[currentLang].msg_empty}</div>`; 
        return; 
    }
    
    let counts = {};
    
    devices.forEach(d => { 
        const n = `${d.brand} ${d.product.name} (${dict[currentLang].sub[d.cat][d.subIndex]})`; 
        if (!counts[n]) counts[n] = { count: 0, type: 'device' };
        counts[n].count++; 
    });
    
    cables.forEach(c => { 
        const n = dict[currentLang].sub['cable'][c.subIndex] + " (Run)"; 
        if (!counts[n]) counts[n] = { count: 0, type: 'cable' };
        counts[n].count++; 
    });
    
    bomList.innerHTML = '';
    for (let [item, data] of Object.entries(counts)) { 
        const safeItemName = item.replace(/'/g, "\\'"); 
        bomList.innerHTML += `
            <div class="bom-item">
                <span>${item}</span>
                <div class="bom-actions">
                    <span class="bom-count">${data.count}x</span>
                    <span class="bom-delete" title="Remove one" onclick="removeOneItem('${safeItemName}', '${data.type}')">✖</span>
                </div>
            </div>`; 
    }
}

// --- MULTIPLE BLUEPRINT LOGIC ---
window.switchBlueprint = (id) => {
    if (activeBlueprintId !== null) {
        let currentBp = blueprints.find(b => b.id === activeBlueprintId);
        if (currentBp) {
            currentBp.devices = [...devices];
            currentBp.cables = [...cables];
        }
    }

    activeBlueprintId = id;
    let nextBp = blueprints.find(b => b.id === id);
    if (nextBp) {
        blueprint = nextBp.img;
        blueprintData = nextBp.imgData;
        devices = [...nextBp.devices];
        cables = [...nextBp.cables];
        
        selectedDevice = null;
        activePath = null;
        document.getElementById('deleteBtn').classList.remove('visible');
        
        canvas.width = blueprint.width;
        canvas.height = blueprint.height;
        canvas.style.backgroundImage = 'none';
    }
    
    renderBlueprintList();
    draw();
};

// NEW: Delete Blueprint Feature
window.deleteBlueprint = (id, event) => {
    // Prevent switching to the blueprint when we click the 'x'
    if (event) event.stopPropagation();

    if (!confirm("Are you sure you want to permanently remove this floorplan from the project?")) return;

    blueprints = blueprints.filter(b => b.id !== id);

    if (blueprints.length === 0) {
        // We deleted the last one, reset workspace completely
        activeBlueprintId = null;
        blueprint = null;
        blueprintData = null;
        devices = [];
        cables = [];
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        canvas.width = 1000;
        canvas.height = 700;
        if(typeof Toast !== 'undefined') Toast.show('info', 'All floorplans removed.');
    } else if (activeBlueprintId === id) {
        // We deleted the one we are currently looking at, switch to the first available
        window.switchBlueprint(blueprints[0].id);
    } else {
        // We deleted a background one, just re-render list
        renderBlueprintList();
    }
};

// UPDATED: Renders the list with the 'X' button included
function renderBlueprintList() {
    const list = document.getElementById('blueprint-list');
    if (!list) return;
    list.innerHTML = '';
    
    blueprints.forEach(bp => {
        const item = document.createElement('div');
        item.className = `blueprint-item ${bp.id === activeBlueprintId ? 'active' : ''}`;
        
        // Add flex properties to format the text and the 'x' button nicely
        item.style.display = 'flex';
        item.style.justifyContent = 'space-between';
        item.style.alignItems = 'center';

        item.innerHTML = `
            <span style="flex: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${bp.name}</span>
            <button class="delete-bp-btn" onclick="deleteBlueprint(${bp.id}, event)" style="background: none; border: none; color: #ef4444; font-size: 1.1rem; cursor: pointer; padding: 0 4px; transition: transform 0.2s;">✖</button>
        `;
        
        // Ensure clicking the item (but NOT the button) switches blueprints
        item.onclick = (e) => {
            if(e.target.tagName !== 'BUTTON') {
                window.switchBlueprint(bp.id);
            }
        };
        
        list.appendChild(item);
    });
}

// ==========================================
// WORKSPACE BLUEPRINT UPLOAD LOGIC
// ==========================================
const workspaceDropZone = document.getElementById('drop-zone');
const workspaceUpload = document.getElementById('upload');

workspaceDropZone.addEventListener('click', () => {
    workspaceUpload.click();
});

workspaceDropZone.addEventListener('dragover', (e) => {
    e.preventDefault();
    workspaceDropZone.style.borderColor = '#ffffff';
    workspaceDropZone.style.backgroundColor = 'rgba(255,255,255,0.05)';
});

workspaceDropZone.addEventListener('dragleave', (e) => {
    e.preventDefault();
    workspaceDropZone.style.borderColor = ''; 
    workspaceDropZone.style.backgroundColor = '';
});

workspaceDropZone.addEventListener('drop', (e) => {
    e.preventDefault();
    workspaceDropZone.style.borderColor = '';
    workspaceDropZone.style.backgroundColor = '';
    
    if (e.dataTransfer.files.length > 0) {
        workspaceUpload.files = e.dataTransfer.files;
        workspaceUpload.dispatchEvent(new Event('change')); 
    }
});

workspaceUpload.onchange = (e) => { 
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader(); 
    reader.onload = (ev) => { 
        const img = new Image(); 
        img.onload = () => { 
            let defaultName = `Level ${blueprints.length + 1}`;
            let bpName = prompt("Name this floorplan (e.g., Ground Floor, Roof, Level 1):", defaultName);
            if (!bpName) bpName = defaultName;

            const tempCanvas = document.createElement('canvas');
            tempCanvas.width = img.width;
            tempCanvas.height = img.height;
            const tempCtx = tempCanvas.getContext('2d');
            tempCtx.drawImage(img, 0, 0);
            const imgData = tempCtx.getImageData(0, 0, img.width, img.height);

            const newBlueprint = {
                id: Date.now(),
                name: bpName,
                img: img,
                imgData: imgData,
                devices: [], 
                cables: []   
            };

            blueprints.push(newBlueprint);
            window.switchBlueprint(newBlueprint.id);
            
            if(typeof Toast !== 'undefined') Toast.show('success', `${bpName} added successfully!`);
        }; 
        img.src = ev.target.result; 
    }; 
    reader.readAsDataURL(file); 
    e.target.value = '';
};

// ==========================================
// SPA LANDING PAGE & MULTI-UPLOAD LOGIC
// ==========================================
let pendingUploads = [];

const landingOverlay = document.getElementById('landing-overlay');
const landingDropZone = document.getElementById('landing-drop-zone');
const landingUpload = document.getElementById('landing-upload');
const landingGallery = document.getElementById('landing-gallery');
const launchBtn = document.getElementById('launch-btn');

landingDropZone.onclick = () => landingUpload.click();
landingUpload.onchange = (e) => handleLandingFiles(e.target.files);

landingDropZone.ondragover = (e) => { 
    e.preventDefault(); 
    landingDropZone.style.background = 'rgba(255,255,255,0.05)'; 
};
landingDropZone.ondragleave = () => { 
    landingDropZone.style.background = 'rgba(255, 255, 255, 0.02)'; 
};
landingDropZone.ondrop = (e) => {
    e.preventDefault();
    landingDropZone.style.background = 'rgba(255, 255, 255, 0.02)';
    handleLandingFiles(e.dataTransfer.files);
};

function handleLandingFiles(files) {
    Array.from(files).forEach(file => {
        if (file.type.startsWith('image/')) pendingUploads.push(file);
    });
    renderLandingGallery();
}

function renderLandingGallery() {
    landingGallery.innerHTML = '';
    pendingUploads.forEach((file, index) => {
        const item = document.createElement('div');
        item.className = 'blueprint-item';
        item.innerHTML = `
            <div style="display:flex; align-items:center; gap:10px; overflow:hidden;">
                <span style="font-size:1.2rem;">📄</span>
                <span style="font-size:0.85rem; white-space:nowrap; text-overflow:ellipsis; overflow:hidden;">${file.name}</span>
            </div>
            <button onclick="removePendingFile(${index})" style="background:none; border:none; color:#ef4444; cursor:pointer; font-size:1.1rem; transition: transform 0.2s;" onmouseover="this.style.transform='scale(1.2)'" onmouseout="this.style.transform='scale(1)'">✖</button>
        `;
        landingGallery.appendChild(item);
    });
    launchBtn.innerText = pendingUploads.length > 0 ? `Launch Environment (${pendingUploads.length} Blueprints) ➔` : 'Launch Environment ➔';
}

window.removePendingFile = (index) => {
    pendingUploads.splice(index, 1);
    renderLandingGallery();
};

launchBtn.onclick = async () => {
    const projName = document.getElementById('project-name-input').value || 'Untitled Project';
    
    if (pendingUploads.length === 0) {
        if(typeof Toast !== 'undefined') Toast.show('warning', 'Please add at least one floorplan to start.');
        return;
    }

    launchBtn.innerText = "Processing...";
    launchBtn.style.opacity = "0.7";
    launchBtn.style.pointerEvents = "none";

    const nameDisplay = document.getElementById('active-project-name');
    if (nameDisplay) nameDisplay.innerText = projName;

    for (let i = 0; i < pendingUploads.length; i++) {
        await processBlueprintFile(pendingUploads[i], i + 1);
    }

    landingOverlay.style.opacity = '0';
    setTimeout(() => {
        landingOverlay.style.display = 'none';
        if(blueprints.length > 0) window.switchBlueprint(blueprints[0].id);
        if(typeof Toast !== 'undefined') Toast.show('success', `Workspace launched with ${blueprints.length} blueprints!`);
    }, 400);
};

function processBlueprintFile(file, levelNum) {
    return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = (ev) => {
            const img = new Image();
            img.onload = () => {
                const tempCanvas = document.createElement('canvas');
                tempCanvas.width = img.width; 
                tempCanvas.height = img.height;
                const tempCtx = tempCanvas.getContext('2d');
                tempCtx.drawImage(img, 0, 0);
                const imgData = tempCtx.getImageData(0, 0, img.width, img.height);

                const cleanName = file.name.replace(/\.[^/.]+$/, "") || `Level ${levelNum}`;

                blueprints.push({
                    id: Date.now() + levelNum,
                    name: cleanName,
                    img: img,
                    imgData: imgData,
                    devices: [],
                    cables: []
                });
                resolve();
            };
            img.src = ev.target.result;
        };
        reader.readAsDataURL(file);
    });
}

// --- INITIALIZATION ---
window.setLanguage('en'); 
window.setCategory('cctv', document.querySelector('.tool-btn[data-cat="cctv"]'));