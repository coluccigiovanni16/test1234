window.onload = function () {
  // ——— INITIALIZE PLUGIN ———
  var instance = Particles.init({
    selector: ".background",
    color: ["#00A1E0", "#50BFE6", "#74c0fc", "#cfe2ff", "#ffffff"],
    maxParticles: 120,
    sizeVariations: 4,
    speed: 0.4,
    minDistance: 100,
    connectParticles: true,
    responsive: [
      { breakpoint: 768, options: { maxParticles: 80, minDistance: 80 } },
    ],
    // hook into each frame
    onParticlesUpdate: function (ctx, particles) {
      var time = Date.now() * 0.002;
      var w = ctx.canvas.width / 2;
      var h = ctx.canvas.height / 2;

      particles.forEach(function (p) {
        // pulsate
        p.radius = 2 + Math.sin(time + p.x * 0.01) * 1.5;
        // swirl toward center
        var dx = p.x - w,
          dy = p.y - h;
        var ang = Math.atan2(dy, dx);
        p.vx += Math.cos(ang) * 0.0007;
        p.vy += Math.sin(ang) * 0.0007;

        // hover attraction
        if (mouse.active) {
          var rx = p.x - mouse.x,
            ry = p.y - mouse.y;
          var dist = Math.sqrt(rx * rx + ry * ry);
          if (dist < hover.dist) {
            var force = ((hover.dist - dist) / hover.dist) * hover.strength;
            p.vx -= (rx / dist) * force;
            p.vy -= (ry / dist) * force;
            // bubble
            p.radius = Math.min(hover.maxSize, p.radius + 0.1);
          }
        }
      });
    },
  });

  // ——— MOUSE / CLICK / KEYBOARD STATE ———
  var canvas = document.querySelector(".background canvas");
  var mouse = { x: 0, y: 0, active: false };
  var hover = { dist: 120, strength: 0.05, maxSize: 8 };

  // track hover
  canvas.addEventListener("mousemove", function (e) {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
    mouse.active = true;
  });
  canvas.addEventListener("mouseout", function () {
    mouse.active = false;
  });

  // on click: spawn + repulse
  canvas.addEventListener("click", function (e) {
    // spawn 6 new particles at click
    for (var i = 0; i < 6; i++) {
      var p = new Particle(instance.context, instance.options);
      p.x = e.clientX;
      p.y = e.clientY;
      // give them a burst
      var angle = Math.random() * Math.PI * 2;
      var speed = 1 + Math.random() * 1.5;
      p.vx = Math.cos(angle) * speed;
      p.vy = Math.sin(angle) * speed;
      instance.storage.push(p);
    }
  });

  // right-click: eat particles
  canvas.addEventListener("contextmenu", function (e) {
    e.preventDefault();
    if (instance.storage.length > 20) {
      instance.storage.splice(0, 20);
    }
  });

  // 'c' to flip colors
  window.addEventListener("keydown", function (e) {
    if (e.key.toLowerCase() === "c") {
      instance.options.color.reverse();
      instance.destroy();
      instance = Particles.init(instance.options);
    }
  });
};
