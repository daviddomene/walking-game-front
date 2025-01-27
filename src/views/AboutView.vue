<template>
  <div>
    <!-- Tabla de posiciones -->
    <table>
      <tr v-for="(row, rowIndex) in table" :key="rowIndex">
        <td v-for="(column, columnIndex) in row" :key="columnIndex">
          <!-- Marcamos el botón si la posición está ocupada -->
          <button
            @click="updatePlayerPosition(rowIndex, columnIndex)"
            :class="{'occupied': isPositionOccupied(rowIndex, columnIndex)}"
          >
            Move Player to ({{ rowIndex }}, {{ columnIndex }})
          </button>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      table: [
        [{}, {}, {}, {}, {}],
        [{}, {}, {}, {}, {}],
        [{}, {}, {}, {}, {}],
        [{}, {}, {}, {}, {}],
        [{}, {}, {}, {}, {}],
      ],
      username: 'david', // El jugador cuya posición se actualizará
      playerPositions: [], // Almacenaremos las posiciones del jugador
    };
  },
  created() {
    this.fetchPlayerPosition();
  },
  methods: {
    async fetchPlayerPosition() {
      try {
        const response = await axios.get(
          `https://localhost:7277/Player?username=${this.username}`,
          {
            headers: {
              accept: 'text/plain',
            },
          }
        );
        // Guardamos las posiciones del jugador
        this.playerPositions = response.data.player.positions;
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
    async updatePlayerPosition(row, column) {
      try {
        const response = await axios.patch(
          `https://localhost:7277/Player/${this.username}`,
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
      }
    },
  },
};
</script>

<style scoped>
/* Estilos para la tabla, botones y otros elementos */
button.occupied {
  background-color: green; /* Colorea los botones de las posiciones ocupadas */
  color: white;
}
</style>
