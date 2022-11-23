import { useConnect } from '../hooks/useConnect'
import Homepage from '../pages/Homepage'
import Footer from '../components/Footer'
import Head from 'next/head'

export const MyApp = () => {

    useConnect()
  
    return (
        <div className={"flex flex-col h-screen justify-between"}>
        <Head>
            <title>ENS Avatar Updater</title>
            <meta name='description' content='Select your ENS Avatar from your owned NFTs' />
        </Head>
        <Homepage />
        <Footer />
        </div>
    )
}
