<!--产品规格详情包含表格-->
<template>

  <div class="el-panel">
<!--    <section>-->
      <div class="container-fluid">
        <div class="el-panel">
          <SDSecComponentBackground imageSrc="/static/sdsec/image/bigscreen-bg2.png"  :title =this.title :content=this.productDescription></SDSecComponentBackground>
        </div>
      </div>
<!--    </section>-->

<!--    <section>-->
      <div class="container-fluid">
        <div class="el-panel">
          <div class="el-panel-title2">规格说明</div>
          <div class="el-panel-body">
            <el-table :data="productDetail.propertiesList" >
              <el-table-column label="功能" prop="label">
              </el-table-column>
              <el-table-column label="描述" prop="description">
              </el-table-column>

            </el-table>

            <div class="fix-bottom-button">
              <el-button type="gray" size="medium" @click="goBack">返回</el-button>
            </div>
          </div>
        </div>
      </div>
<!--    </section>-->
  </div>

</template>

<script>
    import SDSecComponentBackground from './SDSec-component-background'

    export default {
        props:['tableId'],
        components: {
            SDSecComponentBackground
        },
        data() {
            return {
                title:'',
                productDescription:'',
                productDetail:{
                    propertiesList: []
                },
                // id: this.$route.params.id,
            }
        },
        methods: {
            goBack: function () {
                this.$router.go(-1);
            },
        },
        created: async function () {
            var id = this.$route.params.id;
            this.id = id;
            var productDetail = await this.utils.reqObjBackState('/sdsec/web/secsermarket/productspecification/getProductSpecificationAndPropertyById', {id: this.id});
            this.productDetail = productDetail.data;
            this.title = productDetail.data.name;
            this.productDescription = productDetail.data.description;
        }
    }


</script>

<style scoped>
  /*<style>*/
  .fix-bottom-button {
    position: fixed;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    background: rgba(255, 255, 255, .7);
    padding: 10px;
  }
</style>
