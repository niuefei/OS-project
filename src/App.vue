<template>
  <div class="app_container">
    <div class="user">当前登录用户：{{ loginUser.userName }}</div>
    <router-view class="view"></router-view>
  </div>
</template>

<script setup>
import { storage } from "@/utils/storageData.js";
import {ref , onMounted , watch } from "vue"
import { mainStore } from '@/stores/index'
import { storeToRefs } from 'pinia'
const store = mainStore()
let { isLogin , loginUserId  , loginUser, folder , storageData } = storeToRefs(store)

watch(folder, (newValue, oldValue) => {
  upDateStorageData()
} ,{
  deep: true,
  immediate: true
});
function upDateStorageData() {
  storageData.value = storage
  for(let i = 0 ; i < folder.value.length ; i++) {
    for(let j = 0 ; j < folder.value[i].files.length ; j++) {
      let data = folder.value[i].files[j]
      for(let k = 0 ; k < data.address.length ; k++) {
        // 设置文件名
        storageData.value[data.address[k]].file = data.fileName
        // 设置下一块地址
        if(k == data.address.length-1) {
          storageData.value[data.address[k]].nextNumber = -1
        }
        else {
          storageData.value[data.address[k]].nextNumber = data.address[k+1]
        }
        // 设置地址的状态
        if(data.isOpen) {
          storageData.value[data.address[k]].status = 2 
        }
        else {
          storageData.value[data.address[k]].status = 1 
        }
      }
    }
  }
}


</script>

<style lang="scss" scoped>
</style>