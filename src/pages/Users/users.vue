<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="w-100">
          <card
            class="strpied-tabled-with-hover"
            body-classes="table-full-width table-responsive"
          >
            <template slot="header">
              <div class="row">
                <div class="col-md-8">
                  <h4 class="card-title">Usuários cadastrados</h4>
                  <p class="card-category">Lista de usuários cadastrados na tallosflix</p>
                </div>
                <div class="col-md-4">
                  <b-form-input v-model="filter" placeholder="pesquisar..."/>
                </div>
              </div>
            </template>
            <b-table
              striped
              hover
              responsive
              :items="users"
              :fields="column"
              :filter="filter"
              :filter-included-fields="filterOn"
              @filtered="onFiltered"
              show-empty
              empty-filtered-text="nenhum usuário encontrado"
            >

            </b-table>
          </card>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { BTable, BFormInput } from "bootstrap-vue"
import Card from "../../components/Cards/Card.vue";
import store from "../../store/index.js"
export default {
  components: {
    Card,
    BTable,
    BFormInput
  },
  data() {
    return {
      totalRows: 1,
      currentPage: 1,
      filter: null,
      filterOn: [],
      users: [],
      column: [
        { key: "_id"},
        { key: "name", label: "nome" },
        { key: "email", label: "email" },
      ]
    }
  },
  mounted() {
    store.dispatch("getUsers")
    .then((response) => (this.users = response.data))
    .catch((erro) => console.log(erro));
  },
  methods: {
    onFiltered(filteredItems) {
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },
  }
};
</script>
