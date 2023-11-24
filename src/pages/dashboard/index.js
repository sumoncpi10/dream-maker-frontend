
import AdminSidebar from "@/components/layouts/AdminSidebar";
import LayoutOne from "@/components/layouts/LayoutOne";


// export default function DashboardPage() {
const DashboardPage = () => {
    return (


        <h1>Dashboard</h1>

    );
}

export default DashboardPage;
DashboardPage.getLayout = function getLayout(page) {
    return (
        <LayoutOne title="Dream Maker || Home" style={{ padding: '20px' }} >
            <AdminSidebar>
                {page}
            </AdminSidebar>
        </LayoutOne>
    )
}