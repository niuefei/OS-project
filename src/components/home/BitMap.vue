<template>
  <div class="container">
    <div class="title">位示图</div>
    <div class="title2">
      <div class="item1 default_item"></div>
      <div>空闲</div>
      <div class="item2 default_item"></div>
      <div>占用</div>
      <div class="item3 default_item"></div>
      <div>正在访问</div>
    </div>
    <div class="form_wrapper">
      <div class="form_title">
        <div></div>
        <div>0</div>
        <div>1</div>
        <div>2</div>
        <div>3</div>
        <div>4</div>
        <div>5</div>
        <div>6</div>
        <div>7</div>
        <div>8</div>
        <div>9</div>
        <div>10</div>
        <div>11</div>
        <div>12</div>
        <div>13</div>
        <div>14</div>
        <div>15</div>
      </div>
      <div class="content">
        <div class="sub_list">
          <div>0</div>
          <div>1</div>
          <div>2</div>
          <div>3</div>
          <div>4</div>
          <div>5</div>
          <div>6</div>
          <div>7</div>
          <div>8</div>
          <div>9</div>
          <div>10</div>
          <div>11</div>
          <div>12</div>
          <div>13</div>
          <div>14</div>
          <div>15</div>
        </div>
        <div class="data">
          <div
            class="data_item"
            v-for="item in storageData"
            :key="item"
            @click="handleClick(item)"
          >
            <div :class="itemClass(item)"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { mainStore } from '@/stores/index'
import { storeToRefs } from 'pinia'
const store = mainStore()
let { storageData } = storeToRefs(store)

function handleClick(item) {
  console.log(item);
}
function itemClass(data) {
  if (data.status == 0) {
    return "item1";
  }
  if (data.status == 1) {
    return "item2";
  }
  if (data.status == 2) {
    return "item3";
  }
}
</script>

<style lang="scss" scoped>
.container {
  position: relative;
  border: 1px solid #333;
  width: 48%;
  height: 750px;
  .title {
    margin-left: 20px;
  }
  .title2 {
    display: flex;
    justify-content: center;
    margin-bottom: 10px;
    div {
      font-size: 18px;
    }
    .default_item {
      width: 30px;
      height: 20px;
      border-radius: 15px;
      margin-left: 30px;
      transform: translateY(5px);

    }
  }
  .form_wrapper {
    position: absolute;
    left: 50%;
    width: 685px;
    border: 1px solid red;
    transform: translateX(-50%);
    .form_title {
      display: flex;
      div {
        box-sizing: border-box;
        width: 40px;
        border: 1px solid red;
        text-align: center;
      }
    }
    .content {
      display: flex;
      .sub_list {
        display: flex;
        flex-direction: column;

        width: 40px;
        div {
          text-align: center;
          border: 1px solid red;
        }
      }
      .data {
        display: flex;
        flex-wrap: wrap;
        flex: 1;
        background-color: rgb(255, 255, 255, 0.3);
        .data_item {
          position: relative;
          width: 40px;
          text-align: center;
          div {
            position: absolute;
            left: 50%;
            top: 50%;
            border-radius: 15px;
            width: 30px;
            height: 20px;
            transform: translate(-50%, -50%);
          }
        }
      }
    }
  }
}
.item1 {
  border: 1px solid #333;
}
.item2 {
  border: 0;
  background-color: #ffdab9;
}
.item3 {
  border: 0;
  background-color: #87ceeb;
}
</style>