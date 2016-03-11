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
                        'modules/noti/js/NotiRoute.js']
                }
            }
        },
        bowercopy: {
            dependencies: {
                options: {
                    destPrefix: 'dist/lib/'
                },
                files: {
                    'angular-ui-router.min.js': 'angular-ui-router/release/angular-ui-router.min.js',
                    'angular-permission.min.js': 'angular-permission/dist/angular-permission.min.js',
                    'angular-permission.min.js.map': 'angular-permission/dist/angular-permission.min.js.map',
                    'angular-messages.min.js': 'angular-messages/angular-messages.min.js',
                    'angular-messages.min.js.map': 'angular-messages/angular-messages.min.js.map',
                    'angular-material.min.js': 'angular-material/angular-material.min.js',
                    'angular-jwt.min.js': 'angular-jwt/dist/angular-jwt.min.js',
                    'angular-aria.min.js': 'angular-aria/angular-aria.min.js',
                    'angular-aria.min.js.map': 'angular-aria/angular-aria.min.js.map',
                    'angular-animate.min.js': 'angular-animate/angular-animate.min.js',
                    'angular-animate.min.js.map': 'angular-animate/angular-animate.min.js.map',
                    'angular.min.js': 'angular/angular.min.js',
                    'angular.min.js.map': 'angular/angular.min.js.map',
                    'angular-ui-tinymce.min.js': 'angular-ui-tinymce/dist/tinymce.min.js',
                    'tinymce/tinymce.min.js': 'tinymce-dist/tinymce.min.js',
                    'tinymce/plugins': 'tinymce-dist/plugins',
                    'tinymce/skins': 'tinymce-dist/skins',
                    'tinymce/themes': 'tinymce-dist/themes'
                }
            },
            assets: {
                options: {
                    destPrefix: 'dist/',
                    srcPrefix: ''
                },
                files: {
                    assets: 'assets/*',
                    'assets/angular-material.min.css': 'bower_components/angular-material/angular-material.min.css'
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

    grunt.registerTask('build', ['concat','uglify','bowercopy']);
    grunt.registerTask('mock','Run this app on a mock http server.',function() {
        grunt.task.run('clean');
        grunt.task.run('build');
        grunt.task.run('connect');
    });
};