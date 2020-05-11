const DEFAULT_GRID_SIZE = 20;
const DEFAULT_CELL_COLOR = "#000";
const ROLLOVER_CELL_COLOR = "#FFF";
let painting = false;
let paintingStatusNode;

if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', domLoaded);
}else{
    domLoaded();
}

function domLoaded(){
    const resetBtn = document.getElementById('reset');
    resetBtn.addEventListener('click',resetHandler);

    const form = document.querySelector('form');
    form.addEventListener('submit',formSubmitHandler);

    paintingStatusNode = document.getElementById("painting-status");
    

    createGrid(DEFAULT_GRID_SIZE);
}

function resetHandler(){
    const grid = document.querySelector('.grid');
    let cells = grid.children;
    for(let i = 0; i< cells.length; i++){
        cells.item(i).style.backgroundColor = DEFAULT_CELL_COLOR;
    }

    painting = false;
    updatePaintingStatusText();
    
}

function formSubmitHandler(e){
    e.preventDefault();

    const sizeText = document.getElementById('sizeInput');
    let size = +sizeText.value;

    if(!Number.isInteger(size)){
        sizeText.value = ""+DEFAULT_GRID_SIZE;
        size = DEFAULT_GRID_SIZE;
    }
    
    createGrid(size);

}

function createGrid(size){
    painting = false;
    updatePaintingStatusText();
    const grid = document.querySelector('.grid');

    // clearing the grid first
    while (grid.hasChildNodes()) {
        grid.removeChild(grid.lastChild);
    }

    const width = grid.clientWidth/size+"px";
    const height = grid.clientHeight/size+"px";
    for(let i = 1; i <=size*size; i++){
        const div = document.createElement("div");
        div.style.width = width;
        div.style.height = height;
        div.style.backgroundColor = DEFAULT_CELL_COLOR;
        div.classList.add('gridCell');
        //div.textContent = i;
        div.addEventListener('mouseover', cellMouseOver);
        div.addEventListener('click', togglePainting);
        grid.appendChild(div);
    }
    
}

function togglePainting(){
    painting = !painting;
    updatePaintingStatusText();
}

function updatePaintingStatusText(){
    if(painting){
        paintingStatusNode.innerHTML = "ON";
    }else{
        paintingStatusNode.innerHTML = "OFF";
    }
}

function cellMouseOver(e){
    if(!painting)return;
    this.style.backgroundColor = ROLLOVER_CELL_COLOR;
}