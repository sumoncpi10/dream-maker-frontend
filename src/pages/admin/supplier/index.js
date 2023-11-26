


import React, { useState } from 'react';
import { message, notification } from "antd";
import { getSession, useSession } from 'next-auth/react';

import { Alert, Space, Spin } from 'antd';
import ManageSupplier from '@/components/Pages/Info/ManageSupplier';
import { useGetSuppliersQuery } from '@/redux/features/supplier/supplierApi';
import UMBreadCrumb from '@/components/UI/UMBreadCrumb';
import { getUserInfo } from '@/services/user-info';
import LayoutOne from '@/components/layouts/LayoutOne';
import AdminSidebar from '@/components/layouts/AdminSidebar';

const ManageSupplierPage = () => {
    const [api, contextHolder] = notification.useNotification();
    const { data: session } = useSession();
    const [formId, setFormId] = useState();

    const { pbsCode: pbs_code } = getUserInfo();

    const { data, isLoading } = useGetSuppliersQuery({ id: pbs_code }, { refetchOnMountOrArgChange: true });
    const suppliers = data?.data;
    console.log(suppliers)
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
            <ManageSupplier suppliers={suppliers} ></ManageSupplier>
        </div>
    );
};

export default ManageSupplierPage;
ManageSupplierPage.getLayout = function getLayout(page) {
    return (
        <LayoutOne title="Dream Maker || Supplier" style={{ padding: '20px' }}>
            <AdminSidebar >
                {page}
            </AdminSidebar>
        </LayoutOne >
    )
}


