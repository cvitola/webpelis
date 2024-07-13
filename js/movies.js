
window.addEventListener('load', () => {
    const pelis = listarPeliculas();
    
})
const listarPeliculas = async() => {
    const baseURL = 'http://localhost:8080/listarPeliculas';
    try {
        const response = await fetch(baseURL);
        const dataPelis = await response.json();
        mostrarEnPanel(dataPelis)
    } catch (error) {
        console.log(error)
    }
}

const mostrarEnPanel = (pelis) => {
    console.log("Holis", pelis)
    const divPelis = document.querySelector('.peliculas');
    
    divPelis.innerHTML = pelis?.map(p => {
        return `<div class="peliculas__tarjeta">
                    <h4>${p.anio}</h4>
                    <img  src=${p.portada} alt=${p.titulo} title=${p.titulo}>
                    <h4>${p.titulo}</h4>
                    <h4>${dibujarEstrellas(p.puntuacion)}</h4>
                </div>`;
    }).join('');
    
}

const dibujarEstrellas = (val) => {
    switch (val) {
        case 5:
            return "⭐⭐⭐⭐⭐";
        case 4:
            return "⭐⭐⭐⭐";
        case 3:
            return "⭐⭐⭐";
        case 2:
            return "⭐⭐";
        case 1:
            return "⭐"
        default:
            break;
    }
}