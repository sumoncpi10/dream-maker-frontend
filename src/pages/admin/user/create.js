

import AddUser from "@/components/Pages/Users/AddUser";
import UMBreadCrumb from "@/components/UI/UMBreadCrumb";
import AdminSidebar from "@/components/layouts/AdminSidebar";
import LayoutOne from "@/components/layouts/LayoutOne";

const AddUserPage = () => {

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
                            label: 'Users',
                            link: '/admin/user'
                        },

                    ]
                }
            />
            <AddUser ></AddUser>
        </div>
    );
};
export default AddUserPage;
AddUserPage.getLayout = function getLayout(page) {
    return (
        <LayoutOne title="Dream Maker || Users" style={{ padding: '20px' }}>
            <AdminSidebar>
                {page}
            </AdminSidebar>
        </LayoutOne >
    )
}
