const gulp = require('gulp');
const stylus = require('gulp-stylus');
const browserSync = require('browser-sync').create();
const sourcemaps = require('gulp-sourcemaps');


gulp.task('stylus', function() {
	return gulp.src('src/css/*.styl')
		.pipe(sourcemaps.init())
		.pipe(stylus())
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('build/css'))
		.pipe(browserSync.reload({
			stream: true
		}))
});

gulp.task('browser-sync', function() {
	browserSync.init({
		server: {
			baseDir: 'build'
		}
	})
});


gulp.task('watch', ['browser-sync', 'stylus'], function(){
	gulp.watch('src/css/*.styl', ['stylus']);
	gulp.watch('build/index.html', browserSync.reload);
	gulp.watch('build/js/*.js', browserSync.reload);
});



