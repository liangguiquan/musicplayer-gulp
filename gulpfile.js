var gulp = require("gulp");


// gulp中插件的应用  
// 下载插件 npm install gulp-htmlclean--save-dev
// -->取到插件 var htmlClean = require("gulp-htmlclean");
// -->应用插件 .pipe(htmlClean())  // 执行插件

// 压缩html文件
var htmlClean = require("gulp-htmlclean");

// 压缩图片
var imageMIN = require("gulp-imagemin");

// 压缩js
var uglify = require("gulp-uglify");

// 去掉js中的调试语句
var debug = require("gulp-strip-debug");

// 将less转换成css
var less = require("gulp-less");

// 压缩css
var cleanCss = require("gulp-clean-css");

// postcss   autoprefixer  给css自动加上前缀
var postCss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");

// 开启服务器  gulp-connect
var connect = require("gulp-connect");



var folder = {
    src: "src/",
    dist: "dist/"
}


// 在命令行中设置环境变量
// $ export NODE_ENV=development 

// 判断当前环境变量
var devMod = process.env.NODE_ENV == "development";
// var devMod = process.env.NODE_ENV =="production";
// console.log(devMod);


// gulp.task("html",function(){
//     gulp.src(folder.src+"html/*")           // 取出文件
//     .pipe(connect.reload())                 // 监听到文件改变时自动刷新页面
//     .pipe(htmlClean())                      // 处理压缩文件
//     .pipe(gulp.dest(folder.dist+"html/"))   // 输出文件
// })

gulp.task("html", function () {
    var page = gulp.src(folder.src + "html/*")          // 取出文件
        .pipe(connect.reload());                        // 监听到文件改变时自动刷新页面
    if (!devMod) {                                      // 判断是否压缩，在生产环境中要压缩，开发环境不用压缩
        page.pipe(htmlClean())                          // 处理压缩文件
    }
    page.pipe(gulp.dest(folder.dist + "html/"))         // 输出文件
})

gulp.task("image", function () {
    gulp.src(folder.src + "image/*")
        .pipe(imageMIN())
        .pipe(gulp.dest(folder.dist + "image/"))
})

// gulp.task("css",function(){
//     gulp.src(folder.src+"css/*")
//     .pipe(connect.reload())
//     .pipe(less())
//     .pipe(postCss([autoprefixer()]))
//     .pipe(cleanCss())
//     .pipe(gulp.dest(folder.dist+"css/"))
// })

gulp.task("css", function () {
    var page = gulp.src(folder.src + "css/*")
        .pipe(connect.reload())
        .pipe(less())
        .pipe(postCss([autoprefixer()]));
    if (!devMod) {
        page.pipe(cleanCss())
    }
    page.pipe(gulp.dest(folder.dist + "css/"))
})

// gulp.task("js",function(){
//     gulp.src(folder.src+"js/*")
//     .pipe(connect.reload())
//     .pipe(debug())
//     .pipe(uglify())
//     .pipe(gulp.dest(folder.dist+"js/"))
// })

gulp.task("js", function () {
    var page = gulp.src(folder.src + "js/*")
        .pipe(connect.reload());
    if (!devMod) {
        page.pipe(debug())
            .pipe(uglify())
    }
    page.pipe(gulp.dest(folder.dist + "js/"))
})

gulp.task("server", function () {   // 开启服务器
    connect.server({
        port: "8888",  // 改变端口号
        livereload: true  // 监听到文件改变时自动刷新页面
    });
})

gulp.task("watch", function () {     // 监听文件改变，自动改变dist中相应的文件
    gulp.watch(folder.src + "html/*", ["html"]),  // 监听folder.src+"html/"下面的所有文件，文件有变化就执行["html"]任务
        gulp.watch(folder.src + "css/*", ["css"]),
        gulp.watch(folder.src + "js/*", ["js"])
})


gulp.task("default", ["html", "image", "css", "js", "server", "watch"]);

// 流：一串二进制的数

// gulp.src()
// gulp.dest()
// gulp.task()
// gulp.watch()
// .pipe()




// gulp:  runner task   任务运行器
// webpack: module bundle  模块打包器