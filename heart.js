const canvas = document.getElementById("heartCanvas");
const ctx = canvas.getContext("2d");

const img = new Image();
img.src = "img/Image.jpg"; // Make sure path is correct
img.onload = () => drawHeart();

let t = 0;

ctx.lineWidth = 3;
ctx.strokeStyle = "#d81b60";

// Heart size and position
function createRose() {
    const rose = document.createElement("div");
    rose.classList.add("rose");
    rose.innerHTML = "🌹";

    // Random horizontal position
    rose.style.left = Math.random() * (window.innerWidth - 30) + "px";

    // Start slightly above the viewport
    rose.style.top = "-50px";

    // Random size
    rose.style.fontSize = (20 + Math.random() * 20) + "px";

    // Slow falling: 6–10 seconds
    const duration = 6 + Math.random() * 4; 
    rose.style.transition = `top ${duration}s linear`;

    document.body.appendChild(rose);

    // Start the falling animation
    setTimeout(() => {
        rose.style.top = window.innerHeight + "px"; // move to bottom
    }, 50);

    // Remove immediately when it hits the bottom
    setTimeout(() => {
        rose.remove();
    }, duration * 1000); // same as duration
}

setInterval(createRose, 600);
function heartX(t) {
    return 250 + 170 * Math.pow(Math.sin(t), 3); // was 180 → now 170
}

function heartY(t) {
    return 200 - (
        140 * Math.cos(t) -  // was 150 → now 140
        50 * Math.cos(2 * t) - // keep same
        25 * Math.cos(3 * t) - // keep same
        15 * Math.cos(4 * t)   // keep same
    );
}

function drawHeart() {
    if (t === 0) ctx.beginPath();

    const x = heartX(t);
    const y = heartY(t);

    if (t === 0) {
        ctx.moveTo(x, y);
    } else {
        ctx.lineTo(x, y);
        ctx.stroke();
    }

    t += 0.02;

    if (t <= Math.PI * 2) {
        requestAnimationFrame(drawHeart);
    } else {
        ctx.closePath();
        ctx.stroke();

        // Clip and draw image
        ctx.save();
        ctx.clip();

        // Adjust image position/size to fit heart
        ctx.drawImage(img, 70, 60, 360, 320);

        ctx.restore();
    }
}