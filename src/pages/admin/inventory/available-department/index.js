
import Header from "@/components/Layout/Header";
import AdminSidebar from "@/components/Layout/AdminSidebar";
import { Space, Spin } from "antd";
import { useGetDepartmentsQuery } from "@/redux/features/department/departmentApi";
import ManageDepartment from "@/components/Pages/Department/ManageDepartment";
import UMBreadCrumb from "@/components/UI/UMBreadCrumb";
import Print from "@/components/UI/Print";
import ManageAvailableDepartment from "@/components/Pages/Inventory/ManageAvailableDepartment";
import { useGetAvailableDepartmentQuery } from "@/redux/features/inventory/inventoryApi";

const ManageAvailableDepartmentPage = () => {
    const { data, isLoading } = useGetAvailableDepartmentQuery({ refetchOnMountOrArgChange: true });
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
            <ManageAvailableDepartment departments={departments} ></ManageAvailableDepartment>
        </div>
    );
};
export default ManageAvailableDepartmentPage;
ManageAvailableDepartmentPage.getLayout = function getLayout(page) {
    return (
        <Header>
            <AdminSidebar>
                {page}
            </AdminSidebar>
        </Header >
    )
}
