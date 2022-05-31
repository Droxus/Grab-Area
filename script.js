Array.from(document.getElementsByClassName('lul')).forEach(element => element.addEventListener('click', () => console.log('lul')))
function isOdd(num) { return (num % 2) < 1;}
function drawCells(height, width, color, borderColor, borderWidth){
for (let i = 0; i < width; i++){
for (let j = 0; j < height; j++){
    document.getElementById('svgSqare').insertAdjacentHTML('beforeend', `
    <svg  baseProfile="full" width="120" height="120" viewBox="0 0 120 120" x="${(120 * 0.7) * i}" y="${isOdd(i) ? 119 * j + 60: 119 * j}">
        <polygon class="lul" points="35,1 85,1 119,60 85,119 35,119 1,60"
        stroke="${borderColor}" fill="${color}" stroke-width="${borderWidth}px"/></svg>`)
    }
}
}
drawCells(50, 50, 'transparent', 'grey', 2)