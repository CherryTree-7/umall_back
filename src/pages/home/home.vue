<template>
  <div>
    <div id="main"></div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
  computed: {
    ...mapGetters({
      list: "cate/list",
    }),
  },
  methods: {
    ...mapActions({
      reqList: "cate/reqList",
    }),
  },
  mounted() {
    //一进页面就发请求
    this.reqList();
  },
  watch: {
    list: {
      handler() {
        if (this.list.length > 0) {
          let myChart = require("echarts").init(
            document.getElementById("main")
          );
          let option = {
            title: {
              text: "分类数量",
            },
            tooltip: {},
            legend: {
              data: ["销量"],
            },
            xAxis: {
              data: this.list.map((item) => item.catename),
            },
            yAxis: {},
            series: [
              {
                name: "分类数量",
                type: "line",
                data: this.list.map((item) =>
                  item.children ? item.children.length : 0
                ),
              },
            ],
          };

          // 使用刚指定的配置项和数据显示图表。
          myChart.setOption(option);
        }
      },
      deep: true,
    },
  },
};
</script>
<style>
#main {
  width: 80%;
  height: 500px;
  border: 1px solid #999;
  margin: 20px auto;
}
</style>