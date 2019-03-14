<template>
  <div class="app-container">
    <div class="table-btns">
      <el-button class="go-back" type="primary" size="small" @click="goFn">返回</el-button>
    </div>
    <div class="table-tools">    
      <div class="tools-line">
        <div class="label">轴承型号：</div>
        <el-select clearable filterable v-model="listQuery.version" placeholder="请选择商户型号">
          <el-option
            v-for="item in versionList"
            :key="item.key"
            :label="item.value"
            :value="item.key">
          </el-option>
        </el-select>
      </div>
      <div class="tools-line">
        <div class="label">品牌：</div>
        <el-select clearable filterable v-model="listQuery.brand" placeholder="请选择商户品牌">
          <el-option
            v-for="item in brandList"
            :key="item.key"
            :label="item.value"
            :value="item.key">
          </el-option>
        </el-select>
      </div>
      <div class="tools-line">
        <div class="label">供应商：</div>
        <el-select clearable filterable v-model="listQuery.commercial" placeholder="请选择商户供应商">
          <el-option
            v-for="item in commercialList"
            :key="item.key"
            :label="item.value"
            :value="item.key">
          </el-option>
        </el-select>
      </div>
      <div class="tools-line">
        <div class="label">收货人：</div>
        <el-select clearable filterable v-model="listQuery.user" placeholder="请选择商户收货人">
          <el-option
            v-for="item in userList"
            :key="item.key"
            :label="item.value"
            :value="item.key">
          </el-option>
        </el-select>
      </div>
      <br/>
      <div class="tools-line">
        <div class="label">入库时间：</div>
        <el-date-picker
          v-model="listQuery.begin"
          type="date"
          value-format="timestamp"
          placeholder="请选择开始时间">
        </el-date-picker>
        -
        <el-date-picker
          v-model="listQuery.end"
          type="date"
          value-format="timestamp"
          placeholder="请选择结束时间">
        </el-date-picker>
      </div>
      <div class="tools-line">
        <el-button type="primary" size="small" plain @click="fetchData">筛选</el-button>
      </div>
    </div>
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row>
      <el-table-column align="center" label="序号" width="55">
        <template slot-scope="scope">
          {{ (listQuery.pageNo - 1) * listQuery.pageSize + scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="入库详情编号" width="240">
        <template slot-scope="scope">
          {{ scope.row.id.toUpperCase() }}
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
      <el-table-column align="center" label="供应商" width="300">
        <template slot-scope="scope">
          {{ scope.row.commercialName }}
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
      <el-table-column align="center" label="所在仓库">
        <template slot-scope="scope">
          {{ scope.row.storeName }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="收货人">
        <template slot-scope="scope">
          {{ scope.row.userName }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="入库时间" width="160">
        <template slot-scope="scope">
          {{ getTime(scope.row.inTime) }}
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      @current-change="fetchData"
      :current-page.sync="listQuery.pageNo"
      :page-size="listQuery.pageSize"
      layout="total, prev, pager, next"
      :total="total">
    </el-pagination>
  </div>
</template>
<script>
  import { list } from '@/api/utils.js'
  import { getList } from '@/api/inStore.js'

  export default {
    data() {
      return {
        userList: [],
        brandList: [],
        versionList: [],
        commercialList: [],
        storeList: [],
        action: 0,
        listQuery: { //查询条件
          pageNo: 1, 
          pageSize: 10,
          version: '', //型号
          brand: '',
          commercial: '',
          user: '',
          begin: '',
          end: ''
        },
        total: 0,
        list: [],
        listLoading: true
      }
    },
    created() {
      this.getUtils()
      this.fetchData()
    },
    methods: {
      goFn () {
        this.$router.push('/store/payOrder')
      },
      getTime (date) {
        if (!date)
          return ''
        return this.$moment(date).format('YYYY-MM-DD HH:mm:ss')
      },
      getUtils () {
        list().then(res => {
          this.userList = res.data.userList
          this.brandList = res.data.brandList
          this.versionList = res.data.versionList
          this.commercialList = res.data.commercialList
          this.storeList = res.data.storeList
        })
      },
      fetchData() {
        this.listLoading = true
        getList(Object.assign({}, this.listQuery, {
          end: this.listQuery.end ? this.listQuery.end + 24*60*60*1000 : ''
        })).then(res => {
          this.total = res.data.total
          this.list = res.data.items
          this.listLoading = false
        })
      }
    }
  }
</script>

<style type="text/css">
  .go-back{
    float: right;
  }
</style>