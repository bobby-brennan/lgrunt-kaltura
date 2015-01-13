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
      keys: {'partner_id': 'Partner ID', 'admin_secret': 'Admin Secret', 'user_id': 'User ID'}
    }

    config.ui = {
       components: {
        'listMedia': { type: 'angular', file: 'media-list.html'}, 
        'listPlaylists': { type: 'angular', file: 'playlist-list.html'},
        'like': { type: 'angular', file: 'like.html'},
       },
       pageHeader: 'header.html',
       pageFooter: 'footer.html',
       jsImports: ['js/kaltura-controllers.js']
    }
    config.clientFile = './kaltura/kaltura-raw-api.js';

    /*
    var toPush = [];
    config.functions.forEach(function(d) {
      if (d.operationId === 'like') {
        var unlike = JSON.parse(JSON.stringify(d));
        unlike.operationId = 'unlike';
        unlike.alias += ' Unlike';
        var checkLike = JSON.parse(JSON.stringify(d));
        checkLike.operationId = 'checkIfLikeExists';
        checkLike.alias += ' Check';
        toPush.push(unlike);
        toPush.push(checkLike);
      }
    })

    config.functions = config.functions.concat(toPush);
    */

    config.wrapperOnly = true;

    require('./copy-src-files.js').copy(grunt);

    grunt.file.expand(__dirname + '/../node_modules/lucy-rest-api-client/tasks').forEach(function(inpt) {console.log('tsk:' + inpt); grunt.loadTasks(inpt)});
    grunt.config('rest_api_client', {default_config: config});
    grunt.task.run('rest_api_client');
  });
}
