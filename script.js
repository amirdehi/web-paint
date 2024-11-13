//use for coordinates
let lastXPoint = 0;
let lastYPoint = 0;
let newXPoint = 0;
let newYPoint = 0;
let xPoints = [];
let yPoints = [];

//use for drawing
let selectedTool;
let selectedColor;
let selectedColorName;
let isDrawing = false;

function startDraw(event) {
    selectedTool = document.getElementsByClassName("selected-tool")[0];
    selectedColor = document.getElementsByClassName("selected-color")[0];
    selectedColorName = selectedColor.id.trim().toLowerCase().replace('-btn', '');

    newXPoint = event.clientX;
    newYPoint = event.clientY;

    switch (selectedTool.value.trim().toLowerCase()) {
        case 'line':
            drawLine();
            break;
        case 'rectangle':
            drawRect();
            break;
        case 'circle':
            drawCircle();
            break;
        case 'polygon':
            polyPath();
            break;
        case 'polyline':
            polyPath();
            break;
    }
}

function previewDraw(event) {

}

function endDraw(event) {

}

function drawLine() {
    if (isDrawing) {
        const board = document.getElementById('board');
        let line = document.createElementNS('http://www.w3.org/2000/svg', 'line');

        line.setAttribute('x1', lastXPoint);
        line.setAttribute('y1', lastYPoint);
        line.setAttribute('x2', newXPoint);
        line.setAttribute('y2', newYPoint);

        line.style.stroke = selectedColorName;
        line.style.strokeWidth = '2px';

        board.appendChild(line);
        isDrawing = false;
    } else {
        isDrawing = true;
        lastXPoint = newXPoint;
        lastYPoint = newYPoint;
    }
}

function drawRect() {
    if (isDrawing) {
        const board = document.getElementById('board');
        let rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');

        let width = newXPoint - lastXPoint;
        let height = newYPoint - lastYPoint;

        rect.setAttribute('x', width > 0 ? lastXPoint : newXPoint);
        rect.setAttribute('y', height > 0 ? lastYPoint : newYPoint);
        rect.setAttribute('width', Math.abs(width));
        rect.setAttribute('height', Math.abs(height));
        rect.setAttribute('fill', selectedColorName);

        board.appendChild(rect);
        isDrawing = false;
    } else {
        isDrawing = true;
        lastXPoint = newXPoint;
        lastYPoint = newYPoint;
    }
}

function drawCircle() {
    if (isDrawing) {
        const board = document.getElementById('board');
        let circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');

        let halfX = (newXPoint - lastXPoint) / 2;
        let halfY = (newYPoint - lastYPoint) / 2;
        let circleX = lastXPoint + halfX;
        let circleY = lastYPoint + halfY;
        let circleR = Math.sqrt(Math.pow(halfX, 2) + Math.pow(halfY, 2));

        circle.setAttribute('cx', circleX);
        circle.setAttribute('cy', circleY);
        circle.setAttribute('r', circleR);
        circle.setAttribute('fill', selectedColorName);

        board.appendChild(circle);
        isDrawing = false;
    } else {
        isDrawing = true;
        lastXPoint = newXPoint;
        lastYPoint = newYPoint;
    }
}

function drawPoint() {
    const board = document.getElementById('board');
    let circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');

    circle.setAttribute('cx', newXPoint);
    circle.setAttribute('cy', newYPoint);
    circle.setAttribute('r', '2px');
    circle.setAttribute('fill', selectedColorName);
    circle.setAttribute('class','point');

    board.appendChild(circle);
}

function polyPath() {
    drawPoint();
    document.getElementById('actions').style.display='flex';

    let xSize = xPoints.length;
    let ySize = yPoints.length;
    xPoints[xSize] = newXPoint;
    yPoints[ySize] = newYPoint;
}

function extractPointStringFromArrays(){
    let pointString='';
    for (let i=0;i<xPoints.length;i++){
        pointString += xPoints[i]+','+yPoints[i]+' ';
    }
    return pointString.trim();
}

function drawPolygon(){
    const board = document.getElementById('board');
    let polygon = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');

    polygon.setAttribute('points', extractPointStringFromArrays());
    polygon.style.fill= selectedColorName;

    board.appendChild(polygon);
    cancelDraw();
}

function drawPolyline(){
    const board = document.getElementById('board');
    let polyline = document.createElementNS('http://www.w3.org/2000/svg', 'polyline');

    polyline.setAttribute('points', extractPointStringFromArrays());
    polyline.style.fill= 'none';
    polyline.style.stroke=selectedColorName;
    polyline.style.strokeWidth='2px';

    board.appendChild(polyline);
    cancelDraw();
}

function cancelDraw() {
    const pointElements=document.getElementsByClassName('point');
    while (pointElements.length>0){
        pointElements[0].remove();
    }

    xPoints=[];
    yPoints=[];

    document.getElementById('actions').style.display='none';
}

function confirmDraw() {
    switch (selectedTool.value.trim().toLowerCase()) {
        case 'polygon':
            drawPolygon();
            break;
        case 'polyline':
            drawPolyline();
            break;
    }

    document.getElementById('actions').style.display='none';
}

function selectColor(colorElement) {
    const lastSelectedColor = document.getElementsByClassName("selected-color")[0];
    const newSelectedColor = colorElement;

    lastSelectedColor.classList.remove("selected-color");
    newSelectedColor.classList.add("selected-color");
}

function selectTool(toolElement) {
    const lastSelectedTool = document.getElementsByClassName("selected-tool")[0];
    const newSelectedTool = toolElement;

    lastSelectedTool.classList.remove("selected-tool");
    newSelectedTool.classList.add("selected-tool");
}