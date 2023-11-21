import { Footer } from "antd/es/layout/layout";

const MyFooter = ({ children }) => {
    return (
        <Footer
            style={{
                textAlign: 'center',
                padding: '0px 0px'
            }}
        >
            Developed By: Md. Daduggaman Sumon, JE(IT) & N M Shohel, JE(IT)
            Copyright Reserved ©2023
        </Footer>);
};

export default MyFooter;