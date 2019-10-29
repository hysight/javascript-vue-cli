<!--
 * @Description: 
 * @Author: jiannan.lv
 * @Date: 2019-10-17 14:55:27
 * @LastEditTime: 2019-10-28 11:45:25
 * @LastEditors: jiannan.lv
 -->
<template>
  <div class="user-list">
    <div class="search-wrap">
      <Input v-model="searchValue"
             placeholder="请输入姓名或部门"
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
  import { getUserListApi, deleteUserApi } from "app/api/userList";
  // modal
  import UserEdit from './userEdit';
  // css
  import "./style.scss";
  export default {
    name: "userList",
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
            title: '编号',
            key: 'id'
          },
          {
            title: "姓名",
            key: "name"
          },
          {
            title: "部门",
            key: "department"
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
      this.getUserList();
    },
    methods: {
      // 获取列表
      getUserList () {
        const { page, pageSize } = this.pageInfo;
        const key = this.searchValue;
        getUserListApi({ page, pageSize, key })
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
        this.getUserList();
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
        this.getUserList();
      },
      /**
       * 改变页数大小
       * @param currentPageSize
       */
      handlePageSizeChange (pageSize) {
        this.pageInfo.pageSize = pageSize;
        this.getUserList();
      },
      // 编辑用户
      handleEdit (info) {
        this.userDetail = info;
        this.editBol = true;
      },
      // 删除用户
      handleDelete (id) {
        const params = { id };
        deleteUserApi(params)
          .then(res => {
            this.$Message.info(res);
            this.getUserList();
          })
          .catch(error => {
            this.$Message.error(error);
          });
      }
    }
  };
</script>