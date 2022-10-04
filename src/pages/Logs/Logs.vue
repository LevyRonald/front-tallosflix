<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="w-100">
          <b-tabs align="center">
            <b-card>
              <b-tab title="Sessões" active></b-tab>
            <b-tab title="Comentários"></b-tab>
            </b-card>
          </b-tabs>
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