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
                <div class="col-md-7">
                  <h4 class="card-title">Teatros Cadastrados</h4>
                  <p class="card-category">
                    Lista de Teatros cadastrados na tallosflix
                  </p>
                </div>
                <div
                  class="col-md-5 d-flex align-items-center justify-content-end"
                >
                  <button class="btn btn-primary h-75" type="submit">
                    <span class="text-nowrap">Adicionar</span>
                  </button>
                  <div class="pl-1">
                    <b-form-input debounce="300" placeholder="pesquisar..."/>
                  </div>
                </div>
              </div>
            </template>
          </card>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Card from "../../components/Cards/Card.vue";
export default {
  components: { Card },
};
</script>

Card