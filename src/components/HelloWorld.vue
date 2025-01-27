<template>
<div class="row col-md-12">
  <div class="col-md-3 justify-content-center align-items-center px-5">
    <div class="card w-100 border-0" style="width: 18rem;">
      <img src="../assets/img/player1.png" class="card-img-top player">
      <div class="card-body">
        <h5 class="text-white">Player <span class="fw-bold">One</span></h5>
        <p class="card-text text-white">Movimientos: C1-D2-E3</p>
      </div>
    </div>
  </div>
  <div class="col-md-9">
    <div class="contenedor-tablero">
      <div class="item">1</div>
      <div class="item border-movimiento">2</div>
      <div class="item">3</div>
      <div class="item">4</div>
      <div class="item">5</div>
      <div class="item border-movimiento">6</div>
      <div class="item">7</div>
      <div class="item">8</div>
      <div class="item">9</div>
      <div class="item border-movimiento">10</div>
      <div class="item border-movimiento">11</div>
      <div class="item">12</div>
      <div class="item">13</div>
      <div class="item">14</div>
      <div class="item border-movimiento">15</div>
      <div class="item border-movimiento">16</div>
    </div>
  </div>

</div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.player{
  /* background-color: #362b28; */
  background: rgba(52, 51, 51, 1);
  border: 0px;

}
.card-body{
  background-color: #1a1514;
}

h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

.contenedor-tablero {
  display: grid;
  grid-template-columns: repeat(4, 1fr); /* Crea 4 columnas de igual tamaño */
  grid-template-rows: repeat(4, auto); /* Crea 4 filas, que se adaptan al contenido */
  gap: 10px; /* Espacio entre los divs */
  width: 100%; /* Ocupa el 100% del ancho */
  height: 80vh; /* Ocupa el 100% de la altura de la pantalla */

  box-sizing: border-box;
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

.item {
  /* background-color: lightblue; */
  background-image: url('../assets/img/fondo_tablero.png');
  background-size: cover; 
  display: flex;
  justify-content: center;
  color: white;
  align-items: center;
  font-size: 20px;
  padding: 20px;
  box-sizing: border-box;
  height: 100%; /* Asegura que los divs se ajusten al tamaño de la fila */
}

/* Asegurarse de que los divs se ajusten en pantallas más pequeñas */
@media (max-width: 1200px) {
  .contenedor-tablero {
    grid-template-columns: repeat(4, 1fr);
  }
}

@media (max-width: 768px) {
  .contenedor-tablero {
    grid-template-columns: repeat(4, 1fr); /* Cambia a 2 columnas en pantallas más pequeñas */
  }
}

@media (max-width: 480px) {
  .contenedor-tablero {
    grid-template-columns: repeat(4, 1fr); /* Cambia a 1 columna en pantallas muy pequeñas */
  }
}

</style>
