//Cuando carga el documento
window.addEventListener('load', () => {
    apiNavegador();
    
})
//Obtengo coordenadas de la API del Navegador
const apiNavegador = () => {
    navigator.geolocation.getCurrentPosition(obtenerCoordenadas);
}

const obtenerCoordenadas = (pos) => {
    lat = pos.coords.latitude
    lon = pos.coords.longitude
    consumirAPI(lat,lon);
}

//API OpenWeather
const consumirAPI = async (lat,lon) => {
    const baseURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=`
    const apiKey = '306395a7a86009e9ee4f4eba4504ee8f'
    

    try {
        const response = await fetch(baseURL+apiKey);
        const dataClima = await response.json();
        mostrarEnHeader(dataClima);
    } catch (error) {
        console.log(error)
    }

}
//Pinto en el HTML
const mostrarEnHeader =  (dataClima) => {
    const nav = document.querySelector('.navbar');
    console.log("nav")
    const card = `
                    <div class='forecast'>
                        <p><strong>Localidad: </strong>${dataClima.city.name}</p>
                        <p><strong>Temperatura:</strong> ${parseFloat(dataClima.list[0].main.temp - 275.15.toFixed(2)).toFixed(2)} °C</p>
                        <p><strong>Humedad:</strong> ${dataClima.list[0].main.humidity} %</p>
                        <p><strong>Cielo:</strong> ${dataClima.list[0].weather[0].main} </p>
                    </div>    
                `

    nav.innerHTML += card     

}

