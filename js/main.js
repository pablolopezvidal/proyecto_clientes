/*---------MOSTRAR PANTALLA DE CARGA----OK------------------------------------------------------------------------------------------------------------*/

const preloader = document.getElementById("preloader");

function mostrarPreloader() {
    preloader.classList.add("active");
}

function ocultarPreloader() {
    preloader.classList.remove("active");
}

ocultarPreloader();

/*---------FUNCION DEL BONTON BORRAR-------con try catch---------------------------------------------------------------------------------------------------------*/

function borrar(idProducto) {

    mostrarPreloader();

    let productoExistente = JSON.parse(localStorage.getItem(idProducto));

    if (!productoExistente) {
        console.log("borrado");

        try {
            fetch(`https://fakestoreapi.com/products/${idProducto}`, {
                method: "DELETE"
            })
                .then(res => res.json())
                .then(json => {
                    // Añadir el atributo 'delete' al objeto JSON y guardarlo en el localStorage
                    json.delete = true;
                    localStorage.setItem(idProducto, JSON.stringify(json));
                    window.location.href = '../html/pagina.html';
                })
                .catch(error => {
                    console.error('Error al obtener datos:', error);
                })
                .finally(() => {
                    ocultarPreloader();
                });
        } catch (error) {
            console.error('Error in fetch operation:', error);
            ocultarPreloader();
        }
    } else {
        // Añadir el atributo 'delete' al objeto JSON y guardarlo en el localStorage
        productoExistente.delete = true;
        localStorage.setItem(idProducto, JSON.stringify(productoExistente));
        window.location.href = '../html/pagina.html';
        ocultarPreloader();
    }
}


/*---------FUNCION DEL BONTON VOLVER----con try catch------------------------------------------------------------------------------------------------------------*/


function volver() {
    mostrarPreloader();

    try {
        let cajonProducto = document.getElementById('cajonProducto');
        while (cajonProducto.firstChild) {
            cajonProducto.removeChild(cajonProducto.firstChild);
        }

        mostrarProductos();
    } catch (error) {
        console.error('Error in volver function:', error);
    } finally {
        ocultarPreloader();
    }
}



/*---------FUNCION MOSTRAR PRODUCTOS EN EL CARRO--con try catch--------------------------------------------------------------------------------------------------------------*/


function crearElementoProducto(imagenSrc, nombreTexto, precioTexto, cantidadTexto, idProducto) {
    const divElement = document.createElement('div');
    const imagen = document.createElement('img');
    const nombre = document.createElement('p');
    const precio = document.createElement('p');
    const cantidad = document.createElement('p');
    const botonEliminar = document.createElement('button');

    divElement.classList.add('productoCarrito');

    imagen.src = imagenSrc;
    nombre.textContent = nombreTexto;
    precio.textContent = precioTexto;
    cantidad.textContent = cantidadTexto;

    botonEliminar.textContent = 'Eliminar';
    botonEliminar.addEventListener('click', () => eliminarProductoCarrito(idProducto));

    divElement.appendChild(imagen);
    divElement.appendChild(nombre);
    divElement.appendChild(precio);
    divElement.appendChild(cantidad);
    divElement.appendChild(botonEliminar);

    return divElement;
}

// Función para eliminar un producto del carrito
function eliminarProductoCarrito(idProducto) {
    // Elimina el producto del carrito y actualiza la vista
    let carrito = JSON.parse(sessionStorage.getItem("carrito")) || [];
    let index = carrito.findIndex(elemento => elemento.id === idProducto);/*busca el primer elemento con dicho indice */

    if (index !== -1) {/*si es algo diferente de menos 1 es que lo ha encontrado y lo borra*/
        carrito.splice(index, 1);
        sessionStorage.setItem("carrito", JSON.stringify(carrito));
        mostrarProductosCarrito();/*vuelvo a mostrar el carrito de nuevo*/
    }
}

// Función principal para mostrar productos en el carrito
async function mostrarProductosCarrito() {
    let carrito = JSON.parse(sessionStorage.getItem("carrito"));
    const carritohtml = document.getElementById("carrito");

    // Limpiar el contenido existente antes de mostrar los productos
    carritohtml.innerHTML = '';

    carrito.forEach(async (elemento) => {
        try {
            let idProducto = elemento.id;

            if (!localStorage.getItem(idProducto)) {
                const res = await fetch(`https://fakestoreapi.com/products/${idProducto}`);
                const data = await res.json();
                const productoElemento = crearElementoProducto(data.image, data.title, data.price, "", idProducto);
                carritohtml.appendChild(productoElemento);
            } else {
                const producto = JSON.parse(localStorage.getItem(idProducto));
                const productoElemento = crearElementoProducto(producto.image, producto.title, producto.price, "", idProducto);
                carritohtml.appendChild(productoElemento);
            }
        } catch (error) {
            console.error('Error al mostrar productos en el carrito:', error);
        }
    });
}




/*
function crearElementoProducto(imagenSrc, nombreTexto, precioTexto, cantidadTexto) {
    const divElement = document.createElement('div');
    const imagen = document.createElement('img');
    const nombre = document.createElement('p');
    const precio = document.createElement('p');
    const cantidad = document.createElement('p');
    divElement.classList.add('productoCarrito');

    imagen.src = imagenSrc;
    nombre.textContent = nombreTexto;
    precio.textContent = precioTexto;
    cantidad.textContent = cantidadTexto;

    divElement.appendChild(imagen);
    divElement.appendChild(nombre);
    divElement.appendChild(precio);
    divElement.appendChild(cantidad);

    return divElement;
}
*/
// Función principal para mostrar productos en el carrito
/*
async function mostrarProductosCarrito() {
    let carrito = JSON.parse(sessionStorage.getItem("carrito"));
    const carritohtml = document.getElementById("carrito");

    carrito.forEach(async (elemento) => {
        try {
            let idProducto = elemento.id;

            if (!localStorage.getItem(idProducto)) {
                const res = await fetch(`https://fakestoreapi.com/products/${idProducto}`);
                const data = await res.json();
                const productoElemento = crearElementoProducto(data.image, data.title, data.price, "");
                carritohtml.appendChild(productoElemento);
            } else {
                const producto = JSON.parse(localStorage.getItem(idProducto));
                const productoElemento = crearElementoProducto(producto.image, producto.title, producto.price, "");
                carritohtml.appendChild(productoElemento);
            }
        } catch (error) {
            console.error('Error al mostrar productos en el carrito:', error);
        }
    });
}
*/
/*---------FUNCION AÑADIR PRODUCTO AL CARRITO----con try catch------------------------------------------------------------------------------------------------------------*/

function añadirCarrito(idProducto) {
    try {
        let producto = JSON.parse(localStorage.getItem(idProducto));

        if (!producto) {
            fetch(`https://fakestoreapi.com/products/${idProducto}`)
                .then(res => res.json())
                .then(data => {
                    let carrito = JSON.parse(sessionStorage.getItem('carrito')) || [];
                    carrito.push(data);
                    sessionStorage.setItem('carrito', JSON.stringify(carrito));
                    window.location.href = '../html/pagina.html';
                })
                .catch(error => {
                    console.error('Error al obtener datos del producto:', error);
                });
        } else {
            let carrito = JSON.parse(sessionStorage.getItem('carrito')) || [];
            carrito.push(producto);
            sessionStorage.setItem('carrito', JSON.stringify(carrito));
            window.location.href = '../html/pagina.html';
        }
    } catch (error) {
        console.error('Error en la función añadirCarrito:', error);
    }
}

/*---------VER PRODUCTO INDIVIDUAL----------------------------------------------------------------------------------------------------------------*/

function verProducto(idProducto) {

    let producto = JSON.parse(localStorage.getItem(idProducto));

    let cajon = document.querySelector(".cajon");

    while (cajon.firstChild) {
        cajon.removeChild(cajon.firstChild);
    }
    
    // Limpiar el contenido existente en el cajonProducto
    let cajonProducto = document.getElementById('cajonProducto');
    while (cajonProducto.firstChild) {
        cajonProducto.removeChild(cajonProducto.firstChild);
    }
    
    // Crear elementos y agregarlos al cajonProducto
    const divElement = document.createElement('div');
    const imagen = document.createElement('img')
    const texto1 = document.createElement('p');
    const texto2 = document.createElement('p');
    const texto3 = document.createElement('p');

        /*boton para volver atras*/
  
        const botonVolver = document.createElement('div');
        const textobotonVolver = document.createElement('p');
        textobotonVolver.textContent="VOLVER"
        botonVolver.appendChild(textobotonVolver);
        botonVolver.classList.add('botonProducto');
    
        botonVolver.addEventListener('click', function() {
            volver(idProducto);
        });
    
        /*boton para borrar*/
    
        const botonBorrar = document.createElement('div');
        const texto3botonBorrar = document.createElement('p');
        texto3botonBorrar.textContent="BORRAR"
        botonBorrar.appendChild(texto3botonBorrar);
        botonBorrar.classList.add('botonProducto');

        botonBorrar.addEventListener('click', function() {
            borrar(idProducto)
        });
    
        /*boton para editar*//*en vez de hacer un boton creo aqui un formulario y desde aqui le hago que al enviarlo haga la funcion de editar y le pedo pasar el id que es el probleema que tenia si hacia el formulario en el otro html que ahi no tengo el id que necesit psarle a la funcion*/
    
        const botonEditar = document.createElement('div');
        const texto3botonEditar = document.createElement('p');
        texto3botonEditar.textContent="EDITAR"
        botonEditar.appendChild(texto3botonEditar);
        botonEditar.classList.add('botonProducto');
    
        botonEditar.addEventListener('click', function() {
            
            const editarURL = `../html/editar.html?idProducto=${idProducto}`;
            window.location.href = editarURL;

        });
        console.log(producto);
        if(producto !== null){
            imagen.src = producto.image;
            texto1.textContent = producto.title;
            texto2.textContent = producto.price+"€";
            texto3.textContent = producto.description;
        } else {
            fetch(`https://fakestoreapi.com/products/${idProducto}`)
                .then(res => res.json())
                .then(data => {
                    // Accede a las propiedades del objeto data dentro de este bloque
                    imagen.src = data.image;
                    texto1.textContent = data.title;
                    texto2.textContent ="Precio: "+data.price+" €";
                    texto3.textContent = data.description;
                })
                .catch(error => {
                    console.error('Error al obtener datos:', error);
                });
        }
        
        const fotoYnombre = document.createElement('div');
        const descripcionYprecio = document.createElement('div');
        const botones = document.createElement('div');
        
        fotoYnombre.appendChild(imagen);
        fotoYnombre.appendChild(texto1);

        descripcionYprecio.appendChild(texto2);
        descripcionYprecio.appendChild(texto3);

        botones.appendChild(botonVolver);
        botones.appendChild(botonBorrar);
        botones.appendChild(botonEditar);

        descripcionYprecio.appendChild(botones)

        divElement.appendChild(fotoYnombre);
        divElement.appendChild(descripcionYprecio);

        imagen.style.width = '70%';
        imagen.style.height = '70%';
        divElement.classList.add('tarjetaProducto');
        fotoYnombre.classList.add('contenidoProducto');
        descripcionYprecio.classList.add('contenidoProducto');
        botones.classList.add('contenidoBotones');
        cajonProducto.appendChild(divElement);
        
}

/*---------METODO PARA CREAR TODAS LAS CARTAS----------------------------------------------------------------------------------------------------------------*/

function hacerCard(item) {
    
    const cajon = document.querySelector(".cajon");
    const cajaPrincipal = document.getElementById("parte_primcipal");

    
    cajon.classList.add('cajon');
    
    item.forEach(item => {
            
        const divElement = document.createElement('div');
        const imagen = document.createElement('img')
        const texto1 = document.createElement('p');
        const texto2 = document.createElement('p');
        const texto3 = document.createElement('p');
        const botonProducto = document.createElement('div');
        const botonCarrito = document.createElement('div');
        const textoBoton = document.createElement('p');
        const textoBoton2 = document.createElement('p');
        textoBoton.textContent="VER PRODUCTO";
        textoBoton2.textContent="AÑADIR";
        let idProducto = null;    

        const storedItem = JSON.parse(localStorage.getItem(item.id));

        if (storedItem!==null) {
            if(storedItem.delete == true){
                return;
            }
            imagen.src = storedItem.image;
            texto1.textContent = storedItem.title;
            texto3.textContent = storedItem.price;
            idProducto = storedItem.id;

        } else{
    
            imagen.src = item.image;
            texto1.textContent = item.title;
            texto3.textContent = item.price;
            idProducto = item.id;

        }

        imagen.style.width = '70%';
        imagen.style.height = '70%';
        divElement.classList.add('tarjeta');
        botonProducto.classList.add('botonProducto');
        botonCarrito.classList.add('botonProducto');

        divElement.appendChild(imagen);
        divElement.appendChild(texto1);
        divElement.appendChild(texto2);
        divElement.appendChild(texto3);
        divElement.appendChild(botonProducto);
        botonProducto.appendChild(textoBoton);
        botonCarrito.appendChild(textoBoton2);
        divElement.appendChild(botonCarrito);

        botonProducto.addEventListener('click', function() {
            verProducto(idProducto);
        });

        botonCarrito.addEventListener('click', function() {
            añadirCarrito(idProducto);
        });
        
        cajon.appendChild(divElement);
    });

    const clavesLocalStorage = Object.keys(localStorage);

    // Filtrar las claves que son números y son 21 o mayores
    const clavesValidas = clavesLocalStorage
    .filter(clave => !isNaN(clave))
    .filter(clave => parseInt(clave) >= 21);

    console.log(clavesValidas)

    clavesValidas.forEach(clave => {
        
            const producto = JSON.parse(localStorage.getItem(clave));

            if(producto.delete===true){
                return;
            }

            const divElement = document.createElement('div');
            const imagen = document.createElement('img')
            const texto1 = document.createElement('p');
            const texto2 = document.createElement('p');
            const texto3 = document.createElement('p');
            const botonProducto = document.createElement('div');
            const botonCarrito = document.createElement('div');
            const textoBoton = document.createElement('p');
            const textoBoton2 = document.createElement('p');
            textoBoton.textContent="VER PRODUCTO";
            textoBoton2.textContent="AÑADIR";
            let idProducto = null;    
        
            imagen.src = producto.image;
            texto1.textContent = producto.title;
            texto3.textContent = producto.price;
            idProducto = producto.id;

            imagen.style.width = '70%';
            imagen.style.height = '70%';
            divElement.classList.add('tarjeta');
            botonProducto.classList.add('botonProducto');
            botonCarrito.classList.add('botonProducto');
    
            divElement.appendChild(imagen);
            divElement.appendChild(texto1);
            divElement.appendChild(texto2);
            divElement.appendChild(texto3);
            divElement.appendChild(botonProducto);
            botonProducto.appendChild(textoBoton);
            botonCarrito.appendChild(textoBoton2);
            divElement.appendChild(botonCarrito);
    
            botonProducto.addEventListener('click', function() {
                verProducto(idProducto);
            });

            botonCarrito.addEventListener('click', function() {
                añadirCarrito(idProducto);
            });
            
            cajon.appendChild(divElement);
        });



    /*AHORA SI PUEDO HACER LA MODIFICACION DE MOSTRAR LOS PRODUCTOS NUEVOS PORQUE EL APARTADO POR CATEGORIAS NO USA ESTE METODO*/
}

/*---------METODO PARA IMPRIMIR TODAS LAS CARTAS---con try catch-------------------------------------------------------------------------------------------------------------*/

function mostrarProductos() {
    try {
        fetch('https://fakestoreapi.com/products')
            .then(res => res.json())
            .then(json => hacerCard(json))
            .catch(error => {
                console.error('Error al obtener datos de la API:', error);
            });
    } catch (error) {
        console.error('Error en la función mostrarProductos:', error);
    }
}

/*---------METODO PARA MOSTRAR LAS CARTAS POR CATEGORIA----------------------------------------------------------------------------------------------------------------*/

let enlaceTodo = document.getElementById("todo");
let enlaceHombre = document.getElementById("hombre");
let enlaceMujer = document.getElementById("mujer");
let enlaceTeclogia = document.getElementById("tecnologia");
let enlaceJoyas = document.getElementById("joyas");

enlaceTodo.addEventListener("click", mostrarCategoriaTodo);
enlaceHombre.addEventListener("click", mostrarCategoriaHombre);
enlaceMujer.addEventListener("click", mostrarCategoriaMujer);
enlaceJoyas.addEventListener("click", mostrarCategoriaJoyas);
enlaceTeclogia.addEventListener("click", mostrarCategoriaTech);

function mostrarCategoriaTodo() {
    
    let cajon = document.querySelector(".cajon");

    while (cajon.firstChild) {
        cajon.removeChild(cajon.firstChild);
    }

    // Limpiar el contenido existente en el cajonProducto
    let cajonProducto = document.getElementById('cajonProducto');
    while (cajonProducto.firstChild) {
        cajonProducto.removeChild(cajonProducto.firstChild);
    }

    fetch('https://fakestoreapi.com/products')
    .then(res => res.json())
    .then(json => hacerCard(json));
}

function mostrarCategoriaHombre() {
    
    let cajon = document.querySelector(".cajon");

    while (cajon.firstChild) {
        cajon.removeChild(cajon.firstChild);
    }

    
    // Limpiar el contenido existente en el cajonProducto
    let cajonProducto = document.getElementById('cajonProducto');
    while (cajonProducto.firstChild) {
        cajonProducto.removeChild(cajonProducto.firstChild);
    }

    fetch('https://fakestoreapi.com/products/category/men\'s clothing')
    .then(res => res.json())
    .then(json => hacerCardCategoria(json,"men\'s clothing"));

}

function mostrarCategoriaMujer() {
    
    let cajon = document.querySelector(".cajon");

    while (cajon.firstChild) {
        cajon.removeChild(cajon.firstChild);
    }

    // Limpiar el contenido existente en el cajonProducto
    let cajonProducto = document.getElementById('cajonProducto');
    while (cajonProducto.firstChild) {
        cajonProducto.removeChild(cajonProducto.firstChild);
    }

    fetch('https://fakestoreapi.com/products/category/women\'s clothing')
    .then(res => res.json())
    .then(json => hacerCardCategoria(json,"women\'s clothing"));

}

function mostrarCategoriaJoyas() {
    
    let cajon = document.querySelector(".cajon");

    while (cajon.firstChild) {
        cajon.removeChild(cajon.firstChild);
    }

    // Limpiar el contenido existente en el cajonProducto
    let cajonProducto = document.getElementById('cajonProducto');
    while (cajonProducto.firstChild) {
        cajonProducto.removeChild(cajonProducto.firstChild);
    }

    fetch('https://fakestoreapi.com/products/category/jewelery')
    .then(res => res.json())
    .then(json => hacerCardCategoria(json,"jewelry"));

}

function mostrarCategoriaTech() {
    
    let cajon = document.querySelector(".cajon");

    while (cajon.firstChild) {
        cajon.removeChild(cajon.firstChild);
    }

    // Limpiar el contenido existente en el cajonProducto
    let cajonProducto = document.getElementById('cajonProducto');
    while (cajonProducto.firstChild) {
        cajonProducto.removeChild(cajonProducto.firstChild);
    }

    fetch('https://fakestoreapi.com/products/category/electronics')
    .then(res => res.json())
    .then(json => hacerCardCategoria(json,"electronics"));

}

/*----------HACER CARTAS PARA CUANDO SE MUESTRAN POR CATEGORIA----------------------------------------------------------------------------------------------------------------*/

function hacerCardCategoria(item,categoria) {
    
    const cajon = document.querySelector(".cajon");

    
    cajon.classList.add('cajon');
    
    item.forEach(item => {
            
        const divElement = document.createElement('div');
        const imagen = document.createElement('img')
        const texto1 = document.createElement('p');
        const texto2 = document.createElement('p');
        const texto3 = document.createElement('p');
        const botonProducto = document.createElement('div');
        const textoBoton = document.createElement('p');
        textoBoton.textContent="VER PRODUCTO";
        let idProducto = null;

        const storedItem = JSON.parse(localStorage.getItem(item.id));

        if (storedItem!==null) {
            if(storedItem.delete == true){
                return;
            }
            imagen.src = storedItem.image;
            texto1.textContent = storedItem.title;
            texto3.textContent = storedItem.price;
            idProducto = storedItem.id;

        } else{
    
            imagen.src = item.image;
            texto1.textContent = item.title;
            texto3.textContent = item.price;
            idProducto = item.id;

        }

        imagen.style.width = '70%';
        imagen.style.height = '70%';
        divElement.classList.add('tarjeta');
        botonProducto.classList.add('botonProducto');

        divElement.appendChild(imagen);
        divElement.appendChild(texto1);
        divElement.appendChild(texto2);
        divElement.appendChild(texto3);
        divElement.appendChild(botonProducto);
        botonProducto.appendChild(textoBoton);

        botonProducto.addEventListener('click', function() {
            verProducto(idProducto);
        });
        
        cajon.appendChild(divElement);
    });

    const clavesLocalStorage = Object.keys(localStorage);

    // Filtrar las claves que son números y son 21 o mayores
    const clavesValidas = clavesLocalStorage
    .filter(clave => !isNaN(clave))
    .filter(clave => parseInt(clave) >= 21);

    console.log(clavesValidas)

    clavesValidas.forEach(clave => {
        
        const producto = JSON.parse(localStorage.getItem(clave));

        if(producto.delete===true){
            return
        }
        if(producto.category===categoria){
            const divElement = document.createElement('div');
            const imagen = document.createElement('img')
            const texto1 = document.createElement('p');
            const texto2 = document.createElement('p');
            const texto3 = document.createElement('p');
            const botonProducto = document.createElement('div');
            const textoBoton = document.createElement('p');
            textoBoton.textContent="VER PRODUCTO";
            let idProducto = null;    
        
            imagen.src = producto.image;
            texto1.textContent = producto.title;
            texto3.textContent = producto.price;
            idProducto = producto.id;

            imagen.style.width = '70%';
            imagen.style.height = '70%';
            divElement.classList.add('tarjeta');
            botonProducto.classList.add('botonProducto');
    
            divElement.appendChild(imagen);
            divElement.appendChild(texto1);
            divElement.appendChild(texto2);
            divElement.appendChild(texto3);
            divElement.appendChild(botonProducto);
            botonProducto.appendChild(textoBoton);
    
            botonProducto.addEventListener('click', function() {
                verProducto(idProducto);
            });
        
                cajon.appendChild(divElement);
        }else{
            return
        } 
    })
}

/*GUARDAR CARRITO-------con try catch----------------------------------------------------------------------------------------------------------------------------------> que el boton aparezca cuadno al guardar los elementos en un array sea .leght > 0*//*ESTA DOCUMENTADO HASTA AQUÍ*/

function guardarCarrito() {
    try {
        let carrito = JSON.parse(sessionStorage.getItem('carrito')) || [];
        let usuario = JSON.parse(sessionStorage.getItem('usuario')) || [];

        let usuarioID = usuario.id;
        let numeroCarrito = contarElementosCarrito();
        localStorage.setItem(`carrito${numeroCarrito},usuario${usuarioID}`, JSON.stringify(carrito));
        sessionStorage.setItem("carrito", "[]");
        window.location.href = '../html/pagina.html';
    } catch (error) {
        console.error('Error en la función guardarCarrito:', error);
    }
}

function contarElementosCarrito() {
    try {
        let contador = 0;
        for (let i = 0; i < localStorage.length; i++) {
            const clave = localStorage.key(i);
            if (clave && clave.startsWith('carrito')) {
                contador++;
            }
        }
        return contador;
    } catch (error) {
        console.error('Error en la función contarElementosCarrito:', error);
        return 1000; 
    }
}

/*ocultar carrito y desocultar--------------------------------------------------------------------------------------------------------------------------------------*/

function toggleDiv() {
    const divElement = document.getElementById("parte_carrito");
    if (divElement.style.visibility === "hidden") {
      divElement.style.visibility = "visible ";
    } else {
      divElement.style.visibility = "hidden";
    }
}
  
const enlace = document.getElementById("botonCarrito");
enlace.addEventListener("click", toggleDiv);

/*perfil usuario --------------------------------------------------------------------------------------------------------------------------------------------*/

const miDiv = document.getElementById('botonPerfil');
miDiv.addEventListener('click', function() {
    window.location.href = 'perfil.html';
});

/*imprimir los carritos en el perfil---con try catchs---------------------------------------------------------------------------------------------------*/

function imprimirCarritos() {
    try {
        let usuarioString = sessionStorage.getItem('usuario');
        let usuarioObjeto = JSON.parse(usuarioString);
        let idUsuario = usuarioObjeto.id;

        // Inicializar un objeto para almacenar los elementos que cumplen con el patrón
        let elementosFiltrados = {};

        // Iterar sobre las claves del localStorage
        for (let i = 0; i < localStorage.length; i++) {
            let clave = localStorage.key(i);

            // Verificar si la clave cumple con el patrón "usuario" seguido de un número al final
            let patron = new RegExp(`usuario${idUsuario}$`);
            if (patron.test(clave)) {
                // Si cumple con el patrón, agregar al objeto elementosFiltrados
                elementosFiltrados[clave] = JSON.parse(localStorage.getItem(clave));
            }
        }

        console.log(elementosFiltrados);

        // Iterar sobre las claves del objeto elementosFiltrados
        Object.keys(elementosFiltrados).forEach(key => {
            const carro = document.createElement('h3');
            carro.textContent = key;

            const elemento = elementosFiltrados[key];
            console.log(elemento);
            const divElement = document.createElement('div');
            divElement.classList.add('productoCarritosUSer');
            divElement.appendChild(carro);

            elemento.forEach(el => {
                const nombre = document.createElement('p');
                const precio = document.createElement('p');
                divElement.classList.add('productoCarrito');

                // Asignar el contenido a las propiedades textContent de los elementos p
                console.log(el.title);
                console.log(el.price);
                nombre.textContent = el.title + "    " + el.price + "€";

                // Agregar elementos p al div
                divElement.appendChild(nombre);
            });

            // Agregar el div al contenedor con el id 'cajonUsusario'
            let cajonUsuario = document.getElementById('cajonUser');
            cajonUsuario.appendChild(divElement);
        });
    } catch (error) {
        console.error('Error en la función imprimirCarritos:', error);
    }

    let usuarioString = sessionStorage.getItem('usuario');
    let usuarioObjeto = JSON.parse(usuarioString);
    let idUsuario = usuarioObjeto.id;
    fetch(`https://fakestoreapi.com/carts/user/${idUsuario}`)
    .then(res => res.json())
    .then(json => {

        // Verifica si hay productos en el carrito
        if (json.length > 0) {
            json.forEach(element => {
                
                const divElement = document.createElement('div');
                divElement.classList.add('productoCarritosUSer');
                console.log("----*----")
                console.log(element)
                
                element.products.forEach(el => {
                    const productoElement = document.createElement('div');
                    productoElement.classList.add('productoCarrito');
        
                    // Crear elementos p para mostrar el nombre y el precio
                    const nombre = document.createElement('p');
                    const precio = document.createElement('p');
        
                    // Asignar el contenido a las propiedades textContent de los elementos p

                    console.log(el.productId);
                    console.log(el.quantity);
                    id=el.productId

                    fetch(`https://fakestoreapi.com/products/${id}`)
                    .then(res => res.json())
                    .then(json => {
                        console.log(json);  // Puedes usar json.title y el.quantity aquí

                        nombre.textContent = json.title;
                        precio.textContent = "cantidad"+el.quantity;
                    });

                    // Agregar elementos p al div del producto
                    productoElement.appendChild(nombre);
                    productoElement.appendChild(precio);
        
                    // Agregar el div del producto al div general
                    divElement.appendChild(productoElement);
                });
        
                // Agregar el div general al contenedor en el DOM
                let cajonUsuario = document.getElementById('cajonUser');
                cajonUsuario.appendChild(divElement);
            });
        }else {
            console.log('El carrito está vacío.');
        }
    })
    .catch(error => {
        console.error('Error al obtener datos del carrito:', error);
    });

}

/*cargar datos del usuario*/

function cargarPerfil(){

    const cajonInfo = document.createElement('div');
    cajonInfo.classList.add('cajonInfo'); 
    const nombre = document.createElement('p');
    const contraseña = document.createElement('p');
    const direccion = document.createElement('p');
    
    let usuarioString = JSON.parse(sessionStorage.getItem('usuario'));

    console.log(usuarioString)
    console.log(usuarioString.username)
    console.log(usuarioString.password)

    nombre.textContent = "NOMBRE DE USUARIO: "+usuarioString.username
    contraseña.textContent = "CONTRASEÑA: "+usuarioString.password

    cajonInfo.appendChild(nombre)
    cajonInfo.appendChild(contraseña)

    let cajonUsuario = document.getElementById('cajonUser');
    cajonUsuario.appendChild(cajonInfo)

}
























/*-------------------*/


/*
import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js';
*/
/*
class ProductoElement extends LitElement {

    static styles = css`
        *//* Estilos para tu elemento aquí *//*
        .productoCarrito {
            /* Agrega tus estilos para el contenedor del producto *//*
        }
    `;

    render() {
        return html`
            <div class="productoCarrito">
                <img src="${this.imagenSrc}" alt="Producto">
                <p>${this.nombreTexto}</p>
                <p>${this.precioTexto}</p>
                <p>${this.cantidadTexto}</p>
            </div>
        `;
    }

    static get properties() {
        return {
            imagenSrc: { type: String },
            nombreTexto: { type: String },
            precioTexto: { type: String },
            cantidadTexto: { type: String }
        };
    }
}

customElements.define('producto-element', ProductoElement);
*/



/*LO UNICO QUE TOQEU FUE LO DEL LIT ELEMENT QUE YA HE COMENTADO Y NO DEJABA INICIAR SESION PORQUE SIEMPRE 
LA X ERA TRUE ENTONCES LO HE CAMBIADO A FALSE Y YA NO MODIFIQEU MAS NADA */


/*POSE LA LINEA SCRIPT EN EL MAIN */
/*PUSE EL CODIGO DEL LIT */
/*COMENTE LO QUE LO SUSTITUIA*/
/* COMENTE EL LIT Y DESCOMENTE EL METODO QUE COMENTE*/