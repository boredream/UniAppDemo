<template>
	<view>
		<!-- #ifdef MP-WEIXIN -->
		<button class="sys_btn" open-type="getUserInfo" lang="zh_CN" @getuserinfo="appLoginWx">小程序登录授权</button>
		<!-- #endif -->
	</view>
</template>

<script>
	import authUtil from "../../utils/auth_util.js";
	export default {
		data() {
			return {
				SessionKey: '',
				OpenId: '',
				nickName: null,
				avatarUrl: null,
				isCanUse: uni.getStorageSync('isCanUse') || true //默认为true
			};
		},
		methods: {
			appLoginWx() {
				// #ifdef MP-WEIXIN
				// 检测手机上是否安装微信
				uni.getProvider({
					service: 'oauth',
					success: function(res) {
						if (~res.provider.indexOf('weixin')) {
							// 授权登录
							uni.login({
								provider: 'weixin',
								success: (authRes) => {
									// 获取用户信息
									authUtil.wxLogin(authRes);

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
			}

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
