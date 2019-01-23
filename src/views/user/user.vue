<template>
	<el-form ref="form" :model="form" :rules="rules" label-width="80px" label-position="left" class="app-form">
	  <el-form-item label="姓名" prop="name">
	    <el-input v-model="form.name" :disabled="disable"></el-input>
	  </el-form-item>
	  <el-form-item label="手机" prop="phone">
	    <el-input v-model="form.phone" :disabled="disable"></el-input>
	  </el-form-item>
	  <el-form-item label="登录账号" prop="account">
	    <el-input v-model="form.account" :disabled="action != 0"></el-input>
	  </el-form-item>
	  <el-form-item label="登录密码" prop="password">
	    <el-input v-model="form.password" :disabled="disable"></el-input>
	  </el-form-item>
	  <div class="set-role" v-if="hasPermission(-1)">
	  	{{ disable ? '用户权限' : '权限设置' }}
	  </div>
	  <el-tree
      ref="tree"
      :data="rolesList"
      :props="defaultProps"
      show-checkbox
      accordion
      node-key="id"
      :default-checked-keys="form.roles"
      @check-change="handleCheckChange"
      class="role-tree"
      v-if="hasPermission(-1) && !disable"
    />
    <span class="role-item" v-if="hasPermission(-1) && disable" v-for="role of form.userRoles">{{role.label}}</span>
	</el-form>
</template>
<script>
	import { mapGetters } from 'vuex'
	import { valiadatePhone } from '@/utils/validate'
	import { hasPermission } from '@/utils'

	export default {
		props: {
			form: {
				type: Object,
				default () {
					return {}
				}
			},
			action: Number
		},
		data () {
			return {
				hasPermission,
				defaultProps: {
				  children: 'roles',
				  label: 'label'
				},
				rules: {
					name: [
            { required: true, message: '请输入名字', trigger: 'change' }
          ],
          phone: [
            { required: true, message: '请输入手机号', trigger: 'change' },
            { trigger: 'blur', validator: valiadatePhone }
          ],
          account: [
            { required: true, message: '请输入账号', trigger: 'change' }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'change' }
          ]
				}
			}
		},
		computed: {
			...mapGetters([
				'systemRoles'
			]),
			disable () {
				return this.action == 2
			},
			rolesList () {
				if (this.action > -1)
				 return _.cloneDeep(this.systemRoles)
			}
		},
		methods: {
			handleCheckChange () {
				this.$emit('setRoles', this.$refs.tree.getCheckedKeys())
			}
		},
		mounted () {
			this.$emit('setForm', this.$refs.form)
		}
	}
</script>
<style lang="scss">
	.set-role{
		margin: 20px 0; font-weight: bold; color: #606266;
	}
	.role-item{ display: inline-block; margin: 10px; width: 90px; }
</style>