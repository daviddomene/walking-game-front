<template>
    <div class="row col-md-12">
        <!-- Modal de selección de personaje -->
        <div>
    <!-- Modal de selección de personaje -->
    <div v-if="showCharacterModal" class="modal-overlay d-flex justify-content-center align-items-center">
      <div class="modal-content container p-4 rounded" style="max-width: 800px;">
        <h5 class="text-center mb-4">Selecciona tu personaje</h5>
        <div class="row">
          <!-- Lista de personajes -->
          <div
            class="col-md-4 mb-4 d-flex justify-content-center"
            v-for="character in characters"
            :key="character.id"
          >
            <div class="card text-center bg-secondary carta-elegir-personaje" @click="selectCharacter(character.image)">
              <img :src="character.image" class="card-img-top rounded" alt="Personaje">
              <div class="card-body">
                <p class="card-text text-white fw-bold">{{ character.name }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
        <!-- Modal config partida -->
        <div v-if="showModal" class="modal-overlay">
            <div class="modal-content">
                <h5>Configurar Partida</h5>

                <!-- Inputs para configurar el tablero -->
                <div class="mt-2">
                    <label for="width">Ancho del tablero:</label>
                    <input
                        type="number"
                        id="width"
                        class="form form-control"
                        v-model.number="inputWidth"
                        placeholder="Introduce ancho"
                    />
                </div>
                <div class="mt-2">
                    <label for="height">Alto del tablero:</label>
                    <input
                        type="number"
                        id="height"
                        class="form form-control"
                        v-model.number="inputHeight"
                        placeholder="Introduce alto"
                    />
                </div>

                <!-- Input para el nombre del jugador -->
                <div class="mt-2">
                    <label class="text-white" for="player">Nombre del jugador:</label>
                    <input
                    class="form form-control"
                    type="text"
                    id="player"
                    v-model="playerName"
                    placeholder="Introduce tu nombre"
                    />
                </div>

                <!-- Botón para generar el tablero -->
                <button @click="startGame" class="btn btn-primary">Iniciar Partida</button>
            </div>
        </div>

        <!-- Columna izquierda para detalles -->
        <div class="col-md-3 col-sm-3 justify-content-center align-items-center px-5 contain-player">
            <div class="card w-100 border-0" style="width: 18rem;">
                <img :src="playerImage" class="card-img-top player">
                <div class="card-body">
                    <h5 class="text-white">Player <span class="fw-bold">{{playerName}}</span></h5>
                    <p class="card-text text-white">
                       Moviminetos: {{ playerPositions.map(movimiento => `[${movimiento.row} - ${movimiento.column}]`).join(', ') }}
                    </p>
                </div>
            </div>
        </div>

        <!-- Contenedor del tablero -->
        <div class="col-md-9 col-sm-9">
            <div v-if="isLoaded" class="contenedor-tablero" :style="{gridTemplateColumns: `repeat(${width}, 1fr)`}">
            <!-- Generar dinámicamente las filas y columnas -->
            <div
                v-for="row in height"
                :key="'row-' + row"
                class="fila"
            >
            <div
                v-for="col in width"
                :key="'col-' + col"
                class="item mt-2"
                @click="updatePlayerPosition(row - 1, col - 1)"
                :class="{ 'border-movimiento': isPositionOccupied(row - 1, col - 1) }"
            >
                {{ row - 1 }}-{{ col - 1 }} <!-- Coordenadas comenzando desde 0 -->
            </div>
        </div>
    </div>
    <div v-else class="loading-screen">
        <p class="text-white">
            Por favor, configura el tablero y haz clic en "Generar Tablero".
        </p>
    </div>
</div>

    </div>
</template>

<script>
import axios from 'axios';
import player1 from '@/assets/img/player1.png';
import player2 from '@/assets/img/player2.png';
import player3 from '@/assets/img/player3.png';
import player4 from '@/assets/img/player4.png';
import player5 from '@/assets/img/player5.png';
import player6 from '@/assets/img/player6.png';
export default {
    name: 'GameView',
    data() {
        return {
            showCharacterModal: true,
            characters: [
                { id: 1, name: "Player 1", image: player1 },
                { id: 2, name: "Player 2", image: player2 },
                { id: 3, name: "Player 3", image: player3 },
                { id: 4, name: "Player 4", image: player4 },
                { id: 5, name: "Player 5", image: player5 },
                { id: 6, name: "Player 6", image: player6 },
            ],
            inputWidth: 0, // Valor inicial para el ancho ingresado por el usuario
            inputHeight: 0, // Valor inicial para el alto ingresado por el usuario
            width: 0, // Dimensión del tablero (ancho)
            height: 0, // Dimensión del tablero (alto)
            isLoaded: false, // Indica si el tablero debe renderizarse
            showModal: false, // Indica si el modal está abierto
            playerName: '',
            playerPositions: [], // Almacenaremos las posiciones del jugador
        };
    },
    methods: {
        selectCharacter(image) {
            this.playerImage = image; // Actualizar imagen del jugador
            this.showCharacterModal = false; // Cerrar el modal de selección de personaje
            this.showModal = true; // Abrir el modal de configuración del tablero
        },
        async startGame() {
            try {
                if (this.inputWidth <= 0 || this.inputHeight <= 0 || !this.playerName) {
                    alert('Por favor, introduce valores válidos.');
                    return;
                }

                // 1. Crear la partida
                const gameResponse = await fetch('https://localhost:7277/Game', {
                    method: 'POST',
                    headers: {
                        'accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        width: this.inputWidth,
                        height: this.inputHeight,
                    }),
                });

                if (!gameResponse.ok) {
                    throw new Error('Error al crear la partida.');
                }
                console.log(this.playerName);

                // 2. Crear el jugador
                const playerResponse = await fetch('https://localhost:7277/Player', {
                    method: 'POST',
                    headers: {
                        'accept': 'text/plain',
                        'Content-Type': 'application/json-patch+json',
                    },
                    body: JSON.stringify({
                        username: this.playerName,
                    }),
                });

                if (!playerResponse.ok) {
                    throw new Error('Error al crear el jugador.');
                }
                const response = await axios.get(
                `https://localhost:7277/Player?username=${this.playerName}`,
                {
                    headers: {
                    accept: 'text/plain',
                    },
                }
                );
                // Guardamos las posiciones del jugador
                this.playerPositions = response.data.player.positions;

                console.log(this.playerPositions);

                // 3. Configurar el tablero con los valores introducidos
                this.width = this.inputWidth;
                this.height = this.inputHeight;
                this.isLoaded = true;
                this.showModal = false; // Cierra el modal

            } catch (error) {
                console.error('Error:', error.message);
                alert('Hubo un error al iniciar la partida.');
            }
        },



        async fetchPlayerPosition() {
            try {
                const response = await axios.get(
                `https://localhost:7277/Player?username=${this.playerName}`,
                {
                    headers: {
                    accept: 'text/plain',
                    },
                }
                );
                // Guardamos las posiciones del jugador
                this.playerPositions = response.data.player.positions;

                console.log(this.playerPositions);
            } catch (error) {
                console.error('Error fetching player positions:', error);
            }
        },
        isPositionOccupied(row, column) {
            // Comprobamos si la posición está en el array de posiciones del jugador
            return this.playerPositions.some(
                (pos) => pos.row === row && pos.column === column
            );
        },
        generateGrid() {
            if (this.inputWidth > 0 && this.inputHeight > 0) {
                
                
                
                
                this.width = this.inputWidth; // Asigna el valor del input al ancho del tablero
                this.height = this.inputHeight; // Asigna el valor del input al alto del tablero
                this.isLoaded = true; // Marca que el tablero está listo para mostrarse
                this.showModal = false; // Cierra el modal
                
                const payload = {
                    width: this.inputWidth, // Obtiene el valor reactivo de width
                    height: this.inputHeight, // Obtiene el valor reactivo de height
                };

                axios.post('https://localhost:7277/Game', payload, {
                    headers: {
                    'accept': 'text/plain',
                    'Content-Type': 'application/json-patch+json',
                    },
                })
                .then(response => {
                    console.log('Respuesta:', response.data);
                })
                .catch(error => {
                    console.error('Error en la solicitud:', error);
                });




            } else {
                alert("Por favor, introduce valores válidos para el ancho y el alto del tablero.");
            }
        },
        resetGame() {
            this.isLoaded = false; // Oculta el tablero
            this.showModal = true; // Reabre el modal para configurar el tablero
            this.inputWidth = 0; // Restablece los valores de entrada
            this.inputHeight = 0;
        },
        async updatePlayerPosition(row, column) {
      try {
        const response = await axios.patch(
          `https://localhost:7277/Player/${this.playerName}`,
          [
            {
              op: 'add',
              path: '/position',
              value: { row: row, column: column },
            },
          ],
          {
            headers: {
              'Content-Type': 'application/json-patch+json',
              accept: 'text/plain',
            },
          }
        );
        console.log('Player position updated:', response.data);
        // Actualizamos la lista de posiciones después de un movimiento
        this.fetchPlayerPosition();
      } catch (error) {
        console.error('Error updating player position:', error);

        // Obtener el elemento .item y agregar la clase de vibración
        const itemElements = document.querySelectorAll('.item');
        
        // Agregar la clase 'vibrate' a todos los elementos .item
        itemElements.forEach(item => {
            item.classList.add('vibrate');
            
            // Remover la clase después de 0.2 segundos (duración de la animación)
            setTimeout(() => {
                item.classList.remove('vibrate');
            }, 200); // El tiempo de duración de la vibración en ms
        });

      }
    },
    }

};
</script>

<style scoped>
/* Estilo del modal */
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.8);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
}
.character-card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.character-card:hover {
  transform: translateY(-10px); /* Mueve la tarjeta hacia arriba */
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.3); /* Sombra más intensa */
}

.card:hover {
  transform: scale(1.05); /* Efecto de zoom al pasar el cursor */
  transition: transform 0.2s ease-in-out;
}

.modal-content {
    background: white;
    padding: 20px;
    border-radius: 8px;
    text-align: center;
    width: 90%;
    max-width: 400px;
}

.modal-buttons {
    margin-top: 20px;
}

/* Estilo del tablero */
.contenedor-tablero {
    display: grid;
    gap: 10px;
    width: 100%;
    height: auto;
    box-sizing: border-box;
}

.item {
    background-image: url('../assets/img/fondo_tablero.png');
    background-size: cover;
    display: flex;
    justify-content: center;
    color: white;
    align-items: center;
    font-size: 20px;
    padding: 20px;
    box-sizing: border-box;
    height: 100px;
    /* Tamaño fijo de las celdas */
}

.carta-elegir-personaje{
    width: 12rem; 
    cursor: pointer;
}

.border-movimiento {
  border: 9px solid rgba(255, 0, 184, 1);
  border-radius: 8px;
  background-image: url('../assets/img/player1.png') !important;
  background-size: cover; 
  background-position: center;
  background-repeat: no-repeat;
  background-color: rgba(52, 51, 51, 1);
}

.item:hover{
  background-image: url('../assets/img/player1.png');
  background-size: cover; 
  background-position: center;
  background-repeat: no-repeat;
  display: flex;
  justify-content: center;
  box-sizing: border-box;
  border: 9px solid rgb(64, 136, 243);
  background-color: rgba(52, 51, 51, 1);
}
.loading-screen {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    color: white;
    font-size: 24px;
    background-color: #1a1514;
}

button {
    margin-top: 10px;
}
.card-body{
  background-color: #1a1514;
}
.player{
  /* background-color: #362b28; */
  background: rgba(52, 51, 51, 1);
  border: 0px;

}
/* Animación de vibración */
@keyframes vibrate {
  0% { transform: translateX(0); }
  25% { transform: translateX(-4px); }
  50% { transform: translateX(4px); }
  75% { transform: translateX(-4px); }
  100% { transform: translateX(4px); }
}

/* Clase para aplicar la vibración */
.vibrate {
  animation: vibrate 0.2s linear infinite;
}

</style>
