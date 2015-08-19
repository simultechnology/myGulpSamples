var gulp = require('gulp'),
    webserver = require('gulp-webserver');

gulp.task('html', function () {
    console.log('html start');

    return gulp.src('./src/**')
        .pipe(gulp.dest('./dist'));
});

gulp.task('msg', ['html'], function() {
    console.log('html copy done!');
});

gulp.task('watch', function() {
    gulp.watch('./src/**', ['html'])
});

gulp.task('webserver', function() {
    gulp.src('./dist')
        .pipe(
        webserver({
            directoryListing: {
                enable:true,
                path: 'dist'
            },
            livereload: true
        })
    );
});

gulp.task('default', ['html', 'watch', 'webserver']);