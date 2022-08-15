const { src, dest, task, watch, parallel, series } = require('gulp')
const browsersync = require('browser-sync').create()
const autoprefixer = require('gulp-autoprefixer')
const scss = require('gulp-sass')(require('sass'))
const group_media = require('gulp-group-css-media-queries')
const del = require('del')
// const imagemin = require('gulp-imagemin')
const uglify = require('gulp-uglify-es').default
// const babel = require('gulp-babel')
// const browserfy = require('gulp-browserify')
const csso = require('gulp-csso')
const concat = require('gulp-concat')
// const htmlmin = require('gulp-htmlmin')
const processhtml = require('gulp-processhtml')
const fileinclude  = require('gulp-file-include')
const criticalCss = require('gulp-critical-css');

const log = require('fancy-log');

const { path, options } = require('./config.js')

function browserSync() {
	browsersync.init(options.browsersync)
}

function html() {
	return src(path.src.html)
		.pipe(fileinclude(options.fileinclude))
		.pipe(processhtml(options.processhtml))
		// .pipe(htmlmin(options.htmlmin))
		.pipe(dest(path.build.html))
}

function sass() {
	return src(path.src.scss)
		.pipe(scss(options.scss))
		.pipe(group_media())
		.pipe(autoprefixer(options.autoprefixer))
		.pipe(csso())
		.pipe(criticalCss())
		.pipe(concat('style.min.css'))
		.pipe(dest(path.build.css))
}

function js() {
	return src(path.src.js)
		.pipe(concat('app.min.js'))
		// .pipe(babel(options.babel))
		// .pipe(browserfy())
		.pipe(uglify())
		.pipe(dest(path.build.js))
}

function images() {
	return src(path.src.images)
		// .pipe(imagemin())
		.pipe(dest(path.build.images))
}

function fonts() {
	return src(path.src.fonts)
		.pipe(dest(path.build.fonts))
}

function storage() {
	return src(path.src.storage)
		.pipe(dest(path.build.storage))
}

function clean() {
	return del(path.clean)
}

const setmodeProd = done => {
	path.setEnv('production');
	path.logEnv();
 
	done();
};
 
 const setmodeDev = done => {
	path.setEnv('development');
	path.logEnv();
 
	done();
};

const build = mode => {
	const setMode = mode === 'production' ? setmodeProd : setmodeDev;
	return series(
		setMode,
		'html',
	);
};

task('clean', clean)
task('fonts', fonts)
task('storage', storage)
task('js', js)
task('sass', sass)
task('html', html)
task('images', images)

task('build', build('production'))
task('build:development', build('development'))

task('watch', () => {
	browserSync()

	watch(path.watch.html, parallel(html)).on('change', browsersync.reload)
	watch(path.watch.css, parallel(sass)).on('change', browsersync.reload)
	watch(path.watch.js, parallel(js)).on('change', browsersync.reload)
	watch(path.watch.images, parallel(images)).on('change', browsersync.reload)
	watch(path.watch.storage, parallel(storage)).on('change', browsersync.reload)
})