"use strict";

import gulp from 'gulp';
import connect from 'gulp-connect';
import concat from 'gulp-concat';
import uglify from 'gulp-uglify';
import rename from 'gulp-rename';
import minifyCss from 'gulp-minify-css';

// import sass from 'gulp-sass';
// import imagemin from 'gulp-imagemin';

// gulp.task('css',function(){
//   return gulp.src('styles/*.scss')
//   .pipe(sass())
//   .pipe(minifyCss())
//   .pipe(gulp.dest('dist/css'));
// })

// gulp.task('image',function(){
//   return gulp.src('img/**/*')
//   .pipe(imagemin())
//   .pipe(gulp.dest('dist/img'));
// })

gulp.task('server',function(){
  connect.server({
    root:'dist',
    livereload:true
  })
})

gulp.task('concat',function(){
  return gulp.src(['js/1.js','js/2.js'])
  .pipe(concat('vendor.js'))
  .pipe(gulp.dest('dist/js'))
  .pipe(uglify())
  .pipe(rename('verdor.min.js'))
  .pipe(gulp.dest('dist/js'));
})

gulp.task('copy-index',function(){
  return gulp.src('index.html')
  .pipe(gulp.dest('dist'))
  .pipe(connect.reload());
})




gulp.task('data',function(){
  return gulp.src(['json/*.json','xml/*.xml','!json/secret-*.json'])
  .pipe(gulp.dest('dist/data'))
})

gulp.task('build',['copy-index','image','data'],function(){
  console.log('编译成功');
})

gulp.task('watch',function(){
  gulp.watch('index.html',['copy-index']);
  gulp.wtach('img/**/*.{JPG,png}',['image']);
  gulp.watch(['json/*.json','xml/*.xml','!json/secret-*.json'],['data']);
})

gulp.task('default',['server','watch']);


// gulp.task('sass',function(){
//   return gulp.src('styles/**/*.scss')
//   .pipe(sass())
//   .pipe(gulp.dest('dist/css'));
// })
