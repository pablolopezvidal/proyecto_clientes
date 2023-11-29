document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("inicioSesionForm");

    loginForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const username = loginForm.elements.username.value;
        const password = loginForm.elements.password.value;
        let usuarioEncontrado = false; // Variable para rastrear si se encontró un usuario válido

        try {
            fetch('https://fakestoreapi.com/users')
                .then(res => res.json())
                .then(usuariosDeLaApi => {
                    console.log(usuariosDeLaApi);

                    usuariosDeLaApi.forEach(usuarioAPI => {
                        if (username === usuarioAPI.username && password === usuarioAPI.password) {
                            alert('ese usuario ya existe en la api, .');

                            sessionStorage.setItem('usuario', JSON.stringify(usuarioAPI));
                            sessionStorage.setItem('carrito', JSON.stringify([]));
                            loginForm.reset();
                            localStorage.setItem(`user${usuarioAPI.id}`, JSON.stringify(usuarioAPI));
                            window.location.href = '../html/pagina.html';
                            usuarioEncontrado = true; // Usuario encontrado, se establece a true
                        }
                    });
                })
                .catch(error => {
                    console.error('Error al obtener usuarios de la API:', error);
                    // Puedes manejar el error aquí según tus necesidades
                });

            for (let i = 0; i < localStorage.length; i++) {
                const clave = localStorage.key(i);
                if (clave && clave.startsWith('user')) {
                    const usuario = JSON.parse(localStorage.getItem(clave));
                    let id = usuario.id;

                    console.log(id);

                    if (usuario.username === username && usuario.password === password) {
                        const usuario1 = {
                            id: id,
                            username: username,
                            password: password,
                            carrito: []
                        };

                        alert('Se encontró el usuario con el nombre y contraseña específicos.');

                        sessionStorage.setItem('usuario', JSON.stringify(usuario1));
                        sessionStorage.setItem('carrito', JSON.stringify([]));
                        inicioSesionForm.reset();
                        window.location.href = '../html/pagina.html';
                        usuarioEncontrado = true; // Usuario encontrado, se establece a true
                        break;
                    }
                }
            }

            // Si no se encontró un usuario válido, mostrar mensaje de error
            if (!usuarioEncontrado) {
                alert('Usuario y contraseña no encontrados.');
            }
        } catch (error) {
            console.error('Error general:', error);
            // Puedes manejar el error general aquí según tus necesidades
        }
    });
});





















/*
document.addEventListener("DOMContentLoaded", function() {
    const loginForm = document.getElementById("inicioSesionForm");

    loginForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const username = loginForm.elements.username.value;
        const password = loginForm.elements.password.value;

        fetch('https://fakestoreapi.com/users')
        .then(res => res.json())
        .then(usuariosDeLaApi => {
            console.log(usuariosDeLaApi);

            usuariosDeLaApi.forEach(usuarioAPI => {
                if (username === usuarioAPI.username && password === usuarioAPI.password) {
                    alert('Se encontró el usuario con el nombre y contraseña específicos.');

                    sessionStorage.setItem('usuario', JSON.stringify(usuarioAPI));
                    sessionStorage.setItem('carrito', JSON.stringify([]));
                    loginForm.reset();
                    localStorage.setItem(`user${usuarioAPI.id}`, JSON.stringify(usuarioAPI));
                    window.location.href = '../html/pagina.html';
                    
                }
            });
        });




        for (let i = 0; i < localStorage.length; i++) {
            const clave = localStorage.key(i);
            // Verificar si la clave comienza con "user"
            if (clave && clave.startsWith('user')) {
                // Obtener el usuario asociado a esa clave y agregarlo al array
                const usuario = JSON.parse(localStorage.getItem(clave));
                
                let id = usuario.id; /*le cambie cont por let y ahira solo funciona con el user3 ns pq*/
                
            /*    console.log(id);


                if (usuario.username === username && usuario.password === password) {
                    
                    const usuario1 = {
                        id: id,
                        username: username,
                        password: password,
                        carrito: []
                    };
                    
                    alert('Se encontró el usuario con el nombre y contraseña específicos.');

                    sessionStorage.setItem('usuario', JSON.stringify(usuario1));
                    sessionStorage.setItem('carrito',JSON.stringify([]));
                    inicioSesionForm.reset();
                    
                    window.location.href = '../html/pagina.html';
                    break;
                }
            }
        }
    });
});




























































/*document.addEventListener("DOMContentLoaded", function() {
    const inicioSesionForm = document.getElementById("inicioSesionForm");

    inicioSesionForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const username = inicioSesionForm.elements.username.value;
        const password = inicioSesionForm.elements.password.value;

        // Verificar si el usuario existe en localStorage
        const usuariosEnLocalStorage = JSON.parse(localStorage.getItem('usuarios')) || [];
        const usuarioExistente = usuariosEnLocalStorage.find(usuario => usuario.username === username);

        if (usuarioExistente && usuarioExistente.password === password) {
            alert("Inicio de sesión exitoso. ¡Bienvenido!");

            // Crear un objeto de usuario con el array del carrito
            const usuarioConCarrito = {
                username: username,
                password: password,
                carrito: []
            };

            // Guardar el objeto del usuario en sessionStorage
            sessionStorage.setItem('usuario', JSON.stringify(usuarioConCarrito));
            sessionStorage.setItem('carrito',JSON.stringify([]));
            inicioSesionForm.reset();
            
            window.location.href = 'pagina.html';

        } else {
            alert("Nombre de usuario o contraseña incorrectos. Inténtalo de nuevo.");
        }
    });
});*/
