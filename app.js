// Reemplaza con tu clave API
const apiKey = '28b8a2f79509a7032d2528bdc52442c2';

// Función para buscar equipos de una liga específica
async function buscarEquipos(liga) {
    const url = `https://v3.football.api-sports.io/teams?league=${liga}&season=2024`;

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'x-apisports-key': apiKey
            }
        });

        if (!response.ok) {
            throw new Error(`Error en la solicitud: ${response.statusText}`);
        }

        const data = await response.json();
        return data.response;
    } catch (error) {
        console.error('Error al buscar equipos:', error);
        alert('Hubo un problema al obtener los datos de los equipos.');
    }
}

// Función para llenar los selectores de equipos
async function llenarEquipos() {
    const equipos = await buscarEquipos(39); // Premier League (Inglaterra)
    
    if (equipos.length === 0) {
        alert("No se encontraron equipos.");
        return;
    }

    equipos.forEach(equipo => {
        const option1 = document.createElement('option');
        option1.value = equipo.team.name;
        option1.text = equipo.team.name;

        const option2 = option1.cloneNode(true); // Para el segundo select

        document.getElementById('equipo1').appendChild(option1);
        document.getElementById('equipo2').appendChild(option2);
    });
}

// Llenar los selectores de equipos al cargar la página
llenarEquipos();
