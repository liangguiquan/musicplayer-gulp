(function ($, root) {
    function Control(len) {
        // this --> Control
        this.index = 0;
        this.len = len;
    }
    Control.prototype = {
        prev: function () {
            return this.getIndex(-1);
        },
        next: function () {
            return this.getIndex(1);
        },
        getIndex: function (val) {
            var index = this.index;
            var len = this.len; // 数组总长度 
            var curIndex = (index + val +len) % len;
            this.index = curIndex;
            return curIndex;   // 改变后的索引值
        }
    }

    root.controlIndex = Control;

})(window.Zepto, window.player || (window.player = {}))


// 普通写法
// (function ($, root) {
//     function Control() {
//         // this --> Control
//         this.index = 0;
//     }
//     Control.prototype = {
//         prev: function () {
//             if (this.index == 0) {
//                 this.index = len - 1;
//             } else {
//                 this.index--;
//             }
//             return this.index;
//         },
//         next: function () {
//             if (this.index == len - 1) {
//                 this.index = 0;
//             } else {
//                 this.index++;
//             }
//             return this.index;
//         }
//     }
//     root.controlIndex = new Control();

// })(window.Zepto, window.player || (window.player = {}))