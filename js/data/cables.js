const createItem = (id, mp, desc, specs, fov, range) => ({ id, name: id, desc: `${mp} ${desc}`, specs, defFov: fov, defRange: range });

export const cableBrands = ['Standard'];

export const cableDB = {
    'Standard': {
        0: [ createItem('CBL-CAT6', 'Data', 'Cat6 UTP', 'Network Cable', 0, 0) ],
        1: [ createItem('CBL-12V', 'Power', '12V DC', 'Low Voltage', 0, 0) ],
        2: [ createItem('CBL-24V', 'Power', '24V DC', 'Low Voltage', 0, 0) ]
    }
};