<template>
  <div class="content">
    <user-create-vue
      :is-add-new-user-modal-active.sync="isAddNewUserModalActive"
    />
    <user-delete-vue
      :is-delete-user-modal-active.sync="isDeleteUserModalActive"
      :userDel="userdelete"
    />
    <user-update-vue
      :isUpdateUserModalActive="isUpdateUserModalActive"
      :userGet="usuarioGetDel"
      :updateUser="userupdate"
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
                  <h4 class="card-title">Usuários cadastrados</h4>
                  <p class="card-category">
                    Lista de usuários cadastrados na tallosflix
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
              :per-page="perPage"
              :current-page="currentPage"
              :items="users"
              :fields="column"
              :filter="filter"
              :filter-included-fields="filterOn"
              @filtered="onFiltered"
              show-empty
              empty-filtered-text="nenhum usuário encontrado"
            >
              <template #cell(actions)="{ item }">
                <b-dropdown no-caret variant="flat">
                  <template #button-content>
                    <b-icon
                      icon="three-dots-vertical"
                      class="align-middle"
                    ></b-icon>
                  </template>
                  <b-dropdown-item @click="updateuser(item)">
                    <b-icon icon="box-arrow-up-right" scale="0.9"></b-icon>
                    <label class="pl-1">Editar</label>
                  </b-dropdown-item>
                  <b-dropdown-item @click="deleteuser(item)">
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
                    :total-rows="totalUsers"
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
import { VBModal } from "bootstrap-vue";
import Card from "../../components/Cards/Card.vue";
import store from "../../store/index.js";
import UserCreateVue from "../../components/Modals/UserCreate.vue";
import { ref } from "vue";
import UserDeleteVue from "../../components/Modals/UserDelete.vue";
import http from "../../http";
import UserUpdateVue from "../../components/Modals/UserUpdate.vue";
export default {
  components: {
    Card,
    VBModal,
    UserCreateVue,
    UserDeleteVue,
    UserUpdateVue,
  },
  data() {
    return {
      perPage: 10,
      perPageOptions: [10, 25, 50, 100],
      currentPage: 1,
      filter: null,
      isAddNewUserModalActive: ref(false),
      isDeleteUserModalActive: ref(false),
      isUpdateUserModalActive: ref(false),
      filterOn: [],
      users: [],
      usuarioGetDel: {},
      column: [
        { key: "_id" },
        { key: "name", label: "nome" },
        { key: "email", label: "email" },
        { key: "actions", label: "ações" },
      ],
    };
  },
  directives: {
    "b-modal": VBModal,
  },
  computed: {
    totalUsers() {
      return this.users.length;
    },
  },
  mounted() {
    store
      .dispatch("getUsers")
      .then((response) => (this.users = response.data))
      .catch((erro) => console.log(erro));
  },
  methods: {
    userdelete() {
      http.delete(`users/delete/${this.usuarioGetDel._id}`)
      .then((response) => {
        console.log(response),
        this.hideModalDelete();
      });
    },
    userupdate() {
      http
        .patch(`users/update/${this.usuarioGetDel._id}`, this.usuarioGetDel)
        .then((response) => console.log(response), this.hideModalUpdate());
    },
    onFiltered(filteredItems) {
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },
    deleteuser(users) {
      this.usuarioGetDel = {
        ...users,
      };
      this.$bvModal.show("modal-delete");
    },
    updateuser(users) {
      this.usuarioGetDel = {
        ...users,
        password: null,
      };
      this.$bvModal.show("modal-update");
    },
    hideModalDelete() {
      this.$bvModal.hide("modal-delete");
    },
    hideModalUpdate() {
      this.$bvModal.hide("modal-update");
    },
  },
};
</script>
