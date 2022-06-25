const widthOfCell = 120, heightOfCell = 120
const colorCell =  'white', borderColorCell = 'grey', borderWidthCell = 8
let mouseX = null, mouseY = null, scale = 1, cellsGrid = []
const img = document.querySelectorAll('img')
let heightScreen = Math.max(window.innerWidth, document.documentElement.clientWidth)
let widthScreen = Math.max(window.innerHeight, document.documentElement.clientHeight)
img.forEach(element => element.setAttribute("draggable", false));
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
function drawCells(svgCanvas){
    cellsGrid = []
    if (map.grid !== undefined){
for (let i = 0; i < map.grid.width; i++){
    cellsGrid[i] = []
for (let j = 0; j < map.grid.height; j++){
    document.getElementById(`${svgCanvas}`).insertAdjacentHTML('beforeend', `
    <svg class="svgCellCanvas" baseProfile="full" width="${widthOfCell}" height="${heightOfCell}" viewBox="0 0 ${widthOfCell} ${heightOfCell}" x="${((119 + borderWidthCell)  * 0.74) * i}px" y="${(isOdd(i) ? 119.8 * j + 60: 119.8 * j)}px">
        <polygon class="cellSVG" points="30,1 90,1 119,60 90,119 30,119 1,60"
        stroke="${borderColorCell}" fill="${colorCell}" stroke-width="${borderWidthCell}px" coordinatex="${i}" coordinatey="${j}"></polygon>
        </svg>`)
        cellsGrid[i][j] = document.getElementsByClassName('cellSVG')[document.getElementsByClassName('cellSVG').length - 1]}}
}}
function createSVGCanvas(){
    if (map.grid !== undefined){
     document.getElementById('svgCanvas').insertAdjacentHTML('beforeend', `<svg id="svgSqare" baseProfile="full" width="${(widthOfCell - 20) * map.grid.width}" height="${(heightOfCell) * map.grid.height + 60}"></svg>`)
    }
}
    
// class Cells{
//     constructor(coordinate){
//         this.x = coordinate.x;
//         this.y = coordinate.y;
//     }
//     spawn(color){
//         cellsGrid[this.x][this.y].parentElement.insertAdjacentHTML('beforeend', `<svg x="20" y="20" width="80" height="80"><image href="img/star.png" height="80" width="80"/></svg>`)   
//         cellsGrid[this.x][this.y].style.fill = color
//     }
// }
// let capital = new Cells({
//     x: Math.floor(Math.random() * 2) > 0  ? 3 : widthOfGrid - 4,
//     y: Math.floor(Math.random() * 2) > 0  ? 3 : heightOfGrid - 4,
// })
function mapGeneration(){
    if (map.empty !== undefined){
        map.empty.forEach(element => cellsGrid[element.x][element.y].style.fill = 'grey')
    }
    if (map.resourse !== undefined){
        if (map.resourse.diamonds !== undefined){
            Object.values(map.resourse.diamonds).forEach(element => cellsGrid[element.x][element.y].style.fill = 'aqua')
        }
        if (map.resourse.gold !== undefined){
            Object.values(map.resourse.gold).forEach(element => cellsGrid[element.x][element.y].style.fill = 'gold')
        }
        if (map.resourse.copper !== undefined){
            Object.values(map.resourse.copper).forEach(element => cellsGrid[element.x][element.y].style.fill = 'orange')
        }
    }
    if (map.capital !== undefined){
        let thisCapital = Object.values(map.capital)[Math.floor(Math.random() * Object.values(map.capital).length)]
        cellsGrid[thisCapital.x][thisCapital.y].parentElement.insertAdjacentHTML('beforeend', `<svg x="20" y="20" width="80" height="80" class="capitalCity"><image href="img/star.png" height="80" width="80"/></svg>`)   
        cellsGrid[thisCapital.x][thisCapital.y].style.fill = '#466bd9'
    }
}
let map = new Object({
    grid: {
        width: 35,
        height: 25,
    },
    empty: [
    {x: 5, y: 5},
    {x: 6, y: 5}
    ],
    capital: {
        0: {x: 4, y: 4},
        1: {x: 31, y: 21},
        2: {x: 4, y: 21},
        3: {x: 31, y: 4}
    },
    resourse: {
        diamonds: {
            0: {x: 8, y: 6}
        },
        gold: {
            0: {x: 12, y: 9}
        } 
    }
})
    // class Cells {
    //     spawnRiver(){
    //         let color = 'grey'
    //         let x = Math.floor((widthOfGrid-1) / 2)
    //         let y = Math.floor((heightOfGrid-1) / 2)
    //         let radius = 5
    //         for (let i = 0; i < radius * 2; i++){
    //             cellsGrid[x - i][y + radius - Math.ceil(i / 2)].style.fill = color
    //             cellsGrid[x + i][y - radius + Math.floor(i / 2)].style.fill = color
    //             cellsGrid[(x + radius * 2) - i][y + Math.floor(i / 2)].style.fill = color
    //             cellsGrid[(x - radius * 2 ) + i][y - Math.ceil(i / 2)].style.fill = color
    //         }
    //     }
    // }
    // class Capital extends Cells {
    //     spawn(){
    //         // let x = Math.max(Math.floor(Math.random() * widthOfGrid - 1), 1)
    //         // let y = Math.max(Math.floor(Math.random() * heightOfGrid - 1), 1)
    //         let x = Math.floor(Math.random() * 2) > 0  ? 3 : widthOfGrid - 4
    //         let y = Math.floor(Math.random() * 2) > 0  ? 3 : heightOfGrid - 4
    //         capital.x = x
    //         capital.y = y
    //         cellsGrid[x][y].parentElement.insertAdjacentHTML('beforeend', `<svg x="20" y="20" width="80" height="80"><image href="img/star.png" height="80" width="80"/></svg>`)   
    //         cellsGrid[x][y].style.fill = '#466bd9'
    //     }       
    //     areaSpawn(){
    //         let color = 'rgb(91 135 255)'
    //         cellsGrid[capital.x][capital.y+1].style.fill = color
    //         cellsGrid[capital.x+1][capital.y].style.fill = color
    //         cellsGrid[capital.x-1][capital.y].style.fill = color
    //         cellsGrid[capital.x][capital.y-1].style.fill = color
    //         if (isOdd(capital.x)){
    //             cellsGrid[capital.x-1][capital.y+1].style.fill = color
    //             cellsGrid[capital.x+1][capital.y+1].style.fill = color
    //         } else {
    //             cellsGrid[capital.x-1][capital.y-1].style.fill = color
    //             cellsGrid[capital.x+1][capital.y-1].style.fill = color
    //         } 
    //     } 
    // }
    // class Resourses extends Cells {
    //     spawnDiamonds(){
    //         let color = 'aqua'
    //         let x = Math.floor((widthOfGrid-1) / 2)
    //         let y = Math.floor((heightOfGrid-1) / 2)
    //         cellsGrid[x][y].style.fill = color
    //         cellsGrid[x-2][y-2].style.fill = color
    //         cellsGrid[x+2][y+2].style.fill = color
    //         cellsGrid[x+2][y-2].style.fill = color
    //         cellsGrid[x-2][y+2].style.fill = color
    //     }
    //     spawnGold(){
    //         let color = 'gold'
    //         let x = Math.floor((widthOfGrid-1) / 2)
    //         let y = Math.floor((heightOfGrid-1) / 2)
    //         cellsGrid[x][3].style.fill = color
    //         cellsGrid[x][heightOfGrid-4].style.fill = color
    //         cellsGrid[3][y].style.fill = color
    //         cellsGrid[widthOfGrid-4][y].style.fill = color
    //     }
    // }
    function menuStarsDraw(){
        document.getElementById('menu').insertAdjacentHTML('afterbegin', `<svg style="position: absolute; z-index: 1;" baseProfile="full"  width="100%" height="100%" x="0px" y="0px" id="svgStarCanvas"></svg>`)
        for (let i = 0; i < window.innerWidth / 100; i++){
            for (let j = 0; j < window.innerHeight / 100; j++){
                document.getElementById('svgStarCanvas').insertAdjacentHTML('beforeend',`<circle cx="${Math.floor(Math.random() * 200) * (i + 1)}" cy="${Math.floor(Math.random() * 200) * (j + 1)}" r="3" fill="white"/>`)
            }
        }
    }
    function onMenu(){
        document.documentElement.style.width = '100%'
        document.documentElement.style.height = '100%'
        document.body.style.width = '100%'
        document.body.style.height = '100%'
        document.documentElement.style.background = 'black'
        document.body.style.background = 'black'
        document.getElementById('menu').style.display = 'grid'
        document.body.style.overflow = 'hidden'
        document.documentElement.style.overflow = 'hidden'
        Array.from(document.getElementsByClassName('gameInterface')).forEach(element => element.style.display = 'none')
        window.removeEventListener('wheel', zoom)
        if (heightScreen < widthScreen){
            document.getElementById('miniMapLobby').style.width = map.grid.width * 95
        document.getElementById('miniMapLobby').style.height = map.grid.height * 122
        let scale = Math.min(document.getElementById('miniMapLobbyBlock').offsetHeight / (map.grid.width * 95),
         document.getElementById('miniMapLobbyBlock').offsetWidth / (map.grid.height * 122))
        document.getElementById('miniMapLobby').style.transform = `scale(${scale})`
        document.getElementById('miniMapLobby').style.marginLeft = `${(1 - ((document.getElementById('miniMapLobby').clientWidth * scale) / document.getElementById('miniMapLobbyBlock').offsetHeight)) / 0.02}%`
        document.getElementById('miniMapLobby').style.marginTop = `${(1 - ((document.getElementById('miniMapLobby').clientHeight * scale) / document.getElementById('miniMapLobbyBlock').offsetWidth )) / 0.02}%`
        } else {
            document.getElementById('miniMapLobby').style.width = map.grid.width * 95
        document.getElementById('miniMapLobby').style.height = map.grid.height * 122
        let scale = Math.min(document.getElementById('miniMapLobbyBlock').offsetWidth / (map.grid.width * 95),
        document.getElementById('miniMapLobbyBlock').offsetHeight / (map.grid.height * 122))
        document.getElementById('miniMapLobby').style.transform = `scale(${scale})`
        document.getElementById('miniMapLobby').style.marginLeft = `${(1 - ((document.getElementById('miniMapLobby').clientWidth * scale) / document.getElementById('miniMapLobbyBlock').offsetWidth)) / 0.02}%`
        document.getElementById('miniMapLobby').style.marginTop = `${(1 - ((document.getElementById('miniMapLobby').clientHeight * scale) / document.getElementById('miniMapLobbyBlock').offsetHeight)) / 0.02}%`
        }
        menuStarsDraw()
        drawCells('miniMapLobby')
        mapGeneration()
    }
    function gameStart(){
        document.body.style.overflow = 'visible'
        document.documentElement.style.overflow = 'visible'
        document.getElementById('menu').style.display = 'none'
        document.documentElement.style.width = '200%'
        document.documentElement.style.height = '200%'
        document.body.style.width = '200%'
        document.body.style.height = '200%'
        document.documentElement.style.background = 'rgb(90, 90, 90)'
        document.body.style.background = 'rgb(90, 90, 90)'
        document.documentElement.style["transform-origin"] = `none`
        document.documentElement.style.transform = `none`
        Array.from(document.getElementsByClassName('gameInterface')).forEach(element => element.style.display = 'grid')
        while (document.getElementById('miniMapLobby').firstChild){
            document.getElementById('miniMapLobby').firstChild.remove()
        }
        createSVGCanvas()
        drawCells('svgSqare')
        window.addEventListener('wheel', zoom)
        mapGeneration()
        // capital.spawn('#466bd9')
        // capital.spawn(); capital.areaSpawn()
        // diamond.spawnDiamonds(); gold.spawnGold()
        // river.spawnRiver()
        // setTimeout(() => {window.scrollTo({top: (capital.y * (heightOfCell) - window.innerHeight / 8), left: capital.x * (widthOfCell - 30) - window.innerWidth / 4})}, 1)
    }
    // let capital = new Capital({ })
    // let diamond = new Resourses({ })
    // let gold = new Resourses({ }) 
    // let river = new Cells({ }) 
    onMenu()
    // document.getElementById('onlineModeBtn').addEventListener('click', onOnlineModeBtn)
    // document.getElementById('arenaModeBtn').addEventListener('click',  onArenaModeBtn)
    // document.getElementById('singleModeBtn').addEventListener('click', onSingleModeBtn)
    // function onOnlineModeBtn(){
    //     document.getElementById('firstMenu').style.display = 'none'
    //     document.getElementById('comingSoon').style.display = 'grid'
    // }
    // function onArenaModeBtn(){
    //    document.getElementById('firstMenu').style.display = 'none'
    //    document.getElementById('comingSoon').style.display = 'grid'
    // }
    // function onSingleModeBtn(){
    //     document.getElementById('firstMenu').style.display = 'none'
    //    document.getElementById('singleMenu').style.display = 'flex'
    // }
//     document.getElementById('comingSoon').addEventListener('click', (event) => {document.getElementById('comingSoon').style.display = 'none';
//     document.getElementById('firstMenu').style.display = 'grid'})
// document.getElementById('closeSingleMenu').addEventListener('click', () => {document.getElementById('singleMenu').style.display = 'none';
// document.getElementById('firstMenu').style.display = 'grid'})
// document.getElementById('2PMode').addEventListener('click', () => {document.getElementById('singleMenu').style.display = 'none'
// document.getElementById('comingSoon').style.display = 'grid'})
// document.getElementById('3PMode').addEventListener('click', () => {document.getElementById('singleMenu').style.display = 'none'
// document.getElementById('comingSoon').style.display = 'grid'})
// document.getElementById('4PMode').addEventListener('click', () => {document.getElementById('singleMenu').style.display = 'none'
// document.getElementById('comingSoon').style.display = 'grid'})
// document.getElementById('1PMode').addEventListener('click', gameStart)
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
    while (document.getElementById('svgCanvas').firstChild){
        document.getElementById('svgCanvas').firstChild.remove()
    }
    onMenu()
}
document.getElementById('mapCreatingBtn').addEventListener('click', onMapCreating)
function onMapCreating(){
    map = {}
    gameStart()
    document.getElementById('mapCreatingInterface').style.display = 'flex'
    Array.from(document.getElementsByClassName('gameInterface')).forEach(element => element.style.display = 'none')
    window.removeEventListener('wheel', zoom)
}
Array.from(document.getElementsByClassName('creatingMapMenuInp')).forEach(element => element.addEventListener('input', onSizeCanvasChange))
function onSizeCanvasChange(){
    map.grid = {}
    map.grid.width = Math.max(Math.min(document.getElementById('widthInputChange').value, 150), 0)
    map.grid.height = Math.max(Math.min(document.getElementById('heightInputChange').value, 100), 0)
    window.removeEventListener('wheel', zoom)
    while (document.getElementById('svgCanvas').firstChild){
        document.getElementById('svgCanvas').firstChild.remove()
    }
    createSVGCanvas()
    drawCells('svgSqare')
    window.addEventListener('wheel', zoom)
}
document.getElementById('cellsDeleterBtn').addEventListener('click', onCellsDeleterBtn)
function onCellsDeleterBtn(){
    if (document.getElementById('cellsDeleterBtn').classList.contains('working')){
        Array.from(document.getElementsByClassName('creatingMapButtons')).forEach(element => element.classList.remove('working'))
        Array.from(document.getElementsByClassName('cellSVG')).forEach(element => element.removeEventListener('click', deleteAndBackCell))
    } else {
        Array.from(document.getElementsByClassName('creatingMapButtons')).forEach(element => element.classList.remove('working'))
        document.getElementById('cellsDeleterBtn').classList.add('working')
        Array.from(document.getElementsByClassName('cellSVG')).forEach(element => element.removeEventListener('click', createAndDeleteDiamonds))
        Array.from(document.getElementsByClassName('cellSVG')).forEach(element => element.removeEventListener('click', createAndDeleteGold))
        Array.from(document.getElementsByClassName('cellSVG')).forEach(element => element.removeEventListener('click', createAndDeleteCapital))
        Array.from(document.getElementsByClassName('cellSVG')).forEach(element => element.removeEventListener('click', clearCell))
        Array.from(document.getElementsByClassName('cellSVG')).forEach(element => element.addEventListener('click', deleteAndBackCell))
    }
}
function deleteAndBackCell(event){
    if (map.empty == undefined){
        map.empty = []
    }
    if (Array.from(event.target.parentElement.getElementsByClassName('capitalCity'))[0] !== undefined){
        Array.from(event.target.parentElement.getElementsByClassName('capitalCity'))[0].remove()
    }
    if (event.target.style.fill == 'transparent'){
        event.target.style.fill = 'white'
        event.target.style.stroke = 'grey'
        let index = map.empty.findIndex(element => {
            return (element.x == event.target.getAttribute('coordinatex')) && (element.y == event.target.getAttribute('coordinatey')) ;
          })
          if (index > -1){
              map.empty.splice(index, 1)
          }
    } else {
        event.target.style.fill = 'transparent'
        event.target.style.stroke = 'transparent'
        map.empty.push({x: Number(event.target.getAttribute('coordinatex')), y: Number(event.target.getAttribute('coordinatey'))})
    }
}
document.getElementById('capitalsSpawnBtn').addEventListener('click', onCapitalsCreate)
function onCapitalsCreate(){
    if (document.getElementById('capitalsSpawnBtn').classList.contains('working')){
        Array.from(document.getElementsByClassName('creatingMapButtons')).forEach(element => element.classList.remove('working'))
        Array.from(document.getElementsByClassName('cellSVG')).forEach(element => element.removeEventListener('click', createAndDeleteCapital))
    } else {
        Array.from(document.getElementsByClassName('creatingMapButtons')).forEach(element => element.classList.remove('working'))
        document.getElementById('capitalsSpawnBtn').classList.add('working')
        Array.from(document.getElementsByClassName('cellSVG')).forEach(element => element.removeEventListener('click', createAndDeleteDiamonds))
        Array.from(document.getElementsByClassName('cellSVG')).forEach(element => element.removeEventListener('click', createAndDeleteGold))
        Array.from(document.getElementsByClassName('cellSVG')).forEach(element => element.removeEventListener('click', deleteAndBackCell))
        Array.from(document.getElementsByClassName('cellSVG')).forEach(element => element.removeEventListener('click', clearCell))
        Array.from(document.getElementsByClassName('cellSVG')).forEach(element => element.addEventListener('click', createAndDeleteCapital))
    }
}
function createAndDeleteCapital(event){
    if (map.capital == undefined){
        map.capital = []
    }
    if (Array.from(event.target.parentElement.getElementsByClassName('capitalCity'))[0] == undefined){
        event.target.parentElement.insertAdjacentHTML('beforeend', `<svg x="20" y="20" width="80" height="80" class="capitalCity"><image href="img/star.png" height="80" width="80"/></svg>`)
        event.target.style.fill = 'rgb(70, 107, 217)'
        event.target.style.stroke = 'grey'
        map.capital.push({x: Number(event.target.getAttribute('coordinatex')), y: Number(event.target.getAttribute('coordinatey'))})
    } else {
        event.target.style.fill = 'white'
        Array.from(event.target.parentElement.getElementsByClassName('capitalCity'))[0].remove()
        let index = map.capital.findIndex(element => {
            return (element.x == event.target.getAttribute('coordinatex')) && (element.y == event.target.getAttribute('coordinatey')) ;
          })
          if (index > -1){
              map.capital.splice(index, 1)
          }
    }
}
document.getElementById('diamondsSpawnBtn').addEventListener('click', onDiamondsSpawnBtn)
function onDiamondsSpawnBtn(event){
    if (document.getElementById('diamondsSpawnBtn').classList.contains('working')){
        Array.from(document.getElementsByClassName('creatingMapButtons')).forEach(element => element.classList.remove('working'))
        Array.from(document.getElementsByClassName('cellSVG')).forEach(element => element.removeEventListener('click', createAndDeleteDiamonds))
    } else {
        Array.from(document.getElementsByClassName('creatingMapButtons')).forEach(element => element.classList.remove('working'))
        document.getElementById('diamondsSpawnBtn').classList.add('working')
        Array.from(document.getElementsByClassName('cellSVG')).forEach(element => element.removeEventListener('click', createAndDeleteGold))
        Array.from(document.getElementsByClassName('cellSVG')).forEach(element => element.removeEventListener('click', deleteAndBackCell))
        Array.from(document.getElementsByClassName('cellSVG')).forEach(element => element.removeEventListener('click', createAndDeleteCapital))
        Array.from(document.getElementsByClassName('cellSVG')).forEach(element => element.removeEventListener('click', clearCell))
        Array.from(document.getElementsByClassName('cellSVG')).forEach(element => element.addEventListener('click', createAndDeleteDiamonds))
    }
}
function createAndDeleteDiamonds(event){
    if (map.resourse == undefined){
        map.resourse= {}
    }
    if (Array.from(event.target.parentElement.getElementsByClassName('capitalCity'))[0] !== undefined){
        Array.from(event.target.parentElement.getElementsByClassName('capitalCity'))[0].remove()
    }
    if (map.resourse.diamonds == undefined){
        map.resourse.diamonds = []
    }
    if (event.target.style.fill == 'aqua'){
        event.target.style.fill = 'white'
        let index = map.resourse.diamonds.findIndex(element => {
            return (element.x == event.target.getAttribute('coordinatex')) && (element.y == event.target.getAttribute('coordinatey')) ;
          })
          if (index > -1){
            map.resourse.diamonds.splice(index, 1)
          }
    } else {
        event.target.style.fill = 'aqua'
        event.target.style.stroke = 'grey'
        map.resourse.diamonds.push({x: Number(event.target.getAttribute('coordinatex')), y: Number(event.target.getAttribute('coordinatey'))})
    }
}
document.getElementById('goldSpawnBtn').addEventListener('click', onGoldSpawnBtn)
function onGoldSpawnBtn(event){
    if (document.getElementById('goldSpawnBtn').classList.contains('working')){
        Array.from(document.getElementsByClassName('creatingMapButtons')).forEach(element => element.classList.remove('working'))
        Array.from(document.getElementsByClassName('cellSVG')).forEach(element => element.removeEventListener('click', createAndDeleteGold))
    } else {
        Array.from(document.getElementsByClassName('creatingMapButtons')).forEach(element => element.classList.remove('working'))
        document.getElementById('goldSpawnBtn').classList.add('working')
        Array.from(document.getElementsByClassName('cellSVG')).forEach(element => element.removeEventListener('click', deleteAndBackCell))
        Array.from(document.getElementsByClassName('cellSVG')).forEach(element => element.removeEventListener('click', createAndDeleteDiamonds))
        Array.from(document.getElementsByClassName('cellSVG')).forEach(element => element.removeEventListener('click', createAndDeleteCapital))
        Array.from(document.getElementsByClassName('cellSVG')).forEach(element => element.removeEventListener('click', clearCell))
        Array.from(document.getElementsByClassName('cellSVG')).forEach(element => element.addEventListener('click', createAndDeleteGold))
    }
}
function createAndDeleteGold(event){
    if (map.resourse == undefined){
        map.resourse= {}
    }
    if (Array.from(event.target.parentElement.getElementsByClassName('capitalCity'))[0] !== undefined){
        Array.from(event.target.parentElement.getElementsByClassName('capitalCity'))[0].remove()
    }
    if (map.resourse.gold == undefined){
        map.resourse.gold = []
    }
    if (event.target.style.fill == 'gold'){
        event.target.style.fill = 'white'
        let index = map.resourse.gold.findIndex(element => {
            return (element.x == event.target.getAttribute('coordinatex')) && (element.y == event.target.getAttribute('coordinatey')) ;
          })
          if (index > -1){
            map.resourse.gold.splice(index, 1)
          }
    } else {
        event.target.style.fill = 'gold'
        event.target.style.stroke = 'grey'
        map.resourse.gold.push({x: Number(event.target.getAttribute('coordinatex')), y: Number(event.target.getAttribute('coordinatey'))})
    }
}
document.getElementById('cellsClearBtn').addEventListener('click', onCellsClearBtn)
function onCellsClearBtn(){
    if (document.getElementById('cellsClearBtn').classList.contains('working')){
        Array.from(document.getElementsByClassName('creatingMapButtons')).forEach(element => element.classList.remove('working'))
        Array.from(document.getElementsByClassName('cellSVG')).forEach(element => element.removeEventListener('click', clearCell))
    } else {
        Array.from(document.getElementsByClassName('creatingMapButtons')).forEach(element => element.classList.remove('working'))
        document.getElementById('cellsClearBtn').classList.add('working')
        Array.from(document.getElementsByClassName('cellSVG')).forEach(element => element.removeEventListener('click', deleteAndBackCell))
        Array.from(document.getElementsByClassName('cellSVG')).forEach(element => element.removeEventListener('click', createAndDeleteDiamonds))
        Array.from(document.getElementsByClassName('cellSVG')).forEach(element => element.removeEventListener('click', createAndDeleteCapital))
        Array.from(document.getElementsByClassName('cellSVG')).forEach(element => element.removeEventListener('click', createAndDeleteGold))
        Array.from(document.getElementsByClassName('cellSVG')).forEach(element => element.addEventListener('click', clearCell))
    }
}
function clearCell(event){
    let index
    if (map.resourse !== undefined){
        if (map.resourse.gold !== undefined){
            index = map.resourse.gold.findIndex(element => {
                return (element.x == event.target.getAttribute('coordinatex')) && (element.y == event.target.getAttribute('coordinatey')) ;
              })
              if (index > -1){
                map.resourse.gold.splice(index, 1)
              }
        }
          if (map.resourse.diamonds !== undefined){
              index = map.resourse.diamonds.findIndex(element => {
                return (element.x == event.target.getAttribute('coordinatex')) && (element.y == event.target.getAttribute('coordinatey')) ;
              })
              if (index > -1){
                map.resourse.diamonds.splice(index, 1)
              }
          }
    }
    if (map.empty !== undefined){
        index = map.empty.findIndex(element => {
          return (element.x == event.target.getAttribute('coordinatex')) && (element.y == event.target.getAttribute('coordinatey')) ;
        })
  
        if (index > -1){
            map.empty.splice(index, 1)
        }
    }
    event.target.style.fill = 'white'
    event.target.style.stroke = 'grey'
    if (event.target.parentElement.getElementsByClassName('capitalCity')[0] !== undefined){
        event.target.parentElement.getElementsByClassName('capitalCity')[0].remove()
        let index = map.capital.findIndex(element => {
            return (element.x == event.target.getAttribute('coordinatex')) && (element.y == event.target.getAttribute('coordinatey')) ;
          })
          if (index > -1){
              map.capital.splice(index, 1)
          }
    }
}
document.getElementById('cellsClearAllBtn').addEventListener('click', onCellsClearAllBtn)
function onCellsClearAllBtn(){
    map = {}
    onSizeCanvasChange()
}
document.getElementById('settingLobbyIcon').addEventListener('click', onSettingLobbyIcon)
let lockedSettings = true
function onSettingLobbyIcon(){
    if (lockedSettings){
        lockedSettings = false
        setTimeout(() => {lockedSettings = true}, 500);
   if (document.getElementById('settingMenuPanel').classList.contains('settingMenuPanelOpen')){
    document.getElementById('settingMenuPanel').style.display = 'block'
    document.getElementById('settingMenuPanel').classList.add('settingMenuPanelClose')
    document.getElementById('settingMenuPanel').classList.remove('settingMenuPanelOpen')
    document.getElementById('settingMenuPanel').addEventListener('animationend', (event) => event.target.style.display = 'none')
    document.getElementById('settingMenuPanel').removeEventListener('animationend', (event) => event.target.style.display = 'block')
    document.getElementById('settingLobbyIcon').classList.remove('settingLobbyIconRotate')
    document.getElementById('settingLobbyIcon').classList.add('settingLobbyIconRotateBack')
   } else {
    document.getElementById('settingMenuPanel').style.display = 'block'
    document.getElementById('settingMenuPanel').classList.add('settingMenuPanelOpen')
    document.getElementById('settingMenuPanel').classList.remove('settingMenuPanelClose')
    document.getElementById('settingMenuPanel').removeEventListener('animationend', (event) => event.target.style.display = 'none')
    document.getElementById('settingMenuPanel').addEventListener('animationend', (event) => event.target.style.display = 'block')
    document.getElementById('settingLobbyIcon').classList.remove('settingLobbyIconRotateBack')
    document.getElementById('settingLobbyIcon').classList.add('settingLobbyIconRotate')
   }
}
}
let btnsSwitchMenu = Array.from(document.getElementsByClassName('btnsMenu'))
let gameModeSwitchPanel = document.getElementById('gameModeSwitchPanel')
let lastElement = btnsSwitchMenu[2]
let midElement = btnsSwitchMenu[1]
let firstElement = btnsSwitchMenu[0]
midElement.style.transform = 'translate(0, 50%)'
let lockedMoseSwitch = true
btnsSwitchMenu.forEach(element => element.addEventListener('click', onBtnsMenu))
function onBtnsMenu(event){
    if (lockedMoseSwitch){
        lockedMoseSwitch = false
        setTimeout(() => {lockedMoseSwitch = true}, 500);
        btnsSwitchMenu = Array.from(document.getElementsByClassName('btnsMenu'))
        firstElement = btnsSwitchMenu[0]
        midElement = btnsSwitchMenu[1]
        lastElement = btnsSwitchMenu[2]
        let pickedIndex = btnsSwitchMenu.findIndex((element) => element == event.target)
        if (pickedIndex == 0){
            firstElement.classList.add('firstElementSwitchBtn')
            midElement.classList.add('midTofirstSwitchBtn')
            firstElement.addEventListener('animationend', onFirstElementMove)
        } else if (pickedIndex == 2){
            lastElement.classList.add('midTolastSwitchBtn')
            midElement.classList.add('lastElementSwitchBtn')
            lastElement.addEventListener('animationend', onLastElementMove)
        }
    }
}
function onLastElementMove(){
    lastElement.removeEventListener('animationend', onLastElementMove)
        lastElement.classList.remove('midTolastSwitchBtn')
        midElement.classList.remove('lastElementSwitchBtn')
        midElement.remove()
        gameModeSwitchPanel.insertAdjacentElement('beforeend', midElement)
        midElement.style.transform = 'translate(0, 0)'
        lastElement.style.transform = 'translate(0, 50%)'
}
function onFirstElementMove(){
    firstElement.removeEventListener('animationend', onFirstElementMove)
    firstElement.classList.remove('firstElementSwitchBtn')
    midElement.classList.remove('midTofirstSwitchBtn')
    midElement.remove()
    gameModeSwitchPanel.insertAdjacentElement('afterbegin', midElement)
    midElement.style.transform = 'translate(0, 0)'
    firstElement.style.transform = 'translate(0, 50%)'
}
document.getElementById('playBtn').addEventListener('click', gameStart)
window.addEventListener('orientationchange', onRotationScreen)
    if(window.matchMedia("(orientation: portrait)").matches){
        document.documentElement.style["transform-origin"] = `28% 45%`
        document.documentElement.style.transform = `rotate(90deg)`
        document.documentElement.style.width = `${widthScreen}px`
        document.documentElement.style.height = `${heightScreen}px`
      } else {
        document.documentElement.style.width = `100%`
        document.documentElement.style.height = `100%`
        document.documentElement.style["transform-origin"] = `none`
        document.documentElement.style.transform = `none`
      }
function onRotationScreen(){
    if (document.getElementById('menu').style.display !== 'none'){
        heightScreen = Math.max(window.innerHeight, document.documentElement.clientHeight)
        widthScreen = Math.max(window.innerWidth, document.documentElement.clientWidth)
        if (window.matchMedia("(orientation: landscape)").matches){
            document.documentElement.style["transform-origin"] = `28% 45%`
            // document.documentElement.style.transform = `rotate(90deg)`
            document.documentElement.style.transform = `rotate(0deg)`
            document.documentElement.style.width = `${widthScreen}px`
            document.documentElement.style.height = `${heightScreen}px`
          } else {
            document.documentElement.style.width = `100%`
            document.documentElement.style.height = `100%`
            document.documentElement.style["transform-origin"] = `none`
            document.documentElement.style.transform = `none`
          }
    }
}