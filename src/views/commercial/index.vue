<template>
  <div class="app-container">
    <div class="table-tools">    
      <div class="tools-line">
        <div class="label">类型：</div>
        <el-select clearable v-model="listQuery.type" placeholder="请选择商户类型">
          <el-option
            v-for="item in commercialType"
            :key="item.key"
            :label="item.value"
            :value="item.key">
          </el-option>
        </el-select>
      </div>      
      <div class="tools-line">
        <div class="label">商户名称：</div>
        <el-input
          placeholder="请输入商户名称"
          v-model="listQuery.name"
          clearable>
        </el-input>
      </div> 
      <div class="tools-line">
        <el-button type="primary" size="small" plain @click="fetchData">筛选</el-button>
      </div>
    </div>
    <div class="table-btns" v-if="hasPermission(32)" >
      <el-button type="primary" size="small" @click="showDialog(0)">添加</el-button>
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
      <el-table-column align="center" label="商户类型">
        <template slot-scope="scope">
          {{ getStr(scope.row.type) }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="商户名称">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="联系人">
        <template slot-scope="scope">
          {{ scope.row.contacts }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="联系电话">
        <template slot-scope="scope">
          {{ scope.row.phone }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="地址" width="300">
        <template slot-scope="scope">
          {{ scope.row.address }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="入驻时间">
        <template slot-scope="scope">
          {{ getTime(scope.row.enterTime) }}
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="150" align="center">
        <template slot-scope="scope">
          <el-button v-if="hasPermission(33)" @click="showDialog(1, scope.row.id)" type="text" size="small">编辑</el-button>
          <el-button v-if="hasPermission(-1)" @click="delFn(scope.row.id)" type="text" size="small">删除</el-button>
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
      width="540px"
      >
      <el-form class="app-form" ref="form" :model="form" :rules="rules" label-position="left" label-width="100px">
        <el-form-item label="商户类型" prop="type">
          <el-select v-model="form.type"  placeholder="请选择商户类型">
            <el-option
              v-for="item in commercialType"
              :key="item.key"
              :label="item.value"
              :value="item.key">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商户名称" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="联系人" prop="contacts">
          <el-input v-model="form.contacts"></el-input>
        </el-form-item>
        <el-form-item label="联系电话" prop="phone">
          <el-input v-model="form.phone"></el-input>
        </el-form-item>
        <el-form-item label="地址" prop="address">
          <el-input v-model="form.address"></el-input>
        </el-form-item>
        <el-form-item label="入驻时间" prop="enterTime">
          <el-date-picker
            v-model="form.enterTime"
            type="date"
            value-format="timestamp"
            placeholder="请选择入驻时间">
          </el-date-picker>
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
  import { getList, viewCommercial, addCommercial, editCommercial, delCommercial } from '@/api/commercial.js'
  import { mapGetters } from 'vuex'
  import { hasPermission } from '@/utils'
  import { valiadatePhone } from '@/utils/validate'

  export default {
    data() {
      return {
        hasPermission,
        action: 0,
        listQuery: { //查询条件
          pageNo: 1, 
          pageSize: 10,
          name: '', //商户名称
          type: ''//状态
        },
        total: 0,
        list: [],
        listLoading: true,
        dialogVisible: false,
        form: {},
        rules: {
          type: [
            { required: true, message: '请选择商户类型', trigger: 'change' }
          ],
          name: [
            { required: true, message: '请输入商户名称', trigger: 'blur' }
          ],
          contacts: [
            { required: true, message: '请输入联系人', trigger: 'blur' }
          ],
          phone: [
            { required: true, message: '请输入联系电话', trigger: 'blur' },
            { trigger: 'blur', validator: valiadatePhone }
          ],
          address: [
            { required: true, message: '请输入地址', trigger: 'blur' }
          ],
          enterTime: [
            { required: true, message: '请选择入驻时间', trigger: 'change' }
          ]
        }
      }
    },
    computed: {
      ...mapGetters([
        'commercialType'
      ]),
      dialogTitle () {
        return this.action == 0 ? '添加商户' : '编辑商户'
      }
    },
    created() {
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
      getTime (date) {
        if (!date)
          return ''
        return this.$moment(date).format('YYYY-MM-DD')
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
        viewCommercial(id).then(res => {
          this.form = res.data
          this.dialogVisible = true
          this.$nextTick(() => {
            this.$refs.form.clearValidate(['type', 'enterTime'])
          })
        })
      },
      hideFn () {
        this.dialogVisible = false
        this.$refs.form.clearValidate()
      },
      delFn (id) {
        this.$confirm('此操作将永久删除该商户, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          delCommercial({id}).then(res => {
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
        let fn = this.action == 0 ? addCommercial : editCommercial
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

<style type="text/css">

</style>