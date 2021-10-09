<template>
	<view class="container">
		<input v-model="info.name" class="title-input" placeholder="标题" />
		<textarea placeholder="详细描述..." :auto-height="true" maxlength="-1" v-model="info.detail"
			class="post-txt"></textarea>
		<view @click="showDoneDate = true">完成日期：{{info.doneDate != null ? info.doneDate : ""}}</view>
		<!-- <view @click="showNotifyDate = true">提醒日期：{{info.notifyDate}}</view> -->
		<u-upload ref="uUpload" :size-type="['compressed']" :max-count="9" :auto-upload="false" :file-list="exsitImageList"></u-upload>
		<u-picker :default-time="info.doneDate" @confirm="onDoneDateSelected" mode="time" v-model="showDoneDate">
		</u-picker>
		<u-picker :default-time="info.notifyDate" @confirm="onNotifyDateSelected" mode="time" v-model="showNotifyDate">
		</u-picker>
		<button @click="commitData">{{isEdit ? "修改" : "新增"}}</button>
		<button v-if="isEdit" @click="deleteData">删除</button>
	</view>
</template>

<script>
	import request from "../../utils/request_util.js";
	export default {
		onLoad(options) {
			if (options.type != null) {
				// 新增
				this.isEdit = false;
				this.info.type = options.type;
			} else if (options.data != null) {
				// 修改
				this.isEdit = true;
				this.info = JSON.parse(options.data);
			}
		},
		data() {
			return {
				isEdit: false,
				showDoneDate: false,
				showNotifyDate: false,
				exsitImageList: [{
					"url": "https://img1.baidu.com/it/u=3628483870,3822231434&fm=26&fmt=auto"
				}],
				info: {},
			}
		},
		methods: {
			onDoneDateSelected(params) {
				this.info.doneDate = params.year + '-' + params.month + '-' + params.day
			},
			onNotifyDateSelected(params) {
				this.info.notifyDate = params.year + '-' + params.month + '-' + params.day
			},
			commitData() {
				// 如果有本地图片，则先进行上传
				var imageList = this.$refs.uUpload.lists;
				var uploadImageList = [];
				for(let i in imageList) {
					var image = imageList[i];
					if(image.file != null) {
						uploadImageList.push(image.file.path);
					}
				}
				
				// uni.showLoading();
				
				// 先获取上传凭证
				// request.get("file/getUploadPolicy", (res)=> {
				// 	console.log(res);
				// });
				
				// {"code":1,"msg":"操作成功!","success":true,"data":{"token":"wdoVNp9qXmswTakEjVcfFEqdi0JebQi8tNLDxMJg:aWUB4E1Qe58teRHnUCxro9xVP54=:eyJzY29wZSI6ImJvcmVkcmVhbS1maWxlcyIsImRlYWRsaW5lIjoxNjMzNzY4ODUxfQ==","host":"r0p1o4yza.hd-bkt.clouddn.com"}}
				
				var url = "http://up.qiniu.com";
				var token = "wdoVNp9qXmswTakEjVcfFEqdi0JebQi8tNLDxMJg:hHRKdhNglX_P897tuWk_AhONorw=:eyJzY29wZSI6ImJvcmVkcmVhbS1maWxlcyIsImRlYWRsaW5lIjoxNjMzNzcwMTg2fQ==";
				var filename = "image" + (new Date().getTime()) + ".jpg";
				uni.uploadFile({
				            url: url,
				            filePath: uploadImageList[0],
				            name: 'file',
				            formData: {
				                token: token,
				                key: filename
				            },
				            complete: (res) => {
				                if (res.statusCode === 200) {
				                    const name = JSON.parse(res.data).key;
				                    // this.images[i] = 'https://picture.wrpxcx.com/' + name;
									console.log("upload uccess " + res);
				                }
				            },
				        })
						
				// var imageList = this.$refs.uUpload.lists;
				// for(let i in imageList) {
				// 	var image = imageList[i];
				// 	if(image.file != null) {
				// 		console.log(image);
				// 	}
				// }
				
				// if (this.isEdit) {
				// 	request.put("todo", this.info.id, this.info, "修改成功");
				// } else {
				// 	request.post("todo", this.info, "新增成功");
				// }
			},
			deleteData() {
				request.del("todo", this.info.id, "删除成功");
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
