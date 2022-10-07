<template>
  <div class="login">
    <div class="container py-5 h-100">
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col-12 col-md-8 col-lg-6 col-xl-5">
          <card class="login-card card shadow-2-strong">
            <div class="card-body p-5 text-center">
              <h3 class="mb-5 color">Login</h3>
              <hr class="my-4" />
              <form method="post" @submit.prevent="enviar">
                <div class="form-outline mb-4">
                  <base-input
                    type="email"
                    placeholder="email"
                    v-model="user.email"
                  />
                </div>
                <div class="form-outline mb-4">
                  <base-input
                    type="password"
                    placeholder="senha"
                    v-model="user.password"
                  />
                </div>
                <button class="btn btn-light btn-block" type="submit">
                  <h5 class="color p-0 m-0">Login</h5>
                </button>
              </form>
            </div>
          </card>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Card from "../components/Cards/Card.vue";
import BaseInput from "../components/Inputs/BaseInput.vue";
import store from "../store/index.js"
export default {
  components: {
    Card,
    BaseInput,
  },
  data() {
    return {
      user: {
        email: "",
        password: "",
      },
    };
  },
  methods: {
    enviar() {
      store.dispatch("efetuarLogin", this.user)
      .then((response) => {
        this.$router.push({ name: "Overview" })
        console.log(response)
      })
    },
  },
};
</script>

<style scoped>
.login {
  background: url("http://bit.ly/2gPLxZ4");
  background-repeat: no-repeat;
  background-size: cover;
  height: 100vh;
}
.login-card {
  background-color: rgba(0, 0, 0, 0.26);
}
.color {
  color: white;
}
</style>