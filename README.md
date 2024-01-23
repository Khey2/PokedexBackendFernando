<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>



# Ejecutar en desarrollo

1.- Clonar repositorio

2.- Ejecutar el comando de 

```
  npm install

```

3.- Tener Nest CLI instalado

```
  npm install -g @nestjs/cli

```

4.- Levantar la base de datos

```
  docker-compose up -d

```

5.-  Clonar el archivo ___.env.template___ y renombrar la copia a ___.env___


6.- Llenar las avriables de entorno definidas en el ```.env```

7.- ejecutar la aplicacion en dev:

```
  npm run start:dev
```

7.- Reconstruir los registros de la DB

```
  http://localhost:3000/api/v2/seed

```



## Stack usado
* MongoDB
* Nest