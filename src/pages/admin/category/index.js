import ManageCategory from "@/components/Pages/Category/ManageCategory";

import { useGetCategorysQuery } from "@/redux/features/categroys/categroysApi";
import { Space, Spin } from "antd";
import UMBreadCrumb from "@/components/UI/UMBreadCrumb";
// import Print from "@/components/UI/Print";
import AdminSidebar from "@/components/layouts/AdminSidebar";
import LayoutOne from "@/components/layouts/LayoutOne";

const CategoryPage = () => {
    const { data, isLoading } = useGetCategorysQuery({ refetchOnMountOrArgChange: true });
    const categroys = data?.data;
    console.log(categroys);
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

            <ManageCategory categroys={categroys} ></ManageCategory>
        </div>


    );
}
export default CategoryPage;
CategoryPage.getLayout = function getLayout(page) {
    return (
        <LayoutOne title="Dream Maker || Home" style={{ padding: '20px' }} >
            <AdminSidebar>
                {page}
            </AdminSidebar>
        </LayoutOne>
    )
}
