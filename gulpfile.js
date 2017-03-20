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
    runSequence         = require('run-sequence'),              // runs a sequence of gulp tasks in the specified order
    requireDir          = require('require-dir')                // split tasks across multiple files
    ;

/* note: variable scope
 *  local variables defined here cannot be accessed in tasks/*.js files and vice-versa unless you export and import them (require).
 *  for example: var path = 'src/assets/css/' cannot be accessed in tasks/build.js
 * */

 /* import file/dir paths variables */
var fsvars = require('./var/vars.js');
bs = fsvars.bs;
asts = fsvars.asts;
admin = fsvars.admin;
feui_srv_url = fsvars.feui_srv_url;
beui_srv_url = fsvars.beui_srv_url;
tmp_dir = fsvars.tmp_dir;

/* include config from tasks folder: order important - should be after variable import so scripts can use them */
var tasks = requireDir('tasks');

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

gulp.task('default', function() {
    console.log('default task')
});




