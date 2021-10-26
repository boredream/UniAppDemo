<template>
	<view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		onLoad() {
			this.getUserInfo();
		},
		methods: {
			getUserInfo() {
				request.get("user/info", (res) => {
					console.log("auto login success");
					uni.getStorage({
						key: "user",
						success:(res) => {
							console.log("user = " + res);
						}
					});
					this.route2main();
				});
			},
		}
	}
</script>

<style>

</style>
