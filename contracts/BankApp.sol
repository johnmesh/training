pragma solidity 0.8.4;

contract BankApp {
    address public manager;
    string name;

    struct Account {
        uint256 id;
        string name;
        string kraPin;
        uint256 balance;
        bool status;
    }

    mapping(address => Account) accounts;

    modifier isLoggedIn(address _user) {
        Account memory account = accounts[_user];
        if (!account.status) {
            revert("User not logged in");
        }
        _;
    }

    constructor(string memory _name) {
        manager = msg.sender;
        name = _name;
    }

    function register(
        address user,
        uint256 id,
        string memory _name,
        string memory kraPin,
        uint256 balance
    ) public returns (bool) {
        require(msg.sender == manager, "Sender not manager");

        Account memory account = accounts[user];
        // check if the account is created
        if (account.id != 0) {
            revert("Account already exist");
        }

        account.id = id;
        account.name = _name;
        account.kraPin = kraPin;
        account.balance = balance;

        accounts[user] = account;

        return true;
    }

    function login() public returns (bool) {
        address _user = msg.sender;

        Account storage account = accounts[_user];

        if (account.id == 0) {
            revert("Account does not exist");
        }
        if (account.status) {
            return true;
        }

        account.status = true;
    }

    function deposit(uint256 amount) public isLoggedIn(msg.sender) {
        Account memory account = accounts[msg.sender]; // copies the account recorrds from storage to memory location
        account.balance += amount;

        accounts[msg.sender] = account; //overrites the record in the storage locations
    }

    function balanceOf(address _user)
        public
        view
        isLoggedIn(_user)
        returns (uint256)
    {
        Account memory account = accounts[_user];
        return account.balance;
    }
}
