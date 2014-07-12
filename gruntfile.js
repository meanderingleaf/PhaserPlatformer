module.exports = function(grunt) {
  grunt.initConfig({
    
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      options: {
        // define a string to put between each file in the concatenated output
        separator: ';'
      },
      dist: {
        // the files to concatenate
        src: ['src/**/*.js'],
        // the location of the resulting JS file
        dest: 'js/<%= pkg.name %>.js'
      }
    },
    watch: {
      scripts: {
        files: ['src/**/*.js'],
        tasks: ['concat'],
        options: {
          spawn: false,
        },
      },
    },
    connect: {
        target:{
            options: {
                port: 9001
            }
        }
    }
      
  });
    

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-connect');
    
    grunt.registerTask('default', ['connect','watch']);
    grunt.registerTask('build', ['concat']);
    grunt.registerTask('server', ['connect']);
};