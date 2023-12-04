


import React, { useState } from 'react';
import { notification } from "antd";
import { useSession } from 'next-auth/react';
import { Space, Spin } from 'antd';
import { useGetProductsQuery } from '@/redux/features/product/productApi';
import UMBreadCrumb from '@/components/UI/UMBreadCrumb';
import { getUserInfo } from '@/services/user-info';
import LayoutOne from '@/components/layouts/LayoutOne';
import AdminSidebar from '@/components/layouts/AdminSidebar';
import ManageProduct from '@/components/Pages/Info/ManageProduct';
import ManageProfile from '@/components/Pages/Info/UserProfile';
import UserProfile from '@/components/Pages/Users/UserProfile';
import { useGetEmployeeQuery } from '@/redux/features/auth/authApi';

const ManageProfilePage = () => {
    const [api, contextHolder] = notification.useNotification();
    const { email } = getUserInfo()
    const { data, isLoading } = useGetEmployeeQuery({ id: email, refetchOnMountOrArgChange: true });
    const product = data?.data;
    // console.log(product)
    if (isLoading || !product) {
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
        <div>
            {contextHolder}
            <UMBreadCrumb
                items={
                    [
                        {
                            label: 'Order',
                            link: '/admin/order'
                        },
                    ]
                }
            />
            <UserProfile employee={product} ></UserProfile>
        </div>
    );
};

export default ManageProfilePage;
ManageProfilePage.getLayout = function getLayout(page) {
    return (
        <LayoutOne title="Dream Maker || Admin" style={{ padding: '20px' }} >
            <AdminSidebar>
                {page}
            </AdminSidebar>
        </LayoutOne>
    )
}

