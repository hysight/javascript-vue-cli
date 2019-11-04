<!--
 * @Description: 
 * @Author: jiannan.lv
 * @Date: 2019-07-05 11:25:50
 * @LastEditTime: 2019-07-05 11:50:04
 * @LastEditors: jiannan.lv
 -->
<template>
  <div class="drag-item-edit"
       :class="editBool ? 'drag-item-edit-active' : ''">
    <page-header text="内容编辑"
                 :border="false"></page-header>
    <ul>
      <li>
        <span>文本名称：</span>
        <input :value="Object.keys(this.itemData).length > 0 ? this.itemData.value : ''"
               @keyup="e => handleTextChange(e)" />
      </li>
    </ul>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from "vuex";
  // components
  import PageHeader from 'app/components/PageHeader/pageHeader.vue';
  // css
  import "./style.scss";
  export default {
    name: "drag-item-edit",
    data () {
      return {
        itemData: {}
      };
    },
    watch: {
      selectItemId (newId, oldId) {
        this.itemData = newId ? this.dataList[this.selectItemId] : this.itemData;
      }
    },
    computed: {
      ...mapGetters("drag", {
        editBool: 'editBool',
        selectItemId: "selectItemId",
        dataList: "dataList"
      })
    },
    components: {
      PageHeader
    },
    methods: {
      handleTextChange (e) {
        const event = e || window.event;
        const value = event.target.value;
        this.dataList[this.selectItemId].value = value;
      }
    }
  };
</script>