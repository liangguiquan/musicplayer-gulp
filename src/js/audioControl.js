(function ($, root) {
    // play  pause  getAudio
    function AudioManager() {
        // 创建一个audio对象
        this.audio = new Audio();
        this.status = 'pause';  // audio默认状态
    }

    AudioManager.prototype = {
        play: function () {
            this.audio.play();
            this.status = 'play';
        },
        pause: function () {
            this.audio.pause();
            this.status = 'pause';
        },
        getAudio: function (src) {
            // console.log(src);
            this.audio.src = src;
            this.audio.load();   // 加载当前音频
        },
        playTo: function (time) {
            this.audio.currentTime = time;  
            // currentTime 属性设置或返回音频播放的当前位置（以秒计），当设置该属性时，播放会跳跃到指定的位置。
            this.audio.play();
            this.status = 'play';
        }

    }

    root.audioManager = new AudioManager();


})(window.Zepto, window.player || (window.player = {}))