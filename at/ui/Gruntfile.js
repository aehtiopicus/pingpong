'use strict';

/*global module:false*/
module.exports = function(grunt) {

    //main conf file
    var conf = grunt.file.readJSON('berazategui.json');

    require( conf.grunt.master )(grunt, conf);
	
    //tasks    
    grunt.registerTask('default', ['core-default'] );
    
    grunt.registerTask('tmp-web', ['core-tmp-web'] );
	
    grunt.registerTask('test',  ['core-test']);
    
    grunt.registerTask('package', ['core-package'] );
    
    grunt.registerTask('run',  ['core-run'] );
	
    grunt.registerTask('export', ['core-export'] );

    grunt.registerTask('deploy', ['core-deploy'] );
	
     //add custom task
	
};
