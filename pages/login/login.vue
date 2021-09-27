<template>
	<view class="container">
		<input placeholder="手机" v-model="form.username" />
		<input placeholder="密码" v-model="form.password" />
		<button @click="login">登录</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				form: {
					username: "",
					password: ""
				}
			}
		},
		methods: {
			login() {
				uni.showLoading({
					mask: true,
					title: '提交中...'
				});
				
				uni.request({
				    url: 'https://www.example.com/request', //仅为示例，并非真实接口地址。
				    data: this.form,
				    header: {
				        'custom-header': 'hello' //自定义请求头信息
				    },
				    success: (res) => {
				        console.log(res.data);
				        this.text = 'request success';
				    },
					complete: () => {
						uni.hideLoading();
					}
				});
			}
		}
	}
</script>

<style>

</style>
