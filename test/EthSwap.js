// Truffle provide you way to write down the test for solidity in javascript

const { assert } = require("chai");

const EthSwap = artifacts.require("EthSwap");
const Token = artifacts.require("Token");

require("chai")
  .use(require("chai-as-promised"))
  .should();

contract("EthSwap", ([deployer, investor]) => {
  const token_convertor = (n) => {
    return web3.utils.toWei(n, "ether");
  };

  let token, ethSwap;

  before(async () => {
    token = await Token.new();
    ethSwap = await EthSwap.new(token.address);
    await token.transfer(ethSwap.address, token_convertor("1000000"));
  });
  describe("EthSwap Deployment", async () => {
    it("EthSwap contract name test", async () => {
      const name = await ethSwap.name();
      assert.equal(name, "EthSwap instant Exchange");
    });

    it("ES contract has token ", async () => {
      let balance = await token.balanceOf(ethSwap.address);
      assert.equal(balance.toString(), token_convertor("1000000"));
    });
  });

  describe("Token Deployment", async () => {
    it("Token contract name test", async () => {
      const name = await token.name();
      assert.equal(name, "LWC Token");
    });
  });

  describe("Buy the Tokens", async () => {
    let result;
    before(async () => {
      result = await ethSwap.buy_token({
        from: investor,
        value: token_convertor("1"),
      });
    });
    it("allow user to Buy LWC token from ethswap", async () => {
      // here we are checking investor balance after purchsed LWC token
      let investorBalance = await token.balanceOf(investor);
      assert.equal(investorBalance.toString(), token_convertor("100"));

      // check eth swap balance
      let ethSwapBalance1 = await token.balanceOf(ethSwap.address);
      assert.equal(ethSwapBalance1.toString(), token_convertor("999900")); // 999900 will convert in wei unit

      let ethSwapBalance = await web3.eth.getBalance(ethSwap.address); // here we are checking balance of ethswap contract
      assert.equal(ethSwapBalance.toString(), web3.utils.toWei("1", "Ether"));

      const event = result.logs[0].args;
      assert.equal(event.account, investor);
      assert.equal(event.token, token.address);
      assert.equal(event.amount.toString(), token_convertor("100").toString());
      assert.equal(event.rate.toString(), "100");
      // console area
      // let temp = result.logs[0].args
      // console.log(temp.amount.toString());
    });
  });

  describe("sell token", async () => {
    let result;

    before(async () => {
      // investor must approve tokens before the purchase
      // simply we have to approve the token before sell them
      await token.approve(ethSwap.address, token_convertor("100"), {
        from: investor,
      });
      // then they can sell the token
      result = await ethSwap.sellToken(token_convertor("100"), {
        from: investor,
      });
    });

    it("Allow user to sell token on our ETHSwap platform", async () => {
      // checking balance after selling token
      let investorSellBalance = await token.balanceOf(investor);
      assert.equal(investorSellBalance.toString(), token_convertor("0"));

      // check eth swap balance
      let ethSwapSellBalance1 = await token.balanceOf(ethSwap.address);
      assert.equal(ethSwapSellBalance1.toString(), token_convertor("1000000"));

      // check the ethswap ether balance after sell the token
      let ethSwapEtherBalance = await web3.eth.getBalance(ethSwap.address);
      assert.equal(
        ethSwapEtherBalance.toString(),
        token_convertor("0", "Ether")
      );

      // here we are checking event getting or not

      const sellEvent = result.logs[0].args;
      assert.equal(sellEvent.account, investor);
      assert.equal(sellEvent.token, token.address);
      assert.equal(
        sellEvent.amount.toString(),
        token_convertor("100").toString()
      );
      assert.equal(sellEvent.rate.toString(), "100");

      // FAILURE: investor can't sell more tokens than they have
      await ethSwap.sellToken(token_convertor("500"), { from: investor }).should
        .be.rejected;
    });
  });
});
