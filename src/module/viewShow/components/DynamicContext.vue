<style scoped>

.my-tool {
    float: right;
    padding-right: 15px;
}

.my-grid {
    padding: 38px 0 0;
    box-sizing: border-box;
}

.my-grid-header {
    height: 38px;
    margin: -38px 0 0;
    padding: 5px 15px;
}

.btn-box-tool {
    padding: 0px 0px 0px 5px;
}

.mygrid-def {
    width: 100%;
    height: 100%;
}

.mygrid-color {
    background-color: #fff
}

.mygrid-close {
    top: 8px;
    right: 10px;
    position: absolute;
    z-index: 9999
}

.button-out {
    opacity: .1
}

.button-in {
    opacity: 1
}

</style>

<template>

<div id="sidebal-permissionIddle" class=" container-padding gird-background">
    <drillDialog></drillDialog>
    <infoDialog></infoDialog>

    <div class="row">
        <grid-layout ref="home_gl" :layout="gridData" :col-num="24" :row-height="10" :is-draggable="isDraggable" :is-resizable="isResizable" :vertical-compact="true" :margin="[15, 15]" :use-css-transforms="true">



            <grid-item v-for="(item,index) in gridData"  :minW="item.minW" :minH="item.minH" :x="item.x" :y="item.y" :w="item.w" :h="item.h" :i="item.i">


                <div style="height: 100%;">
                    <i type="button" @click="delGrid(item)" v-show="isEdit" class="mygrid-close  btn-box-tool el-dialog__close fa fa-times">
											</i>
                    <grid :ref="gridrefName+item.i" :data="item"> </grid>
                </div>

            </grid-item>
        </grid-layout>
    </div>

</div>
<!--viewFramework-product end-->

</template>

<script>

import grid from 'components/gridster/Grid.vue'
import {
    mapState
}
from 'vuex'
import debounce from 'lodash.debounce'
import drillDialog from '../../viewPlugins/components/DrillDialogTable.vue'
import infoDialog from '../../viewPlugins/components/InfoDialog.vue'
import cap from 'components/Cascader/CascaderPlus'
var GridLayout = VueGridLayout.GridLayout;
var GridItem = VueGridLayout.GridItem;

export default {
    components: {
        GridLayout, GridItem, grid, drillDialog, infoDialog, cap
    },
    data() {
        return {
            gridSeq: 0,
            gridrefName: 'my_grid_',
            moudle: "situationAnaly",
            isResizable: false,
            isDraggable: false,
            isEdit: false,
            componentList: [],
            gridData: [],
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

            showGridConf(grid) {
                this.$refs.gridConf.showGridConf(grid);
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
                vm.common.req("/ssa/viewPlugins/getShowGridData.do", this.params).then(result => {
                    let data = result.grid;
                    if(!result.gridPage) return;
                    this.params.themeValue = result.gridPage.theme_value
                  //  this.themeList = result.gridTheme;
                    data.forEach((d, i) => {
                        d.i = i;
                        if (d.params) d.params = eval("(" + d.params + ")")
                    })
                    this.gridData = data;
                    console.log(this.gridData);
                    this.gridSeq = data.length;
                });
            },
            changeTheme(){
              if(this.params.themeValue) $("#viewTheme").attr('href', '/static/css/'+this.params.themeValue+".css");
            }

    },

    created: async function() {
      await this.$store.dispatch("loadListTypeList"); 
      this.$watch('params.themeValue', theme => {
        this.changeTheme();
      } )
      if(window.top.getMenuId) this.params.permissionId = window.top.getMenuId();
      this.initGridList();

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
