const widthOfCell = 120, heightOfCell = 120, widthOfGrid = 30, heightOfGrid = 20
let mouseX = null, mouseY = null, scale = 1, cellsGrid = []
document.oncontextmenu = document.body.oncontextmenu = function() {return false;}
window.addEventListener('contextmenu', (event) => { if ((mouseX !== null) && (mouseY !== null)){
    let scroleX = window.scrollX + (mouseX - event.pageX)
    let scroleY = Math.abs(window.scrollY) + (mouseY - event.pageY)
    window.scrollTo({top: scroleY, left: scroleX, behavior: "smooth"}); mouseX = null; mouseY = null}})
window.addEventListener('mousedown', (event) => { mouseX = event.pageX; mouseY = event.pageY })
window.addEventListener('wheel', event => event.preventDefault(), { passive:false })
window.addEventListener('wheel', (event) => {scale += event.deltaY * -0.0005; scale = Math.min(Math.max(.2, scale), 3);
    document.documentElement.scrollWidth = 1; document.documentElement.style.transform = `scale(${scale})`})
function isOdd(num) { return (num % 2) < 1;}
function drawCells(height, width, color, borderColor, borderWidth){
    createSVGCanvas(height, width)
for (let i = 0; i < width; i++){
    cellsGrid[i] = []
for (let j = 0; j < height; j++){
    document.getElementById('svgSqare').insertAdjacentHTML('beforeend', `
    <svg  baseProfile="full" width="${widthOfCell}" height="${heightOfCell}" viewBox="0 0 ${widthOfCell} ${heightOfCell}" x="${((119 + borderWidth)  * 0.7) * i}px" y="${(isOdd(i) ? 119 * j + 60: 119 * j)}px">
        <polygon class="cellSVG" points="30,1 90,1 119,60 90,119 30,119 1,60"
        stroke="${borderColor}" fill="${color}" stroke-width="${borderWidth}px" coordinates="${i}; ${j}"></polygon>
        </svg>`)
        cellsGrid[i][j] = document.getElementsByClassName('cellSVG')[document.getElementsByClassName('cellSVG').length - 1]}}}
        function createSVGCanvas(height, width){
    document.querySelector('body').insertAdjacentHTML('beforeend', `<svg id="svgSqare" baseProfile="full" width="${(widthOfCell - 30) * width}" height="${(heightOfCell - 1) * height + 60}"></svg>`)}
    drawCells(heightOfGrid, widthOfGrid, 'white', 'grey', 8)
    Array.from(document.getElementsByClassName('cellSVG')).forEach(element => element.addEventListener('click', (event) => { console.log(event.target.getAttribute('coordinates')); event.target.getAttribute('fill') == 'lime' ? 
event.target.setAttribute('fill', 'white') : event.target.setAttribute('fill', 'lime')}))
    class Cells {

    }
    class Capital extends Cells {
        spawn(){
            let x = Math.max(Math.floor(Math.random() * widthOfGrid - 1), 1)
            let y = Math.max(Math.floor(Math.random() * heightOfGrid - 1), 1)
            capital.x = x
            capital.y = y
            cellsGrid[x][y].parentElement.insertAdjacentHTML('beforeend', `<svg x="20" y="20" width="80" height="80"><image href="img/star.png" height="80" width="80"/></svg>`)   
            cellsGrid[x][y].style.fill = '#466bd9'
        }       
        areaSpawn(){
            let color = '#466bd9'
            cellsGrid[capital.x][capital.y+1].style.fill = color
            cellsGrid[capital.x+1][capital.y].style.fill = color
            cellsGrid[capital.x-1][capital.y].style.fill = color
            cellsGrid[capital.x][capital.y-1].style.fill = color
            if (isOdd(capital.x)){
                cellsGrid[capital.x-1][capital.y+1].style.fill = color
                cellsGrid[capital.x+1][capital.y+1].style.fill = color
            } else {
                cellsGrid[capital.x-1][capital.y-1].style.fill = color
                cellsGrid[capital.x+1][capital.y-1].style.fill = color
            } 
        }
    }
    let capital = new Capital({ })
    capital.spawn(); capital.areaSpawn()
    window.onload = () => {setTimeout(() => {window.scrollTo({top: (capital.y * (heightOfCell) - window.innerHeight / 4), left: capital.x * (widthOfCell - 30) - window.innerWidth / 4})}, 1)}

    