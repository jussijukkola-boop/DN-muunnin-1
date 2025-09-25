let data = [];

function loadCSV() {
    Papa.parse('dn_data.csv', {
        download: true,
        header: true,
        complete: function(results) {
            data = results.data;
            populateDropdowns();
        }
    });
}

function populateDropdowns() {
    const dnSelect = document.getElementById('dn-select');
    const outerDiameterSelect = document.getElementById('outer-diameter-select');
    const inchSizeSelect = document.getElementById('inch-size-select');

    data.forEach(row => {
        const dnOption = document.createElement('option');
        dnOption.value = row.DN;
        dnOption.textContent = row.DN;
        dnSelect.appendChild(dnOption);

        const outerOption = document.createElement('option');
        outerOption.value = row.Ulkohalkaisija;
        outerOption.textContent = row.Ulkohalkaisija;
        outerDiameterSelect.appendChild(outerOption);

        const inchOption = document.createElement('option');
        inchOption.value = row.Tuumakoko;
        inchOption.textContent = row.Tuumakoko;
        inchSizeSelect.appendChild(inchOption);
    });
}

function updateResults() {
    const dnSelect = document.getElementById('dn-select').value;
    const outerDiameterSelect = document.getElementById('outer-diameter-select').value;
    const inchSizeSelect = document.getElementById('inch-size-select').value;

    let selectedRow = null;

    if (dnSelect) {
        selectedRow = data.find(row => row.DN === dnSelect);
    } else if (outerDiameterSelect) {
        selectedRow = data.find(row => row.Ulkohalkaisija === outerDiameterSelect);
    } else if (inchSizeSelect) {
        selectedRow = data.find(row => row.Tuumakoko === inchSizeSelect);
    }

    if (selectedRow) {
        document.getElementById('result-dn').textContent = `DN: ${selectedRow.DN}`;
        document.getElementById('result-outer-diameter').textContent = `Ulkohalkaisija: ${selectedRow.Ulkohalkaisija}`;
        document.getElementById('result-inch-size').textContent = `Tuumakoko: ${selectedRow.Tuumakoko}`;
    } else {
        document.getElementById('result-dn').textContent = `DN: -`;
        document.getElementById('result-outer-diameter').textContent = `Ulkohalkaisija: -`;
        document.getElementById('result-inch-size').textContent = `Tuumakoko: -`;
    }
}

window.onload = loadCSV;