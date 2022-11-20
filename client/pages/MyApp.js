import React from 'react'
import { useConnect } from '../hooks/useConnect'
import Homepage from './Homepage'

export const MyApp = () => {

    useConnect()
  
    return (
        <Homepage />
    )
}
