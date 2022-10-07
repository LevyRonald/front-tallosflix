<template>
  <b-modal
    hide-footer
    scrollable
    id="modal-view"
    size="xl"
    :title="movieGet.title"
    :visible="isMovieViewModalActive"
    @change="(val) => ('update:is-movie-view-modal-active', val)"
  >
    <b-card no-body class="overflow-hidden">
      <b-row no-gutters>
        <b-col md="4">
          <b-card-img
            :src="movieGet.poster"
            alt="Image"
            class="rounded-0"
          ></b-card-img>
        </b-col>
        <b-col md="7">
          <b-card-body>
            <div class="d-flex align-items-center">
              <b-card-title>{{ movieGet.title }}</b-card-title>
              <b-card-sub-title>{{ movieGet.year }}</b-card-sub-title>
            </div>
            <b-card-text>
              {{ movieGet.fullplot }}
            </b-card-text>
            <div class="w-50">
              <label for="rating">Avaliação IMDB</label>
              <b-form-rating
                v-model="movieGet.imdb.rating"
                stars="10"
                id="rating"
                variant="warning"
                readonly
                show-value
                inline
                no-border
                size="sm"
              ></b-form-rating>
              <label for="votes">Avaliação tomatoes</label>
              <b-form-rating
                v-model="movieGet.tomatoes.viewer.rating"
                id="votes"
                 variant="warning"
                 stars="10"
                 readonly
                 show-value
                 inline
                 no-border
                 size="sm"
              ></b-form-rating>
            </div>
          </b-card-body>
        </b-col>
      </b-row>
    </b-card>
  </b-modal>
</template>
<script>
import { VBModal } from "bootstrap-vue";
export default {
  components: {
    VBModal,
  },
  model: {
    prop: "isMovieViewModalActive",
    event: "update:is-movie-view-modal-active",
  },
  props: {
    isMovieViewModalActive: {
      type: Boolean,
      required: true,
    },
    movieGet: {
      type: Object,
      required: true,
      default: null,
    },
  },
  methods: {
    hideModal() {
      this.$bvModal.hide("modal-update");
    },
  },
};
</script>
<style scoped>
.card-img {
  width: 100%;
}
</style>