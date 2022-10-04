<template>
  <ul class="nav nav-mobile-menu">
    <li class="nav-item" @click.prevent="logout">
      <a class="nav-link" href="#">
        <span class="no-icon">Log out</span>
      </a>
    </li>
  </ul>
</template>
<script>
import store from '../store';
  export default {
    name: 'mobile-menu',
    methods: {
      logout() {
        store.commit("DESLOGAR_USUARIO");
        this.$router.push({ name: 'login' });
      },
    }
  }
</script>
<style>
</style>
