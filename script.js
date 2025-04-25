// Configuración de Firebase (Reemplaza con tus propias credenciales)
const firebaseConfig = {
    apiKey: "", //   Clave API de Firebase
    authDomain: "", // Dominio de autenticación de Firebase
    projectId: "", // ID del proyecto de Firebase
    storageBucket: "", // Almacén de Firebase
    messagingSenderId: "", // ID del remitente de mensajes de Firebase
    appId: "",
  };
  
  // Inicializa Firebase
  firebase.initializeApp(firebaseConfig);
  const auth = firebase.auth();
  
  // Elementos del DOM
  const registroForm = document.getElementById('registro-form');
  const loginForm = document.getElementById('login-form');
  const registroError = document.getElementById('registro-error');
  const loginError = document.getElementById('login-error');
  const mensajeDiv = document.getElementById('mensaje');
  
  // Función para registrar un nuevo usuario
  registroForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = registroForm['registro-email'].value;
      const password = registroForm['registro-password'].value;
  
      auth.createUserWithEmailAndPassword(email, password)
          .then((userCredential) => {
              // Registro exitoso
              registroForm.reset();
              registroError.textContent = '';
              mensajeDiv.textContent = 'Registro exitoso. ¡Ahora puedes iniciar sesión!';
          })
          .catch((error) => {
              registroError.textContent = getErrorMessage(error.code);
          });
  });
  
  // Función para iniciar sesión
  loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = loginForm['login-email'].value;
      const password = loginForm['login-password'].value;
  
      auth.signInWithEmailAndPassword(email, password)
          .then((userCredential) => {
              // Inicio de sesión exitoso
              loginForm.reset();
              loginError.textContent = '';
              window.location.href = 'home.html'; // Redirigir a home.html después del inicio de sesión
          })
          .catch((error) => {
              loginError.textContent = getErrorMessage(error.code);
          });
  });
  
  // Observador para el estado de autenticación EN INDEX.HTML
  auth.onAuthStateChanged((user) => {
      // Si un usuario YA está logueado al cargar index.html, redirigir a home.html
      if (user && window.location.pathname.endsWith('index.html')) {
          window.location.href = 'home.html';
      }
  });
  
  // Función para obtener mensajes de error amigables
  function getErrorMessage(errorCode) {
      switch (errorCode) {
          case 'auth/email-already-in-use':
              return 'Este correo electrónico ya está en uso.';
          case 'auth/invalid-email':
              return 'El correo electrónico no es válido.';
          case 'auth/weak-password':
              return 'La contraseña debe tener al menos 6 caracteres.';
          case 'auth/user-not-found':
              return 'No se encontró ningún usuario con este correo electrónico.';
          case 'auth/wrong-password':
              return 'La contraseña es incorrecta.';
          default:
              return 'Ocurrió un error inesperado. Inténtalo de nuevo.';
      }
  }