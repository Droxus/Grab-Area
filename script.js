const widthOfCell = 120, heightOfCell = 120, widthOfGrid = 30, heightOfGrid = 20
let mouseX = null, mouseY = null, scale = 1, cellsGrid = []
document.oncontextmenu = document.body.oncontextmenu = function() {return false;}
window.addEventListener('contextmenu', (event) => { if ((mouseX !== null) && (mouseY !== null)){
    let scroleX = window.scrollX + (mouseX - event.pageX)
    let scroleY = Math.abs(window.scrollY) + (mouseY - event.pageY)
    window.scrollTo({top: scroleY, left: scroleX, behavior: "smooth"}); mouseX = null; mouseY = null}})
window.addEventListener('mousedown', (event) => { mouseX = event.pageX; mouseY = event.pageY })
window.addEventListener('wheel', event => event.preventDefault(), { passive:false })
    function zoom(event){
        scale += event.deltaY * -0.0005; scale = Math.min(Math.max(.2, scale), 3);
        document.documentElement.scrollWidth = 1; document.documentElement.style.transform = `scale(${scale})`
    }
function isOdd(num) { return (num % 2) < 1;}
function drawCells(height, width, color, borderColor, borderWidth){
    createSVGCanvas(height, width)
for (let i = 0; i < width; i++){
    cellsGrid[i] = []
for (let j = 0; j < height; j++){
    document.getElementById('svgSqare').insertAdjacentHTML('beforeend', `
    <svg baseProfile="full" width="${widthOfCell}" height="${heightOfCell}" viewBox="0 0 ${widthOfCell} ${heightOfCell}" x="${((119 + borderWidth)  * 0.7) * i}px" y="${(isOdd(i) ? 119 * j + 60: 119 * j)}px">
        <polygon class="cellSVG" points="30,1 90,1 119,60 90,119 30,119 1,60"
        stroke="${borderColor}" fill="${color}" stroke-width="${borderWidth}px" coordinates="${i}; ${j}"></polygon>
        </svg>`)
        cellsGrid[i][j] = document.getElementsByClassName('cellSVG')[document.getElementsByClassName('cellSVG').length - 1]}}}
        function createSVGCanvas(height, width){
    document.querySelector('body').insertAdjacentHTML('beforeend', `<svg id="svgSqare" baseProfile="full" width="${(widthOfCell - 30) * width}" height="${(heightOfCell - 1) * height + 60}"></svg>`)}
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
            let color = 'rgb(91 135 255)'
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
    function menuStarsDraw(){
        document.getElementById('menu').insertAdjacentHTML('afterbegin', `<svg style="position: absolute;" baseProfile="full"  width="100%" height="100%" x="0px" y="0px" id="svgStarCanvas"></svg>`)
        for (let i = 0; i < window.innerWidth / 200; i++){
            for (let j = 0; j < window.innerHeight / 200; j++){
                document.getElementById('svgStarCanvas').insertAdjacentHTML('beforeend',`<circle cx="${Math.floor(Math.random() * 300) * (i + 1)}" cy="${Math.floor(Math.random() * 300) * (j + 1)}" r="3" fill="white"/>`)
            }
        }
    }
    function onMenu(){
        document.documentElement.style.width = '100%'
        document.documentElement.style.height = '100%'
        document.body.style.width = '100%'
        document.body.style.height = '100%'
        document.getElementById('menu').style.display = 'grid'
        document.body.style.overflow = 'hidden'
        document.documentElement.style.overflow = 'hidden'
        menuStarsDraw()
    }
    function gameStart(){
        document.body.style.overflow = 'visible'
        document.documentElement.style.overflow = 'visible'
        document.getElementById('menu').style.display = 'none'
        window.addEventListener('wheel', zoom)
        document.documentElement.style.width = '200%'
        document.documentElement.style.height = '200%'
        document.body.style.width = '200%'
        document.body.style.height = '200%'
        drawCells(heightOfGrid, widthOfGrid, 'white', 'grey', 8)
        capital.spawn(); capital.areaSpawn()
        setTimeout(() => {window.scrollTo({top: (capital.y * (heightOfCell) - window.innerHeight / 4), left: capital.x * (widthOfCell - 30) - window.innerWidth / 4})}, 1)
    }
    let capital = new Capital({ })
    onMenu()
    document.getElementById('onlineModeBtn').addEventListener('click', onOnlineModeBtn)
    document.getElementById('arenaModeBtn').addEventListener('click',  onArenaModeBtn)
    document.getElementById('singleModeBtn').addEventListener('click', onSingleModeBtn)
    function onOnlineModeBtn(){
        document.getElementById('firstMenu').style.display = 'none'
        document.getElementById('comingSoon').style.display = 'grid'
    }
    function onArenaModeBtn(){
       document.getElementById('firstMenu').style.display = 'none'
       document.getElementById('comingSoon').style.display = 'grid'
    }
    function onSingleModeBtn(){
        document.getElementById('firstMenu').style.display = 'none'
       document.getElementById('singleMenu').style.display = 'flex'
    }
    document.getElementById('comingSoon').addEventListener('click', (event) => {document.getElementById('comingSoon').style.display = 'none';
    document.getElementById('firstMenu').style.display = 'grid'})
document.getElementById('closeSingleMenu').addEventListener('click', () => {document.getElementById('singleMenu').style.display = 'none';
document.getElementById('firstMenu').style.display = 'grid'})
document.getElementById('2PMode').addEventListener('click', () => {document.getElementById('singleMenu').style.display = 'none'
document.getElementById('comingSoon').style.display = 'grid'})
document.getElementById('3PMode').addEventListener('click', () => {document.getElementById('singleMenu').style.display = 'none'
document.getElementById('comingSoon').style.display = 'grid'})
document.getElementById('4PMode').addEventListener('click', () => {document.getElementById('singleMenu').style.display = 'none'
document.getElementById('comingSoon').style.display = 'grid'})
document.getElementById('1PMode').addEventListener('click', gameStart)