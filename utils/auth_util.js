export default {
	wxLogin,
}

export function wxLogin(info) {
	var requestMethod = "POST";
	// var requestUrl = "http://106.14.25.153:8080/user/wxlogin";
	var requestUrl = "http://localhost:8080/user/wxlogin";
	
	uni.showLoading();
	uni.request({
		method: requestMethod,
		url: requestUrl,
		data: info,
		success: (res) => {
			console.log(res);
			uni.showToast({
				title: "提交成功"
			});
			// uni.navigateBack();
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
