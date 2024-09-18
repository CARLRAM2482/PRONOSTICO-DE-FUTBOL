const apiKey = '2c6a3d13f40145baa920727467794227';  // Tu clave de API
const ligaId = 2021;  // ID de la liga
const equipoId = 64;  // ID del equipo (por ejemplo, Manchester United)

async function buscarEquipos() {
    const url = `https://api.football-data.org/v4/competitions/${ligaId}/teams`;

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'X-Auth-Token': apiKey
            }
        });

        if (response.ok) {
            const data = await response.json();
            console.log('Datos obtenidos:', data);  // Verifica los datos
            return data.teams;
        } else {
            console.error(`Error en la solicitud: ${response.status}`);
            const errorData = await response.json();
            console.error('Datos del error:', errorData);
            return [];
        }
    } catch (error) {
        console.error('Error al buscar equipos:', error);
        return [];
    }
}

async function obtenerDetallesEquipo(id) {
    const url = `https://api.football-data.org/v4/teams/${id}`;

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'X-Auth-Token': apiKey
            }
        });

        if (response.ok) {
            const data = await response.json();
            console.log('Detalles del equipo:', data);  // Verifica los detalles
            return data;
        } else {
            console.error(`Error en la solicitud: ${response.status}`);
            const errorData = await response.json();
            console.error('Datos del error:', errorData);
            return null;
        }
    } catch (error) {
        console.error('Error al obtener detalles del equipo:', error);
        return null;
    }
}

(async () => {
    const detallesEquipo = await obtenerDetallesEquipo(equipoId);
    const resultadosDiv = document.getElementById('resultados');

    if (detallesEquipo) {
        resultadosDiv.innerHTML = `<p>Equipo encontrado: ${detallesEquipo.name}</p>`;
    } else {
        resultadosDiv.innerHTML = '<p>No se encontraron detalles del equipo.</p>';
    }
})();
