
import Header from "@/components/Layout/Header";

import AdminSidebar from "@/components/Layout/AdminSidebar";
import { Space, Spin } from "antd";
import ManageUsers from "@/components/Pages/Users/ManageUsers";
import { useGetUsersQuery } from "@/redux/features/user/userApi";
import { useSession } from "next-auth/react";
import RequestTransfer from "@/components/Pages/Users/RequestTransfer";
import UMBreadCrumb from "@/components/UI/UMBreadCrumb";
import { getUserInfo } from "@/services/user-info";

const RequestPBSTransferPage = () => {
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
            <RequestTransfer users={users} ></RequestTransfer>
        </div>
    );
};
export default RequestPBSTransferPage;
RequestPBSTransferPage.getLayout = function getLayout(page) {
    return (
        <Header>
            <AdminSidebar>
                {page}
            </AdminSidebar>
        </Header >
    )
}
