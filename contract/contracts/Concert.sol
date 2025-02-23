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

    // Struct to represent a ticket listing
    struct TicketListing {
        uint256 price;
        string seller;
    }

    // Mapping from ticket ID to its contract address
    mapping(uint256 => address) public ticketContracts;
    // Mapping from ticket ID to its listing details
    mapping(uint256 => TicketListing) public ticketListings;

    event TicketCreated(uint256 ticketId, address ticketContract, string buyerCUID);
    event TicketListed(uint256 ticketId, uint256 price, string sellerCUID);
    event TicketSold(uint256 ticketId, uint256 price, string buyerCUID);
    event TicketListingCancelled(uint256 ticketId, string sellerCUID);

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

        emit TicketCreated(ticketId, address(newTicket), buyerCUID);
    }

    /**
     * @notice Claim a ticket to mark it as used.
     * @param ticketIndex Index in the ticketContracts array.
     * @param buyerCUID The off-chain identifier for validation.
     */
    function claimTicket(uint256 ticketIndex, string memory buyerCUID) external  {
        Ticket ticket = Ticket(ticketContracts[ticketIndex]);
        ticket.claim(buyerCUID);
    }

    /**
     * @notice List a ticket for resale.
     * @param ticketId The ID of the ticket to list.
     * @param price The resale price.
     */
    function listTicketForResale(uint256 ticketId, uint256 price) external {
        require(price > 0, "Price must be greater than zero");
        address ticketAddress = ticketContracts[ticketId];
        require(ticketAddress != address(0), "Invalid ticket ID");
        Ticket ticket = Ticket(ticketAddress);

        // Put ticket on escrow to prevent usage
        ticket.putOnEscrow();

        // Create the listing
        ticketListings[ticketId] = TicketListing({
            price: price,
            seller: ticket.buyerCUID()
        });

        emit TicketListed(ticketId, price, ticket.buyerCUID());
    }

    /**
     * @notice Purchase a listed ticket.
     * @param ticketId The ID of the ticket to purchase.
     */
    function purchaseTicket(uint256 ticketId, string memory _newBuyerCUID) external payable {
        TicketListing memory listing = ticketListings[ticketId];
        require(listing.price > 0, "Ticket is not listed for sale");

        // Remove the listing
        delete ticketListings[ticketId];

        // Transfer the ticket to the buyer
        Ticket ticket = Ticket(ticketContracts[ticketId]);
        ticket.removeFromEscrow();
        ticket.transferTicket(_newBuyerCUID);

        emit TicketSold(ticketId, listing.price, _newBuyerCUID);
    }

    /**
     * @notice Cancel a ticket listing.
     * @param ticketId The ID of the ticket listing to cancel.
     */
    function cancelTicketListing(uint256 ticketId) external {
        TicketListing memory listing = ticketListings[ticketId];
        require(listing.price > 0, "Ticket is not listed for sale");

        // Remove the listing
        delete ticketListings[ticketId];

        // Return the ticket to the seller
        Ticket ticket = Ticket(ticketContracts[ticketId]);
        ticket.removeFromEscrow();

        emit TicketListingCancelled(ticketId, listing.seller);
    }

    function getAllTicketAddresses() external view returns (address[] memory) {
        address[] memory ticketAddresses = new address[](nextTicketId);
        
        for (uint256 i = 0; i < nextTicketId; i++) {
            ticketAddresses[i] = ticketContracts[i];
        }
        
        return ticketAddresses;
    }

}
