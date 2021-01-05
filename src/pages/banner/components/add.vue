<template>
  <el-dialog
    :title="info.isadd ? '添加轮播图' : '修改轮播图'"
    :visible.sync="info.isshow"
  >
    {{ user }}
    <el-form :model="user">
      <el-form-item label="标题" :label-width="formLabelWidth">
        <el-input v-model="user.title"></el-input>
      </el-form-item>
      <el-form-item label="图片" :label-width="formLabelWidth">
        <div class="pick">
          <div class="jia">+</div>
          <img :src="imgUrl" alt="" class="img" v-if="imgUrl" />
          <input type="file" class="ipt" @change="changeImg" />
        </div>
      </el-form-item>

      <el-form-item label="状态" :label-width="formLabelWidth">
        <el-switch v-model="user.status" :active-value="1" :inactive-value="2">
        </el-switch>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="cancel">取 消</el-button>
      <el-button type="primary" @click="add" v-if="info.isadd">添 加</el-button>
      <el-button type="primary" @click="update" v-else>修 改</el-button>
    </div>
  </el-dialog>
</template>
<script>
import path from "path";
import { errorAlert, successAlert } from "../../../utils/alert";
import {
  reqBannerAdd,
  reqBannerEdit,
  reqBannerInfo,
} from "../../../utils/http";
export default {
  props: ["info"],
  data() {
    return {
      imgUrl: "",
      user: {
        title: "",
        img: null,
        status: 1,
      },
      formLabelWidth: "120px",
    };
  },
  methods: {
    //清空数据user
    empty() {
      this.imgUrl = "";
      this.user = {
        title: "",
        img: null,
        status: 1,
      };
    },
    //点击删除按钮
    cancel() {
      this.info.isshow = false;
    },
    changeImg(e) {
      let file = e.target.files[0];
      //文件大小验证
      if (file.size > 2 * 1024 * 1024) {
        erroralert("文件大小不能超过2M");
        return;
      }
      let extname = file.name.slice(file.name.lastIndexOf("."));

      let arr = [".png", ".gif", ".jpg", ".jpeg"];
      //判断是否是图片
      if (!arr.some((item) => item === extname)) {
        errorAlert("请上传图片");
        return;
      }
      this.imgUrl = URL.createObjectURL(file);

      this.user.img = file;
    },

    //验证banner
    changeBanner() {
      return new Promise((resolve) => {
        if (this.user.title === "") {
          errorAlert("标题不能为空");
          return;
        }

        if (this.imgUrl === "") {
          errorAlert("请上传图片");
          return;
        }
        resolve();
      });
    },
    add() {
      this.changeBanner().then(() => {
        reqBannerAdd(this.user).then((res) => {
          if (res.data.code == 200) {
            this.user = res.data.list;
            successAlert(res.data.msg);
            this.cancel();
            this.empty();
            this.$emit("sx");
          }
        });
      });
    },
    getOne(id) {
      reqBannerInfo({ id: id }).then((res) => {
        if (res.data.code == 200) {
          this.user = res.data.list;
          this.user.id = id;
          this.imgUrl = this.$pre + this.user.img;
        }
      });
    },
    update() {
      this.changeBanner().then(() => {
        reqBannerEdit(this.user).then((res) => {
          if (res.data.code == 200) {
            successAlert(res.data.msg);
            this.empty();
            this.cancel();
            this.$emit("sx");
          }
        });
      });
    },
  },
};
</script>
<style scoped>
.pick {
  width: 100px;
  height: 100px;
  border: 2px dashed #999;
  position: relative;
}
.pick .jia {
  width: 100px;
  height: 100px;
  color: #999;
  text-align: center;
  margin-top: 30%;
  font-size: 30px;
}
.pick .ipt {
  width: 100px;
  height: 100px;
  position: absolute;
  left: 0;
  top: 0;
  opacity: 0;
  cursor: pointer;
}
.pick .img {
  width: 100px;
  height: 100px;
  position: absolute;
  left: 0;
  top: 0;
}
</style>