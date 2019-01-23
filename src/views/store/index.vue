<template>
	<div class="brand store">
		<div class="table-btns" v-if="hasPermission(82)">
  		<el-button type="primary" size="small" @click="showDialog(0)">添加</el-button>
  	</div>
		<ul class="brand-content">
			<li class="brand-item store-item" v-for="item of list" :key="item.id">
				<div class="card">
					<button v-if="hasPermission(-1)" type="button" aria-label="Close" class="el-message-box__headerbtn" @click="delFn(item.id)">
						<i class="el-message-box__close el-icon-close"></i>
					</button>
						<div class="icon"></div>
					<div class="brand-name" @click="checkFn(item.id)">{{item.name}}</div>
				</div>
			</li>
		</ul>
		<el-pagination
			v-if="total"
		  background
		  @current-change="changePage"
  	  :current-page.sync="listQuery.pageNo"
  	  :page-size="listQuery.pageSize"
		  layout="total, prev, pager, next"
		  :total="total">
		</el-pagination>
		<el-dialog 
			ref="dialog" 
			:title="dialogTitle" 
			:visible.sync="dialogVisible" 
			width="530px" >
		  <el-form class="app-form" ref="form" :model="form" :rules="rules" label-position="left" label-width="80px">
			  <el-form-item label="仓库名称" prop="name">
			    <el-input v-model="form.name"></el-input>
			  </el-form-item>
			  <el-form-item label="仓库地址" prop="address">
					<el-input v-model="form.address"></el-input>
			  </el-form-item>
			</el-form>
		  <span slot="footer" class="dialog-footer">
		    <el-button size="small" type="primary" @click="submitFn">确定</el-button>
		    <el-button size="small" @click="hideFn">取 消</el-button>
		  </span>
		</el-dialog>
	</div>
</template>
<script>
	import { mapGetters } from 'vuex'
	import { getList, viewStore, addStore, editStore, delStore } from '@/api/store'
	import { hasPermission } from '@/utils'

	export default {
		data () {
			return {
				hasPermission,
				action: 0,
				total: 0,
				basePath: process.env.BASE_API,
				listQuery: {
					pageNo: 1,
					pageSize: 12
				},
				dialogVisible: false,
				list: [],
				form: {},
				rules: {
					name: [
            { required: true, message: '请输入仓库名称', trigger: 'blur' }
          ],
          address: [
            { required: true, message: '请输入仓库地址', trigger: 'blur' }
          ]
				}
			}
		},
		computed: {
			...mapGetters([
				'token'
			]),
			dialogTitle () {
				return this.action == 0 ? '添加品牌' : '编辑品牌'
			}
		},
		created () {
			this.fetchData()
		},
		methods: {
			fetchData () {
				getList(this.listQuery).then(res => {
					this.total = res.data.total
					this.list = res.data.items
				})
			},
			changePage () {
				this.fetchData()
			},
			checkFn (id) {
				if (hasPermission(83))
					this.showDialog(1, id)
			},
			showDialog (action, id) {
				this.action = action
				viewStore(id).then(res => {
					this.form = res.data
					this.dialogVisible = true
				})
			},
			hideFn () {
				this.dialogVisible = false
				this.form.logo = []
				this.$refs.form.clearValidate()
			},
			submitFn () {
				let fn = this.action == 0 ? addStore : editStore
				this.$refs.form.validate((valid) => {
          if (valid) {
						fn(this.form).then(res => {
							this.$message({
			    			message: res.message,
					      type: 'success',
					      duration: 3 * 1000
			    		})
							this.hideFn()
							this.fetchData()
						})
          }
        })
			},
			delFn (id) {
	    	this.$confirm('此操作将永久删除该仓库, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
					delStore({id}).then(res => {
						this.$message({
		    			message: res.message,
				      type: 'success',
				      duration: 3 * 1000
		    		})
						this.fetchData()
					})
        })
			}
		}
	}
</script>
<style lang="scss">
	.store{
		.icon{ 
			width: 124px;
			height: 124px;
			margin: 35px 43px;
			background: url(../../../static/images/icon.gif); 
		}
		.store-item{}
	}
</style>