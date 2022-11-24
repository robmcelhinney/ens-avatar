# ENS Avatar | Set ENS Avatar from selecting owned NFTs

Viewable at [http://ensavatar.robmcelhinney.com](
http://ensavatar.robmcelhinney.com)

Website to set your ENS avatar based from your NFTs.

![ens-avatar](https://user-images.githubusercontent.com/9123267/203854438-0e855ad8-771e-4aaf-ad56-270c8f6b58ef.png)

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

## Future plans
- Allow users to select avatars for non-primary ens names.
- Add link to contract (etherscan?) for selected NFT.

