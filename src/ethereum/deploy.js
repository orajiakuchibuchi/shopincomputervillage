const HDWalletProvider = require("truffle-hdwallet-provider");
const Web3 = require("web3");
const investment = require('./build/Investment.json');
// Replace with your secret key/phrase. Note ensure to to leave variable empthy when pushing up to git
const SECRET_KEY = '0419704b67cd4ae5b47bd64cdc1d57a8';
// Replace with your network provider. Note ensure to to leave variable empthy when pushing up to git
const NETWORK_PROVIDER = 'https://rinkeby.infura.io/v3/7531886b34e74dbf852bc787c8b87ca9';
const provider = new HDWalletProvider( SECRET_KEY, NETWORK_PROVIDER );

const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log("Attempting to deploy from account", accounts[0]);
  console.log(accounts);

  const result = await new web3.eth.Contract(
    JSON.parse(investment.interface)
    ).deploy({ data: investment.bytecode })
    .send({ gas: "1000000", gasPrice: '5000000000', from: accounts[0] });

  console.log("Contract deployed to", result.options.address);
};
deploy();
