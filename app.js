// Ingresar tu clave API de API-FOOTBALL
const apiKey = '0f4d6922f39a1e14cf0b8578d7d2fd93';

async function buscarEquipos(liga) {
    const url = `https://v3.football.api-sports.io/teams?league=${liga}&season=2024`;
    
    const response = await fetch(url, {
        headers: {
            'x-apisports-key': apiKey
        }
    });

    const data = await response.json();

    // Mostrar la lista de equipos
    console.log(data.response);
    return data.response;
}

function generarPronostico() {
    const equipo1 = document.getElementById("equipo1").value;
    const equipo2 = document.getElementById("equipo2").value;

    if (!equipo1 || !equipo2) {
        alert("Por favor ingresa los nombres de ambos equipos.");
        return;
    }

    const probabilidadEquipo1 = Math.random();
    const probabilidadEquipo2 = 1 - probabilidadEquipo1;

    let ganador = probabilidadEquipo1 > probabilidadEquipo2 ? equipo1 : equipo2;

    const resultado = `${equipo1} tiene un ${Math.round(probabilidadEquipo1 * 100)}% de ganar. ${equipo2} tiene un ${Math.round(probabilidadEquipo2 * 100)}% de ganar. Ganador probable: ${ganador}.`;
    document.getElementById("resultado").innerText = resultado;
}

// Llamar a la función de buscar equipos al cargar la página o cuando sea necesario
buscarEquipos(39); // Ejemplo: liga 39 corresponde a la Premier League
