const widthOfCell = 120, heightOfCell = 120
document.oncontextmenu = document.body.oncontextmenu = function() {return false;}
function isOdd(num) { return (num % 2) < 1;}
function drawCells(height, width, color, borderColor, borderWidth){
    createSVGCanvas(height, width)
for (let i = 0; i < width; i++){
for (let j = 0; j < height; j++){
    document.getElementById('svgSqare').insertAdjacentHTML('beforeend', `
    <svg  baseProfile="full" width="${widthOfCell}" height="${heightOfCell}" viewBox="0 0 ${widthOfCell} ${heightOfCell}" x="${(126 * 0.7) * i - 60}px" y="${(isOdd(i) ? 119 * j + 60: 119 * j) - 60}px">
        <polygon class="cellSVG" points="30,1 90,1 119,60 90,119 30,119 1,60"
        stroke="${borderColor}" fill="${color}" stroke-width="${borderWidth}px"/></svg>`)}}}
function createSVGCanvas(height, width){
    document.querySelector('body').insertAdjacentHTML('beforeend', `
    <div class="parent">
  <div class="child">
    <svg id="svgSqare" baseProfile="full" width="${widthOfCell * (width - 40)}" height="${heightOfCell * height - 110}"></svg>
  </div>
</div>`)}
    drawCells(50, 150, 'transparent', 'grey', 8)
Array.from(document.getElementsByClassName('cellSVG')).forEach(element => element.addEventListener('click', (event) => {event.target.getAttribute('fill') == 'lime' ? 
event.target.setAttribute('fill', 'transparent') : event.target.setAttribute('fill', 'lime')}))
let mouseX = null, mouseY = null
window.addEventListener('contextmenu', (event) => { if ((mouseX !== null) && (mouseY !== null)){
    let scroleX = window.scrollX + (mouseX - event.pageX)
    let scroleY = window.scrollY + (mouseY - event.pageY)
    window.scrollTo({top: scroleY, left: scroleX, behavior: "smooth"}); mouseX = null; mouseY = null}})
window.addEventListener('mousedown', (event) => { mouseX = event.pageX; mouseY = event.pageY })