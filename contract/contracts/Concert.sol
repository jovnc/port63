// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./Ticket.sol";
import "@openzeppelin/contracts/token/ERC721/utils/ERC721Holder.sol";

/**
 * @title Concert
 * @dev This contract manages a concert event. When a ticket is minted, it deploys a new Ticket contract,
 *      so each ticket is an independent NFT contract.
 */
contract Concert is ERC721Holder {
    uint256 public date;
    uint256 public totalTickets;
    uint256 public soldTickets;
    uint256 public nextTicketId;

    // Mapping from ticket ID to its contract address
    mapping(uint256 => address) public ticketContracts;

    /**
     * @notice Constructor.
     * @param _date Concert date (UNIX timestamp).
     * @param _totalTickets Maximum number of tickets.
     */
    constructor(uint256 _date, uint256 _totalTickets) {
        date = _date;
        totalTickets = _totalTickets;
        nextTicketId = 0;
    }

    /**
     * @notice Mint a new ticket by deploying a new Ticket contract.
     * @param buyerCUID Off-chain identifier for the buyer.
     * @param ticketName Name for the Ticket NFT.
     * @param ticketSymbol Symbol for the Ticket NFT.
     */
    function mintTicket(
        string memory buyerCUID,
        string memory ticketName,
        string memory ticketSymbol
    ) external {
        require(soldTickets < totalTickets, "All tickets sold");
        // Deploy a new Ticket contract instance.
        Ticket newTicket = new Ticket(ticketName, ticketSymbol, buyerCUID);
        uint256 ticketId = nextTicketId;
        ticketContracts[ticketId] = address(newTicket);
        soldTickets++;
        nextTicketId++;

        newTicket.safeTransferFrom(address(this), msg.sender, 1);
    }


    /**
     * @notice Get all ticket addresses.
     * @return ticketAddresses Array of ticket addresses.
     */
    function getAllTicketAddresses() external view returns (address[] memory) {
        address[] memory ticketAddresses = new address[](nextTicketId);
        
        for (uint256 i = 0; i < nextTicketId; i++) {
            ticketAddresses[i] = ticketContracts[i];
        }
        
        return ticketAddresses;
    }

    function getTicketsOnResale() external view returns (address[] memory) {
        uint256 resaleCount = 0;

        // First pass: count tickets on resale
        for (uint256 i = 0; i < nextTicketId; i++) {
            Ticket ticket = Ticket(ticketContracts[i]);
            if (ticket.escrow()) {
                resaleCount++;
            }
        }

        // Create an array with the exact size needed
        address[] memory resaleTickets = new address[](resaleCount);
        uint256 index = 0;

        // Second pass: populate the array with resale tickets
        for (uint256 i = 0; i < nextTicketId; i++) {
            Ticket ticket = Ticket(ticketContracts[i]);
            if (ticket.escrow()) {
                resaleTickets[index] = ticketContracts[i];
                index++;
            }
        }

        return resaleTickets;
    }


}
