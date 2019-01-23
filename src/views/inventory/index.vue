<template>
  <div class="app-container">
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
        <div class="label">所在仓库：</div>
        <el-select clearable filterable v-model="listQuery.store" placeholder="请选择仓库">
          <el-option
            v-for="item in storeList"
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
  import { getList } from '@/api/inventory.js'

  export default {
    data() {
      return {
        brandList: [],
        versionList: [],
        storeList: [],
        listQuery: { //查询条件
          pageNo: 1, 
          pageSize: 10,
          version: '', //型号
          brand: '',
          store: ''
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
      getUtils () {
        list().then(res => {
          this.brandList = res.data.brandList
          this.versionList = res.data.versionList
          this.storeList = res.data.storeList
        })
      },
      fetchData() {
        this.listLoading = true
        getList(this.listQuery).then(res => {
          this.total = res.data.total
          this.list = res.data.items
          this.listLoading = false
        })
      }
    }
  }
</script>

<style type="text/css">
  
</style>