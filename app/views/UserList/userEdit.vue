<!--
 * @Description: 
 * @Author: jiannan.lv
 * @Date: 2019-10-28 10:37:47
 * @LastEditTime: 2019-10-28 12:40:46
 * @LastEditors: jiannan.lv
 -->
<template>
  <Modal v-model="modalShow"
         :title="type === 'edit' ? '编辑用户' : '新增用户'"
         width="500"
         :mask-closable="false"
         @on-cancel="handleCancel">
    <Form ref="userInfo"
          :rules="ruleValidate"
          :model="userInfo"
          :label-width="80">
      <FormItem label="用户名"
                prop="name">
        <Input v-model="userInfo.name"
               placeholder="请输入用户名" />
      </FormItem>
      <FormItem label="密码"
                prop="passward">
        <Input v-model="userInfo.passward"
               placeholder="请输入密码" />
      </FormItem>
      <FormItem label="部门"
                prop="department">
        <Input v-model="userInfo.department"
               placeholder="请输入部门" />
      </FormItem>
      <FormItem label="备注"
                prop="mark">
        <Input v-model="userInfo.mark"
               type="textarea"
               placeholder="请输入备注" />
      </FormItem>
    </Form>
    <div slot="footer">
      <Button @click="handleCancel">取消</Button>
      <Button type="primary"
              @click="handleSure">确定</Button>
    </div>
  </Modal>
</template>

<script>
  // api
  import { addUserApi } from "app/api/userList";
  export default {
    name: 'userEdit',
    props: {
      value: {
        type: Boolean,
        default: () => {
          return false;
        }
      },
      userDetail: {
        type: Object,
        default: () => {
          return {};
        }
      }
    },
    data () {
      return {
        modalShow: this.value,
        userInfo: {
          name: '',
          passward: '',
          department: '',
          mark: ''
        },
        ruleValidate: {
          name: [
            { required: true, message: '用户名不能为空', trigger: 'blur' }
          ],
          passward: [
            { required: true, message: '密码不能为空', trigger: 'blur' }
          ],
          department: [
            { required: true, message: '部门不能为空', trigger: 'blur' }
          ]
        }
      };
    },
    computed: {
      type () {
        return Object.keys(this.userDetail).length > 0 ? 'edit' : 'new';
      }
    },
    watch: {
      value (val) {
        this.modalShow = val;
      },
      userDetail (detail) {
        this.userInfo = { ...detail };
      }
    },
    methods: {
      // 初始化数据
      initData () {
        this.userInfo = {
          name: '',
          passward: '',
          department: '',
          mark: ''
        };
        this.$parent.userDetail = {};
      },
      // 取消事件
      handleCancel () {
        this.initData();
        this.$emit('input', false);
      },
      // 确定时间
      handleSure () {
        const params = { ...this.userInfo };
        this.$refs.userInfo.validate((valid) => {
          if (!valid) {
            return false
          }
        });
        addUserApi(params)
          .then(res => {
            this.$Message.info(res);
            this.$emit('input', false);
            this.$parent.getUserList();
          })
          .catch(error => {
            this.$Message.error(error);
          });
      }
    }
  }
</script>

<style lang="scss">
  .ivu-form {
    .ivu-form-item-label {
      font-size: 12px;
    }
  }
  .ivu-input {
    font-size: 12px;
  }
  textarea.ivu-input {
    font-size: 12px;
  }
  .ivu-form-item-error-tip {
    font-size: 12px;
  }
</style>