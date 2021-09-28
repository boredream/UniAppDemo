<template>
	<view>
		<uni-calendar @change="onCalendarChange" :selected="theDayList"></uni-calendar>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				show: true,
				theDayList: [{
					date: '2021-09-02',
					info: '签到'
				}]
			}
		},
		methods: {
			// {
			// 	"range": {
			// 		"before": "",
			// 		"after": "",
			// 		"data": []
			// 	},
			// 	"year": 2021,
			// 	"month": "09",
			// 	"date": 15,
			// 	"fulldate": "2021-09-15",
			// 	"lunar": {
			// 		"lYear": 2021,
			// 		"lMonth": 8,
			// 		"lDay": 9,
			// 		"Animal": "牛",
			// 		"IMonthCn": "八月",
			// 		"IDayCn": "初九",
			// 		"cYear": 2021,
			// 		"cMonth": 9,
			// 		"cDay": 15,
			// 		"gzYear": "辛丑",
			// 		"gzMonth": "丁酉",
			// 		"gzDay": "丙寅",
			// 		"isToday": false,
			// 		"isLeap": false,
			// 		"nWeek": 3,
			// 		"ncWeek": "星期三",
			// 		"isTerm": false,
			// 		"Term": null,
			// 		"astro": "处女座"
			// 	},
			// 	"extraInfo": {}
			// }
			onCalendarChange(calendar) {
				var date = calendar.fulldate;
				uni.showToast({
					title: date,
				})
			}
		}
	}
</script>

<style>

</style>
