import { Button } from "antd";
import { GoogleOutlined, GithubOutlined } from "@ant-design/icons";
import Head from "next/head";
import styles from "@/styles/Login.module.css";
import { signIn } from "next-auth/react";
import Link from "next/link";
const LoginPage = () => {
    return (
        <div>
            <Head>
                <title>Users Sign UP</title>
            </Head>
            <div className={styles.form}>
                <h3>Sign UP</h3>
                <div className={styles.social_icons}>
                    <GoogleOutlined onClick={() => signIn("google", {
                        callbackUrl: "http://localhost:3000/"
                    })} />
                    <GithubOutlined onClick={() => signIn("github", {
                        callbackUrl: "http://localhost:3000/"
                    })} />
                </div>
                <hr />
                <form>
                    <label htmlFor="">Your Email</label>
                    <input type="email" />
                    <label htmlFor="">Your Password</label>
                    <input type="password" />
                    <Button>Sign UP</Button>
                    <hr />
                    <p>Already have an Account? <Link href="\login">Log In</Link></p>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;
