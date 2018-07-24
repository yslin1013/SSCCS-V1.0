exports.transferTokens = function (src_addr, passphrase, amount, dst_addr) {
    var fs = require('fs');
    var cm = require('./communication');
    var web3 = cm.communicationModule(src_addr, passphrase);
    var abi = fs.readFileSync("./contract_abi.json", 'utf8').replace('\n', '');
    var addr = fs.readFileSync("./contract_addr.ini", 'utf8').replace('\n', '');
    
    var tokenContract = web3.eth.contract(JSON.parse(abi)).at(addr);
    tokenContract.transfer(dst_addr, amount);

    var msg = 'transferTokens(' + src_addr + ', ' + passphrase + ', ' 
                                + amount + ', ' + dst_addr + ') is invoked.';
    console.log(msg);

    var msg = '[Transaction] token transfer<br>' + 
              'from = ' + src_addr + '<br>' +
              'to = ' + dst_addr + '<br>' +
              'amount = ' + amount + '<br>' +
              'Please wait a moment.';

    return msg;
}
