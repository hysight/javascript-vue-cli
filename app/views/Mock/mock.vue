<template>
  <div class="mock-list">
    <div class="search-wrap">
      <Input v-model="searchValue"
             placeholder="请输入姓名或地址"
             style="width: 150px"
             @on-enter="handleSearchClick" />
      <Button type="primary"
              @click="handleSearchClick">查询</Button>
      <p class="add-new-user"
         @click="handleAddUser">新增用户</p>
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
    <user-edit v-model="editBol"
               :userDetail="userDetail"></user-edit>
  </div>
</template>

<script>
  import { getMockUserlistApi, deleteMockUserApi } from "app/api/mock";
  // modal
  import UserEdit from './userEdit';
  // css
  import './style.scss';
  export default {
    name: 'Mock',
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
            title: '用户编号',
            key: 'id'
          },
          {
            title: "姓名",
            key: "name"
          },
          {
            title: "出生日期",
            key: "date"
          },
          {
            title: "地址",
            key: "Address"
          },
          {
            title: "邮箱",
            key: "Email"
          },
          {
            title: "照片地址",
            key: "avatar"
          },
          {
            title: "备注",
            render: (h, params) => h('div', { class: 'mark-div', attrs: { title: params.row.description } }, params.row.description)
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
                        this.handleEdit(params.row);
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
                        this.handleDelete(params.row.id);
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
      UserEdit
    },
    created () {
      this.getMockUserlist();
    },
    methods: {
      // 获取列表
      getMockUserlist () {
        const { page, pageSize } = this.pageInfo;
        const key = this.searchValue;
        getMockUserlistApi({ page, pageSize, key })
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
        this.getMockUserlist();
      },
      // 新增用户
      handleAddUser () {
        this.editBol = true;
      },
      /**
       * 改页页码
       * @param currentPage
       */
      handlePageChange (page) {
        this.pageInfo.page = page;
        this.getMockUserlist();
      },
      /**
       * 改变页数大小
       * @param currentPageSize
       */
      handlePageSizeChange (pageSize) {
        this.pageInfo.pageSize = pageSize;
        this.getMockUserlist();
      },
      // 编辑用户
      handleEdit (info) {
        this.userDetail = info;
        this.editBol = true;
      },
      // 删除用户
      handleDelete (id) {
        const params = { id };
        deleteMockUserApi(params)
          .then(res => {
            this.$Message.info(res);
            this.getMockUserlist();
          })
          .catch(error => {
            this.$Message.error(error);
          });
      }
    }
  }
</script>