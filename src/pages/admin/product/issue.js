

import Header from '@/components/Layout/Header';
import InfoEntrySidebar from '@/components/Layout/InfoEntrySidebar';
import FeaturedCategories from '@/components/UI/FeaturedCategories';
import React, { useState } from 'react';
import { message, notification } from "antd";
import { getSession, useSession } from 'next-auth/react';
import ManageCapitalItem from '@/components/Pages/Info/ManageProduct';
import AddCapitalItem from '@/components/Pages/Info/AddProduct';
import { Alert, Space, Spin } from 'antd';
import { useGetProductsQuery, useGetNotAssignCapitalItemsQuery } from '@/redux/features/product/productApi';
import IssueCapitalItem from '@/components/Dashboard/IssueCapitalItem';
import UMBreadCrumb from '@/components/UI/UMBreadCrumb';
import { getUserInfo } from '@/services/user-info';

const IssueCapitalItemPage = () => {
    const [api, contextHolder] = notification.useNotification();
    const { data: session } = useSession();
    const [formId, setFormId] = useState();

    const { pbsCode: pbs_code } = getUserInfo();
    const { data, isLoading } = useGetNotAssignCapitalItemsQuery({ id: pbs_code }, { refetchOnMountOrArgChange: true });
    const notAssignCapitalItem = data?.data;
    console.log(notAssignCapitalItem)
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
                            label: 'Product Entry',
                            link: '/info'
                        },
                    ]
                }
            />
            <IssueCapitalItem notAssignCapitalItem={notAssignCapitalItem} ></IssueCapitalItem>
        </div>
    );
};

export default IssueCapitalItemPage;
IssueCapitalItemPage.getLayout = function getLayout(page) {
    return (
        <Header>
            <InfoEntrySidebar >
                {page}
            </InfoEntrySidebar>
        </Header >
    )
}

