
import { useEffect } from "react";
import AddSubCategory from "@/components/Pages/Category/AddSubCategory";
import { useGetCategorysQuery } from "@/redux/features/categroys/categroysApi";
import { Space, Spin } from "antd";
import UMBreadCrumb from "@/components/UI/UMBreadCrumb";
import { getUserInfo } from "@/services/user-info";
import { useRouter } from "next/navigation";

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
    const { data, isLoading } = useGetCategorysQuery({ refetchOnMountOrArgChange: true });
    const categroys = data?.data;
    console.log(categroys);
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
                            {
                                label: 'Sub Category',
                                link: '/admin/sub-category'
                            },
                        ]
                    }
                />
                <AddSubCategory categroys={categroys}></AddSubCategory>

            </AdminSidebar>
        </LayoutOne>
    );
}

