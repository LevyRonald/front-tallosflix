<template>
  <b-modal
    hide-footer
    id="modal-delete"
    modal-class="modal-danger"
    title="confirme a ação"
    :visible="isDeleteMovieModalActive"
    @change="(val) => ('update:is-delete-movie-modal-active', val)"
  >
    <b-card-text>Deseja realmente excluir este filme?</b-card-text>
    <div class="w-100 d-flex justify-content-between">
      <b-button @click="hideModal" class="btn btn-primary">Cancelar</b-button>
      <b-button @click.prevent="movieDel()" class="btn btn-danger"
        >Excluir</b-button
      >
    </div>
  </b-modal>
</template>
<script>
import { VBModal } from "bootstrap-vue";
export default {
  directives: {
    "b-modal": VBModal,
  },
  model: {
    prop: "isDeleteMovieModalActive",
    event: "update:is-delete-movie-modal-active",
  },
  props: {
    isDeleteMovieModalActive: {
      type: Boolean,
      required: true,
    },
    movieDel: {
      type: Function,
      required: true,
    },
  },
  methods: {
    hideModal() {
      this.$bvModal.hide("modal-delete");
    },
  },
};
</script>
