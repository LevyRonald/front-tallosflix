<template>
  <div>
    <b-modal
      hide-footer
      id="modal-delete"
      ok-only
      ok-variant="danger"
      modal-class="modal-danger"
      title="confirme a ação"
      :visible="isDeleteTheaterModalActive"
      @change="(val) => ('update:is-delete-theater-modal-active', val)"
    >
      <b-card-text>Deseja realmente excluir o teatro?</b-card-text>
      <div class="w-100 d-flex justify-content-between">
        <b-button @click="hideModal" class="btn btn-primary">Cancelar</b-button>
        <b-button @click.prevent="theaterDel()" class="btn btn-danger"
          >Excluir</b-button
        >
      </div>
    </b-modal>
  </div>
</template>
<script>
import { VBModal } from "bootstrap-vue";
export default {
  components: {
    VBModal,
  },
  directives: {
    "b-modal": VBModal,
  },
  model: {
    prop: "isDeleteTheaterModalActive",
    event: "update:is-delete-theater-modal-active",
  },
  props: {
    isDeleteTheaterModalActive: {
      type: Boolean,
      required: true,
    },
    theaterDel: {
      type: Function,
      required: true,
    },
  },
  methods: {
    hideModal() {
        this.$bvModal.hide('modal-delete')
    },
  }
};
</script>
