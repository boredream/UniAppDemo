export default {
	request,
	getTable,
	getPageTable,
	postTable,
	putTable,
	deleteTable,
}

const HOST = 'http://106.14.25.153:8080/';
// const HOST = 'http://localhost:8080/';
const CODE_SUCCESS = 1;

function getTable(path, onSuccess) {
	request("GET", path, null, null, onSuccess);
}

function getPageTable(path, page, size, onSuccess) {
	if (path.indexOf("?") >= 0) {
		path += "&";
	} else {
		path += "?"
	}
	path = path + "page=" + page + "&size=" + size;
	request("GET", path, null, null, onSuccess);
}

function postTable(path, data, onSuccess) {
	request("POST", path, data, null, onSuccess);
}

function putTable(path, id, data, onSuccess) {
	path = path + "/" + id;
	request("PUT", path, data, null, onSuccess);
	// request(requestMethod, requestPath, null, null, (res) => {
	// 	uni.showToast({
	// 		title: "提交成功"
	// 	});
	// 	uni.navigateBack();
	// });
}

function deleteTable(path, id, onSuccess) {
	var requestPath = path + "/" + id;
	request("DELETE", requestPath, null, null, onSuccess);
}

function request(method, path, data, extraHeader, onSuccess) {
	var url = HOST + path;

	uni.showLoading();
	uni.request({
		method: method,
		url: url,
		header: getHeader(extraHeader),
		data: data,
		success: (res) => {
			if (res.data.code != CODE_SUCCESS) {
				onFail(res.data.code + ":" + res.data.message);
				return;
			}

			// 如果onSuccess是字符串，默认toast+finish操作
			if (typeof(onSuccess) == "string") {
				if (onSuccess.length > 0) {
					uni.showToast({
						title: onSuccess,
					});
				}
				uni.navigateBack();
			} else {
				onSuccess(res.data.data);
			}
		},
		fail: (error) => {
			console.log("request fail " + error);
			onFail(error);
		},
		complete: () => {
			uni.hideLoading();
		}
	})
}

function getHeader(extraHeader) {
	var headers = {};
	if (extraHeader != null) {
		headers = extraHeader;
	}
	var token = uni.getStorageSync("token");
	if (token != null) {
		headers["token"] = token;
	}
	console.log("getHeader: " + JSON.stringify(headers));
	return headers;
}

function onFail(error) {
	uni.showToast({
		title: error
	})
}
