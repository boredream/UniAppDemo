import request from "./request_util.js";

export default {
	check4upload
}

/**
 * 判断是否有本地图片需要上传
 * 
 * @param {Array} imageList u-upload 的图片集合 this.$refs.uUpload.lists;
 */
async function check4upload(imageList) {
	// 过滤本地图片，需要进行上传
	var localImageList = [];
	for (let i in imageList) {
		var image = imageList[i];
		if (image.file != null) {
			localImageList.push(image.file.path);
		}
	}
	
	// 有待上传图片
	if(localImageList.length != 0) {
		// 先获取上传凭证
		var policy = await getUploadPolicy();
		// 图片挨个上传
		for (let i in localImageList) {
			var path = localImageList[i];
			var imageUrl = await uploadImage(policy, path);
			// TODO 部分上传成功后咋处理？
			// 上传成功后替换原有图片，并清除path路径
			for (let j in imageList) {
				var image = imageList[j];
				if (image.file != null && image.file.path == path) {
					image.url = imageUrl;
				}
			}
		}
	}
	
	return imageList;
}

function getUploadPolicy() {
	return new Promise(function(resolve, reject) {
		request.get("file/getUploadPolicy", (res) => {
			resolve(res);
		});
	});
}

/**
 * 判断是否有本地图片需要上传
 * 
 * @param policy 上传凭证
 * @param {String} filePath 本地图片
 */
function uploadImage(policy, filePath) {
	return new Promise(function(resolve, reject) {
		var filename = "image" + (new Date().getTime()) + ".jpg";
		uni.uploadFile({
			url: policy.uploadHost,
			filePath: filePath,
			name: 'file',
			formData: {
				token: policy.token,
				key: filename
			},
			complete: (res) => {
				if (res.statusCode === 200) {
					const imageUrl = policy.downloadHost + JSON.parse(res.data).key;
					console.log("upload success " + imageUrl);
					resolve(imageUrl);
				} else {
					reject("image upload error " + res.message)
				}
			},
		});
	});
}
