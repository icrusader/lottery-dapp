// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

contract Lottery {
    address public manager;
    address[] public players;
    address public lastWinner;

    constructor() {
        manager = msg.sender;
    }

    function enter() public payable {
        require(msg.value >= .01 ether, "Minimum entry: 0.01 ETH");
        players.push(msg.sender);
    }

    function getPlayers() public view returns (address[] memory) {
        return players;
    }

    function getBalance() public view returns (uint256) {
        return address(this).balance;
    }

    function pickWinner() public restricted {
        require(players.length > 0, "No players to pick from.");

        uint index = uint(
            keccak256(
                abi.encodePacked(block.timestamp, block.prevrandao, players.length)
            )
        ) % players.length;

        address winner = players[index];
        payable(winner).transfer(address(this).balance);
        lastWinner = winner;  
    
        // Reset for next round
        for (uint i = 0; i < players.length; i++) {
            delete players[i];
        }


    }

    modifier restricted() {
        require(msg.sender == manager, "Only manager can call this");
        _;
    }
}

