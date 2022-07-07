import React,{useState} from 'react'
import { Col, Row, Select, Typography, } from 'antd'
import HTMLReactParser from 'html-react-parser'
import { useParams } from 'react-router-dom'

import { MoneyCollectOutlined, DollarCircleOutlined, FundOutlined, ExclamationCircleOutlined, StopOutlined, TrophyOutlined, CheckOutlined, NumberOutlined, ThunderboltOutlined } from '@ant-design/icons';

import { useGetCryptoDetailsQuery, useGetCryptoHistoryQuery } from '../services/cryptoApi';
import Loader from './Loader';
import millify from 'millify';
import FlowChart from './FlowChart';

const CryptoDetails = () => {
  const {coinId} = useParams();
  const [timePeriod, setTimePeriod] = useState('Select Time Period')

  const {data, isFetching} = useGetCryptoDetailsQuery(coinId)
  const cryptoDetails = data?.data?.coin

  const { data: coinHistory } = useGetCryptoHistoryQuery({ coinId, timePeriod });
  console.log(coinHistory)
 
  
  if (isFetching) return <Loader/>;

  
  

  const stats = [
    
    { title: 'Price to USD', value: `$ ${cryptoDetails?.price && millify(cryptoDetails?.price)}`, icon: <DollarCircleOutlined /> },
    { title: 'Rank', value: cryptoDetails?.rank, icon: <NumberOutlined /> },
    { title: '24h Volume', value: `$ ${cryptoDetails?.volume && millify(cryptoDetails?.volume)}`, icon: <ThunderboltOutlined /> },
    { title: 'Market Cap', value: `$ ${cryptoDetails?.marketCap && millify(cryptoDetails?.marketCap)}`, icon: <DollarCircleOutlined /> },
    { title: 'All-time-high(daily avg.)', value: `$ ${cryptoDetails?.allTimeHigh?.price && millify(cryptoDetails?.allTimeHigh?.price)}`, icon: <TrophyOutlined /> },
  ];

  const genericStats = [
    { title: 'Number Of Markets', value: cryptoDetails?.numberOfMarkets, icon: <FundOutlined /> },
    { title: 'Number Of Exchanges', value: cryptoDetails?.numberOfExchanges, icon: <MoneyCollectOutlined /> },
    { title: 'Aprroved Supply', value: cryptoDetails?.supply?.confirmed ? <CheckOutlined /> : <StopOutlined />, icon: <ExclamationCircleOutlined /> },
    { title: 'Total Supply', value: `$ ${cryptoDetails?.supply?.total && millify(cryptoDetails?.supply?.total)}`, icon: <ExclamationCircleOutlined /> },
    { title: 'Circulating Supply', value: `$ ${cryptoDetails?.supply?.circulating && millify(cryptoDetails?.supply?.circulating)}`, icon: <ExclamationCircleOutlined /> },
  ];

  return (
    <Col className='coin-detail-container'>

      <Col className='coin-heading-container' >

        <Typography.Title className='coin-name' level={2}>
          {cryptoDetails.name} ({cryptoDetails.symbol}) 
        </Typography.Title>
        <p>
          {cryptoDetails.name} live price in $USD <br />View value statistics of Market and supply.
        </p>
      </Col>


    <Col className='stats-container'>
      <Col className='coin-value-statistics'>
        <Col className='coin-value-statistics-heading'>
          <Typography.Title className='coin-details-heading' level={3}>
            <u>{cryptoDetails.name}</u> Statistics -
          </Typography.Title>
          <p>An Overview of showing the stats of {cryptoDetails.name}</p>
        </Col>
        {stats.map(({title, value, icon}) => (
          <Col className='coin-stats'>
            <Col className='coin-stats-name'>
              {icon}
              {title}
            </Col>
            <Typography.Text className='stats'>{value}</Typography.Text>
          </Col>
        ))}
      </Col>


      <Col className='other-stats-info'>
        <Col className='coin-value-statistics-heading'>
          <Typography.Title className='coin-details-heading' level={3}>
            Other Statistics
          </Typography.Title>
          <p>An Overview of showing the stats of all the Cryptos</p>
        </Col>
        {genericStats.map(({title, value, icon}) => (
          <Col className='coin-stats'>
            <Col className='coin-stats-name'>
              {icon}
              {title}
            </Col>
            <Typography.Text className='stats'>{value}</Typography.Text>
          </Col>
        ))}
      </Col>
    </Col>

    <Col className='coin-desc-link'>
      <Row className='coin-desc' >
        <Typography.Title level={4} className='coin-details-heading'>
          What is {cryptoDetails.name} ?
           {HTMLReactParser(cryptoDetails.description)}
        </Typography.Title>
      </Row>
    </Col>
    </Col>
  )
}

export default CryptoDetails