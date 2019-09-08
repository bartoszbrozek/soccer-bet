<template>
  <div>
      <h3>Create a New Room</h3>
      <NewRoomForm></NewRoomForm>
  </div>
</template>

<script>
import NewRoomForm from './Forms/NewRoomForm'
export default {
  name: "NewRoom",
  components: {NewRoomForm}
};
</script>
