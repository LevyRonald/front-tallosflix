<template>
  <div class="content">
    <theater-create-vue :isAddNewTheaterModalActive="isAddNewTheaterModalActive"/>
    <theater-delete-vue :isDeleteTheaterModalActive="isDeleteTheaterModalActive"/>
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
                  <h4 class="card-title">Teatros Cadastrados</h4>
                  <p class="card-category">
                    Lista de Teatros cadastrados na tallosflix
                  </p>
                </div>
                <div
                  class="col-md-5 d-flex align-items-center justify-content-end"
                >
                  <button class="btn btn-primary h-75" type="submit" v-b-modal.modal-create>
                    <span class="text-nowrap">Adicionar</span>
                  </button>
                  <div class="pl-1">
                    <b-form-input
                      v-model="filter"
                      debounce="300"
                      placeholder="pesquisar..."
                    />
                  </div>
                </div>
              </div>
            </template>
            <b-table
              striped
              hover
              responsive
              :filter="filter"
              :items="theaters"
              :fields="column"
              :per-page="perPage"
              :current-page="currentPage"
              show-empty
              empty-filtered-text="nenhum usuário encontrado"
            >
              <template #cell(actions)="">
                <b-dropdown no-caret variant="flat">
                  <template #button-content>
                    <b-icon
                      icon="three-dots-vertical"
                      class="align-middle"
                    ></b-icon>
                  </template>
                  <b-dropdown-item>
                    <b-icon icon="box-arrow-up-right" scale="0.9"></b-icon>
                    <label class="pl-1">Editar</label>
                  </b-dropdown-item>
                  <b-dropdown-item v-b-modal.modal-delete>
                    <b-icon icon="trash" scale="0.9"></b-icon>
                    <label class="pl-1">Excluir</label>
                  </b-dropdown-item>
                </b-dropdown>
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
                    :total-rows="totalTheaters"
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
import { ref } from 'vue';
import { VBModal } from "bootstrap-vue";
import Card from "../../components/Cards/Card.vue";
import TheaterCreateVue from "../../components/Modals/TheaterCreate.vue";
import store from "../../store";
import TheaterDeleteVue from '../../components/Modals/TheaterDelete.vue';
export default {
  components: {
    Card,
    TheaterCreateVue,
    TheaterDeleteVue
  },
  data() {
    return {
      perPage: 10,
      currentPage: 1,
      filter: null,
      isAddNewTheaterModalActive: ref(false),
      isDeleteTheaterModalActive: ref(false),
      theaters: [],
      column: [
        { key: "_id" },
        { key: "theaterId", label: "Numero" },
        { key: "location.address.street1", label: "Endereço" },
        { key: "location.address.city", label: "Cidade" },
        { key: "location.address.state", label: "Estado" },
        { key: "location.address.zipcode", label: "Codigo postal" },
        { key: "location.geo.coordinates", label: "Cordenadas" },
        { key: "actions", label: "Ações" },
      ],
    };
  },
  directives: {
    "b-modal": VBModal,
  },
  computed: {
    totalTheaters() {
      return this.theaters.length;
    },
  },
  mounted() {
    store
      .dispatch("getTheaters")
      .then((response) => (this.theaters = response.data))
      .catch((erro) => console.log(erro));
  },
};
</script>