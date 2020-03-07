const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();
const useref = require('gulp-useref');
const uglify = require('gulp-uglify-es').default;
const gulpif = require('gulp-if');
const cssnano = require('gulp-cssnano');
const del = require('del');
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');

gulp.task('scss', () => {
    return gulp.src('./app/scss/**/*.scss')
        .pipe(sourcemaps.init())
        // .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))  // CSS output style (nested | expanded | compact | compressed)
        .pipe(sass({ outputStyle: 'expanded' }).on('error', sass.logError))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./app/css'))
        .pipe(browserSync.reload({
            stream: true
        }));
});

gulp.task('html', () => {
    return gulp.src('app/*.html')
        .pipe(browserSync.reload({
            stream: true
        }))
});

gulp.task('script', () => {
    return gulp.src('app/js/**/*.js')
        .pipe(browserSync.reload({
            stream: true
        }))
});

gulp.task('browser-sync', () => {
    browserSync.init({
        server: {
            baseDir: './app'
        }
    });
});

gulp.task('useref', () => {
    return gulp.src('app/*.html')
        .pipe(useref())
        .pipe(gulpif('*.js', uglify()))
        .pipe(gulpif('*.css', cssnano()))
        .pipe(gulpif('*.css', autoprefixer({
            overrideBrowserslist: ["last 8 versions"]
        })))
        .pipe(gulp.dest('dist'))
});

gulp.task('fonts', () => {
    return gulp.src('app/fonts/**/*')
        .pipe(gulp.dest('dist/fonts'))
});

gulp.task('img', () => {
    return gulp.src('app/img/**/*')
        .pipe(gulp.dest('dist/img'))
});

gulp.task('clean', async () => {
    del.sync('dist')
})

gulp.task('watch', () => {
    gulp.watch('app/scss/**/*.scss', gulp.parallel('scss'));
    gulp.watch('app/*.html', gulp.parallel('html'))
    gulp.watch('app/js/**/*.js', gulp.parallel('script'))
});

gulp.task('default', gulp.parallel('scss', 'browser-sync', 'watch'));

gulp.task('build', gulp.series('clean', 'useref', 'fonts', 'img'));