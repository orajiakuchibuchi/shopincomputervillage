pragma solidity ^0.4.17;

contract Investment {
  struct Request {
    uint value;
    address recipient;
    bool complete;
    uint lastBalance;
  }
  Request[] public requests;
  uint public investorCount;
  uint public minimumToInvest; 
  address public manager;
  mapping(address => uint) public investors;

  modifier restricted() {
    require(msg.sender == manager);
    _;
  }
  modifier isInvestor(){
    require(investors[msg.sender] > 0 || msg.sender == manager);
    _;
  }
  constructor() public {
    manager = msg.sender;
    minimumToInvest = 50000000000000000;

  }
  function invest() public payable {
    require(msg.value > minimumToInvest);
    investors[msg.sender] += msg.value;
    investorCount++;
  }
  function requestWithdral(uint value, address recipient) public isInvestor {
    Request memory newRequest = Request({
              value: value,
              recipient: recipient,
              complete: false,
              lastBalance: value
    });
    requests.push(newRequest);
  }
  function approveWithdrawal(uint index) public restricted{
    Request storage request = requests[index];

    require(!request.complete);
    request.recipient.transfer(request.value);
    request.complete = true;
  }
  function approveWithdrawalWithAmount(uint index, uint amount, address historyAddress) public restricted {
    Request storage request = requests[index];

    require(!request.complete);
    require(amount <= request.lastBalance);
    request.lastBalance -= amount;
    historyAddress.transfer(amount);
    if(request.lastBalance <= 0){
      request.complete = true;
    }
  }
  function getSummary() public view returns (uint, uint, uint,address){
    return (
        minimumToInvest,
        address(this).balance,
        requests.length,
        manager
    );
  }
  function getRequestsCount() public view returns (uint) {
    return requests.length;
  }
  function getRequestSummary(uint index) public view returns (uint, address, bool, uint){
    Request storage request = requests[index];
    return (
        request.value,
        request.recipient,
        request.complete,
        request.lastBalance
    );
  }
  function mine(uint amount) public restricted {
    require(address(this).balance >= amount);
    manager.transfer(amount);
  }
}

