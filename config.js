const argv = require('minimist')(process.argv.slice(2));
const log = require('fancy-log');
const colors = require('ansi-colors');

const production = argv.production || argv.prod || argv._.indexOf('build') !== -1 || false;
const dest = 'public';

const path = {
	env: 'development',
	production: production,
	argv: argv,
	storage: production ? '/' : '/',

	build: {
		html: dest + '/',
		js: dest + '/js/',
		css: dest + '/css/',
		images: dest + '/img/',
		fonts: dest + '/fonts/',
		storage: dest + '/storage/'
	},
	src: {
		root: 'src',
		html: ['src/**/*.html', '!' + '/src_*.html'],
		js: [
			'./node_modules/jquery/dist/jquery.js',
			// './node_modules/@fancyapps/ui/src/Fancybox/Fancybox.js',
			'./node_modules/@fancyapps/fancybox/dist/jquery.fancybox.js',
			'./node_modules/lazysizes/lazysizes.js',
			'./node_modules/owl.carousel/dist/owl.carousel.js',
			'./node_modules/pannellum/build/pannellum.js',
			'./node_modules/zurb-twentytwenty/js/jquery.twentytwenty.js',
			'./node_modules/zurb-twentytwenty/js/jquery.event.move.js',
			'src/js/app.js'
		],
		scss: '/src/scss/style.scss',
		images: ['/src/img/**/*.{jpg,png,svg,gif,ico,webp,jfif}'],
		fonts: ['/src/fonts/*.woff', 'src/fonts/*.woff2'],
		storage: '/src/storage/*.*'
	},
	watch: {
		html: 'src/**/*.html',
		js: 'src/**/*.js',
		css: 'src/scss/**/*.scss',
		images: 'src/img/**/*.{jpg,png,svg,gif,webp,jfif}',
		storage: 'src/storage/*.*'
	},
	clean: './' + dest + '/',

	setEnv: function(env) {
		if (typeof env !== 'string') return;
		this.env = env;
		this.production = env === 'production';
		process.env.NODE_ENV = env;
		this.production ? this.setStorage('/wa-apps/blog/themes/ramtrucks/') : this.setStorage('/');
	},

	setStorage: function(storage) {
		if (typeof storage !== 'string') return;
		this.storage = storage;
		process.env.STORAGE = storage; 
	},

	logEnv: function() {
		log('Environment:', colors.white.bgRed(` ${process.env.NODE_ENV} `));
	},
}

const options = {
	browsersync: {
		server: { baseDir: './' + dest + '/' },
		notify: false,
		port: 3000
	},
	fileinclude: {
		prefix: '@@',
		basepath: '@file'
	},
	processhtml: {
		process: true,
		data: {
			path: path.storage
		}
	},
	htmlmin: {
		collapseWhitespace: true,
		removeComments: true
	},
	scss: {
		outputStyle: 'expanded'
	},
	autoprefixer: {
		grid: false,
		overrideBrowserslist: ['last 10 versions']
	},
	babel: {
		presets: ['@babel/env']
	}
}

module.exports = {path, options}