## Documentación

### NodeJS

**Node.js** es un entorno de ejecución para _JavaScript_ construido con el motor _JavaScript_ V8 de **Chrome**. _JavaScript_ es un lenguaje interpretado pero en **Node.js** tenemos algo llamado el JIT Compiler que es una especie de monitor que optimiza fragmentos de código que son ejecutados frecuentemente.

#### Diferencias entre JavaScript y NodeJS

En **JavaScript** del lado del cliente tenemos el **DOM** y el **CSSDOM** así como el objeto window para manipular los elementos de nuestra página además una serie de APIs, aquí unos ejemplos:

- fetch
- SessionStorage y LocalStorage
- canvas
- bluetooth
- audio
- web authentication

Mientras que en **Node.js** no tenemos un **DOM** ni un objeto windows, lo que sí tenemos son una serie de módulos que nos permiten interactuar con los recursos de la máquina como el sistema operativo y el sistema de archivos, por ejemplo:

- os
- fs
- http
- util
- debugger
- stream
- events

![](https://static.platzi.com/media/user_upload/Mesa%20de%20trabajo%202-f92e8007-a0be-4bbe-9d53-98bc5f0180db.jpg)

#### Stream

Los **Streams** son una colección de datos como los arrays o strings sólo que se van procesando pedazo por pedazo, esta capacidad los hace muy poderosos porque podemos manejar una gran cantidad de datos de manera óptima.

##### Los Readable y Writeable streams tienen los siguientes eventos y funciones respectivamente:

##### Readable

**Eventos**

- data. Se dispara cuando recibe datos.
- end. Se dispara cuando termina de recibir datos.
- error. Se dispara cuando hay un error.

**Funciones**

- pipe
- unpipe
- read
- push

##### Writeable

**Eventos**

- drain. Se dispara cuando emite datos.
- finish. Se dispara cuando termina de emitir.
- error. Se dispara cuando hay un error.

**Funciones**

- write
- end

Estos eventos son heredados de la clase EventEmitter.

##### Duplex

Duplex: implementa los métodos write y read a la vez.

##### Transform

Transform: es similar a Duplex pero con una sintaxis más corta.

##### Modulos nativos de NodeJS

**os.** Sirve para consultar y manejar los recursos del sistema operativo.
**fs. **Sirve para administrar (copiar, crear, borrar etc.) archivos y directorios.

Los métodos contenidos en estos módulos (y en todo Node.js) funcionan de forma asíncrona por default, pero también se pueden ejecutar de forma síncrona, por ejemplo el método `readFile()` tiene su versión síncrona` readFileSync()`.

#### Request Object

El objeto req (Request) en **Express** representa el llamado HTTP y tiene diferentes propiedades del llamado, como la cadena de texto query (Query params), los parámetros de la URL (URL params), el cuerpo (Body), los encabezados (HTTP headers), etc.

Para acceder al req basta con acceder al primer parámetro de nuestros router handlers (router middleware) ó middlewares.

     app.get('/user/:id', function(req, res) {
      res.send('user ' + req.params.id);
    });

##### request.body

Contiene los pares de llave-valor de los datos enviados el cuerpo (body) del llamado (request). Por defecto es undefined pero es establecido cuando se usa algún “body-parser” middleware como body-parser y multer.

En **Postman** cuando hacemos un request y enviamos datos en la pestaña Body, estos middlewares son los que nos ayudan a entender el tipo de datos que vamos a recibir en el req.body.

    const app = require('express')();
    const bodyParser = require('body-parser');
    const multer = require('multer');
    const upload = multer(); // Para datos tipo multipart/form-data

    app.use(bodyParser.json()); // Para datos tipo application/json
    app.use(bodyParser.urlencoded({ extended: true })); // Para datos tipo application/x-www-form-urlencoded

    app.post('/profile', upload.array(), function (req, res, next) {
      console.log(req.body);
      res.json(req.body);
    });

##### request.params

Esta propiedad contiene un objeto con las propiedades equivalentes los parámetros nombrados en la ruta. Por ejemplo si tenemos una ruta de la forma /user/:name entonces la propiedad name esta disponible como req.params.name y alli podremos ver su valor, supongamos que llamáramos la ruta con /user/glrodasz, entonces el valor de req.params.name seria glrodasz. Este objeto por defecto tiene el valor de un objeto vacío {}.
`req.params.name`

##### request.query

Esta propiedad contiene un objeto con las propiedades equivalentes a las cadenas de texto query de la ruta. Si no hay ninguna cadena de texto query tendrá como valor por defecto un objeto vacío {}.
req.query.q
// => "tobi ferret"

    // GET /shoes?order=desc&shoe[color]=blue&shoe[type]=converse
    req.query.order
    // => "desc"

    req.query.shoe.color
    // => "blue"

    req.query.shoe.type
    // => "converse"

#### Response Object

El objeto **response** representa la respuesta **HTTP** que envía una aplicación en Express.

Para acceder al res basta con acceder al segundo parámetro de nuestros router handlers (router middleware) o middleware.

    app.get("/user/:id", function(request, response) {
      response.send("user " + request.params.id);
    });

##### response.end()

Finaliza el proceso de respuesta. Este método viene realmente del core de** Node.js**, específicamente del método response.end() de http.ServerResponse.

Se usa para finalizar el _request_ rápidamente sin ningún dato. Si necesitas enviar datos se debe usar response.send() y response.json().

    response.end();
    response.status(404).end();

##### response.json()

Envía una respuesta JSON. Este método envía una respuesta (con el content-type correcto) y convierte el parámetro enviado a una cadena de texto JSON haciendo uso de **JSON.stringify().**

El parámetro puede ser cualquier tipo de JSON, incluido un objeto, un arreglo, una cadena de texto, un boolean, número, null y también puede ser usado para convertir otros valores a JSON.

    response.json(null);
    response.json({ user: "tobi" });
    response.status(500).json({ error: "message" });

##### response.send()

Envía una respuesta HTTP. El parámetro body puede ser un objeto tipo Buffer, una cadena de texto, un objeto, o un arreglo. Por ejemplo:

    res.send(Buffer.from("whoop"));
    res.send({ some: "json" });
    res.send("<p>some html</p>");
    res.status(404).send("Sorry, we cannot find that!");
    res.status(500).send({ error: "something blew up" });

#### Anatomia de una API Restful

**REST** (Representational State Transfer) es un estilo de arquitectura para construir web services, no es un estándar pero si una especificación muy usada.

Las peticiones **HTTP** van acompañadas de un _“verbo_” que define el tipo de petición:

- **GET**. Lectura de datos.
- **PUT**. Reemplazar datos.
- **PATCH**. Actualizar datos en un recurso específico.
- **POST**. Creación de datos.
- **DELETE**. Eliminación de datos.

No es recomendable habilitar un endpoint de tipo **PUT** y **DELETE** para toda nuestra colección de datos, sólo hacerlos para recursos específicos, ya que no queremos que por error se puedan borrar todos nuestros datos.

#### Clean Architecture

La arquitectura tradicional **MVC** se queda corta en aplicaciones modernas, por eso necesitamos una arquitectura diferente cómo la **Clean Architecture** que tiene una capa de servicios para manejar la lógica de negocio.

![Clean arquitecture](https://www.dropbox.com/s/n06gjhvukutegr1/clean%20architecture.png?raw=1 'Clean arquitecture')
