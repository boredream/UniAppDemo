<template>
	<view>
		<radio-group @change="radioChange">
			<radio v-for="item in typeList" :value="item" :checked="item == curType">{{item}}</radio>
		</radio-group>

		<view @click="toDetail(item)" style="padding: 5px;" v-for="item in list">
			<view>{{item.name}}</view>
			<view>{{item.detail}}</view>
		</view>
		<button @click="add" style="position: absolute; bottom: 16px; right: 16px;">
			新增
		</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				typeList: [
					"美食",
					"看剧",
					"出游",
					"宅家",
					"其它",
				],
				curType: "",
				list: []
			};
		},
		onLoad() {
			this.curType = this.typeList[0];
			this.loadData();
		},
		methods: {
			add() {
				uni.navigateTo({
					url: "../tododetail/tododetail",
				})
			},
			toDetail(item) {
				uni.navigateTo({
					url: "../tododetail/tododetail?data=" + encodeURIComponent(JSON.stringify(item)),
				})
			},
			radioChange(item) {
				this.curType = item.detail.value;
				this.loadData();
			},
			loadData() {
				uni.showLoading();
				uni.request({
					url: "http://localhost:8080/todo/page?size=20&page=1&type=" + this.curType,
					success: (res) => {
						this.list = res.data.data.records;
					},
					fail: (error) => {
						console.log(error);
					},
					complete: () => {
						console.log("complete");
						uni.hideLoading();
					}
				})
			}
		},
		/**
		 * 下拉刷新回调函数
		 */
		onPullDownRefresh() {
			this.list = ['java', '测试', '前端', 'UI', '大数据']
			setTimeout(() => {
				uni.stopPullDownRefresh()
			}, 2000);
		},
		/**
		 * 上拉加载回调函数
		 */
		onReachBottom() {}
	};
</script>

<style>
</style>
