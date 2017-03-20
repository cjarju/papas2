var path                = require('path');                      // node.js core module: contains utilities for handling and transforming file paths
    gulp                = require('gulp'),                      // task runner module: automate build tasks
    gdebug              = require('gulp-debug'),                // debug vinyl file streams to see what files are run through your gulp pipeline
    gutil               = require('gulp-util'),                 // utilities for gulp: log, replaceExtension, isStream, etc
    gconcat             = require('gulp-concat'),               // concatenate files
    grename             = require('gulp-rename'),               // rename files
    gclean              = require('gulp-clean'),                // delete files/directories
    gchanged            = require('gulp-changed'),              // only pass through changed files (compares with destination)
    gcached             = require('gulp-cached'),               // only pass through changed files (compares with an in-memory cache of files)
    gsourcemaps         = require('gulp-sourcemaps'),           // write or load source maps files
    gsass               = require('gulp-sass'),                 // compile sass to css using libsass
    guncss              = require('gulp-uncss'),                // remove unused css
    gautoprefixer       = require('gulp-autoprefixer'),         // parse css and add vendor prefixes to rules
    gcombinemq          = require('gulp-combine-mq'),           // combine matching media queries into one media query definition
    gcssc               = require('gulp-css-condense'),         // minify css
    gcsso               = require('gulp-csso'),                 // minify css
    gstripCssComments   = require('gulp-strip-css-comments'),   // remove css comments esp. important ones usually not removed by minifiers
    gstripComments      = require('gulp-strip-comments'),       // remove comments from JSON, JavaScript, CSS, HTML, etc
    guglify             = require('gulp-uglify'),               // minify and mangle js
    guseref             = require('gulp-useref'),               // parse build blocks in HTML files to replace references to js or css
    gulpif              = require('gulp-if'),                   // conditionally handle specific types of streams (e.g. those returned by useref)
    gdownload           = require('gulp-download'),             // download files via http/https.
    gjshint             = require('gulp-jshint'),               // js validation: detect errors and potential problems in js code
    gw3css              = require('gulp-w3c-css'),              // css validation using W3C CSS Validation Service
    gcsslint            = require('gulp-csslint'),              // css validation
    ghtmlhint           = require('gulp-htmlhint'),             // html validation
    gphpcs              = require('gulp-phpcs'),                // php validation
    gimagemin           = require('gulp-imagemin'),             // optimize images
    lazypipe            = require('lazypipe'),                  // create an immutable, lazily-initialized pipeline (code reusage)
    browserSync         = require('browser-sync').create(),     // synchronize with browser during development
    runSequence         = require('run-sequence')               // runs a sequence of gulp tasks in the specified order
    ;

var bs = {
        root: 'papas1/',
        src:  'src/',
        dist: 'dist/'
    }
    , asts = {
        scss_dir:       'assets/scss/',     scss_files:     'assets/scss/*.scss',
        css_dir:        'assets/css/',      css_files:      'assets/css/*.css',
        js_dir:         'assets/js/',       js_files:       'assets/js/*.js',
        img_dir:        'assets/images/',   img_files:      'assets/images/**/*.@(jpeg|jpg|gif|png)',
        fonts_dir:      'assets/fonts/',    fonts_files:    'assets/fonts/*',
        data_dir:       'assets/data/',     data_files:     'assets/data/*',
        incl_dir:       'includes/'
    }
    , admin = {
        scss_dir:       'admin/assets/scss/',   scss_files:     'admin/assets/scss/*.scss',
        css_dir:        'admin/assets/css/',    css_files:      'admin/assets/css/*.css',
        js_dir:         'admin/assets/js/',     js_files:       'admin/assets/js/*.js',
        img_dir:        'admin/assets/images/', img_files:      'admin/assets/images/**/*.@(jpeg|jpg|gif|png)',
        fonts_dir:      'admin/assets/fonts/',  fonts_files:    'admin/assets/fonts/*',
        data_dir:       'admin/assets/data/',   data_files:     'admin/assets/data/*',
        incl_dir:       'admin/includes/'
    }
    , feui_srv_url = 'https://localhost/'+bs.root+bs.dist
    , beui_srv_url = 'https://localhost/'+bs.root+bs.dist+'admin/'
    , tmp_dir      = 'tmp/'
    ;

/* build tasks: clean, copy, css/js/image optimization, cleanup */

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

/*
 css optimization notes
 .pipe(gcombinemq()) //unsafe, things might go wrong: read is_it_safe_2_consolidate doc under assets_tools
 */

/* optimize css/js task: all in one (aio) */

/*
 To match upstream Bootstrap's (v3.6) level of browser compatibility, set autoprefixer's browsers option to:
 ["Android 2.3", "Android >= 4", "Chrome >= 20", "Firefox >= 24", "Explorer >= 8", "iOS >= 6", "Opera >= 12", "Safari >= 6"]
 */

var feuiCssTasks = lazypipe()
    .pipe(guncss, {
        html: [feui_srv_url,
            feui_srv_url+'about',
            feui_srv_url+'services',
            feui_srv_url+'gallery',
            feui_srv_url+'contact'],
        ignore: [/\.*navbar-shrink*/, /\.alert*/, /\.*close*/, /\.has-success*/, /\.has-warning*/, /\.has-error*/, /help-block/,
            /\.popover*/, /\.tooltip*/, /\.modal*/, /\.carousel*/, /\.affix*/, /\.fade*/, /\.dropdown*/, /\.*collaps*/, /\.*active*/,
            /\.*cb-hidden*/, /\.fa-*/,
            /\.rg-view*/, /rg-loading/, /\.es-nav*/,
            /\.quick_button*/]
    })
    .pipe(gstripCssComments, {preserve: false})
    .pipe(gautoprefixer, { browsers: ["Android 2.3", "Android >= 4", "Chrome >= 20", "Firefox >= 24", "Explorer >= 8",  "iOS >= 6", "Opera >= 12", "Safari >= 6"], cascade:false })
    .pipe(gcsso);

/* I can also the admin stylesheet instead of specifying the selectors: has the same effect */
var beuiCssTasks = lazypipe()
    .pipe(guncss, {
        html: [beui_srv_url, beui_srv_url+'about/edit?id=1',
            beui_srv_url+'users/', beui_srv_url+'users/new', beui_srv_url+'users/edit?id=1',
            beui_srv_url+'services/', beui_srv_url+'services/new', beui_srv_url+'services/edit?id=1',
            beui_srv_url+'gallery/', beui_srv_url+'gallery/new', beui_srv_url+'gallery/edit?id=1'],
        ignore: [/\.*navbar-shrink*/, /\.alert*/, /\.*close*/, /\.has-success*/, /\.has-warning*/, /\.has-error*/, /help-block/,
            /\.popover*/, /\.tooltip*/, /\.modal*/, /\.carousel*/, /\.affix*/, /\.fade*/, /\.dropdown*/, /\.*collaps*/, /\.*active*/,
            /\.ls_*/, /\.grow*/, /\.*notification*/, /\.*error*/]
    })
    .pipe(gstripCssComments, {preserve: false})
    .pipe(gautoprefixer, { browsers: ["Android 2.3", "Android >= 4", "Chrome >= 20", "Firefox >= 24", "Explorer >= 8",  "iOS >= 6", "Opera >= 12", "Safari >= 6"], cascade:false })
    .pipe(gcsso);
/*
 useref: parses the build blocks, replaces them, concatenate the assets, returns the new stream (that contains the references)
 and concatenated streams (*.css and/or *.js).

 For modifications of assets, use gulp-if to conditionally handle specific types of assets and not process the html/php stream.

 gulpif(condition, func1(), optionalFunc2())
 * you can run multiple functions if a single stream type is expected (js or css)
 * if mixed streams (html/php, css and/or js) are expected as when you run useref, you must use lazypipe to run multiple functions

 var csstasks = lazypipe()
 .pipe(gcssc, optionalArg, optionalArg)
 .pipe(gcsso, optionalArg, optionalArg);

 */

// optimize css/js
gulp.task('feuioptimizecssjs', function () {
    return gulp.src([bs.src+'contact.php', bs.src+'gallery.php', bs.src+'_head_elems.php', bs.src+'_footer.php']) // files that contains the references
        .pipe(gdebug()).on('error', gutil.log)
        .pipe(guseref())
        .pipe(gulpif('*.css', feuiCssTasks()))
        .pipe(gulpif('*.js', guglify()))
        .pipe(gulp.dest(bs.dist)); // dir to write new stream that contains the references
});

// optimize css/js

/* backend ui requires authentication. disable it first before running task
 comment out contents of  admin/includes/_restrict.php file temporarily
 */

gulp.task('beuioptimizecssjs', function () {
    gulp.src([bs.src+admin.incl_dir+'_head_elements.php', bs.src+admin.incl_dir+'_footer.php']) // files that contains the references
        .pipe(gdebug()).on('error', gutil.log)
        .pipe(guseref())
        .pipe(gulpif('*.css', beuiCssTasks()))
        .pipe(gulpif('*.js', guglify()))
        .pipe(gulp.dest(bs.dist+admin.incl_dir)); // dir to write new streams _head_elements.php, _footer.php

    /* minify beui-ajax.min.js used on index of users, services, gallery only */
    return gulp.src(bs.dist+admin.js_dir+'beui-ajax.min.js')
        .pipe(gdebug()).on('error', gutil.log)
        .pipe(guglify())
        .pipe(gulp.dest(bs.dist+admin.js_dir));
});

/* optimize css/js separated tasks: all in many (aim) */

/* css optimization step by step */

var concat_file         = 'concat',
    concat_glry_file    = 'concatglry';

/* concat css files in the desired order */
gulp.task('feuiconcatcss', function () {
    gulp.src(bs.dist+asts.css_dir+'{bootstrap.min,ie10-viewport-bug,agency,share-buttons,font-awesome}.css')
        .pipe(gdebug()).on('error', gutil.log)
        .pipe(gconcat(concat_file+'.css'))
        .pipe(gulp.dest(bs.dist+asts.css_dir));
    return gulp.src(bs.dist+asts.css_dir+'{elastislide,gallery}.css')
        .pipe(gdebug()).on('error', gutil.log)
        .pipe(gconcat(concat_glry_file+'.css'))
        .pipe(gulp.dest(bs.dist+asts.css_dir));
});

gulp.task('beuiconcatcss', function () {
    return gulp.src(bs.dist+admin.css_dir+'{bootstrap.min,font-awesome,admin}.css')
        .pipe(gdebug()).on('error', gutil.log)
        .pipe(gconcat(concat_file+'.css'))
        .pipe(gulp.dest(bs.dist+admin.css_dir));
});

// remove unused css
/*
 for php files you have to connect to the server to fetch the generated html file
 prevent js injected css from being removed using the ignore option

 uncss creates a stream with the same name, writes to it as it processes the CSS definitions. for this reason you can't save the
 output stream in the same directory as the source.
 */
gulp.task('feuiuncss', function() {
    return gulp.src([bs.dist+asts.css_dir+concat_file+'.css', bs.dist+asts.css_dir+concat_glry_file+'.css'])
        .pipe(guncss({
            html: [feui_srv_url,
                feui_srv_url+'about',
                feui_srv_url+'services',
                feui_srv_url+'gallery',
                feui_srv_url+'contact'],
            ignore: [/\.*navbar-shrink*/, /\.alert*/, /\.*close*/, /\.has-success*/, /\.has-warning*/, /\.has-error*/, /help-block/,
                /\.popover*/, /\.tooltip*/, /\.modal*/, /\.carousel*/, /\.affix*/, /\.fade*/, /\.dropdown*/, /\.*collaps*/, /\.*active*/,
                /\.*cb-hidden*/, /\.fa-*/,
                /\.rg-view*/, /rg-loading/, /\.es-nav*/,
                /\.quick_button*/]
        }))
        .pipe(gulp.dest(bs.dist+asts.css_dir+tmp_dir));
});

gulp.task('beuiuncss', function() {
    return gulp.src(bs.dist+admin.css_dir+concat_file+'.css')
        .pipe(guncss({
            html: [beui_srv_url, beui_srv_url+'about/edit?id=1',
                beui_srv_url+'users/', beui_srv_url+'users/new', beui_srv_url+'users/edit?id=1',
                beui_srv_url+'services/', beui_srv_url+'services/new', beui_srv_url+'services/edit?id=1',
                beui_srv_url+'gallery/', beui_srv_url+'gallery/new', beui_srv_url+'gallery/edit?id=1'],
            ignore: [/\.*navbar-shrink*/, /\.alert*/, /\.*close*/, /\.has-success*/, /\.has-warning*/, /\.has-error*/, /help-block/,
                     /\.popover*/, /\.tooltip*/, /\.modal*/, /\.carousel*/, /\.affix*/, /\.fade*/, /\.dropdown*/, /\.*collaps*/, /\.*active*/,
                     /\.ls_*/, /\.grow*/, /\.*notification*/, /\.*error*/]
        }))
        .pipe(gulp.dest(bs.dist+admin.css_dir+tmp_dir));
});

/* minify css */

gulp.task('feuiminifycss', function () {
    gulp.src(bs.dist+asts.css_dir+tmp_dir+concat_file+'.css')
        .pipe(gdebug()).on('error', gutil.log)
        .pipe(gstripCssComments({preserve: false}))
        .pipe(gautoprefixer({ browsers: ["Android 2.3", "Android >= 4", "Chrome >= 20", "Firefox >= 24", "Explorer >= 8",  "iOS >= 6", "Opera >= 12", "Safari >= 6"], cascade:false }))
        .pipe(gcsso())
        .pipe(grename({ basename: 'feui-main', extname: '.min.css'}))
        .pipe(gulp.dest(bs.dist+asts.css_dir));
    return gulp.src(bs.dist+asts.css_dir+tmp_dir+concat_glry_file+'.css')
        .pipe(gdebug()).on('error', gutil.log)
        .pipe(gstripCssComments({preserve: false}))
        .pipe(gautoprefixer({ browsers: ["Android 2.3", "Android >= 4", "Chrome >= 20", "Firefox >= 24", "Explorer >= 8",  "iOS >= 6", "Opera >= 12", "Safari >= 6"], cascade:false }))
        .pipe(gcsso())
        .pipe(grename({ basename: 'feui-glry', extname: '.min.css'}))
        .pipe(gulp.dest(bs.dist+asts.css_dir));
});

gulp.task('beuiminifycss', function () {
    return gulp.src(bs.dist+admin.css_dir+tmp_dir+concat_file+'.css')
        .pipe(gdebug()).on('error', gutil.log)
        .pipe(gstripCssComments({preserve: false}))
        .pipe(gautoprefixer({ browsers: ["Android 2.3", "Android >= 4", "Chrome >= 20", "Firefox >= 24", "Explorer >= 8",  "iOS >= 6", "Opera >= 12", "Safari >= 6"], cascade:false }))
        .pipe(gcsso())
        .pipe(grename({ basename: 'beui-main', extname: '.min.css'}))
        .pipe(gulp.dest(bs.dist+admin.css_dir));
});

/* js optimization step by step */

var concat_core_file  = 'concatcore',
    concat_cust_file  = 'concatcust',
    concat_cont_file  = 'concatcont'
    //,concat_glry_file  = 'concatglry'
    ;

/* concat js files in the desired order */
gulp.task('feuiconcatjs', function () {
    gulp.src(bs.dist+asts.js_dir+'{jquery.min,jquery.easing.min,jquery.tmpl.min,bootstrap.min,ie10-viewport-bug}.js')
        .pipe(gdebug()).on('error', gutil.log)
        .pipe(gconcat(concat_core_file+'.js'))
        .pipe(gulp.dest(bs.dist+asts.js_dir));

    gulp.src(bs.dist+asts.js_dir+'{cbpAnimatedHeader.min,agency,share-buttons}.js')
        .pipe(gdebug()).on('error', gutil.log)
        .pipe(gconcat(concat_cust_file+'.js'))
        .pipe(gulp.dest(bs.dist+asts.js_dir));

    gulp.src(bs.dist+asts.js_dir+'{jqBootstrapValidation,contact_me}.js')
        .pipe(gdebug()).on('error', gutil.log)
        .pipe(gconcat(concat_cont_file+'.js'))
        .pipe(gulp.dest(bs.dist+asts.js_dir));

    return gulp.src(bs.dist+asts.js_dir+'{elastislide,gallery}.js')
        .pipe(gdebug()).on('error', gutil.log)
        .pipe(gconcat(concat_glry_file+'.js'))
        .pipe(gulp.dest(bs.dist+asts.js_dir));
});

gulp.task('beuiconcatjs', function () {
    gulp.src(bs.dist+admin.js_dir+'{jquery.min,bootstrap.min,ie10-viewport-bug}.js')
        .pipe(gdebug()).on('error', gutil.log)
        .pipe(gconcat(concat_core_file+'.js'))
        .pipe(gulp.dest(bs.dist+admin.js_dir));

    return gulp.src(bs.dist+admin.js_dir+'admin.js')
        .pipe(gdebug()).on('error', gutil.log)
        .pipe(gconcat(concat_cust_file+'.js'))
        .pipe(gulp.dest(bs.dist+admin.js_dir));
});

/* minify js */

gulp.task('feuiminifyjs', function () {
    gulp.src(bs.dist+asts.js_dir+concat_core_file+'.js')
        .pipe(gdebug()).on('error', gutil.log)
        .pipe(guglify())
        .pipe(grename({ basename: 'feui-core', extname: '.min.js'}))
        .pipe(gulp.dest(bs.dist+asts.js_dir));
    gulp.src(bs.dist+asts.js_dir+concat_cust_file+'.js')
        .pipe(gdebug()).on('error', gutil.log)
        .pipe(guglify())
        .pipe(grename({ basename: 'feui-cust', extname: '.min.js'}))
        .pipe(gulp.dest(bs.dist+asts.js_dir));
    gulp.src(bs.dist+asts.js_dir+concat_cont_file+'.js')
        .pipe(gdebug()).on('error', gutil.log)
        .pipe(guglify())
        .pipe(grename({ basename: 'feui-cont', extname: '.min.js'}))
        .pipe(gulp.dest(bs.dist+asts.js_dir));
    return gulp.src(bs.dist+asts.js_dir+concat_glry_file+'.js')
        .pipe(gdebug()).on('error', gutil.log)
        .pipe(guglify())
        .pipe(grename({ basename: 'feui-glry', extname: '.min.js'}))
        .pipe(gulp.dest(bs.dist+asts.js_dir));
});

gulp.task('beuiminifyjs', function () {
    gulp.src(bs.dist+admin.js_dir+concat_core_file+'.js')
        .pipe(gdebug()).on('error', gutil.log)
        .pipe(guglify())
        .pipe(grename({ basename: 'beui-core', extname: '.min.js'}))
        .pipe(gulp.dest(bs.dist+admin.js_dir));
    gulp.src(bs.dist+admin.js_dir+concat_cust_file+'.js')
        .pipe(gdebug()).on('error', gutil.log)
        .pipe(guglify())
        .pipe(grename({ basename: 'beui-cust', extname: '.min.js'}))
        .pipe(gulp.dest(bs.dist+admin.js_dir));
    return gulp.src(bs.dist+admin.js_dir+'beui-ajax.min.js')
        .pipe(gdebug()).on('error', gutil.log)
        .pipe(guglify())
        .pipe(gulp.dest(bs.dist+admin.js_dir));
});

/* edit index.php or the right file(s) to use final js and css file(s) using link tags */

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

/* When task-name is called, Gulp will run task-one first. When task-one finishes, Gulp will automatically start task-two.
Finally, when task-two is complete, Gulp will run task-three.*/

gulp.task('build', function(callback) {
    runSequence('cleandist', 'copyapp2dist',
                'feuioptimizecssjs', 'feuicleanup', 'feuioptimizeimages',
                'beuioptimizecssjs', 'beuicleanup', 'beuioptimizeimages',
                 callback);
});

gulp.task('feuibuild', function(callback) {
    runSequence('feuicleandir', 'feuicopydir', 'feuioptimizecssjs', 'feuicleanup', 'feuioptimizeimages', callback);
});

gulp.task('beuibuild', function(callback) {
    runSequence('beuicleandir', 'beuicopydir', 'beuioptimizecssjs', 'beuicleanup', 'beuioptimizeimages', callback);
});


/* Gulp first runs task-one. When task-one is completed, Gulp runs every task in the second argument simultaneously.
All tasks in this second argument must be completed before task-three is run.
gulp.task('task-name', function(callback) {
    runSequence('task-one', ['tasks','two','run','in','parallel'], 'task-three', callback);
});
 */

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
        .pipe(gdebug()).on('error', gutil.log)
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

gulp.task('default', function() {
    console.log('default task')
});




