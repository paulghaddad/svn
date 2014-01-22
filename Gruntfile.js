module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    
    concat: {
      dist: {
        src: ['js/main/*.js', 'js/plugins/*.js'],
        dest: 'js/build/production.js'
      }
    },

    uglify: {
        build: {
            src: 'js/build/production.js',
            dest: 'js/build/production.min.js'
        }
    }, 

    imagemin: {                          // Task
      dynamic: {                         // Another target
        files: [{
          expand: true,                  // Enable dynamic expansion
          cwd: 'img/',                   // Src matches are relative to this path
          src: ['**/*.{png,jpg,gif}'],   // Actual patterns to match
          dest: 'img/build/'                  // Destination path prefix
        }]
      }
    },

    sass: {                              // Task
      dist: {                            // Target
        options: {                       // Target options
          style: 'compressed'
        },
        files: {                         // Dictionary of files
          'css/styles.css': 'sass/styles.scss'      // 'destination': 'source'
        }
      }
    },

    autoprefixer: {

      single_file: {
        src: 'css/styles.css',
        dest: 'css/build/styles.css'
      },
    },

    watch: {
      scripts: {
        files: ['js/main/*.js', 'js/plugins/*.js'],
        tasks: ['concat','uglify'],
        options: {
          spawn: false,
        },
      },

      css: {
        files: 'sass/*.scss',
        tasks: ['sass'],
        options: {
          spawn: true,
        },
      },

      styles: {
          files: ['css/styles.css'],
          tasks: ['autoprefixer']
      },

    }

  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-autoprefixer');

  // Default task(s).
  grunt.registerTask('default', ['concat', 'uglify', 'imagemin', 'sass', 'autoprefixer', 'watch']);
 

};