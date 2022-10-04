<template>
  <b-modal
    hide-footer
    id="modal-update"
    title="Atualizar Usuário"
    size="xl"
    :visible="isUpdateMovieModalActive"
    @change="(val) => ('update:is-update-movie-modal-active', val)"
    @show="resetModal"
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
              v-model="movieGet.plot"
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
              v-model="movieGet.genres"
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
              v-model="movieGet.runtime"
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
              v-model="movieGet.cast"
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
              v-model="movieGet.poster"
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
              v-model="movieGet.title"
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
              v-model="movieGet.fullplot"
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
              v-model="movieGet.languages"
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
              v-model="movieGet.directors"
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
              v-model="movieGet.year"
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
            v-model="movieGet.countries"
          ></b-form-tags>
        </b-col>
        <div class="w-100 d-flex justify-content-between">
          <b-button @click="hideModal" class="btn btn-danger"
            >Cancelar</b-button
          >
          <b-button @click="updateMovie()" class="btn btn-primary"
            >Atualizar</b-button
          >
        </div>
      </b-row>
    </b-form>
  </b-modal>
</template>
<script>
import { VBModal } from 'bootstrap-vue';
export default {
    directives: {
        "b-modal": VBModal
    },
    model: {
        prop: "isUpdateMovieModalActive",
        event: "update:is-update-movie-modal-active"
    },
    props: {
        isUpdateMovieModalActive: {
            type: Boolean,
            required: true
        },
        movieGet: {
            type: Object,
            required: true,
            default: null
        },
        updateMovie: {
            type: Function,
            required: true
        }
    },
    methods: {
        resetModal() {
            this.movieGet = {};
        },
        hideModal() {
            this.$bvModal.hide("modal-update")
        }
    }
};
</script>