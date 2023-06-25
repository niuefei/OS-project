<template>
  <div class="container">
    <div class="close" @click="handleClose">×</div>
    <div class="title">打开文件：{{ viewData.fileName }}</div>
    <div class="file_data">
      <span>所属用户： {{ viewData.userId }}</span>
      <span>文件大小：{{ viewData.size }}</span>
      <span>文件地址：{{ viewData.address }}</span>
      <div class="content">文件内容：{{ viewData.content }}</div>
    </div>
    <div class="modify_wrapper">
      <el-button
        type="primary"
        v-if="viewData.protectedCode == 0 || loginUser.id == viewData.userId"
        class="modify_btn"
        @click="handleModify"
        >修改文件</el-button
      >
      <textarea
        class="modify_text"
        v-if="viewData.protectedCode == 0 || loginUser.id == viewData.userId"
        v-model="activeContent"
      ></textarea>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from "vue";
import { mainStore } from "@/stores/index";
import { storeToRefs } from "pinia";
const store = mainStore();
let { isLogin, loginUser, storageData, folder } = storeToRefs(store);
let activeContent = ref();
let viewData = ref({
  fileName: "",
  userId: "",
  size: "",
  content: "",
  address: "",
  isopen: false,
  protectedCode: 0,
});
watch(
  folder,
  (newValue, oldValue) => {
    fileDataFormal();
  },
  {
    deep: true,
    immediate: true,
  }
);
function fileDataFormal() {
  if (!isFileOpen()) {
    viewData.value = {
      fileName: "",
      userId: "",
      size: "",
      content: "",
      address: "",
      isopen: false,
      protectedCode: 0,
    };
  } else {
    // 设置地址
    viewData.value.size = viewData.value.size + "KB";
    viewData.value.address = viewData.value.address.join("-");
  }
}
// 判断是否有文件打开
function isFileOpen() {
  for (let i = 0; i < folder.value.length; i++) {
    for (let j = 0; j < folder.value[i].files.length; j++) {
      if (folder.value[i].files[j].isOpen) {
        let data1 = JSON.stringify(folder.value[i].files[j]);
        let data2 = JSON.parse(data1);
        viewData.value = data2;
        activeContent.value = folder.value[i].files[j].content;
        return true;
      }
    }
  }
  return false;
}

function handleClose() {
  if (!isFileOpen()) {
    ElMessage({
      message: "目前没有文件打开",
      type: "warning",
    });
  } else {
    closeAllFiles();
    ElMessage({
      message: "关闭成功",
      type: "success",
    });
  }
}
// 关闭所有文件
function closeAllFiles() {
  for (let i = 0; i < folder.value.length; i++) {
    for (let j = 0; j < folder.value[i].files.length; j++) {
      folder.value[i].files[j].isOpen = false;
    }
  }
}

// 修改文件
function handleModify() {
  for (let i = 0; i < folder.value.length; i++) {
    for (let j = 0; j < folder.value[i].files.length; j++) {
      if (folder.value[i].files[j].isOpen) {
        // 先找到当前的文件
        folder.value[i].files[j].content = activeContent.value;
        ElMessage({
          message: "修改成功",
          type: "success",
        });
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  position: relative;
  border: 1px solid #333;
  width: 48%;
  height: 500px;
  .close {
    position: absolute;
    top: 10px;
    right: 20px;
    font-size: 30px;
    cursor: pointer;
  }
  .title {
    margin-top: 10px;
    margin-left: 20px;
    font-size: 20px;
    font-weight: 800;
  }
  .file_data {
    margin-top: 10px;
    margin-left: 20px;
    span {
      margin-right: 20px;
    }
  }
}
.modify_wrapper {
  margin-top: 30px;
  margin-left: 20px;
  .modify_btn {
    transform: translateY(-10px);
    margin-right: 30px;
  }
  .modify_text {
    width: 200px;
    height: 100px;
    
  }
}
</style>