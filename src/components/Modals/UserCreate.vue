<template>
  <b-modal
    hide-footer
    id="modal-create"
    cancel-variant="outline-secondary"
    title="Adicionar Usuário"
    :visible="isAddNewUserModalActive"
    @change="(val) => ('update:is-add-new-user-modal-active', val)"
    @show="resetModal"
  >
    <b-form @submit.prevent="criarUsuario">
      <b-form-group>
        <label for="email">Name:</label>
        <b-form-input
          id="name"
          type="text"
          placeholder="Nome..."
          v-model="user.name"
        />
      </b-form-group>
      <b-form-group>
        <label for="email">Email:</label>
        <b-form-input
          id="email"
          type="email"
          placeholder="Email..."
          v-model="user.email"
        />
      </b-form-group>
      <b-form-group>
        <label for="password">Senha:</label>
        <b-form-input
          type="password"
          placeholder="Senha..."
          v-model="user.password"
        />
      </b-form-group>
      <div class="w-100 d-flex justify-content-between">
        <b-button @click="hideModal"
          >Cancelar</b-button
        >
        <b-button @click.prevent="criarUsuario()" class="btn btn-primary"
          >Enviar</b-button
        >
      </div>
    </b-form>
  </b-modal>
</template>
<script>
import { VBModal } from "bootstrap-vue";
import store from "../../store/index.js";
export default {
  components: {
    VBModal,
  },
  data() {
    return {
      user: {
        name: "",
        email: "",
        password: "",
      },
    };
  },
  directives: {
    "b-modal": VBModal,
  },
  model: {
    prop: "isAddNewUserModalActive",
    event: "update:is-add-new-user-modal-active",
  },
  props: {
    isAddNewUserModalActive: {
      type: Boolean,
      required: true,
    },
  },
  methods: {
    criarUsuario() {
      store
        .dispatch("createUsers", this.user)
        .then((response) => {
            console.log(response)
            this.hideModal()
        });
    },
    hideModal(){
        this.$bvModal.hide("modal-create");
        this.user = {}
    },
    resetModal() {
        this.user = {}
    }
  },
};
</script>
