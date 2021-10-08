export default {
	getTable,
	getPageTable,
	postOrPutTable,
	deleteTable,
}

const HOST = 'http://106.14.25.153:8080/';
// const HOST = 'http://localhost:8080/';
const CODE_SUCCESS = 1;

function getTable(path, extraParam, onSuccess) {
	request("GET", path, extraParam, null, onSuccess);
}

function getPageTable(path, page, size, extraParam, onSuccess) {
	var requestPath = path + "/page?page=" + page + "&size=" + size;
	request("GET", requestPath, extraParam, null, onSuccess);
}

function postOrPutTable(path, isEdit, info) {
	var requestMethod = "POST";
	var requestPath = path;
	if (isEdit) {
		requestMethod = "PUT";
		requestPath += ("/" + info.id);
	}
	request(requestMethod, requestPath, null, null, (res) => {
		uni.showToast({
			title: "提交成功"
		});
		uni.navigateBack();
	});
}

function deleteTable(path, info) {
	var requestPath = path + "/" + info.id;
	request("DELETE", requestPath, null, null, (res) => {
		uni.showToast({
			title: "提交成功"
		});
		uni.navigateBack();
	});
}

function request(method, path, extraParam, extraHeader, onSuccess) {
	var url = HOST + path;
	if (extraParam != null) {
		url += extraParam;
	}

	uni.showLoading();
	uni.request({
		url: url,
		header: getHeader(extraHeader),
		success: (res) => {
			if (res.data.code != CODE_SUCCESS) {
				onFail(res.data.code + ":" + res.data.message);
				return;
			}
			onSuccess(res.data.data)
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
	console.log("getHeader");
	var headers = {};
	if (extraHeader != null) {
		headers = extraHeader;
	}
	var token = uni.getStorageSync("token");
	if (token != null) {
		headers["token"] = token;
	}
	console.log(JSON.stringify(headers));
	return headers;
}

function onFail(error) {
	uni.showToast({
		title: error
	})
}
