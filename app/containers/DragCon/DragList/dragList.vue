<!--
 * @Description: 
 * @Author: jiannan.lv
 * @Date: 2019-06-27 11:12:45
 * @LastEditTime: 2019-07-01 18:57:16
 * @LastEditors: jiannan.lv
 -->
<template>
  <div class="drag-list"
       :class="openBol ? 'open-drag-list' : ''">
    <i class="iconfont "
       :class="openBol ? 'iconpack-up' : 'iconexpend'"
       :title="openBol ? '收起' : '展开'"
       @click="dragListTonggle()" />
    <page-header text="拖拽列表"
                 :border="false"></page-header>
    <div class="drag-item-list">
      <div class="model-wrap"
           v-for="(item, index) in comList"
           :key="index">
        <p class="model-title">{{item.value}}</p>
        <ul class="item-list"
            v-if="item.type === 'text'">
          <li v-for="(childItem, childIndex) in item.source"
              :key="childIndex">
            <span draggable="true"
                  @dragstart="() => dragStart(childItem)">{{childItem.value}}</span>
          </li>
        </ul>
        <div class="item-list"
             v-if="item.type === 'img'">
          <img v-for="(childItem, childIndex) in item.source"
               :key="childIndex"
               :src="`/public/images/draglist/${childItem.src}.png`"
               alt="x"
               draggable="true"
               @dragstart="() => dragStart(childItem)">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapActions } from "vuex";
  // components
  import PageHeader from 'app/components/PageHeader/pageHeader.vue';
  // staticData
  import comList from './comList';
  // css
  import "./style.scss";
  export default {
    name: "drag-list",
    data () {
      return {
        openBol: false,
        comList: comList
      };
    },
    components: {
      PageHeader
    },
    methods: {
      ...mapActions("drag", {
        saveUnitItem: "saveUnitItem"
      }),
      dragListTonggle () {
        this.openBol = !this.openBol;
      },
      dragStart (data) {
        this.saveUnitItem(data);
      }
    }
  };
</script>