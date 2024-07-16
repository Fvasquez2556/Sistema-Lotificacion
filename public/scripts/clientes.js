document.addEventListener('DOMContentLoaded', function () {
    // Mostrar solo la sección correspondiente al hacer clic en el enlace del menú
    document.querySelectorAll('.menu a').forEach(function (menuLink) {
        menuLink.addEventListener('click', function (event) {
            event.preventDefault();
            const target = this.getAttribute('data-target');
            document.querySelectorAll('.content-section').forEach(function (section) {
                section.classList.remove('active');
            });
            document.getElementById(target).classList.add('active');
        });
    });

    // Mostrar el formulario para agregar cliente
    document.getElementById('showAddClientForm').addEventListener('click', function () {
        document.getElementById('addClientForm').style.display = 'block';
    });

    // Agregar nuevo cliente
    document.getElementById('addClientForm').addEventListener('submit', function (event) {
        event.preventDefault();

        const clientData = {
            dpi: document.getElementById('dpi').value,
            extendidoen: document.getElementById('extendidoen').value,
            apellidos: document.getElementById('apellidos').value,
            nombres: document.getElementById('nombres').value,
            direccion: document.getElementById('direccion').value,
            telefono: document.getElementById('telefono').value,
            nit: document.getElementById('nit').value,
            fechanacimiento: document.getElementById('fechanacimiento').value,
            edad: document.getElementById('edad').value,
            nacionalidad: document.getElementById('nacionalidad').value,
            estadocivil: document.getElementById('estadocivil').value,
            dependientes: document.getElementById('dependientes').value,
            profesion: document.getElementById('profesion').value,
            empresa: document.getElementById('empresa').value,
            tiempotrabajo: document.getElementById('tiempotrabajo').value,
            ingreso: document.getElementById('ingreso').value
        };

        fetch('/api/clientes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(clientData)
        })
        .then(response => response.json())
        .then(data => {
            if (data._id) {
                alert('Cliente agregado exitosamente');
                loadClients();
            } else {
                alert('Error al agregar cliente: ' + data.message);
            }
        })
        .catch(error => console.error('Error:', error));
    });

    // Cargar clientes
    function loadClients() {
        fetch('/api/clientes', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(response => response.json())
        .then(data => {
            const clientList = document.getElementById('clientList');
            clientList.innerHTML = '';
            data.forEach(client => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${client.dpi}</td>
                    <td>${client.extendidoen}</td>
                    <td>${client.apellidos}</td>
                    <td>${client.nombres}</td>
                    <td>${client.direccion}</td>
                    <td>${client.telefono}</td>
                    <td>${client.nit}</td>
                    <td>${client.fechanacimiento}</td>
                    <td>${client.edad}</td>
                    <td>${client.nacionalidad}</td>
                    <td>${client.estadocivil}</td>
                    <td>${client.dependientes}</td>
                    <td>${client.profesion}</td>
                    <td>${client.empresa}</td>
                    <td>${client.tiempotrabajo}</td>
                    <td>${client.ingreso}</td>
                    <td>
                        <button onclick="editClient('${client._id}')">Editar</button>
                        <button onclick="deleteClient('${client._id}')">Eliminar</button>
                    </td>
                `;
                clientList.appendChild(row);
            });
        })
        .catch(error => console.error('Error:', error));
    }

    // Cargar clientes al cargar la página principal
    if (window.location.pathname === '/mainPage') {
        loadClients();
    }
});
