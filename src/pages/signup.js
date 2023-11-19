import { useState } from 'react';
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { GoogleOutlined, GithubOutlined } from "@ant-design/icons";
import Head from "next/head";
import styles from "@/styles/Login.module.css";
import { signIn, useSession } from "next-auth/react";

import Link from "next/link";
import LayoutOne from "@/components/layouts/LayoutOne";
const SignUpPage = () => {
    console.log(useSession())

    const [loading, setLoading] = useState(false);

    const onFinish = async (values) => {
        setLoading(true);
        console.log('Received values:', values);
        setLoading(false);
        const result = await signIn('credentials', {
            callbackUrl: "http://localhost:3000/",
            email: values?.email,
            password: values?.password,
        });

        if (!result.error) {
            console.log('Login successful');
        } else {
            console.error(result.error);
        }
    };



    return (
        <div>
            <Head>
                <title>Users Sign Up</title>
            </Head>
            <LayoutOne title="Dream Maker || Sign Up"  >
                <Form
                    name="login"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    style={{ width: 400 }}
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
