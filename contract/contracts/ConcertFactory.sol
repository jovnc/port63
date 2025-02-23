// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./Concert.sol";

contract ConcertFactory {
    address[] public concerts;
    event ConcertCreated(address concertAddress);
    
    /**
     * @notice Create a new Concert contract.
     * @param _date Concert date (UNIX timestamp).
     * @param _totalTickets Maximum number of tickets.
     */
    function createConcert(
        uint256 _date,
        uint256 _totalTickets
    ) external {
        Concert concert = new Concert(_date, _totalTickets);
        concerts.push(address(concert));
        emit ConcertCreated(address(concert));
    }
    
    function getConcerts() external view returns (address[] memory) {
        return concerts;
    }
}
