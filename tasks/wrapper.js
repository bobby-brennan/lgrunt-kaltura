/*
 * rest-api-client
 * http://www.bbrennan.info
 *
 * Copyright (c) 2014 Bobby Brennan
 * Licensed under the MIT license.
 */

'use strict';
module.exports = function (grunt) {
  var Mkdirp = require('mkdirp');
  var FS = require('fs');

  grunt.registerTask('kaltura_demo', 'A grunt plugin for generating demos for the Kaltura API', function () {
    var config = grunt.config.get('kaltura_demo');
    if (config.destDir) {
      Mkdirp.sync(config.destDir);
      process.chdir(config.destDir);
      config.destDir = null;
    }

    config.secrets = {
      keyPage: "http://kmc.kaltura.com/index.php/kmc/kmc4#account|overview",
      keys: {'partner_id': 'Partner ID', 'admin_secret': 'Admin Secret'}
    }

    config.ui = {
       components: {
        'listMedia': { type: 'angular', file: 'media-list.html', jsImports: ['js/media-list.js'] },
        'listPlaylists': { type: 'angular', file: 'playlist-list.html', jsImports: ['js/playlist-list.js'] },
       },
       pageHeader: 'header.html',
       pageFooter: 'footer.html'
    }
    config.clientFile = './kaltura/kaltura-raw-api.js';
    config.wrapperOnly = true;

    require('./copy-src-files.js').copy(grunt);

    grunt.file.expand(__dirname + '/../node_modules/lucy-rest-api-client/tasks').forEach(function(inpt) {console.log('tsk:' + inpt); grunt.loadTasks(inpt)});
    grunt.config('rest_api_client', {default_config: config});
    grunt.task.run('rest_api_client');
  });
}
