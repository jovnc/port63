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
    uint256 public price;

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
        price = 0;
        claimed = false;
        escrow = false;
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
    }

    /**
     * @notice Transfer the ticket to a new owner.
     * @param _newBuyerCUID string of new owner
     */
    function transferTicket(string memory _newBuyerCUID) external {
        require(!claimed, "Claimed tickets cannot be transferred");
        buyerCUID = _newBuyerCUID;
    }

    /**
     * @notice Put ticket on resale market
     */
    function putOnResale(uint256 sellPrice) external {
        require(escrow == false, "Ticket already listed for sale");
        require(claimed == false, "Claimed tickets cannot be listed for sale");
        escrow = true;
        price = sellPrice;
    }

    /**
     * @notice Buy ticket from resale market
     */
    function buyFromResale(string memory _newBuyerCUID) external {
        require(price > 0, "Ticket is not listed for sale");
        escrow = false;
        this.transferTicket(_newBuyerCUID);
    }

    /**
     * @notice Cancel ticket listing
     */
    function cancelListing(uint256 sellPrice) external {
        require(price > 0, "Ticket is not listed for sale");
        escrow = false;
        price = sellPrice;
    }

    /**
     * @notice Check if the ticket has been claimed.
     * @return bool Returns true if the ticket is claimed, false otherwise.
     */
    function isTicketClaimed() public view returns (bool) {
        return claimed;
    }
}
