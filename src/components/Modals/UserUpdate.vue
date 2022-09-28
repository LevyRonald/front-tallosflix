<template>
  <b-modal
    hide-footer
    id="modal-update"
    cancel-variant="outline-secondary"
    title="Atualizar Usuário"
    :visible="isUpdateUserModalActive"
    @change="(val) => ('update:is-update-user-modal-active', val)"
    @show="resetModal"
  >
    <b-form @submit.prevent="atualizarUsuario">
      <b-form-group>
        <label for="email">Name:</label>
        <b-form-input
          id="name"
          type="text"
          placeholder="Nome..."
          v-model="userGet.name"
        />
      </b-form-group>
      <b-form-group>
        <label for="email">Email:</label>
        <b-form-input
          id="email"
          type="email"
          placeholder="Email..."
          v-model="userGet.email"
        />
      </b-form-group>
      <b-form-group>
        <label for="password">Senha:</label>
        <b-form-input
          type="password"
          placeholder="Senha..."
          v-model="userGet.password"
        />
      </b-form-group>
      <div class="w-100 d-flex justify-content-between">
        <b-button @click="hideModal">Cancelar</b-button>
        <b-button @click.prevent="updateUser()" class="btn btn-primary"
          >Atualizar</b-button
        >
      </div>
    </b-form>
  </b-modal>
</template>
<script>
import { VBModal } from "bootstrap-vue";
export default {
  components: {
    VBModal,
  },
  model: {
    prop: "isUpdateUserModalActive",
    event: "update:is-update-user-modal-active",
  },
  props: {
    isUpdateUserModalActive: {
      type: Boolean,
      required: true,
    },
    userGet: {
      type: Object,
      required: true,
      default: null,
    },
    updateUser: {
      type: Function,
      required: true,
    },
  },
  methods: {
    fetchUser() {
      this.$emit("fetchuser", this.userGet);
    },
    resetModal() {
        this.userGet = {}
    },
    hideModal() {
      this.$bvModal.hide("modal-update");
    },
  },
};
</script>
