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


# Criterios de Evaluación

## Wiki de Análisis de las herramientas

https://github.com/jvanegaso/ghost-cypress/wiki/analisis-herramientas

## Funcionalidades de Prueba

- Autenticación
- Modificación de Contraseña
- Gestión de Páginas
- Gestión de Staff
- Gestión de Posts



# Escenarios de Prueba:

El código fuente de cada escenario detalla las especificaciones GIVEN-WHEN-THEN, los archivos de código se encuentran en el directorio `cypress\integration\ghost`

## 1. Autenticación

- Should show an error message whether user and password are wrong
- Should show an error message whether the user is empty
- Should show an error message whether the password is empty
- Should show an error message whether the user and password are empty
- Should display an error message whether the user clicks on Forgot My Password btn, without email
- Should login with right user and password
- Should block the user to go to /site page if session is no longer active

## 2. Modificación de Contraseña - Esta funcionalidad se prueba en 2 escenarios:

### Control de errores y seguridad al editar una clave:

- Should show an error in both, Old password and New password inputs, when those values are empty
- Should show an error whether the new password and old password doesnt match
- Should show an error whether the new password contains less than 10 characters
- Should show an error whether the new password is insecure
- Should show an error whether the new password is insecure

### Cambio de clave y verificación de la sesión:

- Should show update the password
- Should not be able to login with old password

## 3. Gestión de Páginas

### Creación y Publicación de Páginas

- Should create a page 
- Should publish a page!

### Borrar páginas

- Should delete a page!

### Ocultar publicación

- Should create a page and publish it!
- Should unpublish a page!


## 4. Gestión de Staff

### Invitar personas al Staff

- If email field is null invite people
- Should invite people
- Should resend invitation
- If email user is registered invite people


### Actualizar Información del Usuario

- Staff user account change name null
- Staff user account change name
- Staff user account website
- Staff user account change bio

## 5. Gestión de Posts




