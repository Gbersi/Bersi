export const dict = {
    en: {
        nav_select: "EDIT", nav_cable: "CABLING",
        nav_cctv: "CCTV", nav_sec: "SECURITY", nav_acc: "ACCESS", nav_fire: "FIRE", nav_gate: "GATES",
        btn_export_jpg: "JPG", btn_export_pdf: "PDF", btn_reset: "RESET ALL", btn_delete: "DELETE ITEM",
        lbl_floorplan: "1. Project Floorplan", lbl_brand: "2. Manufacturer", lbl_equip: "3. Equipment Type", lbl_product: "4. Select Product",
        lbl_angle: "Detection Angle", lbl_range: "Range (Meters)", lbl_wall: "Wall Sensitivity",
        lbl_icon: "5. Map Icon",
        lbl_list: "Bill of Materials (BOM)", msg_empty: "No equipment placed yet.",
        msg_clear: "Clear all devices and cables?", lbl_width: "Opening Angle", lbl_length: "Arm Length (Meters)",
        export_title: "BERSI SECURITY DESIGN - PROJECT LAYOUT", export_subtitle: "Equipment Summary",
        hint_place: "Click map to place. Scroll to rotate.", hint_edit: "Click item to select. Drag to move, Del to remove.", hint_cable: "Click to route wire. Right-click or ESC to finish.",
        sub: {
            cctv: ['Dome Camera', 'Bullet Camera', 'Turret Camera', 'PTZ Camera', 'NVR'],
            security: [
                'Starter kits', 'Hubs', 'Range extenders', 'Opening detectors/Door Sensors', 
                'Glass break detectors', 'Motion detectors', 'Keypads', 'Sirens', 
                'Integration modules', 'Relays', 'Power supply units', 'Casings'
            ],
            access: [
                'Controllers', 'Modules', 'Readers and Terminals', 'Cabinets', 'Electronic Locks', 
                'CU4000 Controllers', 'Bluenet Door Controllers', 'XS4 Original', 'XS4 One', 'XS4 Mini', 'XS Readers', 'Neo Cylinders'
            ],
            fire: [
                'Control Panels', 'Smoke Detectors', 'Heat Detectors', 'Multi-Sensor Detectors', 
                'Sounders & Beacons', 'Manual Call Points', 'I/O Modules', 'Range Extenders'
            ],
            gate: ['Boom Barrier', 'Gate', 'Turnstile'],
            cable: ['Cat5/6 (Data)', '12V (Power)', '24V (Power)']
        }
    },
    is: {
        nav_select: "BREYTA", nav_cable: "LAGNIR",
        nav_cctv: "MYNDAVÉLAR", nav_sec: "ÖRYGGISKERFI", nav_acc: "AÐGANGUR", nav_fire: "BRUNAKERFI", nav_gate: "HLIÐ",
        btn_export_jpg: "JPG", btn_export_pdf: "PDF", btn_reset: "HREINSA ALLT", btn_delete: "EYÐA VÖRU",
        lbl_floorplan: "1. Grunnmynd", lbl_brand: "2. Framleiðandi", lbl_equip: "3. Tegund búnaðar", lbl_product: "4. Veldu Vöru",
        lbl_angle: "Skynjunarhorn", lbl_range: "Drægni (Metrar)", lbl_wall: "Næmni veggja",
        lbl_icon: "5. Kortatákn",
        lbl_list: "Tækjalisti (BOM)", msg_empty: "Engin tæki sett á mynd ennþá.",
        msg_clear: "Eyða öllum tækjum?", lbl_width: "Opnunarhorn", lbl_length: "Bómulengd (Metrar)",
        export_title: "BERSI SECURITY DESIGN - VERKTEIKNING", export_subtitle: "Samantekt Búnaðar",
        hint_place: "Smelltu á kort. Skrunaðu til að snúa.", hint_edit: "Smelltu á tæki. Dragðu til að færa, Delete til að eyða.", hint_cable: "Smelltu til að teikna leið. Hægri-smelltu til að klára.",
        sub: {
            cctv: ['Hvolfmyndavél (Dome)', 'Rör-myndavél (Bullet)', 'Turret myndavél', 'PTZ myndavél', 'Upptökuvél (NVR)'],
            security: [
                'Startpakkar', 'Stjórnstöðvar (Hubs)', 'Drægniaukar', 'Hurðarskynjarar', 
                'Glerbrotsskynjarar', 'Hreyfiskynjarar', 'Talnaborð (Keypads)', 'Sírenur', 
                'Samþættingareiningar', 'Liðar (Relays)', 'Aflgjafar', 'Hulstur (Casings)'
            ],
            access: [
                'Stjórnborð (Controllers)', 'Einingar (Modules)', 'Lesarar og Skjáir', 'Skápar (Cabinets)', 'Rafrænir Lásar',
                'CU4000 Stjórnborð', 'Bluenet Stjórnborð', 'XS4 Original Lásar', 'XS4 One Lásar', 'XS4 Mini Lásar', 'XS Lesarar', 'Neo Sívalningar'
            ],
            fire: [
                'Stjórnstöðvar (Brunakerfi)', 'Reykskynjarar', 'Hitaskynjarar', 'Fjölskynjarar (Multi)', 
                'Sírenur og Blikkljós', 'Handboðar (MCP)', 'Inntaks-/Úttakseiningar', 'Drægniaukar'
            ],
            gate: ['Bóma', 'Hlið', 'Snúningshlið'],
            cable: ['Cat5/6 (Gagnasnúra)', '12V (Rafmagn)', '24V (Rafmagn)']
        }
    }
};