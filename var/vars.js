var bs = {
        root: 'papas2/',
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

exports.bs = bs;
exports.asts = asts;
exports.admin = admin;
exports.feui_srv_url = feui_srv_url;
exports.beui_srv_url = beui_srv_url;
exports.tmp_dir = tmp_dir;

