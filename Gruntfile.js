module.exports = function(grunt) {

    grunt.initConfig({
        connect: {
            server: {
                options: {
                    port: 8080,
                    base: './dist',
                    keepalive: true,
                    debug: true
                }
            }
        },
        concat: {
            js: {
                files: {
                    'dist/js/user.js': [
                        'modules/user/js/UserController.js',
                        'modules/user/js/AuthService.js',
                        'modules/user/js/UserRoute.js',
                        'modules/user/js/AuthDialog.js'],
                    'dist/js/noti.js': [
                        'modules/noti/js/NotiController.js',
                        'modules/noti/js/NotiService.js',
                        'modules/noti/js/NotiRoute.js'],
                   
                    'dist/js/qa.js': [
                        'modules/qa/js/QaController.js',
                        'modules/qa/js/QaService.js',
                        'modules/qa/js/QaRoute.js'],
                    'dist/js/admin.js': [
                        'modules/admin/js/AdminController.js',
                        'modules/admin/js/AdminService.js',
                        'modules/admin/js/AdminRoute.js'
                        ],
                    'dist/js/vote.js': [
                        'modules/vote/js/VoteController.js',
                        'modules/vote/js/VoteService.js',
                        'modules/vote/js/VoteRoute.js'
                        ],
                    'dist/js/scan.js': [
                        'modules/scan/js/ScanController.js',
                        'modules/scan/js/ScanService.js',
                        'modules/scan/js/ScanRoute.js'
                        ],    
                    'dist/js/settings.js': [
                        'modules/settings/js/SettingsController.js',
                        'modules/settings/js/SettingsRoute.js'
                        ],
                    'dist/js/message.js': [
                        'modules/message/js/Message.js'
                        ],
                    'dist/lib/langs/zh_CN.js': 'assets/langs/zh_CN.js'
                }
            }
        },
        bowercopy: {
            dependencies: {
                options: {
                    destPrefix: 'dist/lib/'
                },
                files: {
                    'angular-jwt.min.js': 'angular-jwt/dist/angular-jwt.min.js',
                    'angular-ui-tinymce.min.js': 'angular-ui-tinymce/dist/tinymce.min.js',
                    'tinymce.min.js': 'tinymce-dist/tinymce.min.js',
                    'plugins': 'tinymce-dist/plugins',
                    'skins': 'tinymce-dist/skins',
                    'themes': 'tinymce-dist/themes'
                }
            },  
            assets: {
                options: {
                    destPrefix: 'dist/',
                    srcPrefix: ''
                },
                files: {
                    assets: 'assets/*'
                }
            },
            html: {
                options: {
                    srcPrefix: '',
                    destPrefix: 'dist/'
                },
                files: {
                    'index.html': 'index.html',
                    'views': 'modules/*/views/*.html'
                }
            }
        },
        uglify: {
            js: {
                files: [{
                    expand: true,
                    cwd: 'dist',
                    src: 'js/*.js',
                    dest: 'dist/'
                },{
                    'dist/app.js': 'app.js'
                }]
            }
        },
        clean: 'dist'
    });

    grunt.loadNpmTasks('grunt-bowercopy');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-connect');

    grunt.registerTask('build', ['concat','bowercopy','uglify']);
    grunt.registerTask('mock','Run this app on a mock http server.',function() {
        grunt.task.run('clean');
        grunt.task.run('build');
        grunt.task.run('connect');
    });
};