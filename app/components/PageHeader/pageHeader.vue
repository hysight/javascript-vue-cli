<template>
  <div class="page-header"
       :class="border ? '' : 'no-border'">
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
          return '';
        }
      },
      border: {
        type: Boolean,
        defult: () => {
          return true;
        }
      }
    },
    data () {
      return {};
    }
  }
</script>
