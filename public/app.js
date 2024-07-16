document.addEventListener('DOMContentLoaded', function () {
    // Función para cargar contenido desde un archivo HTML
    function loadContent(target) {
        fetch(`/sections/${target}.html`)
            .then(response => response.text())
            .then(data => {
                document.getElementById('content').innerHTML = data;
                loadScript(`/scripts/${target}.js`);
                // Ejecutar funciones específicas después de cargar el contenido
                if (target === 'usuarios') {
                    initUserOptions();
                }
            })
            .catch(error => console.error('Error al cargar el contenido:', error));
    }

    // Función para cargar y ejecutar un script específico
    function loadScript(url) {
        const script = document.createElement('script');
        script.src = url;
        script.onload = () => console.log(`Script ${url} cargado y ejecutado.`);
        document.body.appendChild(script);
    }

    // Evento para manejar los clics en los enlaces del menú
    document.querySelectorAll('.menu a').forEach(function (menuLink) {
        menuLink.addEventListener('click', function (event) {
            event.preventDefault();
            const target = this.getAttribute('data-target');
            loadContent(target);
        });
    });

    // Funcionalidad específica para la página de inicio de sesión
    if (window.location.pathname === '/login') {
        document.getElementById('loginForm').addEventListener('submit', function (event) {
            event.preventDefault();

            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            fetch('/api/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            })
            .then(response => response.json())
            .then(data => {
                if (data.token) {
                    localStorage.setItem('token', data.token);
                    window.location.href = '/mainPage';
                } else {
                    const errorMessage = document.getElementById('errorMessage');
                    errorMessage.textContent = data.message || 'Error: Contraseña o correo inválidos. Verifique los datos por favor.';
                    errorMessage.style.display = 'block';
                }
            })
            .catch(error => {
                console.error('Error:', error);
                const errorMessage = document.getElementById('errorMessage');
                errorMessage.textContent = 'Error: Contraseña o correo inválidos. Verifique los datos por favor.';
                errorMessage.style.display = 'block';
            });
        });
    }

    // Función para inicializar opciones de usuario
    function initUserOptions() {
        const showAddUserFormBtn = document.getElementById('showAddUserForm');
        const addUserForm = document.getElementById('addUserForm');

        showAddUserFormBtn.addEventListener('click', function () {
            addUserForm.style.display = addUserForm.style.display === 'none' ? 'block' : 'none';
        });

        document.querySelectorAll('.user-options .dots').forEach(function (dots) {
            dots.addEventListener('click', function () {
                const options = this.nextElementSibling;
                options.style.display = options.style.display === 'block' ? 'none' : 'block';
            });
        });
    }

    // Cargar la sección inicial por defecto si estamos en mainPage
    if (window.location.pathname === '/mainPage') {
        loadContent('resumen');
    }
});
