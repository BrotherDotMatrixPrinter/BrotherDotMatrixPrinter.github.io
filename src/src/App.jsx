import { useState, useEffect } from 'react'
import UserData from './model/UserData.js'
import TotalData from './model/TotalData.js'
import PriceData from './model/PriceData.js'

import UserInput from './component/UserInput.jsx'
import Totals from './component/Totals.jsx'
import Prices from './component/Prices.jsx'

const App = () => {

  const [ userData, setUserData ] = useState( new UserData() ),
    [ totalData, setTotalData ] = useState( new TotalData( userData ) ),
    [ priceData, setPriceData ] = useState( new PriceData() )

  useEffect( () => {
    setTotalData( new TotalData( userData ) )
  }, [ userData ] )

  useEffect( () => {
    priceData.getData( setPriceData )
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [] )

  /*
  So we want it to go like this:
  User Inputs
  Reward/Tax/Fee/Cost Totals
  */
  return <div id = 'App'>

    <UserInput
      userData = { userData }
      setUserData = { setUserData } />

    <Totals totalData = { totalData } />

    <Prices priceData = { priceData } />

    <div>&nbsp;</div>

  </div>

}

export default App
