module.exports = function (grunt) {

    // Project configuration
    grunt.initConfig({

        // Copy all src/ dir in a dist/ dir
        copy: {
            dist: {
                files: [
                    { expand: true, cwd: 'src/', src: '**', dest: 'dist/' }
                ]
            }
        },

        // Remove unused CSS across multiple files, compressing the final output
        uncss: {
            dist: {
                files: {
                    'dist/css/compiled.min.css': ['dist/index.html']
                }
            },
            options: {
                compress: true,
                ignore: ['.is-visible'],
            }
        },

        // Uglify JS
        uglify: {
            dist: {
                files: {
                    'dist/js/compiled.min.js': ['src/js/*.js']
                }
            }
        },

        // Process
        processhtml: {
            dist: {
                files: {
                    'index.html': ['dist/index.html']
                }
            }
        },

        // Clean pre-compiled files
        clean: ['dist/css/main.css', 'dist/css/bootstrap.css', 'dist/js/main.js'],

        // Clean pre-compiled files
        watch: {
            src: {
                files: ['src/js/*.js', 'src/css/*.css', 'src/index.html'],
                tasks: ['default'],
            },
        }
    });

    // Load the plugins
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-uncss');
    grunt.loadNpmTasks('grunt-processhtml');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-clean');

    // Default tasks.
    grunt.registerTask('default', ['copy', 'uncss', 'uglify', 'processhtml', 'clean']);
};
