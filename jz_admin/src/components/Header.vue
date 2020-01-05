<template>
	
	<mt-header v-bind:title="pageTitle" fixed v-show="!hideHeader">
	<mt-button v-on:click="onBackClicked" v-show="showBack" icon="back" slot="left">返回</mt-button>
	<!-- <mt-button icon="more" slot="right"></mt-button> -->
	</mt-header>
	
</template>

<script>





export default {

	methods:{
		onBackClicked:function () {
			this.$router.go(-1);
		}
	},

	/* 
		双向数据绑定
		监听定义属性 响应式更改
	*/
	computed: {
		pageTitle: function(){
			return this.$route.meta.title;
		},
		hideHeader: function(){
			return this.$route.meta.hideHeader;
		},
		showBack: function(){
			return this.$route.meta.showBack;
		}
	},
 
	// html 载入完成后执行
	mounted () {
		document.title = this.$route.meta.title;
	}

}

</script>