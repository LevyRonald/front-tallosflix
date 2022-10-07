<template>
  <footer class="footer">
    <div class="container-fluid">
      <nav>
        <ul class="footer-menu">
          <li>
            <router-link :to="{path:'/admin'}">Dashboard</router-link>
          </li>
        </ul>
      </nav>
      <div class="copyright text-center">
        &copy; TallosFlix by
        <a href="https://tallos.com.br/" target="_blank">Tallos</a>.
        Projetado por <a href="https://github.com/LevyRonald" target="_blank">Levy Ronald</a>.
      </div>
    </div>
  </footer>
</template>
<script>
  export default {}

</script>
<style>

</style>
