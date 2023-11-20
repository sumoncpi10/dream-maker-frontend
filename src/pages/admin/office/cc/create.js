
import Header from "@/components/Layout/Header";

import AdminSidebar from "@/components/Layout/AdminSidebar";
// import Admin from "@/components/Pages/Admin";
import { useEffect, useState } from "react";
import PBS from "@/components/Pages/Office/PBS";
import Zonal from "@/components/Pages/Office/Zonal";
import CC from "@/components/Pages/Office/CC";
import ManageCategory from "@/components/Pages/Category/ManageCategory";
import ManageSubCategory from "@/components/Pages/Category/ManageSubCategory";
import ManageUsers from "@/components/Pages/Users/ManageUsers";
import ManageDepartment from "@/components/Pages/Department/ManageDepartment";
import ManageDesignation from "@/components/Pages/Department/ManageDesignation";
import AddZonal from "@/components/Pages/Office/AddZonal";
import AddCC from "@/components/Pages/Office/AddCC";
import AddCategory from "@/components/Pages/Category/AddCategory";
import AddSubCategory from "@/components/Pages/Category/AddSubCategory";
import AddDepartment from "@/components/Pages/Department/AddDepartment";
import AddDesignation from "@/components/Pages/Department/AddDesignation";
import AddUser from "@/components/Pages/Users/AddUser";
import { headers } from "next/dist/client/components/headers";
import { getSession, useSession } from "next-auth/react";
import RequestTransfer from "@/components/Pages/Users/RequestTransfer";
import ReleaseUser from "@/components/Pages/Users/ReleaseUser";
import ZonalTransferRequest from "@/components/Pages/Users/ZonalTransferRequest";
import ApproveZonalTransfer from "@/components/Pages/Users/ApproveZonalTransfer";
import { useGetCategorysQuery } from "@/redux/features/categroys/categroysApi";
import { useGetZonalsQuery } from "@/redux/features/office/zonalApi";
import { Space, Spin } from "antd";
import UMBreadCrumb from "@/components/UI/UMBreadCrumb";
import { getUserInfo } from "@/services/user-info";

const AddCCPage = () => {
    const { data: session } = useSession();
    const { pbsCode: pbs_code } = getUserInfo();
    const { data, isLoading } = useGetZonalsQuery({ id: pbs_code }, { refetchOnMountOrArgChange: true });
    const zonals = data?.data;
    console.log(zonals)
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
            <UMBreadCrumb
                items={
                    [
                        {
                            label: 'Admin',
                            link: '/admin'
                        },
                        {
                            label: 'Zonal',
                            link: '/admin/office'
                        },
                        {
                            label: 'Complain Center',
                            link: '/admin/office/cc'
                        },
                    ]
                }
            />
            <AddCC zonals={zonals}></AddCC>
        </div>
    );
};
export default AddCCPage;
AddCCPage.getLayout = function getLayout(page) {
    return (
        <Header>
            <AdminSidebar>
                {page}
            </AdminSidebar>
        </Header >
    )
}
