document.getElementById('newQuoteBtn').addEventListener('click', function () {
    document.getElementById('paymentTypeSelector').style.display = 'block';
    document.getElementById('contadoForm').style.display = 'none';
    document.getElementById('plazosForm').style.display = 'none';
    document.getElementById('amortizationTable').style.display = 'none';
});

document.getElementById('contadoBtn').addEventListener('click', function () {
    document.getElementById('paymentTypeSelector').style.display = 'none';
    document.getElementById('contadoForm').style.display = 'block';
    document.getElementById('plazosForm').style.display = 'none';
});

document.getElementById('plazosBtn').addEventListener('click', function () {
    document.getElementById('paymentTypeSelector').style.display = 'none';
    document.getElementById('contadoForm').style.display = 'none';
    document.getElementById('plazosForm').style.display = 'block';
});

document.getElementById('contadoForm').addEventListener('submit', function (event) {
    event.preventDefault();
    const price = Math.round(parseFloat(document.getElementById('contadoPrice').value));
    const discountedPrice = price * 0.98;
    const monthlyPayment = Math.round(discountedPrice);

    const amortizationTableBody = document.querySelector('#amortizationTable tbody');
    amortizationTableBody.innerHTML = '';

    const row = document.createElement('tr');
    row.innerHTML = `
        <td>1</td>
        <td>${price.toFixed(0)}</td>
        <td>${monthlyPayment.toFixed(0)}</td>
        <td>${monthlyPayment.toFixed(0)}</td>
        <td>0</td>
        <td>0</td>
        <td>${new Date().toLocaleDateString()}</td>
        <td>${new Date().toLocaleDateString()}</td>
    `;

    amortizationTableBody.appendChild(row);

    document.getElementById('contadoForm').reset();
    document.getElementById('contadoForm').style.display = 'none';
    document.getElementById('amortizationTable').style.display = 'table';
});

document.getElementById('plazosForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const price = Math.round(parseFloat(document.getElementById('price').value));
    const downPayment = Math.round(parseFloat(document.getElementById('downPayment').value));
    const annualRate = parseFloat(document.getElementById('annualRate').value);
    const months = parseInt(document.getElementById('months').value);
    const purchaseDate = new Date(document.getElementById('purchaseDate').value);

    const principal = price - downPayment;
    let monthlyPayment;
    let scenario = '';

    if (months <= 18) {
        // Escenario 2: Compra a plazos menores o iguales a 18 meses sin intereses
        monthlyPayment = Math.round(principal / months);
        scenario = 'Plazos sin intereses';
    } else {
        // Escenario 3: Compra a plazos mayores a 18 meses con intereses
        const monthlyRate = annualRate / 100 / 12;
        monthlyPayment = Math.round((principal * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -months)));
        scenario = 'Plazos con intereses';
    }

    const amortizationTableBody = document.querySelector('#amortizationTable tbody');
    amortizationTableBody.innerHTML = '';

    let currentBalance = principal;

    for (let month = 1; month <= months; month++) {
        let interest = 0;
        let principalPayment = monthlyPayment;
        let newBalance = currentBalance - principalPayment;

        if (scenario === 'Plazos con intereses') {
            interest = Math.round(currentBalance * (annualRate / 100 / 12));
            principalPayment = monthlyPayment - interest;
            newBalance = currentBalance - principalPayment;
        }

        if (month === months) {
            principalPayment = currentBalance;
            newBalance = 0;
        }

        const paymentDate = new Date(purchaseDate);
        paymentDate.setMonth(purchaseDate.getMonth() + month);

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${month}</td>
            <td>${currentBalance.toFixed(0)}</td>
            <td>${monthlyPayment.toFixed(0)}</td>
            <td>${principalPayment.toFixed(0)}</td>
            <td>${interest.toFixed(0)}</td>
            <td>${newBalance.toFixed(0)}</td>
            <td>${purchaseDate.toLocaleDateString()}</td>
            <td>${paymentDate.toLocaleDateString()}</td>
        `;

        amortizationTableBody.appendChild(row);
        currentBalance = newBalance;
    }

    document.getElementById('plazosForm').reset();
    document.getElementById('plazosForm').style.display = 'none';
    document.getElementById('amortizationTable').style.display = 'table';
});
