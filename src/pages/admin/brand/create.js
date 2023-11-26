

import Header from '@/components/Layout/Header';
import InfoEntrySidebar from '@/components/Layout/InfoEntrySidebar';
import FeaturedCategories from '@/components/UI/FeaturedCategories';
import React, { useState } from 'react';
import { message, notification } from "antd";
import { getSession, useSession } from 'next-auth/react';
import AddBrand from '@/components/Pages/Info/AddBrand';
import UMBreadCrumb from '@/components/UI/UMBreadCrumb';
import LayoutOne from '@/components/layouts/LayoutOne';
import AdminSidebar from '@/components/layouts/AdminSidebar';
const AddBrandPage = () => {
    const [api, contextHolder] = notification.useNotification();
    const { data: session } = useSession();
    const [formId, setFormId] = useState();


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
                            label: 'Brand',
                            link: '/admin/brand'
                        },
                    ]
                }
            />
            <AddBrand  ></AddBrand>
        </div>
    );
};

export default AddBrandPage;
AddBrandPage.getLayout = function getLayout(page) {
    return (
        <LayoutOne title="Dream Maker || Add Brand" style={{ padding: '20px' }}>
            <AdminSidebar >
                {page}
            </AdminSidebar>
        </LayoutOne >
    )
}
