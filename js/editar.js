function getQueryParam(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

async function guardarCampos() {
    try {
        let idProducto = getQueryParam('idProducto');/*para obetener el id del usuario de la url*/
        let title1 = document.getElementById('title').value;
        let price1 = document.getElementById('price').value;
        let description1 = document.getElementById('description').value;

        console.log(title1);
        console.log(price1);
        console.log(description1);
        console.log(idProducto);

        let productoExistente = JSON.parse(localStorage.getItem(idProducto));

        if (productoExistente !== null) {
            // Guardar la imagen actual antes de actualizar el producto
            let imagenActual = productoExistente.image;

            // Actualizar producto existente
            productoExistente.title = title1;
            productoExistente.price = price1;
            productoExistente.description = description1;

            // Restaurar la imagen original al producto actualizado
            productoExistente.image = imagenActual;

            localStorage.setItem(idProducto, JSON.stringify(productoExistente));
        } else {
            // Crear nuevo producto
            const response = await fetch(`https://fakestoreapi.com/products/${idProducto}`);
            const json = await response.json();

            // Solo actualiza los campos específicos que deseas
            productoExistente = {
                id: json.id,
                title: title1,
                price: price1,
                description: description1,
                // Mantén otros campos inalterados
                image: json.image,
                category: json.category,
            };

            localStorage.setItem(idProducto, JSON.stringify(productoExistente));
        }

        // Redirigir después de que la operación asincrónica se haya completado
        window.location.href = '../html/pagina.html';
    } catch (error) {
        console.error('Error:', error);
    }

    // Evitar que el formulario se envíe y recargue la página
    return false;
}





  


