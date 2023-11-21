
import Header from "@/components/Layout/Header";

import AdminSidebar from "@/components/Layout/AdminSidebar";
import FeaturedCategories from "@/components/UI/FeaturedCategories";
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
