import React, {useState, useEffect} from 'react'
import axios from 'axios'
import GridGallery from '../components/grid-gallery'
import 'tailwindcss/tailwind.css'
import * as ENSConstClass from '../constants/ENSConstants';
import { ethers } from "ethers"
let Web3 = require('web3')
let namehash = require('eth-ens-namehash')

function Index() {

    const [address, setAddress] = useState(null)
    const [nfts, setNFTs] = useState([])
    const [provider, setProvider] = useState(null)
    const [signer, setSigner] = useState(null)
    const [ensAvatar, setEnsAvatar] = useState(null)
    const [ensName, setEnsName] = useState(null)
    const [imageObject, setImageObject] = useState(null)

    // let web3 = new Web3(Web3.givenProvider || "ws://localhost:8545")

    useEffect(() => {
        if (window.ethereum) {
            window.ethereum.on('accountsChanged', accounts => {
                console.log('connected', accounts[0])
                setAddress(accounts[0])
                setNFTs(null)
                setImageObject(null)
            });
        }
    })

    useEffect(() => {
        if (address != null) {
            getNFTs()
        }
    },[address])

    async function connect() {
        const web3provider = new ethers.providers.Web3Provider(window.ethereum)
        if (web3provider) {
            setProvider(web3provider)
            setSigner(web3provider.getSigner())
        } else {
            console.log('Please install a wallet!');
        }
        console.log("web3provider: ", web3provider)
        let accounts = await web3provider.send("eth_requestAccounts", [])
        console.log("accounts: ", accounts)
        let account = accounts[0]
        console.log("connect account: ", account)
        setAddress(account)
    }


    useEffect(() => {
        connect()
    }, [])

    useEffect(() => {
        if(provider && address){
            setName()
        }
    }, [provider, address])

    useEffect(() => {
        if(ensName){
            setAvatar()
        }
    }, [ensName])

    const setName = async () => {
        
        const name = await provider.lookupAddress(address)
        console.log("name: ", name)
        setEnsName(name)
    }

    const setAvatar = async () => {
        if (ensName) {
            const avatarURI = await provider.getAvatar(ensName)
            setEnsAvatar(avatarURI)
        }
    }

    const getNFTs = async () => {
        console.log("getNFTs address: ", address)
        const result = await axios.get("/v1/nft/getWalletNFTs/" + address)
        const { data } = result
        console.log("getNFTs data: ", data)
        setNFTs(data)
    }

    const showNFTs = () => {
        if (nfts) {
            return <GridGallery images={nfts} setImageObject={setImageObject} />
        }
        return <></>
    }

    // const showSelectedImage = () => {
    //     console.log("showNFTs imageObject: ", imageObject)
    //     if (imageObject) {
    //         return <>Selected Image {imageObject.name} tokenId: {imageObject.token_id}</>
    //     }
    //     return <></>
    // }
    
    const showAvatar = () => {
        // console.log("showAvatar ensAvatar: ", ensAvatar)
        return (
            <div>
                {showCurrentAvatar()}
                {showPossibleAvatar()}
            </div>
        )
    }


    const showPossibleAvatar = () => {
        if (imageObject) {
            return (
                <>
                    <div>New ENS Avatar</div>
                    <img src={imageObject.image} alt="new possible ens avatar" className="w-36 h-36 rounded" />
                </>
            )
        }
        return <></>
    }

    const showCurrentAvatar = () => {
        if (ensAvatar) {
            return (
                <>
                    <div>Current ENS Avatar</div>
                    <img src={ensAvatar} alt="current ens avatar" className="w-36 h-36 rounded" />
                </>
            )
        }
        else {
            return <span className="text-2xl">ENS Avatar not set</span>
        }
    }

    const updateAvatar = () => {
        // console.log("updateAvatar")
        return (
            <>
            <div>
                <button className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full 
                        ${!imageObject && "opacity-50 cursor-not-allowed"}`}
                        onClick={() => callContract()}
                >
                    Update
                </button>
            </div>
            {imageObject && 
                <div>
                    Update Avatar to {imageObject.name}/{imageObject.token_id}
                </div>
            }

            </>
        )
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
            <div className="text-2xl">My name is <span className="font-bold">{ensName}</span></div>
            {showAvatar()}

            {updateAvatar()}
            {showNFTs()}

        </div>
    )
}

export default Index
