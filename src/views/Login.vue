<template>
  <div class="login-card">
    <div class="project-title">存储器空间为1MB，每个盘块大小为4KB，共有256个盘块</div>
    <el-card class="card">
      <h3 class="title">登录</h3>
          <el-select size="large" class="select" @change="handleSelect" v-model="activeId" placeholder="请选择用户名">
            <el-option
              v-for="username in userNames"
              :key="username.id"
              :label="username.userName"
              :value="username.id"
            ></el-option>
          </el-select>
          <el-button class="btn" :disabled="activeId==undefined" type="primary" @click="login">登录</el-button>
    </el-card>
  </div>
</template>

<script setup>
import router from '@/router'
import {ref} from 'vue'
import { mainStore } from '@/stores/index'
import { storeToRefs } from 'pinia'
const store = mainStore()
let { userNames , loginUser , isLogin } = storeToRefs(store)

let activeId = ref()
console.log(activeId.value);
let active = ref()
function handleSelect(e) {
  active.value = userNames.value[Number(e)]
}
function login() {
  loginUser.value = active.value
  isLogin.value = true
  router.push({
    name: "home"
  })
}
</script>

<style scoped>
.login-card {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.card {
  position: relative;
  width: 800px;
  height: 500px;
  padding: 20px;
  border-radius: 15px;
}

.title {
  text-align: center;
  margin-bottom: 20px;
  font-size: 40px;
}
.select {
  position: absolute;
  top: 150px;
  left: 50%;
  transform: translateX(-50%);
}
.btn {
  position: absolute;
  top: 250px;
  left: 50%;
  transform: translateX(-50%);
}
.project-title {
  position: absolute;
  top: 0px;

}
</style>