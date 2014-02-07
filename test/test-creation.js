/*global describe, beforeEach, it*/
'use strict';

var path    = require('path');
var helpers = require('yeoman-generator').test;


describe('cli-titanium-project generator', function () {
  beforeEach(function (done) {
    helpers.testDirectory(path.join(__dirname, 'temp'), function (err) {
      if (err) {
        return done(err);
      }

      this.app = helpers.createGenerator('cli-titanium-project:app', [
        '../../app'
      ]);
      done();
    }.bind(this));
  });

  it('creates expected files', function (done) {
    var expected = [
      // add files you expect to exist here.
      '.jshintrc',
      'package.json',
      'tiapp.xml',
      'launcher',
      'dev_server/server.coffee'
    ];

    helpers.mockPrompt(this.app, {
      'author':      'John Doe',
      'appname':     'Test App',
      'bundle_id':   'com.test.test-app',
      'description': 'Dolor exercitationem voluptas harum atque eligendi alias quas?',
      'url':         'http://example.com/',
      'version':     '0.0.0',
      'options':     [ 'use_tests', 'use_server' ]
    });
    this.app.options['skip-install'] = true;
    this.app.run({}, function () {
      helpers.assertFiles(expected);
      done();
    });
  });
});
