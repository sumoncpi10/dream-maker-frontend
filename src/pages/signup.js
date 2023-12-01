import { useState } from 'react';
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { GoogleOutlined, GithubOutlined } from "@ant-design/icons";
import Head from "next/head";
import styles from "@/styles/Login.module.css";
import { signIn, useSession } from "next-auth/react";
import { notification } from "antd";
import Link from "next/link";
import LayoutOne from "@/components/layouts/LayoutOne";
import { useUserSignupMutation } from '@/redux/features/auth/authApi';
const SignUpPage = () => {
    console.log(useSession())
    const [api, contextHolder] = notification.useNotification();
    const [loading, setLoading] = useState(false);
    const [userSignup] = useUserSignupMutation()
    const onFinish = async (values) => {
        setLoading(true);
        console.log('Received values:', values);
        const role = 'customer';
        const updatedValues = { ...values, role };
        const options = {
            data: updatedValues
        }
        const result = await userSignup(options);
        console.log(result)
        if (result?.data?.statusCode == 200) {
            const openNotificationWithIcon = (type) => {
                api[type]({
                    message: result?.data?.message,
                });
            };
            openNotificationWithIcon('success')
            router.push("/login");
        } else {
            const openNotificationWithIcon = (type) => {
                api[type]({
                    message: result?.error?.data?.message,
                });
            };
            openNotificationWithIcon('error')
        }
        setLoading(false);

    };



    return (
        <div>
            {contextHolder}
            <Head>
                <title>Users Sign Up</title>
            </Head>
            <LayoutOne title="Dream Maker || Sign Up"  >
                <Form
                    name="login"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    style={{ width: 400, height: 450 }}
                    className={styles.form}
                >
                    <h3>Sign Up</h3>
                    <div className={styles.social_icons}>
                        <GoogleOutlined onClick={() => signIn("google", {
                            callbackUrl: "http://localhost:3000/"
                        })} />
                        <GithubOutlined onClick={() => signIn("github", {
                            callbackUrl: "http://localhost:3000/"
                        })} />
                    </div>
                    <hr />
                    <Form.Item
                        name="name"
                        rules={[{ required: true, message: 'Please input your Name!' }]}
                    >
                        <Input prefix={<UserOutlined />} placeholder="Name" />
                    </Form.Item>
                    <Form.Item
                        name="contactNo"
                        rules={[{ required: true, message: 'Please input your Phone!' }]}
                    >
                        <Input prefix={<UserOutlined />} placeholder="Phone" />
                    </Form.Item>
                    <Form.Item
                        name="email"
                        rules={[{ required: true, message: 'Please input your Email!' }]}
                    >
                        <Input prefix={<UserOutlined />} placeholder="Email" />
                    </Form.Item>

                    <Form.Item style={{ padding: 0, marginBottom: 0 }}
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input.Password prefix={<LockOutlined />} placeholder="Password" />


                    </Form.Item>
                    <Form.Item style={{ padding: 0, margin: 0 }}                   >
                        <Link href="#" style={{ float: 'right' }}>
                            Forgot password
                        </Link>
                    </Form.Item>

                    {/* <Form.Item> */}
                    <Button htmlType="submit" loading={loading}>Sign Up</Button>
                    {/* </Form.Item> */}
                    <hr />
                    <p>Already have an Account? <Link href="\login">Login</Link></p>

                </Form>

            </LayoutOne>
        </div>
    );
};

export default SignUpPage;
