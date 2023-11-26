

import React, { useState } from 'react';
import { notification } from "antd";
import { useSession } from 'next-auth/react';

import { Space, Spin } from 'antd';

import { useGetBrandsQuery } from '@/redux/features/brand/brandApi';
import ManageBrand from '@/components/Pages/Info/ManageBrand';
import UMBreadCrumb from '@/components/UI/UMBreadCrumb';
import LayoutOne from '@/components/layouts/LayoutOne';
import AdminSidebar from '@/components/layouts/AdminSidebar';

const ManageBrandPage = () => {
    const [api, contextHolder] = notification.useNotification();
    const { data: session } = useSession();
    const [formId, setFormId] = useState();
    const { data, isLoading } = useGetBrandsQuery({ refetchOnMountOrArgChange: true });
    const brands = data?.data;
    console.log(brands)
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
            <ManageBrand brands={brands} ></ManageBrand>
        </div>
    );
};

export default ManageBrandPage;
ManageBrandPage.getLayout = function getLayout(page) {
    return (
        <LayoutOne title="Dream Maker || Brand" style={{ padding: '20px' }}>
            <AdminSidebar >
                {page}
            </AdminSidebar>
        </LayoutOne >
    )
}

