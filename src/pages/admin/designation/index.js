
import Header from "@/components/Layout/Header";
import AdminSidebar from "@/components/Layout/AdminSidebar";
import { Space, Spin } from "antd";
import { useGetDepartmentsQuery } from "@/redux/features/department/departmentApi";
import ManageDepartment from "@/components/Pages/Department/ManageDepartment";
import { useGetDesignationsQuery } from "@/redux/features/designation/designationApi";
import ManageDesignation from "@/components/Pages/Department/ManageDesignation";
import UMBreadCrumb from "@/components/UI/UMBreadCrumb";
import Print from "@/components/UI/Print";

const ManageDesignationPage = () => {
    const { data, isLoading } = useGetDesignationsQuery({ refetchOnMountOrArgChange: true });
    const designations = data?.data;
    console.log(designations);
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

            <ManageDesignation designations={designations} ></ManageDesignation>
        </div>
    );
};
export default ManageDesignationPage;
ManageDesignationPage.getLayout = function getLayout(page) {
    return (
        <Header>
            <AdminSidebar>
                {page}
            </AdminSidebar>
        </Header >
    )
}
