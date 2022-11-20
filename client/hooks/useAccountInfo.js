export const useAccountInfo = () => {
    const getAccountInfo = async (address, web3provider) => {
        const ensName = await web3provider.lookupAddress(address)
        const ensAvatar = await web3provider.getAvatar(ensName)
        return {ensName, ensAvatar}
    }

    return getAccountInfo
}
