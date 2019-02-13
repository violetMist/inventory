<template>
	<div class="order-container">
		<div class="common">
			<div class="com">
				<label>商户名称：</label>
				<span>{{name}}</span>	
			</div>
      <div class="com">
        <label>商户类型：</label>
        <span>{{getStr(type)}}</span> 
      </div>
      <div class="com">
        <label>地址：</label>
        <span>{{address}}</span> 
      </div>
			<div class="com">
				<label>入驻时间：</label>
				<span>{{enterTime}}</span>	
			</div>
		</div>
		<el-table
      :data="list"
      border
      fit
      highlight-current-row>
      <el-table-column align="center" label="联系人">
        <template slot-scope="scope">
          {{ scope.row.contacts }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="电话">
        <template slot-scope="scope">
          {{ scope.row.phone }}
        </template>
      </el-table-column>
    </el-table>
	</div>
</template>
<script>
	import { viewCommercial } from '@/api/commercial.js'
	import { mapGetters } from 'vuex'

	export default {
    props: {
      id: String
    },
		data () {
			return {
        type: '',
      	name: '',
      	address: '',
      	enterTime: '',
        list: []
			}
		},
		computed: {
      ...mapGetters([
        'commercialType'
      ])
    },
		created () {
			this.fetchData()
		},
		methods: {
			getStr (val) {
        let str = ''
        this.commercialType.forEach(b => {
          if (b.key == val)
            return str = b.value
        })
        return str
      },
      fetchData () {
      	viewCommercial(this.id).then(res => {
          this.type = res.data.type
          this.name = res.data.name
      		this.address = res.data.address
      		this.enterTime = this.$moment(res.data.enterTime).format('YYYY-MM-DD')
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