# ghost-cypress

## Pasos para configurar la aplicación

Modificar el archivo `config.js` que se encuentra en la raíz del proyecto. 

```javascript
module.exports = {
  ghostBaseUrl: 'http://localhost:2368/ghost/', // URL donde se ejecuta ghost
  usuario: 'sebastian44van@gmail.com', // Usuario previamente registrado en el sistema
  clave: 'LtWmSuuj9MhPTUW',  // Clave actual del usuario registrado en ghost
  nuevaClave: 'LtWmSuuj9MhPTU1' // Clave que se usará para editar clave. Las pruebas reincian la clave a la anterior.
};
```

## Pasos para ejecutar:

- Instalar dependencias con `npm install`
- ejecutar utilizando el comando `npx cypress open`
- Cuando se abra la ventana de Cypress, ejecutar las pruebas con el botón "Run integration specs" de la parte superior derecha


## Repositorio de Cucumber:

https://github.com/jvanegaso/ghost-cucumber-testing
