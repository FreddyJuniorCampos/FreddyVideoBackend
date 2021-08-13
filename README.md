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
