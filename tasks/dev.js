/* dev tasks */

/* initialize browser obj */
gulp.task('browserSync', function() {
    return browserSync.init({
        proxy: "https://localhost/devajax/src/"
    })
});

/* reload browser */
gulp.task('browserReload', function() {
    return browserSync.reload();
});

/* compile scss --> css */
gulp.task('sass', function() {
    return gulp.src(bs.src+asts.scss_files) // Return all files ending with .scss in src/assets/scss and children dirs
        .pipe(gcached('assetscss', {optimizeMemory: true})).on('error', gutil.log) // Return files that have changed only
        .pipe(gsass()).on('error', gutil.log) // Compile and return CSS files
        .pipe(gulp.dest(bs.src+asts.css_dir)) // Write CSS files
    //.pipe(browserSync.stream()) // Inject changes into browser without reload. redundant as there's a watcher for css dir
});

gulp.task('devbuild', ['browserSync', 'sass'], function (){

    gulp.watch(bs.src+asts.scss_files, ['sass']);

    gulp.watch([bs.src+asts.css_files, bs.src+asts.js_files], function(event) {
        gutil.log('File: ' + gutil.colors.green(path.basename(event.path)) + ' was ' + event.type + '.');
        browserSync.reload();
    });

    gulp.watch(bs.src+'index.php').on('change', function(file) {
        gutil.log('File: ' + gutil.colors.green(path.basename(file.path)) + ' was changed.');
        browserSync.reload();
    });
});


gulp.task('test', function() {
    console.log('test task'+test);
});

