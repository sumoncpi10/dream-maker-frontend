


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

const ManageProductPage = () => {
    const [api, contextHolder] = notification.useNotification();
    const { data, isLoading } = useGetProductsQuery({ refetchOnMountOrArgChange: true });
    const product = data?.data;
    console.log(product)
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
                            label: 'Admin',
                            link: '/admin'
                        },
                    ]
                }
            />
            <ManageProduct capitalItem={product} ></ManageProduct>
        </div>
    );
};

export default ManageProductPage;
ManageProductPage.getLayout = function getLayout(page) {
    return (
        <LayoutOne title="Dream Maker || Admin" style={{ padding: '20px' }} >
            <AdminSidebar>
                {page}
            </AdminSidebar>
        </LayoutOne>
    )
}

