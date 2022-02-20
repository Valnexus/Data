import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu } from 'antd';

const NavigationMenu = () => {
    const location = useLocation();
    const [activePage, setActivePage] = useState('1');

    const menu = [{
        name: 'Companies',
        url: '/'
    },
    {
        name: 'Charts',
        url: '/charts'
    }];

    useEffect(()=>{
        if(location.pathname === "/") { setActivePage('1') }
        if(location.pathname === "/charts") { setActivePage('2') }
      },[location.pathname]);

    return (
        <Menu theme="dark" mode="horizontal" selectedKeys={[activePage]}>
            {menu.map((item, index) => {
            const key = index + 1;
            return <Menu.Item key={key}><Link to={item.url}>{item.name}</Link></Menu.Item>;
            })}
        </Menu>
    )
};

export default NavigationMenu;