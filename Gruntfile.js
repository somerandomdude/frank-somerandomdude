module.exports = function(grunt) {

    grunt.initConfig({
        clean: {
          dist: ['frank']
        },
        copy: {
          opt: {
            'images/src/*.svg' : 'images'  //svgo doesn't support dest:src optimization, so we copy SVG files over manually
          },
          dist: {
            files: {
              'frank/': ['./**',  '!./images/src/**', '!./node_modules/**', '!./stylesheets/**', '!./javascripts/coffeescripts/**', '!./docs/**',  '!./.git/**', '!./Gruntfile.js', '!./package.json', '!./config.rb', '!./*.md']
            }
          }
        },
        concat: {
          dist: {
            src: ['javascripts/defer-image-load.js', 'javascripts/frank.slideshow.js', 'javascripts/simplebox.js', 'javascripts/inline-comment.js', 'javascripts/main.js'],
            dest: 'javascripts/somerandomdude.js'
          }
        },
        jshint: {
          beforeconcat: ['javascripts/defer-image-load.js', 'javascripts/frank.slideshow.js', 'javascripts/simplebox.js'],
          afterconcat: ['javascripts/frank.js']
        },
        uglify: {
          dist: {
            files: {
              'javascripts/frank.js': ['javascripts/frank.js']
            }
          }
        },
        compress: {
          dist: {
            options: {
              archive: '../frank-dist.zip'
            },
            files: [
              {src: './frank/**', dest: './../'}
            ]
          }
        },
        coffee: {
          compile: {
            files: {
              'javascripts/defer-image-load.js': 'javascripts/coffeescripts/defer-image-load.coffee',
              'javascripts/frank.slideshow.js': 'javascripts/coffeescripts/frank.slideshow.coffee',
              'javascripts/simplebox.js': 'javascripts/coffeescripts/simplebox.coffee',
              'javascripts/inline-comment.js': 'javascripts/coffeescripts/inline-comment.coffee',
              'javascripts/main.js': 'javascripts/coffeescripts/main.coffee'
            }
          }
        },

        /**
         * This task requires Sass & Compass to be installed on your machine.
         *
         * - http://compass-style.org/install/
         * - http://sass-lang.com/download.html
         */
        sass: {
          dev: {
            options: {
                compass: true,
                style: 'expanded'
            },
            files: {
                'style.css': 'stylesheets/scss/style.scss',
                'ie.css': 'stylesheets/scss/ie.scss',
                'editor-style.css': 'stylesheets/scss/editor-style.scss',
                'print.css': 'stylesheets/scss/print.scss'
            }
          }
        },
        svgo: {
            optimize: {
              files: 'images/*.svg'
            }
        },
        imagemin: {
          dist: {
            options: {
              optimizationLevel: 3
            },
            files: [{
                    expand: true,
                    cwd: 'images/src',
                    src: '*.{png,jpg,jpeg}',
                    dest: 'images'
                }]
          }
        },
        webp: {
          optPNG:{
            src: ['images/*.png'],
            dest: 'images',
            options: {
                verbose: true,
                quality: 80,
                alphaQuality: 80,
                compressionMethod: 6,
                segments: 4,
                psnr: 42,
                sns: 50,
                filterStrength: 40,
                filterSharpness: 3,
                simpleFilter: true,
                partitionLimit: 50,
                analysisPass: 6,
                multiThreading: true,
                lowMemory: false,
                alphaMethod: 0,
                alphaFilter: 'best',
                alphaCleanup: true,
                noAlpha: false,
                lossless: true
              }
          },
          optJPG:{
            src: ['images/*.jpeg', 'images/*.jpg'],
            dest: 'images',
            options: {
                preset: 'photo',
                verbose: true,
                quality: 70,
                alphaQuality: 80,
                compressionMethod: 6,
                segments: 4,
                psnr: 42,
                sns: 50,
                filterStrength: 40,
                filterSharpness: 3,
                simpleFilter: true,
                partitionLimit: 50,
                analysisPass: 6,
                multiThreading: true,
                lowMemory: false,
                alphaMethod: 0,
                alphaFilter: 'best',
                alphaCleanup: true,
                noAlpha: true,
                lossless: false
              }
          }
        },
        csso: {
          compress: {
            options: {
              report: 'gzip'
            },
            files: {
              'style.min.css': ['style.css']
            }
          },
          restructure: {
            options: {
              restructure: true,
              report: 'gzip'
            },
            files: {
              'style.min.css': ['style.css']
            }
          }
        },
        csslint: {
          dist: {
            src: ['style.css']
          }
        },
        /**
         * Uses CSSCSS to analyse any redundancies in the CSS files.
         * - http://zmoazeni.github.io/csscss/
         */
        csscss: {
            options: {
                verbose: true
            },
            dist: {
                src: ['editor-style.css', 'ie.css', 'print.css', 'style.css']
            }
        },
        watch: {
            sass: {
                files: 'stylesheets/**/*.scss',
                tasks: ['sass:dev']
            },
            coffee: {
                files: 'javascripts/**/*.coffee',
                tasks: ['coffee:compile']
            },
            concat: {
              files: ['javascripts/defer-image-load.js', 'javascripts/frank.slideshow.js', 'javascripts/simplebox.js', 'javascripts/inline-comment.js', 'javascripts/main.js'],
              tasks: ['concat:dist']
            }
        },
        markdown: {
          docs: {
            files: ['*.md'],
            dest: './',
            options: {
              gfm: true,
              highlight: 'manual',
              codeLines: {
                before: '<span>',
                after: '</span>'
              }
            }
          }
        },
        contributors: {
          master: {
            path: 'CONTRIBUTORS.md',
            branch: 'master',
            chronologically: true
          }
        },
        phpcs: {
          application: {
              dir: './**.php'
          },
          options: {
              bin: 'vendor/squizlabs/php_codesniffer/scripts/phpcs',
              standard: 'WordPress'
          }
        }
    });

    grunt.loadNpmTasks('svgo-grunt');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-coffee');
    grunt.loadNpmTasks('grunt-contrib-compress');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-csslint');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-csso');
    grunt.loadNpmTasks('grunt-csscss');
    grunt.loadNpmTasks('grunt-git-contributors');
    grunt.loadNpmTasks('grunt-markdown');
    grunt.loadNpmTasks('grunt-phpcs');
    grunt.loadNpmTasks('grunt-webp');

    grunt.registerTask('default', ['coffee', 'concat', 'sass:dev', 'watch']);

    /**
     * Grunt tasks that help improve code quality.
     */
    grunt.registerTask('test', ['phpcs', 'sass:dev', 'csscss:dist', 'csslint:dist', 'jshint:beforeconcat']);

    /*
    * Grunt tasks which build a clean theme for deployment
    */
    grunt.registerTask('dist', ['clean:dist', 'copy:dist', 'compress:dist', 'clean:dist']);
    grunt.registerTask('opt', ['copy:opt', 'svgo', 'imagemin', 'webp:optPNG', 'webp:optJPG', /*'uglify:dist',*/ 'sass:dev', 'csso:restructure']);
    grunt.registerTask('docs', ['contributors', 'markdown']);

};