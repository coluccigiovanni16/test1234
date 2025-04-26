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
            particles.forEach(p => {
                p.radius = 2.5 + Math.sin(Date.now() * 0.002 + p.x) * 1.5;
            });
        },
        // Hover Interactivity
        interactivity: {
            events: {
                onHover: {
                    enable: true,
                    mode: 'bubble' // or 'repulse' if you prefer pushing them away
                }
            },
            modes: {
                bubble: {
                    distance: 120,
                    size: 8,
                    duration: 2,
                    opacity: 0.8,
                    color: '#ffffff'
                }
            }
        }
    });
};
