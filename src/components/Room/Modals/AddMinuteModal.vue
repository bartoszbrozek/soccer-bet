<template>
  <section>
    <button class="button is-secondary is-medium" @click="isComponentModalActive = true">Add Minute</button>

    <b-modal :active.sync="isComponentModalActive" has-modal-card ref="dupa">
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Add New Minute</p>
        </header>
        <section class="modal-card-body">
          <AddMinuteForm :id="id"></AddMinuteForm>
        </section>
      </div>
      <footer class="modal-card-foot"></footer>
    </b-modal>
  </section>
</template>

<script>
import AddMinuteForm from "../Forms/AddMinuteForm";

export default {
  components: { AddMinuteForm },
  props: ["id"],
  data() {
    return {
      isComponentModalActive: false
    };
  },
};
</script>