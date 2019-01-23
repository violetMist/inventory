<template>
	<div class="filter-table">
		<div class="table-tools">
			<div class="label">门面编号：</div>      
			<el-cascader :options="propertyList" v-model="listQuery.locationNumber" separator="-" change-on-select>
			</el-cascader>
			<br/>
			<br/>
			<div class="label">商户名称：</div>
			<el-input
			  placeholder="请输入商户名称"
			  v-model="listQuery.merName"
			  clearable>
			</el-input>
			<el-button type="primary" size="small" plain @click="fetchData">筛选</el-button>
		</div>
		<div class="table-content">
			<el-table
			  v-loading="listLoading"
			  :data="list"
			  element-loading-text="Loading"
			  :height="height"
			  @row-click="clickFn"
			  border
			  fit
			  highlight-current-row>
			  <el-table-column align="center" label="门面名称" width="120">
			    <template slot-scope="scope">
			      {{ scope.row.locationNumber }}
			    </template>
			  </el-table-column>
			  <el-table-column align="center" label="商户名称" width="179">
			    <template slot-scope="scope">
			      {{ scope.row.currentMer }}
			    </template>
			  </el-table-column>
			</el-table>
		</div>
	</div>
</template>
<script>
	import { mapGetters } from 'vuex'
	import { getList } from '@/api/property'

	export default {
		data () {
			return {
				listQuery: { //查询条件
	    		pageNo: 1, 
	    		pageSize: 1000,
	    		merName: '', //商户名称
	    		status: 1, //状态
	    		locationNumber: []//门面编号
	    	},
	    	height: 200,
	    	list: [],
	      listLoading: true
			}
		},
		computed: {
			...mapGetters([
	      'propertyList',
	      'rentalStatus',
	      'payCycle'
	    ])
		},
		created() {
	    this.fetchData()
	  },
	  methods: {
	  	resizeFn () {
	  		this.height = document.body.clientHeight - 370
	  	},
	  	fetchData() {
	      this.listLoading = true
	      getList(Object.assign({}, this.listQuery, {
	      	locationNumber: this.listQuery.locationNumber.join('-')
	      })).then(res => {
	        this.list = res.data.items
	        this.listLoading = false
	      })
	    },
	    clickFn (row) {
	    	if (row.status == 0)
	    		return this.$message({
			      message: '所选门面没有合同信息，不能创建缴费单',
			      type: 'error',
			      duration: 3 * 1000
			    })
	    	this.$emit('getSelect', row)
	    }
	  },
	  mounted () {
	  	window.onresize = this.resizeFn
	  	setTimeout(() => {
	  		this.resizeFn()
	  	}, 0);
	  }
	}
</script>
<style lang="scss">
	.filter-table{
		width: 340px;
		height: 100%;
		padding: 20px;
		float: left;
		.table-tools{ 
			height: 180px; 
			position: relative;
		}
		.el-button{
			position: absolute; 
			right: 16px;
			bottom: 13px;
		}
		.el-table__body-wrapper {
			cursor: pointer;
		}
	}
</style>