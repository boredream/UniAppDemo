<template>
	<view>
		加载中...
	</view>
</template>

<script>
	import request from "../../utils/request_util.js";
	export default {
		data() {
			return {

			};
		},
		onLoad(option) {
			// 自动登录
			if (uni.getStorageSync("token").data != null) {
				this.getUserInfo();
			} else {
				this.route2login();
			}
		},
		methods: {
			route2login() {
				uni.navigateTo({
					url: "../login/login",
				});
			},
			route2main() {
				uni.switchTab({
					url: "../todolist/todolist",
				});
			},
			getUserInfo() {
				request.get("user/info", (res) => {
					console.log("auto login success " + JSON.stringify(res));
					uni.setStorage({
						key: "user",
						data: res
					});
					this.route2main();
				});
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
