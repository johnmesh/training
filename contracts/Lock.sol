// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.4;

// Import this file to use console.log
import "hardhat/console.sol";

contract Lock {
    uint256 public unlockTime = 6000;
    address payable public owner;

    struct Person {
        uint256 age;
        string name;
        uint256 size;
    }

    event Withdrawal(uint256 amount, uint256 when);

    constructor(uint256 _unlockTime) payable {
        require(
            block.timestamp < _unlockTime,
            "Unlock time should be in the future"
        );

        unlockTime = _unlockTime;
        owner = payable(msg.sender);
    }

    function withdraw() public {
        // Uncomment this line to print a log in your terminal
        // console.log("Unlock time is %o and block timestamp is %o", unlockTime, block.timestamp);

        require(block.timestamp >= unlockTime, "You can't withdraw yet");
        require(msg.sender == owner, "You aren't the owner");

        emit Withdrawal(address(this).balance, block.timestamp);

        owner.transfer(address(this).balance);
    }

    function whiteListAddress(string memory name) public view {
        string memory fname = name;
        string memory lname = fname;
        lname = "John";
        console.log(fname);

        Person memory person = Person({age: 30, name: "Loibon", size: 53});

        Person memory newPerson = person;
        newPerson.name = "Polygon";
        console.log(person.name);

        uint256[3] memory nums = [uint256(1), 2, 3];
    }
}
