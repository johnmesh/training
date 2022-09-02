## Overview
###  Blockchains
  - How it works
  - Consensus mechanism

---

### Smart Contracts
  > *Build a banking app as an example*
  - Structure of a contract
  - Data types
  - Functions
  - Modifiers
  - Events

---

### Ethereum Virtual Machine
- Opcodes

---

### Defi
  - ERC-20 tokens
  - NFTs
  - A Group challenge (build a decentralised exchange)

---

### The Graph protocol
 - Querying the blockchain

---

## What's a Blockchain?

---


![](https://i.imgur.com/2VKl2KG.png)

---

### Steps to producing a block(Pow)
1. A user signs and submits a transaction.
3. The transaction is propagated to the network.
4. The transaction is picked up by all nodes in the netowork and added to a memepool.
5. A miner orders the transactions, solves a computational puzzle, and propagates the block to the network.
6. The generated block is picked up by all nodes in the network and validated.
7. The block is added to the chain and the block generater recieves a reward.

---


## Consensus Mechanisms
- **Proof of work** - Miners prove they have capital at risk by expending energy
- **Proof of stake** - Validator explicity deposit capital in the form of **ETHER/MATIC** into a smart contract.

---

### Transactions


```json
{
  from: "0xEA674fdDe714fd979de3EdF0F56AA9716B898ec8",
  to: "0xac03bb73b6a9e108530aff4df5077c2b3d481e5a",
  gasLimit: "21000",
  maxFeePerGas: "300",
  maxPriorityFeePerGas: "10",
  data:"608060405234801561001057600080fd5b5060405160208061021783398101604090815290"
  nonce: "0",
  value: "10000000000"
}
```

---

## Pre-requisites
 - Vs-code
 - Node v14.0.0
 - npx: `npm install -g npx`
 - Hardhat 
 - Solint
 - Metamask
 - Alchemy account

---
## Types of Accounts
- **Externally owned accounts** -Controlled by a public-private key pair.
- **Contract account** - Controlled the contract code

## 1. Contracts
Its a piece of executable code, published on-chain.A contract or its functions needs to be called for anything to happen


All Solidity source code starts with should start with a "version pragma".This is to prevent future issues with compiler version that would introduce code breakage.

----

 ## Properties of a Solidity code
 - **Constructor** - Invoked once when the contract is created.
 - **Storage Variables** - These are used to store the state of the varibales.Think of them as saving to a DB
- **Functions** - Used to manipulate the state of the state of the contracts by modifying the state varibales.

---

```solidity
// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.4;

contract SimpleStorage {
    // This will be stored permanently in the blockchain
    uint public storedData;
    
    constructor(){
        // only run once
    }
    
    function set(uint x) public {
        storedData = x;
    }

    function get() public view returns (uint) {
        return storedData;
    }
}
```

---

## 2.0 Types
**Value types** - Always passed by value

**Reference types** - Can be modified though different names. Comprise `struct`,`arrays` and `mappings`
> If you use a reference type, you always have to explicitly define the location where the data is stored

---

   ### 2.1 Integers
  Signed/Unisgned integers **uint<`N`>**: ***uint8**, **uint16**, **uint32**, **uint256***
    

---

   ### 2.2 Structs
   It allows you to define more complicated types that have multiple properties
   ex. 
   
---

```solidity
struct Person {
   uint age;
   string name;
   uint[] likes;
 }

Person newPerson = Person({age:18, name:"Loibon",likes[2,3,4]})

// newPerson.age = 20
// newPeron.name = Loibon
```

---

### 2.3 Arrays
  Arrays can have compile time fixed or dyname size
  ```solidity
  uint256[4] fixedArray;
  uint256[] dynamicArray;

  Person[5] people;
  // ex. usage
  Person newPerson = Person({age:18, name:"Loibon"})
  people.push(newPersion)
  
  person[0].age = 20
 // persion[0] is now 20
  ```

---

### 2.4 Address
  Holds a **20 bytes**(uint160) value
   ```Solidity
   address contractA = "0x1C9d590fe65f4a1C060f3313Fa98Eb247c33fa87"
   ```
   An address is owned by a specific user or contract.
   

---


### 2.5 Mappings
   A mapping is essentially a key-value store for storing and efficiently looking up data.
   - **A Key** can be any built-in value type such as `bytes`,`string`,`address`,`uint256`. Complex types, such as `mappings`,`struct` or `array` types are not allowed.
   - **A Value** can be any type, including `mappings`, `arrays` and `structs`. 


---


```solidity
// initialization
mapping(address => uint256) balances

// ex. usage
let key ="0x1C9d590fe65f4a1C060f3313Fa98Eb247c33fa87"
balances[key] = 30
// balances[key] is equal to 30

```
> *Note: You cannot iterate over mappings*

---

## 3.0 Functions
They are the executable units of code.
```solidity
function (<parameter types>) {internal|external|public|private} [pure|view|payable] [returns (<return types>)]
    
// ex.
function login(address _account) public returns(bool){
    ....
   return true;
}
````
 **require** can be used in funtions to check for a condition and throws an error if a condition is false.
```solidity
function deposit(uint256 _amount) external {
   require(amount > 0,"amount should be greater than zero");
    .....
}
```

---


## 3.1 Modifiers
Modifiers can be used to ammend the semantics of a function in declarative way.
    
```solidity
modifier isLoggedIn() {
  require(loggedInAccounts[msg.sender],"account is not logged in");
    _; // function body goes here
}
    
function deposit (uint256 _amount) external isLoggedIn {
   ... 
 }
```

---

    
## 4.0 Events
**Events** are a way for your contract to communicate that something happened.`eg. a user or the external contract invoking your contract`.Front-end and back-end apps can subscribe to such events and take action when they happen.
    
```solidity=
// Event declaration
event Deposit(address account,uint256 amount);
    
function deposit(uint256 _amount) public {
    ....
  emit(msg.sender, _amount)
}
```

---

## 5.0 Special Varibales and functions
    
``msg.sender (address)`` - sender of the message
``msg.value (uint)`` - number of wei sent with the message
``tx.origin (address)`` -  sender of the transaction
``block.timestamp (uint)`` - current block timstamp as seconds since unix epoch


---

## Data location assignment behaviour (reference types)
 - Assignments between `storage` and `memory` always creates an independent copy
 - Assignments from `memory` to `memory` only create a reference.
 - Assignment from `storage` to a **local** storage variable assigns a reference.  


---


    
## 6.0 Ethereum Virtual Machine(EVM)
- Its the runtime environment for smart contracts on ethereum.
- Its referred to as Turing complete largely because of its ability to execute machine-level instructions known as opcodes.
