var gulp = require("gulp");

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



gulp.task("html", function () {
    var page = gulp.src(folder.src + "html/*")     
        .pipe(connect.reload());                      
    if (!devMod) {                                     
        page.pipe(htmlClean())                         
    }
    page.pipe(gulp.dest(folder.dist + "html/"))         
})

gulp.task("image", function () {
    gulp.src(folder.src + "image/*")
        .pipe(imageMIN())
        .pipe(gulp.dest(folder.dist + "image/"))
})

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

gulp.task("watch", function () {    
    gulp.watch(folder.src + "html/*", ["html"]),  
        gulp.watch(folder.src + "css/*", ["css"]),
        gulp.watch(folder.src + "js/*", ["js"])
})


gulp.task("default", ["html", "image", "css", "js", "server", "watch"]);
