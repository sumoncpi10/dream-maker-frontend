

import { useEffect } from "react";

import AddCategory from "@/components/Pages/Category/AddCategory";

import { useGetGetItemTypeQuery } from "@/redux/features/itemType/itemTypeApi";
import { getUserInfo } from "@/services/user-info";
import { useRouter } from 'next/navigation';


import ManageCategory from "@/components/Pages/Category/ManageCategory";

import { Space, Spin } from "antd";
import UMBreadCrumb from "@/components/UI/UMBreadCrumb";
// import Print from "@/components/UI/Print";
import AdminSidebar from "@/components/layouts/AdminSidebar";
import LayoutOne from "@/components/layouts/LayoutOne";

export default function Dashboard() {
    const { role } = getUserInfo();
    const router = useRouter();

    useEffect(() => {
        if (!["admin"].includes(role)) {
            router.push("/login")
        }
    }, [router]);
    const { data, isLoading } = useGetGetItemTypeQuery({ refetchOnMountOrArgChange: true });
    const itemType = data?.data;
    console.log(itemType);
    if (isLoading) {
        return <Space
            direction="vertical"
            style={{
                display: 'flex',
                justifyContent: 'center', // Center horizontally
                alignItems: 'center',     // Center vertically
                height: '100vh',         // Optional: Make it full screen
            }}
        >
            <Space>
                <Spin tip="Loading" size="large">
                    <div className="content" />
                </Spin>
            </Space>
        </Space>
    }
    return (
        <LayoutOne title="Dream Maker || Home" style={{ padding: '20px' }} >
            <AdminSidebar>

                <UMBreadCrumb
                    items={
                        [
                            {
                                label: 'Admin',
                                link: '/admin'
                            },
                            {
                                label: 'Category',
                                link: '/admin/category'
                            },
                        ]
                    }
                />
                <AddCategory itemType={itemType}></AddCategory>

            </AdminSidebar>
        </LayoutOne>
    );
}
