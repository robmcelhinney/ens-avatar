import React, {useEffect, useState} from 'react'
import {useGlobalState} from "../hooks/useGlobalState"
import GridGallery from '../components/grid-gallery'
import 'tailwindcss/tailwind.css'
import * as ENSConstClass from '../constants/ENSConstants'
import { ethers } from "ethers"
import Image from 'next/image'
import namehash from "eth-ens-namehash"
import axios from 'axios'

function Homepage() {
    const [imageObject, setImageObject] = useState(null)
    const [nfts, setNFTs] = useState(null)

    const [accountInfo] = useGlobalState("accountInfo")

    const {web3provider, address, ensName, ensAvatar} = accountInfo || {}

    const getNFTs = async () => {
        if (typeof address !== "undefined") {
            const result = await axios.get("/v1/nft/getWalletNFTs/" + address)
            const { data: nfts } = result
            return {nfts}
        }
        return {}
    }

    useEffect(() => {
        const getNFTasync = async () => {
            const {nfts} = await getNFTs()
            setNFTs(nfts)
        }
        getNFTasync()
    }, [address])

    useEffect(() => {
        setImageObject(null)
    }, [ensName])

    const showNFTs = () => {
        if (nfts) {
            return <GridGallery images={nfts} setImageObject={setImageObject} />
        }
        return <></>
    }
    
    const showAvatar = () => {
        return (
            <div className={`flex flex-row justify-between mt-4`}>
                {showCurrentAvatar()}
                {showArrow()}
                {showPossibleAvatar()}
            </div>
        )
    }

    const showCurrentAvatar = () => {
        if (ensAvatar) {
            return (
                <div className={`mr-6 shrink-0`}>
                    <div>Current ENS Avatar</div>
                    <img src={ensAvatar} alt="current ens avatar" className="w-36 rounded border-2 border-black" />
                </div>
            )
        }
        else {
            return (
                <div className={`mr-6 shrink-0`}>
                    <span className="text-base">ENS Avatar not set</span>
                    <div className="w-36 h-36 rounded bg-white border-2 border-black"></div>
                </div>
            )
        }
    }

    const showArrow = () => {
        if (imageObject) {
            return (
                <div className={`mx-6 flex items-center shrink`}>
                    <Image className={`align-middle`} src="/right-arrow.svg" height={30} width={30} />
                </div>
            )
        }
        return <></>
    }

    const showPossibleAvatar = () => {
        if (imageObject) {
            return (
                <div className={`ml-6 shrink-0`}>
                    <span className="text-base">New ENS Avatar</span>
                    <img src={imageObject.image} alt="new possible ens avatar" className="w-36 rounded border-2 border-black" />
                </div>
            )
        }
        return <></>
    }

    const updateAvatar = () => {
        return (
            <>
            <div>
                <button className={`my-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full 
                        ${!imageObject && "opacity-50 cursor-not-allowed"}`}
                        onClick={() => callContract()}
                >
                    Update
                </button>
            </div>
            {imageObject && 
                <div className={`my-4`}>
                    Update Avatar to {imageObject.name}/{imageObject.token_id}
                </div>
            }

            </>
        )
    }

    const installWallet = () => {
        if (!web3provider) {
            return (
                <div>
                    Please install an Ethereum wallet such as MetaMask/WalletConnect
                </div>
            )
        }
        return <></>
    }

    const callContract = () => {
        const ENSContract = new ethers.Contract(ENSConstClass.CONTRACT_ADDRESS, ENSConstClass.ABI, signer)
        const node = namehash.hash(ensName)
        const myNFT = "eip155:1/" + imageObject.contract_type + ":" + imageObject.token_address + "/" + imageObject.token_id
        ENSContract.setText(node, "avatar", myNFT)
    }

    return (
        <div>
            <div className="text-3xl font-bold underline">ENS Avatar Updater</div>
            <div className="text-2xl">My name is <span className="font-bold underline">{ensName || "..."}</span></div>
            {showAvatar()}
            {installWallet()}
            {updateAvatar()}
            {showNFTs()}

        </div>
    )
}

export default Homepage
