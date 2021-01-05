<template>
  <el-dialog
    :title="info.isadd?'添加商品':'修改商品'"
    :visible.sync="info.isshow"
    @opened="opened"
  >
    <el-form :model="user">
      <el-form-item label="一级分类" :label-width="formLabelWidth">
        <el-select v-model="user.first_cateid" @change="changeFirst">
          <el-option label="---请选择---" value disabled></el-option>
          <el-option
            v-for="item in cateList"
            :key="item.id"
            :label="item.catename"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="二级分类" :label-width="formLabelWidth">
        <el-select v-model="user.second_cateid">
          <el-option label="---请选择---" value disabled></el-option>
          <el-option
            v-for="item in erList"
            :key="item.id"
            :label="item.catename"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="商品名称" :label-width="formLabelWidth">
        <el-input v-model="user.goodsname"></el-input>
      </el-form-item>

      <el-form-item label="价格" :label-width="formLabelWidth">
        <el-input v-model="user.price"></el-input>
      </el-form-item>

      <el-form-item label="市场价格" :label-width="formLabelWidth">
        <el-input v-model="user.market_price"></el-input>
      </el-form-item>

      <el-form-item label="图片" :label-width="formLabelWidth">
        <div class="pick">
          <div class="jia">+</div>
          <img :src="imgUrl" alt="" class="img" v-if="imgUrl" />
          <input type="file" class="ipt" @change="changeImg" />
        </div>
      </el-form-item>

      <el-form-item label="商品规格" :label-width="formLabelWidth">
        <el-select v-model="user.specsid" @change="changeSpecs">
          <el-option label="---请选择---" value disabled></el-option>
          <el-option
            v-for="item in specsList"
            :key="item.id"
            :label="item.specsname"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="规格属性" :label-width="formLabelWidth">
        <el-select v-model="user.specsattr" multiple>
          <el-option
            v-for="item in specsListAttr"
            :key="item"
            :label="item"
            :value="item"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="是否新品" :label-width="formLabelWidth">
        <el-radio v-model="user.isnew" :label="1">是</el-radio>
        <el-radio v-model="user.isnew" :label="2">否</el-radio>
      </el-form-item>

      <el-form-item label="是否热卖" :label-width="formLabelWidth">
        <el-radio v-model="user.ishot" :label="1">是</el-radio>
        <el-radio v-model="user.ishot" :label="2">否</el-radio>
      </el-form-item>

      <el-form-item label="状态" :label-width="formLabelWidth">
        <el-switch v-model="user.status" :active-value="1" :inactive-value="2">
        </el-switch>
      </el-form-item>

      <el-form-item label="商品描述" :label-width="formLabelWidth">
        <div id="div1" v-if="info.isshow"></div>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="cancel">取 消</el-button>
      <el-button type="primary" @click="add" v-if="info.isadd">确 定</el-button>
      <el-button type="primary" v-else @click="update">修 改</el-button>
    </div>
  </el-dialog>
</template>
<script>
import E from "wangeditor";
import { mapActions, mapGetters } from "vuex";
import { errorAlert, successAlert } from "../../../utils/alert";
import {
  reqCateList,
  reqGoodsAdd,
  reqGoodsEdit,
  reqGoodsInfo,
  reqSpecsAdd,
} from "../../../utils/http";
export default {
  props: ["info"],
  data() {
    return {
      imgUrl: "",
      //二级分类列表
      erList: [],
      //规格属性的展示列表
      specsListAttr: [],
      user: {
        first_cateid: "",
        second_cateid: "",
        goodsname: "",
        price: "",
        market_price: "",
        img: null,
        description: "",
        specsid: "",
        specsattr: [],
        isnew: 1,
        ishot: 1,
        status: 1,
      },
      formLabelWidth: "120px",
    };
  },
  computed: {
    ...mapGetters({
      cateList: "cate/list",
      specsList: "specs/list",
      list: "goods/list",
    }),
  },
  methods: {
    ...mapActions({
      reqCateList: "cate/reqList",
      reqSpecsList: "specs/reqList",
      reqList: "goods/reqList",
    }),
    cancel() {
      this.info.isshow = false;
    },

    //修改图片
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

    //修改一级分类
    changeFirst() {
      this.user.second_cateid = "";
      this.getSecondList();
    },
    getSecondList() {
      reqCateList({ pid: this.user.first_cateid }).then((res) => {
        if (res.data.code == 200) {
          this.erList = res.data.list;
        }
      });
    },

    //修改specs
    changeSpecs() {
      this.user.specsattr = [];
      this.getchangeSpecs();
    },
    getchangeSpecs() {
      let obj = this.specsList.find((item) => item.id == this.user.specsid);
      this.specsListAttr = obj ? obj.attrs : [];
    },

    empty() {
      this.user = {
        first_cateid: "",
        second_cateid: "",
        goodsname: "",
        price: "",
        market_price: "",
        img: null,
        description: "",
        specsid: "",
        specsattr: [],
        isnew: 1,
        ishot: 1,
        status: 1,
      };
      (this.imgUrl = ""),
        (this.erList = []),
        //规格属性的展示列表
        (this.specsListAttr = []);
    },
    //goods验证
    yzGoodsAdd() {
      return new Promise((reslove, reject) => {
        if (this.user.first_cateid == "") {
          errorAlert("一级分类不能为空");
          return;
        }
        if (this.user.second_cateid == "") {
          errorAlert("二级分类不能为空");
          return;
        }

        if (this.user.goodsname == "") {
          errorAlert("商品名称不能为空");
          return;
        }

        if (this.user.price == "") {
          errorAlert("价格不能为空");
          return;
        }

        if (this.user.market_price == "") {
          errorAlert("市场价格不能为空");
          return;
        }

        if (!this.user.img) {
          errorAlert("请上传图片");
          return;
        }

        if (this.user.specsid == "") {
          errorAlert("商品规格不能为空");
          return;
        }

        if (this.user.specsattr.length == 0) {
          errorAlert("规格属性不能为空");
          return;
        }

        if (this.editor.txt.html() == "") {
          errorAlert("请输入商品描述");
          return;
        }
        reslove();
      });
    },
    //点击添加了
    add() {
      this.yzGoodsAdd().then(() => {
        this.user.description = this.editor.txt.html();

        let data = {
          ...this.user,
          specsattr: JSON.stringify(this.user.specsattr),
        };
        reqGoodsAdd(data).then((res) => {
          if (res.data.code == 200) {
            successAlert(res.data.msg);
            this.cancel();
            this.empty();
            this.reqList();
          }
        });
      });
    },
    getOne(id) {
      reqGoodsInfo({ id: id }).then((res) => {
        if (res.data.code == 200) {
          this.user = res.data.list;
          this.getSecondList();
          this.imgUrl = this.$pre + this.user.img;
          this.getchangeSpecs();

          this.user.specsattr = JSON.parse(this.user.specsattr);

          this.user.id = id;

          //当前有editor时给富文本编辑器赋值
          if (this.editor) {
            this.editor.txt.html(this.user.description);
          }
        }
      });
    },
    update() {
      this.yzGoodsAdd(() => {
        let data = {
          ...this.user,
          specsattr: JSON.stringify(this.user.specsattr),
        };
        reqGoodsEdit(data).then((res) => {
          if (res.data.code == 200) {
            successAlert(res.data.msg);
            this.cancel();
            this.empty();
            this.reqList();
          }
        });
      });
    },
    //创建富文本编辑器
    opened() {
      this.editor = new E("#div1");
      this.editor.create();
      //给富文本编辑器赋值
      this.editor.txt.html(this.user.description);
    },
  },
  mounted() {
    if (this.cateList.length === 0) {
      this.reqCateList();
    }

    this.reqSpecsList();
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