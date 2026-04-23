# Frontend-SeriesTracker

## Descripción
Este es el repositorio con el código client-side para mi proyecto #1 de la clase de Sistemas y Tecnologías Web: un tracker de series de películas o de cualquier otra índole.

### Instrucciones de ejecución 
Este repositorio está diseñado para ir en conjunto con [este otro repositorio de backend hecho con Go](https://github.com/scor05/Backend-SeriesTracker), el cual también dentro de su `README.md` tiene instrucciones para su ejecución.

Para ejecutar el código de este repositorio, se puede hacer de varias formas, pero en esencia se necesita un servidor de HTTP que pueda ejecutar el código de HTML. En el desarrollo de este proyecto, se utilizó el servidor de HTTP integrado de python, `python3 -m http.server 42067`, el cual se debe de correr desde la carpeta root. También es importante colocar el número de puerto `42067` en cualquier servidor que se desee utilizar para este frontend, pues ese puerto es el que fue configurado con CORS en el backend, por lo que ningún otro podrá hacer requests al puerto del API si no tiene ese puerto. 

Este frontend también es visible en [este servidor](https://joelsiervas.online/24472/SeriesTracker/)

### CORS
CORS, acrónimo de Cross Origin Resource Sharing, es un protocolo de seguridad establecido por los browsers en sí que básicamente bloquea (o en este caso permite) acceso para transferir recursos entre distintos dominios/puertos o demás, únicamente mediante el uso de headers de HTTP normales. La configuración que hice para este proyecto fue de utilizar un middleware (idea que me surgió por mi proyecto de otra clase, donde hicimos casi lo mismo pero con laravel), el cual ejecuta las funciones de `net/http` en vez del mismo `http` de por sí. Para ello, le configuré una función `enableCORS`, que en resumidas cuentas solo edita esos headers de CORS para que tanto el origen (puerto del frontend), los métodos que se pueden utilizar y el content-type no sean bloqueados por el browser. Luego se modifica la clásica línea `http.Listen()` con el puerto para simplemente agregarle como segundo parámetro el `http.HandlerFunc` que retorna `enableCORS` 

---
## Challenges Implementados
Para este proyecto, habían varios retos que se podían implementar para obtener la nota completa, de los cuales decidí implementar los siguientes:
1. Manejo de códigos de HTTP correctos en la API (como 201 al crear, 204 al eliminar...)
2. Búsqueda por nombre de serie con `?q=`.

---
## Reflexión de Tecnología Utilizada
En este código se utilizó HTML, CSS y JS nativos; pues esa era la limitación que se había propuesto para este proyecto. Primero, con respecto a HTML, la verdad es que tuve una buena experiencia utilizandolo en general. Es un lenguaje simple en naturaleza y no tiene una sintaxis compleja. Sin embargo, lo único que puedo decir que tuve un poco de challenge en HTML es cómo referenciar paths o enlaces en las distintas etiquetas como `style` o `script` o `img`, las cuales algunas se manejan con `href` y otras con `src`, pero eso no es tanto problema del lenguaje como es mío.

Pasando a CSS, de esta tech no tengo ninguja queja, pues la complejidad de esta es tan compleja como la haga el desarrollador. Con esto me refiero a que cuando se colocan tags mucho más complejas y largas en el HTML, se vuelve mucho más difícil referenciarlas en el CSS, pero esto se puede arreglar manteniendo una estructura clara de cómo se declaran las etiquetas (como intenté poner en este proyecto para cada sub-componente, como `topbar-search`, `content-table-wrapper`, donde cada uno es hijo de "topbar" y "content" respectivamente).

De último está JS nativo, el cual tiene tanto bueno como tiene malo. De lo bueno, es que es un lenguaje muy fácil de utilizar, no tiene sintaxis compleja como C++ o Rust. También tiene una gran variedad de herramientas como el `map`, `reduce` y `filter` que acortan tener que hacer loops por arrays, lo cual es bastante útil. Sin embargo, el problema principal que tuve yo con este lenguaje es el manejo de elementos del DOM. El tener que estar haciendo `document.querySelector` o `document.getElementById` de por sí no es tan complejo, pero cuando se tienen elementos como hijos de otros elementos (como los forms de agregar/editar serie), se vuelve bastante incómodo tener que estar repitiendo lo mismo.

En resumen, yo sí me quedaría cómodo con HTML y CSS, pues siento que estos dos lenguajes permiten un muy buen DX con respecto al manejo de elementos y decoración, y se puede hacer bastante sin tener que poner JS con solo estos dos. Sin embargo, JS nativo sería lo que yo trataría de no utilizar en un futuro, pues esos inconvenientes del manejo del DOM escalan según escala el proyecto. Por ende, yo reemplazaría JS por alguna librería como React, la cual sí permite un mejor manejo de elementos reactivos en el DOM (aunque de por sí tenga sus problemas pero eso ya es otro tema). 


---
## Captura del sistema funcionando
<img width="1200" height="700" alt="image" src="https://github.com/user-attachments/assets/5824c2e7-6204-454c-b8a2-01ca8520b76c" />

