import React, { useEffect, useState } from "react";
import { Layout, Menu, Switch, Button, Drawer, Row, Col } from "antd";
import {
  HomeOutlined,
  MenuOutlined,
  DashboardOutlined,
  FileAddOutlined,
  FileProtectOutlined,
  UsergroupAddOutlined
} from "@ant-design/icons";
import { useRouter } from 'next/navigation';
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
const { Header } = Layout;
import Image from 'next/image';
import { getUserInfo, isLoggedIn, removeUserInfo } from "@/services/user-info";
const ResponsiveNav = ({ children }) => {
  const auth = isLoggedIn();
  const authUser = getUserInfo();
  console.log(authUser);
  const router = useRouter();
  // const { data: session } = useSession();
  useEffect(() => {
    if (!auth) {
      router.push("/login")
    }
  }, [authUser]);
  // console.log(session);
  const [visible, setVisible] = useState(false);
  const [theme, setTheme] = useState('light');
  const [current, setCurrent] = useState('1');
  const changeTheme = (value) => {
    setTheme(value ? 'dark' : 'light');
  };
  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };
  const logout = () => {
    removeUserInfo("accessToken");
    router.push("/login")
  }
  const menu = <>
    <Menu.Item key="3" icon={<DashboardOutlined />}>
      <Link style={{ textDecoration: 'none' }} href="/dashboard">
        My Products
      </Link>
    </Menu.Item>
    {
      authUser?.role == 'admin' || authUser?.role == 'incharge' ?
        <Menu.Item key="2" icon={<FileProtectOutlined />}>
          <Link style={{ textDecoration: 'none' }} href="/info">
            Product Entry
          </Link>
        </Menu.Item> : ""}
    {
      authUser?.role == 'admin' || authUser?.role == 'super_admin' ?
        <Menu.Item key="6" icon={<UsergroupAddOutlined />}>
          <Link style={{ textDecoration: 'none' }} href="/admin">
            Admin
          </Link>
        </Menu.Item> : ""}

  </>
  return (
    <Layout className="layout">
      <Header style={{ padding: 0 }}>
        <Row justify="space-between" align="right">
          <Col xs={20} sm={20} md={8}>
            <div
              className="logo"
              style={{ color: "white", paddingLeft: "50px" }}
            >
              PBS Common Store
            </div>
          </Col>
          <Col xs={0} sm={0} md={10}>
            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["1"]}>

              {menu}


            </Menu>
          </Col>
          <Col xs={25} sm={0} md={6}>
            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["2"]}>

              {
                !authUser?.role ? <Menu.Item key="6">
                  <Button type="primary" >
                    <Link style={{ color: "black", textDecoration: 'none' }} href="/login">
                      Login
                    </Link>
                  </Button>
                </Menu.Item> : <>
                  <Menu.SubMenu
                    icon={authUser?.photoUrl ? <Image alt="User Name" src={authUser?.photoUrl} width={25} height={25} /> : ""}
                    title={`${authUser?.name}, ${authUser?.designation}`} key="7" style={{ color: "cyan", textDecoration: 'none' }}>
                    <Menu.Item key="7:1">
                      <Link style={{ color: "green", textDecoration: 'none' }} href="/profile">
                        Profile
                      </Link>
                    </Menu.Item>
                    <Menu.Item key="7:2">
                      <Link style={{ color: "green", textDecoration: 'none' }} href="/profile/change-password">
                        Change Password
                      </Link>
                    </Menu.Item>

                    <Menu.Item key="7:3" onClick={logout}>Logout</Menu.Item>
                  </Menu.SubMenu></>
              }</Menu>
          </Col>

          <Col xs={2} sm={2} md={0}>
            <Button type="primary" onClick={showDrawer}>
              <MenuOutlined />
            </Button>
          </Col>
        </Row>
        <Drawer
          title="Menu"
          placement="left"
          onClick={onClose}
          onClose={onClose}
          open={visible}
        >
          <Menu mode="vertical" defaultSelectedKeys={["1"]} selectedKeys={[current]}>
            <Switch
              checked={theme === 'dark'}
              onChange={changeTheme}
              checkedChildren="Dark"
              unCheckedChildren="Light"
            />
            <br />
            <br />
            {menu}
            {
              !authUser?.role ? <Menu.Item key="6">
                <Button type="primary" >
                  <Link style={{ color: "green", textDecoration: 'none' }} href="/login">
                    Login
                  </Link>
                </Button>
              </Menu.Item> : <Menu.SubMenu icon={authUser?.photoUrl ? <Image alt="User Name" src={authUser?.photoUrl} width={25} height={25} /> : ""} title={authUser?.name} key="7" style={{ color: "cyan", textDecoration: 'none' }}>
                <Menu.Item key="7:1"><Link style={{ color: "green", textDecoration: 'none' }} href="/profile">
                  Profile
                </Link></Menu.Item>

                <Menu.Item key="7:2" style={{ color: "green", textDecoration: 'none' }} onClick={logout}>Logout</Menu.Item>
              </Menu.SubMenu>
            }
          </Menu>

        </Drawer>{children}
      </Header>

    </Layout>
  );
};

export default ResponsiveNav;