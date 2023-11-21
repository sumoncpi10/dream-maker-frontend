import React, { useState } from 'react';
import {
  TeamOutlined,
  UserOutlined,
  BuildOutlined
} from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import Link from 'next/link';
import { getUserInfo } from '@/services/user-info';
import { useRouter } from 'next/navigation';
const { Content, Footer, Sider } = Layout;

const AdminSidebar = ({ children, setZonalCode, setformId }) => {
  const { props } = children;
  const { role } = getUserInfo();
  const router = useRouter();
  //console.log('Childer from Adminside', children);
  const [collapsed, setCollapsed] = useState(false);
  const [breadcrumbItems, setBreadcrumbItems] = useState([]);

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
  } let items = "";
  if (role == 'super_admin') {
    items = [
      getItem('Sub Category', 'sub1', <UserOutlined />, [
        getItem(<Link href={"/admin/sub-category/create"}>Add Sub Category</Link>, '1'),
        getItem(<Link href={"/admin/sub-category"}>Manage Sub Category</Link>, '2'),
      ]),
      getItem('Category', 'sub2', <UserOutlined />, [
        getItem(<Link href={"/admin/category/create"}>Add Category</Link>, '3'),
        getItem(<Link href={"/admin/category"}>Manage Category</Link>, '4'),
      ]),
      getItem('User', 'sub3', <UserOutlined />, [
        getItem(<Link href={"/admin/user/create"}>Add User</Link>, '5'),
        getItem(<Link href={"/admin/user"}>Manage User</Link>, '6'),
        getItem(<Link href={"/admin/user/request-zonal-transfer"}>Request Zonal Transfer</Link>, '7'),
        getItem(<Link href={"/admin/user/approve-zonal-transfer"}>Approve Zonal Transfer</Link>, '8'),
        getItem(<Link href={"/admin/user/request-pbs-transfer"}>Request PBS Transfer</Link>, '9'),
        getItem(<Link href={"/admin/user/approve-pbs-transfer"}>Release PBS Transfer</Link>, '10'),
      ]),
      getItem('Designation', 'sub4', <UserOutlined />, [
        getItem(<Link href={"/admin/designation/create"}>Add Designation</Link>, '11'),
        getItem(<Link href={"/admin/designation"}>Manage Designation</Link>, '12'),
      ]),
      getItem('Department', 'sub5', <TeamOutlined />, [
        getItem(<Link href={"/admin/department/create"}>Add Department</Link>, '13'),
        getItem(<Link href={"/admin/department"}>Manage Department</Link>, '14'),
      ]),
      getItem('Office', 'sub6', <BuildOutlined />, [
        getItem(<Link href={"/admin/office/create"}>Add HQ/Zonal/SubZonal</Link>, '15'),
        getItem(<Link href={"/admin/office"}>Manage HQ/Zonal/SubZonal</Link>, '16'),
        getItem(<Link href={"/admin/office/cc/create"}>Add CCS</Link>, '17'),
        getItem(<Link href={"/admin/office/cc"}>Manage CCS</Link>, '18'),
      ]),
    ];
  }
  else {
    items = [
      getItem('Sub Category', 'sub1', <UserOutlined />, [
        getItem(<Link href={"/admin/sub-category"}>Manage Sub Category</Link>, '2'),
      ]),
      getItem('Category', 'sub2', <UserOutlined />, [
        getItem(<Link href={"/admin/category"}>Manage Category</Link>, '4'),
      ]),
      getItem('User', 'sub3', <UserOutlined />, [
        getItem(<Link href={"/admin/user/create"}>Add User</Link>, '5'),
        getItem(<Link href={"/admin/user"}>Manage User</Link>, '6'),
        getItem(<Link href={"/admin/user/request-zonal-transfer"}>Request Zonal Transfer</Link>, '7'),
        getItem(<Link href={"/admin/user/approve-zonal-transfer"}>Approve Zonal Transfer</Link>, '8'),
        getItem(<Link href={"/admin/user/request-pbs-transfer"}>Request PBS Transfer</Link>, '9'),
        getItem(<Link href={"/admin/user/approve-pbs-transfer"}>Release PBS Transfer</Link>, '10'),
      ]),

      getItem('Designation', 'sub4', <UserOutlined />, [
        getItem(<Link href={"/admin/designation"}>Manage Designation</Link>, '12'),
      ]),
      getItem('Department', 'sub5', <TeamOutlined />, [
        getItem(<Link href={"/admin/department"}>Manage Department</Link>, '14'),
      ]),
      getItem('Office', 'sub6', <BuildOutlined />, [
        getItem(<Link href={"/admin/office/create"}>Add HQ/Zonal/SubZonal</Link>, '15'),
        getItem(<Link href={"/admin/office"}>Manage HQ/Zonal/SubZonal</Link>, '16'),
        getItem(<Link href={"/admin/office/cc/create"}>Add CCS</Link>, '17'),
        getItem(<Link href={"/admin/office/cc"}>Manage CCS</Link>, '18'),
      ]),
      getItem('Report', 'sub7', <UserOutlined />, [
        getItem(<Link href={"/admin/inventory"}>Availablity List</Link>, '23'),
      ]),
      getItem('Availablity Setting', 'sub8', <UserOutlined />, [
        getItem(<Link href={"/admin/inventory/available-department/create"}>Add Available Department</Link>, '19'),
        getItem(<Link href={"/admin/inventory/available-department"}>Manage Available Department</Link>, '20'),
        getItem(<Link href={"/admin/inventory/available-designation/create"}>Add Available Designation</Link>, '21'),
        getItem(<Link href={"/admin/inventory/available-designation"}>Manage Available Designation</Link>, '22'),
      ]),
    ];
  }
  const handleAdminSidebarClick = (label, key) => {
    // Here you can define the action you want to perform when a menu item is clicked.
    //console.log('Item with key', key, 'is clicked!');

    // Create a new breadcrumb item
    const newItem = {
      label,
      key,
    };
    // setZonalCode(key);
    // setformId(key);
    // Update breadcrumbItems state with the new item
    setBreadcrumbItems(prevBreadcrumb => [newItem]);
  };

  //  const handleAdminSidebarClick = (reportKey) => {
  //     // Here you can define the action you want to perform when a report item is clicked.
  //     //console.log('Report with key', reportKey, 'is clicked!');
  //   };
  return (
    <Layout
      style={{
        minHeight: '100vh',
      }}
    >
      {/* <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div className="demo-logo-vertical" />
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
      </Sider> */}
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div className="demo-logo-vertical" />
        {/* <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
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
        </Menu> */}
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
          {items.map((item) => {
            if (item.children) {
              return (
                <Menu.SubMenu key={item.key} icon={item.icon} title={item.label}>
                  {item.children.map((childItem) => (
                    <Menu.Item key={childItem.key} onClick={() => handleAdminSidebarClick(childItem.label, childItem.key)}>
                      {childItem.label}
                    </Menu.Item>
                  ))}
                </Menu.SubMenu>
              );
            } else {
              return (
                <Menu.Item key={item.key} icon={item.icon} onClick={() => handleAdminSidebarClick(item.label, item.key)}>
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
            <Breadcrumb.Item>Admin</Breadcrumb.Item>
            <Breadcrumb.Item>Reports</Breadcrumb.Item>
            {breadcrumbItems.map(item => (
              <Breadcrumb.Item key={item.key}>{item.label}</Breadcrumb.Item>
            ))}

          </Breadcrumb> */}
          <div
            style={{
              padding: 24,
              minHeight: 360,
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
export default AdminSidebar;