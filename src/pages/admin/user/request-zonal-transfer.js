
import Header from "@/components/Layout/Header";

import AdminSidebar from "@/components/Layout/AdminSidebar";

import ManageCategory from "@/components/Pages/Category/ManageCategory";

import { useGetCategorysQuery } from "@/redux/features/categroys/categroysApi";
import { Space, Spin } from "antd";
import ManageUsers from "@/components/Pages/Users/ManageUsers";
import { useGetUsersQuery } from "@/redux/features/user/userApi";
import { useSession } from "next-auth/react";
import ApproveZonalTransfer from "@/components/Pages/Users/ApproveZonalTransfer";
import ZonalTransferRequest from "@/components/Pages/Users/ZonalTransferRequest";
import UMBreadCrumb from "@/components/UI/UMBreadCrumb";
import { getUserInfo } from "@/services/user-info";

const RequestZonalTransferPage = () => {
    const { data: session } = useSession();
    const { pbsCode: pbs_code } = getUserInfo();
    const { data, isLoading } = useGetUsersQuery({ id: pbs_code }, { refetchOnMountOrArgChange: true });
    const users = data?.data;
    console.log(users);
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
                            label: 'Users',
                            link: '/admin/user'
                        },
                    ]
                }
            />
            <ZonalTransferRequest users={users}></ZonalTransferRequest>
        </div>
    );
};
export default RequestZonalTransferPage;
RequestZonalTransferPage.getLayout = function getLayout(page) {
    return (
        <Header>
            <AdminSidebar>
                {page}
            </AdminSidebar>
        </Header >
    )
}