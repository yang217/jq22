var gulp = require('gulp'),  
    sass = require('gulp-ruby-sass'),//sass
    autoprefixer = require('gulp-autoprefixer'),//添加css前缀
    minifycss = require('gulp-minify-css'),//css压缩
    jshint = require('gulp-jshint'),//js语法检查
    uglify = require('gulp-uglify'),//js 压缩插件 丑化
	imagemin = require('gulp-imagemin'),//图片压缩
    rename = require('gulp-rename'),//文件重命名
    clean = require('gulp-clean'),//清除档案
    concat = require('gulp-concat'),//拼接文件
    notify = require('gulp-notify'),//更改通知
    cache = require('gulp-cache'),//图片快取，只有更改过得图片会进行压缩
    nodemon = require('gulp-nodemon');

var browserSync = require('browser-sync');
var reload = browserSync.reload;


//编译sass  			.pipe(sass({style:'expanded'}))
	gulp.task('styles',function(){
		return sass('public/src/scss/index/*.scss')
			.on('error', sass.logError)
			.pipe(autoprefixer())
			.pipe(gulp.dest('public/assets/css'))
			.pipe(rename({suffix: '.min'}))
			.pipe(minifycss())
			.pipe(gulp.dest('public/assets/css'))
			//.pipe(reload({stream: true}))
			.pipe(notify({ message: 'Styles task complete' }));
	})

//脚本拼接 压缩 
	gulp.task('scripts',function(){
		return gulp.src('public/src/js/**/*.js')
			.pipe(jshint('.jshintrc'))
			.pipe(jshint.reporter('default'))
			.pipe(concat('main.js'))
			.pipe(gulp.dest('public/assets/js/app'))
			.pipe(rename({suffix: '.min'}))
			.pipe(uglify())
			.pipe(gulp.dest('public/assets/js/app'))
			// .pipe(reload({stream: true}))
			.pipe(notify({ message: 'Scripts task complete' }));
	})
//图片压缩	
	gulp.task('images', function() {  
	  return gulp.src('public/src/images/**/*')
	    .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
	    .pipe(gulp.dest('public/assets/images'))
	    //.pipe(reload({stream: true}))
	    .pipe(notify({ message: 'Images task complete' }));
	});

// 清理
	gulp.task('clean', function() {  
	  return gulp.src(['public/assets/css', 'public/assets/js/app', 'public/assets/images'], {read: false})
	    .pipe(clean());
	});

//看守
	gulp.task('watch', function() {
	  // 看守所有.scss档
	  gulp.watch('public/src/scss/index/*.scss', ['styles']);

	  // 看守所有.js档
	  gulp.watch('public/src/js/**/*.js', ['scripts']);

	  // 看守所有图片档
	  gulp.watch('public/src/images/**/*', ['images']);

	});

	//自动刷新
	// gulp.task('browser-sync',['serve'], function() {
	// 	// var files = ['public/assets/**/*.*','app/views/*.*','app/views/**/*.*'];
	//  //    browserSync(files,{
	//  //        proxy: "192.168.0.104:4000"
	//  //    });

	//     browserSync.init(null, {
	// 	    proxy: '192.168.0.104:4000',
	// 	    files : ['public/assets/**/*.*','app/views/*.*','app/views/**/*.*'],
	// 	    notify: false,
	// 	    port: 3000
	// 	});
	// });	
//本地服务器
	gulp.task('serve', function (cb) {
	    var called = false;
	   	return nodemon({
	   		script:'bin/www',
	   		ignore:['node_modules/**'],
	   		env: { 'NODE_ENV': 'development'}
	   	}).on('start',function(){
	   		if(!called){
	   			cb();
	   			called = true;
	   		}
	   	})
	});
	// 预设任务
	gulp.task('default', ['clean'], function() {  
	    gulp.start('styles', 'scripts','images','watch','serve');
	});