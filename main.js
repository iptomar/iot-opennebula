var Menu = require('./lib/gui/menu.js'),
  OpenNebula = require('opennebula');

var one = new OpenNebula('oneadmin:opennebula', 'http://192.168.137.168:2633/RPC2');


/*
var blessed = require('blessed');

var screen = blessed.screen({
  smartCSR: true
});
screen.title = 'my window title';
var box = blessed.box({
  top: 'center',
  left: 'center',
  width: '50%',
  height: '50%',
  content: 'Headsfsafllo {bold}world{/bold}!',
  tags: true,
  border: {
    type: 'line'
  },
  style: {
    fg: 'white',
    bg: 'magenta',
    border: {
      fg: '#f0f0f0'
    }
  }
});
screen.render();
*/



var m = new Menu();
m.start();
m.home();

m.on('selected', function(index, id, label, location) {
  if(id === 'home') {
    m.home();
    return;
  } else if(id === 'exit') {
    m.menu.close();
    process.exit(0);
  }


  if (location === 'HOME') {
    switch (id) {
      case 'list':
        one.getVMs(function(err, data) {
          //popup
          m.listVMs(data);
        });
        break;
      case 'create':
        var template = one.getTemplate(0);
        template.instantiate('test_one', undefined, undefined, function(err, vm) {
          //popup
        });
        break;
    }
  }

  if (location === 'LIST') {
    m.selectedVM = parseInt(id);
    m.detailsVM();
  }

  if (location === 'VM') {
    var vm = one.getVM(m.selectedVM);

    switch (id) {
      case 'info':
        vm.info(function(err, data) {
          //console.log(err);
          //console.log(data);

          screen.append(box);
          box.key('enter', function(ch, key) {
            box.setContent('{right}Even different {black-fg}content{/black-fg}.{/right}\n');
            box.setLine(1, 'bar');
            box.insertLine(1, 'foo');
            screen.render();
          });
          box.focus();
        });
        break;
      case 'delete':
        vm.action('poweroff', function(err, data) {
          console.log(data);
        });
        break;
      case 'reboot':
        vm.action('reboot', function(err, data) {
          console.log(data);
        });
        break;
    }
  }
});
