<template>
  <div class="page-header">
    <p>{{text}}</p>
  </div>
</template>

<script>
  // css
  import './style.scss';
  export default {
    name: "pageHeader",
    props: {
      text: {
        type: String,
        default: () => {
          return ''
        }
      }
    },
    data () {
      return {};
    }
  }
</script>
