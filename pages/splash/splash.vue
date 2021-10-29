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
			var token = uni.getStorageSync("token");
			if (token != null) {
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
</style>
