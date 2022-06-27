export default {
	request,
	get,
	getPage,
	post,
	put,
	del,
}

// const HOST = 'https://www.papikoala.cn/api/';
const HOST = 'http://localhost:8080/api/';

function get(path, onSuccess) {
	request("GET", path, null, null, onSuccess);
}

function getPage(path, page, size, onSuccess) {
	if (path.indexOf("?") >= 0) {
		path += "&";
	} else {
		path += "?"
	}
	path = path + "page=" + page + "&size=" + size;
	request("GET", path, null, null, onSuccess);
}

function post(path, data, onSuccess) {
	request("POST", path, data, null, onSuccess);
}

function put(path, id, data, onSuccess) {
	path = path + "/" + id;
	request("PUT", path, data, null, onSuccess);
}

function del(path, id, onSuccess) {
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
			if (!res.data.success) {
				onFail(res.data.code + ":" + res.data.msg);
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
			console.log("request fail " + JSON.stringify(error));
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
	if (token != null && token.length > 0) {
		headers["token"] = token;
	}
	// console.log("getHeader: " + JSON.stringify(headers));
	return headers;
}

function onFail(error) {
	uni.showToast({
		title: error
	})
}
