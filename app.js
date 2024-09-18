const apiKey = '2c6a3d13f40145baa920727467794227';
const ligaId = 2021;  // Cambia esto según la liga que desees consultar
const equipoNombre = 'Manchester United';  // Cambia esto al equipo que quieras buscar

// Función para buscar equipos
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
            return data.teams;
        } else {
            console.error(`Error en la solicitud: ${response.status}`);
            const errorData = await response.json();
            console.error(errorData);
            return [];
        }
    } catch (error) {
        console.error('Error al buscar equipos:', error);
        return [];
    }
}

// Función para buscar un equipo por nombre
function buscarEquipoPorNombre(equipos, nombreEquipo) {
    return equipos.find(equipo => equipo.name.toLowerCase() === nombreEquipo.toLowerCase());
}

// Función para obtener los resultados de los partidos
async function obtenerResultadosEquipo(equipoId) {
    const url = `https://api.football-data.org/v4/teams/${equipoId}/matches`;

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'X-Auth-Token': apiKey
            }
        });

        if (response.ok) {
            const data = await response.json();
            return data.matches;
        } else {
            console.error(`Error en la solicitud: ${response.status}`);
            const errorData = await response.json();
            console.error(errorData);
            return [];
        }
    } catch (error) {
        console.error('Error al obtener resultados:', error);
        return [];
    }
}

// Función para obtener estadísticas de un partido
async function obtenerEstadisticasPartido(partidoId) {
    const url = `https://api.football-data.org/v4/matches/${partidoId}`;

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'X-Auth-Token': apiKey
            }
        });

        if (response.ok) {
            const data = await response.json();
            return data.match;
        } else {
            console.error(`Error en la solicitud: ${response.status}`);
            const errorData = await response.json();
            console.error(errorData);
            return {};
        }
    } catch (error) {
        console.error('Error al obtener estadísticas:', error);
        return {};
    }
}

// Ejecutar funciones para obtener datos
(async () => {
    const equipos = await buscarEquipos();
    const resultadosDiv = document.getElementById('resultados');

    if (equipos.length > 0) {
        const equipo = buscarEquipoPorNombre(equipos, equipoNombre);

        if (equipo) {
            const resultados = await obtenerResultadosEquipo(equipo.id);

            if (resultados.length > 0) {
                resultadosDiv.innerHTML = ''; // Limpiar resultados anteriores
                for (const partido of resultados) {
                    const fecha = partido.utcDate;
                    const local = partido.homeTeam.name;
                    const visitante = partido.awayTeam.name;
                    const golesLocal = partido.score.fullTime.home;
                    const golesVisitante = partido.score.fullTime.away;

                    let partidoHTML = `
                        <div>
                            <p>Fecha: ${fecha}</p>
                            <p>${local} ${golesLocal} - ${golesVisitante} ${visitante}</p>
                    `;

                    // Obtener estadísticas del partido
                    const estadisticas = await obtenerEstadisticasPartido(partido.id);

                    if (estadisticas) {
                        partidoHTML += `
                            <p>Tiros al arco local: ${estadisticas.homeTeam.statistics.shotsOnGoal}</p>
                            <p>Tiros al arco visitante: ${estadisticas.awayTeam.statistics.shotsOnGoal}</p>
                            <p>Faltas local: ${estadisticas.homeTeam.statistics.fouls}</p>
                            <p>Faltas visitante: ${estadisticas.awayTeam.statistics.fouls}</p>
                            <p>Tiros de esquina local: ${estadisticas.homeTeam.statistics.corners}</p>
                            <p>Tiros de esquina visitante: ${estadisticas.awayTeam.statistics.corners}</p>
                        </div>
                        <hr>
                        `;
                    } else {
                        partidoHTML += '<p>No se encontraron estadísticas para el partido.</p></div><hr>';
                    }

                    resultadosDiv.innerHTML += partidoHTML;
                }
            } else {
                resultadosDiv.innerHTML = '<p>No se encontraron resultados.</p>';
            }
        } else {
            resultadosDiv.innerHTML = '<p>Equipo no encontrado.</p>';
        }
    } else {
        resultadosDiv.innerHTML = '<p>No se encontraron equipos.</p>';
    }
})();
