const createItem = (id, mp, desc, specs, fov, range, img = null) => ({ 
    id, 
    name: id, 
    desc: `${mp} ${desc}`, 
    specs, 
    defFov: fov, 
    defRange: range,
    // Defaults to a local folder
    img: img || `Products/${id}.png` 
});

export const securityBrands = ['Ajax'];

export const securityDB = {
    'Ajax': {
        0: [ // Starter kits (No vision cone)
             createItem('StarterKit', 'Kit', 'Basic Security Kit', 'Hub, MotionProtect, DoorProtect', 0, 0, 'Products/Ajax/StarterKit.png'),
             createItem('StarterKit Cam', 'Kit', 'Photo Verification Kit', 'Hub 2, MotionCam, DoorProtect', 0, 0, 'Products/Ajax/StarterKit-Cam.png')
        ],
        1: [ // Hubs (No vision cone)
             createItem('Hub 2 Plus', 'Panel', 'Wireless control panel', 'Wi-Fi, Ethernet, Dual SIM', 0, 0, 'Products/Ajax/Hub-2-Plus.png'),
             createItem('Hub 2', 'Panel', 'Wireless control panel', 'Wi-Fi, Ethernet, Dual SIM', 0, 0, 'Products/Ajax/Hub-2.png')
        ],
        2: [ // Range extenders (No vision cone)
             createItem('ReX 2', 'Extender', 'Radio signal repeater', 'Jeweller & Wings protocols', 0, 0, 'Products/Ajax/ReX-2.png'),
             createItem('ReX', 'Extender', 'Radio signal repeater', 'Jeweller protocol', 0, 0, 'Products/Ajax/ReX.png')
        ],
        3: [ // Opening detectors/Door Sensors (No vision cone)
             createItem('DoorProtect', 'Magnetic', 'Opening detector', 'Reed switch', 0, 0, 'Products/Ajax/DoorProtect.png'),
             createItem('DoorProtect Plus', 'Magnetic', 'Opening, shock & tilt', 'Reed switch + accelerometer', 0, 0, 'Products/Ajax/DoorProtect-Plus.png')
        ],
        4: [ // Glass break detectors (Circular acoustic range)
             createItem('GlassProtect', 'Acoustic', 'Glass break detector', 'Microphone, up to 9m', 360, 100, 'Products/Ajax/GlassProtect.png')
        ],
        5: [ // Motion detectors (Renders Vision Cone)
             createItem('MotionProtect', 'PIR', 'IR motion detector', '12m range, 85° FOV', 85, 150, 'Products/Ajax/MotionProtect.png'),
             createItem('MotionProtect Plus', 'PIR+MW', 'IR + Microwave', 'Prevents thermal interference', 85, 150, 'Products/Ajax/MotionProtect-Plus.png'),
             createItem('MotionProtect Curtain', 'Curtain', 'IR curtain detector', 'Narrow viewing angle (15°)', 15, 180, 'Products/Ajax/MotionProtect-Curtain.png'),
             createItem('CombiProtect', 'PIR+GB', 'Motion + Glass break', 'PIR & Microphone', 85, 150, 'Products/Ajax/CombiProtect.png'),
             createItem('MotionCam', 'PIR+Cam', 'Detector with photo', 'Photo by alarm', 85, 150, 'Products/Ajax/MotionCam.png'),
             createItem('MotionCam (PhOD)', 'PIR+Cam', 'Detector with photo', 'Photo on demand', 85, 150, 'Products/Ajax/MotionCam-PhOD.png'),
             createItem('Curtain Outdoor', 'Curtain', 'Dual tech curtain', 'Outdoor/Indoor use', 15, 200, 'Products/Ajax/Curtain-Outdoor.png'),
             createItem('DualCurtain Outdoor', 'Curtain', 'Bidirectional curtain', 'Outdoor', 15, 350, 'Products/Ajax/DualCurtain-Outdoor.png'),
             createItem('MotionProtect Outdoor', 'PIR', 'Outdoor IR detector', 'Pet immune', 90, 200, 'Products/Ajax/MotionProtect-Outdoor.png'),
             createItem('MotionCam Outdoor', 'PIR+Cam', 'Outdoor PIR with photo', 'Photo by alarm', 90, 200, 'Products/Ajax/MotionCam-Outdoor.png'),
             createItem('MotionCam Outdoor (PhOD)', 'PIR+Cam', 'Outdoor PIR with photo', 'Photo on demand', 90, 200, 'Products/Ajax/MotionCam-Outdoor-PhOD.png')
        ],
        6: [ // Keypads (No vision cone)
             createItem('KeyPad TouchScreen', 'Keypad', 'Wireless touch screen', 'Smartphone, Pass, Tag, code', 0, 0, 'Products/Ajax/KeyPad-TouchScreen.png'),
             createItem('KeyPad Plus', 'Keypad', 'Wireless touch keypad', 'Encrypted contactless', 0, 0, 'Products/Ajax/KeyPad-Plus.png'),
             createItem('KeyPad', 'Keypad', 'Wireless touch keypad', 'Indoor', 0, 0, 'Products/Ajax/KeyPad.png')
        ],
        7: [ // Sirens (No vision cone)
             createItem('StreetSiren DoubleDeck', 'Siren', 'Wireless outdoor siren', 'Clip lock for faceplate', 0, 0, 'Products/Ajax/StreetSiren-DoubleDeck.png'),
             createItem('StreetSiren', 'Siren', 'Wireless outdoor siren', 'Indoor and outdoor', 0, 0, 'Products/Ajax/StreetSiren.png'),
             createItem('HomeSiren', 'Siren', 'Wireless indoor siren', 'Indoor', 0, 0, 'Products/Ajax/HomeSiren.png')
        ],
        8: [ // Integration modules (No vision cone)
             createItem('MultiTransmitter', 'Module', 'Integration module', 'Up to 18 devices', 0, 0, 'Products/Ajax/MultiTransmitter.png'),
             createItem('Transmitter', 'Module', 'Integration module', 'One device', 0, 0, 'Products/Ajax/Transmitter.png'),
             createItem('vhfBridge', 'Module', 'VHF transmitter module', 'Connect to third-party VHF', 0, 0, 'Products/Ajax/vhfBridge.png')
        ],
        9: [ // Relays (No vision cone)
             createItem('WallSwitch', 'Relay', 'Wireless power relay', '110/230 V~ power supply', 0, 0, 'Products/Ajax/WallSwitch.png'),
             createItem('Relay', 'Relay', 'Wireless dry contact relay', 'Low voltage', 0, 0, 'Products/Ajax/Relay.png')
        ]
    }
};