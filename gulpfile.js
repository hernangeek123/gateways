const gulp = require('gulp');
const zip = require('gulp-zip');

gulp.task('zip', function () {
    return gulp.src([
        './**/*',
        '!./node_modules/**'
    ])
    .pipe(zip('gateways.zip'))
    .pipe(gulp.dest('./'));
});

gulp.task('default', gulp.series('zip'));