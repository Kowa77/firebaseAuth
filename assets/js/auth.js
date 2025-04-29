// En auth.js
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js";
import { app } from './firebaseConfig.js'; // Asegúrate de tener un archivo firebaseConfig.js para inicializar la app

const auth = getAuth(app);
const registroModal = new bootstrap.Modal(document.getElementById('registroModal')); // Reemplaza 'registroModal' con el ID de tu modal
const formularioRegistro = document.getElementById('formulario-registro'); // Reemplaza 'formulario-registro' con el ID de tu formulario

formularioRegistro.addEventListener('submit', async (e) => {
    e.preventDefault();
    const emailRegistro = document.getElementById('email-registro').value; // Reemplaza con los IDs de tus campos
    const passwordRegistro = document.getElementById('password-registro').value;

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, emailRegistro, passwordRegistro);
        const user = userCredential.user;
        console.log('Usuario registrado:', user);
        registroModal.hide(); // Oculta el modal después del registro exitoso
        // Aquí podrías redirigir al usuario o actualizar la interfaz
    } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error('Error de registro:', errorCode, errorMessage);
        // Muestra un mensaje de error al usuario
    }
});

export { registroModal }; // Exporta el modal si lo necesitas en otro archivo