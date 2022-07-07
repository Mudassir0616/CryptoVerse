import React from 'react'
import { Avatar, Col, Collapse, Row, Typography } from 'antd'

import Loader from './Loader'
import { useGetExchangesQuery } from '../services/cryptoApi'
import millify from 'millify'
const {Title, Text} = Typography
const {Panel} = Collapse



const Exchanges = () => {
  
  const {data, isFetching} = useGetExchangesQuery()
  const exchangesData = data?.data?.exchanges;
  
  
  if(isFetching) return <Loader/>;
  return (
    <>
    {/* <Row className='exchange-header'>
      <Col span={6}>Cryotos</Col>
      <Col span={6}> Trade</Col>
      <Col span={6}> Markets </Col>
      <Col span={6}> Changes</Col>
    </Row> */}

       {exchangesData.map((exchange) => (
        <Col xl={24} xxl={12} lg={24} sm={24}>
         <Collapse>
           <Panel
            showArrow={false}
            key={exchange.uuid}
            header={

                  <Row key={exchange.uuid}>
                    <Col span={24}>
                      <Text><strong>{exchange.rank}.</strong></Text>
                      <Avatar className="exchange-image" src={exchange.iconUrl} />
                      <Text><strong>{exchange.name}</strong></Text>
                    </Col>
                    <Col span={24}>Number of exchange Markets - {millify(exchange.numberOfMarkets)}</Col>
                    <Col span={24}>Cost of {millify(exchange.btcPrice)} {exchange.name}  = {millify(exchange.price)} $</Col>

                  </Row>

            }>
          <Title level={5}>
             If you want to learn more about <mark> {exchange.name}</mark> , you can checkout their official page. <br />
             <a href={exchange.coinrankingUrl}>learn more</a>
          </Title>

            </Panel>
                  
          </Collapse>
          </Col>
              
        ))} 
    

    </>
  )
}

export default Exchanges