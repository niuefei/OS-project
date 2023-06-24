import { defineStore } from "pinia";

export const mainStore = defineStore("main", {
  state: () => {
    return {
      // 和登录信息相关
      isLogin: false,
      loginUserId: -1,
      loginUser: {},
      userNames: [
        {
          userName: "用户0",
          id: 0,
        },
        {
          userName: "用户1",
          id: 1,
        },
        {
          userName: "用户2",
          id: 2,
        },
        {
          userName: "用户3",
          id: 3,
        },
        {
          userName: "用户4",
          id: 4,
        },
        {
          userName: "用户5",
          id: 5,
        },
        {
          userName: "用户6",
          id: 6,
        },
        {
          userName: "用户7",
          id: 7,
        },
        {
          userName: "用户8",
          id: 8,
        },
        {
          userName: "用户9",
          id: 9,
        },
      ],
      // 用户创建的文件夹和文件
      folder: [
        {
          folderName: "用户0的文件夹",
          userId: 0,
          folderId: 0,
          files: [
            {
              fileName: "用户0的文件",
              userId: 0,
              folderId: 0,
              content: "文件内容",
              size: 4,
              address: [0],
              isOpen: false,
              protectedCode: 0 // 0可读可写  1只可读 2不可读
            },
          ],
        },
      ],

      // 存储信息
      storageData: null
    };
  },
});
