
import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";


const AppLayout = () => {


    return (
        <>
            <NavBar />
            <Outlet />  {/* child routes render here */}
        </>
    )
}

export default AppLayout
