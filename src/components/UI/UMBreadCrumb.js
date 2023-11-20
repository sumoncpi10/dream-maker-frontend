import Link from "next/link";

const { Breadcrumb } = require("antd")
import {
    HomeOutlined
} from '@ant-design/icons';
const UMBreadCrumb = ({ items }) => {
    const breadCrumbsItems = [
        {
            title: (
                <Link href="/dashboard">
                    <HomeOutlined></HomeOutlined>
                </Link>
            )
        },
        ...items.map(item => {
            return {
                title: item.link ? (
                    <Link href={item.link}>{item.label}</Link>
                ) : (
                    <span>{item.label}</span>
                )
            }
        })
    ]
    return <Breadcrumb style={{
        margin: '16px 0',
    }} items={breadCrumbsItems}></Breadcrumb>
}

export default UMBreadCrumb;