export default {
	postOrPutTable,
	deleteTable,
}

export function postOrPutTable(table, isEdit, info) {
	var requestMethod = "POST";
	var requestUrl = "http://106.14.25.153:8080/" + table;
	if (isEdit) {
		requestMethod = "PUT";
		requestUrl += ("/" + info.id);
	}

	uni.showLoading();
	uni.request({
		method: requestMethod,
		url: requestUrl,
		data: info,
		success: (res) => {
			uni.showToast({
				title: "提交成功"
			});
			uni.navigateBack();
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

export function deleteTable(table, info) {
	uni.showLoading();
	uni.request({
		method: "DELETE",
		url: "http://106.14.25.153:8080/" + table + "/" + info.id,
		success: (res) => {
			uni.showToast({
				title: "提交成功"
			});
			uni.navigateBack();
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
