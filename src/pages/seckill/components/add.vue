<template>
  <el-dialog
    :title="info.isadd ? '添加活动' : '编辑活动'"
    :visible.sync="info.isshow"
  >
    {{ user }}
    <div>
      {{ value1 }}
    </div>
    <el-form :model="user">
      <el-form-item label="活动名称" :label-width="formLabelWidth">
        <el-input v-model="user.title" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item label="活动名称" :label-width="formLabelWidth">
        <el-date-picker
          v-model="value1"
          type="datetimerange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        >
        </el-date-picker>
      </el-form-item>

      <el-form-item label="一级分类" :label-width="formLabelWidth">
        <el-select
          v-model="user.first_cateid"
          placeholder="请选择活动区域"
          @change="getEr"
        >
          <el-option
            v-for="item in cateList"
            :key="item.id"
            :label="item.catename"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="二级分类" :label-width="formLabelWidth">
        <el-select
          v-model="user.second_cateid"
          placeholder="请选择活动区域"
          @change="getThree"
        >
          <el-option
            v-for="item in erList"
            :key="item.id"
            :label="item.catename"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="商品" :label-width="formLabelWidth">
        <el-select v-model="user.goodsid" placeholder="请选择活动区域">
          <el-option
            v-for="item in sanList"
            :key="item.id"
            :label="item.goodsname"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="状态" :label-width="formLabelWidth">
        <el-switch v-model="user.status" :active-value="1" :inactive-value="2">
        </el-switch>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="cancel">取 消</el-button>
      <el-button type="primary" v-if="info.isadd" @click="add">添 加</el-button>
      <el-button type="primary" v-else @click="update">修 改</el-button>
    </div>
  </el-dialog>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import { successAlert } from "../../../utils/alert";
import {
  reqCateList,
  reqGoodsList,
  reqSeckAdd,
  reqSeckEdit,
  reqSeckInfo
} from "../../../utils/http";
export default {
  props: ["info"],
  data() {
    return {
      erList: [],
      sanList: [],
      user: {
        title: "",
        first_cateid: "",
        second_cateid: "",
        begintime: "",
        endtime: "",
        goodsid: "",
        status: 1
      },
      formLabelWidth: "120px",
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      },
      value1: [],
      value2: ""
    };
  },
  computed: {
    ...mapGetters({
      cateList: "cate/list",
      goodsList: "goods/list"
    })
  },
  methods: {
    ...mapActions({
      reqCateList: "cate/reqList",
      reqGoodsList: "goods/reqList"
    }),
    // 删除
    cancel() {
      this.info.isshow = false;
    },
    // 清空数据
    empty() {
      this.value1 = [];
      this.value2 = "";
      this.user = {
        title: "",
        first_cateid: "",
        second_cateid: "",
        begintime: "",
        endtime: "",
        goodsid: "",
        status: 1
      };
    },
    getEr() {
      this.user.second_cateid = "";
      this.user.goodsid = "";
      reqCateList({ pid: this.user.first_cateid }).then(res => {
        if (res.data.code == 200) {
          this.erList = res.data.list;
        }
      });
    },
    getThree() {
      this.user.goodsid = "";
      reqGoodsList({
        fid: this.user.first_cateid,
        sid: this.user.second_cateid
      }).then(res => {
        if (res.data.code == 200) {
          this.sanList = res.data.list;
          console.log(this.sanList);
        }
      });
    },
    add() {
      this.user.begintime = Date.parse(new Date(this.value1[0]));
      this.user.endtime = Date.parse(new Date(this.value1[1]));
      reqSeckAdd(this.user).then(res => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          this.cancel();
          this.empty();
          this.$emit("init");
        }
      });
    },
    getOne(id) {
      reqSeckInfo({ id: id }).then(res => {
        if (res.data.code == 200) {
          this.value1 = [
            new Date(Number(res.data.list.begintime)),
            new Date(Number(res.data.list.endtime))
          ];
          res.data.list.id = id;
          this.user = res.data.list;
        }
      });
    },
    update() {
      this.user.begintime = Date.parse(new Date(this.value1[0]));
      this.user.endtime = Date.parse(new Date(this.value1[1]));
      reqSeckEdit(this.user).then(res => {
        successAlert(res.data.msg);
        this.cancel();
        this.empty();
        this.$emit("init");
      });
    }
  },
  mounted() {
    this.reqCateList();
  }
};
</script>
<style></style>
