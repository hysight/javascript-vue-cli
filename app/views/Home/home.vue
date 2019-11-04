<template>
  <div class="home">
    <home-con></home-con>
  </div>
</template>

<script>
  // containers
  import HomeCon from 'app/containers/Home/home.vue';
  export default {
    name: 'Home',
    data () {
      return {};
    },
    components: {
      HomeCon
    }
  }
</script>