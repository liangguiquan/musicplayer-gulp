var root = window.player;
// var nowIndex = 0;
var dataList;
var len;
var audio = root.audioManager;
var control;
var timer;



// ajax获取数据
function getData(url) {
    $.ajax({
        type: "GET",
        url: url,
        success: function (data) {
            console.log(data);
            len = data.length;
            control = new root.controlIndex(len);
            // console.log(new control(len));
            dataList = data;
            root.render(data[0]);
            audio.getAudio(data[0].audio);
            root.pro.renderAllTime(data[0].duration);
            bindEvent();
            bindTouch();
        },
        error: function () {
            console.log("error");
        }
    })
}

// 绑定按钮事件
function bindEvent() {
    $('body').on('play:change', function (e, index) {
        audio.getAudio(dataList[index].audio);
        root.render(dataList[index]);
        root.pro.renderAllTime(dataList[index].duration);
        audio.play();
        root.pro.start(0);
        rotated(0);
    })

    $('.prev').on('click', function () {
        var i = control.prev();
        $('body').trigger('play:change', i);

        // 没有封装indexControl的写法
        // if (nowIndex == 0) {
        //     nowIndex = len - 1;
        // } else {
        //     nowIndex--;
        // }
        // audio.getAudio(dataList[nowIndex].audio);
        // root.render(dataList[nowIndex]);
        // if (audio.status == 'play') {
        //     audio.play();
        // }

        // 封装indexControl的普通写法
        // var i = root.controlIndex.prev();
        // audio.getAudio(dataList[i].audio);
        // root.render(dataList[i]);
        // if (audio.status == 'play') {
        //     audio.play();
        // }

        // 封装indexControl的高级写法
        // var i = control.prev();
        // audio.getAudio(dataList[i].audio);
        // root.render(dataList[i]);
        // if (audio.status == 'play') {
        //     audio.play();
        // }
    });

    $('.next').on('click', function () {
        var i = control.next();
        $('body').trigger('play:change', i);

        // 没有封装indexControl的写法
        // if (nowIndex == len - 1) {
        //     nowIndex = 0;
        // } else {
        //     nowIndex++;
        // }
        // audio.getAudio(dataList[nowIndex].audio);
        // root.render(dataList[nowIndex]);
        // if (audio.status == 'play') {
        //     audio.play();
        // }

        // 封装indexControl的普通写法
        // var i = root.controlIndex.next();
        // audio.getAudio(dataList[i].audio);
        // root.render(dataList[i]);
        // if (audio.status == 'play') {
        //     audio.play();
        // }

        // 封装indexControl的高级写法
        // var i = control.next();
        // audio.getAudio(dataList[i].audio);
        // root.render(dataList[i]);
        // if (audio.status == 'play') {
        //     audio.play();
        // }
    });

    $('.play').on('click', function () {
        if (audio.status == 'pause') {
            audio.play();
            root.pro.start();
            var deg = $('.img-box').attr('data-deg');
            rotated(deg);
        } else {
            audio.pause();
            root.pro.stop();
            clearInterval(timer);
        }
        $('.play').toggleClass('playing');
    });
}


function bindTouch() {
    var slider = $('.slider-point');
    var left = $('.pro-bottom').offset().left;
    // console.log(left);
    var width = $('.pro-bottom').offset().width;  // 进度条的长度
    slider.on('touchstart', function () {
        root.pro.stop();
    }).on('touchmove', function (e) {
        // console.log(e);
        var x = e.changedTouches[0].clientX;
        console.log(x);
        var per = (x - left) / width;
        if (per > 0 && per <= 1) {
            root.pro.update(per);
        }
    }).on('touchend', function (e) {
        var x = e.changedTouches[0].clientX;
        var per = (x - left) / width;
        console.log('control.index=' + control.index);
        if (per > 0 && per <= 1) {
            curTime = per * dataList[control.index].duration;
            audio.playTo(curTime);
            $('.play').addClass('playing');
            root.pro.start(per);
        }
    })
}

function rotated(deg) {
    clearInterval(timer);
    // var deg = 0;
    deg = +deg;
    if (deg == 0) {
        $('.img-box').attr('data-deg', 0);
        $('.img-box').css({
            'transform': 'rotateZ(0deg)',
            'transition': 'none'
        })
    }
    timer = setInterval(function () {
        deg += 0.5;
        $('.img-box').attr('data-deg', deg);
        $('.img-box').css({
            'transform': 'rotateZ(' + deg + 'deg)',
            'transition': 'all 1s ease-out'
        })
    }, 50)
}

getData("../mock/data.json");

// 信息，图片渲染到页面上  render
// 点击按钮
// 音频的播放  暂停  切歌
// 图片旋转

// 列表切歌
// 进度条运动与拖拽

