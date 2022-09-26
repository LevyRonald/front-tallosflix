<template>
  <div class="content">
    <user-create-vue :is-add-new-user-modal-active.sync="isAddNewUserModalActive" />
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
                  <h4 class="card-title">Usuários cadastrados</h4>
                  <p class="card-category">
                    Lista de usuários cadastrados na tallosflix
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
                      debounce="300"
                      v-model="filter"
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
              :items="users"
              :fields="column"
              :filter="filter"
              :filter-included-fields="filterOn"
              @filtered="onFiltered"
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
                  <b-dropdown-item>
                    <b-icon icon="trash" scale="0.9"></b-icon>
                    <label class="pl-1">Excluir</label>
                  </b-dropdown-item>
                </b-dropdown>
              </template>
            </b-table>
          </card>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {
 VBModal, 
} from 'bootstrap-vue'
import Card from "../../components/Cards/Card.vue";
import store from "../../store/index.js";
import UserCreateVue from '../../components/Modals/UserCreate.vue';
import { ref } from 'vue';
export default {
  components: {
    Card,
    VBModal,
    UserCreateVue
  },
  data() {
    return {
      totalRows: 1,
      currentPage: 1,
      filter: null,
      isAddNewUserModalActive: ref(false),
      filterOn: [],
      users: [],
      column: [
        { key: "_id" },
        { key: "name", label: "nome" },
        { key: "email", label: "email" },
        { key: "actions", label: "ações" },
      ],
    };
  },
  directives: {
    'b-modal': VBModal
  },
  mounted() {
    store
      .dispatch("getUsers")
      .then((response) => (this.users = response.data))
      .catch((erro) => console.log(erro));
  },
  methods: {
    onFiltered(filteredItems) {
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },
  },
};
</script>
