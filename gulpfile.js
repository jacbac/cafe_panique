var gulp = require('gulp');
var notify = require('gulp-notify');
var plumber = require('gulp-plumber');
var browserSync  = require('browser-sync').create();
var size = require('gulp-size');
var exec = require('child_process').exec;
var del = require('del');
var gPath = require('path');
var changed = require('gulp-changed');
var concat = require('gulp-concat');

// Styles
var postcss = require('gulp-postcss');
var sass =  require('gulp-sass');
var uncss = require('gulp-uncss');
var autoprefixer = require('autoprefixer');
var cssnano = require('cssnano');

// Scripts
var uglify = require('gulp-uglify');

// Images
var image = require('gulp-image');

// Deploy
var ghPages = require('gulp-gh-pages');

/* ========================================================================== */
/* CONFIG HELPER                                                              */
/* ========================================================================== */

var path = {
    src: {
        dir: 'src/',
        styles: 'styles/**/*.*',
        scripts: 'scripts/**/*.*',
        images: 'images/**/*.{png,jpg,jpeg,gif,svg,ico}',
        files: ['*']
    },
    dist: {
        dir: 'dist/',
        styles: 'styles/',
        scripts: 'scripts/',
        images: 'images/'
    }
};

var onError = function(err) {
    notify.onError({
        title:    'Gulp',
        subtitle: 'Failure!',
        message:  'Error: <%= error.message %>',
        // sound:    'Beep'
    })(err);

    this.emit('end');
};

/* ========================================================================== */
/* DEFAULT TASKS                                                              */
/* ========================================================================== */

// Static Server + watching scss/js/html files
gulp.task('default', ['serve']);

gulp.task('serve', ['scripts', 'files', 'images', 'styles'], function() {
    browserSync.init({
        server: {
            baseDir: "dist/"
        }
    });

    gulp.start('watchers');
});

/* ========================================================================== */
/* GENERAL TASKS                                                              */
/* ========================================================================== */

gulp.task('styles', function() {
    var processors = [
        autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }),
        cssnano()
    ];

    return gulp.src(path.src.dir + path.src.styles)
        .pipe(plumber({errorHandler: onError}))
        .pipe(sass())
        .pipe(size({
            // showFiles: true, // display a complete list of files
            title: "Before CSS optimize"
        }))
        .pipe(postcss(processors))
        .pipe(uncss({
            ignore: [/\.is-visible/, /\.test/],
            html: ['src/index.html']
        }))
        .pipe(size({
            // showFiles: true, // display a complete list of files
            title: "After CSS optimize"
        }))
        .pipe(concat('styles.min.css'))
        .pipe(gulp.dest(path.dist.dir + path.dist.styles))
        .pipe(browserSync.stream());
});

gulp.task('scripts', function() {
    return gulp.src(path.src.dir + path.src.scripts)
        .pipe(plumber({errorHandler: onError}))
        .pipe(size({
            // showFiles: true, // display a complete list of files
            title: "Before JS optimize"
        }))
        .pipe(uglify())
        .pipe(size({
            // showFiles: true, // display a complete list of files
            title: "After JS optimize"
        }))
        .pipe(concat('scripts.min.js'))
        .pipe(gulp.dest(path.dist.dir + path.dist.scripts))
});

gulp.task('files', function() {
    return gulp.src(path.src.dir + path.src.files)
        .pipe(plumber({errorHandler: onError}))
        .pipe(gulp.dest(path.dist.dir));
});

gulp.task('images', function() {
    return gulp.src(path.src.dir + path.src.images)
        // only files that has changed will pass through here
        .pipe(changed(path.dist.dir + path.dist.images))
        .pipe(size({
            // showFiles: true, // display a complete list of files
            title: "Before optimize"
        }))
        .pipe(plumber({errorHandler: onError}))
        .pipe(image())
        .pipe(size({
            // showFiles: true, // display a complete list of files
            title: "After optimize"
        }))
        .pipe(gulp.dest(path.dist.dir + path.dist.images));
});

/* ========================================================================== */
/* DEPLOY TASKS                                                               */
/* ========================================================================== */

gulp.task('dist', ['styles', 'scripts', 'files', 'images']);

gulp.task('deploy', ['dist'], function() {
    return gulp.src('./dist/**/*')
        .pipe(ghPages());
});

/* ========================================================================== */
/* WATCHER TASKS                                                              */
/* ========================================================================== */

var logEvent = function(event) {
    console.log('Event type: ' + event.type);
    console.log('Event path: ' + event.path);
};

gulp.task('watchers', function() {
    gulp.watch(path.src.dir + path.src.styles, ['styles'])
        .on('change', function (event) {
            logEvent(event);
        });

    gulp.watch(path.src.dir + path.src.scripts, ['scripts-watch'])
        .on('change', function (event) {
            logEvent(event);
        });

    gulp.watch(path.src.dir + path.src.images, ['images'])
        .on('change', function (event) {
            // https://github.com/gulpjs/gulp/blob/master/docs/recipes/handling-the-delete-event-on-watch.md
            if (event.type === 'deleted') {
                var srcFilePath  = gPath.relative(gPath.resolve(path.src.dir), event.path);
                var distFilePath = gPath.resolve(path.dist.dir, srcFilePath);

                del.sync(distFilePath);
            }

            logEvent(event);
        });

    gulp.watch(path.src.dir + '*.html', ['files'])
        .on('change', function (event) {
            logEvent(event);
        });

    gulp.watch(path.dist.dir + '*.html')
        .on('change', browserSync.reload);
});

// create a task that ensures the `scripts` task is complete before reloading browsers
gulp.task('scripts-watch', ['scripts'], browserSync.reload);
