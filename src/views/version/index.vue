<template>
	<div class="app-container">
		<div class="table-tools">
      <div class="tools-line">
				<div class="label">轴承类型：</div>
				<el-select v-model="listQuery.type"  placeholder="请选择轴承类型" clearable
				@change="getVersion">
  	 		  <el-option
  	 		    v-for="item in bearingType"
  	 		    :key="item.key"
  	 		    :label="item.value"
  	 		    :value="item.key">
  	 		  </el-option>
  	 		</el-select>
			</div>
			<div class="tools-line">
        <div class="label">轴承型号：</div>
        <el-select clearable filterable v-model="listQuery.version" placeholder="请选择轴承型号">
          <el-option
            v-for="item in versionList"
            :key="item.key"
            :label="item.value"
            :value="item.key">
          </el-option>
        </el-select>
      </div>
      <div class="tools-line">
				<el-button type="primary" size="small" plain @click="fetchData">筛选</el-button>
			</div>
		</div>
		<div class="table-btns" v-if="hasPermission(12)">
			<el-button type="primary" size="small" @click="showDialog(0)">添加</el-button>
		</div>
		<el-table
		  v-loading="listLoading"
		  :data="list"
		  element-loading-text="Loading"
		  border
		  fit
		  highlight-current-row>
		  <el-table-column align="center" label="序号" width="70">
		    <template slot-scope="scope">
		      {{ (listQuery.pageNo - 1) * listQuery.pageSize + scope.$index + 1 }}
		    </template>
		  </el-table-column>
		  <el-table-column align="center" label="轴承类型" width="200">
		    <template slot-scope="scope">
		      {{ getStr(scope.row.type) }}
		    </template>
		  </el-table-column>
		  <el-table-column align="center" label="国内新型号" width="150">
		    <template slot-scope="scope">
		      {{ scope.row.name }}
		    </template>
		  </el-table-column>
		  <el-table-column align="center" label="国内旧型号" width="150">
		    <template slot-scope="scope">
		      {{ scope.row.oldName }}
		    </template>
		  </el-table-column>
		   <el-table-column align="center" label="单位" >
		    <template slot-scope="scope">
		      {{ getUnit(scope.row.unit) }}
		    </template>
		  </el-table-column>
		  <el-table-column align="center" label="内径(mm)" >
		    <template slot-scope="scope">
		      <span>{{ scope.row.innerDiameter }}</span>
		    </template>
		  </el-table-column>
		  <el-table-column align="center" label="外径(mm)" >
		    <template slot-scope="scope">
		      <span>{{ scope.row.outsideDiameter }}</span>
		    </template>
		  </el-table-column>
		  <el-table-column align="center" label="宽度(mm)" >
		    <template slot-scope="scope">
		      <span>{{ scope.row.width }}</span>
		    </template>
		  </el-table-column>
		  <el-table-column align="center" label="重量(kg)" >
		    <template slot-scope="scope">
		      <span>{{ scope.row.weight }}</span>
		    </template>
		  </el-table-column>
		  <el-table-column fixed="right" label="操作" width="190" align="center">
	      <template slot-scope="scope">
	        <el-button v-if="hasPermission(13)" @click="showDialog(1, scope.row.id)" type="text" size="small">编辑</el-button>
	        <el-button v-if="hasPermission(-1)" @click="delFn(scope.row.id)" type="text" size="small">删除</el-button>
	      </template>
	    </el-table-column>
		</el-table>
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
		  width="540px"
		  >
		  <el-form class="app-form" ref="form" :model="form" :rules="rules" label-position="left" label-width="100px">
			  <el-form-item label="轴承类型" prop="type">
			    <el-select v-model="form.type"  placeholder="请选择轴承类型">
	  	 		  <el-option
	  	 		    v-for="item in bearingType"
	  	 		    :key="item.key"
	  	 		    :label="item.value"
	  	 		    :value="item.key">
	  	 		  </el-option>
  	 			</el-select>
			  </el-form-item>
			  <el-form-item label="国内新型号" prop="name">
			    <el-input v-model="form.name"></el-input>
			  </el-form-item>
			  <el-form-item label="国内旧型号" prop="oldName">
			    <el-input v-model="form.oldName"></el-input>
			  </el-form-item>
			  <el-form-item label="单位" >
			    <el-select v-model="form.unit"  placeholder="请选择单位">
	  	 		  <el-option
	  	 		    v-for="item in unitType"
	  	 		    :key="item.key"
	  	 		    :label="item.value"
	  	 		    :value="item.key">
	  	 		  </el-option>
  	 			</el-select>
			  </el-form-item>
			  <el-form-item label="内径(mm)" prop="innerDiameter">
			    <el-input v-model="form.innerDiameter"></el-input>
			  </el-form-item>
			  <el-form-item label="外径(mm)" prop="outsideDiameter">
			    <el-input v-model="form.outsideDiameter"></el-input>
			  </el-form-item>
			  <el-form-item label="宽度(mm)" prop="width">
			    <el-input v-model="form.width"></el-input>
			  </el-form-item>
			  <el-form-item label="重量(kg)" prop="weight">
			    <el-input v-model="form.weight"></el-input>
			  </el-form-item>
			</el-form>
		  <span slot="footer" class="dialog-footer">
		    <el-button type="primary" @click="submitFn">确 定</el-button>
		    <el-button @click="hideFn">取 消</el-button>
		  </span>
		</el-dialog>
	</div>
</template>
<script>
	import { mapGetters } from 'vuex'
	import { list } from '@/api/utils.js'
	import { getList, viewVersion, addVersion, editVersion, delVersion } from '@/api/version'
	import { validatePositiveNumber } from '@/utils/validate'
	import { hasPermission } from '@/utils'

	export default{
		data () {
			return {
				hasPermission,
				action: 0,
				total: 0,
				list: [],
				dialogVisible: false,
				versionList: [],
				listQuery: {
					pageNo: 1,
					pageSize: 10,
					type: '',
					version: ''
				},
				listLoading: false,
				form: {},
				rules: {
					type: [
            { required: true, message: '请选择轴承类型', trigger: 'change' }
          ],
          name: [
            { required: true, message: '请输入国内新型号', trigger: 'blur' }
          ],
          innerDiameter: [
            { trigger: 'blur', validator: validatePositiveNumber }
          ],
          outsideDiameter: [
            { trigger: 'blur', validator: validatePositiveNumber }
          ],
          width: [
            { trigger: 'blur', validator: validatePositiveNumber }
          ],
          weight: [
            { trigger: 'blur', validator: validatePositiveNumber }
          ]
				}
			}
		},
		computed: {
			...mapGetters([
				'bearingType',
				'unitType'
			]),
			dialogTitle () {
				return this.action == 0 ? '添加型号' : '编辑型号'
			}
		},
		created() {
			this.getUtils()
	    this.fetchData()
	  },
		methods: {
			getStr (val) {
				let str = ''
				this.bearingType.forEach(b => {
					if (b.key == val)
						return str = b.value
				})
				return str
			},
			getUnit (val) {
				let str = ''
				this.unitType.forEach(b => {
					if (b.key == val)
						return str = b.value
				})
				return str
			},
			getUtils () {
        list().then(res => {
          this.versionList = res.data.versionList
        })
      },
			getVersion (type) {
        this.listQuery.version = null
        getList({type}).then(res => {
          this.versionList = res.data.items.map(v => {
            return {
              key: v.id,
              value: v.name
            }
          })
        })
      },
			fetchData () {
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
	    hideFn () {
	    	this.dialogVisible = false
	    	this.$refs.form.clearValidate()
	    },
	    showDialog (action, id) {
	    	this.action = action
	    	viewVersion(id).then(res => {
	    		this.form = res.data
	    		this.dialogVisible = true
	    		this.$nextTick(() => {
	    			this.$refs.form.clearValidate('type')
	    		})
	    	})
	    },
	    delFn (id) {
	    	this.$confirm('此操作将永久删除该型号, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
        	delVersion({id}).then(res => {
        		this.$message({
        			message: res.message,
    		      type: 'success',
    		      duration: 3 * 1000
        		})
        		this.fetchData()
        	})
        })
	    },
	    submitFn () {
	    	let fn = this.action == 0 ? addVersion : editVersion
	    	this.$refs.form.validate((valid) => {
          if (valid) {
			    	fn(this.form).then(res => {
			    		this.$message({
			    			message: res.message,
					      type: 'success',
					      duration: 3 * 1000
			    		})
			    		this.fetchData()
			    		this.hideFn()
			    	})
			    }
			  })
	    }
		}
	}
</script>
<style lang="scss">
	
</style>