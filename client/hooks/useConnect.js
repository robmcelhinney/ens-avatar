import {useEffect, useState} from 'react'
import {useGlobalState} from "../hooks/useGlobalState"
import {useAccountInfo} from "../hooks/useAccountInfo"
import { ethers } from "ethers"

export const useConnect = () => {

    const [_, setAccountInfo] = useGlobalState("accountInfo")
    const getAccountInfo = useAccountInfo()

    const [hasBeenCalled, setHasBeenCalled] = useState(false)


    useEffect(() => {
        const connect = async () => {
            if (typeof window !== 'undefined') {
                const initAccountChangeListener = (web3provider) => {
                    window.ethereum.on('accountsChanged', async (accounts) => {
                        const address = accounts[0]
                        const {ensName, ensAvatar} = await getAccountInfo(address, web3provider)
                        setAccountInfo((prevState) => ({ ...prevState, address, ensName, ensAvatar}))
                    })
                }

                const web3provider = new ethers.providers.Web3Provider(window.ethereum)
        
                if (!hasBeenCalled) {
                    if (web3provider) {
                        const signer = web3provider.getSigner()
                        const accounts = await web3provider.send("eth_requestAccounts", [])
                        const address = accounts[0]
                        const {ensName, ensAvatar} = await getAccountInfo(address, web3provider)

                        setAccountInfo({web3provider, signer, address, ensName, ensAvatar})
                        initAccountChangeListener(web3provider)
                        setHasBeenCalled(true)
                    } else {
                        console.log('Please install a wallet!')
                    }
                }
            }
        }
        connect()
    }, [])


}
