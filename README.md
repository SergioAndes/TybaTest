# Tyba Test
En este repositorio encuentra el desarrollo del ejercicio. Para traer los restaurantes se utilizo el api de google, el cual funciona por coordenadas. Se utilizo mongo db cloud para guardas la informacion de los usuarios y las transacciones
## Aclaracion transacciones
Cada vez que un usuario loggeado revisa una lista de restaurantes, el sistema genera una transaccion. En la transaccion queda registrada la fecha, el usuario, y las coordenadas.
## Como usar
necesita version de node 16 o superior. Para facilitar la ejecucion se subio el .env al repositorio
- Descargar repositorio y ejecutar:
> npm i
> 
> npm start

- A continucion comparto el link de Postman con la coleccion de endpoints del proyecto
> https://www.getpostman.com/collections/1a39f0d71b652f04ba75
- Descripcion de endpoints
> POST http://localhost:3000/user/signup <- registro de usuarios {"name":"Andres",
"password":"testPass1.",
"userName":"AndresUser"}
> 
> POST http://localhost:3000/user/login <- login de usuario {"password":"testPass1.",
"userName":"AndresUser"
>
> POST http://localhost:3000/restaurant/getRestaurants <- {"lat":10.45,
"lng":-73.25} (requiere Bearer Token generado en el login)
>
> GET http://localhost:3000/restaurant/transactions <- (requiere Bearer Token generado en el login)
> 
> GET http://localhost:3000/user/logout <- (requiere Bearer Token generado en el login)
