'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');

function generateGUID() {
  /* jshint bitwise:false */
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random()*16|0, v = c === 'x' ? r : (r&0x3|0x8);
    return v.toString(16);
  });
}

function bundleIdFromName(props) {
  return "com." + _.slugify(props.author) + "." + _.slugify(props.appname);
}

function notBlank(val) {
  return val && val !== "";
}

function notSpecifiedFilter(val) {
  return val === "" ? "not specified" : val;
}

var CliTitaniumProjectGenerator = module.exports = function CliTitaniumProjectGenerator(args, options, config) {
  /* jshint unused:false */
  yeoman.generators.Base.apply(this, arguments);

  this.on('end', function () {
    this.installDependencies({ skipInstall: options['skip-install'] });
  });

  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(CliTitaniumProjectGenerator, yeoman.generators.Base);

CliTitaniumProjectGenerator.prototype.askFor = function askFor() {
  var cb = this.async();

  // have Yeoman greet the user.
  console.log(this.yeoman);

  var prompts = [{
    type:    'input',
    name:    'author',
    message: 'Your name please:'
  }, {
    type:     'input',
    name:     'appname',
    message:  'What will you call your app?',
    validate: notBlank
  }, {
    type:     'input',
    name:     'bundle_id',
    message:  'What is the bundle ID?',
    default:  bundleIdFromName,
    validate: notBlank
  }, {
    type:     'input',
    name:     'version',
    message:  'What version would you like to start with?',
    default:  '0.0.0',
    validate: notBlank
  }, {
    type:    'input',
    name:    'description',
    message: 'Provide a short description for your app:',
    filter:  notSpecifiedFilter
  }, {
    type:    'input',
    name:    'url',
    message: 'What is the URL for the project wenpage (if any)'
  }, {
    type:    'checkbox',
    name:    'options',
    message: 'Extras:',
    choices: [{
      name:    'Include a testing framework (mocha, chai, sinon, mockti)',
      value:   'use_tests',
      checked: true
    }, {
      name:    'Use an express server for local (offline) development',
      value:   'use_server',
      checked: false
    }]
  }];

  this.prompt(prompts, function (props) {
    /* jshint camelcase:false */
    this.author      = props.author;
    this.appname     = props.appname;
    this.bundle_id   = props.bundle_id;
    this.description = props.description;
    this.url         = props.url;
    this.version     = props.version;
    this.use_tests   = props.options.use_tests;
    this.use_server  = props.options.use_server;
    this.guid        = generateGUID();
    this.copyright   = new Date().getFullYear() + (this.author ? " " + this.author : "");

    cb();
  }.bind(this));
};

CliTitaniumProjectGenerator.prototype.app = function app() {
  this.mkdir('app');
  this.mkdir('app/templates');

  this.copy('_package.json', 'package.json');
};

CliTitaniumProjectGenerator.prototype.projectfiles = function projectfiles() {
  this.copy('jshintrc', '.jshintrc');
};
