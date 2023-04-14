function distanceBetweenPoints(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}

function handleMouseMove(e) {
    const containerRect = container.getBoundingClientRect();
    const mouseX = e.clientX - containerRect.left;
    const mouseY = e.clientY - containerRect.top;

    container.childNodes.forEach((pixel, index) => {
        const pixelX = (index % newWidth) * 10 + 5;
        const pixelY = Math.floor(index / newWidth) * 10 + 5;
        const distance = distanceBetweenPoints(mouseX, mouseY, pixelX, pixelY);
        const maxDistance = 50;
        const scale = Math.min(1, distance / maxDistance);
        pixel.style.transform = `scale(${scale})`;
    });
}

let newWidth;
let newHeight;

document.getElementById('file-input').addEventListener('change', function (e) {
    const file = e.target.files[0];
    const img = new Image();
    img.src = URL.createObjectURL(file);
    img.onload = function () {
        const spinner = document.getElementById('spinner');
        spinner.style.display = 'block';

        setTimeout(() => {
            const aspectRatio = img.height / img.width;
            newWidth = 30;
            newHeight = Math.round(newWidth * aspectRatio);
            const canvas = document.createElement('canvas');
            canvas.width = newWidth;
            canvas.height = newHeight;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0, newWidth, newHeight);
            const container = document.getElementById('container');
            container.innerHTML = '';
            container.style.width = `${newWidth * 10}px`;
            container.style.height = `${newHeight * 10}px`;
            for (let y = 0; y < newHeight; y++) {
                for (let x = 0; x < newWidth; x++) {
                    const pixelData = ctx.getImageData(x, y, 1, 1).data;
                    const pixelDiv = document.createElement('div');
                    pixelDiv.style.backgroundColor = `rgba(${pixelData[0]}, ${pixelData[1]}, ${pixelData[2]}, ${pixelData[3] / 255})`;
                    pixelDiv.classList.add('pixel');
                    container.appendChild(pixelDiv);
                }
            }
            spinner.style.display = 'none';
            container.addEventListener('mousemove', handleMouseMove);
            container.addEventListener('mouseleave', () => {
                container.childNodes.forEach((pixel) => {
                    pixel.style.transform = 'scale(1)';
                });
            });
        }, 500);
    };
});
