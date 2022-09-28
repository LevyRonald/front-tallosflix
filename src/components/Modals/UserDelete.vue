<template>
  <div>
    <b-modal
      hide-footer
      id="modal-delete"
      ok-only
      ok-variant="danger"
      modal-class="modal-danger"
      title="confirme a ação"
      :visible="isDeleteUserModalActive"
      @change="(val) => ('update:is-delete-user-modal-active', val)"
    >
      <b-card-text>Deseja realmente excluir o usuário?</b-card-text>
      <div class="w-100 d-flex justify-content-between">
        <b-button @click="hideModal">Cancelar</b-button>
        <b-button @click.prevent="userDel()" class="btn btn-danger"
          >Excluir</b-button
        >
      </div>
    </b-modal>
  </div>
</template>
<script>
import { VBModal } from "bootstrap-vue";
import usersVue from "../../pages/Users/users.vue";
import { ref } from 'vue';
export default {
  components: {
    VBModal,
    usersVue,
  },
  directives: {
    "b-modal": VBModal,
  },
  model: {
    prop: "isDeleteUserModalActive",
    event: "update:is-delete-user-modal-active",
  },
  props: {
    isDeleteUserModalActive: {
      type: Boolean,
      required: true,
    },
    userDel: {
      type: Function,
      required: true
    }
    
  },    
  methods: {
    hideModal() {
      this.$bvModal.hide("modal-delete");
    },
    DeletarUsuario() {
      this.$emit('deletarUsuario', this.userDel)
    }
  },
};
</script>
