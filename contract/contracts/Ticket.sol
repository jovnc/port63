// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

/**
 * @title Ticket
 * @dev Each instance of this contract represents a single NFT ticket.
 *      The ticket is minted upon deployment and stores the off-chain buyer identifier.
 */
contract Ticket is ERC721 {
    // Off-chain buyer identifier and claim status
    string public buyerCUID;
    bool public claimed;
    bool public escrow;

    event TicketClaimed(string buyerCUID);
    event TicketTransferred(string newBuyerCUID);

    /**
     * @notice Constructor.
     * @param _name Name of the NFT ticket.
     * @param _symbol Symbol of the NFT ticket.
     * @param _buyerCUID Off-chain identifier for the buyer.
     */
    constructor(
        string memory _name,
        string memory _symbol,
        string memory _buyerCUID
    ) ERC721(_name, _symbol)  {
        buyerCUID = _buyerCUID;
        // Mint the one and only ticket (tokenId = 1) to _recipient
        _safeMint(msg.sender, 1);
    }

    /**
     * @notice Claim the ticket (mark it as used).
     * @param _buyerCUID The off-chain identifier to verify the claimant.
     */
    function claim(string memory _buyerCUID) external {
        require(!claimed, "Ticket already claimed");
        require(!escrow, "Ticket is on escrow");
        require(
            keccak256(bytes(buyerCUID)) == keccak256(bytes(_buyerCUID)),
            "Buyer CUID mismatch"
        );
        claimed = true;
        emit TicketClaimed(buyerCUID);
    }

    /**
     * @notice Transfer the ticket to a new owner.
     * @param _newBuyerCUID string of new owner
     */
    function transferTicket(string memory _newBuyerCUID) external {
        require(!claimed, "Claimed tickets cannot be transferred");
        buyerCUID = _newBuyerCUID;
        emit TicketTransferred(buyerCUID);
    }

    /**
     * @notice Put ticket on escrow
     */
    function putOnEscrow() external  {
        escrow = true;
    }

    /**
     * @notice Put ticket on escrow
     */
    function removeFromEscrow() external {
        escrow = false;
    }
}
