<!--
 * @Description: 
 * @Author: jiannan.lv
 * @Date: 2019-06-27 10:18:15
 * @LastEditTime: 2019-07-05 11:30:43
 * @LastEditors: jiannan.lv
 -->
<template>
  <div class="drag">
    <DragList />
    <DragRegion />
    <DragItemEdit />
  </div>
</template>

<script>
  // containers
  import DragList from "app/containers/DragCon/DragList/dragList.vue";
  import DragRegion from "app/containers/DragCon/DragRegion/dragRegion.vue";
  import DragItemEdit from "app/containers/DragCon/DragItemEdit/dragItemEdit.vue";
  // css
  import "./style.scss";
  export default {
    name: "home-con",
    data() {
      return {};
    },
    components: {
      DragList,
      DragRegion,
      DragItemEdit
    }
  };
</script>