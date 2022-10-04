<template>
  <b-modal
    hide-footer
    id="modal-update"
    title="Atualizar Usuário"
    :visible="isUpdateTheaterModalActive"
    @change="(val) => ('update:is-update-Theater-modal-active', val)"
    @show="resetModal"
  >
    <b-form>
      <b-form-group>
        <label for="theaterId">Número do teatro:</label>
        <b-form-input
          v-model="theaterGet.theaterId"
          id="theaterId"
          type="number"
          placeholder="id do teatro..."
        />
      </b-form-group>
      <b-form-group>
        <label for="rua">Rua:</label>
        <b-form-input
          v-model="theaterGet.location.address.street1"
          id="rua"
          type="text"
          placeholder="Digite a rua..."
        />
      </b-form-group>
      <b-form-group>
        <label for="cidade">Cidade:</label>
        <b-form-input
          v-model="theaterGet.location.address.city"
          id="cidade"
          type="text"
          placeholder="Digite a cidade..."
        />
      </b-form-group>
      <b-form-group>
        <label for="estado">Estado:</label>
        <b-form-input
          v-model="theaterGet.location.address.state"
          id="estado"
          type="text"
        />
      </b-form-group>
      <b-form-group>
        <label for="cep">CEP:</label>
        <b-form-input
          v-model="theaterGet.location.address.zipcode"
          id="cep"
          type="number"
          placeholder="Digite o cep..."
        />
      </b-form-group>
      <b-form-group>
        <label for="cordenada">Coordenada:</label>
        <b-form-input
          v-model="theaterGet.location.geo.coordinates[0]"
          id="cordenada"
          type="number"
          placeholder="Digite a Longitude"
        />
        <b-form-input
          v-model="theaterGet.location.geo.coordinates[1]"
          id="cordenada"
          type="number"
          placeholder="Digite a Latitude"
        />
      </b-form-group>
      <div class="w-100 d-flex justify-content-between">
        <b-button @click="hideModal" class="btn btn-danger">Cancelar</b-button>
        <b-button @click.prevent="updateTeatro()" class="btn btn-primary"
          >Atualizar</b-button
        >
      </div>
    </b-form>
  </b-modal>
</template>
<script>
import { VBModal } from "bootstrap-vue";

export default {
  components: {
    VBModal,
  },
  model: {
    prop: "isUpdateTheaterModalActive",
    event: "update:is-update-theater-modal-active",
  },
  props: {
    isUpdateTheaterModalActive: {
      type: Boolean,
      required: true,
    },
    theaterGet: {
      type: Object,
      required: true,
      default: null,
    },
    updateTeatro: {
      type: Function,
      required: true,
    },
  },
  methods: {
    resetModal() {
      this.theaterGet = {};
    },
    hideModal() {
      this.$bvModal.hide("modal-update");
    },
  },
};
</script>
