const EthSwap = artifacts.require("EthSwap");
const Token = artifacts.require("Token");
module.exports = async function(deployer) {
   // deploy LWC token
   await deployer.deploy(Token);

  const token = await Token.deployed(); //instance
  
  // deploying EthSwap Token
  await deployer.deploy(EthSwap  , token.address); // in second argument you are giving token address to the constructor in EthSwap.sol
  const ethSwap = await EthSwap.deployed();

  // transfer all token to eth swap token
  await token.transfer(ethSwap.address, '1000000000000000000000000');
  
};
