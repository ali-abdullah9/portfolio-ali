export const threeConfig = {
  performance: {
    maxParticles: 5000,
    shadowMapSize: 1024,
    antialias: true,
    pixelRatio: Math.min(window.devicePixelRatio, 2),
  },
  mobile: {
    maxParticles: 2000,
    enableShadows: false,
  },
};