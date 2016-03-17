module.exports = function( grunt ){
    'use strict';

    grunt.initConfig({
        pkg: grunt.file.readJSON( 'package.json' ),

        watch: {
            less: {
                files: [ 'design/*.less' ],
                tasks: [ 'less', 'postcss', 'cssmin', 'lesshint' ]
            },
            react: {
                files: 'components/*.jsx',
                tasks: [ 'production', 'development' ]
            }
        },

        postcss: {
            options: {
                map: true,
                processors: [
                    require( 'autoprefixer' )(),
                    require( 'postcss-opacity' )()
                ]
            },
            default: {
                src: 'design/style.css',
                dest: 'design/style.prefix.css'
            }
        },

        cssmin: {
            default: {
                options: {
                    compatibility: 'ie8',
                    advanced: false, // Needed for property override
                    sourceMap: true,
                    rebase: false
                },
                src: [ 'design/style.prefix.css' ],
                dest: 'dist/design/style.min.css'
            }
        },

        less: {
            default: {
                options: {
                    paths: [ 'design/' ],
                    sourceMap: true,
                    sourceMapFilename: 'design/style.css.map',
                    sourceMapURL: 'style.css.map',
                    sourceMapBasepath: 'design',
                    sourceMapRootpath: 'design'
                },
                src: 'design/style.less',
                dest: 'design/style.css'
            }
        },

        lesshint: {
            default: {
                options: {
                    force: true,
                    lesshintrc: true
                },
                files: {
                    src: [ 'design/**/*.less' ]
                }
            }
        },

        eslint: {
            components: {
                options: {
                    configFile: '.jsxeslintrc'
                },
                files: {
                    src: [ 'components/**/*.jsx' ]
                }
            }
        },

        browserify: {
            options: {
                transform: [ 'babelify' ],
                browserifyOptions: {
                    extensions: [ '.jsx', 'jsx' ]
                }
            },
            client: {
                src: [ 'components/App.jsx' ],
                dest: 'dist/scripts/app.built.js'
            }
        },

        uglify: {
            client: {
                src: [ 'dist/scripts/app.built.js' ],
                dest: 'dist/scripts/app.min.js'
            }
        },

        env: {
            dev : {
                NODE_ENV : 'development'
            }
        }

    });

    require( 'load-grunt-tasks' )( grunt );

    grunt.registerTask( 'development', [ 'env:dev', 'browserify' ] );
    grunt.registerTask( 'production', [ 'eslint:components', 'browserify', 'uglify' ] );
};
