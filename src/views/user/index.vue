<template>
	<div class="app-container">
		<div class="table-tools">
      <div class="tools-line">
				<div class="label">姓名：</div>
				<el-input
				  placeholder="请输入用户姓名"
				  v-model="listQuery.name"
				  clearable>
				</el-input>
			</div>
      <div class="tools-line">
				<div class="label">账户：</div>
				<el-input
				  placeholder="请输入用户账号"
				  v-model="listQuery.account"
				  clearable>
				</el-input>
			</div>
      <div class="tools-line">
				<el-button type="primary" size="small" plain @click="fetchData">筛选</el-button>
			</div>
		</div>
		<div class="table-btns" v-if="hasPermission(72)">
			<el-button type="primary" size="small" @click="showDialog(0)">添加用户</el-button>
		</div>
		<el-table
		  v-loading="listLoading"
		  :data="list"
		  element-loading-text="Loading"
		  border
		  fit
		  highlight-current-row>
		  <el-table-column align="center" label="序号" width="95">
		    <template slot-scope="scope">
		      {{ (listQuery.pageNo - 1) * listQuery.pageSize + scope.$index + 1 }}
		    </template>
		  </el-table-column>
		  <el-table-column align="center" label="姓名" width="150">
		    <template slot-scope="scope">
		      {{ scope.row.name }}
		    </template>
		  </el-table-column>
		  <el-table-column align="center" label="账号" width="250">
		    <template slot-scope="scope">
		      {{ scope.row.account }}
		    </template>
		  </el-table-column>
		  <el-table-column label="手机" width="250" align="center">
		    <template slot-scope="scope">
		      {{ scope.row.phone }}
		    </template>
		  </el-table-column>
		  <el-table-column align="center" label="创建时间" >
		    <template slot-scope="scope">
		      <i class="el-icon-time"/>
		      <span>{{ getTime(scope.row.createTime) }}</span>
		    </template>
		  </el-table-column>
		  <el-table-column align="center" label="更新时间" >
		    <template slot-scope="scope">
		      <i class="el-icon-time"/>
		      <span>{{ getTime(scope.row.updateTime) }}</span>
		    </template>
		  </el-table-column>
		  <el-table-column fixed="right" label="操作" width="200" align="center">
	      <template slot-scope="scope">
	        <el-button @click="showDialog(2, scope.row.id)" type="text" size="small">查看</el-button>
	        <el-button v-if="hasPermission(73)" @click="showDialog(1, scope.row.id)" type="text" size="small">编辑</el-button>
	      </template>
	    </el-table-column>
		</el-table>
		<el-pagination
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
		  width="530px"
		  @closed="closeFn"
		  >
		  <User v-if="init" :action="action" :form="form" @setRoles="setRoles" @setForm="getForm"></User>
		  <span slot="footer" class="dialog-footer">
		    <el-button type="primary" @click="submitFn">确 定</el-button>
		    <el-button @click="dialogVisible = false">取 消</el-button>
		  </span>
		</el-dialog>
	</div>
</template>
<script>
	import { getList, viewUser, addUser, editUser } from '@/api/user'
	import { mapGetters } from 'vuex'
	import User from './user'
	import { hasPermission } from '@/utils'

	export default {
	  data() {
	    return {
	    	hasPermission,
	    	init: true,
	    	listQuery: { //查询条件
	    		pageNo: 1, 
	    		pageSize: 10,
	    		name: '', //用户名
	    		account: '' //用户账号
	    	},
	    	total: 0,
	      list: [],
	      listLoading: true,
	      dialogVisible: false,
	      action: 0, //0为添加， 1为编辑， 2为查看
	      roles: [], //存储选中roles选中值
	      form: {}
	    }
	  },
	  computed: {
	    dialogTitle () {
	    	switch (this.action) {
	    		case 0:
	    			return '添加用户'
	    		case 1: 
	    			return '编辑用户'
	    		case 2: 
	    			return '查看用户'
	    	}
	    }
	  },
	  created() {
	    this.fetchData()
	  },
	  components: {
	  	User
	  },
	  methods: {
	  	getTime (date) {
	  		if (!date)
          return ''
	  		return this.$moment(date).format('YYYY-MM-DD hh:mm:ss')
	  	},
	    fetchData() {
	      this.listLoading = true
	      getList(this.listQuery).then(res => {
	      	this.total = res.data.total
	        this.list = res.data.items
	        this.listLoading = false
	      })
	    },
	    changePage (val) {
	    	this.fetchData()
	    },
	    showDialog (action, id) {
	    	this.action = action
    		viewUser(id).then(res => {
    			this.setForm(res.data)
    		})
	    },
	    setRoles (roles) {
	    	this.roles = roles
	    },
	    setForm (data) {
	    	this.form = data
	    	this.init = true
	    	this.dialogVisible = true
	    },
	    getForm (form) {
	    	this.childForm = form
	    },
	    closeFn () {
	    	this.init = false
	    },
	    submitFn () {
	    	if (this.action == 2) 
	    		return this.dialogVisible = false;
	    	let fn = this.action == 0 ? addUser : editUser
	    	this.childForm.validate((valid) => {
	    		if (valid) {
			    	fn(Object.assign({}, this.form, {
			    		roles: this.roles
			    	})).then(res => {
			    		this.$message({
			    			message: res.message,
					      type: 'success',
					      duration: 3 * 1000
			    		})
			    		this.dialogVisible = false;
			    		this.fetchData()
			    	})
	    		} else {
	    			return false
	    		}
	    	})
	    }
	  }
	}
</script>