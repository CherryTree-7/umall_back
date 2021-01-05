<template>
  <el-table :data="list" border style="width: 100%">
    <el-table-column prop="id" label="商品编号" width="80"> </el-table-column>
    <el-table-column prop="goodsname" label="商品名称" width="280">
    </el-table-column>
    <el-table-column prop="price" label="商品价格" width="115"> </el-table-column>
    <el-table-column prop="market_price" label="市场价格" width="115"> </el-table-column>
    <el-table-column prop="address" label="图片" width="180">
      <template slot-scope="scope">
        <img :src="$pre + scope.row.img" alt="" />
      </template>
    </el-table-column>
    <el-table-column prop="address" label="是否新品" width="100">
      <template slot-scope="scope">
        <el-button type="primary" v-if="scope.row.isnew === 1">是</el-button>
        <el-button type="danger" v-else>否</el-button>
      </template>
    </el-table-column>
    <el-table-column prop="address" label="是否热卖" width="100">
      <template slot-scope="scope">
        <el-button type="primary" v-if="scope.row.ishot === 1">是</el-button>
        <el-button type="danger" v-else>否</el-button>
      </template>
    </el-table-column>
    <el-table-column prop="address" label="状态" width="120">
      <template slot-scope="scope">
        <el-button type="primary" v-if="scope.row.status == 1">启 用</el-button>
        <el-button type="danger" v-else>禁 用</el-button>
      </template>
    </el-table-column>
    <el-table-column prop="address" label="操作" width="200">
      <template slot-scope="scope">
        <el-button type="primary" @click="edit(scope.row.id)">编 辑</el-button>
        <el-button type="danger" @click="del(scope.row.id)">删 除</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import { reqGoodsDel } from "../../../utils/http";
import {successAlert} from '../../../utils/alert'
export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      list: "goods/list",
    }),
  },
  methods: {
    ...mapActions({
      reqList: "goods/reqList",
    }),
    del(id) {
      this.$confirm("您确定要删除此条数据吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          reqGoodsDel({ id: id }).then((res) => {
            if (res.data.code == 200) {
              successAlert(res.data.msg);
              this.$emit("init");
              this.reqList()
              console.log(this.list);
            }
          });
        })
        .catch(() => {});
    },
    edit(id){
        this.$emit("edit",id)
    }
  },
  mounted() {
    this.reqList();
  },
};
</script>
<style scoped>
img {
  width: 100px;
  height: 100px;
}
</style>