import React,{useEffect, useState} from 'react'
import { Avatar, Button, Menu, Typography } from 'antd'
import { Link } from 'react-router-dom'
import { BulbOutlined, FundOutlined, HomeOutlined, MenuOutlined, MoneyCollectOutlined } from '@ant-design/icons'
import Icon from '../images/crypto-img.png'

const Navbar = () => {

    const [activeMenu, setActiveMenu] = useState(true)
    const [screenSize, setScreenSize] = useState(null)

    useEffect(()=>{
        const handleResize =()=> setScreenSize(window.innerWidth)

        window.addEventListener('resize', handleResize)
        handleResize()

        return ()=> window.removeEventListener('resize', handleResize)
    } ,[])

    useEffect(()=>{
        if(screenSize < 786){
            setActiveMenu(false)
        }else{
            setActiveMenu(true)
        }
    } ,[screenSize])
  return (
    <div className='nav-container'>

        <div className="logo-container">
            <Avatar src={Icon} size="large"/>
            <Typography.Title level={2} className='logo'>
                <Link to="/">CryptoVerse</Link>
            </Typography.Title>
        </div>

        <Button className='menu-control-container' onClick={()=> setActiveMenu(!activeMenu)}>
        <MenuOutlined style={{color:'darkblue'}}/>
        </Button>

        {activeMenu? (
        
        <Menu theme='dark'>
            <Menu.Item icon={<HomeOutlined/>}>
                <Link to="/">Home</Link>
            </Menu.Item>

            <Menu.Item icon={<FundOutlined/>}>
                <Link to="/cryptocurrencies">Crypto currencies</Link>
            </Menu.Item>

            <Menu.Item icon={<MoneyCollectOutlined/>}>
                <Link to="/exchanges">Exchanges</Link>
            </Menu.Item>

            <Menu.Item icon={<BulbOutlined/>}>
                <Link to="/news">News</Link>
            </Menu.Item>
        </Menu>

        ): ''}
    </div>
  )
}

export default Navbar