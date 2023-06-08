// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

contract CustomToken {

    // public variables
    string public name;
    string public symbol;
    uint256 public totalSupply;

    mapping(address => uint256) public balanceOf;

    address public owner;

    // events
    event Transfer(address indexed from, address indexed to, uint256 value);
    event Burn(address indexed from, uint256 value);
    event Mint(address indexed to, uint256 value);

    // modifiers(s)
    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can call this function");
        _;
    }

    constructor(string memory _name, string memory _symbol, uint256 _totalSupply) {
        name = _name;
        symbol = _symbol;
        totalSupply = _totalSupply;
        balanceOf[msg.sender] = _totalSupply;
        owner = msg.sender;
    }


    // for any user to transfer some tokens
    function transfer(address _to, uint256 _value) public {
        require(balanceOf[msg.sender] >= _value, "Your balance is insufficient");

        balanceOf[msg.sender] -= _value;
        balanceOf[_to] += _value;

        emit Transfer(msg.sender, _to, _value);
    }

    // for any user to burn (destroy) some tokens
    function burn(uint256 _value) public {
        require(balanceOf[msg.sender] >= _value, "Your balance is insufficient");

        balanceOf[msg.sender] -= _value;
        totalSupply -= _value;

        emit Burn(msg.sender, _value);
        emit Transfer(msg.sender, address(0), _value);
    }


    // for owner to mint tokens to a provided address
    function mint(address _to, uint256 _value) public onlyOwner {
        balanceOf[_to] += _value;
        totalSupply += _value;

        emit Mint(_to, _value);
        emit Transfer(address(0), _to, _value);
    }
}
