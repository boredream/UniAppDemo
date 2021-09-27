<template>
	<view class="container">
		<input v-model="form.title" class="title-input" placeholder="标题(选填)" />
		<textarea placeholder="这一刻的想法..." :auto-height="true" maxlength="-1" v-model="form.content"
			class="post-txt"></textarea>
		<label @click="show = true">纪念日期：{{theDayDate}}</label>
		<u-upload ref="uUpload" :size-type="['compressed']" name="Image" :max-count="9" :action="uploadImgUrl"
			@on-uploaded="submit" :auto-upload="false"></u-upload>
		<u-picker :default-time="theDayDate" @confirm="onDateSelected" mode="time" v-model="show"></u-picker>
		<button @click="editData">修改</button>
		<button @click="deleteData">删除</button>
	</view>
</template>

<script>
	export default {
		onLoad(options) {

		},
		data() {
			return {
				show: false,
				theDayDate: '2021-12-21',
				uploadImgUrl: '图片上传地址',
				form: {
					title: '',
					type: 1,
					topic_id: '',
					discuss_id: '',
					content: '',
					media: [],
					longitude: 0,
					latitude: 0,
					address: ''
				},
			}
		},
		methods: {
			onDateSelected(params) {
				this.theDayDate = params.year + '-' + params.month + '-' + params.day
			},
			editData() {

			},
			deleteData() {

			},
		}
	};
</script>


<style lang="scss" scoped>
	.title-input {
		border-bottom: 1px solid #F5F5F5;
		margin: 20rpx 0;
		padding: 20rpx 0;
	}

	.post-txt {
		width: 100%;
		padding: 20rpx 0;
		min-height: 300rpx;
	}

	.upload-wrap {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		width: 180rpx;
		height: 180rpx;
		background-color: #F5F5F5;
		margin-top: 30rpx;
		border-radius: 10rpx;

		.icon {
			width: 50rpx;
			height: 50rpx;
		}

		text {
			font-size: 24rpx;
		}
	}

	.upload-video {
		width: 180rpx;
		height: 180rpx;
		margin-top: 30rpx;
	}

	.choose-item {
		display: flex;
		align-items: center;
		padding: 20rpx;
		border-bottom: 1px solid #F5F5F5;

		&:last-child {
			border: 0;
		}

		.txt {
			margin-left: 20rpx;
		}

		.icon {
			width: 40rpx;
			height: 40rpx;
		}

		.u-icon {
			margin-left: auto;
			color: #999;
		}

		.add-icon {
			margin-left: 0;
		}
	}

	.submit-btn {
		margin-top: 50rpx;
	}
</style>
