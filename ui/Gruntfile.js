'use strict';

module.exports = function(grunt){
	//time how long task take. can help when optimizing build times
	require('time-grunt')(grunt);
	//automatically load required grunt tasks
	require('jit-grunt')(grunt, {
    	useminPrepare: 'grunt-usemin'
  	});

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		jshint : {
			options: {
				jshintrc:'.jshintrc',
				reporter: require('jshint-stylish')
			},
			all:{
				src:[
					'Gruntfile.js',
				'app/scripts/{,*/}*.js'
				]
			}
		},
		copy: {
	    	dist: {
	        	cwd: 'app/',
	        	src: [ '**','styles/**/*.css','scripts/**/*.js' ],
	        	dest: 'dist',
	        	expand: true
	    	},
	    	libraryCssFonts: {
	        	files:[
	              {
	                  //for bootstrap fonts
	                    expand: true,
	                    dot: true,
	                    cwd: 'bower_components/bootstrap/dist',
	                    src: ['fonts/*.*'],
	                    dest: 'dist/styles'
	                }, {
	                    //for font-awesome
	                    expand: true,
	                    dot: true,
	                    cwd: 'bower_components/font-awesome',
	                    src: ['fonts/*.*'],
	                    dest: 'dist/styles'
	                }
	          	]
	        },
	        configFiles: {
	        	files:[
	              {
	                  //for anular
	                    expand: true,
	                    dot: true,
	                    cwd: 'bower_components/angular',
	                    src: ['angular.js'],
	                    dest: 'dist/scripts/lib'
	                }, {
	                    //for ui router
	                    expand: true,
	                    dot: true,
	                    cwd: 'bower_components/angular-ui-router/release',
	                    src: ['angular-ui-router.js'],
	                    dest: 'dist/scripts/lib'
	                }, {
	                    //for resource
	                    expand: true,
	                    dot: true,
	                    cwd: 'bower_components/angular-resource',
	                    src: ['angular-resource.js'],
	                    dest: 'dist/scripts/lib'
	                }, {
	                    //for underscore
	                    expand: true,
	                    dot: true,
	                    cwd: 'bower_components/underscore',
	                    src: ['underscore.js'],
	                    dest: 'dist/scripts/lib'
	                }, {
	                    //for boostrap angular
	                    expand: true,
	                    dot: true,
	                    cwd: 'bower_components/angular-bootstrap',
	                    src: ['ui-bootstrap*.js'],
	                    dest: 'dist/scripts/lib'
	                },{
	                	//for ng-flow
	                    expand: true,
	                    dot: true,
	                    cwd: 'bower_components/ng-flow/dist',
	                    src: ['ng-flow-standalone.js'],
	                    dest: 'dist/scripts/lib'
	                }
	          	]
	        },
	        libraryCssFiles :{
	        	files: [
	        		{
	        			//for boostrap
	        			expand:true,
	        			dot:true,
	        			cwd : 'bower_components/bootstrap/dist/css',
	        			src : ['bootstrap*.css'],
	        			dest : 'dist/styles/lib'
	        		},
	        		{
	        			//for fontawesome
	        			expand : true,
	        			dot : true,
	        			cwd : 'bower_components/font-awesome/css',
	        			src : ['font-awesome.*.css'],
	        			dest : 'dist/styles/lib'
	        		}
	        	]
	        }
	    },
	    clean: {
	        build:{
	            src: [ 'dist/']
	        }
	    },
      // Filerev
    	filerev: {
        	options: {
            	encoding: 'utf8',
            	algorithm: 'md5',
            	length: 20
        	},
        	release: {
            	// filerev:release hashes(md5) all assets (images, js and css )
            	// in dist directory
            	files: [{
                	src: [
                    	'dist/scripts/*.js',
                    	'dist/styles/*.css',
                	]
            	}]
        	}
    	},
      // Usemin
      // Replaces all assets with their revved version in html and css files.
      // options.assetDirs contains the directories for finding the assets
      // according to their relative paths
    	usemin: {
    		//html: ['dist/*.html'],
        	html: ['dist/*.html'],
        	css: ['dist/styles/*.css'],
        	options: {
            	assetsDirs: ['dist', 'dist/styles']
        	}
    	},
    	watch: {
	        copy: {
	            files: [ 'app/**', 'app/**/*.css', 'app/**/*.js'],
	            tasks: [ 'build' ]
	        },
	        scripts: {
	            files: ['app/scripts/app.js'],
	            tasks:[ 'build']
	        },
	        styles: {
	            files: ['app/styles/mystyles.css'],
	            tasks:['build']
	        },
	        livereload: {
	            options: {
	                livereload: '<%= connect.options.livereload %>'
	            },
	            files: [
	                'app/{,*/}*.html',
	                '.tmp/styles/{,*/}*.css',
	                'app/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
	            ]
	      }
    	},
    	connect: {
      		options: {
        		port: 9000,
        		// Change this to '0.0.0.0' to access the server from outside.
        		hostname: 'localhost',
        		livereload: 35729
      		},
      		dist: {
        		options: {
          			open: true,
          			base:{
               			path: 'dist',
            			options: {
                			index: 'index.html',
                			maxAge: 300000
            			}
          			}
        		}
      		}
    	}
	});
	grunt.registerTask('build',[
		'clean',
		'jshint',
		'copy',
    	'usemin'
	]);
	grunt.registerTask('default',['build']);

	grunt.registerTask('serv',['build','connect:dist','watch']);

};