import React,{useEffect, useState} from 'react'
import { useGetCryptosQuery } from '../services/cryptoApi'
import { Card, Col, Input, Row } from 'antd'
import millify from 'millify';
import CryptoDetails from './CryptoDetails';
import { Link } from 'react-router-dom';
import Loader from './Loader';

const CryptoCurrencies = ({simplified}) => {

  const countTen = simplified? 7: 100;

  const {data, isFetching} = useGetCryptosQuery(countTen);
  const Coins = data?.data?.coins
 
  
  const [cryptos, setCryptos] = useState(Coins)
  const [searchCoin, setSearchCoin] = useState('')

// ---------------------------THIS USEEFFECT() IS FOR SEARCHING CRYPTO COINS
  useEffect(()=>{
    const filteredCoins = Coins.filter((coin)=> coin.name.toLowerCase().includes(searchCoin.toLowerCase()))
    setCryptos(filteredCoins);
    
  },[searchCoin])

  if(isFetching) return <Loader/>;

  return (
    <>
    {/* WE HAD CREATED THIS SIMPLIFIED prop TO TO DEFINE WE WANT 10 CRYPTOS ON OUR HOMEPage AND 100 ON OUR CRYPTOCURRENCIESPAGE. NOW WE ARE USING IT TO DISPLAY OUR SEARCH FIELD IN OUR CRYPTOCURRENCIESpage ONLY  */}
    {!simplified ? 
    <div className="search-crypto" >
      <Input className='search-crypto-details' placeholder='Search...' onChange={(e)=> setSearchCoin(e.target.value)}/>
    </div> : ''}


    <Row className='crypto-card-container' gutter={[16, 20]}>
      {cryptos?.map((currency)=>(
        <Col className='crypto-card' xs={24} sm={12} lg={8} xl={8} key={currency.uuid}>

          {/* WE ARE LINKING OUR CRYPTO-CARDS TO THEIR PERSONAL ID, SO THAT WE CAN GET BETTER INFORMATION ABOUT OUR CARDS IN CryptoDetails.jsx. */}

          <Link to={`/crypto/${currency.uuid}`}>

           <Card key={currency.id}
             title={`${currency.rank}. ${ currency.name}`}
             extra={<img className='crypto-image' src={currency.iconUrl}/>} 
             hoverable >
              
              {/* MILLIFY() CREATE A SHORT-TERM FOR NUMBERS WHICH HAVE DIGITS HIGHER THAN 1000
              eg. WHEN YOU MILLIFY (10000) IT WILL RETURN 10K. */}

              <h4>price: ${ millify(currency.price)}</h4>
              <h4>Market Cap: { millify(currency.marketCap)}</h4>
              <h4>Daily Changes: { millify(currency.change)} %</h4>
           </Card>
           </Link>
        </Col>
      ))}
    </Row>
    </>
  )
}

export default CryptoCurrencies