<template>
	<el-form class="app-form" ref="form" :inline="true" :model="form" :rules="rules" label-position="left" label-width="100px">
		<el-form-item label="入库时间" prop="inTime">
	    <el-date-picker
	      v-model="form.inTime"
	      type="datetime"
	      value-format="timestamp"
	      placeholder="请选择入库时间">
	    </el-date-picker>
	  </el-form-item>
	  <el-form-item label="供应商" prop="commercial">
	    <el-select v-model="form.commercial" filterable placeholder="请选择供应商">
	      <el-option
	        v-for="item in commercialList"
	        :key="item.key"
	        :label="item.value"
	        :value="item.key">
	      </el-option>
	    </el-select>
	  </el-form-item>
    <el-form-item label="仓库" prop="store">
      <el-select v-model="form.store" filterable placeholder="请选择仓库" @change="changeStore">
        <el-option
          v-for="item in storeList"
          :key="item.key"
          :label="item.value"
          :value="item.key">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="填写人" prop="user">
      <el-select v-model="form.user" filterable placeholder="请选择填写人">
        <el-option
          v-for="item in userList"
          :key="item.key"
          :label="item.value"
          :value="item.key">
        </el-option>
      </el-select>
    </el-form-item>
		<el-tabs v-model="editableTabsValue" type="card" editable @edit="handleTabsEdit">
		  <el-tab-pane
		    :key="item.name"
		    v-for="(item, index) in editableTabs"
		    :label="item.title"
		    :name="item.name"
		  >
		  	<el-form class="add-form" :ref="'form'+item.name" :inline="true" :model="item.form" :rules="rules1" label-position="left" label-width="100px">
          <div class="order-id" v-if="item.form.id">
            <label>🔎编号: </label>
            {{item.form.id.toUpperCase()}}
          </div>
			    <el-form-item label="型号" prop="version">
			      <el-select v-model="item.form.version" filterable placeholder="请选择型号" @change="changeFn(item.form)">
			        <el-option
			          v-for="item in versionList"
			          :key="item.key"
			          :label="item.value"
			          :value="item.key">
			        </el-option>
			      </el-select>
			    </el-form-item>
			    <el-form-item label="品牌" prop="brand">
			      <el-select v-model="item.form.brand" filterable placeholder="请选择品牌" @change="changeFn(item.form)">
			        <el-option
			          v-for="item in brandList"
			          :key="item.key"
			          :label="item.value"
			          :value="item.key">
			        </el-option>
			      </el-select>
			    </el-form-item>
			    <el-form-item label="数量" prop="number">
			      <el-input v-model="item.form.number" @change="blurFn(item.form)"></el-input>
			    </el-form-item>
          <el-form-item label="单价" prop="price">
            <el-input v-model="item.form.price" @change="blurFn(item.form)"></el-input>
          </el-form-item>
          <el-form-item label="库存数量">
            <div class="in-pay">{{item.form.stock}}</div>
          </el-form-item>
			    <el-form-item label="应付金额">
			      <div class="in-pay">{{item.form.total}}</div>
			    </el-form-item>
		  	</el-form>
		  </el-tab-pane>
		</el-tabs>

	</el-form>
</template>
<script>
	import { list } from '@/api/utils.js'
	import { viewPayOrder } from '@/api/payOrder.js'
  import { getNumber } from '@/api/inventory.js'
	import { validateInteger, validatePositiveNumber } from '@/utils/validate'

	export default {
    props: {
      id: String
    },
		data () {
			return {
				userList: [],
        brandList: [],
        versionList: [],
        commercialList: [],
        storeList: [],
        editableTabsValue: '1',
        tabIndex: 1,
        form: {
        	user: '',
          commercial: '',
          store: '',
        	inTime: ''
        },
        editableTabs: [],
				rules: {
					commercial: [
            { required: true, message: '请选择供应商', trigger: 'change' }
          ],
          store: [
            { required: true, message: '请选择仓库', trigger: 'change' }
          ],
          user: [
            { required: true, message: '请选择填写人', trigger: 'change' }
          ],
          inTime: [
            { required: true, message: '请选择入库时间', trigger: 'change' }
          ]
        },
        rules1: {
        	version: [
        	  { required: true, message: '请选择型号', trigger: 'change' }
        	],
        	brand: [
        	  { required: true, message: '请选择品牌', trigger: 'change' }
        	],
        	commercial: [
        	  { required: true, message: '请选择供应商', trigger: 'change' }
        	],
        	store: [
        	  { required: true, message: '请选择仓库', trigger: 'change' }
        	],
        	price: [
        	  { trigger: 'blur', validator: validatePositiveNumber }
        	],
        	number: [
        	  { required: true, message: '请输入数量', trigger: 'blur' },
        	  { trigger: 'blur', validator: validateInteger }
        	]
        }
			}
		},
		created () {
			this.getUtils()
			this.fetchData()
		},
		methods: {
			getUtils () {
        list().then(res => {
          this.userList = res.data.userList
          this.brandList = res.data.brandList
          this.versionList = res.data.versionList
          this.commercialList = res.data.commercialList
          this.storeList = res.data.storeList
        })
      },
      fetchData () {
      	viewPayOrder(this.id).then(res => {
          this.form.id = res.data.id || ''
          this.form.user = res.data.user
          this.form.commercial = res.data.commercial
      		this.form.store = res.data.store
          this.form.inTime = res.data.inTime
          this.editableTabsValue = res.data.list.length + ''
          this.tabIndex = res.data.list.length
          this.editableTabs = res.data.list.map((r, idx) => {
            return {
              title: 'Tab' + (idx + 1),
              name: idx + 1 + '',
              form: Object.assign({}, r, {
                stock: 0
              })
            }
          })
      		this.$nextTick(() => {
      			this.$refs.form.clearValidate()
      		})
      	})
      },
      blurFn (form) {
      	let n = form.number * form.price
        if (_.isNaN(n))
          return form.total = 0
        return form.total = n.toFixed(2)
      },
      checkForm () {
      	let isOK = false
      	this.$refs.form.validate(valid => {
      		if (valid)
      			return isOK = true
      		return isOK = false
      	})
      	if (!isOK)
      		return isOK
      	this.editableTabs.forEach((r, idx) => {
      		if (idx > 0 && !isOK)
      			return
      		this.$refs['form'+r.name][0].validate(valid => {
      			if (valid)
      				return isOK = true
      			return isOK = false
      		})
      	})
      	return isOK
      },
      changeFn (form) {
        if (this.form.store && form.version && form.brand)
          getNumber({
            store: this.form.store,
            version: form.version,
            brand: form.brand
          }).then(res => {
            form.stock = res.data.stock
          })
      },
      changeStore (val) {
        let currentForm = this.editableTabs[this.editableTabsValue - 1].form
        this.changeFn(currentForm)
      },
      getData() {
      	return Object.assign({}, this.form, {
      		list: this.editableTabs.map(r => r.form)
      	})
      },
      handleTabsEdit(targetName, action) {
        if (action === 'add') {
          let newTabName = ++this.tabIndex + ''
          viewPayOrder().then(res => {
          	this.editableTabs.push({
	            title: 'New Tab',
	            name: newTabName,
	            form: Object.assign({}, res.data.list[0], {
                stock: 0
              })
	          });
          	this.editableTabsValue = newTabName
	      	})  
        }
        if (action === 'remove') {
          let tabs = this.editableTabs
          let activeName = this.editableTabsValue
          if (activeName === targetName) {
            tabs.forEach((tab, index) => {
              if (tab.name === targetName) {
                let nextTab = tabs[index + 1] || tabs[index - 1]
                if (nextTab) {
                  activeName = nextTab.name
                }
              }
            })
          } 
          this.editableTabsValue = activeName
          this.editableTabs = tabs.filter(tab => tab.name !== targetName)
        }
      }
		},
		mounted () {
			this.$emit('getForm', this)
		}
	}
</script>
<style lang="scss">
	.in-pay{ 
    display: inline-block; 
    width: 350px;
  }
  .add-form{
  	margin-top: 15px;
  }
  .app-form{
    .el-tabs{ min-height: 200px; }
  }
  .order-id{
    margin: 20px 0 25px;
    label{ display: inline-block; width: 100px; }
  }
</style>