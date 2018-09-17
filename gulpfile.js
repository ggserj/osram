const gulp = require('gulp');
const stylus = require('gulp-stylus');
const browserSync = require('browser-sync').create();
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');

const paths = {
	html: {
		src: 'src/html/**/*.html',
		dest: 'build/'
	},
	css: {
		src: 'src/css/**/*.styl',
		dest: 'build/css/'
	},
	js: {
		src: 'src/js/**/*.js',
		dest: 'build/js/'
	}
};

function reload() {
	browserSync.init({
		server: {
			baseDir: 'build'
		}
	})
}

function css() {
	return gulp.src(paths.css.src)
		.pipe(sourcemaps.init())
		.pipe(stylus())
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(paths.css.dest))
		.pipe(browserSync.reload({
			stream: true
		}))
}

function watch() {
	gulp.watch(paths.html.src, browserSync.reload);
	gulp.watch(paths.css.src, css);
	gulp.watch(paths.js.src, browserSync.reload);
}



