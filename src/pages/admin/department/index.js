
import Header from "@/components/Layout/Header";
import AdminSidebar from "@/components/Layout/AdminSidebar";
import { Space, Spin } from "antd";
import { useGetDepartmentsQuery } from "@/redux/features/department/departmentApi";
import ManageDepartment from "@/components/Pages/Department/ManageDepartment";
import UMBreadCrumb from "@/components/UI/UMBreadCrumb";
import Print from "@/components/UI/Print";

const ManageDepartmentPage = () => {
    const { data, isLoading } = useGetDepartmentsQuery({ refetchOnMountOrArgChange: true });
    const departments = data?.data;
    console.log(departments);
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
                    ]
                }
            />
            {/* <Print></Print> */}
            <ManageDepartment departments={departments} ></ManageDepartment>
        </div>
    );
};
export default ManageDepartmentPage;
ManageDepartmentPage.getLayout = function getLayout(page) {
    return (
        <Header>
            <AdminSidebar>
                {page}
            </AdminSidebar>
        </Header >
    )
}
