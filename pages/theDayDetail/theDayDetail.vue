<template>
	<view class="container">
		<input v-model="info.name" class="title-input" placeholder="标题" />
		<textarea placeholder="详细描述..." :auto-height="true" maxlength="-1" v-model="info.detail"
			class="post-txt"></textarea>
		<view @click="showTheDayDate = true">记录日期：{{info.theDayDate != null ? info.theDayDate : ""}}</view>
		<view @click="showNotifyDate = true">提醒日期：{{info.notifyDate != null ? info.notifyDate : ""}}</view>
		<u-upload sizeType="['compressed']" maxCount="9" :fileList="exsitImageList"></u-upload>
		<u-picker :default-time="info.theDayDate != null ? info.theDayDate : ''" @confirm="onTheDayDateSelected"
			mode="time" v-model="showTheDayDate">
		</u-picker>
		<u-picker :default-time="info.notifyDate != null ? info.notifyDate : ''" @confirm="onNotifyDateSelected"
			mode="time" v-model="showNotifyDate">
		</u-picker>
		<button @click="commitData">{{isEdit ? "修改" : "新增"}}</button>
		<button v-if="isEdit" @click="deleteData">删除</button>
	</view>
</template>

<script>
	import request from "../../utils/request_util.js";
	import imageUploadUtil from "../../utils/imageUploadUtil.js";

	export default {
		onLoad(options) {
			if (options.date != null) {
				// 新增
				this.isEdit = false;
				this.info.theDayDate = options.date;
			} else if (options.data != null) {
				// 修改
				this.isEdit = true;
				this.info = JSON.parse(options.data);
			}
		},
		data() {
			return {
				isEdit: false,
				showTheDayDate: false,
				showNotifyDate: false,
				info: {},
			}
		},
		computed: {
			exsitImageList() {
				var images = this.info.images;
				var exsitImageList = [];
				if (images != null && images.length > 0) {
					images.split(",").forEach(function(e) {
						exsitImageList.push({
							"url": e
						});
					});
				}
				return exsitImageList;
			}
		},
		methods: {
			onTheDayDateSelected(params) {
				this.info.theDayDate = params.year + '-' + params.month + '-' + params.day
			},
			onNotifyDateSelected(params) {
				this.info.notifyDate = params.year + '-' + params.month + '-' + params.day
			},
			commitData() {
				// 如果有本地图片，则先进行上传
				uni.showLoading();
				imageUploadUtil.check4upload(this.$refs.uUpload.lists).then((imageUrls) => {
					this.info.images = imageUrls;

					// 上传成功后发送请求
					if (this.isEdit) {
						request.put("the_day", this.info.id, this.info, "修改成功");
					} else {
						request.post("the_day", this.info, "新增成功");
					}
				}).catch((error) => {
					uni.hideLoading();
					uni.showToast({
						title: "图片上传失败，请重新提交"
					});
				});
			},
			deleteData() {
				request.del("the_day", this.info.id, "删除成功");
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
		min-height: 200rpx;
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
