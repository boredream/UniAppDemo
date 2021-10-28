<template>
	<view>
		{{user.username}}
		<button @click="logout">退出登录</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				user: {}
			}
		},
		onLoad() {
			this.getUserInfoFromLocal();
		},
		methods: {
			getUserInfoFromLocal() {
				uni.getStorage({
					key: "user",
					success: (res) => {
						console.log("get user from local = " + JSON.stringify(res));
						this.user = res.data;
					}
				});
			},
			logout() {
				console.log("logout");
				uni.removeStorage({
					key: "user"
				});
				uni.removeStorage({
					key: "token"
				});
				uni.navigateTo({
					url: "../login/login",
				});
			},
		}
	}
</script>

<style>

</style>
