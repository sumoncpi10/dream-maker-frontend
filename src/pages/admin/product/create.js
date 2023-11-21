

import Header from '@/components/Layout/Header';
import InfoEntrySidebar from '@/components/Layout/InfoEntrySidebar';
import FeaturedCategories from '@/components/UI/FeaturedCategories';
import React, { useState } from 'react';
import { message, notification } from "antd";
import { getSession, useSession } from 'next-auth/react';
import ManageCapitalItem from '@/components/Pages/Info/ManageProduct';
import AddCapitalItem from '@/components/Pages/Info/AddProduct';
import { useGetProductsQuery } from '@/redux/features/product/productApi';
import { Alert, Space, Spin } from 'antd';
import { useGetSubCategorysQuery } from '@/redux/features/subCategory/subCategoryApi';
import UMBreadCrumb from '@/components/UI/UMBreadCrumb';
import LayoutOne from '@/components/layouts/LayoutOne';
import AdminSidebar from '@/components/layouts/AdminSidebar';
import AddProduct from '@/components/Pages/Info/AddProduct';
const AddProductPage = () => {
    const [api, contextHolder] = notification.useNotification();
    const { data: session } = useSession();
    const [formId, setFormId] = useState();

    // const accessToken = session?.accessToken?.accessToken;
    // const pbs_code = session?.pbs_code?.pbs_code;

    const { data: dataSubCategroys, isLoading } = useGetSubCategorysQuery();
    const subcategroys = dataSubCategroys?.data;
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
                        {
                            label: 'Products',
                            link: '/admin/product'
                        },
                    ]
                }
            />
            <AddProduct subcategroys={subcategroys} ></AddProduct>
        </div>
    );
};

export default AddProductPage;
AddProductPage.getLayout = function getLayout(page) {
    return (
        <LayoutOne title="Dream Maker || Home" style={{ padding: '20px' }} >
            <AdminSidebar>
                {page}
            </AdminSidebar>
        </LayoutOne>
    )
}
