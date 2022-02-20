import React from "react";
import './App.css';
import 'antd/dist/antd.css';
import { Layout, Breadcrumb } from 'antd';
import NavigationMenu from "./components/navigationMenu";
import AppRoutes from "./routes";
import { Link } from "react-router-dom";

function App() {
  const { Header, Content, Footer } = Layout;

  return (
    <Layout className="layout">
    <Header>    
      <div className="logo"><Link to='/'>BIG DATA</Link></div>
      <NavigationMenu />
    </Header>
    <Content style={{ padding: '0 50px' }}>
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item><Link to='/'>Home</Link></Breadcrumb.Item>
        <Breadcrumb.Item>Companies</Breadcrumb.Item>
      </Breadcrumb>
      <div className="site-layout-content">
        <AppRoutes />
      </div>
    </Content>
    <Footer style={{ textAlign: 'center' }}>Big Data Federation ©2022 Moldova</Footer>
  </Layout>      
  );
}

export default App;
