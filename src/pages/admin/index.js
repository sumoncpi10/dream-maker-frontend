
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
import FeaturedCategories from "@/components/UI/FeaturedCategories";
// export async function getServerSideProps(context) {
//   const session = await getSession(context);

//   if (!session || !["admin", "super_admin"].includes(session?.role?.role)) {
//     return {
//       redirect: {
//         destination: "/",
//         permanent: false,
//       },
//     };
//   }
//   const accessToken = session?.accessToken?.accessToken;
//   const getMethod = {
//     method: "GET",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: accessToken,
//     },
//   }
//   const resItemType = await fetch(`${process.env.BACKEND_URL}/api/v1/item-type`, getMethod);
//   const dataItemType = await resItemType.json();
//   const resCategory = await fetch(`${process.env.BACKEND_URL}/api/v1/category`, getMethod);
//   const dataCategory = await resCategory.json();
//   const resSubCategory = await fetch(`${process.env.BACKEND_URL}/api/v1/sub-category`, getMethod);
//   const dataSubCategory = await resSubCategory.json();
//   const resZonal = await fetch(`${process.env.BACKEND_URL}/api/v1/zonal/${session?.pbs_code?.pbs_code}`, getMethod);
//   const dataZonal = await resZonal.json();
//   const resCC = await fetch(`${process.env.BACKEND_URL}/api/v1/complain/${session?.pbs_code?.pbs_code}`, getMethod);
//   const dataCC = await resCC.json();
//   const resDepartment = await fetch(`${process.env.BACKEND_URL}/api/v1/department`, getMethod);
//   const dataDepartment = await resDepartment.json();
//   const resDesignation = await fetch(`${process.env.BACKEND_URL}/api/v1/designation`, getMethod);
//   const dataDesignation = await resDesignation.json();
//   const resUsers = await fetch(`${process.env.BACKEND_URL}/api/v1/user/${session?.pbs_code?.pbs_code}`, getMethod);
//   const dataUsers = await resUsers.json();
//   const resZonalTransferRequestedUser = await fetch(`${process.env.BACKEND_URL}/api/v1/user/zonal-all-transfer-requested-user/${session?.pbs_code?.pbs_code}`, getMethod);
//   const dataZonalTransferRequestedUser = await resZonalTransferRequestedUser.json();
//   const resTransferRequestedUser = await fetch(`${process.env.BACKEND_URL}/api/v1/user/pbs-all-transfer-requested-user/${session?.pbs_code?.pbs_code}`, getMethod);
//   const dataTransferRequestedUser = await resTransferRequestedUser.json();

//   // //console.log(data);
//   return {
//     props: {
//       itemType: dataItemType.data || [],
//       categroys: dataCategory.data || [],
//       subcategroys: dataSubCategory.data || [],
//       designations: dataDesignation.data || [],
//       departments: dataDepartment.data || [],
//       users: dataUsers.data || [],
//       zonals: dataZonal.data || [],
//       ccs: dataCC.data || [],
//       zonalRequestedUser: dataZonalTransferRequestedUser.data || [],
//       requestedUser: dataTransferRequestedUser.data || [],
//     },
//   };
// }
const AdminPage = () => {

  const category = [
    {
      "id": "1",
      "category": "Sub Category",
      "image_url": "https://www.startech.com.bd/image/cache/catalog/ram/cosair/vengeance-8gb-ddr4-3200mhz/vengeance-8gb-ddr4-3200mhz-01-228x228.webp",
      "url": "admin/sub-category"
    },
    {
      "id": "2",
      "category": "Category",
      "image_url": "https://www.startech.com.bd/image/cache/catalog/cpu-cooler/antec/t120/t120-01-228x228.jpg",
      "url": "admin/category"
    },
    {
      "id": "3",
      "category": "Designation",
      "image_url": "https://www.startech.com.bd/image/cache/catalog/ram/cosair/vengeance-8gb-ddr4-3200mhz/vengeance-8gb-ddr4-3200mhz-01-228x228.webp",
      "url": "admin/designation"
    },
    {
      "id": "4",
      "category": "Department",
      "image_url": "https://www.startech.com.bd/image/cache/catalog/motherboard/asus/prime-h610m-K-d4/prime-h610m-K-d4-02-228x228.jpg", "url": "info/brnad",
      "url": "admin/department"
    },
    {
      "id": "5",
      "category": "User",
      "image_url": "https://www.startech.com.bd/image/cache/catalog/ram/cosair/vengeance-8gb-ddr4-3200mhz/vengeance-8gb-ddr4-3200mhz-01-228x228.webp",
      "url": "admin/user"
    },
    {
      "id": "6",
      "category": "Zonal",
      "image_url": "https://www.startech.com.bd/image/cache/catalog/ram/cosair/vengeance-8gb-ddr4-3200mhz/vengeance-8gb-ddr4-3200mhz-01-228x228.webp", "url": "info/capital-item",
      "url": "admin/office"
    },
    {
      "id": "7",
      "category": "Complain Center",
      "image_url": "https://www.startech.com.bd/image/cache/catalog/ram/cosair/vengeance-8gb-ddr4-3200mhz/vengeance-8gb-ddr4-3200mhz-01-228x228.webp",
      "url": "admin/office/cc"
    },

  ]
  return (
    <div>
      <FeaturedCategories allProducts={category} PageTitle="Admin"></FeaturedCategories>
    </div>
  );
};
export default AdminPage;
AdminPage.getLayout = function getLayout(page) {
  return (
    <Header>
      <AdminSidebar>
        {page}
      </AdminSidebar>
    </Header >
  )
}
