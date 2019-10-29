<!--
 * @Description:
 * @Author: jiannan.lv
 * @Date: 2019-10-15 13:44:50
 * @LastEditTime: 2019-10-24 11:09:11
 * @LastEditors: jiannan.lv
 -->
<template>
  <div class="login-wrap">
    <div class="login-module">
      <p class="login-title">用户登录</p>
      <div class="login-content">
        <p>用户名</p>
        <input type="text"
               placeholder="请输入用户名"
               v-model="name"
               @blur="(e) => handleInputBlur(e, 'name')"
               @keyup.enter="(e) => handleLoginClick(e, 'name')" />
        <label :class="nameEmptyBol ? 'empty-tip' : ''">用户名不能为空</label>
      </div>
      <div class="login-content">
        <p>密码</p>
        <input type="password"
               placeholder="请输入密码"
               v-model="passward"
               @blur="(e) => handleInputBlur(e, 'pass')"
               @keyup.enter="(e) => handleLoginClick(e, 'pass')" />
        <label :class="passEmptyBol ? 'empty-tip' : ''">密码不能为空</label>
      </div>
      <div class="login-btn"
           @click="handleLoginClick">登 录</div>
    </div>
  </div>
</template>

<script>
  import { loginApi } from "app/api/login";
  // css
  import './style.scss';
  export default {
    name: "login",
    data () {
      return {
        nameEmptyBol: false,
        passEmptyBol: false,
        name: '',
        passward: ''
      };
    },
    methods: {
      // 输入框的blur事件
      handleInputBlur (e, type) {
        const event = e || window.event;
        const value = event.target.value;
        this.nameEmptyBol = type === 'name' ? value ? false : true : this.nameEmptyBol;
        this.passEmptyBol = type === 'pass' ? value ? false : true : this.passEmptyBol;
      },
      // 登录
      handleLoginClick (e, type) {
        this.nameEmptyBol = this.name ? false : true;
        this.passEmptyBol = this.passward ? false : true;
        if (this.nameEmptyBol || this.passEmptyBol) return;
        const loginParams = {
          name: this.name,
          passward: this.passward
        };
        loginApi(loginParams)
          .then(res => {
            const token = sessionStorage.setItem('token', res.token);
            this.$router.push({ path: 'home' });
          })
          .catch(err => {
            this.$Message.error(err);
          });
      }
    }
  };
</script>