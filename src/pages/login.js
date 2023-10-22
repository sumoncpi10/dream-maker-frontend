// import { Button } from "antd";
// import { GoogleOutlined, GithubOutlined } from "@ant-design/icons";
// import Head from "next/head";
// import styles from "@/styles/Login.module.css";
// import { signIn } from "next-auth/react";
// import Link from "next/link";
// const LoginPage = () => {
//     return (
//         <div>
//             <Head>
//                 <title>Users Login</title>
//             </Head>
//             <div className={styles.form}>
//                 <h3>LOGIN</h3>
//                 <div className={styles.social_icons}>
//                     <GoogleOutlined onClick={() => signIn("google", {
//                         callbackUrl: "http://localhost:3000/"
//                     })} />
//                     <GithubOutlined onClick={() => signIn("github", {
//                         callbackUrl: "http://localhost:3000/"
//                     })} />
//                 </div>
//                 <hr />
//                 <form>
//                     <label htmlFor="">Your Email</label>
//                     <input type="email" />
//                     <label htmlFor="">Your Password</label>
//                     <input type="password" />
//                     <Button>Login</Button>
//                     <hr />
//                     <p>Don't have Account? <Link href="\signup">Sign UP</Link></p>
//                 </form>
//             </div>
//         </div>
//     );
// };

// export default LoginPage;
