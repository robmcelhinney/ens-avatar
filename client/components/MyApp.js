import { useConnect } from '../hooks/useConnect'
import Homepage from '../pages/Homepage'

export const MyApp = () => {

    useConnect()
  
    return (
        <Homepage />
    )
}
