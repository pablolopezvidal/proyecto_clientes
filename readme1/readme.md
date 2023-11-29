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

# Documentación del Método de Registro---------------->

Este script JavaScript maneja el registro de usuarios en una aplicación web a través de un formulario. A continuación, se describe el funcionamiento del método.

# Flujo de Registro

 1. Obtención de Datos del Formulario:

Captura el evento de envío del formulario y evita la recarga de la página.
Recupera el nombre de usuario y la contraseña ingresados por el usuario.

2. Verificación en la API Externa:

-Realiza una solicitud a 'https://fakestoreapi.com/users' para obtener usuarios existentes.
-Compara el nombre de usuario ingresado con los nombres de usuario en la API externa.
-Si hay una coincidencia, muestra una alerta y establece una bandera (x) en verdadero.

3. Verificación en Usuarios Locales:

Obtiene todos los usuarios registrados localmente.
Comprueba si hay algún usuario local con el mismo nombre de usuario.
Si existe un usuario local o la bandera x está activada, muestra una alerta indicando que el nombre de usuario ya está registrado.

4. Proceso de Registro:

Si no hay conflictos, obtiene el siguiente ID único para el nuevo usuario.
Crea un nuevo objeto de usuario con el ID, nombre de usuario, contraseña y una lista de carritos vacía.
Almacena el nuevo usuario en el almacenamiento local del navegador.
Muestra una alerta de registro exitoso y restablece el formulario.
Funciones Auxiliares

obtenerUsuariosRegistrados()
Obtiene todos los usuarios registrados localmente. Utiliza el almacenamiento local y devuelve un array de objetos de usuario.

obtenerNuevoUsuarioId()
Calcula y devuelve el siguiente ID único para un nuevo usuario. Utiliza el almacenamiento local para realizar un seguimiento del último ID utilizado.

5. Manejo de Errores
El script incluye manejo básico de errores, registrando mensajes de error en la consola. Puedes personalizar el manejo de errores según tus necesidades.

## Script de Inicio de Sesión----------------->

Este script maneja el formulario de inicio de sesión en tu aplicación web. Se ejecuta cuando el documento HTML está completamente cargado (`DOMContentLoaded`). El script utiliza la API 'https://fakestoreapi.com/users' y también verifica los usuarios almacenados localmente en el `localStorage`.

### Funcionamiento:

1. Escucha el evento 'DOMContentLoaded' para asegurarse de que el documento HTML esté completamente cargado antes de ejecutar el script.

2. Obtiene el formulario de inicio de sesión del documento.

3. Agrega un evento 'submit' al formulario para manejar el envío del formulario.

4. Previne el comportamiento predeterminado del formulario para evitar la recarga de la página.

5. Obtiene los valores del nombre de usuario y contraseña del formulario.

6. Realiza una solicitud a la API 'https://fakestoreapi.com/users' para obtener la lista de usuarios disponibles.

7. Itera sobre la lista de usuarios de la API para verificar si el usuario y la contraseña proporcionados coinciden con alguno de los usuarios.

8. Si se encuentra un usuario válido en la API, establece la información del usuario en la sesión (`sessionStorage`), restablece el formulario y redirige a la página principal.

9. Itera sobre los usuarios almacenados localmente en el `localStorage` para buscar coincidencias.

10. Si se encuentra un usuario válido en el `localStorage`, realiza acciones similares a las descritas anteriormente.

11. Si no se encuentra ningún usuario válido, muestra un mensaje de error.

## Función `guardarCampos`------>

La función `guardarCampos` se encarga de actualizar o crear un producto en el almacenamiento local (`localStorage`) basado en la información proporcionada en un formulario de edición. La función se utiliza en el contexto de la edición de un producto existente.

### Parámetros:
- Ninguno.

### Funcionamiento:

1. **Obtención de Parámetros:** Utiliza la función `getQueryParam` para obtener el identificador único del producto (`idProducto`) de la URL.

2. **Obtención de Datos del Formulario:** Recolecta los valores del formulario de edición, incluyendo `title`, `price`, y `description`.

3. **Verificación de Existencia del Producto:** Verifica si ya existe un producto con el `idProducto` en el `localStorage`.

4. **Actualización o Creación del Producto:**
   - Si el producto existe, actualiza sus campos específicos (`title`, `price`, y `description`) mientras mantiene otros campos inalterados.
   - Si el producto no existe, realiza una solicitud asíncrona (`fetch`) a la API 'https://fakestoreapi.com/products' para obtener la información completa del producto y luego crea un nuevo objeto con los campos actualizados del formulario.

5. **Redirección después de la Operación Asincrónica:** Utiliza `async/await` para manejar la asincronía de la solicitud fetch. La redirección a la página principal ('../html/pagina.html') se realiza después de que la operación asincrónica se haya completado con éxito.

6. **Manejo de Errores:** Captura cualquier error que pueda ocurrir durante la ejecución y lo registra en la consola.

7. **Evitar Recarga de la Página:** Retorna `false` al final de la función para evitar que el formulario se envíe y recargue la página.


## nuevo producto ---------->

## Función `obtenerProximaClave`

La función `obtenerProximaClave` se utiliza para encontrar el número más grande como clave en el `localStorage` y devolver el siguiente número como clave para un nuevo producto.

### Parámetros:
- Ninguno.

### Funcionamiento:

1. **Obtención de Claves:** Obtiene todas las claves presentes en el `localStorage`.

2. **Filtrado de Claves Válidas:** Filtra solo las claves que son números válidos, ignorando las que no son números.

3. **Verificación de Claves Válidas:** Si no hay claves válidas o todas son menores que 21, devuelve 21 como la próxima clave.

4. **Obtención del Número Más Grande:** Encuentra el número más grande entre las claves y le suma uno para obtener la próxima clave.

5. **Retorno de la Próxima Clave:** Devuelve el número encontrado como la próxima clave.

### Uso:

Se utiliza en la función `nuevoProducto` para obtener la clave adecuada para el nuevo producto a ser guardado en el `localStorage`.

## Función `nuevoProducto`

La función `nuevoProducto` se utiliza para agregar un nuevo producto al `localStorage` y a la API 'https://fakestoreapi.com/products'.

### Parámetros:
- Ninguno.

### Funcionamiento:

1. **Obtención de Datos del Formulario:** Recolecta los valores del formulario que representan un nuevo producto, incluyendo `title`, `price`, `description`, `categoria`, e `imagen`.

2. **Obtención de la Próxima Clave:** Utiliza la función `obtenerProximaClave` para obtener la próxima clave disponible para el nuevo producto.

3. **Solicitud a la API para Crear el Producto:** Realiza una solicitud `POST` a la API 'https://fakestoreapi.com/products', creando un nuevo producto con la información proporcionada.

4. **Actualización de las Propiedades del Nuevo Producto:** Después de recibir la respuesta de la API, actualiza las propiedades del objeto `json` con la nueva clave (`id`) y la información del formulario.

5. **Guardado en el localStorage:** Usa la nueva clave como clave en el `localStorage` y guarda el objeto `json` como el valor asociado.

### Uso:

Se llama típicamente cuando el usuario confirma la creación de un nuevo producto en el formulario de creación.

Esta documentación proporciona información sobre cómo se utilizan y qué hacen las funciones `obtenerProximaClave` y `nuevoProducto` en el contexto de tu aplicación.
