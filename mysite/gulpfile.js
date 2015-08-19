var gulp = require('gulp');

gulp.task('html', function () {
    console.log('html start');

    gulp.src('./src/index.html')
        .pipe(gulp.dest('./dist'));
});

gulp.task('default', ['html']);