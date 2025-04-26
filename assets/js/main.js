window.onload = function () {
    Particles.init({
        selector: '.background',
        color: ['#00A1E0', '#50BFE6', '#74c0fc', '#cfe2ff', '#ffffff'],
        connectParticles: true,
        responsive: [
            {
                breakpoint: 768,
                options: {
                    maxParticles: 80
                }
            }
        ],
        maxParticles: 120,
        speed: 0.5,
        sizeVariations: 3,
        minDistance: 120
    });
};
