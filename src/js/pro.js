// 进度条模块
// 渲染总时间  更新播放过的时间和更新进度条  拖拽进度条  暂停渲染

(function ($, root) {
    var curDuration;  // 当前歌曲的时长
    var frameId;
    var lastPer = 0;    // 上次的百分比
    var startTime;  // 点击开始的时间点

    function renderAllTime(time) {
        curDuration = time;
        time = formatTime(time);
        $('.all-time').html(time);

    }

    // 时间格式转换  253s --> 04:13
    function formatTime(time) {
        time = Math.round(time);
        var min = Math.floor(time / 60);
        var sec = time - min * 60;
        // var sec = Math.floor(time % 60);
        if (min < 10) {
            min = '0' + min;
        }
        if (sec < 10) {
            sec = '0' + sec;
        }
        return min + ':' + sec;
    };

    function start(per) {
        cancelAnimationFrame(frameId);
        lastPer = per == undefined ? lastPer : per;
        startTime = new Date().getTime();
        function frame() {
            var curTime = new Date().getTime();
            var percent = lastPer + (curTime - startTime) / (curDuration * 1000);
            update(percent);
            frameId = requestAnimationFrame(frame);
        }
        frame();
    };

    // 暂停
    function stop() {
        cancelAnimationFrame(frameId);
        var stopTime = new Date().getTime();
        lastPer = lastPer + (stopTime - startTime) / (curDuration * 1000);
    }

    // 更新时间和进度条
    function update(per) {
        var time = per * curDuration;
        time = formatTime(time);
        $('.current-time').html(time);
        // 进度条
        var perX = (per - 1) * 100 + '%';
        $('.pro-top').css({
            transform: 'translateX(' + perX + ')'
        });
        // 小圆点
        var width = $('.pro-top').offset().width;   // 进度条的长度
        var disX = per * width;      // 小圆点随着歌曲播放走过的长度
        $('.slider-point').css({
            transform: 'translateX(' + disX + 'px)'
        })
    }









    root.pro = {
        renderAllTime: renderAllTime,
        start: start,
        stop: stop,
        update: update
    }

})(window.Zepto, window.player || (window.player = {}));