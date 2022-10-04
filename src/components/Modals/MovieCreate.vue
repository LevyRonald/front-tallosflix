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
      <b-row>
        <b-col md="4">
          <b-form-group>
            <label for="plot">Resumo</label>
            <b-form-input
              id="plot"
              type="text"
              placeholder="Adicione um resumo"
              v-model="movies.plot"
            ></b-form-input>
          </b-form-group>
        </b-col>
        <b-col md="4">
          <b-form-group>
            <label for="genres">Gênero</label>
            <b-form-tags
              id="genres"
              :input-attrs="{
                'aria-describedby': 'tags-remove-on-delete-help',
              }"
              separator=" "
              remove-on-delete
              add-on-enter
              placeholder="Adicione gêneros do filme"
              v-model="movies.genres"
            >
            </b-form-tags>
          </b-form-group>
        </b-col>
        <b-col md="4">
          <b-form-group>
            <label for="runtime">Duração</label>
            <b-form-input
              id="runtime"
              type="number"
              placeholder="Adicione a duração do filme"
              v-model="movies.runtime"
            ></b-form-input>
          </b-form-group>
        </b-col>
        <b-col md="4">
          <b-form-group>
            <label for="cast">Elenco</label>
            <b-form-tags
              id="cast"
              :input-attrs="{
                'aria-describedby': 'tags-remove-on-delete-help',
              }"
              remove-on-delete
              add-on-enter
              placeholder="Adicione o elenco do filme"
              v-model="movies.cast"
            ></b-form-tags>
          </b-form-group>
        </b-col>
        <b-col md="4">
          <b-form-group>
            <label for="poster">Cartaz</label>
            <b-form-input
              id="poster"
              type="url"
              placeholder="Adicione a url do cartaz"
              v-model="movies.poster"
            ></b-form-input>
          </b-form-group>
        </b-col>
        <b-col md="4">
          <b-form-group>
            <label for="title">Titulo</label>
            <b-form-input
              id="title"
              type="text"
              placeholder="Adicione um titulo ao filme"
              v-model="movies.title"
            ></b-form-input>
          </b-form-group>
        </b-col>
        <b-col md="4">
          <b-form-group>
            <label for="fullplot">Sinopse</label>
            <b-form-input
              id="fullplot"
              type="text"
              placeholder="Adicione uma descrição completa ao filme"
              v-model="movies.fullplot"
            ></b-form-input>
          </b-form-group>
        </b-col>
        <b-col md="4">
          <b-form-group>
            <label for="languages">Idiomas</label>
            <b-form-tags
              id="languages"
              :input-attrs="{
                'aria-describedby': 'tags-remove-on-delete-help',
              }"
              separator=" "
              remove-on-delete
              add-on-enter
              placeholder="Adicione uma descrição completa ao filme"
              v-model="movies.languages"
            ></b-form-tags>
          </b-form-group>
        </b-col>
        <b-col md="4">
          <b-form-group>
            <label for="directors">Diretores</label>
            <b-form-tags
              id="directors"
              :input-attrs="{
                'aria-describedby': 'tags-remove-on-delete-help',
              }"
              remove-on-delete
              add-on-enter
              placeholder="Adicione diretores ao filme"
              v-model="movies.directors"
            ></b-form-tags>
          </b-form-group>
        </b-col>
        <b-col md="6">
          <b-form-group>
            <label for="year">Ano de lançamento</label>
            <b-form-input
              id="year"
              type="number"
              placeholder="Digite o ano de lançamento"
              v-model="movies.year"
            ></b-form-input>
          </b-form-group>
        </b-col>
        <b-col md="6">
          <label for="countries">Países</label>
          <b-form-tags
            id="countries"
            :input-attrs="{
              'aria-describedby': 'tags-remove-on-delete-help',
            }"
            remove-on-delete
            add-on-enter
            placeholder="Adicione os países"
            v-model="movies.countries"
          ></b-form-tags>
        </b-col>
        <div class="w-100 d-flex justify-content-between">
          <b-button @click="hideModal" class="btn btn-danger"
            >Cancelar</b-button
          >
          <b-button @click="criarFilme()" class="btn btn-primary"
            >Enviar</b-button
          >
        </div>
      </b-row>
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
        languages: [],
        directors: [],
        rated: "APROVED",
        year: "",
        countries: [],
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
      this.movies.year = parseInt(this.movies.year);
      this.movies.runtime = parseInt(this.movies.runtime);
      store.dispatch("createMovie", this.movies).then((response) => {
        console.log(response);
        this.hideModal();
      });
    },
    hideModal() {
      this.$bvModal.hide("modal-create");
      this.resetModal();
    },
    hideModalAwards() {
      this.$bvModal.hide("modal-awards");
    },
    hideModalIMDB() {
      this.$bvModal.hide("modal-imdb");
    },
    async resetModalIMDB() {
      this.movies = {
        imdb: {
          rating: "",
          votes: "",
          id: "",
        },
      };
      this.hideModalIMDB();
    },
    resetModal() {
      this.movies = {
        plot: "",
        genres: [],
        runtime: "",
        cast: [],
        poster: "",
        title: "",
        fullplot: "",
        languages: [],
        directors: [],
        rated: "",
        year: "",
        countries: [],
      };
    },
  },
};
</script>
