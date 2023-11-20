
import Header from "@/components/Layout/Header";
import AdminSidebar from "@/components/Layout/AdminSidebar";
import { Space, Spin } from "antd";
import { useGetDepartmentsQuery } from "@/redux/features/department/departmentApi";
import ManageDepartment from "@/components/Pages/Department/ManageDepartment";
import Zonal from "@/components/Pages/Office/Zonal";
import { useGetZonalsQuery } from "@/redux/features/office/zonalApi";
import { useSession } from "next-auth/react";
import CC from "@/components/Pages/Office/CC";
import { useGetCcsQuery } from "@/redux/features/office/ccApi";
import UMBreadCrumb from "@/components/UI/UMBreadCrumb";
import { getUserInfo } from "@/services/user-info";

const ManageCCPage = () => {
    const { data: session } = useSession();
    const { pbsCode: pbs_code } = getUserInfo();
    const { data, isLoading } = useGetCcsQuery({ id: pbs_code }, { refetchOnMountOrArgChange: true });
    const ccs = data?.data;
    console.log(ccs);
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
                            link: '/zonal'
                        },
                    ]
                }
            />
            <CC ccs={ccs} ></CC>
        </div>
    );
};
export default ManageCCPage;
ManageCCPage.getLayout = function getLayout(page) {
    return (
        <Header>
            <AdminSidebar>
                {page}
            </AdminSidebar>
        </Header >
    )
}
