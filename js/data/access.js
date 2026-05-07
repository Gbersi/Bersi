const createItem = (id, mp, desc, specs, fov, range, img = null) => ({ 
    id, 
    name: id, 
    desc: `${mp} ${desc}`, 
    specs, 
    defFov: fov, 
    defRange: range, 
    // Defaults to a local folder if no specific link is given
    img: img || `Products/${id}.png` 
});

export const accessBrands = ['Gallagher', 'Salto'];

export const accessDB = {
    'Gallagher': {
        0: [ // Controllers
            createItem('C400100', 'C7000', 'Controller 7000', 'Advanced Cyber Defense Controller', 0, 0, 'Products/Gallagher/C400100.jpg'),
            createItem('C400101', 'C7000', 'Controller 7000 Single Door', 'Edge Device Controller', 0, 0, 'Products/Gallagher/C400101.jpg')
        ],
        1: [ // Modules
            createItem('C300636', 'End of Line', 'High Sec End of Line Module', 'HBUS EOL Module', 0, 0, 'Products/Gallagher/C300636.jpg'),
            createItem('C200620', 'PSTN', 'PSTN Dialer', 'Dialer Module', 0, 0, 'Products/Gallagher/C200620.jpg'),
            createItem('C200689', 'I/O Exp', 'High Density I/O Expansion', 'In Cabinet Interface', 0, 0, 'Products/Gallagher/C200689.jpg'),
            createItem('BVC300660', 'HBUS I/O', 'HBUS I/O Devices', 'Standard HBUS', 0, 0, 'Products/Gallagher/BVC300660.jpg'),
            createItem('BVC300182', 'HBUS Mod', 'HBUS Modules', 'Controller Expansion', 0, 0, 'Products/Gallagher/BVC300182.jpg'),
            createItem('C300698', 'HBUS Hub', 'HBUS 8 Port Hub', 'Port Hub Module', 0, 0, 'Products/Gallagher/C300698.jpg'),
            createItem('BVC300181', 'R Module', 'R Modules', 'R Series Expansion', 0, 0, 'Products/Gallagher/BVC300181.jpg'),
            createItem('C300678', 'OSDP Hub', 'OSDP 8 PORT HUB', 'OSDP Protocol Hub', 0, 0, 'Products/Gallagher/C300678.jpg'),
            createItem('C300142', '4H Mod', '4H Module', '4-Door Expansion', 0, 0, 'Products/Gallagher/C300142.jpg'),
            createItem('C300182', '8H Mod', '8H Module', '8-Door Expansion', 0, 0, 'Products/Gallagher/C300182.jpg'),
            createItem('C300680', 'HBUS 8 In', 'HBUS 8 In Board', 'Input Board', 0, 0, 'Products/Gallagher/C300680.jpg'),
            createItem('C300660', 'HBUS 8/2', 'HBUS 8 In 2 Out Door Module', 'Door Control Module', 0, 0, 'Products/Gallagher/C300660.jpg'),
            createItem('C300665', 'HBUS Wiegand', 'HBUS 4 In 2 Out Door Module', 'Wiegand Protocol', 0, 0, 'Products/Gallagher/C300665.jpg')
        ],
        2: [ // Readers and Terminals
            createItem('BVC300400', 'T10', 'T10 MIFARE Reader', 'MIFARE Classic/DESFire', 0, 0, 'Products/Gallagher/BVC300400.jpg'),
            createItem('BVC300410', 'T11', 'T11 MIFARE Reader', 'MIFARE Classic/DESFire', 0, 0, 'Products/Gallagher/BVC300410.jpg'),
            createItem('BVC300430', 'T11 Multi', 'T11 Multi Tech Reader', 'Multi Technology', 0, 0, 'Products/Gallagher/BVC300430.jpg'),
            createItem('BVC300420', 'T12', 'T12 MIFARE Reader', 'MIFARE Classic/DESFire', 0, 0, 'Products/Gallagher/BVC300420.jpg'),
            createItem('BVC300440', 'T12 Multi', 'T12 Multi Tech Reader', 'Multi Technology', 0, 0, 'Products/Gallagher/BVC300440.jpg'),
            createItem('BVC300470', 'T15', 'T15 MIFARE Reader', 'MIFARE Classic/DESFire', 0, 0, 'Products/Gallagher/BVC300470.jpg'),
            createItem('BVC300480', 'T15 Multi', 'T15 Multi Tech Reader', 'Multi Technology', 0, 0, 'Products/Gallagher/BVC300480.jpg'),
            createItem('BVC300450', 'T20 Terminal', 'T20 MIFARE Terminal', 'Access Terminal', 0, 0, 'Products/Gallagher/BVC300450.jpg'),
            createItem('BVC300460', 'T20 Multi', 'T20 Multi Tech Terminal', 'Multi Tech Terminal', 0, 0, 'Products/Gallagher/BVC300460.jpg'),
            createItem('BVC300463', 'T20 Alarms', 'T20 Alarms Terminal', 'Alarm Management', 0, 0, 'Products/Gallagher/BVC300463.jpg'),
            createItem('BVC300495', 'T30 Keypad', 'T30 MIFARE Keypad Reader', 'PIN + MIFARE', 0, 0, 'Products/Gallagher/BVC300495.jpg'),
            createItem('BVC300490', 'T30 Multi', 'T30 Multi Tech Keypad Reader', 'PIN + Multi Tech', 0, 0, 'Products/Gallagher/BVC300490.jpg'),
            createItem('BVC305400', 'High Sec', 'High Sec T10 Reader', 'High Security Profile', 0, 0, 'Products/Gallagher/BVC305400.jpg'),
            createItem('BVC305410', 'High Sec', 'High Sec T11 Reader', 'High Security Profile', 0, 0, 'Products/Gallagher/BVC305410.jpg'),
            createItem('BVC305430', 'High Sec', 'High Sec T11 Reader, Multi Tech', 'High Security Profile', 0, 0, 'Products/Gallagher/BVC305430.jpg'),
            createItem('BVC305480', 'High Sec', 'High Sec T15 Reader, Multi Tech', 'High Security Profile', 0, 0, 'Products/Gallagher/BVC305480.jpg'),
            createItem('BVC305450', 'High Sec', 'High Sec T20 Reader', 'High Security Terminal', 0, 0, 'Products/Gallagher/BVC305450.jpg'),
            createItem('C861600', 'Veridt Bio', 'Veridt Stealth Bio PIV Reader', 'Biometric PIV', 0, 0, 'Products/Gallagher/C861600.jpg')
        ],
        3: [ // Cabinets
            createItem('C200100', 'Single', 'Single Cabinet', 'Standard Cabinet', 0, 0, 'Products/Gallagher/C200100.png'),
            createItem('C200611', 'I/O Cab', 'I/O Accessory Single Cabinet', 'Accessory Storage', 0, 0, 'Products/Gallagher/C200611.png'),
            createItem('C300120', 'Starter', 'Starter Kit Cabinet', 'Starter Kit Size', 0, 0, 'Products/Gallagher/C300120.png'),
            createItem('C300121', '2 Door', '2 Door Controller Cabinet', 'Controller Size', 0, 0, 'Products/Gallagher/C300121.png'),
            createItem('C306104', 'Class 5', 'Class 5 Cabinet Cool Grey', 'Class 5 Standard', 0, 0, 'Products/Gallagher/C306104.png'),
            createItem('C306105', 'Class 5 PS', 'Class 5 Cabinet, Controller & PSU', 'Class 5 Power Supply', 0, 0, 'Products/Gallagher/C306105.png'),
            createItem('BVC200105', 'Dual 8A', 'Dual Cabinet 8A PS', 'With 8A Power Supply', 0, 0, 'Products/Gallagher/BVC200105.png'),
            createItem('BVC200104', 'Dual No PS', 'Dual Cabinet No PS', 'Empty Dual Cabinet', 0, 0, 'Products/Gallagher/BVC200104.png'),
            createItem('BVC200107', 'Dual Reinf', 'Dual Cabinet No PS Reinforced', 'Reinforced Empty Dual', 0, 0, 'Products/Gallagher/BVC200107.png'),
            createItem('C400120', 'C7000 Cab', 'Controller 7000 Single Door Cabinet', 'C7000 Specialized', 0, 0, 'Products/Gallagher/C400120.png')
        ],
        4: [ // Electronic Locks (Empty for Gallagher)
        ]
    },
    'Salto': {
        5: [ // CU4000 Controllers
            createItem('CU42E0', 'CU4000', 'XS4 Online Controller', 'IP Based Door Controller (Online)', 0, 0, 'Products/Salto/CU42E0.png'),
            createItem('CU4200', 'CU4000', 'XS4 Offline Controller', 'Auxiliary Controller (Update on Card)', 0, 0, 'Products/Salto/CU4200.png'),
            createItem('CU42L0', 'CU4000', 'XS4 Advanced Controller', 'Advanced Access Controller', 0, 0, 'Products/Salto/CU42L0.png')
        ],
        6: [ // Bluenet Door Controllers
            createItem('CU50EN', 'Bluenet', 'Bluenet Door Controller', 'IP Node / Door Controller', 0, 0, 'Products/Salto/CU50EN.png'),
            createItem('CU50ENSVN', 'Bluenet', 'Bluenet SVN Controller', 'IP Node with SVN capabilities', 0, 0, 'Products/Salto/CU50ENSVN.png')
        ],
        7: [ // XS4 Original
            createItem('XS4 Original+', 'Narrow', 'XS4 Original+ Narrow', 'For narrow profile doors (RFID/BLE)', 0, 0, 'Products/Salto/XS4-Original-Narrow.png'),
            createItem('XS4 Original+', 'Wide', 'XS4 Original+ Wide', 'For standard DIN doors (RFID/BLE)', 0, 0, 'Products/Salto/XS4-Original-Wide.png'),
            createItem('XS4 Original+', 'Keypad', 'XS4 Original+ Keypad', 'PIN + RFID/BLE Escutcheon', 0, 0, 'Products/Salto/XS4-Original-Keypad.png')
        ],
        8: [ // XS4 One
            createItem('XS4 One', 'Standard', 'XS4 One Electronic Lock', 'Advanced Wireless Lock (RFID/BLE)', 0, 0, 'Products/Salto/XS4-One.png'),
            createItem('XS4 One', 'Deadlatch', 'XS4 One Deadlatch', 'Deadlatch profile compatibility', 0, 0, 'Products/Salto/XS4-One-Deadlatch.png')
        ],
        9: [ // XS4 Mini
            createItem('XS4 Mini', 'DIN', 'XS4 Mini (DIN Profile)', 'Compact lock for DIN doors', 0, 0, 'Products/Salto/XS4-Mini-DIN.png'),
            createItem('XS4 Mini', 'ANSI', 'XS4 Mini (ANSI Profile)', 'Compact lock for ANSI doors', 0, 0, 'Products/Salto/XS4-Mini-ANSI.png')
        ],
        10: [ // XS Readers
            createItem('Design XS', 'Mullion', 'Design XS Mullion Reader', 'Narrow profile (Mifare/DESFire/BLE)', 0, 0, 'Products/Salto/Design-XS-Mullion.png'),
            createItem('Design XS', 'Standard', 'Design XS Wall Reader', 'Standard European/US box size', 0, 0, 'Products/Salto/Design-XS-Standard.png'),
            createItem('Design XS', 'Keypad', 'Design XS Keypad Reader', 'PIN + Card Authentication', 0, 0, 'Products/Salto/Design-XS-Keypad.png'),
            createItem('Design XS', 'Panel', 'Design XS Panel Reader', 'Elevator/Intercom integration', 0, 0, 'Products/Salto/Design-XS-Panel.png')
        ],
        11: [ // Neo Cylinders
            createItem('SALTO Neo', 'Euro Cyl', 'Neo Euro Profile Cylinder', 'Retrofit Smart Cylinder', 0, 0, 'Products/Salto/Neo-Euro-Cyl.png'),
            createItem('SALTO Neo', 'UK Oval', 'Neo UK Oval Cylinder', 'UK Oval profile compatibility', 0, 0, 'Products/Salto/Neo-UK-Oval.png'),
            createItem('SALTO Neo', 'Padlock', 'Neo Electronic Padlock', 'Heavy duty smart padlock', 0, 0, 'Products/Salto/Neo-Padlock.png'),
            createItem('SALTO Neo', 'Camlock', 'Neo Camlock', 'For server racks and cabinets', 0, 0, 'Products/Salto/Neo-Camlock.png')
        ]
    }
};