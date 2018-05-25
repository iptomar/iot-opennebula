var TMenu = require('terminal-menu'),
  events = require('events'),
  util = require('util');

var Menu = function() {
  this.menu = TMenu({
    width: 29,
    x: 4,
    y: 2
  });
  this.location = 'HOME';
  this.selectedVM = undefined;
};

util.inherits(Menu, events.EventEmitter);

Menu.prototype.start = function() {
  var self = this;

  process.stdin.pipe(this.menu.createStream()).pipe(process.stdout);
  process.stdin.setRawMode(true);

  this.menu.on('select', function(label, index, id) {
    self.emit('selected', index, id, label, self.location);
  });
};

Menu.prototype.home = function() {
  this.location = 'HOME';
  this.menu.clear();
  this.menu.reset();
  this.menu.write('VM Manager\n');
  this.menu.write('-------------------------\n');

  this.menu.add('List VMs', 'list');
  this.menu.add('Create VM', 'create');

  this.menu.add('EXIT', 'exit');
  this.menu.redraw();
};

Menu.prototype.listVMs = function(vms) {
  this.location = 'LIST';
  this.menu.clear();
  this.menu.reset();
  this.menu.redraw();
  this.menu.write('VMs\n');
  this.menu.write('-------------------------\n');

  for (var i = 0; i < vms.length; i++) {
    this.menu.add(vms[i].ID + ' - ' + vms[i].STATE, vms[i].ID);
  }

  this.menu.add('HOME');
  this.menu.redraw();
};

Menu.prototype.detailsVM = function() {
  this.location = 'VM';
  this.menu.clear();
  this.menu.reset();
  this.menu.write('VM Details\n');
  this.menu.write('-------------------------\n');

  this.menu.add('Info', 'info');
  this.menu.add('Delete', 'delete');
  this.menu.add('Reboot', 'reboot');

  this.menu.add('HOME', 'home');
  this.menu.redraw();
};

module.exports = Menu;
