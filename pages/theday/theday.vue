<template>
	<view>
		<view>{{test}}</view>
		<uni-calendar @monthSwitch="onMonthSwitch" @change="onDayChanged" :selected="theHintList"></uni-calendar>
		<view @click="toDetail(item)" style="padding: 5px;" v-for="item in list">
			<view>{{item.name}}</view>
		</view>
		<button @click="add" style="position: absolute; bottom: 16px; right: 16px;">
			新增
		</button>
	</view>
</template>

<script>
	import dateFormat from "../../utils/date_util.js";
	import request from "../../utils/request_util.js";

	export default {
		onLoad() {
			var today = new Date();
			this.curYearMonth = dateFormat(today, "yyyy-MM");
			this.curDate = dateFormat(today, "yyyy-MM-dd");
			this.loadData();
		},
		data() {
			return {
				test: "",
				curYearMonth: "",
				show: true,
				theHintList: [],
				yearMonthMap: {},
				list: [],
			}
		},
		methods: {
			onDayChanged(calendar) {
				this.curDate = calendar.fulldate;
				this.showDayList();
			},
			onMonthSwitch(calendar) {
				var yearMonth = calendar.year + "-";
				if (calendar.month < 10) {
					yearMonth += "0";
				}
				yearMonth += calendar.month;
				this.curYearMonth = yearMonth;

				// 先尝试从缓存取，取不到再请求
				if (this.yearMonthMap[this.curYearMonth] != null) {
					this.showDayList();
				} else {
					this.loadData();
				}
			},
			loadData() {
				request.getPage("the_day/page?queryDate=" + this.curYearMonth, 1, 100, (res) => {
					// 记录 x年x月 下所有数据
					var records = this.yearMonthMap[this.curYearMonth] = res.records;
					
					// 记录 x年x月 下所有日期红点提示
					for (var index in records) {
						this.theHintList.push({
							date: records[index].theDayDate
						});
					}
					
					this.showDayList();
				});
			},
			showDayList() {
				// 过滤当日数据列表
				var records = this.yearMonthMap[this.curYearMonth];
				this.list = [];
				for (var index in records) {
					if (this.curDate == records[index].theDayDate) {
						this.list.push(records[index]);
					}
				}
			},
			add() {
				uni.navigateTo({
					url: "../theDayDetail/theDayDetail?date=" + this.curDate,
				})
			},
			toDetail(item) {
				uni.navigateTo({
					url: "../theDayDetail/theDayDetail?data=" + JSON.stringify(item),
				})
			},
		}
	}
</script>

<style>

</style>
