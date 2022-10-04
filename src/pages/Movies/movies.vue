<template>
  <div class="content">
    <movie-create-vue :isAddNewMovieModalActive="isAddNewMovieModalActive" />
    <movie-delete-vue
      :isDeleteMovieModalActive="isDeleteMovieModalActive"
      :movieDel="moviedelete"
    />
    <movie-update-vue
      :isUpdateMovieModalActive="isUpdateMovieModalActive"
      :movieGet="getMovie"
      :updateMovie="movieupdate"
    />
    <div class="container-fluid">
      <div class="row">
        <div class="w-100">
          <card
            class="strpied-tabled-with-hover"
            body-classes="table-full-width table-responsive"
          >
            <template slot="header">
              <div class="row">
                <div class="col-md-7">
                  <h4 class="card-title">Filmes cadastrados</h4>
                  <p class="card-category">
                    Lista de filmes cadastrados na tallosflix
                  </p>
                </div>
                <div
                  class="col-md-5 d-flex align-items-center justify-content-end"
                >
                  <button
                    class="btn btn-primary h-75"
                    type="submit"
                    v-b-modal.modal-create
                  >
                    <span class="text-nowrap">Adicionar</span>
                  </button>
                  <div class="pl-1">
                    <b-form-input
                      debounce="300"
                      placeholder="pesquisar..."
                    ></b-form-input>
                  </div>
                </div>
              </div>
            </template>
            <b-table
              striped
              hover
              responsive
              :per-page="perPage"
              :current-page="currentPage"
              :fields="column"
              :items="movies"
            >
              <template #cell(actions)="{ item }">
                <b-dropdown no-caret variant="flat">
                  <template #button-content>
                    <b-icon
                      icon="three-dots-vertical"
                      class="align-middle"
                    ></b-icon>
                  </template>
                  <b-dropdown-item @click="updatemovie(item)">
                    <b-icon icon="box-arrow-up-right" scale="0.9"></b-icon>
                    <label class="pl-1">Editar</label>
                  </b-dropdown-item>
                  <b-dropdown-item @click="getmovie(item)">
                    <b-icon icon="trash" scale="0.9"></b-icon>
                    <label class="pl-1">Excluir</label>
                  </b-dropdown-item>
                </b-dropdown>
              </template>
              <template #cell(show_details)>
                <b-button variant="outline">
                  <b-icon icon="eye"></b-icon>
                </b-button>
              </template>
            </b-table>
            <div class="mx-2 mb-2 w-100">
              <b-row>
                <b-col
                  cols="12"
                  sm="12"
                  class="
                    d-flex
                    align-items-center
                    justify-content-center justify-content-sm-end
                  "
                >
                  <b-pagination
                    v-model="currentPage"
                    :total-rows="totalMovies"
                    :per-page="perPage"
                    first-number
                    last-number
                    class="mb-0 mt-1 mt-sm-0"
                  >
                  </b-pagination>
                </b-col>
              </b-row>
            </div>
          </card>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { ref } from "vue";
import Card from "../../components/Cards/Card.vue";
import MovieCreateVue from "../../components/Modals/MovieCreate.vue";
import store from "../../store";
import MovieDeleteVue from "../../components/Modals/MovieDelete.vue";
import http from "../../http";
import MovieUpdateVue from "../../components/Modals/MovieUpdate.vue";

export default {
  components: { Card, MovieCreateVue, MovieDeleteVue, MovieUpdateVue },
  data() {
    return {
      perPage: 5,
      currentPage: 1,
      isAddNewMovieModalActive: ref(false),
      isDeleteMovieModalActive: ref(false),
      isUpdateMovieModalActive: ref(false),
      movies: [],
      getMovie: {},
      column: [
        { key: "show_details", label: "visualizar filme" },
        { key: "title", label: "titulo" },
        { key: "plot", label: "descrição" },
        { key: "year", label: "ano" },
        { key: "actions", label: "ações" },
      ],
    };
  },
  computed: {
    totalMovies() {
      return this.movies.length;
    },
  },
  mounted() {
    store
      .dispatch("getMovies")
      .then((response) => (this.movies = response.data))
      .catch((erro) => console.log(erro));
  },
  methods: {
    moviedelete() {
      http.delete(`movies/delete/${this.getMovie._id}`).then((response) => {
        console.log(response), this.$bvModal.hide("modal-delete");
      });
    },
    movieupdate() {
      this.getMovie.year = parseInt(this.getMovie.year);
      this.getMovie.runtime = parseInt(this.getMovie.runtime);
      http
        .patch(`movies/update/${this.getMovie._id}`, this.getMovie)
        .then((response) => {
          console.log(response), this.$bvModal.hide("modal-update");
        });
    },
    getmovie(movies) {
      this.getMovie = {
        ...movies,
      };
      this.$bvModal.show("modal-delete");
    },
    updatemovie(movies) {
      (this.getMovie = {
        ...movies,
      }),
        this.$bvModal.show("modal-update");
    },
  },
};
</script>
