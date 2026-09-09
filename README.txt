SISTEMA DE RECOMENDACIÓN VOCACIONAL — Descubre tu camino
==========================================================

CÓMO ABRIR EL PROYECTO
-----------------------
1. Descomprime VOCACIONAL_WEB.zip.
2. Haz doble clic en "index.html" (se abre en cualquier navegador moderno).
   No necesita servidor, Node.js ni instalar dependencias.
   Requiere conexión a internet solo para cargar las fuentes de Google Fonts
   (Fredoka y Plus Jakarta Sans); si no hay internet, usa las fuentes del sistema.

ARCHIVOS
--------
- index.html   → estructura de las 4 pantallas (introducción, test, procesamiento, resultados)
- style.css    → identidad visual morada, tarjetas pastel, animaciones y responsive
- script.js    → lógica del test: 30 preguntas, cálculo de las 7 áreas, gráfico radar y resultados
- README.txt   → este archivo

CÓMO FUNCIONA
-------------
1. Pantalla de introducción con el botón "Comenzar mi viaje".
2. Test de 30 preguntas, una por pantalla, con 4 opciones cada una
   (Me gusta mucho = 3, Me gusta = 2, Me gusta poco = 1, No me gusta = 0).
   - El botón "Siguiente" se habilita solo después de responder.
   - El botón "Anterior" conserva las respuestas ya dadas.
   - Las respuestas se guardan en memoria (JavaScript), en el arreglo `state.answers`.
3. Pantalla de procesamiento (~1.7 segundos) con mensajes de carga.
4. Pantalla de resultados:
   - Puntaje y porcentaje por cada una de las 7 áreas vocacionales.
   - Área principal y secundaria (con manejo de empates).
   - Gráfico radar SVG dibujado a mano (sin librerías externas) que se anima al aparecer.
   - Fortalezas, opciones de carreras para explorar y actividades sugeridas.
   - Botones: Repetir test, Imprimir resultados (usa window.print() con CSS de impresión),
     Compartir resultado (Web Share API con respaldo de copiar al portapapeles) y Volver al inicio.

PERSONALIZACIÓN
----------------
- Las 30 preguntas y la agrupación en las 7 áreas están definidas al inicio de script.js
  en las constantes QUESTIONS y AREAS. Puedes editar textos, carreras, fortalezas y
  actividades directamente ahí.
- Los colores y tipografías están centralizados como variables CSS al inicio de style.css
  (bloque :root), por si quieres ajustar la paleta morada o los colores de cada área.

ACCESIBILIDAD
--------------
- Todos los botones tienen estados de foco visibles para navegación con teclado.
- Las opciones de respuesta también se pueden seleccionar con las teclas 1-4 durante el test.
- Etiquetas aria-label y aria-pressed en las opciones del test.
- Buen contraste de color entre texto y fondo en toda la aplicación.

Este resultado es una guía para conocerse mejor, no una decisión definitiva sobre el futuro
de quien lo responde.
