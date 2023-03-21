// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract Hello {
  constructor() { }

  event helloEvent(string);

  function hello(string memory message) public {
    emit helloEvent(message);
  }
}
