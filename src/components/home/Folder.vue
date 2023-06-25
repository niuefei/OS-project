<template>
  <div class="container">
    <div class="title">文件目录</div>
    <el-button class="mkdir" v-if="isLogin" @click="isShowAddFolder = true"
      >创建文件夹</el-button
    >
    <el-menu
      default-active="1"
      class="el-menu-vertical-demo"
      @close="handleClose"
    >
      <el-sub-menu
        :index="item.folderId"
        class="folder"
        v-for="item in folder"
        :key="item"
      >
        <template #title>
          <img src="../../assets/images/folder.png" alt="" class="folder_img" />
          <span>{{ item.folderName }}</span>
          <el-button
            class="add_file_btn"
            type="default"
            @click.stop="handleAddFile(item)"
            v-if="loginUser.id == item.userId"
            >新建文件</el-button
          >
        </template>
        <el-menu-item
          v-for="item2 in item.files"
          :key="item2"
          @click="handleOpenFile(item2)"
        >
          <img src="../../assets/images/file.png" alt="" class="file_img" />
          <span>{{ item2.fileName }}</span>
          <el-button
            class="rename_file_btn"
            v-if="loginUser.id == item2.userId"
            @click.stop="handleRename(item2)"
            >重命名</el-button
          >
          <el-button
            class="delete_file_btn"
            v-if="loginUser.id == item2.userId"
            @click.stop="handleDeleteFile(item2)"
            >删除文件</el-button
          >
        </el-menu-item>
      </el-sub-menu>
    </el-menu>
    <div class="add_file_wrapper" v-if="isShowAddFile">
      <div class="content_wrapper">
        <div class="close" @click="handleClose">×</div>
        <div class="input_wrapper">
          <span>文件名</span>
          <el-input v-model="fileName" class="ipt" placeholder="Please input" />
        </div>
        <select v-model="protectedCode" name="" id="">
          <option value="0">可读可写</option>
          <option value="1">只可读</option>
          <option value="2">不可读</option>
        </select>
        <div class="file_content_wrapper">
          <span>文件内容</span>
          <textarea
            v-model="fileContent"
            name=""
            id=""
            cols="30"
            rows="10"
          ></textarea>
        </div>
        <div class="size_wrapper">
          <span>填写文件大小(KB)</span>
          <el-input v-model="fileSize" class="ipt" placeholder="Please input" />
        </div>
        <el-button
          type="primary"
          @click="handleSubmit"
          class="submit_btn"
          :style="{ width: '100px' }"
          >提交</el-button
        >
      </div>
    </div>
    <div class="select_storage_wrapper" v-if="isShowSelectStorage">
      <div class="select_storage_content">
        <div class="close" @click="isShowSelectStorage = false">×</div>
        <div class="select_storage_title">
          文件大小为：{{ fileSize }}KB，占用{{
            storageBlockNum
          }}个物理块，请依次选择
        </div>
        <div class="ipt_wrapper">
          <select
            v-for="item in storageBlockNum"
            v-model="activeAddress[item - 1]"
            :key="item"
            class="select_storage"
          >
            <option
              v-for="item in storageData"
              :key="item"
              :value="item.number"
            >
              {{ item.number }}
            </option>
          </select>
        </div>
        <el-button type="primary" class="submit_btn" @click="confirmAddFile"
          >确认</el-button
        >
      </div>
    </div>
    <div class="add_folder_wrapper" v-if="isShowAddFolder">
      <div class="add_folder_content">
        <div class="close" @click="isShowAddFolder = false">×</div>
        <div class="ipt_wrapper">
          <span>文件夹名</span>
          <el-input
            v-model="folderName"
            class="add_folder_ipt"
            placeholder="Please input"
          />
        </div>
        <el-button
          type="primary"
          @click="handleAddFolder"
          class="add_folder_btn"
          >确认</el-button
        >
      </div>
    </div>
    <div class="rename_file_wrapper"></div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { mainStore } from "@/stores/index";
import { storeToRefs } from "pinia";

import { ElMessage } from "element-plus";
const store = mainStore();
let { folder, isLogin, loginUser, storageData } =
  storeToRefs(store);

let isShowAddFile = ref(false);
let isShowSelectStorage = ref(false);
let activeFolderId = ref(null);
//添加文件相关
let fileName = ref(null);
let fileSize = ref(null);
let protectedCode = ref(0);
let fileContent = ref(null);
let storageBlockNum = ref(null);
let activeAddress = ref(null);

// 添加文件夹相关
let isShowAddFolder = ref(false);
let folderName = ref(null);
// 添加文件相关函数
function handleAddFile(item) {
  isShowAddFile.value = true;
  activeFolderId.value = item.folderId;
}
function handleClose() {
  isShowAddFile.value = false;
}
function handleSubmit() {
  if (!fileName.value || !fileContent.value || !fileSize.value) {
    ElMessage({
      message: "缺少必填信息",
      type: "warning",
    });
  } else {
    // 先分配内存
    isShowAddFile.value = false;
    isShowSelectStorage.value = true;
    storageBlockNum.value = Math.ceil(fileSize.value / 4);
    activeAddress.value = new Array();
  }
}
function confirmAddFile() {
  var uniqueSet = new Set();
  var isAllow = true;
  // 判断是否使用过

  // 判断重复
  activeAddress.value.forEach((item) => {
    item = Number(item);
    if (storageData.value[item].status != 0) {
      isAllow = false;
      ElMessage({
        message: "选择了已占用的物理块",
        type: "warning",
      });
      return;
    }
    if (uniqueSet.has(item)) {
      isAllow = false;
      // 找到重复项，可以在这里进行相应的处理
      ElMessage({
        message: "选择物理块重复",
        type: "warning",
      });
      return;
    } else {
      uniqueSet.add(item);
    }
  });
  if (isAllow) {
    // 到这里，万事俱备
    // 新建文件
    folder.value.forEach((item) => {
      // 找到对应的文件夹
      if (item.folderId == activeFolderId.value) {
        let newFile = {
          fileName: fileName.value,
          userId: loginUser.value.id,
          folderId: activeFolderId.value,
          content: fileContent.value,
          size: fileSize.value,
          address: activeAddress.value,
          isOpen: false,
          protectedCode: protectedCode.value,
        };
        // 放在对应文件夹中
        item.files.push(newFile);
      }
    });
    // 分配内存
    for (let i = 0; i < activeAddress.value.length; i++) {
      for (let j = 0; j < storageData.value.length; j++) {
        if (activeAddress.value[i] == storageData.value[j].number) {
          storageData.value[j].status = 1;
          if (i == activeAddress.value.length - 1) {
            storageData.value[j].nextNumber = -1;
          } else {
            storageData.value[j].nextNumber = activeAddress.value[i + 1];
          }
        }
      }
    }
    isShowSelectStorage.value = false;

    // 将相关数据恢复
    fileName = ref(null);
    fileSize = ref(null);
    protectedCode = ref(0);
    fileContent = ref(null);
    storageBlockNum = ref(null);
    activeAddress = ref(null);
    ElMessage({
      message: "分配内存完成",
      type: "success",
    });
  }
}

//添加文件夹相关函数
function handleAddFolder() {
  if (!folderName.value) {
    ElMessage({
      message: "请输入文件夹名",
      type: "warning",
    });
  } else {
    console.log(loginUser.value);
    // 添加文件夹
    let newFolder = {
      folderName: folderName.value,
      userId: loginUser.value.id,
      folderId: folder.value.length,
      files: [],
    };
    folder.value.push(newFolder);
    isShowAddFolder.value = false;
    ElMessage({
      message: "新建文件夹完成",
      type: "success",
    });
  }
}

// 文件重命名
function handleRename(data) {
  console.log("文件重命名");
}
// 打开文件
function handleOpenFile(data) {
  
  // 判断保护码
  if(data.protectedCode == 2 && loginUser.value.id!=data.userId) {
    ElMessage({
      message: "文件设置为不可读",
      type: "warning",
    });
  }
  else {
    // 找到对应的文件
    for(let i = 0 ; i < folder.value[data.folderId].files.length ; i++ ){
      if(folder.value[data.folderId].files[i].fileName == data.fileName) {
        // 打开
        // 这里使用排他思想，将所有文件关闭，然后打开对应的文件
        closeAllFiles()
        folder.value[data.folderId].files[i].isOpen = true
        console.log(folder.value);
      }
    }

    ElMessage({
      message: "文件打开成功",
      type: "success",
    });
  }
}
// 关闭所有文件
function closeAllFiles() {
  for(let i = 0 ; i < folder.value.length ; i++) {
    for(let j = 0 ; j < folder.value[i].files.length ; j++) {
      folder.value[i].files[j].isOpen = false
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  position: relative;
  border: 1px solid #333; /* 边框样式和颜色 */
  width: 48%;
  height: 500px;
  margin-bottom: 20px;
  .title {
    margin-left: 25px;
    height: 50px;
    line-height: 50px;
    font-weight: 800;
  }
  .mkdir {
    position: absolute;
    top: 10px;
    right: 20px;
  }

  .folder {
    position: relative;
    .add_file_btn {
      position: absolute;
      right: 50px;
    }
    .add_file_ipt {
      width: 200px;
    }
  }
}
.folder_img {
  width: 20px;
  height: 20px;
  margin: 3px;
}
.file_img {
  width: 20px;
  height: 20px;
  margin: 3px;
}

.add_file_wrapper {
  position: absolute;
  left: 50%;
  top: 0px;
  width: 500px;
  height: 500px;
  background-color: white;
  border-radius: 15px;
  border: 1px solid #333;
  transform: translateX(-50%);
  .content_wrapper {
    display: flex;
    // justify-content: ;
    flex-direction: column;
    position: relative;
    width: 100%;
    height: 100%;
    .close {
      position: absolute;
      top: 0;
      right: 10px;
      display: inline-block;
      font-size: 30px;
      color: #333;
      cursor: pointer;
    }
    .input_wrapper {
      display: flex;
      margin-bottom: 50px;
      margin-top: 50px;
      .ipt {
        width: 400px;
      }
      span {
        font-size: 16px;
      }
    }
    .file_content_wrapper {
      display: flex;
      justify-content: space-around;
      span {
        font-size: 16px;
        margin-right: 20px;
      }
      textarea {
        width: 400px;
      }
    }
    .size_wrapper {
      margin-top: 50px;
      display: flex;
      span {
        font-size: 16px;
      }
      .ipt {
        width: 300px;
      }
    }
    select {
      margin-left: 50px;
      margin-bottom: 50px;
      width: 100px;
    }
    .submit_btn {
      margin-top: 30px;
      margin-left: 50%;
      transform: translateX(-50%);
    }
  }
}
.select_storage_wrapper {
  position: absolute;
  left: 50%;
  top: 0;
  width: 500px;
  height: 400px;
  background-color: #fff;
  border: 1px solid #333;
  border-radius: 15px;
  transform: translateX(-50%);
  .select_storage_content {
    display: flex;
    flex-direction: column;
    position: relative;
    width: 100%;
    height: 100%;
    .select_storage_title {
      position: absolute;
      top: 30px;
    }
    .close {
      position: absolute;
      right: 20px;
      font-size: 30px;
      cursor: pointer;
    }
    .ipt_wrapper {
      margin-top: 50px;
      .select_storage {
        width: 100px;
      }
    }
    .submit_btn {
      width: 50px;
    }
  }
}
.add_folder_wrapper {
  position: absolute;
  top: 200px;
  left: 50%;
  width: 500px;
  height: 200px;
  border: 1px solid #333;
  border-radius: 15px;
  background-color: #fff;
  transform: translateX(-50%);
  .add_folder_content {
    padding: 20px;
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    .close {
      position: absolute;
      right: 20px;
      top: 10px;
      font-size: 30px;
      cursor: pointer;
    }
    .ipt_wrapper {
      display: flex;
      margin-top: 30px;
      span {
        font-size: 16px;
      }
      .add_folder_ipt {
        width: 300px;
      }
    }
    .add_folder_btn {
      margin-top: 30px;
      margin-left: 50%;
      width: 70px;
      transform: translateX(-50%);
    }
  }
}
</style>