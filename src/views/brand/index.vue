<template>
	<div class="brand">
		<div class="table-btns" v-if="hasPermission(22)">
  		<el-button type="primary" size="small" @click="showDialog(0)">添加</el-button>
  	</div>
		<ul class="brand-content">
			<li class="brand-item" v-for="item of list" :key="item.id">
				<div class="card">
					<button v-if="hasPermission(-1)" type="button" aria-label="Close" class="el-message-box__headerbtn" @click="delFn(item.id)">
						<i class="el-message-box__close el-icon-close"></i>
					</button>
					<div class="img">
					<img :src="item.logo.length && item.logo[0].url" width="120" height="120" />	
					</div>
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
			  <el-form-item label="品牌名称" prop="name">
			    <el-input v-model="form.name"></el-input>
			  </el-form-item>
			  <el-form-item label="品牌logo" prop="logo">
			    <el-upload
					  :action="uploadUrl"
					  :data="{token}"
					  :limit="1"
					  :before-upload="beforeUploadPic"
					  :on-success="successFn"
					  :on-remove="removeHandle"
					  :file-list="form.logo"
					  list-type="picture">
					  <el-button size="small" type="primary">点击上传</el-button>
					  <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过5M</div>
					</el-upload>
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
	import { getList, viewBrand, addBrand, editBrand, delBrand } from '@/api/brand'
	import { hasPermission } from '@/utils'

	export default {
		data () {
			return {
				hasPermission,
				action: 0,
				total: 0,
				listQuery: {
					pageNo: 1,
					pageSize: 12
				},
				uploadUrl: process.env.BASE_API + '/upload/file',
				dialogVisible: false,
				list: [],
				form: {},
				rules: {
					name: [
            { required: true, message: '请输入品牌名称', trigger: 'blur' }
          ],
          logo: [
            { required: true, message: '请上传品牌logo', trigger: 'blur' }
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
				if (hasPermission(23))
					this.showDialog(1, id)
			},
			showDialog (action, id) {
				this.action = action
				viewBrand(id).then(res => {
					this.form = res.data
					this.dialogVisible = true
				})
			},
			beforeUploadPic (file) {
        if ((file.size / 1024 / 1024) > 5) {
          this.$message({
            message: '请上传小于50M的文件！',
            type: 'error'
          })
          return false
        }
        var str = file.name.split('.')[file.name.split('.').length - 1]
        if (['png', 'jpg', 'jpeg'].indexOf(str) < 0) {
          this.$message({
            message: '请上传指定格式文件！',
            type: 'error'
          })
          return false
        }
      },
			successFn (res) {
				this.form.logo.push(res)
				this.$refs.form.clearValidate('logo')
			},
			removeHandle (res, files) {
        this.form.logo = []
      },
			hideFn () {
				this.dialogVisible = false
				this.form.logo = []
				this.$refs.form.clearValidate()
			},
			submitFn () {
				let fn = this.action == 0 ? addBrand : editBrand
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
	    	this.$confirm('此操作将永久删除该品牌, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
					delBrand({id}).then(res => {
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

</style>