exports.communicationModule = function (account, passphrase) {
    var Web3 = require('web3');
    var ethereumUri = 'http://localhost:8545';
    var web3 = new Web3(new Web3.providers.HttpProvider(ethereumUri));

    if(web3.personal.unlockAccount(account, passphrase)) {
        console.log(account + ' is unlocked');
        web3.eth.defaultAccount = account;
        return web3;
    }
    else {
        console.log(account + ' unlock failed');
        return null;
    }
}
