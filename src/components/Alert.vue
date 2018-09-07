<template>
  <div class="message-alert">
    <div class="alert alert-dismissible"
      :class="'alert-' + item.status"
      v-for="(item, i) in messages" :key="i">
      {{ item.message }}
      <button type="button" class="close" @click="removeMessage(i)" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex';
  export default {
    name: 'Navbar',
    data() {
      return {};
    },
    methods: {
      removeMessage(i) {
        this.$store.dispatch('removeMessage', i);
      },
    },
    computed: {
      ...mapGetters(['messages'])
    },
  };
</script>

<style lang="scss" scoped>
  .message-alert {
    position: fixed;
    z-index: 1100;
    max-width: 50%;
    top: 10%;
    right: 10%;
  }
</style>