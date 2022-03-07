pragma solidity 0.8.11;

import "./Token.sol";

contract EthSwap {
    string public name = "EthSwap instant Exchange";
    Token public token;
    uint256 redemption_rate = 100; // 1ether = 100 LWC Token

    event TokensPurchased(
        address account,
        address token,
        uint256 amount,
        uint256 rate
    );
    event TokensSold(
        address account,
        address token,
        uint256 amount,
        uint256 rate
    );

    constructor(Token _token) public {
        // where this token address is coming see the 2_deploy_contract.js in migration folder
        token = _token; // we store the token contract address to a state variable called token
    }

    function buy_token() public payable {
        // this function transfer the token to that person from ethswap contract account blaance to that person account balance

        // calculate value for transfer function
        // 1 ether = 100 LWC token
        // value = 1 * 100 you will get the how many lWC token will transfer
        uint256 tokenAmount = redemption_rate * msg.value;

        require(token.balanceOf(address(this)) >= tokenAmount);

        token.transfer(msg.sender, tokenAmount); // msg is the global variable and sender is basically value of address that's calling this transfer function

        // design Emit the even transfer
        emit TokensPurchased(
            msg.sender,
            address(token),
            tokenAmount,
            redemption_rate
        );
    }

    function sellToken(uint256 _amount) public {
        // user cant send the token they have

        require(_amount <= token.balanceOf(msg.sender));

        // amount = how many LWC Token they want to sell suppose 100 token so 100 token will pass in _amount
        // here we are creating sell function

        // ** now we are calculating the amount of ehter to give the msg.sender

        uint256 etherAmount = _amount / redemption_rate;

        require(address(this).balance >= etherAmount);

        // ** now we are transfering lWC token from user account to ehtswap contract adress
        token.transferFrom(msg.sender, address(this), _amount); // this function is transfering amount on the behalf of investor(msg.sender)
        address payable invstr = payable(msg.sender);
        invstr.transfer(etherAmount); // this is not ERC20 transfer function

        // here we are emitting the event

        emit TokensSold(msg.sender, address(token), _amount, redemption_rate);
    }
}
