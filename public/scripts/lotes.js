// lotes.js
console.log("Lotes cargado.");
document.getElementById('showAddLotForm').addEventListener('click', function () {
    document.getElementById('addLotForm').style.display = 'block';
});

document.getElementById('addLotForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const lotNumber = document.getElementById('lotNumber').value;
    const lotSize = document.getElementById('lotSize').value;
    const lotArea = parseFloat(document.getElementById('lotArea').value);
    const lotPrice = parseFloat(document.getElementById('lotPrice').value);
    const downPayment = parseFloat(document.getElementById('downPayment').value);
    const status = 'Libre';

    fetch('/api/lotes', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ lotNumber, lotSize, lotArea, lotPrice, downPayment, status })
    })
    .then(response => response.json())
    .then(data => {
        if (data._id) {
            alert('Lote agregado exitosamente');
            loadLots();
        } else {
            alert('Error al agregar lote: ' + data.message);
        }
    })
    .catch(error => console.error('Error:', error));
});

function loadLots() {
    fetch('/api/lotes', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    })
    .then(response => response.json())
    .then(data => {
        const lotsTableBody = document.querySelector('#lotsTable tbody');
        lotsTableBody.innerHTML = '';
        data.forEach(lot => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${lot.lotNumber}</td>
                <td>${lot.lotSize}</td>
                <td>${Math.round(lot.lotArea)}</td>
                <td>${Math.round(lot.lotPrice)}</td>
                <td>${Math.round(lot.downPayment)}</td>
                <td>${lot.status}</td>
                <td>
                    <button onclick="deleteLot('${lot._id}')">Eliminar</button>
                </td>
            `;
            lotsTableBody.appendChild(row);
        });
    })
    .catch(error => console.error('Error:', error));
}

window.deleteLot = function (lotId) {
    if (confirm('¿Estás seguro de que quieres eliminar este lote?')) {
        fetch(`/api/lotes/${lotId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(response => response.json())
        .then(data => {
            if (data.message === 'Lote eliminado') {
                alert('Lote eliminado exitosamente');
                loadLots();
            } else {
                alert('Error al eliminar lote: ' + data.message);
            }
        })
        .catch(error => console.error('Error:', error));
    }
};

if (window.location.pathname === '/mainPage') {
    loadLots();
}
