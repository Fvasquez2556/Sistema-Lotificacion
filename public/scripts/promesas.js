document.addEventListener('DOMContentLoaded', () => {
    const promesasForm = document.getElementById('promesasForm');
    const promesasList = document.getElementById('promesasList');

    promesasForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const lote = document.getElementById('lote').value;
        const comprador = document.getElementById('comprador').value;
        const fecha = document.getElementById('fecha').value;
        const monto = document.getElementById('monto').value;

        const res = await fetch('/api/promesas', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ lote, comprador, fecha, monto })
        });

        const data = await res.json();
        if (res.status === 201) {
            alert('Promesa agregada');
            loadPromesas();
        } else {
            alert('Error: ' + data.message);
        }
    });

    async function loadPromesas() {
        const res = await fetch('/api/promesas');
        const data = await res.json();

        promesasList.innerHTML = '';
        data.forEach(promesa => {
            const div = document.createElement('div');
            div.textContent = `Lote: ${promesa.lote}, Comprador: ${promesa.comprador}, Fecha: ${promesa.fecha}, Monto: ${promesa.monto}`;
            promesasList.appendChild(div);
        });
    }

    loadPromesas();
});
