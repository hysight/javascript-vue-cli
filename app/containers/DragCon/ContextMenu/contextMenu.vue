<!--
 * @Description: 右键菜单选项
 * @Author: jiannan.lv
 * @Date: 2019-07-03 11:23:20
 * @LastEditTime: 2019-07-03 13:30:56
 * @LastEditors: jiannan.lv
 -->
<template>
  <div class="context-menu"
       :class="menuInfo.show ? 'context-menu-active' : ''"
       :style="style">
    <ul class="context-menu-list">
      <li v-for="(menu, index) in menuList"
          @click="e => handleMenuClick(e, menu.type)"
          :key="index">
        <i :class="menu.icon" />
        <span>{{menu.text}}</span>
      </li>
    </ul>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from "vuex";
  // staticdata
  import menuList from './menuList';
  // css
  import './style.scss';
  export default {
    name: 'ContextMenu',
    data () {
      return {
        menuList: menuList
      };
    },
    computed: {
      ...mapGetters("drag", {
        menuInfo: "menuInfo"
      }),
      style () {
        const style = {
          left: this.menuInfo.left,
          top: this.menuInfo.top
        };
        return style;
      }
    },
    methods: {
      ...mapActions("drag", {
        updateContextMenu: "updateContextMenu",
        updateEditBool: 'updateEditBool',
        deleteDataListItem: 'deleteDataListItem'
      }),
      // 阻止事件冒泡
      stopProps (event) {
        event.stopPropagation();
        event.preventDefault();
      },
      // 右键选项事件
      handleMenuClick (e, type) {
        const event = e || window.event;
        const params = {
          left: 0,
          top: 0,
          show: false
        };
        if (type === 'edit') {
          this.updateEditBool(true);
        } else if (type === 'delete') {
          this.deleteDataListItem();
        }
        this.updateContextMenu(params);
        this.stopProps(event);
      }
    }
  }
</script>