// usuarios.js
console.log("Usuarios cargado.");
document.getElementById('showAddUserForm').addEventListener('click', function () {
    document.getElementById('addUserForm').style.display = 'block';
});

document.getElementById('addUserForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const role = document.getElementById('role').value;

    if (!validatePassword(password)) {
        alert('La contraseña no es segura. Debe tener al menos 8 caracteres, incluyendo una mayúscula, una minúscula, un número y un símbolo.');
        return;
    }

    fetch('/api/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ name, email, password, role })
    })
    .then(response => response.json())
    .then(data => {
        if (data._id) {
            alert('Usuario agregado exitosamente');
            loadUsers();
        } else {
            alert('Error al agregar usuario: ' + data.message);
        }
    })
    .catch(error => console.error('Error:', error));
});

function loadUsers() {
    fetch('/api/users', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    })
    .then(response => response.json())
    .then(data => {
        const userList = document.getElementById('userList');
        userList.innerHTML = '';
        data.forEach(user => {
            const li = document.createElement('li');
            li.className = 'user-list-item';
            li.innerHTML = `
                ${user.name} - ${user.email} - ${user.role}
                <div class="more-options" onclick="toggleActions(this)">⋮</div>
                <div class="user-actions">
                    <button onclick="editUser('${user._id}')">Modificar Rol</button>
                    <button onclick="deleteUser('${user._id}')">Eliminar</button>
                </div>
            `;
            userList.appendChild(li);
        });
    })
    .catch(error => console.error('Error:', error));
}

function validatePassword(password) {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    return regex.test(password);
}

window.editUser = function (userId) {
    const newRole = prompt('Ingrese el nuevo rol (Admin, Receptor/Pagador, Gestor de Cuentas, Vendedor):');
    if (newRole) {
        fetch(`/api/users/${userId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({ role: newRole })
        })
        .then(response => response.json())
        .then(data => {
            if (data._id) {
                alert('Usuario actualizado exitosamente');
                loadUsers();
            } else {
                alert('Error al actualizar usuario: ' + data.message);
            }
        })
        .catch(error => console.error('Error:', error));
    }
};

window.deleteUser = function (userId) {
    if (confirm('¿Estás seguro de que quieres eliminar este usuario?')) {
        fetch(`/api/users/${userId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(response => response.json())
        .then(data => {
            if (data.message === 'Usuario eliminado') {
                alert('Usuario eliminado exitosamente');
                loadUsers();
            } else {
                alert('Error al eliminar usuario: ' + data.message);
            }
        })
        .catch(error => console.error('Error:', error));
    }
};

window.toggleActions = function (element) {
    const actions = element.nextElementSibling;
    actions.style.display = actions.style.display === 'block' ? 'none' : 'block';
};

if (window.location.pathname === '/mainPage') {
    loadUsers();
}
