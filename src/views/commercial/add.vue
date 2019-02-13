<template>
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
	  <el-tabs v-model="editableTabsValue" type="card" editable @edit="handleTabsEdit">
		  <el-tab-pane
		    :key="item.name"
		    v-for="(item, index) in editableTabs"
		    :label="item.title"
		    :name="item.name"
		  >
		  	<el-form class="add-form" :ref="'form'+item.name" :inline="true" :model="item.form" :rules="rules1" label-position="left" label-width="100px">
			    <el-form-item label="联系人" prop="contacts">
			      <el-input v-model="item.form.contacts"></el-input>
			    </el-form-item>
          <el-form-item label="电话" prop="phone">
            <el-input v-model="item.form.phone"></el-input>
          </el-form-item>
		  	</el-form>
		  </el-tab-pane>
		</el-tabs>
	</el-form>
</template>
<script>
	import { viewCommercial } from '@/api/commercial.js'
	import { validateNumber } from '@/utils/validate'
	import { mapGetters } from 'vuex'

	export default {
    props: {
      id: String
    },
		data () {
			return {
        editableTabsValue: '1',
        tabIndex: 1,
        form: {
        	type: '',
        	name: '',
        	address: '',
        	enterTime: ''
        },
        editableTabs: [],
				rules: {
          type: [
            { required: true, message: '请选择商户类型', trigger: 'change' }
          ],
          name: [
            { required: true, message: '请输入商户名称', trigger: 'blur' }
          ],
          address: [
            { required: true, message: '请输入地址', trigger: 'blur' }
          ],
          enterTime: [
            { required: true, message: '请选择入驻时间', trigger: 'change' }
          ]
        },
        rules1: {
        	contacts: [
            { required: true, message: '请输入联系人', trigger: 'blur' }
          ],
          phone: [
            { required: true, message: '请输入联系电话', trigger: 'blur' },
            { trigger: 'blur', validator: validateNumber }
          ]
        }
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
      fetchData () {
      	viewCommercial(this.id).then(res => {
          this.form.id = res.data.id || ''
          this.form.type = res.data.type
          this.form.name = res.data.name
      		this.form.address = res.data.address
          this.form.enterTime = res.data.enterTime
          this.editableTabsValue = res.data.list.length + ''
          this.tabIndex = res.data.list.length
          this.editableTabs = res.data.list.map((r, idx) => {
            return {
              title: 'Tab' + (idx + 1),
              name: idx + 1 + '',
              form: r
            }
          })
      		this.$nextTick(() => {
      			this.$refs.form.clearValidate()
      		})
      	})
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
      getData() {
      	return Object.assign({}, this.form, {
      		list: this.editableTabs.map(r => r.form)
      	})
      },
      handleTabsEdit(targetName, action) {
        if (action === 'add') {
          let newTabName = ++this.tabIndex + ''
          viewCommercial().then(res => {
          	this.editableTabs.push({
	            title: 'New Tab',
	            name: newTabName,
	            form: res.data.list[0]
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
	
</style>