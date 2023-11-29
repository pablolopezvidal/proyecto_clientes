document.addEventListener("DOMContentLoaded", function () {
    const registroForm = document.getElementById("registroForm");

    registroForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const username = registroForm.elements.username.value;
        const password = registroForm.elements.password.value;
        let x = false;

        try {
            fetch('https://fakestoreapi.com/users')
                .then(res => res.json())
                .then(usuariosDeLaApi => {
                    console.log(usuariosDeLaApi);

                    usuariosDeLaApi.forEach(usuarioAPI => {
                        if (username === usuarioAPI.username) {
                            alert("Ya estaba en la API");
                            x = true;
                        }
                    });

                    // La lógica del segundo "if" debe estar aquí, dentro del bloque "then"
                    // Obtener todos los registros que comienzan con la clave "user"
                    const usuariosRegistrados = obtenerUsuariosRegistrados();

                    // Verificar si hay algún usuario con el mismo nombre de usuario
                    const usuarioExistente = usuariosRegistrados.some(usuario => usuario.username === username);

                    if (usuarioExistente || x) {
                        alert("El nombre de usuario ya está registrado. Por favor, elige otro.");
                    } else {
                        // Obtener el siguiente ID para el nuevo usuario
                        const nuevoUsuarioId = obtenerNuevoUsuarioId();

                        // Crear un nuevo usuario
                        const nuevoUsuario = { id: nuevoUsuarioId, username, password, listaCarritos: [] };

                        // Guardar el nuevo usuario en localStorage con una clave única
                        localStorage.setItem(`user${nuevoUsuarioId}`, JSON.stringify(nuevoUsuario));

                        alert("Registro exitoso. Ahora puedes iniciar sesión.");
                        registroForm.reset();
                    }
                })
                .catch(error => {
                    console.error('Error al obtener usuarios de la API:', error);
                    // Puedes manejar el error aquí según tus necesidades
                });
        } catch (error) {
            console.error('Error general:', error);
            // Puedes manejar el error general aquí según tus necesidades
        }
    });

    // Resto del código...

    // Función para obtener todos los usuarios registrados
    function obtenerUsuariosRegistrados() {
        const usuariosRegistrados = [];
        for (let i = 0; i < localStorage.length; i++) {
            const clave = localStorage.key(i);
            if (clave.startsWith("user")) {
                const usuario = JSON.parse(localStorage.getItem(clave));
                usuariosRegistrados.push(usuario);
            }
        }
        return usuariosRegistrados;
    }

    // Función para obtener el siguiente ID único para el usuario
    function obtenerNuevoUsuarioId() {
        const ultimoUsuarioId = parseInt(localStorage.getItem('ultimoUsuarioId')) || 10;
        const nuevoUsuarioId = ultimoUsuarioId + 1;
        localStorage.setItem('ultimoUsuarioId', nuevoUsuarioId);
        return nuevoUsuarioId;
    }
});






