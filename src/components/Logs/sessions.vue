<template>
  <section>
    <div class="row">
      <div class="col-md-7">
        <h4 class="card-title">Sessões Ativas</h4>
        <p class="card-category">Lista de usuários ativos na tallosflix</p>
      </div>
      <div class="col-md-5 d-flex align-items-center justify-content-end">
        <div>
          <b-form-input
            debounce="300"
            placeholder="pesquisar..."
            v-model="filter"
          />
        </div>
      </div>
    </div>
    <b-table
      striped
      hover
      responsive
      :items="sessions"
      :fields="column"
      :filter="filter"
      :per-page="perPage"
      :current-page="currentPage"
      show-empty
      empty-filtered-text="nenhuma sessão encontrado"
    ></b-table>
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
            :total-rows="totalSessions"
            :per-page="perPage"
            first-number
            last-number
            class="mb-0 mt-1 mt-sm-0"
          >
          </b-pagination>
        </b-col>
      </b-row>
    </div>
  </section>
</template>
<script>
import store from "../../store";
export default {
  data() {
    return {
      perPage: 10,
      currentPage: 1,
      filter: null,
      sessions: [],
      column: [
        { key: "_id", label: "ID da sessão" },
        { key: "user_id", label: "Email do usuário" },
      ],
    };
  },
  mounted() {
    store
      .dispatch("getSessions")
      .then((response) => (this.sessions = response.data))
      .catch((erro) => console.log(erro));
  },
  computed: {
    totalSessions() {
      return this.sessions.length;
    },
  },
};
</script>