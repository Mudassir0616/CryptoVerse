import React from 'react'
import { Col, Row, Statistic, Typography} from 'antd'
import { useGetCryptosQuery } from '../services/cryptoApi'
import millify from 'millify'
import { Link } from 'react-router-dom'
import CryptoCurrencies from './CryptoCurrencies'
import News from './News'
import Loader from './Loader'

const Homepage = () => {

  const {data, isFetching} = useGetCryptosQuery(7) 

  if(isFetching) return <Loader/>;

  // data?.data?.stats THSI LINE HERE SAYS THAT SEARCH THA " DATA AND STATS" WITHIN THE DATA OBJECT
                       // api(data):{
                       //   data:{
                       //     stats:
                                //   }
                        // } 


  const GlobalStats = data?.data?.stats

  return (
    <>
    <Typography.Title className='heading' style={{color:'#001529'}}>
      Global Crypto Stats:
    </Typography.Title>

    <Row>
      <Col span={10} style={{margin:"0.7rem"}}> <Statistic title="Total Crypto Currencies" value={GlobalStats.total}></Statistic></Col>
      <Col span={10} style={{margin:"0.7rem"}}> <Statistic title="Total Exchanges" value={GlobalStats.totalExchanges}></Statistic></Col>
      <Col span={10} style={{margin:"0.7rem"}}> <Statistic title="Total Market Cap" value={millify(GlobalStats.totalMarketCap)}></Statistic></Col>
      <Col span={10} style={{margin:"0.7rem"}}> <Statistic title="Total 24h Volume" value={millify(GlobalStats.total24hVolume)}></Statistic></Col>
      <Col span={10} style={{margin:"0.7rem"}}> <Statistic title="Total Markets" value={GlobalStats.totalMarkets}></Statistic></Col>
    </Row>

    <div className="home-heading-container">
      <Typography.Title level={2} className="home-title">Top 10 Cryptos In The World</Typography.Title>
    
    </div><br />

      <CryptoCurrencies simplified={true}/><br />


      <Typography.Title level={4} className="show-more" style={{marginLeft:'20px'}}><Link to="/cryptocurrencies">  Show More</Link></Typography.Title>
      <div className="home-heading-container">
      <Typography.Title level={2} className="home-title">Latest Crypto News</Typography.Title>
      </div>

      <News simplified={true}/><br />


      <Typography.Title level={4} className="show-more" style={{marginLeft:'20px'}}><Link to="/news">Show More</Link></Typography.Title>
    </>
  )
}

export default Homepage