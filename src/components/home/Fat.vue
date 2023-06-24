<template>
  <div class="container">
    <div class="title">FAT表</div>
    <div class="form_wrapper">
      <div class="form_title">
        <div>物理块号</div>
        <div>下一块</div>
      </div>
      <div class="content_wrapper">
        <div class="sub_list">
          <div class="list_item" :style="{backgroundColor: item.number%2==0?'#F5F5F5':'#FFFACD'}" v-for="item in storageData" :key="item">{{ item.number }}</div>
        </div>
        <div class="data_list">
          <div class="data_item" :style="{backgroundColor: item.number%2==0?'#F5F5F5':'#FFFACD'}"  v-for="item in storageData" :key="item">{{ nextNumber(item.nextNumber) }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { mainStore } from "@/stores/index";
import { storeToRefs } from "pinia";
const store = mainStore();
let { storageData } = storeToRefs(store);

function nextNumber(data) {
  if(data == null) {
    return ''
  }
  if(data!= null) {
    return data
  }
}
</script>

<style lang="scss" scoped>
.container {
  overflow-y: scroll;
  overflow-x: hidden;
  border: 1px solid #333;
  width: 48%;
  height: 500px;
  .form_wrapper {
    position: relative;
    left: 20%;
    .form_title {
      background-color: #87CEEB;
      display: flex;
      // border: 1px solid red;
      width: 400px;
      div {
        flex: 1;
        font-size: 20px;
        font-weight: 800;
        text-align: center;
      }
    }
    .content_wrapper {
      display: flex;
      .sub_list {
        display: flex;
        flex-direction: column;
        width: 200px;
        .list_item {
          text-align: center;
          height: 35px;
          line-height: 35px;
        }
      }
      .data_list {
        width: 200px;
        .data_item {
          text-align: center;
          height: 35px;
          line-height: 35px;
        }
      }
      

    }
  }
}
</style>