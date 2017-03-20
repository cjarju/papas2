/* other build tasks: different from css/js optimization */

/* validation tasks: js, css, html, php */

/*
 jshint options
 * maxerr: allows you to set the max amount of warnings it will produce before giving up and returning an error. Default is 50.
 * asi: automatic semicolon insertion suppresses warnings about missing semicolons. A semicolon is optional in some cases
 * lastsemic: suppresses warnings only when the semicolon is omitted for the last statement in a one-line block
 * eqnull: suppresses "Use '===' to compare with 'null'" warnings
 * expr: suppresses "Expected an assignment or function call and instead saw an expression." warnings
 * loopfunc: suppresses "Don't make functions within a loop." warnings
 */

gulp.task('feuivalidatejs', function() {
    return gulp.src([bs.src+asts.js_dir+'*.js', '!'+bs.src+asts.js_dir+'*.min.js', '!'+bs.src+asts.js_dir+'bootstrap.js', '!'+bs.src+asts.js_dir+'jquery.js'])
        .pipe(gdebug()).on('error', gutil.log)
        .pipe(gjshint({asi: true}))
        .pipe(gjshint.reporter('jshint-stylish')) //.pipe(gjshint.reporter('default')) // default reporter
        //.pipe(gjshint.reporter('fail')) // fail task when a JSHint warning/error happens
        ;
});

gulp.task('beuivalidatejs', function() {
    return gulp.src([bs.src+admin.js_dir+'*.js', '!'+bs.src+admin.js_dir+'bootstrap.min.js', '!'+bs.src+admin.js_dir+'jquery.min.js'])
        .pipe(gdebug()).on('error', gutil.log)
        .pipe(gjshint({asi: true}))
        .pipe(gjshint.reporter('jshint-stylish')) //.pipe(gjshint.reporter('default')) // default reporter
        //.pipe(gjshint.reporter('fail')) // fail task when a JSHint warning/error happens
        ;
});

gulp.task('feuivalidatecss', function() {
    return gulp.src([bs.src+asts.css_dir+'agency.css', '!'+bs.src+asts.css_dir+'*.min.css'])
        .pipe(gdebug()).on('error', gutil.log)
        .pipe(gcsslint())
        .pipe(gcsslint.reporter('text'));
});

gulp.task('beuivalidatecss', function() {
    return gulp.src([bs.src+admin.css_dir+'admin.css', '!'+bs.src+admin.css_dir+'*.min.css'])
        .pipe(gdebug()).on('error', gutil.log)
        .pipe(gcsslint())
        .pipe(gcsslint.reporter('text'));
});

/* uses w3c online API */
gulp.task('gw3css', function() {
    return gulp.src([bs.src+asts.css_dir+'agency.css', '!'+bs.src+asts.css_dir+'*.min.css'])
        .pipe(gdebug()).on('error', gutil.log)
        .pipe(gw3css())
        .pipe(gulp.dest('tmp')) // if there are no errors or warnings in a file, the resulting file will be empty. Otherwise the file will contain errors and warnings as JSON object: { "errors":[ /* ... */ ],"warnings":[ /* ... */ ] }
        /* or
         .pipe(gutil.buffer(function(err, files) {
         // err - an error encountered
         // files - array of validation results
         // files[i].contents is empty if there are no errors or warnings found
         }))
         */
        ;
});

gulp.task('feuivalidatehtml', function() {
    //return gulp.src("./src/*.html")
    return gdownload('https://papasmedia.com/index.php') // set strictSSL option to false in the index.js file of gulp-download plugin
        .pipe(gdebug()).on('error', gutil.log)
        .pipe(ghtmlhint())
        .pipe(ghtmlhint.reporter("htmlhint-stylish"))
        .pipe(ghtmlhint.failReporter({ suppress: true }));
});

gulp.task('beuivalidatehtml', function() {
    //return gulp.src("./src/*.html")
    return gdownload('https://papasmedia.com/admin/services/index.php') // set strictSSL option to false in the index.js file of gulp-download plugin
        .pipe(gdebug()).on('error', gutil.log)
        .pipe(ghtmlhint())
        .pipe(ghtmlhint.reporter("htmlhint-stylish"))
        .pipe(ghtmlhint.failReporter({ suppress: true }));
});

gulp.task('gphpcs', function () {
    return gulp.src(['src/index.php'])
        // Validate files using PHP Code Sniffer
        .pipe(gdebug()).on('error', gutil.log)
        .pipe(gphpcs({
            bin: '../../bin/php/php5.6.15/phpcs.bat',
            standard: 'PSR2',
            extensions: 'php',
            warningSeverity: 0
        }))
        // Log all problems that was found
        .pipe(gphpcs.reporter('log')) // outputs all problems to the console
        //.pipe(gphpcs.reporter('file', { path: "path/to/report.txt" })) // outputs all problems to a file
        //.pipe(phpcs.reporter('fail')) // fails if a problem was found
        ;
});

// Delete the dist directory
gulp.task('cleandist', function() {
    return gulp.src(bs.dist+'*', {read: false})// don't read contents, get list only
        .pipe(gdebug()).on('error', gutil.log)
        .pipe(gclean());
});

gulp.task('feuicleandir', function() {
    return gulp.src([bs.dist+'*', '!'+bs.dist+'admin/'], {read: false})// don't read contents, get list only
        .pipe(gdebug()).on('error', gutil.log)
        .pipe(gclean());
});

gulp.task('beuicleandir', function() {
    return gulp.src(bs.dist+'admin/', {read: false})// don't read contents, get list only
        .pipe(gdebug()).on('error', gutil.log)
        .pipe(gclean());
});

// copy
gulp.task('copyapp2dist', function() {
    return gulp.src([bs.src+'**/*', '!'+bs.src+'**/scss{,/**}', '!'+bs.src+'**/less{,/**}'])
        .pipe(gchanged(bs.dist)) // Return files that have changed only
        .pipe(gdebug()).on('error', gutil.log)
        .pipe(gulp.dest(bs.dist));
});

gulp.task('feuicopydir', function() {
    return gulp.src([bs.src+'**/*', '!'+bs.src+'admin{,/**}', '!'+bs.src+'**/scss{,/**}', '!'+bs.src+'**/less{,/**}'])
        .pipe(gchanged(bs.dist)) // Return files that have changed only
        .pipe(gdebug()).on('error', gutil.log)
        .pipe(gulp.dest(bs.dist));
});

gulp.task('beuicopydir', function() {
    return gulp.src(bs.src+'admin/**/*')
        .pipe(gchanged(bs.dist+'admin')) // Return files that have changed only
        .pipe(gdebug()).on('error', gutil.log)
        .pipe(gulp.dest(bs.dist+'admin'));
});

//cleanup css/js directories
gulp.task('feuicleanup', function() {
    return gulp.src(
        [
            bs.dist+asts.css_dir+tmp_dir, bs.dist+asts.css_files, '!'+bs.dist+asts.css_dir+'feui-{main,glry}.min.css',
            bs.dist+asts.js_files, '!'+bs.dist+asts.js_dir+'feui-{core,cust,cont,glry}.min.js',
            bs.dist+asts.fonts_files, '!'+bs.dist+asts.fonts_dir+'fontawesome*', '!'+bs.dist+asts.fonts_dir+'glyphicons*',
            bs.dist+asts.data_dir+'*.sql'
        ]
        , {read: false}
    )// don't read contents, get list only
        .pipe(gdebug()).on('error', gutil.log)
        .pipe(gclean());
});

gulp.task('beuicleanup', function() {
    return gulp.src(
        [
            bs.dist+admin.css_dir+tmp_dir, bs.dist+admin.css_files, '!'+bs.dist+admin.css_dir+'beui-main.min.css',
            bs.dist+admin.js_files, '!'+bs.dist+admin.js_dir+'beui-{core,cust}.min.js', '!'+bs.dist+admin.js_dir+'beui-ajax.min.js',
            bs.dist+admin.fonts_files, '!'+bs.dist+admin.fonts_dir+'fontawesome*', '!'+bs.dist+admin.fonts_dir+'glyphicons*',
            bs.dist+admin.data_dir+'*.sql'
        ]
        , {read: false}
    )// don't read contents, get list only
        .pipe(gdebug()).on('error', gutil.log)
        .pipe(gclean());
});

/* optimize images */
gulp.task('feuioptimizeimages', function(){
    return gulp.src(bs.src+asts.img_dir+'{,logos/}*.+(png|jpg|gif|svg)')
        .pipe(gdebug()).on('error', gutil.log)
        .pipe(gimagemin())
        .pipe(gulp.dest(bs.dist+asts.img_dir))
});

gulp.task('beuioptimizeimages', function(){
    return gulp.src(bs.src+admin.img_dir+'*.+(png|jpg|gif|svg)')
        .pipe(gdebug()).on('error', gutil.log)
        .pipe(gimagemin())
        .pipe(gulp.dest(bs.dist+admin.img_dir))
});