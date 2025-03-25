// Get mass from URL parameter if present
const urlParams = new URLSearchParams(window.location.search);
const initialMassParam = urlParams.get('mass');

let initialMass = initialMassParam ? parseInt(initialMassParam) : 2000000;
let remainingMass = initialMass;
let totalRolledMass = 0;
let stage = 1;
let ships = [];
let lastPassMassAtStage = 0;
let stageActive = false;

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('whMass').value = initialMass;
    updateStatus();
    addShip();
    initPercentageMarkers();
});

function addShip() {
    let shipId = ships.length;
    let container = document.getElementById('ships');
    let div = document.createElement('div');
    div.className = 'ship-container';
    div.innerHTML = `
    <button class="remove-ship" onclick="removeShip(${shipId})">-</button>
    <input type="text" id="name${shipId}" value="Ship ${shipId + 1}" style="width: 120px;">
    <span>Light:</span>
    <input type="number" id="light${shipId}" value="200000" style="width: 100px;">
    <span>Heavy:</span>
    <input type="number" id="heavy${shipId}" value="300000" style="width: 100px;">
    <button onclick="roll(${shipId}, 'light')">Light</button>
    <button onclick="roll(${shipId}, 'heavy')">Heavy</button>
    <button id="toggleArrow${shipId}" onclick="toggleArrow(${shipId})">Out</button>
  `;
    container.appendChild(div);
    ships.push({ arrow: 'Out', lastRoll: 'Out' });
}

function removeShip(shipId) {
    const shipElements = document.querySelectorAll('.ship-container');
    if (shipId < shipElements.length) {
        shipElements[shipId].remove();
    }
    ships.splice(shipId, 1);
    reindexShips();
}

function reindexShips() {
    const shipContainers = document.querySelectorAll('.ship-container');
    shipContainers.forEach((container, index) => {
        const inputs = container.querySelectorAll('input');
        const buttons = container.querySelectorAll('button:not(.remove-ship)');

        inputs[0].id = `name${index}`;
        inputs[1].id = `light${index}`;
        buttons[0].setAttribute('onclick', `roll(${index}, 'light')`);
        inputs[2].id = `heavy${index}`;
        buttons[1].setAttribute('onclick', `roll(${index}, 'heavy')`);
        buttons[2].id = `toggleArrow${index}`;
        buttons[2].setAttribute('onclick', `toggleArrow(${index})`);
        container.querySelector('.remove-ship').setAttribute('onclick', `removeShip(${index})`);
    });
}

function softReset() {
    initialMass = parseInt(document.getElementById('whMass').value);
    remainingMass = initialMass;
    totalRolledMass = 0;
    stage = 1;
    lastPassMassAtStage = 0;
    stageActive = false;

    document.getElementById('segments').innerHTML = '';
    document.getElementById('logList').innerHTML = '';
    document.getElementById('finalMessage').innerHTML = '';
    document.getElementById('remainingMass').textContent = initialMass;
    document.getElementById('totalMass').textContent = '0';

    document.getElementById('stage2Button').disabled = false;
    document.getElementById('stage3Button').disabled = false;

    ships.forEach(ship => {
        ship.arrow = 'Out';
        ship.lastRoll = 'Out';
    });

    const toggleButtons = document.querySelectorAll('[id^="toggleArrow"]');
    toggleButtons.forEach(button => {
        button.textContent = 'Out';
    });

    updateStatus();
}

function roll(shipId, type) {
    let mass = type === 'light'
        ? parseInt(document.getElementById(`light${shipId}`).value)
        : parseInt(document.getElementById(`heavy${shipId}`).value);
    let shipName = document.getElementById(`name${shipId}`).value;
    let arrow = ships[shipId].arrow;
    ships[shipId].lastRoll = arrow;
    totalRolledMass += mass;
    remainingMass = initialMass - totalRolledMass;

    addSegment(mass, type, shipName);
    updateStatus();
    logRoll(shipName, mass, arrow, type);
    toggleArrow(shipId);
    checkFinal();
    updateStageButtons();

    if (stageActive) {
        updateStageMarkerPosition();
    }
}

function addSegment(mass, type, shipName) {
    const segContainer = document.getElementById('segments');

    // Add separator before new segment (except for first segment)
    if (segContainer.children.length > 0) {
        let sep = document.createElement('div');
        sep.className = 'separator';
        segContainer.appendChild(sep);
    }

    let seg = document.createElement('div');
    seg.className = `segment ${type}`;
    let widthPercent = (mass / initialMass) * 100;
    seg.style.width = `${widthPercent}%`;

    let label = document.createElement('span');
    label.className = 'segment-label';
    label.textContent = shipName;
    seg.appendChild(label);

    segContainer.appendChild(seg);
}

function toggleArrow(shipId) {
    let current = ships[shipId].arrow;
    let newVal = current === 'Out' ? 'In' : 'Out';
    ships[shipId].arrow = newVal;
    document.getElementById(`toggleArrow${shipId}`).textContent = newVal;
}

function activateStage2() {
    let threshold = initialMass * 0.5;
    if (totalRolledMass >= threshold) {
        document.getElementById('stage2Button').disabled = true;
        return;
    }

    const segments = document.querySelectorAll('#segments .segment');
    for (let i = segments.length - 1; i >= 0; i--) {
        if (segments[i].classList.contains('light') || segments[i].classList.contains('heavy')) {
            lastPassMassAtStage = (parseFloat(segments[i].style.width) / 100) * initialMass;
            break;
        }
    }

    let additionalMass = threshold - totalRolledMass;
    addSegment(additionalMass, 'other', 'Other');
    totalRolledMass += additionalMass;
    remainingMass = initialMass - totalRolledMass;
    updateStatus();
    logRoll('Other', additionalMass, '', 'other');
    document.getElementById('stage2Button').disabled = true;
    updateStageButtons();
    checkFinal();

    // Activate stage marker
    stageActive = true;
    createStageMarker();
}

function activateStage3() {
    let threshold = initialMass * 0.9;
    if (totalRolledMass >= threshold) {
        document.getElementById('stage3Button').disabled = true;
        return;
    }

    const segments = document.querySelectorAll('#segments .segment');
    for (let i = segments.length - 1; i >= 0; i--) {
        if (segments[i].classList.contains('light') || segments[i].classList.contains('heavy')) {
            lastPassMassAtStage = (parseFloat(segments[i].style.width) / 100) * initialMass;
            break;
        }
    }

    let additionalMass = threshold - totalRolledMass;
    addSegment(additionalMass, 'other', 'Other');
    totalRolledMass += additionalMass;
    remainingMass = initialMass - totalRolledMass;
    updateStatus();
    logRoll('Other', additionalMass, '', 'other');
    document.getElementById('stage3Button').disabled = true;
    updateStageButtons();
    checkFinal();

    // Activate stage marker
    stageActive = true;
    createStageMarker();
}

function createStageMarker() {
    const markerContainer = document.getElementById('stageMarkerContainer');
    markerContainer.innerHTML = '';

    if (lastPassMassAtStage > 0) {
        let marker = document.createElement('div');
        marker.className = 'stage-marker';
        let widthPercent = (lastPassMassAtStage / initialMass) * 100;
        marker.style.width = `${widthPercent}%`;

        // Calculate position - after the last segment
        let segmentsWidth = 0;
        const segments = document.querySelectorAll('#segments .segment');
        segments.forEach(seg => {
            segmentsWidth += parseFloat(seg.style.width);
        });

        marker.style.left = `${segmentsWidth}%`;
        markerContainer.appendChild(marker);
    }
}

function updateStageMarkerPosition() {
    const markerContainer = document.getElementById('stageMarkerContainer');
    markerContainer.innerHTML = '';

    if (lastPassMassAtStage > 0 && stageActive) {
        let marker = document.createElement('div');
        marker.className = 'stage-marker';
        let widthPercent = (lastPassMassAtStage / initialMass) * 100;
        marker.style.width = `${widthPercent}%`;

        // Calculate position - after the last segment
        let segmentsWidth = 0;
        const segments = document.querySelectorAll('#segments .segment');
        segments.forEach(seg => {
            segmentsWidth += parseFloat(seg.style.width);
        });

        marker.style.left = `${segmentsWidth}%`;
        markerContainer.appendChild(marker);
    }
}

function initPercentageMarkers() {
    const barContainer = document.querySelector('.bar-container');
    const markers = document.createElement('div');
    markers.className = 'percentage-markers';

    // Create marker at 100%
    const marker100 = document.createElement('div');
    marker100.className = 'percentage-marker percentage-marker-100';
    const label100 = document.createElement('div');
    label100.className = 'percentage-marker-label';
    label100.textContent = '100%';
    label100.style.left = '0%';
    markers.appendChild(marker100);
    markers.appendChild(label100);

    // Create marker at 50%
    const marker50 = document.createElement('div');
    marker50.className = 'percentage-marker percentage-marker-50';
    const label50 = document.createElement('div');
    label50.className = 'percentage-marker-label';
    label50.textContent = '50%';
    label50.style.left = '50%';
    markers.appendChild(marker50);
    markers.appendChild(label50);

    // Create marker at 10%
    const marker10 = document.createElement('div');
    marker10.className = 'percentage-marker percentage-marker-10';
    const label10 = document.createElement('div');
    label10.className = 'percentage-marker-label';
    label10.textContent = '10%';
    label10.style.left = '90%';
    markers.appendChild(marker10);
    markers.appendChild(label10);

    barContainer.appendChild(markers);
}

function updateStageButtons() {
    if ((totalRolledMass / initialMass) * 100 >= 50) {
        document.getElementById('stage2Button').disabled = true;
    } else {
        document.getElementById('stage2Button').disabled = false;
    }
    if ((totalRolledMass / initialMass) * 100 >= 90) {
        document.getElementById('stage3Button').disabled = true;
    } else {
        document.getElementById('stage3Button').disabled = false;
    }
}

function updateStatus() {
    document.getElementById('remainingMass').textContent = remainingMass;
    document.getElementById('totalMass').textContent = totalRolledMass;
}

function logRoll(shipName, mass, arrow, type) {
    let logList = document.getElementById('logList');
    let row = document.createElement('div');
    row.className = 'log-row';

    let nameCol = document.createElement('span');
    nameCol.textContent = shipName;

    let massCol = document.createElement('span');
    massCol.textContent = mass.toLocaleString();

    let typeCol = document.createElement('span');
    let typeText = type === 'light' ? 'Light' :
        type === 'heavy' ? 'Heavy' : 'Other';
    typeCol.textContent = `${typeText} ${arrow}`;
    typeCol.style.color = arrow === 'Out' ? '#f44336' : '#4caf50';

    row.appendChild(nameCol);
    row.appendChild(massCol);
    row.appendChild(typeCol);
    logList.appendChild(row);
}

function checkFinal() {
    if (remainingMass <= 0) {
        let finalDiv = document.getElementById('finalMessage');
        let rolledOut = [];

        for (let i = 0; i < ships.length; i++) {
            if (ships[i].lastRoll === 'Out') {
                let shipName = document.getElementById(`name${i}`).value;
                rolledOut.push(shipName);
            }
        }

        if (rolledOut.length > 0) {
            finalDiv.className = 'danger';
            finalDiv.textContent = `${rolledOut.join(', ')} got rolled out!`;
        } else {
            finalDiv.className = 'success';
            finalDiv.textContent = 'Wormhole successfully rolled!';
        }
    }
}

document.getElementById('whMass').addEventListener('input', function () {
    initialMass = parseInt(this.value);
    remainingMass = initialMass - totalRolledMass;
    updateStatus();
});
