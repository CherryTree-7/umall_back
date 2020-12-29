<template>
  <div>
    <el-dialog
      :title="info.isadd ? '添加分类' : '编辑分类'"
      :visible.sync="info.isshow"
    >
      <el-form :model="user">
        <el-form-item label="上级分类" :label-width="formLabelWidth">
          <el-select v-model="user.pid" placeholder="请选择活动区域">
            <el-option label="--请选择--" value="shanghai" disabled></el-option>
            <el-option label="顶级分类" :value="0"></el-option>
            <el-option
              v-for="item in list"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="分类名称" :label-width="formLabelWidth">
          <el-input v-model="user.catename" autocomplete="off"></el-input>
        </el-form-item>

        <!-- 图片 -->
        <el-form-item
          label="图片"
          :label-width="formLabelWidth"
          v-if="user.pid !== 0"
        >
          <div class="my-upload">
            <div class="add">+</div>
            <img v-if="imgUrl" :src="imgUrl" alt="" class="img" />
            <input
              v-if="info.isshow"
              type="file"
              class="ipt"
              @change="changeImg"
            />
          </div>
        </el-form-item>

        <el-form-item label="状态" :label-width="formLabelWidth">
          <el-switch
            v-model="user.status"
            :active-value="1"
            :inactive-value="2"
          ></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="add">添 加</el-button>
        <el-button type="primary" @click="update">修 改</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { errorAlert, successAlert } from "../../../utils/alert";
import { reqCateAdd, reqCateEdit, reqCateInfo } from "../../../utils/http";
export default {
  props: ["info", "list"],
  data() {
    return {
      imgUrl: "",
      user: {
        pid: "",
        catename: "",
        img: null,
        status: 1,
      },
      formLabelWidth: "120px",
    };
  },
  methods: {
    cancel() {
      this.info.isshow = false;
    },
    empty() {
      this.imgUrl = "";
      this.user = {
        pid: "",
        catename: "",
        img: null,
        status: 1,
      };
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
    add() {
      reqCateAdd(this.user).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          this.cancel();
          this.empty();
          this.$emit("init");
        }
      });
    },
    getOne(id) {
      reqCateInfo({ id: id }).then((res) => {
        if (res.data.code == 200) {
          this.user = res.data.list;

          this.user.id = id;

          this.imgUrl = this.$pre + this.user.img;
        }
      });
    },
    update(){
      reqCateEdit(this.user).then((res)=>{
        if(res.data.code==200){
          successAlert(res.data.msg)
          this.cancel()
          this.empty()
          this.$emit("init")
        }
      })
    }
  },
};
</script>
<style>
.my-upload {
  width: 100px;
  height: 100px;
  border: 1px dashed #999;
  position: relative;
}
.my-upload .add {
  width: 100px;
  height: 100px;
  text-align: center;
  line-height: 100px;
  font-size: 30px;
  color: #666;
}
.my-upload .ipt {
  width: 100px;
  height: 100px;
  position: absolute;
  left: 0;
  top: 0;
  opacity: 0;
  cursor: pointer;
}
.my-upload .img {
  width: 100px;
  height: 100px;
  position: absolute;
  left: 0;
  top: 0;
}
</style>