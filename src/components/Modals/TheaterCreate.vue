<template>
  <b-modal
    hide-footer
    id="modal-create"
    title="Adicionar Teatro"
    :visible="isAddNewTheaterModalActive"
    @change="(val) => ('update:is-add-new-theater-modal-active', val)"
    @show="resetModal"

  >
    <b-form>
      <b-form-group>
        <label for="theaterId">Número do teatro:</label>
        <b-form-input
          v-model="theaters.theaterId"
          id="theaterId"
          type="number"
          placeholder="id do teatro..."
        />
      </b-form-group>
      <b-form-group>
        <label for="rua">Rua:</label>
        <b-form-input
          v-model="theaters.location.address.street1"
          id="rua"
          type="text"
          placeholder="Digite a rua..."
        />
      </b-form-group>
      <b-form-group>
        <label for="cidade">Cidade:</label>
        <b-form-input
          v-model="theaters.location.address.city"
          id="cidade"
          type="text"
          placeholder="Digite a cidade..."
        />
      </b-form-group>
      <b-form-group>
        <label for="estado">Estado:</label>
        <b-form-select
          :options="option"
          v-model="theaters.location.address.state"
          id="estado"
          type="text"
        />
      </b-form-group>
       <b-form-group>
        <label for="cep">CEP:</label>
        <b-form-input
          v-model="theaters.location.address.zipcode"
          id="cep"
          type="number"
          placeholder="Digite o cep..."
        />
      </b-form-group>
       <b-form-group>
        <label for="cordenada">Coordenada:</label>
        <b-form-input
          v-model="theaters.location.geo.coordinates[0]"
          id="cordenada"
          type="number"
          placeholder="Digite a Longitude"
        />
        <b-form-input
          v-model="theaters.location.geo.coordinates[1]"
          id="cordenada"
          type="number"
          placeholder="Digite a Latitude"
        />
      </b-form-group>
      <div class="w-100 d-flex justify-content-between">
        <b-button @click="hideModal">Cancelar</b-button>
        <b-button @click="criarTeatro()" class="btn btn-primary">Enviar</b-button>
      </div>
    </b-form>
  </b-modal>
</template>
<script>
import { VBModal } from "bootstrap-vue";
import store from "../../store";

export default {
  components: {
    VBModal,
  },
  data() {
    return {
      theaters: {
        theaterId: "532",
        location: {
          address: {
            street1: "",
            city: "",
            state: null,
            zipcode: "",
          },
          geo: {
            type: 'Point',
            coordinates: [],
          },
        },
      },
      option: [
        { value: null, text: "selecione uma opção", disabled: true },
        { value: "MI", text: "MI" },
        { value: "CA", text: "CA" },
        { value: "AZ", text: "AZ" },
        { value: "TX", text: "TX" },
        { value: "NY", text: "NY" },
        { value: "PA", text: "PA" },
        { value: "SC", text: "SC" },
        { value: "OK", text: "OK" },
        { value: "MD", text: "MD" },
      ],
    };
  },
  directives: {
    "b-modal": VBModal,
  },
  model: {
    prop: "isAddNewTheaterModalActive",
    event: "update:is-add-new-theater-modal-active",
  },
  props: {
    isAddNewTheaterModalActive: {
      type: Boolean,
      required: true,
    },
  },
  methods: {
    criarTeatro() {
      this.theaters.location.geo.coordinates[0] = parseFloat(this.theaters.location.geo.coordinates[0])
      this.theaters.location.geo.coordinates[1] = parseFloat(this.theaters.location.geo.coordinates[1])
      store.dispatch("createTheater", this.theaters).then((response) => {
        console.log(response);
        this.hideModal()
      });
    },
    hideModal() {
        this.$bvModal.hide("modal-create")
        this.theater = {}
    },
    resetModal() {
        this.theater = {}
    }
  },
};
</script>
