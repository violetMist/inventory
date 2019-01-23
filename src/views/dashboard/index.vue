<template>
  <div class="dashboard-container">
    <div class="dash-total">
      <div class="dash-item item1">
        <div class="img"></div>
        <div class="item-title">{{dateTime}}</div>
        <div class="item-num">{{date}}</div>
      </div>
      <div class="dash-item item2">
        <div class="img"></div>
        <div class="item-title">当前库存</div>
        <div class="item-num">{{merNumber}}</div>
      </div>
      <div class="dash-item item3">
        <div class="img"></div>
        <div class="item-title">库存总数</div>
        <div class="item-num">{{proNumber}}</div>
      </div>
      <div class="dash-item item4">
        <div class="img"></div>
        <div class="item-title">闲置库存</div>
        <div class="item-num">{{proSNumber}}</div>
      </div>
    </div>
    <div class="list-content">
      <div class="list" v-if="!empty">
        <el-table
          v-loading="listLoading"
          :data="list"
          element-loading-text="Loading"
          :height="height"
          border
          fit
          highlight-current-row>
          <el-table-column align="center" label="提醒事项" width="">
            <template slot-scope="scope">
              {{ scope.row.title }}
            </template>
          </el-table-column>
          <el-table-column align="center" label="商户名称" width="">
            <template slot-scope="scope">
              {{ scope.row.merName }}
            </template>
          </el-table-column>
          <el-table-column align="center" label="门面名称" width="">
            <template slot-scope="scope">
              {{ scope.row.locationNumber }}
            </template>
          </el-table-column>
          <el-table-column align="center" label="超期时间" width="">
            <template slot-scope="scope">
              {{ scope.row.endDate }}
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
      </div>
      <div class="empty" v-else>
        <div class="d-bg">
          <div class="d-text">暂无工作提醒哦👈</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getAll } from '@/api/message'
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  data () {
    return {
      listLoading: false,
      empty: false,
      height: 530,
      dateTime: '',
      date: '',
      listQuery: {
        pageNo: 1,
        pageSize: 10
      },
      total: 0,
      merNumber: 0, 
      proNumber: 1,
      proSNumber: 0,
      list: []
    }
  },
  computed: {
    ...mapGetters([
      'name',
      'roles',
      'codeStatus',
      'systemRoles',
      'organType'
    ])
  },
  methods: {
    init () {
      let now = new Date()
      this.dateTime = this.$moment(now).format('YYYY年MM月DD日')
      this.date = this.$moment(now).format('HH:mm')
    },
    fetchData () {
      this.listLoading = true
      getAll(this.listQuery).then(res => {
        this.total = res.data.total
        this.merNumber = res.data.merNumber
        this.proNumber = res.data.proNumber
        this.proSNumber = res.data.proSNumber
        this.list = res.data.list
        this.empty = !res.data.list.length
        this.listLoading = false
      })
    },
    changePage () {
      this.fetchData()
    }
  },
  created () {
    this.fetchData()
  },
  mounted () {
    this.init()
    setInterval(this.init, 1000);
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard {
  &-container {
    width: 100%;
    height: 100%;
    overflow: hidden;
    background: rgba(238, 240, 243, 1);
    .dash-total{
      height: 125px;
      margin: 30px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .img{ width: 85px; height: 85px; margin-left: 20px; display: inline-block; margin-top: 20px; }
    .dash-item{ width: 25%; position: relative; height: 125px; border-radius: 2px; 
      background: #fff; margin-right: 1px;
    }
    .item-title, .item-num{
      position: absolute; 
      right: 30px;
      width: 120px;
    }
    .item-title{
      color: #8c8c8c;
      top: 38px;
    }
    .item-num{
      color: #777;
      top: 64px;
      font-size: 18px;
      font-weight: bold;
    }
    .item1 {
      .img{ background: url(../../../static/images/icon_1.png); }
      &:hover{ .img{ background: url(../../../static/images/icon_1_hover.png); } }
    }
    .item2 {
      .img{ background: url(../../../static/images/icon_2.png); }
      &:hover{ .img{ background: url(../../../static/images/icon_2_hover.png); } }
    }
    .item3 {
      .img{ background: url(../../../static/images/icon_3.png); }
      &:hover{ .img{ background: url(../../../static/images/icon_3_hover.png); } }
    }
    .item4 {
      .img{ background: url(../../../static/images/icon_4.png); }
      &:hover{ .img{ background: url(../../../static/images/icon_4_hover.png); } }
    }
    .item2 .item-num:after{ content: '家'; font-size: 14px; margin-left: 5px;}
    .list-content{ min-height: calc(100vh - 250px); }
    .empty{ height: calc(100vh - 330px); background: #f6f7fb; margin: 30px; 
      border-radius: 2px; box-shadow: 0 0 5px 3px rgba(165, 180, 213, 0.1);
      display: flex; justify-content: center; align-items: center;
    }
    .d-bg{ width: 1200px; height: 420px; background: url(../../../static/images/d-bg.png);
      color: #777; display: flex; justify-content: center; align-items: center;
      font-size: 30px; 
    }
    .d-text{ margin-left: 100px; position: relative;
      &:after{ content: "NO WORK REMINDER!"; position: absolute; bottom: -25px; left: 0;
        font-size: 20px; color: #999;
      }
    }
    .list{ margin: 30px; }
  }
}
</style>
