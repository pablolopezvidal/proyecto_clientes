function getQueryParam(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}


/*tenia qie hacer doble clcik uno para que se guardara y el otro para que redirigera y chat gpt me dijo que la solucion era por asinc en la funcion*/

/*explicacion para entenderlo en el futuro, copio y pego explicacion chat gpt*/
/*El problema puede estar relacionado con el manejo de eventos y la asincronía de las operaciones. 
La función guardarCampos está haciendo una solicitud fetch, que es asíncrona, y al mismo tiempo está 
actualizando el localStorage y redirigiendo a otra página. Es posible que la redirección esté ocurriendo 
antes de que la actualización del localStorage y la solicitud fetch se completen.Puedes intentar hacer que 
toda la lógica de actualización del producto y la redirección se realice después de que la solicitud fetch 
se haya completado. Puedes hacer esto moviendo la lógica de redirección dentro del bloque then de la promesa 
fetch. Además, puedes utilizar async/await para simplificar el manejo de la asincronía. Aquí hay una versión 
modificada de tu código:*/

/*Esta versión utiliza async/await para hacer que el código sea más legible y manejar la asincronía de una manera más clara. 
La redirección se realiza después de que la lógica asíncrona se haya completado.*/

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





  


