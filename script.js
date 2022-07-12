let kSizeOfCells = 1
let widthOfCell = 120 * kSizeOfCells, heightOfCell = 120 * kSizeOfCells, borderWidthCell = 8 * kSizeOfCells
const colorCell =  'transparent', borderColorCell = 'black'
let mouseX = null, mouseY = null, scale = 1, cellsGrid = [], maps = []
let cellSpawn
let alpha = 1
let primaryMaps = [], favoritesMaps = [], communityMaps = []
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
    function zoom(event){
        scale += event.deltaY * -0.0002; scale = Math.min(Math.max(.2, scale), 1.5);
        document.getElementById('svgSqare').scrollWidth = 2; document.getElementById('svgSqare').style.transform = `scale(${scale})`
    }
function isOdd(num) { return (num % 2) < 1;}
function drawCells(svgCanvas){
    cellsGrid = []
    if (map.grid !== undefined && map.grid.width > 1 && map.grid.height > 1){
kSizeOfCells = 1
  svgCanvas.insertAdjacentHTML('beforeend', `<defs>
  <pattern id="firstRect" viewBox="0,0,${widthOfCell},${heightOfCell+2}" width="${1.95 / (map.grid.width)}" height="${1 / map.grid.height}">
    <polygon stroke="${borderColorCell}" fill="${colorCell}" stroke-width="${borderWidthCell}px" viewBox="0,0,${widthOfCell},${heightOfCell+2}" width="${widthOfCell}" height="${heightOfCell+2}"
     points="30,1 90,1 119,60 90,119 30,119 1,60"/>
  </pattern>
  <pattern id="secondRect" viewBox="0,0,${widthOfCell},${heightOfCell+2}" width="${1.95 / (map.grid.width)}" height="${1 / map.grid.height}">
    <polygon stroke="${borderColorCell}" fill="${colorCell}" stroke-width="${borderWidthCell}px" viewBox="0,0,${widthOfCell},${heightOfCell+2}" width="${widthOfCell}" height="${heightOfCell+2}"
     points="30,1 90,1 119,60 90,119 30,119 1,60"/>
  </pattern>
</defs>
<rect fill="url(#firstRect)" x="-30" y="0" width="100%" height="100%" style="width:calc(100% + 30px);"/>
<rect fill="url(#secondRect)" x="${widthOfCell / 1.3 - 30}" y="${heightOfCell / 2}" width="100%" height="100%" style="width:calc(100% + 30px);"/>`)
}}
function drawMiniMapCells(svgCanvas){
  svgCanvas.insertAdjacentHTML('beforeend', `<defs>
  <pattern id="firstRect" viewBox="0,0,${widthOfCell},${(heightOfCell)}" width="${1.95 / (map.grid.width)}" height="${1 / map.grid.height}">
    <polygon stroke="${borderColorCell}" fill="${colorCell}" stroke-width="${borderWidthCell}px" viewBox="0,0,${widthOfCell},${heightOfCell+2}" width="${widthOfCell}" height="${heightOfCell+2}"
     points="${30 * kSizeOfCells},${1 * kSizeOfCells} ${90 * kSizeOfCells},${1 * kSizeOfCells} ${120 * kSizeOfCells},${60 * kSizeOfCells} ${90 * kSizeOfCells},${120 * kSizeOfCells} ${30 * kSizeOfCells},${120 * kSizeOfCells} ${1 * kSizeOfCells},${60 * kSizeOfCells}"/>
  </pattern>
  <pattern id="secondRect" viewBox="0,0,${widthOfCell},${(heightOfCell)}" width="${1.95 / (map.grid.width)}" height="${1 / map.grid.height}">
    <polygon stroke="${borderColorCell}" fill="${colorCell}" stroke-width="${borderWidthCell}px" viewBox="0,0,${widthOfCell},${heightOfCell+2}" width="${widthOfCell}" height="${heightOfCell+2}"
     points="${30 * kSizeOfCells},${1 * kSizeOfCells} ${90 * kSizeOfCells},${1 * kSizeOfCells} ${120 * kSizeOfCells},${60 * kSizeOfCells} ${90 * kSizeOfCells},${120 * kSizeOfCells} ${30 * kSizeOfCells},${120 * kSizeOfCells} ${1 * kSizeOfCells},${60 * kSizeOfCells}"/>
  </pattern>
</defs>
<rect fill="url(#firstRect)" x="0" y="0" width="100%" height="100%"/>
<rect fill="url(#secondRect)" x="${(widthOfCell / 1.37)}" y="${heightOfCell / 2}" width="100%" height="100%"/>`)
}
function createSVGCanvas(){
    if (map.grid !== undefined){
    document.getElementById('svgCanvas').insertAdjacentHTML('beforeend', `<svg id="svgSqare" baseProfile="full" width="${ map.grid.width / 1.27 * widthOfCell - 30}" height="${map.grid.height * heightOfCell}"></svg>`)
    document.getElementById('svgSqare').addEventListener('click', onSvgSqare)
    }
}
function onSvgSqare(event){
    // console.log('X:', event.pageX / scale - ((document.getElementById('svgSqare').clientWidth) / scale - screen.width / 2))
    // console.log('scale:' + scale)
    // console.log('X:', event.offsetX)
    // console.log('Y:', event.offsetY)
    getCellCordByMouseClick(event.offsetX, event.offsetY)
}
function getCellCordByMouseClick(xMouse, yMouse){
    let x2, y2
    let results = [] 
    x2 = Math.floor(xMouse / (document.getElementById('svgSqare').clientWidth / map.grid.width))
    if (isOdd(x2)){
        y2 = Math.floor(yMouse / (document.getElementById('svgSqare').clientHeight / map.grid.height))
    } else {
        y2 = Math.floor((yMouse + 60) / (document.getElementById('svgSqare').clientHeight / map.grid.height)) - 1
        if (y2 < 0){
            y2++
        }
    }
    results.push(Math.sqrt(Math.pow((xMouse - ((x2 + 1) * 90 - 30)), 2) + Math.pow((yMouse - (isOdd(x2) ? (y2 + 1) * 120 - 60 : (y2 + 1) * 120)), 2)))
    results.push(Math.sqrt(Math.pow((xMouse - ((x2) * 90 - 30)), 2) + Math.pow((yMouse - (isOdd(x2) ? (y2 + 1) * 120 - 60 : (y2 + 1) * 120)), 2)))
    results.push(Math.sqrt(Math.pow((xMouse - ((x2 + 2) * 90 - 30)), 2) + Math.pow((yMouse - (isOdd(x2) ? (y2 + 1) * 120 - 60 : (y2 + 1) * 120)), 2)))
    results.push(Math.sqrt(Math.pow((xMouse - ((x2 + 1) * 90 - 30)), 2) + Math.pow((yMouse - (isOdd(x2) ? (y2) * 120 - 60 : (y2) * 120)), 2)))
    results.push(Math.sqrt(Math.pow((xMouse - ((x2 + 1) * 90 - 30)), 2) + Math.pow((yMouse - (isOdd(x2) ? (y2 + 2) * 120 - 60 : (y2 + 2) * 120)), 2)))
    results.push(Math.sqrt(Math.pow((xMouse - ((x2 + 2) * 90 - 30)), 2) + Math.pow((yMouse - (isOdd(x2) ? (y2 + 2) * 120 - 60 : (y2 + 2) * 120)), 2)))
    results.push(Math.sqrt(Math.pow((xMouse - ((x2) * 90 - 30)), 2) + Math.pow((yMouse - (isOdd(x2) ? (y2) * 120 - 60 : (y2) * 120)), 2)))
    // console.log(Math.min.apply(Math, results))
    // console.log(results.findIndex(element => element == Math.min.apply(Math, results)))
    switch (results.findIndex(element => element == Math.min.apply(Math, results))) {
        case 1:
                console.log(x2 - 1, y2)
            break;
            case 2:
                console.log(x2 + 1, y2)
            break;
            case 3:
                console.log(x2, y2 - 1)
            break;
            case 4:
                console.log(x2, y2 + 1)
            break;
            case 5:
                console.log(x2 + 1, y2 + 1)
            break;
            case 6:
                console.log(x2 - 1, y2 - 1)
            break;
        default:
        console.log(x2, y2)
            break;
    }
    // console.log((x2 + 1) * 90 - 30)
    // console.log(isOdd(x2) ? (y2 + 1) * 120 - 60 : (y2 + 1) * 120)
    // console.log('X2:', x2)
    // console.log('Y2:', y2)
}
function mapGeneration(){
    // if (map.empty !== undefined){
    //     map.empty.forEach(element => cellsGrid[element.x][element.y].style.fill = 'grey')
    // }
    // if (map.resourse !== undefined){
    //     if (map.resourse.diamonds !== undefined){
    //         Object.values(map.resourse.diamonds).forEach(element => cellsGrid[element.x][element.y].style.fill = 'aqua')
    //     }
    //     if (map.resourse.gold !== undefined){
    //         Object.values(map.resourse.gold).forEach(element => cellsGrid[element.x][element.y].style.fill = 'gold')
    //     }
    //     if (map.resourse.copper !== undefined){
    //         Object.values(map.resourse.copper).forEach(element => cellsGrid[element.x][element.y].style.fill = 'orange')
    //     }
    // }
    // if (map.capital !== undefined){
    //     let thisCapital = Object.values(map.capital)[Math.floor(Math.random() * Object.values(map.capital).length)]
    //     cellsGrid[thisCapital.x][thisCapital.y].parentElement.insertAdjacentHTML('beforeend', `<svg x="${20 * kSizeOfCells}" y="${20 * kSizeOfCells}" width="${80 * kSizeOfCells}" height="${80 * kSizeOfCells}" class="capitalCity"><image href="img/star.png" height="${80 * kSizeOfCells}" width="${80 * kSizeOfCells}"/></svg>`)   
    //     cellsGrid[thisCapital.x][thisCapital.y].style.fill = '#466bd9'
    // }
}
let map = new Object({
    grid: {
        width: 41,
        height: 19,
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
    function menuStarsDraw(){
        if (document.getElementById('svgStarCanvas').getElementsByTagName('circle')[0] == undefined){
            for (let i = 0; i < window.innerWidth / 100; i++){
                for (let j = 0; j < window.innerHeight / 100; j++){
                    document.getElementById('svgStarCanvas').insertAdjacentHTML('beforeend',`<circle cx="${Math.floor(Math.random() * 200) * (i + 1)}" cy="${Math.floor(Math.random() * 200) * (j + 1)}" r="3" fill="white"/>`)
                }
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
        // window.removeEventListener('wheel', event => event.preventDefault(), { passive:true })
        document.getElementById('svgStarCanvas').style.display = 'block'
        menuStarsDraw()
        miniMapLoad(document.getElementById('miniMapLobbyBlock'), document.getElementById('miniMapLobby'))
        drawMiniMapCells(document.getElementById('miniMapLobby'))
        mapGeneration()
        document.getElementById('mapsPickBlock').addEventListener('wheel', onScrollMapsPickBlock);
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
        document.getElementById('svgStarCanvas').style.display = 'none'
        document.getElementById('mapsPickBlock').removeEventListener('wheel', onScrollMapsPickBlock)
        Array.from(document.getElementsByClassName('gameInterface')).forEach(element => element.style.display = 'grid')
        while (document.getElementById('miniMapLobby').firstChild){
            document.getElementById('miniMapLobby').firstChild.remove()
        }
        kSizeOfCells = 1
        widthOfCell = 120 * kSizeOfCells, heightOfCell = 120 * kSizeOfCells, borderWidthCell = 8 * kSizeOfCells
        createSVGCanvas()
        drawCells(document.getElementById('svgSqare'))
        window.addEventListener('wheel', event => event.preventDefault(), { passive:false })
        window.addEventListener('wheel', zoom)
        mapGeneration()
    }
    onMenu()
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
    kSizeOfCells = 1
    widthOfCell = 120 * kSizeOfCells, heightOfCell = 120 * kSizeOfCells, borderWidthCell = 8 * kSizeOfCells
    createSVGCanvas()
    drawCells(document.getElementById('svgSqare'))
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
        heightScreen = Math.min(document.documentElement.clientWidth, document.documentElement.clientHeight)
        widthScreen = Math.max(document.documentElement.clientWidth, document.documentElement.clientHeight)
        console.log(document.documentElement.clientWidth, document.documentElement.clientHeight)
        if (window.matchMedia("(orientation: landscape)").matches){
            document.documentElement.style["transform-origin"] = `28% 45%`
            document.documentElement.style.transform = `rotate(90deg)`
            // document.documentElement.style.transform = `rotate(0deg)`
            // document.documentElement.style.width = `${widthScreen}px`
            // document.documentElement.style.height = `${heightScreen}px`
            document.getElementById('mapsMenu').style.width = `100vh`
            document.getElementById('mapsMenu').style.height = `100vw`
                 document.documentElement.style.width = `100vh`
            document.documentElement.style.height = `100vw`
          } else {
            // document.documentElement.style.transform = `rotate(90deg)`
            document.documentElement.style.width = `100vw`
            document.documentElement.style.height = `100vh`
            document.getElementById('mapsMenu').style.width = `100vw`
            document.getElementById('mapsMenu').style.height = `100vh`
            document.documentElement.style["transform-origin"] = `none`
            document.documentElement.style.transform = `none`
          }
          miniMapLoad(document.getElementById('miniMapLobbyBlock'), document.getElementById('miniMapLobby'))
    }
}

function miniMapLoad(parentBlock, svgBlock){
    kSizeOfCells = Math.min(parentBlock.offsetWidth / (map.grid.width) / 95, parentBlock.offsetHeight / map.grid.height / 120)
    widthOfCell = 120 * kSizeOfCells, heightOfCell = 120 * kSizeOfCells, borderWidthCell = 8 * kSizeOfCells
        svgBlock.style.width = map.grid.width * (widthOfCell) / 1.3
        svgBlock.style.height = map.grid.height * (heightOfCell)
}
document.getElementById('miniMapLobbyBlock').addEventListener('click', openMapsMenu)
  function openMapsMenu(){
    document.getElementById('menuPanel').style.display = 'none'
    document.getElementById('mapsMenu').style.display = 'grid'
    setTimeout(mapsPickBlockSpawn, 0)
    while (document.getElementById('miniMapLobby').firstElementChild){
        document.getElementById('miniMapLobby').firstElementChild.remove()
    }
    // document.getElementById('mapsPickBlock').addEventListener("scroll", mapsOnPickLoad);
    window.addEventListener("orientationChange", mapsOnPickLoad);
}
document.getElementById('homeMenuMapsBtn').addEventListener('click', onHomeMenuMapsBtn)
function onHomeMenuMapsBtn(){
    document.getElementById('menuPanel').style.display = 'grid'
    document.getElementById('mapsMenu').style.display = 'none'
    miniMapLoad(document.getElementById('miniMapLobbyBlock'), document.getElementById('miniMapLobby'))
    drawMiniMapCells(document.getElementById('miniMapLobby'))
    // document.getElementById('mapsPickBlock').removeEventListener("scroll", mapsOnPickLoad);
    window.removeEventListener("orientationChange", mapsOnPickLoad);
}
for (let i = 0; i < 7; i++){
    primaryMaps[i] = map
}
for (let i = 0; i < 15; i++){
    favoritesMaps[i] = map
}
for (let i = 0; i < 50; i++){
    communityMaps[i] = map
}
 function mapsPickBlockSpawn(){
    if (document.getElementsByClassName('mapBlock').length < 1){
    for (let i = 0; i < primaryMaps.length; i++){
    document.getElementById('primaryMapsPick').insertAdjacentHTML('beforeend', `<div class="mapBlock"><div class="svgMapBlock"><svg class="miniMapSvgPickBlock"></svg></div><label class="mapNameLbl">Map Name</label></div>`)
    miniMapLoad(document.getElementById('primaryMapsPick').getElementsByClassName('svgMapBlock')[i], document.getElementById('primaryMapsPick').getElementsByClassName('miniMapSvgPickBlock')[i])
    drawMiniMapCells(document.getElementById('primaryMapsPick').getElementsByClassName('miniMapSvgPickBlock')[i])
    }
    for (let i = 0; i < favoritesMaps.length; i++){
    document.getElementById('favoritesMapsPick').insertAdjacentHTML('beforeend', `<div class="mapBlock"><div class="svgMapBlock"><svg class="miniMapSvgPickBlock"></svg></div><label class="mapNameLbl">Map Name</label></div>`)
    miniMapLoad( document.getElementById('favoritesMapsPick').getElementsByClassName('svgMapBlock')[i],  document.getElementById('favoritesMapsPick').getElementsByClassName('miniMapSvgPickBlock')[i])
    drawMiniMapCells( document.getElementById('favoritesMapsPick').getElementsByClassName('miniMapSvgPickBlock')[i])
    }
    for (let i = 0; i < communityMaps.length; i++){
    document.getElementById('communityMapsPick').insertAdjacentHTML('beforeend', `<div class="mapBlock"><div class="svgMapBlock"><svg class="miniMapSvgPickBlock"></svg></div><label class="mapNameLbl">Map Name</label></div>`)
    miniMapLoad(document.getElementById('communityMapsPick').getElementsByClassName('svgMapBlock')[i], document.getElementById('communityMapsPick').getElementsByClassName('miniMapSvgPickBlock')[i])
    drawMiniMapCells(document.getElementById('communityMapsPick').getElementsByClassName('miniMapSvgPickBlock')[i])
}
}
}
function onScrollMapsPickBlock(event){
    document.getElementById('mapsPickBlock').scrollLeft += event.deltaY * 1;
    if (document.getElementById('mapsPickBlock').scrollLeft > document.getElementById('communityMapsPick').offsetLeft){
        Array.from(document.getElementsByClassName('lblsFooterMapsMenu')).forEach(element => element.style.color = 'white')
        Array.from(document.getElementsByClassName('lblsFooterMapsMenu'))[2].style.color = 'wheat'
    } else if (document.getElementById('mapsPickBlock').scrollLeft > document.getElementById('favoritesMapsPick').offsetLeft){
        Array.from(document.getElementsByClassName('lblsFooterMapsMenu')).forEach(element => element.style.color = 'white')
        Array.from(document.getElementsByClassName('lblsFooterMapsMenu'))[1].style.color = 'wheat'
    } else {
        Array.from(document.getElementsByClassName('lblsFooterMapsMenu')).forEach(element => element.style.color = 'white')
        Array.from(document.getElementsByClassName('lblsFooterMapsMenu'))[0].style.color = 'wheat'
    }
}
 function mapsOnPickLoad(){
    for (let i = 0; i < Array.from(document.getElementsByClassName('mapBlock')).length; i++){
        if ((Array.from(document.getElementsByClassName('mapBlock'))[i].offsetLeft - 2 * Array.from(document.getElementsByClassName('mapBlock'))[i].clientWidth) < 
        (document.getElementById('mapsPickBlock').offsetWidth + document.getElementById('mapsPickBlock').scrollLeft) && 
        (document.getElementById('mapsPickBlock').scrollLeft) < (Array.from(document.getElementsByClassName('mapBlock'))[i].offsetLeft)
         && (Array.from(document.getElementsByClassName('mapBlock'))[i].getElementsByClassName('svgCellCanvas').length < 1)) {
            //lazy load if necessary
        }

    }
}
Array.from(document.getElementsByClassName('lblsFooterMapsMenu')).forEach(element => element.addEventListener('click', onLblsFooterMapsMenu))
function onLblsFooterMapsMenu(event){
    Array.from(document.getElementsByClassName('lblsFooterMapsMenu')).forEach(element => element.style.color = 'white')
    event.target.style.color = 'wheat'
    switch (event.target.innerText) {
        case 'Community':
            document.getElementById('mapsPickBlock').scrollTo({
                top: 0,
                left: document.getElementById('communityMapsPick').offsetLeft,
                behavior: "smooth"
            })
            break;
        case 'Favorites':
            document.getElementById('mapsPickBlock').scrollTo({
                top: 0,
                left: document.getElementById('favoritesMapsPick').offsetLeft,
                behavior: "smooth"
            })
            break;
        default:
            document.getElementById('mapsPickBlock').scrollTo({
                top: 0,
                left: document.getElementById('primaryMapsPick').offsetLeft,
                behavior: "smooth"
            })
            break;
    }
}