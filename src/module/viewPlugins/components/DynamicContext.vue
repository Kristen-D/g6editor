<!-- <style scoped>
.my-tool {float: right;padding-right: 15px;}
.tool-width{width:18%;}
.my-grid {padding: 38px 0 0;box-sizing: border-box;}
.my-grid-header {height: 38px;margin: -38px 0 0;padding: 5px 15px;}
.btn-box-tool {padding: 0px 0px 0px 5px;}
.mygrid-def {width: 100%; height: 100%;}
.mygrid-color {background-color: #fff}
.mygrid-close {top: 8px;right: 10px;position: absolute;z-index: 9999}
.button-out {opacity: .1}
.button-in {opacity: 1}
</style> -->
<style>
.vbtn-close{position: absolute;right: 20px; top:3%;z-index: 99; color:#bab8b8;font-size: 16px;cursor: pointer;
}
.vbtn-close:hover{ color: #999 }
</style>
<template>

    <div id="sidebal-permissionIddle">
        <drillDialog></drillDialog>
        <infoDialog></infoDialog>
        <detail-dialog></detail-dialog>
        <custom-dialog></custom-dialog>
        <el-row style="background-color: #fff; padding: 14px 20px 0;">
            <el-col :span="10">
                <el-form :inline="true" :model="formInline" class="demo-form-inline">
                  <el-form-item>
                     <cap :options="componentList" style="width:100%;" clearable placeholder="选择组件" v-model="componentId" :root-id="-1"> </cap>
                 </el-form-item>
                 <el-form-item>
                     <el-button type="primary" size="small" @click="addGrid">添加</el-button>
                 </el-form-item>
             </el-form>
            </el-col>
            <el-col :span="14">
                <el-form :inline="true" :model="formInline" class="demo-form-inline">
                    <el-form-item>
                        <el-input v-model="params.gridPageName" placeholder="请输入视图名称"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-select v-model="params.themeValue" placeholder="请选择主题">
                          <el-option v-for="item in themeList" :key="item.theme_value" :label="item.the_name" :value="item.theme_value">
                          </el-option>
                      </el-select>
                    </el-form-item>
                     <el-form-item>
                        <el-select v-model="params.permissionId" placeholder="请选择菜单">
                            <el-option v-for="item in menuList" :key="item.permission_id" :label="item.name" :value="item.permission_id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-select v-model="params.roleId" placeholder="请选择权限">
                            <el-option v-for="item in roleList" :key="item.id" :label="item.text" :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="saveGrid">保存</el-button>
                        <el-button @click="cancelEdit">取消</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>

        <grid-layout style="border:1px solid #ebeef5;" ref="home_gl" :layout="gridData" :col-num="24" :row-height="10" :is-draggable="isDraggable" :is-resizable="isResizable" :vertical-compact="true" :margin="[15, 15]" :use-css-transforms="true">
            <grid-item v-for="(item,index) in gridData" @resized="resizedEvent" :minW="item.minW" :minH="item.minH" :x="item.x" :y="item.y" :w="item.w" :h="item.h" :i="item.i" >
              <!--   <div style="height: 100%; position: relative;width: 100px;"> -->
                     <button type="button"  @click="delGrid(item)"  v-show="isEdit" aria-label="Close" 
                    class="mygrid-close  btn-box-tool el-dialog__headerbtn"><i class="el-dialog__close el-icon el-icon-close"></i></button>
                    <grid :ref="gridrefName+item.i" :data="item"></grid>
                <!-- </div> -->
            </grid-item>
        </grid-layout>


</div>

</template>

<script>

    import grid from 'components/gridster/Grid.vue'
    import {mapState}  from 'vuex'
    import debounce from 'lodash.debounce'
    import drillDialog from './DrillDialogTable.vue'
    import infoDialog from './InfoDialog.vue'
    import cap from 'components/Cascader/CascaderPlus'
    import DetailDialog from "./DetailDialog";
    import CustomDialog from "./CustomDialog";


    var GridLayout = VueGridLayout.GridLayout;
    var GridItem = VueGridLayout.GridItem;

    export default {
        components: {
          CustomDialog,
          DetailDialog,
          GridLayout, GridItem, grid, drillDialog, infoDialog, cap
      },
      data() {
        return {
            gridSeq: 0,
            gridrefName: 'my_grid_',
            moudle: "situationAnaly",
            isResizable: true,
            isDraggable: true,
            isEdit: true,
            componentList: [],
            themeList:[],
            menuList: [],
            roleList: [],
            tempGrid: [],
            gridData: [],
            gridCustomMethods: {},
            fadeClass: "button-out",
            componentId: null,
            componentMap: {},
            params: {
                gridPageId: null,
                permissionId: null,
                roleId: null,
                gridPageName:null,
                themeValue:"view-theme-def",
            }
        }
    },
    computed: {
        ...mapState({
            menuName: state => state.context.menuName,
        })
    },

    methods: {
        fade(val) {
            this.fadeClass = val;
        },
        showGridConf(grid) {
            this.$refs.gridConf.showGridConf(grid);
        },
        getGridSeq() {
            return this.gridSeq++;
        },

        resizedEvent: function(i, newH, newW) {

          let resizeEvent = document.createEvent('HTMLEvents');
          resizeEvent.initEvent('resize', true, true);
          window.dispatchEvent(resizeEvent);
          this.$store.commit("resetAllGrid");

      },
      editStart() {
        let vm = this;
        this.isResizable = true;
        this.isDraggable = true;
        this.isEdit = true;
        this.tempGrid = jQuery.extend(true, [], this.gridData);
        this.$nextTick(() => {
            vm.$store.commit("resetAllGrid");
        });

    },
    cancelEdit() {
        sessionStorage.removeItem('params');
        this.$router.go(-1);
    },
    editEnd() {
        let vm = this;
        this.isResizable = false;
        this.isDraggable = false;
        this.isEdit = false;
                //console.log(this.tempGrid)
                this.$nextTick(() => {
                    //  vm.$store.commit("resetAllGrid");
                });
            },
            addGrid: function() {
                let component = this.componentMap[this.componentId[this.componentId.length - 1]];
                var i = this.getGridSeq();
                component = {
                 component_id: component.value,
                 x: 0,
                 y: 0,
                 w: component.minW,
                 h: component.minH,
                 loading: true,
                 i: i,
                 ...component
             }
             this.gridData.push(component);
         },
         saveGrid: function() {
            let vm = this;
            if(this.params.gridPageName == null || this.params.gridPageName==""){
              this.$alert("视图名不可为空", '失败')
              return;
          }

          if(this.params.roleId == null || this.params.roleId==""){
           this.$alert("权限不可为空", '失败')
           return;
       }

       if(this.params.permissionId == null || this.params.permissionId==""){
           this.$alert("菜单不可为空", '失败')
           return;
       }

       this.params.jsonDataStr = JSON.stringify(this.gridData);
       vm.common.reqDef("/ssa/viewPlugins/saveGrid.do", this.params, this).then(data => {
        this.$message({
            type: 'success',
            message: data.message
        });
        sessionStorage.params = JSON.stringify(  this.params);
                    //this.editEnd();
                });
   },

   delGrid: function(item) {
    this.$confirm('此操作将删除选中面板, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
    }).then(async() => {
        var g = this.gridData;
        g.forEach((d, i) => {
            if (d.i == item.i) {
                g.splice(i, 1);
            }
        })

    }).catch(() => {});

},
handleCustomMethods: function(item, m) {

},
init: function() {
    let vm = this;
                //let params = {gridPageId:this.gridPageId,permissionId:this.permissionId,roleId:this.roleId};

                vm.common.req("/ssa/viewPlugins/listComponent.do", this.params).then(data => {
                    this.common.initArrayData(data, this.componentMap, "value")
                    this.componentList = data;
                });

                vm.common.req("/ssa/viewPlugins/listMenu.do").then(data => {
                    this.menuList = data;
                });

                vm.common.req("/ssa/viewPlugins/listRole.do").then(data => {
                    this.roleList = data;
                });
            },
            initGridList: function() {
                let vm = this;
                // let params = {gridPageId:this.gridPageId,permissionId:this.permissionId,roleId:this.roleId};
                vm.common.req("/ssa/viewPlugins/getInitGridData.do", this.params).then(result => {
                    let data = result.grid;
                    this.themeList = result.gridTheme;
                    data.forEach((d, i) => {
                        d.i = i;
                        if (d.params) d.params = eval("(" + d.params + ")")
                    })
                    this.gridData = data;
                    this.gridSeq = data.length;
                });
            },
            changeGrid: function(item, c) {
                if (item.component != c.component) {
                    item.component = c.component
                    item.minW = c.minW;
                    item.minH = c.minH;
                    item.w = c.minW;
                    item.h = c.minH;
                    item.component_id = c.component_id;

                }

            },
            getParams() {
                let params = {...this.$route.params};
                let id = params.gridPageId;
                if (!params || !id) {
                    params = JSON.parse(sessionStorage.params);
                } else {
                    sessionStorage.params = JSON.stringify(params);
                }
                return params;
            },
            changeTheme(){
              if(this.params.themeValue) $("#viewTheme").attr('href', '/static/css/'+this.params.themeValue+".css");
          }
      },

      created: async function() {
          await this.$store.dispatch("loadListTypeList");
          this.$watch('params.themeValue', theme => {
        //this.theme = theme;
        this.changeTheme();
    } )



          let params = this.getParams();
          this.params.gridPageId = params.gridPageId;

          if (this.params.gridPageId != -1) {
            this.params.permissionId = params.permissionId;
            this.params.roleId = params.roleId;
            this.params.gridPageName = params.gridPageName;
            this.params.themeValue = params.themeValue;

        }
        this.initGridList();

        this.init();
    },
    mounted: function() {
        var vm = this;

        this.__resizeHanlder = debounce(() => {
            vm.$store.commit("resetAllGrid");
        }, 200, {
            leading: true
        })
        window.addEventListener('resize', this.__resizeHanlder)


    }

}

</script>
