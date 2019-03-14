<template>
	<div class="sell-order-container">
		<div class="common">
      <div class="com first">
        <label>买家：</label>
        <span>{{commercialName}}</span>  
      </div>
			<div class="com">
				<label>出库时间：</label>
				<span>{{outTime}}</span>	
			</div>
			<div class="com">
				<label>发货人：</label>
				<span>{{userName}}</span>	
			</div>
      <el-button :loading="downloadLoading" style="margin-top: 10px;" type="primary" size="small" @click="handleDownload">导出Excel</el-button>
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
      <el-table-column align="center" label="仓库">
        <template slot-scope="scope">
          {{ scope.row.storeName }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="数量">
        <template slot-scope="scope">
          {{ scope.row.number }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="单价">
        <template slot-scope="scope">
          {{ scope.row.price }}
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
	import { viewSellOrder } from '@/api/sellOrder.js'

	export default {
    props: {
      id: String
    },
		data () {
			return {
        downloadLoading: false,
        filename: '',
        autoWidth: true,
        bookType: 'xlsx',
        commercialName: '',
				userName: '',
				outTime: '',
        list: []
			}
		},
		created () {
			this.fetchData()
		},
		methods: {
      fetchData () {
      	viewSellOrder(this.id).then(res => {
      		this.userName = res.data.userName
          this.commercialName = res.data.commercialName
      		this.outTime = this.$moment(res.data.outTime).format('YYYY-MM-DD HH:mm:ss')
      		this.list = res.data.list
      	})
      },
      handleDownload() {
        this.downloadLoading = true
        import('@/vendor/Export2Excel').then(excel => {
          const tHeader = ['编号', '型号', '品牌', '数量', '仓库']
          const filterVal = ['id', 'versionName', 'brandName', 'number', 'storeName']
          const list = this.list
          const data = this.formatJson(filterVal, list)
          excel.export_json_to_excel({
            header: tHeader,
            data,
            filename: '出库单-' + this.commercialName + '-' + this.outTime,
            autoWidth: this.autoWidth,
            bookType: this.bookType
          })
          this.downloadLoading = false
        })
      },
      formatJson(filterVal, jsonData) {
        return jsonData.map(v => filterVal.map(j => {
          if (j === 'timestamp') {
            return this.$moment(v[j]).format('YYYY-MM-DD HH:mm:ss')
          } else {
            return v[j]
          }
        }))
      }
		}
	}
</script>
<style lang="scss">
	.sell-order-container{
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
			width: 280px;
		}
    .first{
      width: 360px;
    }
		label{
			display: inline-block;
			width: 80px;
		}
		.order-header{
			margin: 10px 0;
		}
	}
</style>