
import Header from "@/components/Layout/Header";

import AdminSidebar from "@/components/Layout/AdminSidebar";
// import Admin from "@/components/Pages/Admin";
import { useEffect, useState } from "react";
import PBS from "@/components/Pages/Office/PBS";
import Zonal from "@/components/Pages/Office/Zonal";
import CC from "@/components/Pages/Office/CC";
import ManageCategory from "@/components/Pages/Category/ManageCategory";
import ManageSubCategory from "@/components/Pages/Category/ManageSubCategory";
import ManageUsers from "@/components/Pages/Users/ManageUsers";
import ManageDepartment from "@/components/Pages/Department/ManageDepartment";
import ManageDesignation from "@/components/Pages/Department/ManageDesignation";
import AddZonal from "@/components/Pages/Office/AddZonal";
import AddCC from "@/components/Pages/Office/AddCC";
import AddCategory from "@/components/Pages/Category/AddCategory";
import AddSubCategory from "@/components/Pages/Category/AddSubCategory";
import AddDepartment from "@/components/Pages/Department/AddDepartment";
import AddDesignation from "@/components/Pages/Department/AddDesignation";
import AddUser from "@/components/Pages/Users/AddUser";
import { headers } from "next/dist/client/components/headers";
import { getSession } from "next-auth/react";
import RequestTransfer from "@/components/Pages/Users/RequestTransfer";
import ReleaseUser from "@/components/Pages/Users/ReleaseUser";
import ZonalTransferRequest from "@/components/Pages/Users/ZonalTransferRequest";
import ApproveZonalTransfer from "@/components/Pages/Users/ApproveZonalTransfer";
import { useGetCategorysQuery } from "@/redux/features/categroys/categroysApi";
import UMBreadCrumb from "@/components/UI/UMBreadCrumb";
import { getUserInfo } from "@/services/user-info";
import { useRouter } from "next/navigation";

const AddDesignationPage = () => {
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
                            label: 'Designation',
                            link: '/admin/designation'
                        },
                    ]
                }
            />
            <AddDesignation ></AddDesignation>
        </div>
    );
};
export default AddDesignationPage;
AddDesignationPage.getLayout = function getLayout(page) {
    return (
        <Header>
            <AdminSidebar>
                {page}
            </AdminSidebar>
        </Header >
    )
}
