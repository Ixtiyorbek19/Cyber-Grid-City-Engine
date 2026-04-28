const canvas = document.getElementById('cityCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let buildings = [];
let mouseX = 0;
let mouseY = 0;

window.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX - canvas.width / 2) / 50;
    mouseY = (e.clientY - canvas.height / 2) / 50;
});

class Building {
    constructor(x, z, w, h) {
        this.x = x;
        this.z = z;
        this.w = w;
        this.h = h;
        this.color = `hsl(${180 + Math.random() * 40}, 100%, 50%)`;
    }

    draw() {
        // Isometrik 3D proyeksiya formulasi
        let screenX = canvas.width / 2 + (this.x - this.z) * 20 - mouseX * 20;
        let screenY = canvas.height / 2 + (this.x + this.z) * 10 - mouseY * 10;

        // Binoning orqa tomoni (Soya)
        ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
        ctx.beginPath();
        ctx.moveTo(screenX, screenY);
        ctx.lineTo(screenX, screenY - this.h);
        ctx.lineTo(screenX + this.w, screenY - this.h - 10);
        ctx.lineTo(screenX + this.w, screenY - 10);
        ctx.fill();

        // Binoning oldi (Neon yuzi)
        ctx.fillStyle = this.color;
        ctx.globalAlpha = 0.7;
        ctx.beginPath();
        ctx.rect(screenX - this.w/2, screenY - this.h, this.w, this.h);
        ctx.fill();
        
        // Derazalar (Liniyalar)
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
        ctx.lineWidth = 1;
        for(let i=0; i<this.h; i+=15) {
            ctx.beginPath();
            ctx.moveTo(screenX - this.w/2, screenY - i);
            ctx.lineTo(screenX + this.w/2, screenY - i);
            ctx.stroke();
        }
        ctx.globalAlpha = 1.0;
    }
}

function generateCity() {
    buildings = [];
    let count = 0;
    for (let x = -10; x < 10; x++) {
        for (let z = -10; z < 10; z++) {
            if (Math.random() > 0.4) {
                let h = Math.random() * 200 + 50;
                let w = 25;
                buildings.push(new Building(x * 1.5, z * 1.5, w, h));
                count++;
            }
        }
    }
    document.getElementById('bldgCount').innerText = count;
}

function animate() {
    ctx.fillStyle = '#000205';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Binolarni uzoqligiga qarab tartiblash (Z-sorting)
    buildings.sort((a, b) => (a.x + a.z) - (b.x + b.z));
    
    buildings.forEach(b => b.draw());
    requestAnimationFrame(animate);
}

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

generateCity();
animate();