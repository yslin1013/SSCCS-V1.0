exports.getContractSource = function (c_name) {
    var fs = require('fs');
    var contract = fs.readFileSync("./" + c_name + ".sol");
    var msg = 'getContractSource(' + c_name + '.sol) is invoked.';
    console.log(msg);
    return contract;
}
