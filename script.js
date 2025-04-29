// Configuración de Firebase (Reemplaza con tus propias credenciales)
const firebaseConfig = {
    apiKey: "AIzaSyBblG3qsZT7uNZ-oJnrFqTXrI5ZGZ9RnPA", //   Clave API de Firebase
    authDomain: "servicephoto-ad95d.firebaseapp.com", // Dominio de autenticación de Firebase
    projectId: "servicephoto-ad95d", // ID del proyecto de Firebase
    storageBucket: "servicephoto-ad95d.firebasestorage.app", // Almacén de Firebase
    messagingSenderId: "428185830342", // ID del remitente de mensajes de Firebase
    appId: "1:428185830342:web:6595150205ccbc04d7a8c7" // ID de la aplicación de Firebase
};

// Inicializa Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

document.addEventListener('DOMContentLoaded', () => {
    
    const navbarAuth = document.getElementById('navbar-auth');  
    const authModalElement = document.getElementById('authModal');

    const servicios = document.getElementById('servicios');
    const carrito = document.getElementById('carrito-nav'); // ID del carrito en el navbar

    const loginFormulario = document.getElementById('loginForm'); // ID del formulario de inicio de sesión en el modal
    const loginError = document.getElementById('login-error'); // Asegúrate de tener este elemento en tu modal
    const loginModal = authModalElement ? new bootstrap.Modal(authModalElement) : null;
    const showLoginLink = document.getElementById('show-login-form');
    const loginFormSection = document.getElementById('login-form');
    const loginTitle = document.querySelector('#authModalLabel');
    const loginButtonNavbar = document.querySelector('[data-bs-target="#authModal"]');

    const registroForm = document.getElementById('registerForm'); // ID del formulario de registro en el modal
    const registroError = document.getElementById('registro-error'); // Asegúrate de tener este elemento en tu modal
    const showRegisterLink = document.getElementById('show-register-form'); // ID del enlace para mostrar el formulario de registro
    const registerFormSection = document.getElementById('register-section');


    const navbarLinks = document.querySelector('.navbar-links');
    const menuToggle = document.querySelector('.menu-toggle');

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            navbarLinks.classList.toggle('active');
            menuToggle.classList.toggle('open');
        });
    }

        
    if (showRegisterLink) {
        showRegisterLink.addEventListener('click', (e) => {
            e.preventDefault();
            loginFormSection.style.display = 'none';
            registerFormSection.style.display = 'block';
            loginTitle.textContent = 'Registro';
        });
    }

    if (showLoginLink) {
        showLoginLink.addEventListener('click', (e) => {
            e.preventDefault();
            registerFormSection.style.display = 'none';
            loginFormSection.style.display = 'block';
            loginTitle.textContent = 'Iniciar Sesión';
        });
    }

    // Evento para el formulario de registro
    if (registroForm) {
        registroForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = registroForm['registerEmail'].value; // ID del input de email en registro
            const password = registroForm['registerPassword'].value; // ID del input de contraseña en registro
            const confirmPassword = registroForm['confirmPassword'].value; // ID del input de confirmar contraseña

            if (password === confirmPassword) {
                auth.createUserWithEmailAndPassword(email, password)
                    .then((userCredential) => {
                        // Usuario registrado exitosamente
                        //console.log('Usuario registrado:', userCredential.user);
                        registroForm.reset();
                        if (registroError) registroError.textContent = '';
                        if (loginModal) loginModal.hide(); // Ocultar el modal después del registro
                        //window.location.href = 'inicio.html'; // Redirigir a la página principal
                    })
                    .catch((error) => {
                        console.error('Error al registrar usuario:', error.message);
                        if (registroError) registroError.textContent = obtenerMensajeError(error.code);
                    });
            } else {
                if (registroError) registroError.textContent = 'Las contraseñas no coinciden.';
            }
        });
    }

    // Evento para el formulario de inicio de sesión
    if (loginFormulario) {
        loginFormulario.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = loginFormulario['loginEmail'].value; // ID del input de email en login
            const password = loginFormulario['loginPassword'].value; // ID del input de contraseña en login

            auth.signInWithEmailAndPassword(email, password)
                .then((userCredential) => {
                    // Inicio de sesión exitoso
                    //console.log('Usuario logueado:', userCredential.user);
                    loginFormulario.reset();
                    if (loginError) loginError.textContent = '';
                    if (loginModal) loginModal.hide(); // Ocultar el modal después del inicio de sesión
                    // window.location.href = 'inicio.html'; // Redirigir a la página principal
                })
                .catch((error) => {
                    console.error('Error al iniciar sesión:', error.message);
                    if (loginError) loginError.textContent = obtenerMensajeError(error.code);
                });
        });
    }

    // Observador del estado de autenticación
    auth.onAuthStateChanged((user) => {

        if (navbarAuth) {
            navbarAuth.innerHTML = ''; // Limpiar el contenido anterior
            const loginButton = document.createElement('button');
            loginButton.className = 'boton';
            loginButton.textContent = 'Login';
            loginButton.setAttribute('data-bs-toggle', 'modal');
            loginButton.setAttribute('data-bs-target', '#authModal');


            if (user) {
                servicios.style.display = 'block'; // Mostrar la sección de servicios si el usuario está logueado
                carrito.style.display = 'block'; // Mostrar el carrito si el usuario está logueado
                const welcomeSpan = document.createElement('span');
                welcomeSpan.className = 'bienvenido';
                welcomeSpan.textContent = `Bienvenido: ${user.email}`;
                welcomeSpan.style.marginRight = '15px';

                const logoutButtonElement = document.createElement('button');
                logoutButtonElement.textContent = 'Cerrar Sesión';
                logoutButtonElement.className = 'boton';
                logoutButtonElement.addEventListener('click', () => {
                    auth.signOut().then(() => {
                        //console.log('Sesión cerrada.');
                        window.location.reload(); // Recargar la página para reflejar el estado
                    }).catch((error) => {
                        console.error('Error al cerrar sesión:', error);
                        alert('Error al cerrar sesión.');
                    });
                });

                navbarAuth.appendChild(welcomeSpan);
                navbarAuth.appendChild(logoutButtonElement);
                loginButton.style.display = 'none'; // Ocultar el botón de login si está logueado
            }
            navbarAuth.appendChild(loginButton);
        }
    });

    // Función para obtener mensajes de error amigables
    function obtenerMensajeError(errorCode) {
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
                return 'Ocurrió un error inesperado. Por favor, inténtalo de nuevo.';
        }
    }

    function crearCarritoNavbar() {
        // Crear el elemento 'a'
        const enlaceCarrito = document.createElement('a');
        enlaceCarrito.classList.add('nav-link', 'carrito-nav-link');
        enlaceCarrito.href = 'paginas/carrito.html';
      
        // Crear el elemento 'img'
        const iconoCarrito = document.createElement('img');
        iconoCarrito.src = 'assets/img/025-cart.png';
        iconoCarrito.alt = 'Carrito';
        iconoCarrito.classList.add('carrito-icono-navbar');
      
        // Crear el elemento 'span'
        const cantidadCarrito = document.createElement('span');
        cantidadCarrito.id = 'carrito-cantidad-navbar';
        cantidadCarrito.textContent = '0';
      
        // Agregar los elementos hijos al enlace 'a'
        enlaceCarrito.appendChild(iconoCarrito);
        enlaceCarrito.appendChild(cantidadCarrito);
      
        // Devolver el elemento 'a' creado
        return enlaceCarrito;
      }
});