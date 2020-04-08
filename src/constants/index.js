export const scenes = {
  boot: 'boot',
  main: 'main',
};

export const objects = {
  waste: {
    general: 'general-waste',
    plastic: {
      bottle: 'plastic-bottle',
    },
    glass: {
      bottle: 'glass-bottle',
    },
    metal: {
      can: 'can',
    },
    paper: {
      scrap: 'scrap',
    },
  },
  bin: {
    plastic: 'plastic-bin',
    glass: 'glass-bin',
    metal: 'metal-bin',
    paper: 'paper-bin',
  },
};

export const wasteType = {
  plastic: 'plastic',
  glass: 'glass',
  metal: 'metal',
  paper: 'paper',
};

export const fonts = {
  main: 'main',
};

export const gameOptions = {
  wasteSize: 110,
  lives: 3,
};

export default {
  scenes,
  objects,
  fonts,
};
