import { useConnect } from '../hooks/useConnect'
import Homepage from '../pages/Homepage'
import Head from 'next/head'

export const MyApp = () => {

    useConnect()
  
    return (
        <>
        <Head>
            <title>ENS Avatar Updater</title>
            <meta name='description' content='Select your ENS Avatar from your owned NFTs' />
        </Head>
        <Homepage />
        </>
    )
}
