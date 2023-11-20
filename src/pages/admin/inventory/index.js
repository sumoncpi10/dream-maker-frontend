
import Header from "@/components/Layout/Header";
import AdminSidebar from "@/components/Layout/AdminSidebar";
import { Space, Spin } from "antd";
import { useGetDepartmentsQuery } from "@/redux/features/department/departmentApi";
import ManageDepartment from "@/components/Pages/Department/ManageDepartment";
import UMBreadCrumb from "@/components/UI/UMBreadCrumb";
import Print from "@/components/UI/Print";
import ManageAvailableDepartment from "@/components/Pages/Inventory/ManageAvailableDepartment";
import { useGetAvailableComputersQuery, useGetAvailableDepartmentQuery, useGetAvailableDesignationQuery, useGetAvailableDotPrintersQuery, useGetAvailablePRNPRDQuery } from "@/redux/features/inventory/inventoryApi";
import ManageAvailableDesignaton from "@/components/Pages/Inventory/ManageAvailableDesignaton";
import Inventory from "@/components/Pages/Inventory/LaserSCRPTC";
import AntdTableExample from "@/components/Pages/Inventory/LaserSCRPTC";
import LaserSCRPTC from "@/components/Pages/Inventory/LaserSCRPTC";
import Computers from "@/components/Pages/Inventory/Computers";
import DotPrinters from "@/components/Pages/Inventory/DotPrinters";

const InventoryPage = () => {

    // console.log(departments);
    const { data: dataComputer } = useGetAvailableComputersQuery({ refetchOnMountOrArgChange: true });
    const computers = dataComputer?.data?.result;
    // console.log(computers)
    const { data: dataDot } = useGetAvailableDotPrintersQuery({ refetchOnMountOrArgChange: true });
    const dotPrinter = dataDot?.data?.result;
    // console.log(dotPrinter)
    const { data, isLoading } = useGetAvailablePRNPRDQuery({ refetchOnMountOrArgChange: true });
    const departments = data?.data;
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
            {computers && <Computers computers={computers} ></Computers>}
            {dotPrinter && <DotPrinters dotPrinter={dotPrinter} ></DotPrinters>}
            {departments && <LaserSCRPTC departments={departments} ></LaserSCRPTC>}
        </div>
    );
};
export default InventoryPage;
InventoryPage.getLayout = function getLayout(page) {
    return (
        <Header>
            <AdminSidebar>
                {page}
            </AdminSidebar>
        </Header >
    )
}
