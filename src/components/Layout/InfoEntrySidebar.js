import React, { useState } from 'react';
import {
  DesktopOutlined,
  FileOutlined,
  ApartmentOutlined,
  MediumOutlined,
  BranchesOutlined,
  UserOutlined,
  IssuesCloseOutlined,
  StockOutlined,
  CustomerServiceOutlined,
} from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import Link from 'next/link';
const { Header, Content, Footer, Sider } = Layout;

const InfoEntrySidebar = ({ children, setFormId }) => {
  const { props } = children;
  // //console.log('Category from Adminside', category);
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  function getItem(label, key, icon, children) {
    return {
      key,
      icon,
      children,
      label,
    };
  }
  const items = [

    getItem('Revinue Item', 'sub1', <StockOutlined />, [
      getItem(<Link href={"/info/revenue-item/create"}>Add</Link>, '1'),
      getItem(<Link href={"/info/revenue-item"}>Manage</Link>, '2'),
      getItem(<Link href={"/info/revenue-item/issue"}>Issue</Link>, '3'),
    ]),
    getItem('Capital Item', 'sub2', <StockOutlined />, [
      getItem(<Link href={"/info/capital-item/create"}>Add</Link>, '4'),
      getItem(<Link href={"/info/capital-item"}>Manage</Link>, '5'),
      getItem(<Link href={"/info/capital-item/issue"}>Issue</Link>, '6'),
    ]),
    getItem('Servicing', 'sub3', <CustomerServiceOutlined />, [
      getItem(<Link href={"/info/servicing/create"}>Add Servicing</Link>, '7'),
      getItem(<Link href={"/info/servicing"}>Manage Servicing</Link>, '8'),
    ]),
    getItem('Brand', 'sub4', <BranchesOutlined />, [
      getItem(<Link href={"/info/brand/create"}>Add Brand</Link>, '9'),
      getItem(<Link href={"/info/brand"}>Manage Brand</Link>, '10'),
    ]),
    getItem('Model', 'sub5', <MediumOutlined />, [
      getItem(<Link href={"/info/model/create"}>Add Model</Link>, '11'),
      getItem(<Link href={"/info/model"}>Manage Model</Link>, '12'),
    ]),
    getItem('Supplier', 'sub6', <ApartmentOutlined />, [
      getItem(<Link href={"/info/supplier/create"}>Add Supplier</Link>, '13'),
      getItem(<Link href={"/info/supplier"}>Manage</Link>, '14'),
    ]),

    // getItem('Files', '9', <FileOutlined />)
    // getItem('Team', 'sub2', <TeamOutlined />, [getItem('Team 1', '6'), getItem('Team 2', '8')]),
  ];

  const handleAdminSidebarClick = (reportKey) => {
    // Here you can define the action you want to perform when a report item is clicked.
    //console.log('Report with key', reportKey, 'is clicked!');
    // setFormId(reportKey)
  };
  return (
    <Layout
      style={{
        minHeight: '100vh',
      }}
    >

      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div className="demo-logo-vertical" />
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
          {items.map((item) => {
            if (item.children) {
              return (
                <Menu.SubMenu key={item.key} icon={item.icon} title={item.label}>
                  {item.children.map((childItem) => (
                    <Menu.Item key={childItem.key} onClick={() => handleAdminSidebarClick(childItem.key)}>
                      {childItem.label}
                    </Menu.Item>
                  ))}
                </Menu.SubMenu>
              );
            } else {
              return (
                <Menu.Item key={item.key} icon={item.icon} onClick={() => handleAdminSidebarClick(item.key)}>
                  {item.label}
                </Menu.Item>
              );
            }
          })}
        </Menu>
      </Sider>
      <Layout>
        {/* <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        /> */}
        <Content
          style={{
            margin: '0 16px',
          }}
        >
          {/* <Breadcrumb
            style={{
              margin: '16px 0',
            }}
          >
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item>
          </Breadcrumb> */}
          <div
            style={{
              // padding: 24,
              // minHeight: 360,
              background: colorBgContainer,
            }}
          >
            {children}
          </div>
        </Content>
        <Footer
          style={{
            textAlign: 'center',
            padding: '0px 0px'
          }}
        >
          Developed By: Md. Daduggaman Sumon, JE(IT) & N M Shohel, JE(IT)
          Copyright Reserved ©2023
        </Footer>
      </Layout>
    </Layout>
  );
};
export default InfoEntrySidebar;