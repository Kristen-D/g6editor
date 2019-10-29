<template>
  <el-dialog title="算法引导" :visible.sync="algorithmVisible" width="788px" class="dialog-white">
    <div class="guideBox">
      <div
        v-for="(item,index) in guideboxdata"
        class="treebox flexCenter"
        :class="['position'+index]"
        @click="item.tipshow=true"
        v-on:mouseout="item.tipshow=false"
      >
        {{item.content}}
				
        <div class="triangle" v-if="item.tip"></div>
        <div v-if="item.tip&&item.tipshow" class="clicktip text-xs text-white" @mouseover="item.tipshow=true" @mouseout="item.tipshow=false">
          <el-row v-for="it in item.tip">
            <el-col :span="6" style="width: 22%;">{{it.title}}</el-col>
            <el-col :span="18" style="width: 77%">{{it.data}}</el-col>
          </el-row>
        </div>
      </div>
    </div>
  </el-dialog>
</template>
<style scoped>
.guideBox {
  position: relative;
  height: 736px;
  width: 100%;
  background: url(/static/static_web/images/Dialog-AlgorithmGuide-linebg.png) no-repeat;
  background-position: 30% 66%;
}
.treebox {
  position: absolute;
  font-size: 14px;
  text-align: center;
  width: 110px;
  height: 58px;
  padding: 0 26px;
  line-height: 16px;
  border: 1px solid #e1e3e4;
  background-color: #f5f5f7;
  cursor: pointer;
}
.treebox.position0 {
  width: 125px;
  height: 53px;
  top: 9px;
  left: 330px;
  color: #fff;
  background-color: #35a2ff;
}
.treebox.position1 {
  width: 201px;
  height: 58px;
  top: 104px;
  left: 111px;
}
.treebox.position2 {
  width: 201px;
  height: 58px;
  top: 104px;
  right: 42px;
}
.treebox.position3 {
  width: 201px;
  height: 58px;
  top: 200px;
  left: 111px;
}
.treebox.position4 {
  width: 121px;
  height: 58px;
  top: 200px;
  right: 42px;
}
.treebox.position5 {
  width: 121px;
  height: 58px;
  top: 302px;
  left: 62px;
}
.treebox.position6 {
  width: 121px;
  height: 58px;
  top: 302px;
  left: 239px;
}
.treebox.position7 {
  width: 121px;
  height: 58px;
  top: 302px;
  right: 42px;
}
.treebox.position8 {
  top: 387px;
  left: 73px;
}
.treebox.position9 {
  top: 387px;
  left: 238px;
}
.treebox.position10 {
  top: 387px;
  right: 42px;
}
.treebox.position11 {
  top: 457px;
  left: 73px;
}
.treebox.position12 {
  top: 457px;
  left: 238px;
}
.treebox.position13 {
  top: 457px;
  right: 42px;
}
.treebox.position14 {
  top: 527px;
  left: 73px;
  padding: 0 19px;
}
.treebox.position15 {
  top: 527px;
  right: 42px;
  padding: 0 19px;
}
.treebox.position16 {
  top: 597px;
  left: 73px;
}
.treebox.position17 {
  top: 597px;
  right: 42px;
}
.treebox.position18 {
  top: 667px;
  left: 73px;
}
.treebox.position19 {
  top: 667px;
  right: 42px;
}

.triangle {
  position: absolute;
  bottom: 1px;
  right: 1px;
  display: inline-block;
  width: 0;
  height: 0;
  border: 5.5px solid #505354;
  border-top: 5.5px solid transparent;
  border-left: 5.5px solid transparent;
  cursor: pointer;
}
.treebox:hover .triangle {
  border-color: #0078d7;
  border-top: 5.5px solid transparent;
  border-left: 5.5px solid transparent;
}
.clicktip {
  position: absolute;
  left: 70%;
  top: 90%;
  width: 305px;
  padding: 10px 12px;
  line-height: 18px;
  text-align: left;
  z-index: 99;
  background-color: rgba(0, 0, 0, 0.8);
}
.clicktip:before {
  display: inline-block;
  content: "";
  position: absolute;
  bottom: 100%;
  width: 0;
  height: 0;
  border: 6px solid rgba(0, 0, 0, 0.8);
  border-top: 6px solid transparent;
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
}
</style>
<script>
export default {
  props: ['algorithmDialog'],
  data() {
    return {
      algorithmVisible: false,
      guideboxdata: [
        {
          content: '算法引导',
        },
        {
          content: '是否对类别进行预测/预测类别/是否是分类问题',
				}, 
				{
          content: '是否对数值进行预测',
				}, 
				{
          content: '是否有类别标签/类别标签是否已知',
				}, 
				{
          content: '有标签',
				}, 
				{
          content: '有标签分类模型',
				}, 
				{
          content: '无标签分类模型',
				}, 
				{
          content: '回归模型',
				}, 
				{
          content: 'LinearSVM （SGD)',
          tipshow: false,
          tip: [
            {
              title: '模型名称：',
              data: 'LinearSVM （SGD)',

            }, {
              title: '模型介绍：',
              data: 'KMeans算法可以根据样本之间的相似程度将样本分成不同的组，使得相同组内的样本尽量相似，而不同组之间的样本尽量不同。',
            }, {
              title: '数据准备：',
              data: '1.输入的自变量数据（X）中若有分组型变                  量，需要通过值转换算子转换为数值编码。 2.输入的自变量数据（X）需要通过标准化算子进行标准化。'
            }
          ]
				}, 
				{
          content: 'KMeans',
          tipshow: false,
          tip: [
            {
              title: '模型名称：',
              data: 'KMeans',

            }, {
              title: '模型介绍：',
              data: 'KMeans算法可以根据样本之间的相似程度将样本分成不同的组，使得相同组内的样本尽量相似，而不同组之间的样本尽量不同。',
            }, {
              title: '数据准备：',
              data: '1.输入的自变量数据（X）中若有分组型变                  量，需要通过值转换算子转换为数值编码。 2.输入的自变量数据（X）需要通过标准化算子进行标准化。'
            }
          ]
				}, 
				{
          content: '线性回归（SGD)',
          tipshow: false,
          tip: [
            {
              title: '模型名称：',
              data: '线性回归（SGD)',

            }, {
              title: '模型介绍：',
              data: 'KMeans算法可以根据样本之间的相似程度将样本分成不同的组，使得相同组内的样本尽量相似，而不同组之间的样本尽量不同。',
            }, {
              title: '数据准备：',
              data: '1.输入的自变量数据（X）中若有分组型变                  量，需要通过值转换算子转换为数值编码。 2.输入的自变量数据（X）需要通过标准化算子进行标准化。'
            }
          ]
				}, 
				{
          content: '逻辑回归（LBFGS)',
          tipshow: false,
          tip: [
            {
              title: '模型名称：',
              data: '逻辑回归（LBFGS)',

            }, {
              title: '模型介绍：',
              data: 'KMeans算法可以根据样本之间的相似程度将样本分成不同的组，使得相同组内的样本尽量相似，而不同组之间的样本尽量不同。',
            }, {
              title: '数据准备：',
              data: '1.输入的自变量数据（X）中若有分组型变                  量，需要通过值转换算子转换为数值编码。 2.输入的自变量数据（X）需要通过标准化算子进行标准化。'
            }
          ]
				}, 
				{
          content: '二分 KMeans',
          tipshow: false,
          tip: [
            {
              title: '模型名称：',
              data: '二分 KMeans',

            }, {
              title: '模型介绍：',
              data: 'KMeans算法可以根据样本之间的相似程度将样本分成不同的组，使得相同组内的样本尽量相似，而不同组之间的样本尽量不同。',
            }, {
              title: '数据准备：',
              data: '1.输入的自变量数据（X）中若有分组型变                  量，需要通过值转换算子转换为数值编码。 2.输入的自变量数据（X）需要通过标准化算子进行标准化。'
            }
          ]
				}, 
				{
          content: '岭回归（SGD)',
          tipshow: false,
          tip: [
            {
              title: '模型名称：',
              data: '岭回归（SGD)',

            }, {
              title: '模型介绍：',
              data: 'KMeans算法可以根据样本之间的相似程度将样本分成不同的组，使得相同组内的样本尽量相似，而不同组之间的样本尽量不同。',
            }, {
              title: '数据准备：',
              data: '1.输入的自变量数据（X）中若有分组型变                  量，需要通过值转换算子转换为数值编码。 2.输入的自变量数据（X）需要通过标准化算子进行标准化。'
            }
          ]
				}, 
				{
          content: '朴素贝叶斯',
          tipshow: false,
          tip: [
            {
              title: '模型名称：',
              data: '朴素贝叶斯',

            }, {
              title: '模型介绍：',
              data: 'KMeans算法可以根据样本之间的相似程度将样本分成不同的组，使得相同组内的样本尽量相似，而不同组之间的样本尽量不同。',
            }, {
              title: '数据准备：',
              data: '1.输入的自变量数据（X）中若有分组型变                  量，需要通过值转换算子转换为数值编码。 2.输入的自变量数据（X）需要通过标准化算子进行标准化。'
            }
          ]
				}, 
				{
          content: 'Lasso回归（SGD)',
          tipshow: false,
          tip: [
            {
              title: '模型名称：',
              data: 'Lasso回归（SGD)',

            }, {
              title: '模型介绍：',
              data: 'KMeans算法可以根据样本之间的相似程度将样本分成不同的组，使得相同组内的样本尽量相似，而不同组之间的样本尽量不同。',
            }, {
              title: '数据准备：',
              data: '1.输入的自变量数据（X）中若有分组型变                  量，需要通过值转换算子转换为数值编码。 2.输入的自变量数据（X）需要通过标准化算子进行标准化。'
            }
          ]
				}, 
				{
          content: '决策树',
          tipshow: false,
          tip: [
            {
              title: '模型名称：',
              data: '决策树',

            }, {
              title: '模型介绍：',
              data: 'KMeans算法可以根据样本之间的相似程度将样本分成不同的组，使得相同组内的样本尽量相似，而不同组之间的样本尽量不同。',
            }, {
              title: '数据准备：',
              data: '1.输入的自变量数据（X）中若有分组型变                  量，需要通过值转换算子转换为数值编码。 2.输入的自变量数据（X）需要通过标准化算子进行标准化。'
            }
          ]
				}, 
				{
          content: '决策树',
          tipshow: false,
          tip: [
            {
              title: '模型名称：',
              data: '决策树',

            }, {
              title: '模型介绍：',
              data: 'KMeans算法可以根据样本之间的相似程度将样本分成不同的组，使得相同组内的样本尽量相似，而不同组之间的样本尽量不同。',
            }, {
              title: '数据准备：',
              data: '1.输入的自变量数据（X）中若有分组型变                  量，需要通过值转换算子转换为数值编码。 2.输入的自变量数据（X）需要通过标准化算子进行标准化。'
            }
          ]
				}, 
				{
          content: '随机森林',
          tipshow: false,
          tip: [
            {
              title: '模型名称：',
              data: '随机森林',

            }, {
              title: '模型介绍：',
              data: 'KMeans算法可以根据样本之间的相似程度将样本分成不同的组，使得相同组内的样本尽量相似，而不同组之间的样本尽量不同。',
            }, {
              title: '数据准备：',
              data: '1.输入的自变量数据（X）中若有分组型变                  量，需要通过值转换算子转换为数值编码。 2.输入的自变量数据（X）需要通过标准化算子进行标准化。'
            }
          ]
				}, 
				{
          content: '随机森林',
          tipshow: false,
          tip: [
            {
              title: '模型名称：',
              data: '随机森林',

            }, {
              title: '模型介绍：',
              data: 'KMeans算法可以根据样本之间的相似程度将样本分成不同的组，使得相同组内的样本尽量相似，而不同组之间的样本尽量不同。',
            }, {
              title: '数据准备：',
              data: '1.输入的自变量数据（X）中若有分组型变                  量，需要通过值转换算子转换为数值编码。 2.输入的自变量数据（X）需要通过标准化算子进行标准化。'
            }
          ]
        },
      ]
    }
  },
  watch: {
    algorithmDialog: function () {
      this.algorithmVisible = this.algorithmDialog;
    },
    algorithmVisible: function () {
      this.$emit('algorithmVisible', this.algorithmVisible)
    }
  },
}
</script>  