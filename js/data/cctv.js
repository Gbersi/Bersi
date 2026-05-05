const createItem = (id, mp, desc, specs, fov, range) => ({ id, name: id, desc: `${mp} ${desc}`, specs, defFov: fov, defRange: range });

export const cctvBrands = ['IDIS', 'Ajax', 'Axis'];

export const cctvDB = {
    'IDIS': {
        0: [ // Domes
            createItem('DC-D6831WRA', '8MP', 'AI IR Dome Camera', 'NDAA Edge AI Plus', 110, 350),
            createItem('DC-D6631WRA', '6MP', 'AI IR Dome Camera', 'NDAA Edge AI Plus', 105, 320),
            createItem('DC-D4831HRX', '8MP', 'Vandal-Resistant IR Dome', 'NDAA & TAA', 90, 300),
            createItem('DC-D4811WRX 3.3mm', '8MP', 'Vandal-Resistant IR Dome', 'NDAA & TAA', 95, 300),
            createItem('DC-D4548WRA', '5MP', 'AI IR Dome Camera', 'LightMaster NIR', 90, 250),
            createItem('DC-D4538WRA', '5MP', 'AI IR Dome Camera', 'LightMaster NIR', 90, 250),
            createItem('DC-D4538RA', '5MP', 'AI IR Dome Camera', 'LightMaster NIR', 90, 250),
            createItem('DC-D4536RX', '5MP', 'IR Dome Camera', 'NDAA & TAA', 85, 220),
            createItem('DC-D4536HRX', '5MP', 'Vandal-Resistant IR Dome', 'NDAA & TAA', 85, 220),
            createItem('DC-D4517RXP 4.3mm', '5MP', 'PoE Extender IR Dome', 'NDAA & TAA', 80, 200),
            createItem('DC-D4517RXP 2.8mm', '5MP', 'PoE Extender IR Dome', 'NDAA & TAA', 110, 200),
            createItem('DC-D4517RX 4.3mm', '5MP', 'IR Dome Camera', 'NDAA & TAA', 80, 200),
            createItem('DC-D4517RX 2.8mm', '5MP', 'IR Dome Camera', 'NDAA & TAA', 110, 200),
            createItem('DC-D4516WRX 4.0mm', '5MP', 'IR Dome Camera', 'NDAA & TAA', 85, 200),
            createItem('DC-D4516WRX 2.8mm', '5MP', 'Vandal-Resistant IR Dome', 'NDAA & TAA', 110, 200),
            createItem('DC-D4248HRA', '2MP', 'AI Dome Camera', 'LightMaster NIR', 90, 180),
            createItem('DC-D4246WX', '2MP', 'Dome Camera', 'NDAA & TAA', 90, 180),
            createItem('DC-D4238HRA', '2MP', 'AI Dome Camera', 'LightMaster NIR', 90, 180),
            createItem('DC-D4237RX', '2MP', 'IR Dome Camera', 'NDAA & TAA', 90, 180),
            createItem('DC-D4236WRX', 'Full HD', 'Vandal-Resistant IR Dome', 'NDAA & TAA', 90, 180),
            createItem('DC-D4236RX', 'Full HD', 'IR Dome Camera', 'NDAA & TAA', 90, 180),
            createItem('DC-D4236HRX', 'Full HD', 'Vandal-Resistant IR Dome', 'w/ Heater', 90, 180),
            createItem('DC-D4218WRA 4.0mm', '2MP', 'AI Dome Camera', 'LightMaster NIR', 85, 180),
            createItem('DC-D4218WRA 2.8mm', '2MP', 'AI Dome Camera', 'LightMaster NIR', 110, 180),
            createItem('DC-D4217RX 4.0mm', 'Full HD', 'IR Dome Camera', 'NDAA & TAA', 85, 180),
            createItem('DC-D4217RX 2.8mm', 'Full HD', 'IR Dome Camera', 'NDAA & TAA', 110, 180),
            createItem('DC-D4216WRX 2.8mm', 'Full HD', 'Vandal-Resistant IR Dome', 'NDAA & TAA', 110, 180),
            createItem('DC-D4216RX 4.0mm', '2MP', 'IR Dome Camera', 'NDAA & TAA', 85, 180),
            createItem('DC-D4216RX 2.8mm', 'Full HD', 'IR Dome Camera', 'NDAA & TAA', 110, 180),
            createItem('DC-D4211CRX', 'Full HD', 'Micro Dome Camera', 'NDAA & TAA', 110, 120)
        ],
        1: [ // Bullets
            createItem('DC-T6831WRA', '8MP', 'AI IR Bullet Camera', 'Edge AI Plus', 85, 450),
            createItem('DC-T6631WRA', '6MP', 'AI IR Bullet Camera', 'Edge AI Plus', 85, 420),
            createItem('DC-T6224HRXL', '2MP', 'License Plate Capture', 'LPR/ANPR Camera', 40, 600),
            createItem('DC-T4831HRX', '8MP', 'IR Bullet Camera', 'w/ Heater', 85, 400),
            createItem('DC-T4811WRX 3.3mm', '8MP', 'Bullet Camera', 'NDAA & TAA', 95, 380),
            createItem('DC-T4538WRA', '5MP', 'Bullet Camera', 'LightMaster NIR', 85, 300),
            createItem('DC-T4536HRX', '5MP', 'IR Bullet Camera', 'w/ Heater', 85, 300),
            createItem('DC-T4517WRXP-A 6.2mm', '5MP', 'PoE Extender Bullet', 'NDAA & TAA', 50, 350),
            createItem('DC-T4517WRXP-A 4.3mm', '5MP', 'PoE Extender Bullet', 'NDAA & TAA', 80, 280),
            createItem('DC-T4517WRXP-A 2.8mm', '5MP', 'PoE Extender Bullet', 'NDAA & TAA', 110, 200),
            createItem('DC-T4517WRX-A 6.2mm', '5MP', 'Bullet Camera', 'NDAA & TAA', 50, 350),
            createItem('DC-T4517WRX-A 4.3mm', '5MP', 'Bullet Camera', 'NDAA & TAA', 80, 280),
            createItem('DC-T4517WRX-A 2.8mm', '5MP', 'Bullet Camera', 'NDAA & TAA', 110, 200),
            createItem('DC-T4516WRX 6.0mm', '5MP', 'IR Bullet Camera', 'NDAA & TAA', 55, 320),
            createItem('DC-T4516WRX 4.0mm', '5MP', 'IR Bullet Camera', 'NDAA & TAA', 85, 260),
            createItem('DC-T4516WRX 2.8mm', '5MP', 'IR Bullet Camera', 'NDAA & TAA', 110, 200),
            createItem('DC-T4248HRA', '2MP', 'AI Bullet Camera', 'LightMaster NIR', 85, 250),
            createItem('DC-T4238HRA', '2MP', 'AI Bullet Camera', 'LightMaster NIR', 85, 250),
            createItem('DC-T4236WRX-A', 'Full HD', 'IR Bullet Camera', 'NDAA & TAA', 85, 250),
            createItem('DC-T4236WRX', 'Full HD', 'IR Bullet Camera', 'NDAA & TAA', 85, 250),
            createItem('DC-T4236HRX', 'Full HD', 'IR Bullet Camera', 'w/ Heater', 85, 250),
            createItem('DC-T4218WRA 4.0mm', '2MP', 'AI Bullet Camera', 'LightMaster NIR', 85, 250),
            createItem('DC-T4218WRA 2.8mm', '2MP', 'AI Bullet Camera', 'LightMaster NIR', 110, 200),
            createItem('DC-T4217WRX 6.0mm', 'Full HD', 'IR Bullet Camera', 'NDAA & TAA', 55, 300),
            createItem('DC-T4217WRX 4.0mm', 'Full HD', 'IR Bullet Camera', 'NDAA & TAA', 85, 250),
            createItem('DC-T4217WRX 2.8mm', 'Full HD', 'IR Bullet Camera', 'NDAA & TAA', 110, 200),
            createItem('DC-E4216WRX 4.0mm', '2MP', 'Bullet Camera', 'NDAA & TAA', 85, 250),
            createItem('DC-E4216WRX 2.8mm', 'Full HD', 'IR Bullet Camera', 'NDAA & TAA', 110, 200)
        ],
        2: [ // Turrets
            createItem('DC-D4532WERA', '5MP', 'AI IR Turret Camera', 'LightMaster NIR', 90, 250),
            createItem('DC-D4512WERA 4.3mm', '5MP', 'AI IR Turret Camera', 'LightMaster NIR', 80, 280),
            createItem('DC-D4512WERA 2.8mm', '5MP', 'AI IR Turret Camera', 'LightMaster NIR', 110, 200)
        ],
        3: [ // PTZ
            createItem('DC-S6883WRA', '8MP', 'LightMaster AI IR PTZ', 'Edge AI Plus', 60, 650),
            createItem('DC-S6882WR', '8MP', 'IR Speed Dome', 'LightMaster NIR', 60, 600),
            createItem('DC-S6683WRA', '6MP', 'LightMaster AI IR PTZ', 'Edge AI Plus', 60, 650),
            createItem('DC-S6682WR', '6MP', 'IR Speed Dome', 'LightMaster NIR', 60, 600),
            createItem('DC-S6481HRA', '4MP', 'AI Speed Dome', 'LightMaster NIR', 60, 550),
            createItem('DC-S6286HRXL', '2MP', '36x Lightmaster IR PTZ', 'Long Range', 45, 800),
            createItem('DC-S6281HX', '2MP', '30X Speed Dome', 'WDR, IP67, Heater', 55, 600),
            createItem('DC-S6281FX', '2MP', '30X Speed Dome', 'WDR, Flush Mount', 55, 500),
            createItem('DC-S6261X', '2MP', 'Mini PTZ Camera', 'NDAA & TAA', 75, 300),
            createItem('DC-S4561WRA', '5MP', 'Mini AI PTZ Camera', 'NDAA & TAA', 75, 300)
        ],
        4: [ // NVRs
            createItem('DR-8564', '64CH', 'DirectIP 8500 4K', 'NDAA H.265 Recorder', 0, 0),
            createItem('DR-8564D', '64CH', 'DirectIP 8500 4K', 'NDAA H.265 Recorder', 0, 0),
            createItem('DR-8516', '16CH', 'DirectIP 8500 4K', 'NDAA H.265 Recorder', 0, 0),
            createItem('DR-8532D', '32CH', 'DirectIP 8500 4K', 'NDAA H.265 Recorder', 0, 0),
            createItem('DR-8532', '32CH', 'DirectIP 8500 4K', 'NDAA H.265 Recorder', 0, 0),
            createItem('DR-6532P-A', '32CH', 'DirectIP 6500 4K', 'NDAA H.265 Recorder', 0, 0),
            createItem('DR-6516P-A', '16CH', 'DirectIP 6500 4K', 'NDAA H.265 Recorder', 0, 0),
            createItem('DR-6516P', '16CH', 'DirectIP 6500 4K', 'NDAA H.265 Recorder', 0, 0),
            createItem('DR-6508P', '8CH', 'DirectIP 6500 4K', 'NDAA H.265 Recorder', 0, 0),
            createItem('DR-3516P', '16CH', 'DirectIP 3500 4K', 'NDAA H.265 Recorder', 0, 0),
            createItem('DR-2516P-A', '16CH', 'DirectIP 2500 4K', 'NDAA H.265 Recorder', 0, 0),
            createItem('DR-2508P-A', '8CH', 'DirectIP 2500 4K', 'NDAA H.265 Recorder', 0, 0),
            createItem('DR-2504P-C', '4CH', 'DirectIP 2500 4K', 'NDAA H.265 Recorder', 0, 0),
            createItem('DR-2504P-B', '4CH', 'DirectIP 2500 4K', 'NDAA H.265 Recorder', 0, 0),
            createItem('DR-2508P', '8CH', 'DirectIP 2500 4K', 'NDAA H.265 Recorder', 0, 0),
            createItem('DR-2504P-A', '4CH', 'DirectIP 2500 4K', 'NDAA H.265 Recorder', 0, 0),
            createItem('DR-2504P', '4CH', 'DirectIP 2500 4K', 'NDAA H.265 Recorder', 0, 0),
            createItem('DR-1508P-A', '8CH', 'DirectIP 1500 FHD', 'NDAA & TAA', 0, 0),
            createItem('DR-1504P-A', '4CH', 'DirectIP 1500 FHD', 'NDAA & TAA', 0, 0),
            createItem('DR-1508P', '8CH', 'DirectIP 1500 FHD', 'NDAA & TAA', 0, 0),
            createItem('DR-1504P', '4CH', 'DirectIP 1500 FHD', 'NDAA & TAA', 0, 0)
        ]
    },
    'Ajax': {
        0: [ // Domes (DomeCam Mini)
            createItem('DomeCam Mini', '5Mp/2.8mm', 'Wired AI IP Camera', '110° FOV, IR 35m, JetSparrow', 110, 250),
            createItem('DomeCam Mini', '5Mp/4mm', 'Wired AI IP Camera', '85° FOV, IR 35m, JetSparrow', 85, 250),
            createItem('DomeCam Mini', '8Mp/2.8mm', 'Wired AI IP Camera', '110° FOV, IR 35m, JetSparrow', 110, 280),
            createItem('DomeCam Mini', '8Mp/4mm', 'Wired AI IP Camera', '85° FOV, IR 35m, JetSparrow', 85, 280)
        ],
        1: [ // Bullets (BulletCam)
            createItem('BulletCam', '5Mp/2.8mm', 'Wired AI IP Camera', '110° FOV, IR 35m, JetSparrow', 110, 300),
            createItem('BulletCam', '5Mp/4mm', 'Wired AI IP Camera', '85° FOV, IR 35m, JetSparrow', 85, 300),
            createItem('BulletCam', '8Mp/2.8mm', 'Wired AI IP Camera', '110° FOV, IR 35m, JetSparrow', 110, 350),
            createItem('BulletCam', '8Mp/4mm', 'Wired AI IP Camera', '85° FOV, IR 35m, JetSparrow', 85, 350)
        ],
        2: [ // Turrets (TurretCam)
            createItem('TurretCam', '5Mp/2.8mm', 'Wired AI IP Camera', '110° FOV, IR 35m, JetSparrow', 110, 280),
            createItem('TurretCam', '5Mp/4mm', 'Wired AI IP Camera', '85° FOV, IR 35m, JetSparrow', 85, 280),
            createItem('TurretCam', '8Mp/2.8mm', 'Wired AI IP Camera', '110° FOV, IR 35m, JetSparrow', 110, 300),
            createItem('TurretCam', '8Mp/4mm', 'Wired AI IP Camera', '85° FOV, IR 35m, JetSparrow', 85, 300)
        ],
        3: [ // PTZ (Ajax does not currently have a PTZ line, keeping empty for structure)
        ],
        4: [ // NVRs
            createItem('Ajax NVR', '8-Channel', 'Network Video Recorder', 'ONVIF/RTSP, 16TB SATA', 0, 0),
            createItem('Ajax NVR', '16-Channel', 'Network Video Recorder', 'ONVIF/RTSP, 16TB SATA', 0, 0)
        ]
    },
    'Axis': {
        0: [ // Domes
            createItem('M4327-P', '6MP', 'Panoramic Fisheye Dome', 'Deep Learning', 180, 250),
            createItem('P3737-PLE', '20MP', '4x5MP Panoramic Dome', 'Deep Learning', 180, 300),
            createItem('M4227-LVE', '5MP', 'Dome IP Camera', '3.2-7.2mm Varifocal', 95, 250),
            createItem('M3126-LVE', '4MP', 'Dome IP Camera', '2.4mm Fixed Lens', 130, 200),
            createItem('P3277-LVE', '5MP', 'Outdoor Dome', '3-8.5mm Varifocal', 100, 280),
            createItem('P3248-LVE', '8MP', 'Outdoor Dome', '4.3-8.6mm Varifocal', 100, 300),
            createItem('M4216-LV', '4MP', 'Indoor Varifocal Dome', 'Deep Learning', 95, 220),
            createItem('M4215-LV', '2MP', 'Indoor Varifocal Dome', 'Deep Learning', 95, 220)
        ],
        1: [ // Bullets
            createItem('M2036-LE', '4MP', 'Compact Bullet Camera', '3.2mm Fixed Lens, IK08', 100, 250),
            createItem('P1488-LE', '8MP', 'Outdoor Bullet', '5.9-13.8mm Varifocal', 80, 350),
            createItem('P1475-LE', '2MP', 'Outdoor Bullet', '3.1-9mm Varifocal', 90, 300),
            createItem('P1465-LE', '2MP', 'Outdoor Bullet', 'Deep Learning Analytics', 90, 300),
            createItem('P1518-E', '8MP', 'Outdoor Bullet', '5.85-13.8mm Varifocal', 80, 380),
            createItem('Q1805-LE', '2MP', 'Outdoor Bullet', '4.3-138mm VF Lens', 45, 600),
            createItem('Q1806-LE', '4MP', 'Outdoor Bullet', '4.3-138mm VF Lens', 45, 600),
            createItem('Q1808-LE', '10MP', 'Outdoor Bullet', '12-48mm VF Lens', 60, 500),
            createItem('Q1700-LE', '2MP', 'License Plate Bullet', '18-137mm Lens (LPR)', 25, 650)
        ],
        2: [ // Turrets / Mini Domes
            createItem('M3086-V', '4MP', 'Mini Dome/Turret', '2.4mm Fixed Lens', 130, 180),
            createItem('M3085-V', '2MP', 'Mini Dome/Turret', '3.1mm Fixed Lens', 100, 180),
            createItem('P3925-R', '2MP', 'Mini Dome/Turret', '2.8mm Fixed Lens, Mobile', 110, 180)
        ],
        3: [ // PTZ
            createItem('Q6088-E', '4K', 'Outdoor PTZ', '34x Optical Zoom', 60, 800),
            createItem('Q6086-E', '4MP', 'Outdoor PTZ', '34x Optical, Forensic WDR', 60, 750),
            createItem('Q6075-E', '1080p', 'Outdoor PTZ', '40x Optical, Lightfinder', 60, 800),
            createItem('P5676-LE', '4MP', 'Outdoor PTZ', '30x Zoom, IR, AI Analytics', 60, 650),
            createItem('P5655-E', '1080p', 'Outdoor PTZ', '32x Zoom, Secure Boot', 60, 600),
            createItem('Q6128-E', '4K', 'PTZ Dome Camera', 'Sharpdome Technology', 60, 650),
            createItem('M5526-E', '4MP', 'Discreet PTZ', '10x Optical Zoom, 360 Pan', 70, 450)
        ],
        4: [ // NVRs
            createItem('S3008 Mk II', '8CH', 'Compact NVR', 'Integrated PoE Switch', 0, 0),
            createItem('S2208 Mk II', '8CH', 'Camera Station Appliance', '4TB Storage', 0, 0),
            createItem('S2212 Mk II', '12CH', 'Camera Station Appliance', '6TB Storage', 0, 0),
            createItem('S3016', '16CH', 'Rack Recorder NVR', 'Integrated PoE Switch', 0, 0),
            createItem('S4000', '16CH', '1U Network Video Recorder', 'up to 32TB Storage', 0, 0),
            createItem('S2216 Mk II', '16CH', 'Camera Station Appliance', '8TB Storage', 0, 0),
            createItem('S1224', '24CH', 'Video Server NVR', '12TB Storage', 0, 0),
            createItem('S1232', '32CH', 'Tower/Rack Server', '32TB Storage', 0, 0),
            createItem('S1264', '64CH', 'Rack-Mount Server', 'Up to 144TB Storage', 0, 0),
            createItem('S1296', '96CH', 'Rack-Mount Server', '192TB Storage', 0, 0)
        ]
    }
};