
import { useGetSubCategorysQuery } from "@/redux/features/subCategory/subCategoryApi";
import { Space, Spin } from "antd";
import UMBreadCrumb from "@/components/UI/UMBreadCrumb";
// import Print from "@/components/UI/Print";
import AdminSidebar from "@/components/layouts/AdminSidebar";
import LayoutOne from "@/components/layouts/LayoutOne";
import ManageSubCategory from "@/components/Pages/Category/ManageSubCategory";

const SubCategoryPage = () => {
    const { data, isLoading } = useGetSubCategorysQuery({ refetchOnMountOrArgChange: true });
    const subcategroys = data?.data;
    console.log(subcategroys);
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
                            label: 'Category',
                            link: '/category'
                        },
                    ]
                }
            />
            <ManageSubCategory subcategroys={subcategroys} ></ManageSubCategory>
        </div>
    );
}
export default SubCategoryPage;
SubCategoryPage.getLayout = function getLayout(page) {
    return (
        <LayoutOne title="Dream Maker || Home" style={{ padding: '20px' }} >
            <AdminSidebar>
                {page}
            </AdminSidebar>
        </LayoutOne>
    )
}
