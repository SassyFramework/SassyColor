var gulp         = require('gulp'),
    sass         = require('gulp-ruby-sass'),
    minifycss    = require('gulp-minify-css'),
    plumber      = require('gulp-plumber'),
    filter       = require('gulp-filter'), // for sass source-map
    gutil        = require('gulp-util'), // Utility functions for gulp plugins
    browserSync  = require("browser-sync"),
    rename       = require('gulp-rename');


var sass_settings = {
    sourcemap: false,
    sourcemapPath: 'example/css',
    style: 'expanded',
    loadPath: 'bower_components'
}


// browser-sync task for starting the server.
gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: 'example'
        }
    });
});


gulp.task('styles', function() {
    return gulp.src('example/scss/*.scss')
        .pipe(plumber())
        .pipe(sass(sass_settings))
        .on('error', gutil.log)
        .pipe(gulp.dest('example/css'))
        .pipe(rename({suffix: '.min'}))
        .pipe(minifycss())
        .pipe(gulp.dest('example/css'))
        .pipe(browserSync.reload({stream:true}));
});



gulp.task('watch-example', function() {
    gulp.watch('example/scss/*.scss', ['styles', browserSync.reload]);
});


gulp.task('build-example', ['styles']);

gulp.task('default', ['watch-example']);
