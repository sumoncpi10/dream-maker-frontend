

import React, { useState } from 'react';
import { message, notification } from "antd";
import { getSession, useSession } from 'next-auth/react';

import AddSupplier from '@/components/Pages/Info/AddSupplier';
import UMBreadCrumb from '@/components/UI/UMBreadCrumb';
import LayoutOne from '@/components/layouts/LayoutOne';
import AdminSidebar from '@/components/layouts/AdminSidebar';
const AddSupplierPage = () => {
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
                            label: 'Supplier',
                            link: '/admin/supplier'
                        },
                    ]
                }
            />
            <AddSupplier  ></AddSupplier>
        </div>
    );
};

export default AddSupplierPage;
AddSupplierPage.getLayout = function getLayout(page) {
    return (
        <LayoutOne title="Dream Maker || Add Supplier" style={{ padding: '20px' }}>
            <AdminSidebar >
                {page}
            </AdminSidebar>
        </LayoutOne >
    )
}

