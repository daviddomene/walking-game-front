<template>
  <nav>
    <!-- <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link> -->
  </nav>
  <router-view/>
</template>

<style>
body {
  background-image: url('assets/img/fondo.webp');
  background-size: cover; /* La imagen cubrirá todo el espacio disponible */
  background-position: center; /* Centra la imagen */
  background-repeat: no-repeat; /* Evita que la imagen se repita */
  min-height: 100vh; /* Garantiza que ocupe al menos toda la altura de la ventana */
  margin: 0;
  font-family: 'Raleway', sans-serif;
  color: rgba(255, 253, 253, 1) !important;
  display: flex;
  flex-direction: column; /* Útil si tienes más contenido */
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}



nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
