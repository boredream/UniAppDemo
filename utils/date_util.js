/**
 * 通用日期格式化
 * @author ckk
 * @param date
 * @param fmt 如："yyyyMMdd"、"yyyy/MM/dd"、"yyyy-MM-dd hh:mm:ss"、"yyyy年MM月dd日"、"yyyy-MM-dd"等等
 * @returns {*}
 */
export default function(date, fmt) {
	var obj = {
		"M+": date.getMonth() + 1, // 月
		"d+": date.getDate(), // 日
		"h+": date.getHours(), // 时
		"m+": date.getMinutes(), // 分
		"s+": date.getSeconds(), // 秒
		"q+": Math.floor((date.getMonth() + 3) / 3), // 季度
		"S": date.getMilliseconds() // 毫秒
	};
	if (/(y+)/.test(fmt)) {
		fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
	}
	for (var i in obj) {
		if (new RegExp("(" + i + ")").test(fmt)) {
			fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (obj[i]) : (("00" + obj[i]).substr(("" + obj[
					i])
				.length)));
		}
	}
	return fmt;
}
