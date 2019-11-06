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
      <FormItem label="出生日期"
                prop="date">
        <DatePicker type="date"
                    :editable="false"
                    v-model="userInfo.date"
                    placeholder="请选择出生日期"
                    style="width: 388px"></DatePicker>
      </FormItem>
      <FormItem label="地址"
                prop="Address">
        <Input v-model="userInfo.Address"
               placeholder="请输入地址" />
      </FormItem>
      <FormItem label="邮箱"
                type="email"
                prop="Email">
        <Input v-model="userInfo.Email"
               placeholder="请输入邮箱" />
      </FormItem>
      <FormItem label="备注"
                prop="description">
        <Input v-model="userInfo.description"
               type="textarea"
               :rows="5"
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
  import { addMockUserApi } from "app/api/mock";
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
          date: [
            { required: true, type: 'date', message: '出生日期不能为空', trigger: 'blur' }
          ],
          Address: [
            { required: true, message: '地址不能为空', trigger: 'blur' }
          ],
          Email: [
            { required: true, message: '邮箱不能为空', trigger: 'blur' }
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
      // 确定事件
      handleSure () {
        const params = { ...this.userInfo };
        this.$refs.userInfo.validate((valid) => {
          if (!valid) {
            return false
          }
          addMockUserApi(params)
            .then(res => {
              this.$Message.info(res);
              this.$emit('input', false);
              this.$parent.getMockUserlist();
            })
            .catch(error => {
              this.$Message.error(error);
            });
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