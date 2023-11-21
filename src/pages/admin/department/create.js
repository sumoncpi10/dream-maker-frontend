
import Header from "@/components/Layout/Header";

import AdminSidebar from "@/components/Layout/AdminSidebar";
// import Admin from "@/components/Pages/Admin";
import { useEffect, useState } from "react";
import AddDepartment from "@/components/Pages/Department/AddDepartment";
import UMBreadCrumb from "@/components/UI/UMBreadCrumb";
import { getUserInfo } from "@/services/user-info";
import { useRouter } from "next/navigation";

const AddDepartmentPage = () => {
    const { role } = getUserInfo();
    const router = useRouter();

    useEffect(() => {
        if (!["super_admin"].includes(role)) {
            router.push("/login")
        }
    }, [router]);
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
                            label: 'Department',
                            link: '/admin/department'
                        },
                    ]
                }
            />
            <AddDepartment ></AddDepartment>
        </div>
    );
};
export default AddDepartmentPage;
AddDepartmentPage.getLayout = function getLayout(page) {
    return (
        <Header>
            <AdminSidebar>
                {page}
            </AdminSidebar>
        </Header >
    )
}
