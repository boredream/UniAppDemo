<template>
	<view>
		<radio-group @change="radioChange">
			<radio v-for="item in typeList" :value="item" :checked="item == curType">{{item}}</radio>
		</radio-group>

		<view style="padding: 5px;" v-for="item in list">
			<checkbox :checked="item.done" @click="onCompleted(item)"></checkbox>
			<span @click="toDetail(item)">[{{item.doneDate.length > 0 ? item.doneDate : "未填写"}}] {{item.name}}</span>
		</view>
		<button @click="add" style="position: absolute; bottom: 16px; right: 16px;">
			新增
		</button>
	</view>
</template>

<script>
	import request from "../../utils/request_util.js";
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
					url: "../tododetail/tododetail?type=" + this.curType,
				})
			},
			toDetail(item) {
				uni.navigateTo({
					url: "../tododetail/tododetail?data=" + JSON.stringify(item),
				})
			},
			onCompleted(item) {
				uni.navigateTo({
					url: "../tododetail/tododetail?data=" + JSON.stringify(item),
				})
			},
			radioChange(item) {
				this.curType = item.detail.value;
				this.loadData();
			},
			loadData() {
				request.getPage("todo/page?type=" + this.curType, 1, 100, (res) => {
					this.list = res.records;
				});
			}
		},
		/**
		 * 下拉刷新回调函数
		 */
		onPullDownRefresh() {
			this.loadData();
		},
		/**
		 * 上拉加载回调函数
		 */
		onReachBottom() {}
	};
</script>

<style>
</style>
