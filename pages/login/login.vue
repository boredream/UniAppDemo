<template>
	<view>
		<view class="container">
			<input placeholder="手机" v-model="form.username" />
			<input placeholder="密码" v-model="form.password" />
			<button @click="login">登录</button>
		</view>
		<!-- #ifdef MP-WEIXIN -->
		<button class="sys_btn" open-type="getUserInfo" lang="zh_CN" @getuserinfo="appLoginWx">
			小程序授权登录
		</button>
		<!-- #endif -->
	</view>
</template>

<script>
	import request from "../../utils/request_util.js";
	export default {
		data() {
			return {
				form: {},
			};
		},
		onLoad(option) {
			// 自动登录
			if (uni.getStorageSync("token") != null) {
				this.getUserInfo();
			}
		},
		methods: {
			route2main() {
				uni.switchTab({
					url: "../todolist/todolist",
				});
			},
			getUserInfo() {
				request.get("user/info", (res) => {
					console.log("auto login success");
					uni.setStorage({
						key: "user",
						data: res
					});
					this.route2main();
				});
			},
			login() {
				request.post("user/login", this.form, (token) => {
					console.log("wx login success = " + token);
					uni.setStorageSync("token", token);
					this.getUserInfo();
				});
			},
			appLoginWx() {
				// #ifdef MP-WEIXIN
				// step1. 检测手机上是否安装微信
				console.log("step1. 检测手机上是否安装微信");
				uni.getProvider({
					service: 'oauth',
					success: (res) => {
						if (~res.provider.indexOf('weixin')) {
							// step2. wx授权登录，获取code
							console.log("step2. wx授权登录，获取code");
							uni.login({
								provider: 'weixin',
								success: (authCode) => {
									// step3. 通过code获取微信openId，并完成登录/注册，最终生成token
									console.log("step3. 通过code获取微信openId，并完成登录/注册，最终生成token " + authCode);
									request.post("user/wxlogin", authCode, (token) => {
										console.log("wx login success = " + token);
										uni.setStorageSync("token", token);
										// step4. 获取用户信息，完成登录流程，跳转页面
										this.getUserInfo();
									});
								},
								fail: () => {
									uni.showToast({
										title: "微信登录授权失败",
										icon: "none"
									});
								}
							});
						} else {
							uni.showToast({
								title: '请先安装微信或升级版本'
							});
						}
					}
				});
				//#endif
			},
		}
	}
</script>

<style>
	.header {
		margin: 90rpx 0 90rpx 50rpx;
		border-bottom: 1px solid #ccc;
		text-align: center;
		width: 650rpx;
		height: 300rpx;
		line-height: 450rpx;
	}

	.header image {
		width: 200rpx;
		height: 200rpx;
	}

	.content {
		margin-left: 50rpx;
		margin-bottom: 90rpx;
	}

	.content text {
		display: block;
		color: #9d9d9d;
		margin-top: 40rpx;
	}

	.bottom {
		border-radius: 80rpx;
		margin: 70rpx 50rpx;
		font-size: 35rpx;
	}
</style>
