<template>
	<div class="order-container">
		<div class="common">
			<div class="com">
				<label>入库时间：</label>
				<span>{{inTime}}</span>	
			</div>
      <div class="com">
        <label>供应商：</label>
        <span>{{commercialName}}</span> 
      </div>
      <div class="com">
        <label>仓库：</label>
        <span>{{storeName}}</span> 
      </div>
			<div class="com">
				<label>填写人：</label>
				<span>{{userName}}</span>	
			</div>
		</div>
		<el-table
      :data="list"
      border
      fit
      highlight-current-row>
      <el-table-column align="center" label="🔎编号" width="230">
        <template slot-scope="scope">
          {{scope.row.id.toUpperCase()}}
        </template>
      </el-table-column>
      <el-table-column align="center" label="型号">
        <template slot-scope="scope">
          {{ scope.row.versionName }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="品牌">
        <template slot-scope="scope">
          {{ scope.row.brandName }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="单价">
        <template slot-scope="scope">
          {{ scope.row.price }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="数量">
        <template slot-scope="scope">
          {{ scope.row.number }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="金额">
        <template slot-scope="scope">
          {{ scope.row.total }}
        </template>
      </el-table-column>
    </el-table>
	</div>
</template>
<script>
	import { list } from '@/api/utils.js'
	import { viewPayOrder } from '@/api/payOrder.js'

	export default {
    props: {
      id: String
    },
		data () {
			return {
        storeName: '',
        commercialName: '',
				userName: '',
				inTime: '',
        list: []
			}
		},
		created () {
			this.fetchData()
		},
		methods: {
      fetchData () {
      	viewPayOrder(this.id).then(res => {
          this.userName = res.data.userName
          this.storeName = res.data.storeName
      		this.commercialName = res.data.commercialName
      		this.inTime = this.$moment(res.data.inTime).format('YYYY-MM-DD HH:mm:ss')
      		this.list = res.data.list
      	})
      }
		}
	}
</script>
<style lang="scss">
	.order-container{
		padding: 0 20px;
		.common{
			margin-bottom: 20px;
		}
		.order-item{
			border: 1px solid #dedede;
			border-radius: 4px;
			padding: 10px;
		}
		.com{
			display: inline-block;
			margin: 10px 0;
			width: 450px;
		}
		label{
			display: inline-block;
			width: 100px;
		}
		.order-header{
			margin: 10px 0;
		}
	}
</style>