// Función para encontrar el número más grande como clave en el localStorage y devolver el siguiente
function obtenerProximaClave() {
    let claves = Object.keys(localStorage);

    // Filtrar solo las claves que son números válidos
    let numeros = claves
        .filter(clave => !isNaN(clave))  // Filtra las claves que no son NaN (no números)
        .map(clave => parseInt(clave, 10));

    // Si no hay claves válidas o todas son menores que 21, devolver 21
    if (numeros.length === 0 || Math.max(...numeros) < 21) {
        return 21;
    }

    // Encontrar el número más grande y sumarle uno
    let maxNumero = Math.max(...numeros);
    return maxNumero + 1;
}

function nuevoProducto() {
    let title1 = document.getElementById('titulo').value;
    let price1 = document.getElementById('precio').value;
    let description1 = document.getElementById('descripcion').value;
    let categoria1 = document.getElementById('categoria').value;
    let imagen1 = document.getElementById('imagen').value;

    // Obtener la próxima clave para el nuevo producto
    let nuevoId = obtenerProximaClave();

    fetch('https://fakestoreapi.com/products', {
        method: "POST",
        body: JSON.stringify({
            id: nuevoId,  // Usa el nuevoId como ID del producto
            title: title1,
            price: price1,
            description: description1,
            image: imagen1,
            category: categoria1
        })
    })
    .then(res => res.json())
    .then(json => {
        // Actualizar las propiedades de json
        json.id = nuevoId;
        json.title = title1;
        json.price = price1;
        json.description = description1;
        json.image = imagen1;
        json.category = categoria1;

        // Usar el nuevoId como clave y guardar en localStorage
        console.log(nuevoId);
        localStorage.setItem(nuevoId.toString(), JSON.stringify(json));
    })
    .catch(error => {
        console.error('Error al obtener datos:', error);
    });
}


