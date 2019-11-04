<!--
 * @Description: 
 * @Author: jiannan.lv
 * @Date: 2019-05-09 13:36:47
 * @LastEditTime: 2019-11-01 10:01:50
 * @LastEditors: jiannan.lv
 -->
<template>
  <div class="home-con">
    <div class="search-wrap">
      <Input v-model="searchValue"
             placeholder="请输入流程名称"
             style="width: 150px"
             @on-enter="handleSearchClick" />
      <Button type="primary"
              @click="handleSearchClick">查询</Button>
      <p class="add-new-user"
         @click="handleAddFlow">新建流程</p>
    </div>
    <p class="split-line" />
    <Table :columns="columns"
           :current="pageInfo.page"
           :data="tableData"></Table>
    <div class="page-div">
      <Page show-total
            show-sizer
            show-elevator
            :current="pageInfo.page"
            :page-size="pageInfo.pageSize"
            :total="pageInfo.total"
            @on-change="handlePageChange"
            @on-page-size-change="handlePageSizeChange" />
    </div>
    <flow-edit v-model="editBol"></flow-edit>
  </div>
</template>

<script>
  import moment from 'moment';
  // modal
  import FlowEdit from './flowEdit';
  // api
  import { getChartListApi, deleteChartApi } from "app/api/drag";
  // css
  import "./style.scss";
  export default {
    name: "home-con",
    data () {
      return {
        tableData: [],
        pageInfo: {
          page: 1,
          pageSize: 10,
          total: 0
        },
        searchValue: '',
        editBol: false,
        userDetail: {},
        columns: [
          {
            title: '流程Id',
            key: 'chartId'
          },
          {
            title: "流程中文名",
            key: "chName"
          },
          {
            title: "流程英文名",
            key: "enName"
          },
          {
            title: "创建时间",
            key: "createTime",
            render: (h, params) => h('div', {}, moment(Number(params.row.createTime)).format('YYYY-MM-DD HH:mm:ss'))
          },
          {
            title: "备注",
            key: "mark"
          },
          {
            title: "操作",
            key: "action",
            render: (h, params) => {
              return h("div", [
                h(
                  "span",
                  {
                    class: 'operate-span',
                    on: {
                      click: () => {
                        this.handleView(params.row.chartId);
                      }
                    },
                  },
                  "查看"
                ),
                h(
                  "span",
                  {
                    class: 'operate-span',
                    on: {
                      click: () => {
                        this.handleEdit(params.row.chartId);
                      }
                    },
                  },
                  "编辑"
                ),
                h(
                  "span",
                  {
                    class: 'operate-span',
                    on: {
                      click: () => {
                        this.handleDelete(params.row.chartId);
                      }
                    }
                  },
                  "删除"
                )
              ]);
            }
          }
        ]
      };
    },
    components: {
      FlowEdit
    },
    created () {
      this.getChartList();
    },
    methods: {
      // 获取列表
      getChartList () {
        const { page, pageSize } = this.pageInfo;
        const key = this.searchValue;
        getChartListApi({ page, pageSize, key })
          .then(res => {
            this.tableData = res.list || [];
            this.pageInfo = {
              page: res.page,
              pageSize: res.pageSize,
              total: res.total
            };
          })
          .catch(error => {
            this.$Message.error(error);
          });
      },
      // 查询按钮的点击事件
      handleSearchClick () {
        this.pageInfo.page = 1;
        this.getChartList();
      },
      // 新增流程
      handleAddFlow () {
        this.editBol = true;
      },
      /**
       * 改页页码
       * @param currentPage
       */
      handlePageChange (page) {
        this.pageInfo.page = page;
        this.getChartList();
      },
      /**
       * 改变页数大小
       * @param currentPageSize
       */
      handlePageSizeChange (pageSize) {
        this.pageInfo.pageSize = pageSize;
        this.getChartList();
      },
      // 查看流程详情
      handleView (chartId) {
        const query = { chartId };
        this.$router.push({
          path: '/home/flowDetail',
          query: query
        });
      },
      // 编辑流程
      handleEdit (chartId) {
        const query = { chartId };
        this.$router.push({
          path: '/home/drag',
          query: query
        });
      },
      // 删除流程
      handleDelete (chartId) {
        const params = { chartId };
        deleteChartApi(params)
          .then(res => {
            this.$Message.info(res);
            this.getChartList();
          })
          .catch(error => {
            this.$Message.error(error);
          });
      }
    }
  };
</script>