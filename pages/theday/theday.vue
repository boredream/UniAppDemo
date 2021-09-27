<template>
	<view>
		<uni-calendar :selected="theDayList" />
	</view>
</template>

<script>
	export default {
		data() {
			return {
				theDayList: [{
					date: '2021-09-02',
					info: '签到'
				}]
			}
		},
		methods: {

		}
	}
</script>

<style>

</style>
