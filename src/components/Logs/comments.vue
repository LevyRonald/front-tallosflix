<template>
  <section>
    <div class="row">
      <div class="col-md-7">
        <h4 class="card-title">Comentários</h4>
        <p class="card-category">Lista de comentários dos filmes na tallosflix</p>
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
      :items="comments"
      :fields="column"
      :filter="filter"
      :per-page="perPage"
      :current-page="currentPage"
      show-empty
      empty-filtered-text="nenhum comentário encontrado"
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
            :total-rows="totalComments"
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
      comments: [],
      column: [
        { key: "name", label: "Nome" },
        { key: "email", label: "Email" },
        { key: "text", label: "Comentário" },
      ],
    };
  },
  mounted() {
    store
      .dispatch("getComments")
      .then((response) => (this.comments = response.data))
      .catch((erro) => console.log(erro));
  },
  computed: {
    totalComments() {
      return this.comments.length;
    },
  },
};
</script>