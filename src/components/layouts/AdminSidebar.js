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
  console.log(role)
  const router = useRouter();
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

    const newItem = {
      label,
      key,
    };

    setBreadcrumbItems(prevBreadcrumb => [newItem]);
  };


  return (
    <Layout
      style={{
        minHeight: '100vh',

      }}
    >

      <Sider style={{
        minHeight: '100vh',
        background: 'white'
      }} collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div className="demo-logo-vertical" />

        <Menu style={{
          minHeight: '100vh',
          background: 'white'
        }} theme="" defaultSelectedKeys={['1']} mode="inline">
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
                <Menu.Item style={{
                  background: 'white'
                }} key={item.key} icon={item.icon} onClick={() => handleAdminSidebarClick(item.label, item.key)}>
                  {item.label}
                </Menu.Item>
              );
            }
          })}
        </Menu>

      </Sider>
      <Layout>

        <Content
          style={{
            margin: '0 16px',
          }}
        >

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