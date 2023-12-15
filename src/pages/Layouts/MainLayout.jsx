import { Outlet } from "react-router-dom";
import Header from "../../Header/Header";
import Footer from "../../Footer/Footer";
import bg_img from "../../assets/img/bg_img.png"

const MainLayout = () => {


    return (
        <div style={{ backgroundImage: `url(${bg_img})`}} className="bg-repeat-y bg-contain">
            <Header/>
            <Outlet/>
            <Footer/> 
        </div>
    );
};

export default MainLayout;