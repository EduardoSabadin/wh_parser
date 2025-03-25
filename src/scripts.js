const csvData = `
    Wormhole Type;Goes from;Leads to;Total Mass Allowed (t);Max Individual Mass (t);Mass Regeneration (t/day);Wormhole Classification;Max Stable Time (Hours)
    A009;;Class 13 W-Space;500,000;5,000;0;13;16
    A239;Class 2 W-Space;Lowsec;2,000,000;375,000;0;8;24
    A641;Highsec;Highsec;2,000,000;1,000,000;0;7;16
    A982;Class 3 W-Space;Class 6 W-Space;3,000,000;375,000;0;6;24
    B041;Highsec;Class 6 W-Space;5,000,000;375,000;500,000;6;48
    B274;Class 2 W-Space;Highsec;2,000,000;375,000;0;7;24
    B449;Lowsec or Nullsec (0.0);Highsec;2,000,000;1,000,000;0;7;16
    B520;Class 6 W-Space;Highsec;5,000,000;375,000;500,000;7;24
    B735;;Drifter - Barbican;750,000;375,000;0;;16
    C008;;Class 5 W-Space;1,000,000;5,000;500,000;5;4.5
    C125;Class 1 W-Space;Class 2 W-Space;1,000,000;62,000;0;2;16
    C140;Class 5 or Class 6 W-Space;Lowsec;3,300,000;2,000,000;0;8;24
    C247;Class 4 W-Space;Class 3 W-Space;2,000,000;375,000;0;3;16
    C248;Class 6 W-Space;Nullsec (0.0);3,300,000;2,000,000;500,000;9;24
    C391;Class 6 W-Space;Lowsec;5,000,000;2,000,000;500,000;8;24
    C414;;Drifter - Conflux;750,000;375,000;0;;16
    C729;"""Adjacent"" systems";Pochven;1,000,000;375,000;0;25;16
    D364;Class 5 W-Space;Class 2 W-Space;1,000,000;375,000;0;2;16
    D382;Class 2 W-Space;Class 2 W-Space;2,000,000;375,000;0;2;16
    D792;Class 5 W-Space;Highsec;3,000,000;1,000,000;0;7;24
    D845;Class 3 W-Space;Highsec;5,000,000;375,000;500,000;7;24
    E004;;Class 1 W-Space;1,000,000;5,000;500,000;1;4.5
    E175;Class 5 W-Space;Class 4 W-Space;2,000,000;375,000;0;4;16
    E545;Class 2 W-Space;Nullsec (0.0);2,000,000;375,000;0;9;24
    E587;Thera;Nullsec (0.0);3,000,000;1,000,000;0;9;16
    F135;Class 2 or Class 3 W-Space;Thera;750,000;375,000;0;;16
    F216;Class 2 to Class 6 W-Space;Pochven;1,000,000;375,000;0;25;16
    F353;Class 1 W-Space;Thera;100,000;62,000;0;;16
    G008;;Class 6 W-Space;1,000,000;5,000;500,000;6;4.5
    G024;Class 6 W-Space;Class 2 W-Space;2,000,000;375,000;0;2;16
    H121;Class 1 W-Space;Class 1 W-Space;500,000;62,000;0;1;16
    H296;Class 5 W-Space;Class 5 W-Space;3,300,000;2,000,000;0;5;24
    H900;Class 4 W-Space;Class 5 W-Space;3,000,000;375,000;0;5;24
    I182;Class 3 W-Space;Class 2 W-Space;2,000,000;375,000;0;2;16
    J244;Class 1 W-Space;Lowsec;1,000,000;62,000;0;8;24
    J377;C1/2/3/4 (+more?);Turnur;1,000,000;62,000;0;8;24
    K162;;Generic Exit WH;NA;NA;NA;NA;NA
    K329;Class 4 W-Space;Nullsec (0.0);5,000,000;2,000,000;500,000;9;24
    K346;Class 3 W-Space;Nullsec (0.0);3,000,000;375,000;0;9;24
    L005;;Class 2 W-Space;1,000,000;5,000;500,000;2;4.5
    L031;Nullsec (0.0);Thera;3,000,000;1,000,000;0;;16
    L477;Class 6 W-Space;Class 3 W-Space;2,000,000;375,000;0;3;16
    L614;Class 1 W-Space;Class 5 W-Space;1,000,000;62,000;0;5;24
    M001;;Class 4 W-Space;1,000,000;5,000;500,000;4;4.5
    M164;Lowsec;Thera;2,000,000;375,000;0;;16
    M267;Class 5 W-Space;Class 3 W-Space;1,000,000;375,000;0;3;16
    M555;Highsec;Class 5 W-Space;3,000,000;1,000,000;0;5;24
    M609;Class 1 W-Space;Class 4 W-Space;1,000,000;62,000;0;4;16
    N062;Class 2 W-Space;Class 5 W-Space;3,000,000;375,000;0;5;24
    N110;Class 1 W-Space;Highsec;1,000,000;62,000;0;7;24
    N290;Class 4 W-Space;Lowsec;5,000,000;2,000,000;500,000;8;24
    N432;Lowsec or Nullsec (0.0);Class 5 W-Space;3,300,000;2,000,000;0;5;24
    N766;Class 4 W-Space;Class 2 W-Space;2,000,000;375,000;0;2;16
    N770;Class 3 W-Space;Class 5 W-Space;3,000,000;375,000;0;5;24
    N944;Lowsec or Nullsec (0.0);Lowsec;3,300,000;2,000,000;0;8;24
    N968;Class 3 W-Space;Class 3 W-Space;2,000,000;375,000;0;3;16
    O128;K-space;Class 4 W-Space;1,000,000;375,000;100,000;4;24
    O477;Class 2 W-Space;Class 3 W-Space;2,000,000;375,000;0;3;16
    O883;Class 1 W-Space;Class 3 W-Space;1,000,000;62,000;0;3;16
    P060;Class 4 W-Space;Class 1 W-Space;500,000;62,000;0;1;16
    Q003;;Nullsec (0.0);1,000,000;5,000;500,000;9;4.5
    Q063;Thera;Highsec;500,000;62,000;0;7;16
    Q317;Class 6 W-Space;Class 1 W-Space;500,000;62,000;0;1;16
    R051;Highsec;Lowsec;3,000,000;1,000,000;0;8;16
    R081;Pochven;Class 4 W-Space;1,000,000;450000;0;;16
    R259;;Drifter - Redoubt;750,000;375,000;0;;16
    R474;Class 2 W-Space;Class 6 W-Space;3,000,000;375,000;0;6;24
    R943;K-space;Class 2 W-Space;750,000;375,000;0;2;16
    S047;Class 4 W-Space;Highsec;3,000,000;375,000;0;7;24
    S199;Lowsec or Nullsec (0.0);Nullsec (0.0);3,300,000;2,000,000;0;9;24
    S804;Class 1 W-Space;Class 6 W-Space;1,000,000;62,000;0;6;24
    S877;;Drifter - Sentinel;750,000;375,000;0;;16
    T405;Class 3 W-Space;Class 4 W-Space;2,000,000;375,000;0;4;16
    T458;Highsec;Thera;500,000;62,000;0;;16
    U210;Class 3 W-Space;Lowsec;3,000,000;375,000;0;8;23.5
    U319;Lowsec or Nullsec (0.0);Class 6 W-Space;3,300,000;2,000,000;500,000;6;48
    U372;Drone Nullsec (0.0);Pochven;1,000,000;375,000;0;25;16
    U574;Class 4 W-Space;Class 6 W-Space;3,000,000;375,000;0;6;24
    V283;Highsec;Nullsec (0.0);3,000,000;1,000,000;0;9;24
    V301;Class 3 W-Space;Class 1 W-Space;500,000;62,000;0;1;16
    V753;Class 5 W-Space;Class 6 W-Space;3,300,000;2,000,000;0;6;24
    V898;Thera;Lowsec;2,000,000;375,000;0;;16
    V911;Class 6 W-Space;Class 5 W-Space;3,300,000;2,000,000;0;5;24
    V928;;Drifter - Vidette;750,000;375,000;0;;16
    W237;Class 6 W-Space;Class 6 W-Space;3,300,000;2,000,000;0;6;24
    X450;Pochven;Drone Nullsec (0.0);1,000,000;375,000;0;;16
    X702;K-space;Class 3 W-Space;1,000,000;375,000;0;3;24
    X877;Class 4 W-Space;Class 4 W-Space;2,000,000;375,000;0;4;16
    Y683;Class 2 W-Space;Class 4 W-Space;2,000,000;375,000;0;4;16
    Y790;Class 5 W-Space;Class 1 W-Space;500,000;62,000;0;1;16
    Z006;;Class 3 W-Space;1,000,000;5,000;5,000;1;4.5
    Z060;Class 1 W-Space;Nullsec (0.0);1,000,000;62,000;0;9;24
    Z142;Class 5 or Class 6 W-Space;Nullsec (0.0);3,300,000;2,000,000;0;9;24
    Z457;Class 6 W-Space;Class 4 W-Space;2,000,000;375,000;0;4;16
    Z647;Class 2 W-Space;Class 1 W-Space;500,000;62,000;0;1;16
    Z971;K-space;Class 1 W-Space;100,000;62,000;0;1;16
`;


function parseCSV(csv) {
    const lines = csv.trim().split('\n');
    const headers = lines[0].split(';');
    return lines.slice(1).map(row => {
        const values = row.split(';');
        return headers.reduce((acc, header, i) => {
            acc[header.trim()] = values[i]?.trim() || '';
            return acc;
        }, {});
    });
}

const wormholeData = parseCSV(csvData);

// Populate the datalist on page load
document.addEventListener('DOMContentLoaded', function () {
    const datalist = document.getElementById('wormholeTypes');
    const wormholeTypes = [...new Set(wormholeData.map(item => item["Wormhole Type"]))];

    wormholeTypes.forEach(type => {
        const option = document.createElement('option');
        option.value = type;
        datalist.appendChild(option);
    });

    // Add event listeners for Enter key
    document.getElementById('wormholeName').addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            parseDescription();
        }
    });

    document.getElementById('description').addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            // Prevent newline in textarea when pressing Enter
            e.preventDefault();
            parseDescription();
        }
    });
});

// Function to parse the description and match it with the CSV
function parseDescription() {
    const description = document.getElementById('description').value.toLowerCase();
    let wormholeName = document.getElementById('wormholeName').value.toLowerCase();

    // Remove "wormhole" prefix if present
    wormholeName = wormholeName.replace(/^wormhole\s*/i, '').trim();

    const result = {};

    // System type mapping
    const systemTypes = {
        "deadly unknown": "C6",
        "dangerous unknown": "C4/C5",
        "unknown": "C1/C2/C3",
        "high security": "Hisec",
        "low security": "Lowsec",
        "null security": "Nullsec",
        "triglavian space": "Pochven"
    };

    // Life mapping
    const lifeStatus = {
        "not yet begun": "More than 24 hours",
        "beginning to decay": "Between 4 and 24 hours",
        "reaching the end": "Less than 4 hours"
    };

    // Ship size mapping
    const shipSizes = {
        "very large ships can pass through this wormhole": "All ships except for Titans and supercarriers can pass through this hole",
        "larger ships can pass through this wormhole": "Battleships, Orcas, and smaller ships can pass through this hole",
        "up to medium size ships can pass through this wormhole": "Unplated Nestors, battlecruisers and smaller ships can pass through this hole",
        "only the smallest ships can pass through this wormhole": "Only frigates, destroyers, or specially fit HICs can pass through this hole"
    };

    // Extract system type
    for (const [key, value] of Object.entries(systemTypes)) {
        if (description.includes(key)) {
            result['System Type'] = value;
            break;
        }
    }

    // Extract life status
    for (const [key, value] of Object.entries(lifeStatus)) {
        if (description.includes(key)) {
            result['Life'] = value;
            break;
        }
    }

    // Extract ship sizes
    for (const [key, value] of Object.entries(shipSizes)) {
        if (description.includes(key)) {
            result['Ship Size'] = value;
            break;
        }
    }

    const massStatus = {
        "not yet": { text: "Over 50%", number: 50 },
        "not to a critical degree": { text: "Between 50% and 10%", numbers: [50, 10] },
        "stability critically disrupted": { text: "Less than 10%", number: 10 }
    };

    // Extract mass status and calculate probable mass
    for (const [key, value] of Object.entries(massStatus)) {
        if (description.includes(key)) {
            result["Mass"] = value.text;

            result["Mass Number"] = (wh) => {
                const totalMass = parseMassValue(wh["Total Mass Allowed (t)"]);

                if (Array.isArray(value.numbers)) {
                    const lowerMass = (totalMass * value.numbers[1]) / 100;
                    const upperMass = (totalMass * value.numbers[0]) / 100;

                    return `${value.text
                        .replace("50%", upperMass.toLocaleString())
                        .replace("10%", lowerMass.toLocaleString())}`;
                } else {
                    const probableMass = (totalMass * value.number) / 100;
                    return `${value.text.replace(/[%\d]+/g, probableMass.toLocaleString())}`;
                }
            };
            break;
        }
    }

    function parseMassValue(massString) {
        return parseFloat(massString.replace(/[,t\s]/g, ""));
    }

    // Extract CSV details
    const wh = wormholeData.find(row => {
        const csvType = row["Wormhole Type"]?.replace(/^wormhole\s*/i, '').trim();
        return csvType?.toLowerCase() === wormholeName.toLowerCase();
    });

    if (wh) {
        result['Wormhole Type'] = wh["Wormhole Type"];
        result['Goes From'] = wh["Goes from"];
        result['Leads To'] = wh["Leads to"];
        result['Total Mass Allowed'] = wh["Total Mass Allowed (t)"];
        result['Max Individual Mass'] = wh["Max Individual Mass (t)"];
        result['Mass Regeneration'] = wh["Mass Regeneration (t/day)"];
        result['Wormhole Classification'] = wh["Wormhole Classification"];
        result['Max Stable Time'] = wh["Max Stable Time (Hours)"];

        if (result['Mass Number']) {
            const probableMass = result['Mass Number'](wh);
            result['Probable Mass'] = probableMass;
        }

        // Add Roll it! button that opens the roller page with mass parameter
        result['RollButton'] = `<button onclick="window.location.href='roller.html?mass=${wh['Total Mass Allowed (t)'].replace(/,/g, '')}'">Roll it!</button>`;
    }

    // Display results
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = `
        <div><label>System Type:</label> <span>${result['System Type'] || 'Unknown'}</span></div>
        <div><label>Wormhole Classification:</label> <span>${result['Wormhole Classification'] || 'Unknown'}</span></div>
        <div><label>Life:</label> <span>${result['Life'] || 'Unknown'}</span></div>
        <div><label>Max Stable Time:</label> <span>${result['Max Stable Time'] + ' hours' || 'Unknown'}</span></div>
        <div><label>Goes From:</label> <span>${result['Goes From'] || 'Unknown'}</span></div>
        <div><label>Leads To:</label> <span>${result['Leads To'] || 'Unknown'}</span></div>
        <div><label>Ship Size:</label> <span>${result['Ship Size'] || 'Unknown'}</span></div>
        <div><label>Max Individual Mass (t):</label> <span>${result['Max Individual Mass'] || 'Unknown'}</span></div>
        <div><label>Total Mass Allowed (t):</label> <span>${result['Total Mass Allowed'] || 'Unknown'}</span></div>
        <div><label>Mass Status:</label> <span>${result['Mass'] || 'Unknown'}</span></div>
        <div><label>Probable Mass:</label> <span>${result['Probable Mass'] || 'Unknown'}</span></div>
        <div><label>Mass Regeneration (t/day):</label> <span>${result['Mass Regeneration'] || 'Unknown'}</span></div>
        ${result['RollButton'] || ''}
    `;
}