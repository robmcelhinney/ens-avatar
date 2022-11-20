# ENS Avatar | Set ENS Avatar from selecting owned NFTs

Viewable at [https://robmcelhinney.com/ensavatar](
https://robmcelhinney.com/ensavatar)

## Install

    $ git clone git@github.com:robmcelhinney/ens-avatar.git
    $ cd ens-avatar
    $ cd client 
    $ npm install
    $ cd ../server
    $ npm install

## Run with docker
    $ docker-compose up --build

## Requirements
I used [Moralis' NFT API](https://moralis.io/nft-api/) to get the list of all user owned NFTs.
I redirected all IPFS requests through [ipfs.io's gateway](https://ipfs.io/ipfs/)
