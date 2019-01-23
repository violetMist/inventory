<template>
	<div class="detail-view">
		<slot name="contract"></slot>
		<div class="form-view">
			<slot name="form"></slot>
		</div>
		<slot></slot>
	</div>
</template>
<script>
	import { } from 'vuex'
	export default {
		data () {
			return {}
		}
	}
</script>
<style lang="scss">
	.full-view{ margin-left: 20px !important;}
	.detail-view{
		padding: 20px 20px 20px 0;
		margin-left: 340px;
		overflow: hidden;
		.contract-view{
			background: #eceff3;
			padding: 10px 5px;
		}
		.tools-line, .label {
		  display: inline-block; 
		  color: #303133;
		  font-size: 14px;
		}
		.tools-line{
			width: 340px;
			margin: 5px 10px;
		}
		.form-view .el-form {
			background: #f9f9f9;
			padding: 20px;
		}
		.el-form-item{
			width: 500px;
		}
		.el-textarea{
			width: 350px;
		}
		.button-label{
			position: relative;
			.el-button{
				position: absolute;
				right: 0px;
				bottom: -55px;
			}
		}
		h4{ margin-left: 5px; }
	}
</style>