<template>
  <b-modal
    id="modal-create"
    cancel-variant="outline-secondary"
    ok-title="Login"
    cancel-title="Close"
    title="Login Form"
    :visible="isAddNewUserModalActive"
    @change="(val) => ('update:is-add-new-user-modal-active', val)"
  >
    <b-form>
      <b-form-group>
        <label for="email">Email:</label>
        <b-form-input id="email" type="email" placeholder="Email Address" />
      </b-form-group>
      <b-form-group>
        <label for="password">Password</label>
        <b-form-input type="password" placeholder="Password" />
      </b-form-group>
    </b-form>
  </b-modal>
</template>
<script>
import { VBModal } from "bootstrap-vue";
export default {
  components: {
    VBModal
  },
  directives: {
    "b-modal": VBModal,
  },
  model: {
    prop: 'isAddNewUserModalActive',
    event: 'update:is-add-new-user-modal-active',
  },
  props: {
    isAddNewUserModalActive: {
      type: Boolean,
      required: true,
    },
  }
};
</script>
