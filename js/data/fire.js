const createItem = (id, mp, desc, specs, fov, range) => ({ id, name: id, desc: `${mp} ${desc}`, specs, defFov: fov, defRange: range });

export const fireBrands = ['INIM', 'Autronica', 'Ajax EN54'];

export const fireDB = {
    'Ajax EN54': {
        0: [ // Control Panels
            createItem('EN54 Fire Hub', 'Panel', 'Fire Hub Jeweller', 'Touchscreen CIE, Dual SIM, Wi-Fi, LAN', 0, 0)
        ],
        1: [ // Smoke Detectors
            createItem('FireProtect Smoke', 'Optical', 'EN54 FireProtect (Smoke)', 'Wireless Addressable Smoke, BOSEC', 0, 0),
            createItem('FireProtect Smoke+Snd', 'Optical', 'EN54 FireProtect (Smoke/Sounder)', 'Smoke + Built-in Sounder (85dB)', 0, 0)
        ],
        2: [ // Heat Detectors
            createItem('FireProtect Heat', 'Heat', 'EN54 FireProtect (Heat)', 'Wireless Addressable Heat', 0, 0),
            createItem('FireProtect Heat+Snd', 'Heat', 'EN54 FireProtect (Heat/Sounder)', 'Heat + Built-in Sounder (85dB)', 0, 0)
        ],
        3: [ // Multi-Sensor
        ],
        4: [ // Sounders & Beacons
            createItem('FireProtect Sounder', 'Siren', 'EN54 FireProtect (Sounder)', '100dB Wireless Sounder, 32 tones', 0, 0),
            createItem('FireProtect VAD', 'Beacon', 'EN54 FireProtect (VAD)', 'Wireless Visual Alarm Device', 0, 0),
            createItem('FireProtect Snd+VAD', 'Siren+VAD', 'EN54 FireProtect (Sounder/VAD)', 'Combined 100dB Sounder & Beacon', 0, 0)
        ],
        5: [ // Manual Call Points
            createItem('MCP Red', 'Call Point', 'ManualCallPoint (Red)', 'EN54-25 Certified Resettable MCP', 0, 0),
            createItem('MCP Blue', 'Call Point', 'ManualCallPoint (Blue)', 'Resettable MCP', 0, 0),
            createItem('MCP Green', 'Call Point', 'ManualCallPoint (Green)', 'Resettable MCP', 0, 0),
            createItem('MCP Yellow', 'Call Point', 'ManualCallPoint (Yellow)', 'Resettable MCP', 0, 0),
            createItem('MCP White', 'Call Point', 'ManualCallPoint (White)', 'Resettable MCP', 0, 0)
        ],
        6: [ // I/O Modules
            createItem('EN54 I/O Module', 'Module', 'EN54 I/O Module (2X2)', 'Wireless module with 2 inputs/outputs', 0, 0)
        ],
        7: [ // Range Extenders
            createItem('EN54 Fire ReX', 'Extender', 'EN54 Fire ReX Jeweller', 'Wireless/Ethernet Range Extender', 0, 0)
        ]
    },
    'INIM': {
        0: [ // Control Panels & Fronts
            createItem('Previdia Max 2L', 'Panel', 'Previdia Max 2-Loop', 'Modular Addressable Panel', 0, 0),
            createItem('Previdia C 1L', 'Panel', 'Previdia Compact 1-Loop', 'Compact Addressable Panel', 0, 0),
            createItem('Previdia C 2L', 'Panel', 'Previdia Compact 2-Loop', 'Compact Addressable Panel', 0, 0),
            createItem('Previdia C 64', 'Panel', 'Previdia Compact 64 Addr.', 'Small Addressable Panel', 0, 0),
            createItem('Previdia C 64 SL', 'Panel', 'Previdia Compact 64 Addr. SL', 'Small Addressable Panel SL', 0, 0),
            createItem('Smartline 4Z', 'Panel', 'Smartline Conventional 4-Zone', 'Expandable to 20 zones', 0, 0),
            createItem('Repeater C/MAX', 'Panel', 'Previdia Touchscreen Repeater', 'Remote terminal', 0, 0),
            createItem('Previdia Cab', 'Acc.', 'Previdia MAX Cabinet', 'Control Panel Enclosure', 0, 0),
            createItem('Previdia Ext Front', 'Front', 'Previdia Extinguishing Front', 'Front panel for extinguishing', 0, 0),
            createItem('Previdia 50xLED', 'Front', 'Previdia Front w/ 50xLED', 'Front panel with LED indicators', 0, 0),
            createItem('Previdia 7" Touch', 'Front', 'Previdia Front 7" Touch', 'Front panel with Touchscreen', 0, 0),
            createItem('Previdia Blank', 'Front', 'Previdia Blank Front', 'Standard blank front', 0, 0),
            createItem('Smartline 8Z Exp', 'Module', 'Smartline 8-Zone Exp.', 'Zone Expansion for Smartline', 0, 0)
        ],
        1: [ // Smoke, Beam & Duct Detectors
            createItem('ID100', 'Optical', 'Conventional Smoke', 'INIM ID100', 0, 0),
            createItem('ID100 Black', 'Optical', 'Conventional Smoke (Black)', 'INIM ID100 Black', 0, 0),
            createItem('ED100', 'Optical', 'Addressable Smoke', 'ENEA ED100', 0, 0),
            createItem('ED100 Black', 'Optical', 'Addressable Smoke (Black)', 'ENEA ED100 Black', 0, 0),
            createItem('Beam 5-70m', 'Beam', 'Beam Detector 5-70m', 'w/ Controller & Sensor', 10, 800),
            createItem('Beam 7-70m BT', 'Beam', 'Beam Detector 7-70m BT', 'Bluetooth setup', 10, 800),
            createItem('Beam Ext 100m', 'Acc.', '100m Beam Extension', 'For INIM beam detector', 0, 0),
            createItem('Beam Bracket', 'Acc.', 'Beam Detector Bracket', 'Mounting bracket', 0, 0),
            createItem('Beam Plate', 'Acc.', 'Beam Mounting Plate', 'Mounting plate', 0, 0),
            createItem('Duct Housing', 'Duct', 'Duct Detector Housing', 'INIM Duct unit', 0, 0),
            createItem('Duct Tube 0.6m', 'Acc.', 'Duct Tube 0.6m', 'Sampling tube', 0, 0),
            createItem('Duct Ext 1m', 'Acc.', 'Duct Extension 1m', 'Tube extension', 0, 0),
            createItem('Duct Feet', 'Acc.', 'Duct Detector Feet', 'Mounting feet', 0, 0)
        ],
        2: [ // Heat Detectors
            createItem('ID200', 'Heat', 'Conventional Heat', 'INIM ID200', 0, 0),
            createItem('ED200', 'Heat', 'Programmable Heat', 'ENEA ED200', 0, 0),
            createItem('ED200 Black', 'Heat', 'Programmable Heat (Black)', 'ENEA ED200 Black', 0, 0)
        ],
        3: [ // Multi-Sensor
            createItem('ID300', 'Multi', 'Conventional Multi-Sensor', 'Optical/Heat ID300', 0, 0),
            createItem('ED300', 'Multi', 'Addressable Multi-Sensor', 'Optical/Heat ENEA ED300', 0, 0),
            createItem('ED300 Black', 'Multi', 'Addressable Multi-Sensor (Blk)', 'Optical/Heat ENEA ED300 Black', 0, 0)
        ],
        4: [ // Sounders & Beacons
            createItem('IS100', 'Siren', 'Addressable Sounder', 'Wall mount sounder', 0, 0),
            createItem('IS200', 'Siren/VAD', 'Addressable Sounder/Beacon', 'Wall mount combined VAD', 0, 0)
        ],
        5: [ // Manual Call Points
            createItem('IC0020', 'Call Point', 'Conventional MCP', 'INIM IC0020', 0, 0),
            createItem('EC0020', 'Call Point', 'Addressable MCP', 'ENEA EC0020', 0, 0),
            createItem('EC0010E', 'Call Point', 'IP67 Addressable MCP', 'Weatherproof ENEA EC0010E', 0, 0),
            createItem('EC0020 Yellow', 'Call Point', 'Addressable MCP (Yellow)', 'ENEA EC0020 Yellow', 0, 0),
            createItem('MCP Cover', 'Acc.', 'Clear MCP Cover', 'Protective cover', 0, 0)
        ],
        6: [ // I/O Modules
            createItem('Previdia I/O 16', 'Module', '16 In/Out Module', 'Max 100mA', 0, 0),
            createItem('IFM4IO', 'Module', 'Previdia NAC Module', '4 In / 4 Out', 0, 0),
            createItem('IFM4R', 'Module', 'Previdia Relay Module', '4x Relays', 0, 0),
            createItem('Previdia Loop Exp', 'Module', '2-Loop Expansion Module', 'Loop expander', 0, 0),
            createItem('IFMEXT', 'Module', 'Extinguishing Module', 'Extinguishing control', 0, 0),
            createItem('Previdia Net', 'Module', 'Previdia Network Card', 'IP communication', 0, 0),
            createItem('Previdia PSU', 'Power', 'Previdia Power Supply', 'System PSU', 0, 0)
        ],
        7: [ // Range Extenders
        ]
    },
    'Autronica': {
        0: [ // Control Panels & Outstations
            createItem('BC-420', 'Panel', 'Autronica BC-420 (No display)', 'Addressable CIE', 0, 0),
            createItem('BSV-420', 'Front', 'Autronica BSV-420 Front', 'Front panel for CIE', 0, 0),
            createItem('BS-420 KIT', 'Panel', 'Autronica BS-420 KIT', 'Addressable CIE Kit', 0, 0),
            createItem('BS-420/G', 'Panel', 'Autronica BS-420/G', 'Addressable CIE', 0, 0),
            createItem('BS-200', 'Panel', 'Autroprime 2-Loop Panel', 'Medium size panel', 0, 0),
            createItem('AutroSafe 4', 'Panel', 'AutroSafe 4 Marine 6-Loop', 'High-end Marine panel', 0, 0),
            createItem('BS-430', 'Repeater', 'Autronica BS-430 Outstation', 'Remote Outstation', 0, 0),
            createItem('BS-430/G', 'Repeater', 'Autronica BS-430/G Outstation', 'Remote Outstation', 0, 0),
            createItem('BU-110', 'Repeater', 'Autronica BU-110 Loop Outstation', 'Loop driven repeater', 0, 0),
            createItem('BS-211', 'Repeater', 'Autroprime BS-211 Repeater', 'Autroprime outstation', 0, 0)
        ],
        1: [ // Smoke Detectors
            createItem('BHH-300 Retro', 'Optical', 'AutroGuard BHH-300 Retro', 'Optical Smoke', 0, 0),
            createItem('BHH-200', 'Optical', 'AutroSafe BHH-200', 'Interactive Smoke', 0, 0),
            createItem('BHH-320', 'Opt/Heat', 'AutroSafe BHH-320', 'Optical/Heat Smoke', 0, 0)
        ],
        2: [ // Heat Detectors
            createItem('BDH-200', 'Heat', 'AutroSafe BDH-200', 'Interactive Heat', 0, 0),
            createItem('BDH-300 Retro', 'Heat', 'AutroSafe BDH-300 Retro', 'Interactive Heat', 0, 0),
            createItem('BDH-30', 'Heat', 'Autronica BDH-30', 'Conventional Heat', 0, 0)
        ],
        3: [ // Multi-Sensor
            createItem('V-430', 'Multi', 'AutroGuard V-430', 'Multisensor', 0, 0),
            createItem('V-430 Black', 'Multi', 'AutroGuard V-430 (Black)', 'Multisensor Black', 0, 0),
            createItem('V-430 w/ Beacon', 'Multi', 'AutroGuard V-430 w/ Beacon', 'Multisensor + VAD', 0, 0),
            createItem('V-430S', 'Multi', 'AutroGuard V-430S w/ Siren', 'Multisensor + Sounder', 0, 0),
            createItem('V-430 S+B', 'Multi', 'AutroGuard w/ Siren & Beacon', 'Multisensor + Snd/VAD', 0, 0),
            createItem('V-430 Selftest', 'Multi', 'AutroGuard Selftest', 'Self-verifying', 0, 0),
            createItem('Selftest Exia', 'Multi Ex', 'AutroGuard Selftest Exia', 'Intrinsically Safe', 0, 0),
            createItem('Selftest w/ Bcn', 'Multi', 'AutroGuard Selftest w/ Beacon', 'Self-verifying + VAD', 0, 0),
            createItem('Selftest Bcn Blk', 'Multi', 'AutroGuard Selftest w/ Bcn (Blk)', 'Self-verifying + VAD Black', 0, 0),
            createItem('Selftest Snd+Bcn', 'Multi', 'AutroGuard Selftest w/ Snd & Bcn', 'Self-verifying + Snd/VAD', 0, 0),
            createItem('Selftest Snd', 'Multi', 'AutroGuard Selftest w/ Siren', 'Self-verifying + Sounder', 0, 0),
            createItem('Selftest Snd CO', 'Multi', 'AutroGuard Selftest w/ Snd CO', 'Self-verifying + Snd + CO', 0, 0),
            createItem('Selftest Snd Blk', 'Multi', 'AutroGuard Selftest w/ Snd (Blk)', 'Self-verifying + Sounder Black', 0, 0),
            createItem('Selftest S+B Blk', 'Multi', 'AutroGuard Selftest Snd+Bcn (Blk)', 'Self-verifying + Snd/VAD Black', 0, 0)
        ],
        4: [ // Sounders & Beacons
            createItem('BBR-130', 'Siren Base', 'AutroSafe BBR-130 Base', 'Siren Base Unit', 0, 0),
            createItem('BBR-200', 'Siren', 'AutroSafe BBR-200', 'Loop Addressable Siren', 0, 0)
        ],
        5: [ // Manual Call Points
            createItem('BF-300', 'Call Point', 'AutroSafe BF-300', 'Addressable MCP', 0, 0),
            createItem('BF-502 IP66 Ex', 'Call Point', 'AutroSafe BF-502 IP66 Exia', 'Weatherproof IS MCP', 0, 0),
            createItem('BF-502 IP67', 'Call Point', 'AutroSafe BF-502 IP66/IP67', 'Weatherproof MCP', 0, 0),
            createItem('BF-510WP-H', 'Call Point', 'AutroSafe BF-510WP-H IP52', 'Protected MCP', 0, 0),
            createItem('BF-20', 'Call Point', 'Autronica BF-20', 'Conventional MCP', 0, 0),
            createItem('BF-300V2 Cover', 'Acc.', 'Cover for BF-300V2', 'Protective cover', 0, 0)
        ],
        6: [ // I/O Modules
            createItem('BSS-103A', 'PSU', 'Autronica 24V/3A PSU', 'Power Supply Unit', 0, 0),
            createItem('BSS-310A', 'PSU', 'AutroSafe BSS-310A PSU', 'Power Supply Unit', 0, 0),
            createItem('Cab PSU 10A', 'PSU', 'Cabinet PSU 24VDC/10A', 'High capacity power supply', 0, 0),
            createItem('Cab PSU 5A', 'PSU', 'Cabinet PSU 24VDC/5A', 'Standard power supply', 0, 0),
            createItem('BN-320/5', 'Module', 'AutroSafe BN-320/5 Sprinkler', 'Sprinkler interface module', 0, 0),
            createItem('BSB-310A', 'Module', 'AutroSafe BSB-310A (4-Out)', '4 Output module', 0, 0),
            createItem('BSJ-310', 'Module', 'AutroSafe BSJ-310 (8-Out)', '8 Output module', 0, 0),
            createItem('BN-320/2 Door', 'Module', 'Autronica BN-320/2 Door', 'Door controller module', 0, 0),
            createItem('BN-320/4', 'Module', 'AutroSafe BN-320/4 Output', 'Output module', 0, 0),
            createItem('BSE-310', 'Module', 'Autronica BSE-310 Input', 'Input module', 0, 0),
            createItem('BN-300', 'Module', 'AutroSafe BN-300 1-Input', 'Single input module', 0, 0),
            createItem('Exia Input', 'Module', 'Autronica Exia Input', 'Intrinsically safe input', 0, 0),
            createItem('BN-307', 'Module', 'Autronica BN-307 Siren', 'Siren control module', 0, 0),
            createItem('BU-47', 'Indicator', 'Autronica BU-47 Light', 'Indicator light module', 0, 0)
        ],
        7: [ // Range Extenders
        ]
    }
};