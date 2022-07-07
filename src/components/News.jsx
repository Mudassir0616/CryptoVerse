import { Avatar, Card, Col, Row, Select, Typography,Option } from 'antd';
import moment from 'moment';
import React,{useState} from 'react'
import { useGetCryptosQuery } from '../services/cryptoApi';
import { useGetCryptoNewsQuery } from '../services/NewsApi'
import Loader from './Loader';

const demoImage = 'https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News';

const News = ({simplified}) => {

  const [newsCategory, setNewsCategory] = useState('Crypto Market')


  const {data: coins} = useGetCryptosQuery(100);
  const {data} =  useGetCryptoNewsQuery({newsCategory, count: simplified? 5 : 32})
  const newsData = data?.value;
  

  if(!newsData) return <Loader/>;
  return (
    <>
    <Row>
      {!simplified && (
        <Col>

        <Select
          className='select-news'
          placeholder="Select a Crypto"
          showSearch
          // optionFilterProp='children'
          onChange={(value)=> setNewsCategory(value)}
          // filterOption={(input, option)=> option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
        >

            {/* <Select.Option value="CryptoCurrency">Crypto Currencies</Select.Option> */}
            {coins?.data?.coins.map((coin)=>(<Select.Option value={coin.name}>{coin.name}</Select.Option>))}
            
            </Select>
        </Col>
      )}
    </Row><br /><br />

    <Row gutter={[10, 20]}>

      {newsData.map((news, index)=>(
        <Col xs={24} sm={24} lg={12} xl={12} xxl={8} key={index}>

          <Card className='news-card' hoverable>

            <a href={news.url} target="_blank" rel='norefferer'>

              <div className="news-image-container">
                <Typography.Title className='news-title' level={4}>
                  {news.name}
                </Typography.Title>

                {/* IF THE API DOESN'T HAVE IMAGE OF SOME NEWS demoImage URL WILL BE USED INSTEAD */}
                <img  src={news?.image?.thumbnail?.contentUrl || demoImage}/>

              </div> <br />

                <p>{news.description}</p>
                <br />
                <div className="provider-container">
                  <div>
                  <Avatar src={news.provider[0]?.image?.thumbnail?.contentUrl}/>
                  <Typography.Text style={{marginLeft:'10px', fontWeight:'500'}}>{news.provider[0]?.name}</Typography.Text>
                  </div>
                  <Typography.Text>{moment(news?.datePublished).startOf('ss').fromNow()}</Typography.Text>
                </div>

            </a>
          </Card>
        </Col>
      ))}
    </Row>
    </>
  )
}

export default News