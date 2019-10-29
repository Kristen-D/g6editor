<template>
	<div>
		<el-form :label-position="right" label-width="80px" :model="roleForm" ref="roleForm" :rules="rules">
		  <el-form-item label="角色名" v-if="editStatus" prop="title">
				<el-col :span="10">
		    	<el-input v-model="roleForm.title"></el-input>
				</el-col>
		  </el-form-item>
		  <el-form-item label="备注" v-if="editStatus">
				<el-col :span="15">
					<el-input v-model="roleForm.description"></el-input>
				</el-col>
		  </el-form-item>
		  <el-form-item label="权限" prop="menuList">
					<el-tree :data="treeMenu" :props="props"   show-checkbox :default-expanded-keys="['-1']"
			   node-key="permissionId"
						 ref="tree" style="height:220px;overflow-y:scroll">
					</el-tree>
		  </el-form-item>
		</el-form>

		<div  class="dialog-footer" v-if="editStatus">
			<el-button class="dialog-button" @click="cancel">取消</el-button>
			<el-button type="primary" @click="onSubmit">确定</el-button>
		</div>
	</div>

</template>
<script>
import {mapState} from 'vuex'
export default {
	props: {
			row: {
				type: Object
			}
	},
	computed: {
		...mapState({
			treeMenu: state => state.context.treeMenu,
			idMenu: state => state.context.idMenu,
			editStatus: state => state.context.editStatus,
		})
	},

	created: async function() {


	},
    data() {

			let validateAuth = (rule, value, callback) => {
				this.roleForm.menuList = this.$refs.tree.getCheckedNodes(true);
				if(this.roleForm.menuList.length <=0 ) {
					callback(new Error('请选择权限！'));
				}
				callback();
			};
      return {
				roleForm: {roleId:"", title:"", description:"", menuList:[]},
				key: 'menu_id',
        props: {
          label: 'name',
					children:'children',
        },
				rules: {
					name: [
						{ required: true, message: '请输入角色名！', trigger: 'blur' },
					],
					menuList: [
						{ validator: validateAuth, trigger: 'blur' }
					]
				}
      };
    },
    methods: {
			getHideAttri(value, data, node) {
				if(value){
					return true;
				}else {
					if(node.checked) {
						return true;
					}else {
						return false;
					}
				}

			},
			async loadTreeMenu() {
        let data = await this.common.req("/ssa/authority/roleCfg/getRoleMenus.do", this.row, this);
				let list = [];
				data.forEach((rm) => {
					let p = this.idMenu[rm.permissionId];
					if(p&&!p.children)list.push(rm.permissionId);
				});
				this.row.menus = list;
			//	console.log(this.row.menus )
				this.roleForm = {...this.row};
        this.$refs.tree.setCheckedKeys(this.row.menus);
      },

			onSubmit(event) {
				var vm = this;
				this.$refs.roleForm.validate(async (valid) => {
					if(valid) {
						let menuArr = vm.$refs.tree.getCheckedNodes(true);
						let menuLeafIds = vm.$refs.tree.getCheckedKeys(true);
						let pMenuIds = this.common.getAllTreeCheckedKeys(menuArr,this.idMenu);
						vm.roleForm.menus = menuLeafIds.concat(pMenuIds).join(",");
						let data = await vm.common.reqDef("/ssa/authority/roleCfg/saveRole.do", vm.roleForm,vm);
						if(data.state){
							vm.$message({ type: 'success',   message: data.message });
							vm.$emit('close', event.target);
							await this.$store.dispatch('reloadTable', 'roleCfg');
						}
					}else {
						console.log('error submit!!');
            return false;
					}
				});

			},
			cancel() {
				this.$emit('close', event.target);
			},
			getTree() {
				return this.$refs.roleForm;
			},
			initRoleForm() {
				this.roleForm = {roleId:"", title:"", description:""};
				this.$refs.tree.setCheckedKeys([], true);
			},

    }
  };
</script>
<style>
.dialog-button{
	margin-left: 285px;
}
</style>
