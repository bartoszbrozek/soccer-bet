<template>
  <div class="tile is-ancestor">
    <div class="tile is-vertical is-12">

    <section>
        <div class="buttons">
            <b-button tag="router-link"
                to="/room/new"
                type="is-link">
                Create a New Room
            </b-button>
            <b-button tag="router-link"
                to="/room/existing"
                type="is-info">
                Join Existing Room
            </b-button>
        </div>
    </section>

    </div>
  </div>
</template>

<script>
export default {
  name: "HomePage"
};
</script>
