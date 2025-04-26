window.onload = function () {
  // ——— CONFIGURATION ———
  const config = {
    selector: ".background",

    // COLORS & SHAPES
    color: ["#00A1E0", "#50BFE6", "#74c0fc", "#cfe2ff", "#ffffff"],
    shape: ["circle", "triangle", "polygon", "star"], // multiple shapes
    polygon: { nb_sides: 5 }, // for "polygon"

    // PARTICLE COUNT & BEHAVIOR
    maxParticles: 150,
    speed: 0.3, // drift speed
    sizeVariations: 5, // variations in size
    particleRadius: 3, // base radius
    minDistance: 100, // connection threshold

    // LINE LINKS (connectParticles)
    lineLinked: {
      enable: true,
      distance: 120,
      color: "#ffffff",
      opacity: 0.4,
      width: 1,
    },

    // HIGH-DPI SUPPORT
    retina_detect: true,

    // RESPONSIVE TWEAKS
    responsive: [
      {
        breakpoint: 768,
        options: {
          maxParticles: 100,
          minDistance: 80,
        },
      },
    ],

    // INTERACTIVITY MODES
    interactivity: {
      detect_on: "canvas",
      events: {
        onhover: {
          enable: true,
          mode: ["grab", "bubble"], // grab lines + bubble grow
        },
        onclick: {
          enable: true,
          mode: ["push", "repulse"], // spawn + repel
        },
        resize: true,
      },
      modes: {
        // Grab: draw a line from mouse to particle
        grab: {
          distance: 150,
          lineLinked: { opacity: 0.7 },
        },
        // Bubble: enlarge & brighten
        bubble: {
          distance: 120,
          size: 8,
          duration: 2,
          opacity: 0.8,
          color: "#ffffff",
        },
        // Push: add particles at click
        push: {
          particles_nb: 4,
        },
        // Repulse: push them away
        repulse: {
          distance: 200,
          duration: 0.4,
        },
      },
    },

    // CUSTOM DYNAMICS
    onParticlesUpdate: function (ctx, particles) {
      const time = Date.now();
      const centerX = ctx.canvas.width / 2;
      const centerY = ctx.canvas.height / 2;

      particles.forEach((p) => {
        // 1) Pulsating radius
        p.radius = 2.5 + Math.sin(time * 0.002 + p.x * 0.01) * 1.5;

        // 2) Subtle swirl toward center
        const dx = p.x - centerX;
        const dy = p.y - centerY;
        const angle = Math.atan2(dy, dx);
        p.vx += Math.cos(angle) * 0.0005;
        p.vy += Math.sin(angle) * 0.0005;
      });
    },
  };

  // initialize
  Particles.init(config);

  // ——— EXTRA: KEYBOARD TOGGLE FOR COLOR THEME ———
  window.addEventListener("keydown", (e) => {
    if (e.key.toLowerCase() === "c") {
      // flip the palette
      config.color = config.color.reverse();
      Particles.init(config);
    }
  });

  // ——— EXTRA: RIGHT-CLICK REMOVAL ———
  const canvas = document.querySelector(".background canvas");
  canvas.addEventListener("contextmenu", (e) => {
    e.preventDefault();
    // remove a handful of particles on right-click
    Particles.destroy(); // clear
    config.maxParticles = Math.max(20, config.maxParticles - 20);
    Particles.init(config); // restart with fewer
  });
};
