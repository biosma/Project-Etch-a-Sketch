const DEFAULT_SIZE = 16; // Tamaño por defecto
const DEFAULT_COLOR = "#000000";
const DEFAULT_MODE = ''
let counter = 0;
let currentSize = DEFAULT_SIZE;
let currentColor = DEFAULT_COLOR;
let currentMode = DEFAULT_MODE
let grid = document.getElementById("grid");
const clearButton = document.getElementById("clearButton");
const colorPicker = document.getElementById('colorPicker');
const rainbowMode = document.getElementById('rainbowMode');
const colorMode = document.getElementById('colorMode');
const sizePicker = document.getElementById('size');
const updaterSize = document.getElementById('updaterSize')
updaterSize.innerHTML = `Size = ${currentSize}*${currentSize}`

sizePicker.onchange = (e) => {
    currentSize = e.target.value;
    updaterSize.innerHTML = `Size = ${currentSize}*${currentSize}`
    reloadGrid()
}

rainbowMode.onclick = () => {
    if(currentMode !== "rainbow" ){
        setCurrentMode('rainbow')
    }else if(currentMode == "rainbow"){
        setCurrentMode(DEFAULT_MODE)
    }
}
colorMode.onclick = () => {
    if(currentMode !== "color" ){
        setCurrentMode('color')
    }else if(currentMode == "color"){
        setCurrentMode(DEFAULT_MODE)
    }
}
colorPicker.onchange = (e) => setColor(e.target.value);

clearButton.addEventListener("click", () =>{
    clearGrid();
    setupGrid(currentSize);
} );

function setColor(newColor){
    currentColor = newColor;
}
function setCurrentMode(newMode){
    currentMode = newMode;
}
function reloadGrid(){
    clearGrid();
    setupGrid(currentSize);
}
function clearGrid(){
    grid.innerHTML = ""; // Vacia el grid de los divs ya creados
}
function cambiarColor(evento){
    if (currentMode === 'rainbow'){
        counter++;
        let redRandom = Math.floor(Math.random() * 256);
        let greenRandom = Math.floor(Math.random() * 256);
        let blueRandom = Math.floor(Math.random() * 256);
        if (counter == 10){
            evento.target.style.backgroundColor = 'rgb(0, 0, 0)';
            counter = 0;
        } else if(counter !== 10){
            evento.target.style.backgroundColor = `rgb(${redRandom}, ${greenRandom}, ${blueRandom})`;
        }
        
    }else if (currentMode === 'color') {
        evento.target.style.backgroundColor = currentColor
}} //Falta lo de que cada 10 cuadraditos uno sea negro
function setupGrid(size){
    grid.style.gridTemplateColumns = `repeat(${size},1fr)` //Creamos las columnas del ancho total dividido por la cantidad que queremos
    grid.style.gridTemplateRows = `repeat(${size},1fr)` //Creamos las filas del alto total dividido por la cantidad que queremos
    for(let i = 0; i< size*size; i++){
        let gridItem = document.createElement("div");
        gridItem.addEventListener("mouseover",cambiarColor);
        grid.appendChild(gridItem);
    }
}

reloadGrid()