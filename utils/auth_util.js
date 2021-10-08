export default {
	wxLogin,
}

export function wxLogin(info, onSuccess) {
	var requestMethod = "POST";
	// var requestUrl = "http://106.14.25.153:8080/user/wxlogin";
	var requestUrl = "http://localhost:8080/user/wxlogin";

	uni.showLoading();
	uni.request({
		method: requestMethod,
		url: requestUrl,
		data: info,
		success: (res) => {
			var token = res.data.data;
			console.log("wx login success = " + token);
			uni.setStorage({
				key: "token",
				data: token,
				success: () => onSuccess(),
			});
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
