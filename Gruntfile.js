module.exports = function(grunt) {

    grunt.initConfig({
        svgo: {
            optimize: {
                files: 'images/*.svg'
            }
        },
        webp: {
          foo:{
            src: ['images/*.jpg', 'images/*.png'],
            dest: 'webp/',
            options: {
                preset: 'photo',
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
              'style.min2.css': ['style.min.css']
            }
          },
          restructure: {
            options: {
              restructure: true,
              report: 'gzip'
            },
            files: {
              'style.min3.css': ['style.min2.css']
            }
          }
        }
    });

    grunt.loadNpmTasks('svgo-grunt');
    grunt.loadNpmTasks('grunt-csso');
    grunt.loadNpmTasks('grunt-webp');

    grunt.registerTask('default', ['svgo', /*'csso',*/ 'webp']);

};