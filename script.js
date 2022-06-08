const widthOfCell = 120, heightOfCell = 120, widthOfGrid = 35, heightOfGrid = 25
let mouseX = null, mouseY = null, scale = 1, cellsGrid = [], clearCellsGrid = []
document.oncontextmenu = document.body.oncontextmenu = function() {return false;}
window.addEventListener('mouseup', (event) => { mouseX = null; mouseY = null })
window.addEventListener('mousemove', (event) => {if ((mouseX !== null) && (mouseY !== null)){
        let scroleX = window.scrollX + (mouseX - event.pageX)
        let scroleY = Math.abs(window.scrollY) + (mouseY - event.pageY)
        window.scrollTo({top: scroleY, left: scroleX})}})
window.addEventListener('mousedown', (event) => {if (event.button == 2) { mouseX = event.pageX; mouseY = event.pageY }})
window.addEventListener('wheel', event => event.preventDefault(), { passive:false })
    function zoom(event){
        scale += event.deltaY * -0.0002; scale = Math.min(Math.max(.2, scale), 3);
        document.getElementById('svgSqare').scrollWidth = 2; document.getElementById('svgSqare').style.transform = `scale(${scale})`
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
        cellsGrid[i][j] = document.getElementsByClassName('cellSVG')[document.getElementsByClassName('cellSVG').length - 1]} clearCellsGrid = cellsGrid}}
        function createSVGCanvas(height, width){
    document.querySelector('body').insertAdjacentHTML('beforeend', `<svg id="svgSqare" baseProfile="full" width="${(widthOfCell - 30) * width}" height="${(heightOfCell - 1) * height + 60}"></svg>`)}
    Array.from(document.getElementsByClassName('cellSVG')).forEach(element => element.addEventListener('click', (event) => { console.log(event.target.getAttribute('coordinates')); event.target.getAttribute('fill') == 'lime' ? 
event.target.setAttribute('fill', 'white') : event.target.setAttribute('fill', 'lime')}))
    class Cells {
        spawnRiver(){
            let color = 'grey'
            let x = Math.floor((widthOfGrid-1) / 2)
            let y = Math.floor((heightOfGrid-1) / 2)
            let radius = 5
            for (let i = 0; i < radius * 2; i++){
                cellsGrid[x - i][y + radius - Math.ceil(i / 2)].style.fill = color
                cellsGrid[x + i][y - radius + Math.floor(i / 2)].style.fill = color
                cellsGrid[(x + radius * 2) - i][y + Math.floor(i / 2)].style.fill = color
                cellsGrid[(x - radius * 2 ) + i][y - Math.ceil(i / 2)].style.fill = color
            }
        }
    }
    class Capital extends Cells {
        spawn(){
            // let x = Math.max(Math.floor(Math.random() * widthOfGrid - 1), 1)
            // let y = Math.max(Math.floor(Math.random() * heightOfGrid - 1), 1)
            let x = Math.floor(Math.random() * 2) > 0  ? 3 : widthOfGrid - 4
            let y = Math.floor(Math.random() * 2) > 0  ? 3 : heightOfGrid - 4
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
    class Resourses extends Cells {
        spawnDiamonds(){
            let color = 'aqua'
            let x = Math.floor((widthOfGrid-1) / 2)
            let y = Math.floor((heightOfGrid-1) / 2)
            cellsGrid[x][y].style.fill = color
            cellsGrid[x-2][y-2].style.fill = color
            cellsGrid[x+2][y+2].style.fill = color
            cellsGrid[x+2][y-2].style.fill = color
            cellsGrid[x-2][y+2].style.fill = color
        }
        spawnGold(){
            let color = 'gold'
            let x = Math.floor((widthOfGrid-1) / 2)
            let y = Math.floor((heightOfGrid-1) / 2)
            cellsGrid[x][3].style.fill = color
            cellsGrid[x][heightOfGrid-4].style.fill = color
            cellsGrid[3][y].style.fill = color
            cellsGrid[widthOfGrid-4][y].style.fill = color
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
        Array.from(document.getElementsByClassName('gameInterface')).forEach(element => element.style.display = 'none')
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
        Array.from(document.getElementsByClassName('gameInterface')).forEach(element => element.style.display = 'grid')
        drawCells(heightOfGrid, widthOfGrid, 'white', 'grey', 8)
        capital.spawn(); capital.areaSpawn()
        diamond.spawnDiamonds(); gold.spawnGold()
        river.spawnRiver()
        setTimeout(() => {window.scrollTo({top: (capital.y * (heightOfCell) - window.innerHeight / 8), left: capital.x * (widthOfCell - 30) - window.innerWidth / 4})}, 1)
    }
    let capital = new Capital({ })
    let diamond = new Resourses({ })
    let gold = new Resourses({ }) 
    let river = new Cells({ }) 
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
document.getElementById('gameMenubtn').addEventListener('click', (event) => {Array.from(document.getElementsByClassName('gameInterface')).
forEach(element => element.style.display = 'none')
document.getElementById('gameMenu').style.display = 'grid'})
document.getElementById('closeGameMenu').addEventListener('click', () => {Array.from(document.getElementsByClassName('gameInterface')).
forEach(element => element.style.display = 'grid')
document.getElementById('gameMenu').style.display = 'none'})
document.getElementById('LeaveGameBtn').addEventListener('click', onLeaveGame)
function onLeaveGame(){
    document.getElementById('gameMenu').style.display = 'none'
    document.getElementById('svgSqare').remove()
    onMenu()
}