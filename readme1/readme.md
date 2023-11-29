## Función Volver  ----------------------------------------------------->

    lo primero que hago es comprobar si el obgeto con id $parametro existe en el localstorage
    en caso de que no exista entrara en el if comprobara si existe en la api un producto con el id 
    $parametro, si existe uso el metodo delete que me proporciona la api, luego al json que me 
    devuelve le añado el atributo delete = true. en caso de que sea un producto que no esta en la 
    api entrarar en el else, eso significa que el producto esta en el local storage y modificara ese registro

## Función Volver  ----------------------------------------------------->

La función `volver()` se encarga de realizar las siguientes acciones:

1. **Mostrar Preloader:** Muestra un indicador visual para informar al usuario que se está realizando una operación en segundo plano.

2. **Limpiar Cajón de Productos:** Busca el elemento HTML con el id 'cajonProducto' y elimina todos sus elementos hijos.

3. **Mostrar Productos:** Llama a la función `mostrarProductos()` para volver a cargar y mostrar la información de los productos en el cajón correspondiente.

4. **Manejo de Errores:** Captura cualquier error que pueda ocurrir durante la ejecución y lo registra en la consola.

5. **Ocultar Preloader:** Garantiza que el preloader se oculte, independientemente del éxito o fracaso de las operaciones anteriores.

## Método crearElementoProducto ----------------------------------------------------->

El método `crearElementoProducto` se encarga de generar un elemento HTML que representa un producto en el carrito. Acepta los siguientes parámetros:

- `imagenSrc`: La fuente de la imagen del producto.
- `nombreTexto`: El texto del nombre del producto.
- `precioTexto`: El texto que representa el precio del producto.
- `cantidadTexto`: El texto que representa la cantidad del producto (actualmente no utilizado).

Devuelve un elemento `div` con las siguientes subelementos:

- Una imagen (`img`) con la fuente proporcionada.
- Un párrafo (`p`) con el nombre del producto.
- Un párrafo (`p`) con el precio del producto.
- Un párrafo (`p`) con la cantidad del producto.

Este div tiene la clase `productoCarrito` añadida para estilos específicos.

## Método crearElementoProducto ----------------------------------------------------->

La función mostrarProductosCarrito se encarga de mostrar los productos del carrito en el elemento HTML con el id "carrito". Utiliza los datos almacenados en la sesión para obtener la información de cada producto y luego llama a crearElementoProducto para generar la representación HTML del producto.


## Método añadirCarrito ----------------------------------------------------->

El método `añadirCarrito` se encarga de añadir un producto al carrito. Acepta un parámetro:

- `idProducto`: El identificador único del producto que se desea añadir al carrito.

### Funcionamiento:

1. Intenta obtener el producto del almacenamiento local (`localStorage`) utilizando el `idProducto`.
2. Si el producto no está en el almacenamiento local, realiza una solicitud a la API `https://fakestoreapi.com/products/` para obtener los detalles del producto.
   - Si la solicitud es exitosa, agrega el producto al carrito almacenado en la sesión (`sessionStorage`).
   - Redirige a la página 'pagina.html' después de añadir el producto al carrito.
   - Si hay un error en la solicitud, se registra en la consola.
3. Si el producto ya está en el almacenamiento local, simplemente lo agrega al carrito almacenado en la sesión.
   - Redirige a la página 'pagina.html' después de añadir el producto al carrito.

## Método verProducto

El método `verProducto` se encarga de mostrar los detalles de un producto en la interfaz de usuario. Acepta un parámetro:

- `idProducto`: El identificador único del producto que se desea visualizar.

### Funcionamiento:

1. Intenta obtener el producto del almacenamiento local (`localStorage`) utilizando el `idProducto`.
   - Si el producto está presente en el almacenamiento local, se utilizan los datos almacenados para construir la representación del producto.
   - Si el producto no está en el almacenamiento local, se realiza una solicitud a la API `https://fakestoreapi.com/products/` para obtener los detalles del producto.
      - Si la solicitud es exitosa, se utilizan los datos de la API para construir la representación del producto.
      - Si hay un error en la solicitud, se registra en la consola.

2. Limpia el contenido existente en el contenedor con clase "cajon".

3. Limpia el contenido existente en el contenedor con id "cajonProducto".

4. Crea elementos HTML para mostrar la imagen, nombre, precio y descripción del producto.

5. Agrega botones para "Volver", "Borrar" y "Editar". Cada botón tiene un evento asociado que ejecuta la función correspondiente.

6. Añade los elementos creados al contenedor con id "cajonProducto".




## Método hacerCard ----------------------------------------------------->

El método `hacerCard` se encarga de generar y mostrar tarjetas de productos en la interfaz de usuario. Acepta un parámetro:

- `item`: Un array de objetos que representan productos.

### Funcionamiento:

1. Agrega la clase 'cajon' al elemento HTML con la clase "cajon".

2. Para cada elemento en el array `item`:
   - Crea elementos HTML (imagen, párrafos, botones) para representar el producto.
   - Verifica si el producto ya está almacenado en el `localStorage`. Si es así, utiliza los datos almacenados, de lo contrario, utiliza los datos proporcionados en el array `item`.
   - Agrega eventos a los botones para "Ver Producto" y "Añadir al Carrito".

3. Filtra las claves del `localStorage` para obtener solo aquellas que son números y son 21 o mayores.

4. Para cada clave válida obtenida:
   - Obtiene el producto almacenado en el `localStorage`.
   - Si el producto está marcado para ser eliminado, no lo muestra.
   - Crea elementos HTML similares a los mencionados anteriormente y agrega eventos a los botones.

5. Agrega las tarjetas generadas al elemento HTML con la clase "cajon".

## Función mostrarProductos ----------------------------------------------------->

La función `mostrarProductos` se encarga de obtener datos de productos desde la API 'https://fakestoreapi.com/products' y luego llamar a la función `hacerCard` para mostrar esos productos en la interfaz de usuario.

### Funcionamiento:

1. Realiza una solicitud a la API 'https://fakestoreapi.com/products' para obtener datos de productos.

2. Convierte la respuesta a formato JSON.

3. Llama a la función `hacerCard` pasando el array de productos obtenido como argumento.

4. Si hay un error en la solicitud o al procesar los datos, se captura y se registra en la consola.


## Función guardarCarrito ----------------------------------------------------->

La función `guardarCarrito` se encarga de guardar el contenido del carrito en el `localStorage`, asociándolo con un identificador único basado en el usuario y el número de elementos en el carrito. Luego, se reinicia el carrito en la sesión y redirige a la página 'pagina.html'.

### Funcionamiento:

1. Intenta obtener el carrito y el usuario almacenados en la sesión (`sessionStorage`). Si no hay datos, se inicializan como arreglos vacíos.

2. Obtiene el ID del usuario desde el objeto de usuario.

3. Cuenta el número de elementos en el carrito llamando a la función `contarElementosCarrito`.

4. Guarda el carrito en el `localStorage` con una clave única que combina el número de elementos en el carrito y el ID del usuario.

5. Reinicia el carrito en la sesión estableciéndolo como un arreglo vacío.

6. Redirige a la página 'pagina.html'.

7. Si hay un error en el proceso, se captura y se registra en la consola.

## Función contarElementosCarrito ----------------------------------------------------->

La función `contarElementosCarrito` se encarga de contar y devolver el número de elementos en el carrito almacenados en el `localStorage`.

### Funcionamiento:

1. Inicializa un contador en 0.

2. Itera a través de las claves en el `localStorage`.

3. Para cada clave, verifica si comienza con 'carrito'. Si es así, incrementa el contador.

4. Devuelve el valor final del contador.

5. Si hay un error en el proceso, se captura y se registra en la consola, y la función devuelve un valor predeterminado de 1000.

## Función toggleDiv ----------------------------------------------------->


La función `toggleDiv` se encarga de alternar la visibilidad de un elemento HTML con el id "parte_carrito". Si el elemento está oculto, lo muestra; si está visible, lo oculta.

### Funcionamiento:

1. Obtiene el elemento HTML con el id "parte_carrito" utilizando `document.getElementById`.

2. Verifica si la propiedad `visibility` del estilo del elemento es "hidden".
   - Si es "hidden", cambia la propiedad `visibility` a "visible".
   - Si no es "hidden", cambia la propiedad `visibility` a "hidden".

## Función imprimirCarritos  ----------------------------------------------------->

La función `imprimirCarritos` se encarga de mostrar los elementos del carrito de un usuario en la interfaz de usuario. Utiliza datos almacenados en el `localStorage` y realiza solicitudes a la API 'https://fakestoreapi.com/carts/user/' para obtener información adicional.

### Funcionamiento:

1. Intenta obtener el objeto de usuario de la sesión (`sessionStorage`) y extraer su ID.

2. Inicializa un objeto `elementosFiltrados` para almacenar los elementos del carrito que cumplen con un patrón específico.

3. Itera sobre las claves del `localStorage`:
   - Verifica si la clave cumple con el patrón "usuario" seguido de un número al final.
   - Si cumple con el patrón, agrega el elemento al objeto `elementosFiltrados`.

4. Muestra en la consola el objeto `elementosFiltrados` con las claves y elementos filtrados.

5. Itera sobre las claves y elementos de `elementosFiltrados`:
   - Crea un elemento `h3` para mostrar la clave (nombre del carrito) en la interfaz.
   - Por cada elemento asociado a la clave, crea elementos `p` para mostrar el nombre y el precio del producto.
   - Agrega los elementos creados al contenedor con el id 'cajonUser' en el DOM.

6. Intenta obtener datos adicionales del carrito llamando a la API 'https://fakestoreapi.com/carts/user/'.
   - Verifica si hay productos en el carrito.
   - Por cada carrito en la respuesta, obtiene detalles de los productos mediante solicitudes adicionales a la API y los muestra en la interfaz de usuario.

7. Si hay un error en el proceso, se captura y se registra en la consola.

## Función cargarPerfil ----------------------------------------------------->

La función `cargarPerfil` se encarga de mostrar la información del usuario en la interfaz de usuario. Utiliza datos almacenados en la sesión (`sessionStorage`) para obtener el nombre de usuario y la contraseña.

### Funcionamiento:

1. Crea un elemento `div` con la clase 'cajonInfo' para contener la información del usuario.

2. Crea elementos `p` para mostrar el nombre de usuario y la contraseña del usuario.

3. Intenta obtener el objeto de usuario de la sesión (`sessionStorage`).

4. Muestra en la consola la información del usuario, como el nombre de usuario y la contraseña.

5. Asigna el contenido a las propiedades `textContent` de los elementos `p` con la información del usuario.

6. Agrega los elementos `p` al elemento `div` creado.

7. Agrega el elemento `div` al contenedor con el id 'cajonUser' en el DOM.

## Función mostrarCategoriaTodo ----------------------------------------------------->

La función `mostrarCategoriaTodo` se encarga de limpiar el contenido existente en la interfaz de usuario, tanto en el cajón principal como en el cajón de productos, y luego realiza una solicitud a la API 'https://fakestoreapi.com/products' para obtener todos los productos disponibles. Luego, utiliza la función `hacerCard` para mostrar esos productos en la interfaz.

### Funcionamiento:

1. Obtiene el elemento con la clase 'cajon' y elimina todos sus hijos para limpiar el contenido existente.

2. Obtiene el elemento con el id 'cajonProducto' y elimina todos sus hijos para limpiar el contenido existente en el cajón de productos.

3. Realiza una solicitud a la API 'https://fakestoreapi.com/products' para obtener todos los productos.

4. Convierte la respuesta a formato JSON.

5. Llama a la función `hacerCard` pasando el array de productos obtenido como argumento.

## Función hacerCardCategoria ----------------------------------------------------->

La función `hacerCardCategoria` se encarga de generar tarjetas (cards) para productos asociados a una categoría específica. Toma un array de productos y una categoría como parámetros y crea tarjetas HTML para cada producto que pertenezca a la categoría proporcionada. Estas tarjetas se muestran en la interfaz de usuario.

### Parámetros:

- `item`: Un array de objetos que representan productos.
- `categoria`: Una cadena que representa la categoría a la que pertenecen los productos.

### Funcionamiento:

1. Obtiene el elemento con la clase 'cajon'.

2. Itera sobre cada elemento del array de productos (`item`).

   a. Crea elementos HTML para mostrar la imagen, título, precio y un botón "VER PRODUCTO" de cada producto.

   b. Verifica si el producto ya está almacenado en el `localStorage`. Si es así, utiliza los datos almacenados; de lo contrario, utiliza los datos del producto actual.

   c. Configura un evento click para el botón "VER PRODUCTO" que llama a la función `verProducto` con el ID del producto.

   d. Agrega la tarjeta (div) al cajón principal.

3. Obtiene las claves del `localStorage`.

4. Filtra las claves para obtener solo aquellas que son números y mayores o iguales a 21.

5. Itera sobre las claves validas del `localStorage`.

   a. Obtiene el producto asociado a cada clave del `localStorage`.

   b. Verifica si el producto debe ser omitido (delete===true).

   c. Verifica si el producto pertenece a la categoría proporcionada.

   d. Si el producto cumple con las condiciones anteriores, crea y muestra una tarjeta similar a las descritas anteriormente.

