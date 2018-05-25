var OpenNebula = require('opennebula');

var one = new OpenNebula('oneadmin:opennebula', 'http://192.168.137.66:2633/RPC2');

one.version(function(err, data) {
  console.log(data);
});


var vm = one.getVM(0);

vm.info(function (err, data) {
  console.log(data);
});

vm.action('poweroff', function(err, data) {
  console.log(data);
});


var template = one.getTemplate(0);

template.instantiate('test_one', undefined, undefined, function(err, vm) {
  vm.info(function (err, data) {
    console.log(data);

    vm.action('delete', function(err, data) {
      console.log(data);
    });
  });
});
