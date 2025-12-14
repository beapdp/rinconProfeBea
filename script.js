/* === LISTA DE CANCIONES (YOUTUBE) === */
const videos = [
    { title: "Buenos Días", id: "NN-rq5DF3Tc" }, 
    { title: "Hola hola, ¿Cómo estás?", id: "7wTkHmpDE9k" }, 
    { title: "Yo tengo una Casita", id: "wq1WOUB-Sg0" },
    { title: "¡Otoño llegó!", id: "K9HtYQxvC_8" },
    { title: "Wincy araña", id: "DtuXHwOpMqo" },
    { title: "Y lloverá y yo veré", id: "TZ9De7arnCc" },
    { title: "Yo tengo una carita", id: "iYutbUw213A" },
    { title: "La foca Marisol", id: "6zF9nHo7Aeo" },
    { title: "Frío, frío", id: "Wejd8HtVZTQ" },
    { title: "Ladrillo a ladrillo", id: "oFgIZY-uezU" },
    { title: "La vaca y la Flor", id: "H_3YFRMOBYA" },
    { title: "Araña arañita", id: "JtRCChbwMr0" },
    { title: "Los pajaritos que van por el aire", id: "PwhIe3LMd9g" },
    { title: "Pra Pre Pri La Primavera", id: "45neIbhogUI" },
    { title: "Ser Amigos", id: "fVkSem3VXK8" },
    { title: "Chocaron dos coches", id: "ZbPOwxIys4o" },
    { title: "Pin Pon", id: "RX0VtkQOddw" },
    { title: "Un gusanito", id: "ZfUcyuXn_tk" },
];

/* === LISTA DE CUENTOS (FOTOS) === */
const cuentos = [
    // CUENTO 1
    { 
        title: "Aerolínea Las Ardillas: El inicio", 
        images: [
            "./images/AerolineaArdillas01.jpg", 
            "./images/AerolineaArdillas02.jpg", 
            "./images/AerolineaArdillas03.jpg", 
            "./images/AerolineaArdillas04.jpg", 
            "./images/AerolineaArdillas05.jpg", 
            "./images/AerolineaArdillas06.jpg", 
            "./images/AerolineaArdillas07.jpg"
        ] 
    }, // <--- ¡IMPORTANTE! Esta coma separa un cuento del siguiente

    // CUENTO 2 (NUEVO)
    {
        title: "Destino Polar: ¡Aterrizamos en Laponia!",
        images: [
            // Cambia estos nombres por los de tus archivos reales
            "./images/laponiaProx (2).png"
        ]
    }
];

// --- LÓGICA CANCIONES (YOUTUBE) ---
const videoListContainer = document.getElementById('video-list');
const mainPlayer = document.getElementById('main-player');

function loadPlaylist() {
    videoListContainer.innerHTML = ""; 
    videos.forEach(video => {
        const btn = document.createElement('button');
        btn.className = 'song-btn';
        btn.innerHTML = `<i class="fa-solid fa-play"></i> ${video.title}`;
        
        btn.onclick = () => {
            // 1. Quitar la clase 'active' de todos los botones de canciones
            const allBtns = videoListContainer.querySelectorAll('.song-btn');
            allBtns.forEach(b => b.classList.remove('active'));

            // 2. Añadir 'active' al botón pulsado
            btn.classList.add('active');

            // 3. Reproducir
            mainPlayer.src = `https://www.youtube.com/embed/${video.id}?autoplay=1`;
        };
        videoListContainer.appendChild(btn);
    });
}

// --- LÓGICA CUENTOS (SLIDER DE FOTOS) ---
const storyListContainer = document.getElementById('story-list');
const storyImageElement = document.getElementById('story-image');
const storyTitleDisplay = document.getElementById('story-title-display');
const pageCounter = document.getElementById('page-counter');

let currentStoryImages = []; 
let currentImageIndex = 0; 

function loadStories() {
    storyListContainer.innerHTML = ""; 
    
    // Cargar el primer cuento por defecto
    if(cuentos.length > 0) {
        selectStory(0);
    }

    cuentos.forEach((cuento, index) => {
        const btn = document.createElement('button');
        btn.className = 'song-btn story-btn';
        btn.innerHTML = `<i class="fa-solid fa-book"></i> ${cuento.title}`;
        
        btn.onclick = () => {
            selectStory(index);
        };
        
        // Marcamos el primero como activo al iniciar
        if (index === 0) btn.classList.add('active');

        storyListContainer.appendChild(btn);
    });
}

function selectStory(index) {
    // Gestión visual del botón activo
    const allBtns = storyListContainer.querySelectorAll('.story-btn');
    allBtns.forEach(b => b.classList.remove('active'));
    if(allBtns[index]) allBtns[index].classList.add('active');

    // Cargar datos
    currentStoryImages = cuentos[index].images;
    currentImageIndex = 0; 
    storyTitleDisplay.innerText = cuentos[index].title;
    
    updateSlider();
}

function updateSlider() {
    if(currentStoryImages.length === 0) return;
    storyImageElement.src = currentStoryImages[currentImageIndex];
    pageCounter.innerText = `${currentImageIndex + 1} / ${currentStoryImages.length}`;
}

// Flechas
function nextSlide() {
    if (currentImageIndex < currentStoryImages.length - 1) {
        currentImageIndex++;
        updateSlider();
    }
}

function prevSlide() {
    if (currentImageIndex > 0) {
        currentImageIndex--;
        updateSlider();
    }
}

// Cargar todo al inicio
loadPlaylist();
loadStories();