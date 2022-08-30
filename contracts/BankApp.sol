pragma solidity 0.8.4;

contract BankApp {
    string name;
    address public manager;
    struct Account {
        uint256 id;
        string name;
        string kraPin;
        uint256 balance;
    }

    mapping(address => Account) accounts;

    constructor(string memory _name) {
        manager = msg.sender;
        name = _name;
    }

    function register(
        address user,
        uint256 id,
        string memory name,
        string memory kraPin,
        uint256 balance
    ) public returns (bool) {
        require(msg.sender == manager, "Send not manager");

        Account memory account = accounts[user];
        // check if the account is created
        if (account.id != 0) {
            revert("Account already exist");
        }

        account.id = id;
        account.name = name;
        account.kraPin = kraPin;
        account.balance = balance;

        accounts[user] = account;

        return true;
    }
}
