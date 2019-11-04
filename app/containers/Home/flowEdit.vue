<!--
 * @Description: 
 * @Author: jiannan.lv
 * @Date: 2019-10-28 10:37:47
 * @LastEditTime: 2019-11-01 11:14:17
 * @LastEditors: jiannan.lv
 -->
<template>
  <Modal v-model="modalShow"
         :title="type === 'edit' ? '编辑用户' : '新建流程'"
         width="500"
         :mask-closable="false"
         @on-cancel="handleCancel">
    <Form ref="flowInfo"
          :rules="ruleValidate"
          :model="flowInfo"
          :label-width="80">
      <FormItem label="中文名"
                prop="chName">
        <Input v-model="flowInfo.chName"
               placeholder="请输入中文名" />
      </FormItem>
      <FormItem label="英文名"
                prop="enName">
        <Input v-model="flowInfo.enName"
               placeholder="请输入英文名" />
      </FormItem>
      <FormItem label="备注"
                prop="mark">
        <Input v-model="flowInfo.mark"
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
  // mrthod
  import { _UUID } from 'app/utils/tools';
  // api
  import { saveChartApi } from "app/api/drag";
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
        flowInfo: {
          chName: '',
          enName: '',
          mark: ''
        },
        ruleValidate: {
          chName: [
            { required: true, message: '中文名不能为空', trigger: 'blur' }
          ],
          enName: [
            { required: true, message: '英文名不能为空', trigger: 'blur' }
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
        this.flowInfo = {
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
        const params = { ...this.flowInfo };
        const design = {
          dataList: [],
          lineList: []
        };
        this.$refs.flowInfo.validate((valid) => {
          if (!valid) {
            return false
          }
          params['chartId'] = _UUID();
          params['design'] = JSON.stringify(design);
          params['type'] = 'add';
          params['createTime'] = new Date().getTime();
          saveChartApi(params)
            .then(res => {
              this.$Message.info(res);
              this.$emit('input', false);
              this.$parent.getChartList();
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