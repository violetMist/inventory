<template>
  <div class="app-container">
    <div class="table-tools">
    <div class="tools-line">
        <div class="label">买家：</div>
        <el-select clearable filterable v-model="listQuery.commercial" placeholder="请选择买家">
          <el-option
            v-for="item in commercialList"
            :key="item.key"
            :label="item.value"
            :value="item.key">
          </el-option>
        </el-select>
      </div>  
      <div class="tools-line">
        <div class="label">填写人：</div>
        <el-select clearable filterable v-model="listQuery.user" placeholder="请选择商户填写人">
          <el-option
            v-for="item in userList"
            :key="item.key"
            :label="item.value"
            :value="item.key">
          </el-option>
        </el-select>
      </div>
      <div class="tools-line">
        <div class="label">出库时间：</div>
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
    <div class="table-btns">
      <el-button v-if="hasPermission(62)" type="primary" size="small" @click="showDialog(0)">添加</el-button>
      <el-button class="right" type="primary" size="small" @click="goFn">出库订单🔎</el-button>
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
      <el-table-column align="center" label="出库单编号">
        <template slot-scope="scope">
          {{ scope.row.id.toUpperCase() }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="出库时间">
        <template slot-scope="scope">
          {{ getTime(scope.row.outTime) }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="买家">
        <template slot-scope="scope">
          {{ scope.row.commercialName }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="填写人">
        <template slot-scope="scope">
          {{ scope.row.userName }}
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="180" align="center">
        <template slot-scope="scope">
          <el-button @click="showDialog(2, scope.row.id)" type="text" size="small">查看</el-button>
          <el-button v-if="hasPermission(63)" @click="delFn(scope.row.id)" type="text" size="small">删除</el-button>
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
      width="1020px"
      >
      <add v-if="dialogVisible && (action == 0 || action == 1)" :id="id" @getForm="setForm"/>
      <det v-if="dialogVisible && action == 2" :id="id" />
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitFn">确 定</el-button>
        <el-button @click="hideFn">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
  import { list } from '@/api/utils.js'
  import { getList, addSellOrder, delSellOrder } from '@/api/sellOrder.js'
  import { hasPermission } from '@/utils'
  import add from './add.vue'
  import det from './det.vue'

  export default {
    data() {
      return {
        id: '',
        hasPermission,
        commercialList: [],
        userList: [],
        action: 0,
        listQuery: { //查询条件
          pageNo: 1, 
          pageSize: 10,
          commercial: '',
          user: '',
          begin: '',
          end: ''
        },
        total: 0,
        list: [],
        listLoading: true,
        dialogVisible: false,
        show: true
      }
    },
    computed: {
      dialogTitle () {
        if (this.action == 0)
          return '创建出库单'
        else
          return '查看出库单'
      }
    },
    components: {
      add,
      det
    },
    created() {
      this.getUtils()
      this.fetchData()
    },
    methods: {
      goFn () {
        this.$router.push('/store/outStore')
      },
      getTime (date) {
        if (!date)
          return ''
        return this.$moment(date).format('YYYY-MM-DD hh:mm:ss')
      },
      getUtils () {
        list().then(res => {
          this.commercialList = res.data.commercialList
          this.userList = res.data.userList
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
      },
      changePage (val) {
        this.fetchData()
      },
      showDialog (action, id) {  
        this.action = action
        this.id = id || ''
        this.dialogVisible = true
      },
      hideFn () {
        this.dialogVisible = false
      },
      delFn (id) {
        this.$confirm('此操作将永久删除该出库单, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          delSellOrder({id}).then(res => {
            this.$message({
              message: res.message,
              type: 'success',
              duration: 3 * 1000
            })
            this.fetchData()
          })
        })
      },
      setForm (form) {
        this.$refs.form = form
      },
      submitFn () {
        if (this.$refs.form.checkForm()) {
          let req = this.$refs.form.getData()
          addSellOrder(req).then(res => {
            this.$message({
              message: res.message,
              type: 'success',
              duration: 5 * 1000
            })
            this.fetchData()
            this.hideFn()
          })
        } else {
          this.$message({
            message: '订单中有错误信息，请校验后再提交',
            type: 'error',
            duration: 3 * 1000
          })
        }
      }
    }
  }
</script>

<style type="text/css">
  .right{ 
    float: right;
  }
</style>