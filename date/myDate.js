//上周
window.getCurrentWeek = function() {
	let weekOfday = parseInt(moment().format('d')) // 计算今天是这周第几天  周日为一周中的第一天
	let start = moment().subtract(weekOfday + 7, 'days').format('YYYY-MM-DD') + " 00:00:00" // 周一日期
	let end = moment().subtract(weekOfday + 1, 'days').format('YYYY-MM-DD') + " 23:59:59" // 周日日期
	var timer = start + " - " + end;
	$(".startTime").val(start);
	$(".endTime").val(end);
	timeSucFunc();
}
//今天
window.getToday = function() {
	let start = moment().subtract('days', 0).format('YYYY-MM-DD') + " 00:00:00";
	let end = moment().subtract('days', 0).format('YYYY-MM-DD') + " 23:59:59";
	var timer = start + " - " + end;
	$(".startTime").val(start);
	$(".endTime").val(end);
	timeSucFunc();
}
//最近几天
window.getLastSomeDays = function(m) {
	let start = moment().subtract('days', m).format('YYYY-MM-DD') + " 00:00:00";
	let end = moment().subtract('days', 1).format('YYYY-MM-DD') + " 23:59:59";
	var timer = start + " - " + end;
	$(".startTime").val(start);
	$(".endTime").val(end);
	timeSucFunc();
}
//最近一个月
window.getLastSomeMathes = function(m) {
	let start = moment().subtract('month', m).format('YYYY-MM') + '-01 00:00:00'
	let end = moment(start).subtract('month', -m).add('days', -1).format('YYYY-MM-DD') + " 23:59:59"
	var timer = start + " - " + end;
	$(".startTime").val(start);
	$(".endTime").val(end);
	timeSucFunc();
}
//本月
window.getCurrentMath = function() {
	let start = moment().subtract('month', 0).format('YYYY-MM') + '-01 00:00:00'
	let end = moment().subtract('days', 1).format('YYYY-MM-DD') + " 23:59:59";
	var timer = start + " - " + end;
	$(".startTime").val(start);
	$(".endTime").val(end);
	timeSucFunc();
}

window.timeSucFunc = function(){
	$('#reservationtime').daterangepicker({
		timePicker: true,
		timePickerIncrement: 1,
		format: 'YYYY-MM-DD HH:mm:ss'
	}, function(start, end) {
		console.log(start.toISOString(), end.toISOString());
	});
}
