/*
 * rest-api-client
 * http://www.bbrennan.info
 *
 * Copyright (c) 2014 Bobby Brennan
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {
  grunt.registerTask('nyt_wrapper', 'A grunt plugin for generating wrappers the NYTimes API', function () {
    var config = grunt.config.get('nyt_wrapper');
    console.log('conf:' + JSON.stringify(config));
    config.swagger = grunt.file.readJSON(__dirname + '/../swagger/swagger.json');
    grunt.loadNpmTasks('lucy-rest-api-client');
    grunt.config('rest_api_client', {default_config: config});
    grunt.task.run('rest_api_client');
  });
}
