<!--
 * @Description: 
 * @Author: jiannan.lv
 * @Date: 2019-06-27 19:47:34
 * @LastEditTime: 2019-07-05 11:21:18
 * @LastEditors: jiannan.lv
 -->
<template>
  <div class="drag-item"
       :style="itemTempData ? itemTempData.style : {}"
       @mousedown="dragStart"
       @dblclick="(e) => this.selectItem(e, itemId)"
       @contextmenu.prevent="(e) => handleContextmenu(e, itemId)"
       @click="(e) => dragItemClick(e)">
    <p v-if="itemTempData && itemTempData.type === 'text'">{{itemTempData.value}}</p>
    <img v-else-if="itemTempData && itemTempData.type === 'img'"
         :src="`/public/images/draglist/${itemTempData.src}.png`"
         alt="x">
    <div class="icon-wrap"
         v-show="mode === 'edit'">
      <i v-for="item in iconArr"
         :key="item"
         :class="item"
         :style="{'display': selectItemId === itemId ? 'block' : 'none'}"
         @mousedown="(e) => dragStart(e, item)" />
      <i v-for="item in lineIconArr"
         class="lineIcon"
         :key="item"
         :class="item"
         :style="{'display': lineBool && item !== 'top' && item !== 'bottom' ? 'block': ''}"
         @click="(e) => linePointClick(e)"
         @mousedown="(e) => drawLineStart(e, itemData, item, itemId)"
         @mouseup="(e) => drawLineEnd(e, item, itemId, itemData)" />
    </div>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from "vuex";
  // tools
  import { makeLineStartPoint, makeLineEndPoint } from "./drawLine";
  import { _UUID } from "app/utils/tools";
  // css
  import "./style.scss";
  export default {
    name: "drag-item",
    props: {
      itemData: Object,
      itemId: String,
      mode: {
        type: String,
        default: () => {
          return 'edit';
        }
      }
    },
    data () {
      return {
        drag: false,
        itemTempData: this.itemData,
        tempLineItem: {},
        startX: 0,
        startY: 0,
        lineStartX: 0,
        lineStartY: 0,
        changeType: "",
        iconArr: [
          "leftTop",
          "centerTop",
          "rightTop",
          "leftCenter",
          "leftBottom",
          "rightCenter",
          "centerBottom",
          "rightBottom"
        ],
        lineIconArr: ["left", "top", "right", "bottom"]
      };
    },
    computed: {
      ...mapGetters("drag", {
        selectItemId: "selectItemId",
        lineBool: "lineBool",
        lineId: "lineId",
        lineItem: "lineItem"
      })
    },
    methods: {
      ...mapActions("drag", {
        selectDragItem: "selectDragItem",
        addLineToLineList: "addLineToLineList",
        addLineId: "addLineId",
        updateLineInfo: "updateLineInfo",
        updateLineList: "updateLineList",
        updateDataList: "updateDataList",
        updateContextMenu: "updateContextMenu"
      }),
      // 阻止事件冒泡
      stopProps (event) {
        event.stopPropagation();
        event.preventDefault();
      },
      // 拖拽元素的点击事件
      dragItemClick (e) {
        const event = e || window.event;
        this.stopProps(event);
      },
      // 选中元素
      selectItem (e, itemId) {
        const event = e || window.event;
        this.stopProps(event);
        this.selectDragItem(itemId);
      },
      // 拖拽开始
      dragStart (e, type) {
        const event = e || window.event;
        this.stopProps(event);
        this.drag = true;
        this.changeType = type ? type : "";
        this.startX = event.clientX;
        this.startY = event.clientY;
        document.onmouseup = this.lineBool ? this.drawLineEnd : this.mode === 'edit' ? this.dragend : null;
        document.onmousemove = this.lineBool ? this.lineDragging : this.mode === 'edit' ? this.dragging : null;
      },
      // 拖拽结束
      dragend (e) {
        const event = e || window.event;
        const params = {
          id: this.itemId,
          data: this.itemTempData
        };
        this.stopProps(event);
        this.drag = false;
        document.onmouseup = null;
        document.onmousemove = null;
        this.updateDataList(params);
      },
      // 拖拽中
      dragging (e) {
        if (this.lineBool) return;
        const event = e || window.event;
        let { style } = this.itemTempData;
        let itemStyle = {};
        this.stopProps(event);
        if (!this.drag) return;
        if (this.selectItemId) {
          itemStyle = this.changeType ? this[this.changeType](event, style) : {};
        } else {
          const itemLeft = parseInt(style.left) + (event.clientX - this.startX);
          const itemTop = parseInt(style.top) + (event.clientY - this.startY);
          this.startX = event.clientX;
          this.startY = event.clientY;
          itemStyle = {
            left: `${itemLeft}px`,
            top: `${itemTop}px`
          };
        }
        style = Object.assign({}, style, itemStyle);
        this.itemTempData = Object.assign({}, this.itemTempData, { style });
        this.updateLine();
      },
      // 更新线
      updateLine () {
        const params = {
          itemId: this.itemId,
          itemData: this.itemTempData
        };
        this.updateLineList(params);
      },
      // 改变拖拽元素宽高
      leftTop (event, style) {
        const itemTop = parseInt(style.top) + (event.clientY - this.startY);
        const itemLeft = parseInt(style.left) + (event.clientX - this.startX);
        const itemHeight = parseInt(style.height) + (this.startY - event.clientY);
        const itemWidth = parseInt(style.width) + (this.startX - event.clientX);
        this.startX = event.clientX;
        this.startY = event.clientY;
        const itemStyle = {
          height: `${itemHeight}px`,
          width: `${itemWidth}px`,
          left: `${itemLeft}px`,
          top: `${itemTop}px`
        };
        return itemStyle;
      },
      centerTop (event, style) {
        const itemTop = parseInt(style.top) + (event.clientY - this.startY);
        const itemHeight = parseInt(style.height) + (this.startY - event.clientY);
        this.startY = event.clientY;
        const itemStyle = {
          height: `${itemHeight}px`,
          top: `${itemTop}px`
        };
        return itemStyle;
      },
      rightTop (event, style) {
        const itemTop = parseInt(style.top) + (event.clientY - this.startY);
        const itemHeight = parseInt(style.height) + (this.startY - event.clientY);
        const itemWidth = parseInt(style.width) + (event.clientX - this.startX);
        this.startX = event.clientX;
        this.startY = event.clientY;
        const itemStyle = {
          height: `${itemHeight}px`,
          width: `${itemWidth}px`,
          top: `${itemTop}px`
        };
        return itemStyle;
      },
      leftCenter (event, style) {
        const itemLeft = parseInt(style.left) + (event.clientX - this.startX);
        const itemWidth = parseInt(style.width) + (this.startX - event.clientX);
        this.startX = event.clientX;
        const itemStyle = {
          width: `${itemWidth}px`,
          left: `${itemLeft}px`
        };
        return itemStyle;
      },
      leftBottom (event, style) {
        const itemLeft = parseInt(style.left) + (event.clientX - this.startX);
        const itemHeight = parseInt(style.height) + (event.clientY - this.startY);
        const itemWidth = parseInt(style.width) + (this.startX - event.clientX);
        this.startX = event.clientX;
        this.startY = event.clientY;
        const itemStyle = {
          height: `${itemHeight}px`,
          width: `${itemWidth}px`,
          left: `${itemLeft}px`
        };
        return itemStyle;
      },
      rightCenter (event, style) {
        const itemWidth = parseInt(style.width) + (event.clientX - this.startX);
        this.startX = event.clientX;
        const itemStyle = {
          width: `${itemWidth}px`
        };
        return itemStyle;
      },
      centerBottom (event, style) {
        const itemHeight = parseInt(style.height) + (event.clientY - this.startY);
        this.startY = event.clientY;
        const itemStyle = {
          height: `${itemHeight}px`
        };
        return itemStyle;
      },
      rightBottom (event, style) {
        const itemHeight = parseInt(style.height) + (event.clientY - this.startY);
        const itemWidth = parseInt(style.width) + (event.clientX - this.startX);
        this.startX = event.clientX;
        this.startY = event.clientY;
        const itemStyle = {
          height: `${itemHeight}px`,
          width: `${itemWidth}px`
        };
        return itemStyle;
      },
      // -------------------------划线模块-------------------------
      linePointClick (e) {
        const event = e || window.event;
        this.stopProps(event);
      },
      // 开始划线
      drawLineStart (e, itemData, item, itemId) {
        console.log(111);
        const event = e || window.event;
        const lineId = _UUID();
        this.addLineId(lineId);
        const startPoint = makeLineStartPoint(itemData, item);
        this.tempLineItem = Object.assign({}, this.tempLineItem, startPoint);
        this.lineStartX = event.clientX;
        this.lineStartY = event.clientY;
        this.tempLineItem["source"] = {};
        this.tempLineItem["source"]["id"] = itemId;
        this.tempLineItem["source"]["dirc"] = item;
      },
      // 拖拽过程划线
      lineDragging (e) {
        const event = e || window.event;
        const endPoint = {
          x2: this.tempLineItem.x2 + (event.clientX - this.lineStartX),
          y2: this.tempLineItem.y2 + (event.clientY - this.lineStartY)
        };
        this.lineStartX = event.clientX;
        this.lineStartY = event.clientY;
        this.tempLineItem = Object.assign({}, this.tempLineItem, endPoint);
        const lineParams = {
          [this.lineId]: this.tempLineItem
        };
        this.updateLineInfo(this.tempLineItem);
        this.addLineToLineList(lineParams);
      },
      // 划线结束
      drawLineEnd (e, item, itemId, itemData) {
        const event = e || window.event;
        this.lineItem["target"] = {};
        this.lineItem["target"]["id"] = itemId;
        this.lineItem["target"]["dirc"] = item;
        const endPoint = item ? makeLineEndPoint(itemData, item) : {};
        const lineParams = {
          [this.lineId]:
            Object.keys(endPoint).length > 0
              ? Object.assign({}, this.lineItem, endPoint)
              : this.lineItem
        };
        this.stopProps(event);
        document.onmousemove = null;
        this.addLineToLineList(lineParams);
        this.tempLineItem = {};
        document.onmouseup = null;
      },
      // 右键事件
      handleContextmenu (e, itemId) {
        const event = e || window.event;
        const x = event.pageX;
        const y = event.pageY;
        const params = {
          left: `${x}px`,
          top: `${y}px`,
          show: true
        };
        this.updateContextMenu(params);
        this.selectDragItem(itemId);
      }
    }
  };
</script>