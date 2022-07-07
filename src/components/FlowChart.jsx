import React from 'react'
import {Line} from 'react-chartjs-2'
import { Col, Row, Typography } from 'antd'
import millify from 'millify';

const {Title} = Typography;

const FlowChart = ({coinHistory, currentPrice, coinName}) => {

  return (
    <>
    <Row className='chart-header'>
        <Title className='chart-title' level={2}>{coinName} Price Chart</Title>
        <Col className='price-container'>
            <Title className='price-change' level={4}>{coinHistory?.data?.change}%</Title>
            <Title className='current-price' level={4}>Current {coinName} Price ${millify(currentPrice)}</Title>
        </Col>
    </Row>
    
   
    </>
  )
}

export default FlowChart