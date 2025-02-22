1. authentication (using gmail for now), yall can talk ab singpass if yall wan [X]
2. platform for concerts to sell their original tickets (this will be straight from the vendor)
3. resell market (from resellers)
4. (future implementation) API for other verified third party platforms such as Carousell to also implement resell market
5. ticket claiming process (done async - verify with database first and put ticket on escrow to sign later on)

how it works:

- abstraction of blockchain technologies away from users
- users simply pay with cash, then they will own the ticket
- on the backend NFT ticket will be minted and associated to user
- during resell, on the blockchain and database layer, associate to new user after transaction is successful
