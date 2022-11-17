#!/usr/bin/env node

import path from 'path'
import Fastify from 'fastify'
import axios from 'axios'
import Moralis from "moralis"
import { EvmChain } from '@moralisweb3/evm-utils'
import dotenv from 'dotenv'
dotenv.config()
const Moralis2 = Moralis.default


const fastify = Fastify({
    logger: {
        transport: {
            target: 'pino-pretty',
            options: {
                translateTime: 'HH:MM:ss Z',
                ignore: 'pid,hostname',
            },
        }
    }
})

Moralis2.start({
    apiKey: process.env.API_KEY
})

// const __dirname = path.resolve()
// fastify.register(fastifyStatic, {
//     root: path.join(__dirname, "../client/build"),
//     prefix: '/', // optional: default '/'
// })

export default ({ port }) => {

    const getImage = async (token_uri) => {
        token_uri = await replaceGateways(token_uri)
        const result = await axios.get(token_uri)
            .catch( error => {
                if (error.response) {
                    // Request made and server responded
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                } else if (error.request) {
                    // The request was made but no response was received
                    console.log(error.request);
                } else {
                    // Something happened in setting up the request that triggered an Error
                    console.log('Error', error.message);
                }
                return null
            })
        const { data } = await result
        // malformed json
        if (data.image == null) {
            return null
        }
        let image = await replaceGateways(data.image)
        return image
    }

    const replaceGateways = async (token_uri) => {
        // console.log("replaceGateways token_uri: ", token_uri)
        if (token_uri.includes('/ipfs/')) {
            // console.log("replaceGateways: ", token_uri)
            return token_uri.replace(new RegExp(".*ipfs.*\/ipfs\/"), "https://cloudflare-ipfs.com/ipfs/")
        } else if (token_uri.includes('ipfs://')){
            console.log("replaceGateways: ", token_uri)
            console.log("includes ipfs://: ", token_uri.replace(new RegExp("ipfs:\/\/"), "https://cloudflare-ipfs.com/ipfs/"))
            return token_uri.replace(new RegExp("ipfs:\/\/"), "https://cloudflare-ipfs.com/ipfs/")
        } else {
            // console.log("default")
            return token_uri
        }
    }

    fastify.get('/v1/nft/getWalletNFTs/:address', async (req, _) => {
        const address = req.params.address
        const chain = EvmChain.ETHEREUM
        return getWalletNFTS(address, chain)
    })

    fastify.get('/v1/:chain/nft/getWalletNFTs/:address', async (req, _) => {
        const address = req.params.address
        const selectedChain = req.params.chain.toUpperCase()

        const chain = EvmChain[selectedChain]
        return getWalletNFTS(address, chain)
    })

    
    const getWalletNFTS = async (address, chain) => {
        console.log("address: ", address)
        console.log("chain: ", chain)
        const response = await Moralis2.EvmApi.nft.getWalletNFTs({
            address,
            chain,
        })
        let nfts = response.data.result
        for (let i=0; i < nfts.length; i++){
            if ( nfts[i].token_uri == "Invalid uri" || nfts[i].token_uri == null) {
                nfts.splice(i, 1)
                i -= 1
                continue
            }
            else {
                console.log("nfts[i].token_uri: ", nfts[i].token_uri)
                let image = await getImage(nfts[i].token_uri)
                if (image == null) {
                    nfts.splice(i, 1)
                    i -= 1
                    continue
                }
                else{
                    nfts[i].image = image
                }
            }

            if ( nfts[i].name == null && nfts[i].hasOwnProperty('metadata')) {
                let metadata = JSON.parse(nfts[i].metadata)
                nfts[i].name = metadata.name
            }
        }
        return nfts
    }

    // Run the server!
    const start = async () => {
        try {
            await fastify.listen({ port: port, host: '0.0.0.0' })
        } catch (err) {
            fastify.log.error(err)
            process.exit(1)
        }
    }
    start()
}
