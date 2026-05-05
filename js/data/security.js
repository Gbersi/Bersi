const createItem = (id, mp, desc, specs, fov, range) => ({ id, name: id, desc: `${mp} ${desc}`, specs, defFov: fov, defRange: range });

export const securityBrands = ['Ajax'];

export const securityDB = {
    'Ajax': {
        0: [ // Starter kits (No vision cone)
             createItem('StarterKit', 'Kit', 'Basic Security Kit', 'Hub, MotionProtect, DoorProtect, SpaceControl', 0, 0),
             createItem('StarterKit Cam', 'Kit', 'Photo Verification Kit', 'Hub 2, MotionCam, DoorProtect, SpaceControl', 0, 0)
        ],
        1: [ // Hubs (No vision cone)
             createItem('Hub 2 Plus 4G Jeweller', 'Panel', 'Wireless control panel', 'Wi-Fi, Ethernet, Dual SIM', 0, 0),
             createItem('Hub 2 4G Jeweller', 'Panel', 'Wireless control panel', 'Wi-Fi, Ethernet, Dual SIM', 0, 0)
        ],
        2: [ // Range extenders (No vision cone)
             createItem('ReX 2 Jeweller', 'Extender', 'Radio signal repeater', 'Jeweller & Wings protocols', 0, 0),
             createItem('ReX Jeweller', 'Extender', 'Radio signal repeater', 'Jeweller protocol', 0, 0)
        ],
        3: [ // Opening detectors/Door Sensors (No vision cone)
             createItem('DoorProtect Jeweller', 'Magnetic', 'Opening detector', 'Reed switch', 0, 0),
             createItem('DoorProtect Plus Jeweller', 'Magnetic', 'Opening, shock & tilt', 'Reed switch + accelerometer', 0, 0)
        ],
        4: [ // Glass break detectors (Circular acoustic range)
             createItem('GlassProtect Jeweller', 'Acoustic', 'Glass break detector', 'Microphone, up to 9m', 360, 100)
        ],
        5: [ // Motion detectors (Renders Vision Cone)
             createItem('MotionProtect Jeweller', 'PIR', 'IR motion detector', '12m range, 85° FOV', 85, 150),
             createItem('MotionProtect Plus Jeweller', 'PIR+MW', 'IR + Microwave', 'Prevents thermal interference', 85, 150),
             createItem('MotionProtect Curtain', 'Curtain', 'IR curtain detector', 'Narrow viewing angle (15°)', 15, 180),
             createItem('CombiProtect Jeweller', 'PIR+GB', 'Motion + Glass break', 'PIR & Microphone', 85, 150),
             createItem('MotionCam Jeweller', 'PIR+Cam', 'Detector with photo', 'Photo by alarm', 85, 150),
             createItem('MotionCam (PhOD)', 'PIR+Cam', 'Detector with photo', 'Photo on demand', 85, 150),
             createItem('Curtain Outdoor Jeweller', 'Curtain', 'Dual tech curtain', 'Outdoor/Indoor use', 15, 200),
             createItem('Curtain Outdoor Mini', 'Curtain', 'Dual tech curtain', 'Outdoor/Indoor use', 15, 200),
             createItem('DualCurtain Outdoor', 'Curtain', 'Bidirectional curtain', 'Outdoor', 15, 350),
             createItem('MotionProtect Outdoor', 'PIR', 'Outdoor IR detector', 'Pet immune', 90, 200),
             createItem('MotionCam Outdoor', 'PIR+Cam', 'Outdoor PIR with photo', 'Photo by alarm', 90, 200),
             createItem('MotionCam Outdoor (PhOD)', 'PIR+Cam', 'Outdoor PIR with photo', 'Photo on demand', 90, 200),
             createItem('MotionCam HighMount (PhOD)', 'PIR+Cam', 'High mount outdoor PIR', 'Photo on demand', 90, 200),
             createItem('CurtainCam HighMount', 'Curtain+Cam', 'High mount outdoor curtain', 'Photo on demand', 15, 200)
        ],
        6: [ // Keypads (No vision cone)
             createItem('KeyPad TouchScreen', 'Keypad', 'Wireless touch screen', 'Smartphone, Pass, Tag, code', 0, 0),
             createItem('KeyPad Plus Jeweller', 'Keypad', 'Wireless touch keypad', 'Encrypted contactless', 0, 0),
             createItem('KeyPad Jeweller', 'Keypad', 'Wireless touch keypad', 'Indoor', 0, 0),
             createItem('KeyPad Outdoor', 'Keypad', 'Wireless keypad', 'Pass, Tag, smartphone, codes', 0, 0)
        ],
        7: [ // Sirens (No vision cone)
             createItem('StreetSiren DoubleDeck', 'Siren', 'Wireless outdoor siren', 'Clip lock for faceplate', 0, 0),
             createItem('StreetSiren Jeweller', 'Siren', 'Wireless outdoor siren', 'Indoor and outdoor', 0, 0),
             createItem('HomeSiren Jeweller', 'Siren', 'Wireless indoor siren', 'Indoor', 0, 0)
        ],
        8: [ // Integration modules (No vision cone)
             createItem('MultiTransmitter', 'Module', 'Integration module', 'Up to 18 devices', 0, 0),
             createItem('Transmitter', 'Module', 'Integration module', 'One device', 0, 0),
             createItem('vhfBridge', 'Module', 'VHF transmitter module', 'Connect to third-party VHF', 0, 0)
        ],
        9: [ // Relays (No vision cone)
             createItem('WallSwitch Jeweller', 'Relay', 'Wireless power relay', '110/230 V~ power supply', 0, 0),
             createItem('Relay Jeweller', 'Relay', 'Wireless dry contact relay', 'Low voltage', 0, 0)
        ],
        10: [ // Power supply units (No vision cone)
             createItem('6V PSU (type A)', 'PSU', 'Power supply unit', 'For portable battery', 0, 0),
             createItem('12-24V PSU (type A)', 'PSU', 'Power supply unit', 'Low-voltage power source', 0, 0)
        ],
        11: [ // Casings (No vision cone)
             createItem('Case A (106)', 'Case', 'Casing for Ajax module', 'Indoor', 0, 0),
             createItem('Case B (175)', 'Case', 'Casing for Fibra modules', 'Indoor', 0, 0),
             createItem('Case C (260)', 'Case', 'Casing for module + 7Ah', 'Indoor', 0, 0),
             createItem('Case D (430)', 'Case', 'Casing for up to 8 modules', 'Indoor', 0, 0),
             createItem('Case E (395)', 'Case', 'Waterproof casing for hub', 'Outdoor/Indoor', 0, 0)
        ]
   
}
}