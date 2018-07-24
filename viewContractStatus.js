exports.viewContractStatus = function (src_addr, passphrase) {
    var fs = require('fs');
    var cm = require('./communication');
    var web3 = cm.communicationModule(src_addr, passphrase);
    var abi = fs.readFileSync("./contract_abi.json", 'utf8').replace('\n', '');
    var addr = fs.readFileSync("./contract_addr.ini", 'utf8').replace('\n', '');

    var tokenContract = web3.eth.contract(JSON.parse(abi)).at(addr);
    var balance = [
        tokenContract.balanceOf(web3.eth.accounts[0]).toString(),
        tokenContract.balanceOf(web3.eth.accounts[1]).toString()
    ];   

    var msg = 'viewContractStatus(' + src_addr + ', ' + passphrase + ') is invoked.';
    console.log(msg);

    msg = 'balanceOf(' + web3.eth.accounts[0] + ') = ' + balance[0] + '<br>';
    msg += 'balanceOf(' + web3.eth.accounts[1] + ') = ' + balance[1] + '<br>';

    return msg;
}
