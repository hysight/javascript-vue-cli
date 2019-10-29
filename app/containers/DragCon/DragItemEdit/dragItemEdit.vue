<!--
 * @Description: 
 * @Author: jiannan.lv
 * @Date: 2019-07-05 11:25:50
 * @LastEditTime: 2019-07-05 11:50:04
 * @LastEditors: jiannan.lv
 -->
<template>
  <div class="drag-item-edit" :class="selectItemId ? 'drag-item-edit-active' : ''">
    <ul>
      <li>
        <span>文本名称：</span>
        <input :value="Object.keys(this.itemData).length > 0 ? this.itemData.value : ''"/>
      </li>
    </ul>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from "vuex";
  // css
  import "./style.scss";
  export default {
    name: "drag-item-edit",
    data() {
      return {
        itemData: {}
      };
    },
    watch: {
      selectItemId(newId, oldId) {
        this.itemData = newId ? this.dataList[this.selectItemId] : this.itemData;
      }
    },
    computed: {
      ...mapGetters("drag", {
        selectItemId: "selectItemId",
        dataList: "dataList"
      })
    }
  };
</script>