// Add url and datasheet to the end!
const createItem = (id, mp, desc, specs, fov, range, img = null, url = null, datasheet = null) => ({ 
    id, 
    name: id, 
    desc: `${mp} ${desc}`, 
    specs, 
    defFov: fov, 
    defRange: range,
    img: img || `Products/${id}.png`,
    url: url,              // <-- Added
    datasheet: datasheet   // <-- Added
});

export const cctvBrands = ['IDIS', 'Ajax', 'Axis'];

export const cctvDB = {
    'IDIS': {
        0: [ // Domes
            createItem(
    'DC-D6831WRA', '8MP', 'AI IR Dome Camera', 'NDAA Edge AI Plus', 110, 350, 
    'Products/IDIS/DC-D6831WRA.jpg',
    'https://www.idisglobal.com/index/product_view/4287', // Manufacturer Link
    'https://datasheet.idisglobal.com/pdf/4287?country='    // Datasheet Link
),
            createItem('DC-D6631WRA', '6MP', 'AI IR Dome Camera', 'NDAA Edge AI Plus', 105, 320, 'Products/IDIS/D6631WRA.jpg'),
            createItem('DC-D4831HRX', '8MP', 'Vandal-Resistant IR Dome', 'NDAA & TAA', 90, 300, 'Products/IDIS/D4831HRX.jpg'),
            createItem('DC-D4811WRX', '8MP', 'Vandal-Resistant IR Dome', '3.3mm NDAA & TAA', 95, 300, 'Products/IDIS/D4811WRX.jpg'),
            createItem('DC-D4548WRA', '5MP', 'AI IR Dome Camera', 'LightMaster NIR', 90, 250, 'Products/IDIS/DC-D4548WRA.jpg'),
            createItem('DC-D4538WRA', '5MP', 'AI IR Dome Camera', 'LightMaster NIR', 90, 250, 'Products/IDIS/DC-D4538WRA.jpg'),
            createItem('DC-D4538RA', '5MP', 'AI IR Dome Camera', 'LightMaster NIR', 90, 250, 'Products/IDIS/DC-D4538RA.jpg'),
            createItem('DC-D4536RX', '5MP', 'IR Dome Camera', 'NDAA & TAA', 85, 220, 'Products/IDIS/DC-D4536RX.jpg'),
            createItem('DC-D4536HRX', '5MP', 'Vandal-Resistant IR Dome', 'NDAA & TAA', 85, 220, 'Products/IDIS/DC-D4536HRX.jpg'),
            createItem('DC-D4517RXP', '5MP', 'PoE Extender IR Dome', '4.3mm NDAA & TAA', 80, 200, 'Products/IDIS/DC-D4517RXP.jpg'),
            createItem('DC-D4517RX', '5MP', 'IR Dome Camera', '4.3mm NDAA & TAA', 80, 200, 'Products/IDIS/DC-D4517RX.jpg'),
            createItem('DC-D4516WRX', '5MP', 'IR Dome Camera', '4.0mm NDAA & TAA', 85, 200, 'Products/IDIS/DC-D4516WRX.jpg'),
            createItem('DC-D4248HRA', '2MP', 'AI Dome Camera', 'LightMaster NIR', 90, 180, 'Products/IDIS/DC-D4248HRA.jpg'),
            createItem('DC-D4246WX', '2MP', 'Dome Camera', 'NDAA & TAA', 90, 180, 'Products/IDIS/DC-D4246WX.jpg'),
            createItem('DC-D4238HRA', '2MP', 'AI Dome Camera', 'LightMaster NIR', 90, 180, 'Products/IDIS/DC-D4238HRA.jpg'),
            createItem('DC-D4237RX', '2MP', 'IR Dome Camera', 'NDAA & TAA', 90, 180, 'Products/IDIS/DC-D4237RX.jpg'),
            createItem('DC-D4236WRX', 'Full HD', 'Vandal-Resistant IR Dome', 'NDAA & TAA', 90, 180, 'Products/IDIS/DC-D4236WRX.jpg'),
            createItem('DC-D4236RX', 'Full HD', 'IR Dome Camera', 'NDAA & TAA', 90, 180, 'Products/IDIS/DC-D4236RX.jpg'),
            createItem('DC-D4236HRX', 'Full HD', 'Vandal-Resistant IR Dome', 'w/ Heater', 90, 180, 'Products/IDIS/DC-D4236HRX.jpg'),
            createItem('DC-D4218WRA', '2MP', 'AI Dome Camera', '4.0mm LightMaster', 85, 180, 'Products/IDIS/DC-D4218WRA.jpg'),
            createItem('DC-D4217RX', 'Full HD', 'IR Dome Camera', '4.0mm NDAA & TAA', 85, 180, 'Products/IDIS/DC-D4217RX.jpg'),
            createItem('DC-D4216WRX', 'Full HD', 'Vandal-Resistant IR Dome', '2.8mm NDAA & TAA', 110, 180, 'Products/IDIS/DC-D4216WRX.jpg'),
            createItem('DC-D4216RX', '2MP', 'IR Dome Camera', '4.0mm NDAA & TAA', 85, 180, 'Products/IDIS/DC-D4216RX.jpg'),
            createItem('DC-D4211CRX', 'Full HD', 'Micro Dome Camera', 'NDAA & TAA', 110, 120, 'Products/IDIS/DC-D4211CRX.jpg')
        ],
        1: [ // Bullets
            createItem('DC-T6831WRA', '8MP', 'AI IR Bullet Camera', 'Edge AI Plus', 85, 450, 'Products/IDIS/DC-T6831WRA.jpg'),
            createItem('DC-T6631WRA', '6MP', 'AI IR Bullet Camera', 'Edge AI Plus', 85, 420, 'Products/IDIS/DC-T6631WRA.jpg'),
            createItem('DC-T6224HRXL', '2MP', 'License Plate Capture', 'LPR/ANPR Camera', 40, 600, 'Products/IDIS/DC-T6224HRXL.jpg'),
            createItem('DC-T4831HRX', '8MP', 'IR Bullet Camera', 'w/ Heater', 85, 400, 'Products/IDIS/DC-T4831HRX.jpg'),
            createItem('DC-T4811WRX', '8MP', 'Bullet Camera', '3.3mm NDAA & TAA', 95, 380, 'Products/IDIS/DC-T4811WRX.jpg'),
            createItem('DC-T4538WRA', '5MP', 'Bullet Camera', 'LightMaster NIR', 85, 300, 'Products/IDIS/DC-T4538WRA.jpg'),
            createItem('DC-T4536HRX', '5MP', 'IR Bullet Camera', 'w/ Heater', 85, 300, 'Products/IDIS/DC-T4536HRX.png'),
            createItem('DC-T4517WRXP-A', '5MP', 'PoE Extender Bullet', '4.3mm NDAA & TAA', 80, 280, 'Products/IDIS/DC-T4517WRXP-A.png'),
            createItem('DC-T4517WRX-A', '5MP', 'Bullet Camera', '4.3mm NDAA & TAA', 80, 280, 'Products/IDIS/DC-T4517WRX-A.png'),
            createItem('DC-T4516WRX', '5MP', 'IR Bullet Camera', '4.0mm NDAA & TAA', 85, 260, 'Products/IDIS/DC-T4516WRX.png'),
            createItem('DC-T4248HRA', '2MP', 'AI Bullet Camera', 'LightMaster NIR', 85, 250, 'Products/IDIS/DC-T4248HRA.png'),
            createItem('DC-T4238HRA', '2MP', 'AI Bullet Camera', 'LightMaster NIR', 85, 250, 'Products/IDIS/DC-T4238HRA.png'),
            createItem('DC-T4236WRX-A', 'Full HD', 'IR Bullet Camera', 'NDAA & TAA', 85, 250, 'Products/IDIS/DC-T4236WRX-A.png'),
            createItem('DC-T4236WRX', 'Full HD', 'IR Bullet Camera', 'NDAA & TAA', 85, 250, 'Products/IDIS/DC-T4236WRX.png'),
            createItem('DC-T4236HRX', 'Full HD', 'IR Bullet Camera', 'w/ Heater', 85, 250, 'Products/IDIS/DC-T4236HRX.png'),
            createItem('DC-T4218WRA', '2MP', 'AI Bullet Camera', '4.0mm LightMaster', 85, 250, 'Products/IDIS/DC-T4218WRA.png'),
            createItem('DC-T4217WRX', 'Full HD', 'IR Bullet Camera', '4.0mm NDAA & TAA', 85, 250, 'Products/IDIS/DC-T4217WRX.png'),
            createItem('DC-E4216WRX', '2MP', 'Bullet Camera', '4.0mm NDAA & TAA', 85, 250, 'Products/IDIS/DC-E4216WRX.png')
        ],
        2: [ // Turrets
            createItem('DC-D4532WERA', '5MP', 'AI IR Turret Camera', 'LightMaster NIR', 90, 250, 'Products/IDIS/DC-D4532WERA.png'),
            createItem('DC-D4512WERA', '5MP', 'AI IR Turret Camera', '4.3mm LightMaster', 80, 280, 'Products/IDIS/DC-D4512WERA.png')
        ],
        3: [ // PTZ
            createItem('DC-S6883WRA', '8MP', 'LightMaster AI IR PTZ', 'Edge AI Plus', 60, 650, 'Products/IDIS/DC-S6883WRA.png'),
            createItem('DC-S6882WR', '8MP', 'IR Speed Dome', 'LightMaster NIR', 60, 600, 'Products/IDIS/DC-S6882WR.png'),
            createItem('DC-S6683WRA', '6MP', 'LightMaster AI IR PTZ', 'Edge AI Plus', 60, 650, 'Products/IDIS/DC-S6683WRA.png'),
            createItem('DC-S6682WR', '6MP', 'IR Speed Dome', 'LightMaster NIR', 60, 600, 'Products/IDIS/DC-S6682WR.png'),
            createItem('DC-S6481HRA', '4MP', 'AI Speed Dome', 'LightMaster NIR', 60, 550, 'Products/IDIS/DC-S6481HRA.png'),
            createItem('DC-S6286HRXL', '2MP', '36x Lightmaster IR PTZ', 'Long Range', 45, 800, 'Products/IDIS/DC-S6286HRXL.png'),
            createItem('DC-S6281HX', '2MP', '30X Speed Dome', 'WDR, IP67, Heater', 55, 600, 'Products/IDIS/DC-S6281HX.png'),
            createItem('DC-S6281FX', '2MP', '30X Speed Dome', 'WDR, Flush Mount', 55, 500, 'Products/IDIS/DC-S6281FX.png'),
            createItem('DC-S6261X', '2MP', 'Mini PTZ Camera', 'NDAA & TAA', 75, 300, 'Products/IDIS/DC-S6261X.png'),
            createItem('DC-S4561WRA', '5MP', 'Mini AI PTZ Camera', 'NDAA & TAA', 75, 300, 'Products/IDIS/DC-S4561WRA.png')
        ],
        4: [ // NVRs
            createItem('DR-8564', '64CH', 'DirectIP 8500 4K', 'NDAA H.265 Recorder', 0, 0, 'Products/IDIS/DR-8564.jpg'),
            createItem('DR-8532', '32CH', 'DirectIP 8500 4K', 'NDAA H.265 Recorder', 0, 0, 'Products/IDIS/DR-8532.jpg'),
            createItem('DR-6532P-A', '32CH', 'DirectIP 6500 4K', 'NDAA H.265 Recorder', 0, 0, 'Products/IDIS/DR-6532P-A.jpg'),
            createItem('DR-6516P-A', '16CH', 'DirectIP 6500 4K', 'NDAA H.265 Recorder', 0, 0, 'Products/IDIS/DR-6516P-A.jpg'),
            createItem('DR-2516P-A', '16CH', 'DirectIP 2500 4K', 'NDAA H.265 Recorder', 0, 0, 'Products/IDIS/DR-2516P-A.jpg'),
            createItem('DR-2508P-A', '8CH', 'DirectIP 2500 4K', 'NDAA H.265 Recorder', 0, 0, 'Products/IDIS/DR-2508P-A.jpg'),
            createItem('DR-2504P-A', '4CH', 'DirectIP 2500 4K', 'NDAA H.265 Recorder', 0, 0, 'Products/IDIS/DR-2504P-A.jpg')
        ]
    },
    'Ajax': {
        0: [ // Domes (DomeCam Mini)
            createItem('DomeCam Mini 2.8mm', '5Mp/8Mp', 'Wired AI IP Camera', '110° FOV, IR 35m', 110, 250, 'Products/Ajax/DomeCam-Mini.jpg'),
            createItem('DomeCam Mini 4mm', '5Mp/8Mp', 'Wired AI IP Camera', '85° FOV, IR 35m', 85, 250, 'Products/Ajax/DomeCam-Mini.jpg')
        ],
        1: [ // Bullets (BulletCam)
            createItem('BulletCam 2.8mm', '5Mp/8Mp', 'Wired AI IP Camera', '110° FOV, IR 35m', 110, 300, 'Products/Ajax/BulletCam.jpg'),
            createItem('BulletCam 4mm', '5Mp/8Mp', 'Wired AI IP Camera', '85° FOV, IR 35m', 85, 300, 'Products/Ajax/BulletCam.jpg')
        ],
        2: [ // Turrets (TurretCam)
            createItem('TurretCam 2.8mm', '5Mp/8Mp', 'Wired AI IP Camera', '110° FOV, IR 35m', 110, 280, 'Products/Ajax/TurretCam.jpg'),
            createItem('TurretCam 4mm', '5Mp/8Mp', 'Wired AI IP Camera', '85° FOV, IR 35m', 85, 280, 'Products/Ajax/TurretCam.jpg')
        ],
        3: [ // PTZ
        ],
        4: [ // NVRs
            createItem('Ajax NVR 8CH', '8-Channel', 'Network Video Recorder', 'ONVIF/RTSP, 16TB SATA', 0, 0, 'Products/Ajax/NVR.jpg'),
            createItem('Ajax NVR 16CH', '16-Channel', 'Network Video Recorder', 'ONVIF/RTSP, 16TB SATA', 0, 0, 'Products/Ajax/NVR.jpg')
        ]
    },
    'Axis': {
        0: [ // Domes
            createItem('M4327-P', '6MP', 'Panoramic Fisheye Dome', 'Deep Learning', 180, 250, 'Products/Axis/M4327-P.png'),
            createItem('P3737-PLE', '20MP', '4x5MP Panoramic Dome', 'Deep Learning', 180, 300, 'Products/Axis/P3737-PLE.png'),
            createItem('M4227-LVE', '5MP', 'Dome IP Camera', '3.2-7.2mm Varifocal', 95, 250, 'Products/Axis/M4227-LVE.png'),
            createItem('M3126-LVE', '4MP', 'Dome IP Camera', '2.4mm Fixed Lens', 130, 200, 'Products/Axis/M3126-LVE.png'),
            createItem('P3277-LVE', '5MP', 'Outdoor Dome', '3-8.5mm Varifocal', 100, 280, 'Products/Axis/P3277-LVE.png'),
            createItem('P3248-LVE', '8MP', 'Outdoor Dome', '4.3-8.6mm Varifocal', 100, 300, 'Products/Axis/P3248-LVE.png'),
            createItem('M4216-LV', '4MP', 'Indoor Varifocal Dome', 'Deep Learning', 95, 220, 'Products/Axis/M4216-LV.png'),
            createItem('M4215-LV', '2MP', 'Indoor Varifocal Dome', 'Deep Learning', 95, 220, 'Products/Axis/M4215-LV.png')
        ],
        1: [ // Bullets
            createItem('M2036-LE', '4MP', 'Compact Bullet Camera', '3.2mm Fixed Lens, IK08', 100, 250, 'Products/Axis/M2036-LE.png'),
            createItem('P1488-LE', '8MP', 'Outdoor Bullet', '5.9-13.8mm Varifocal', 80, 350, 'Products/Axis/P1488-LE.png'),
            createItem('P1475-LE', '2MP', 'Outdoor Bullet', '3.1-9mm Varifocal', 90, 300, 'Products/Axis/P1475-LE.png'),
            createItem('P1465-LE', '2MP', 'Outdoor Bullet', 'Deep Learning Analytics', 90, 300, 'Products/Axis/P1465-LE.png'),
            createItem('P1518-E', '8MP', 'Outdoor Bullet', '5.85-13.8mm Varifocal', 80, 380, 'Products/Axis/P1518-E.png'),
            createItem('Q1805-LE', '2MP', 'Outdoor Bullet', '4.3-138mm VF Lens', 45, 600, 'Products/Axis/Q1805-LE.png'),
            createItem('Q1806-LE', '4MP', 'Outdoor Bullet', '4.3-138mm VF Lens', 45, 600, 'Products/Axis/Q1806-LE.png'),
            createItem('Q1808-LE', '10MP', 'Outdoor Bullet', '12-48mm VF Lens', 60, 500, 'Products/Axis/Q1808-LE.png'),
            createItem('Q1700-LE', '2MP', 'License Plate Bullet', '18-137mm Lens (LPR)', 25, 650, 'Products/Axis/Q1700-LE.png')
        ],
        2: [ // Turrets / Mini Domes
            createItem('M3086-V', '4MP', 'Mini Dome/Turret', '2.4mm Fixed Lens', 130, 180, 'Products/Axis/M3086-V.png'),
            createItem('M3085-V', '2MP', 'Mini Dome/Turret', '3.1mm Fixed Lens', 100, 180, 'Products/Axis/M3085-V.png'),
            createItem('P3925-R', '2MP', 'Mini Dome/Turret', '2.8mm Fixed Lens, Mobile', 110, 180, 'Products/Axis/P3925-R.png')
        ],
        3: [ // PTZ
            createItem('Q6088-E', '4K', 'Outdoor PTZ', '34x Optical Zoom', 60, 800, 'Products/Axis/Q6088-E.png'),
            createItem('Q6086-E', '4MP', 'Outdoor PTZ', '34x Optical, Forensic WDR', 60, 750, 'Products/Axis/Q6086-E.png'),
            createItem('Q6075-E', '1080p', 'Outdoor PTZ', '40x Optical, Lightfinder', 60, 800, 'Products/Axis/Q6075-E.png'),
            createItem('P5676-LE', '4MP', 'Outdoor PTZ', '30x Zoom, IR, AI Analytics', 60, 650, 'Products/Axis/P5676-LE.png'),
            createItem('P5655-E', '1080p', 'Outdoor PTZ', '32x Zoom, Secure Boot', 60, 600, 'Products/Axis/P5655-E.png'),
            createItem('Q6128-E', '4K', 'PTZ Dome Camera', 'Sharpdome Technology', 60, 650, 'Products/Axis/Q6128-E.png'),
            createItem('M5526-E', '4MP', 'Discreet PTZ', '10x Optical Zoom, 360 Pan', 70, 450, 'Products/Axis/M5526-E.png')
        ],
        4: [ // NVRs
            createItem('S3008 Mk II', '8CH', 'Compact NVR', 'Integrated PoE Switch', 0, 0, 'Products/Axis/S3008-Mk-II.png'),
            createItem('S2208 Mk II', '8CH', 'Camera Station Appliance', '4TB Storage', 0, 0, 'Products/Axis/S2208-Mk-II.png'),
            createItem('S2212 Mk II', '12CH', 'Camera Station Appliance', '6TB Storage', 0, 0, 'Products/Axis/S2212-Mk-II.png'),
            createItem('S3016', '16CH', 'Rack Recorder NVR', 'Integrated PoE Switch', 0, 0, 'Products/Axis/S3016.png'),
            createItem('S4000', '16CH', '1U Network Video Recorder', 'up to 32TB Storage', 0, 0, 'Products/Axis/S4000.png')
        ]
    }
};