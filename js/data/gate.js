const createItem = (id, mp, desc, specs, fov, range) => ({ id, name: id, desc: `${mp} ${desc}`, specs, defFov: fov, defRange: range });

export const gateBrands = ['BamBormet', 'Legi'];

export const gateDB = {
    'BamBormet': {
        0: [ // Boom Barriers
            createItem('BLC', 'Barrier', 'Automatic Barrier BLC', 'Up to 4.5m arm length', 2, 120),
            createItem('BLD', 'Barrier', 'Automatic Barrier BLD', 'Up to 6m arm length', 2, 180),
            createItem('BL', 'Barrier', 'Automatic Barrier BL', 'Up to 10m arm length', 2, 250),
            createItem('Industrial', 'Barrier', 'Automatic Barrier Industrial', 'Up to 12m arm length', 2, 300),
            createItem('High-Speed', 'Barrier', 'High-Speed Barrier', 'Opening time 1.5s (up to 3.5m)', 2, 100)
        ],
        1: [ // Gates
            createItem('Speedgate', 'Gate', 'Folding Speedgate', 'High-speed opening/closing', 90, 150),
            createItem('Sliding Gate', 'Gate', 'Trackless Sliding Gate', 'Cantilever design', 5, 250),
            createItem('Swing Gate', 'Gate', 'Industrial Swing Gate', 'Single or double leaf', 90, 150)
        ],
        2: [ // Turnstiles
            createItem('Full-Height', 'Turnstile', 'BTM 3-Arm Turnstile', 'Security perimeter access', 360, 40),
            createItem('BTM Double', 'Turnstile', 'Full-Height Double Turnstile', 'High traffic perimeter access', 360, 60),
            createItem('Tripod', 'Turnstile', 'Security Tripod Turnstile', 'Half-height internal/external', 360, 30)
        ]
    },
    'Legi': {
        0: [ // Boom Barriers
            createItem('Standard Barrier', 'Barrier', 'Legi Automatic Barrier', 'General purpose access', 2, 150)
        ],
        1: [ // Gates
            createItem('LEGI-VARIO', 'Gate', 'Sliding Gate VARIO', 'Cantilevered sliding gate', 5, 200),
            createItem('LEGI-FIT', 'Gate', 'Swing Gate FIT', 'Standard lattice gate', 90, 120),
            createItem('LEGI Garden', 'Gate', 'Garden Swing Gate', 'Lightweight residential gate', 90, 100)
        ],
        2: [ // Turnstiles
            createItem('Standard Turnstile', 'Turnstile', 'Legi Full-Height', 'Galvanized finish', 360, 40)
        ]
    }
};