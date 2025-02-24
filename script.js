/** Juego de Adivinanza de Números donde el jugador puede elegir el rango de los números a adivinar, además de los intentos **/
/** Actualmente el juego cuenta con 3 intentos y el rango está definido entre el nro. 1 y 10 */

/** Necesitamos agregar 3 inputs para que el jugador ingrese los números de rango mínimo y máximo, y el número de intentos, por default cambiaremos a 6 intentos */


// Paso1: Configuración inicial del juego

// Declaramos Variables globales
let secretNumber;
let guessed;
let minRange;
let maxRange;
let attempts;

// Elementos de la interfaz
const minNumber = document.getElementById("minNumber");
const maxNumber = document.getElementById("maxNumber"); 
const attemptsNumber = document.getElementById("attemptsNumber")
const inputNumber = document.getElementById("inputNumber"); // Input del nro. a ingresar
const startBtn = document.getElementById("startBtn");
const guessBtn = document.getElementById("guessBtn"); // Botón adivinar
// const resetBtn = document.getElementById("resetBtn");   // Botón reiniciar
const message = document.getElementById("message"); // Mensaje de respuesta
const textAttempts = document.getElementById("attempts"); // Nro. de intentos restantes
const restartBtn = document.getElementById("restartBtn"); // Botón reiniciar
const winSound = new Audio("sounds/applause.mp3");
const failSound = new Audio("sounds/fail.mp3");
const clickSound = new Audio("sounds/mouse-click.mp3");

// Paso2: Funcionalidad del botón Empieza a Jugar
startBtn.addEventListener("click", () => {
    // Obtener el rango máximo ingresado por el usuario
    minRange = parseInt(minNumber.value)
    maxRange = parseInt(maxNumber.value);
    attempts = parseInt(attemptsNumber.value);

    // Validar que el rango máximo sea un número válido
    if (isNaN(minRange) || isNaN(maxRange) || isNaN(attempts) || minRange < 1 || maxRange > 1000 || attempts < 1 || minRange >= maxRange) {
        alert("Por favor, ingresa un rango de números válido (mayor que 0 y menor a 1000).");
        return;
    }

    // Generar el número secreto dentro del rango del usuario
    secretNumber = Math.floor(Math.random() * (maxRange - minRange + 1)) + minRange;  
    guessed = false; // Bolean si el jugador ha adivinado o no el nro.

    // Mostrar instrucciones
    instrucciones.textContent = `Adivina un número entre ${minRange} y ${maxRange}. Tienes ${attempts} intentos.`;
    textAttempts.textContent = `Intentos restantes: ${attempts}`;  // Actualizar los intentos restantes

    // Deshabilitar campos de entrada y el botón de adivinar
    minNumber.disabled = true;
    maxNumber.disabled = true;
    attemptsNumber.disabled = true;
    
});


// Paso3: Funcionalidad del botón "Adivinar"

guessBtn.addEventListener("click", () => {
    clickSound.play();

    // Verificar si el juego ha terminado
    if (guessed || attempts === 0) return;
    
    // Obtener el nro. ingresado por el jugador
    const numberEntered = parseInt(inputNumber.value);

    // Validar que el número esté en el rango correcto
    if (isNaN(numberEntered) || numberEntered < minRange || numberEntered > maxRange) {
            message.textContent = `Por favor, ingresa un número válido entre ${minRange} y ${maxRange}!`;
        message.style.color = "purple";
        return;
    }

    // Compare el número ingresado con el número secreto
    if (numberEntered === secretNumber) {
        message.textContent = "Felicidades! Adivinaste el número secreto!";
        message.style.color = "green";
        winSound.play();
        guessed = true;
    } else {
        
        // Disminuir el nro. de intentos
        attempts--;
        textAttempts.textContent = `Intentos restantes: ${attempts}`;

        // Verificar si el jugador se quedó sin intentos
        if (attempts === 0) {
            message.textContent = `Te quedaste sin intentos! El número secreto era ${secretNumber}.`;
            message.style.color = "red";
            failSound.play();
        } else {
            // Mostrar un mensaje de pista para el jugador
            message.textContent = `Incorrecto. El número secreto es ${numberEntered < secretNumber ? "Mayor" : "Menor"}.`;
            message.style.color = "orange";
        }
    }

    // Limpiar el input de entrada
    inputNumber.value = "";
});

// Paso3: Funcionalidad del botón "Reiniciar"
restartBtn.addEventListener("click", () => {
    clickSound.play();

    // Restablecer las variables
    secretNumber = Math.floor(Math.random() * (maxRange - minRange + 1)) + minRange;
    attempts = parseInt(attemptsNumber.value); // Restablecer los intentos
    guessed = false;

    // Actualizar la interfaz
    inputNumber.value = "";
    minNumber.value = "";
    maxNumber.value = "";
    attemptsNumber.value = "";
    message.textContent = "";
    textAttempts.textContent = "";
    instrucciones.textContent = "";

    // Habilitar el campo de entrada y el botón de adivinar
    inputNumber.disabled = false;
    guessBtn.disabled = false;
    minNumber.disabled = false;
    maxNumber.disabled = false;
    attemptsNumber.disabled = false;
});