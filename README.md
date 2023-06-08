# Create-and-Mint-Token
A custom token smart contract on the local HardHat network

## Description

Implementing a custom Token contract where owner is able to mint tokens to a provided address, and any user is able to burn and transfer tokens. 

## Getting Started

### Installing

* All necessary installations are pre-installed on Remix online IDE
* Copy the raw file "MyCustomToken.sol" from the contracts folder within this repository
* Launch the Remix online IDE with the url https://remix.ethereum.org

### Executing program

* In Remix, create a new file inside the "contracts" folder on the File explorer displayed on the left
* Paste the raw copy from MyCustomToken.sol (as below) in the new file you created.


```
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

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
```

* Compile the contract by clicking on the "Solidity Compiler" button on the outermost left menu bar (or use the shortcut "Ctrl + S")
* Just below the "Solidity Compiler" button, find and use the "Deploy and Run transactions" button to deploy the smart contract
* Ensure to input the constructor arguments correctly in the deployment interface
* On successful deployment, find and click on the "Deployed Contracts" heading to see a drop down of an interface through which the contract can be interacted with
* Find the provided test accounts under the "ACCOUNTS" field of the interface on the left
* Copy any of the addresses listed in the format 0x5B3...eddC4 (100 ether) for use as input to the interfaces that require an address when interacting with the contract
* Test interact with the various functions of the smart contract

## Help

Ensure that the smart contract file you create is named with a ".sol" file extension

## Author(s)

Name: Adeola David Adelakun

Email: adesdesk@outlook.com


## License

This project is licensed under the MIT License - see the LICENSE.md file for details
