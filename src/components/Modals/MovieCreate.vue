<template>
  <b-modal
    hide-footer
    id="modal-create"
    title="Adicionar Filme"
    :visible="isAddNewMovieModalActive"
    @change="(val) => ('update:is-add-new-movie-modal-active', val)"
    @show="resetModal"
     size="xl"
  >
    <b-form>
      <b-form-group>
        <label for="plot">Resumo</label>
        <b-form-input
          id="plot"
          type="text"
          placeholder="Adicione um resumo"
          v-model="movies.plot"
        ></b-form-input>
      </b-form-group>
      <b-form-group>
        <label for="genres">Gênero</label>
        <b-form-tags
          id="genres"
          :input-attrs="{ 'aria-describedby': 'tags-remove-on-delete-help' }"
          separator=" "
          remove-on-delete
          no-add-on-enter
          placeholder="Adicione gêneros do filme"
          v-model="movies.genres"
        >
        </b-form-tags>
      </b-form-group>
      <b-form-group>
        <label for="runtime">Duração</label>
        <b-form-input
          id="runtime"
          type="number"
          placeholder="Adicione a duração do filme"
          v-model="movies.runtime"
        ></b-form-input>
      </b-form-group>
      <div class="w-100 d-flex justify-content-between">
        <b-button @click="hideModal" class="btn btn-danger">Cancelar</b-button>
        <b-button @click="criarFilme()" class="btn btn-primary"
          >Enviar</b-button
        >
      </div>
    </b-form>
  </b-modal>
</template>
<script>
import { VBModal } from "bootstrap-vue";
import store from "../../store";
export default {
  components: {},
  data() {
    return {
      movies: {
        plot: "",
        genres: [],
        runtime: "",
        cast: [],
        poster: "",
        title: "",
        fullplot: "",
        languages: "",
        directors: [],
        rated: "",
        awards: {
          wins: "",
          nominations: "",
          text: "",
        },
        year: "",
        imdb: {
          rating: "7.4",
          votes: "3452",
          id: "321",
        },
        countries: [],
        tomatoes: {
          viewer: {
            rating: "3.7",
            numReviews: "3115",
            meter: "75",
          },
          critic: {
            rating: "7.6",
            numReviews: "6",
            meter: "100",
          },
        },
      },
    };
  },
  directives: {
    "b-modal": VBModal,
  },
  model: {
    prop: "isAddNewMovieModalActive",
    event: "update:is-add-new-movie-modal-active",
  },
  props: {
    isAddNewMovieModalActive: {
      type: Boolean,
      required: true,
    },
  },
  methods: {
    criarFilme() {
        this.movies.runtime = parseInt(this.movies.runtime)
      store.dispatch("createMovie", this.movies).then((response) => {
        console.log(response);
        this.hideModal();
      });
    },
    hideModal() {
      this.$bvModal.hide("modal-create");
      this.resetModal();
    },
    resetModal() {
      this.movies = {};
    },
  },
};
</script>
