'use strict';

let gulp = require('gulp');
let sass = require('gulp-sass');
var webpack = require("webpack");
var browserSync = require('browser-sync');
var watch = require('gulp-watch');
var exec = require('child_process').exec;

gulp.task('copy-ui-grid-css', () => {
    return gulp.src('./node_modules/angular-ui-grid/ui-grid.min.css')
        .pipe(gulp.dest('./assets/global/css/'))
});

gulp.task('copy-angular-i18n', () => {
    return gulp.src(["./node_modules/angular-i18n/angular-locale_pt-br.js", "./node_modules/angular-i18n/angular-locale_en-us.js", "./node_modules/angular-i18n/angular-locale_es-es.js", "./node_modules/angular-i18n/angular-locale_fr.js"])
        .pipe(gulp.dest('./assets/global/plugins/angularjs/i18n/'));

});

gulp.task('copy-flag-icons', () => {
    var paths = ['./node_modules/*flag-icon-css/*css/flag-icon.min.css', './node_modules/*flag-icon-css/*flags/**/br.*',
        './node_modules/*flag-icon-css/*flags/**/us.*', './node_modules/*flag-icon-css/*flags/**/es.*'];
    for (var path of paths) {
        gulp.src(path)
            .pipe(gulp.dest('./assets/global/css/'))
    }

});

gulp.task('sass-admin-layout', () => {
    return gulp.src('./sass/admin/layout/**/*.scss')
        .pipe(sass.sync({ sourceComments: 'map' }))
        .pipe(gulp.dest('./assets/admin/css/'))
});

gulp.task('sass-admin-pages', () => {
    return gulp.src('./sass/admin/pages*/**/*.scss')
        .pipe(sass.sync({ sourceComments: 'map' }))
        .pipe(gulp.dest('./assets/admin/css/'));
});

gulp.task('sass-global-components', () => {
    return gulp.src('./sass/global/**/*.scss')
        .pipe(sass.sync({ sourceComments: 'map' }))
        .pipe(gulp.dest('./assets/global/css/'));
});

gulp.task('sass-all', ['sass-admin-layout', 'sass-admin-pages', 'sass-global-components', 'copy-flag-icons']);

gulp.task('sass:watch', () => {
    gulp.watch('./sass/**/*.scss', ['sass-all']);
})


gulp.task("webpack", (callback) => {
    webpack(require('./webpack.config.js'), function (err, stats) {
        if (err)
            throw new gutil.PluginError("webpack", err);
        callback();
    });
});

gulp.task('tfs:watch', (path) => {
    return watch(['./app/**/*.*', './sass/**/*.scss', './css/**/*.css'], function (file) {
        for (var path of file.history) {
            switch (file.event) {
                case 'add':
                    return exec('tf add "' + path + '"');
                case 'unlink':
                    exec('tf undo "' + path + '"');
                    return exec('tf delete "' + path + '"');
            }
        }
    });
});

gulp.task('browser-sync', ['webpack'], () => {
    let options = {
        port: 8081,
        host: 'localhost',
        server: {
            baseDir: './'
        },
        ui: {
            port: 8080
        }
    }
    browserSync(['app/**/*.html', 'css/*.css', 'assets/**/*.*', 'js/**/*.*'], options);
})

gulp.task('webpack:watch', () => {
    gulp.watch(['./app/**/*.js', './assets/**/*.js'], ['webpack']);
});

gulp.task('default', ['sass-all', 'copy-angular-i18n', 'webpack']);