window.onload = function () {
    Particles.init({
        selector: '.background',
        color: ['#00A1E0', '#50BFE6', '#74c0fc', '#cfe2ff', '#ffffff'],
        connectParticles: true,
        maxParticles: 150,
        speed: 0.3,
        minDistance: 100,
        sizeVariations: 5,
        particleRadius: 3,
        responsive: [
            {
                breakpoint: 768,
                options: {
                    maxParticles: 100,
                    minDistance: 80,
                }
            }
        ],
        onParticlesUpdate: function(ctx, particles) {
            // Add some subtle pulsating effect to the particles
            particles.forEach(p => {
                p.radius = 2.5 + Math.sin(Date.now() * 0.002 + p.x) * 1.5;
            });
        }
    });
};
