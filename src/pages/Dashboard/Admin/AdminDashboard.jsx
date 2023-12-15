import useAdminStatistic from "../../../hooks/useAdminStatistic";
import LoaderIcon from "../../Utils/LoaderIcon";
import { AdminPieChart } from "./AdminPieChart";

const AdminDashboard = () => {
    const { adminStatistic, isLoadingAdminStatistic } = useAdminStatistic();


    return (
        <div className="max-w-[668px] mx-auto pt-5">
            <h1 className="text-3xl text-center py-5">Admin Dashboard</h1>
            <div className="grid md:grid-cols-2 gap-10 justify-center pb-10">

                <div className="w-80 shadow hover:shadow-lg border py-14 px-5 rounded-md">
                    <h1 className="text-7xl font-semibold text-center text-primary-normal">
                        {
                            isLoadingAdminStatistic ?
                                <div className="flex justify-center items-center py-6">
                                    <div>
                                        <LoaderIcon />
                                    </div>
                                </div> :
                                <>
                                    <p>{adminStatistic?.subTotalRevenue}<sup className="text-5xl">৳</sup></p>
                                </>
                        }
                    </h1>
                    <p className="text-xl text-center py-5">Total Revenue</p>
                </div>
                <div className="w-80 shadow hover:shadow-lg border py-14 px-5 rounded-md">
                    <h1 className="text-7xl font-semibold text-center text-primary-normal">
                        {
                            isLoadingAdminStatistic ?
                                <div className="flex justify-center items-center py-6">
                                    <div>
                                        <LoaderIcon />
                                    </div>
                                </div> :
                                <>
                                    <p>{adminStatistic?.totalBiodata}<sup className="text-5xl">+</sup></p>
                                </>
                        }
                    </h1>
                    <p className="text-xl text-center py-5">Total Biodata Count</p>
                </div>
                <div className="w-80 shadow hover:shadow-lg border py-14 px-5 rounded-md">
                    <h1 className="text-7xl font-semibold text-center text-primary-normal">
                        {
                            isLoadingAdminStatistic ?
                                <div className="flex justify-center items-center py-6">
                                    <div>
                                        <LoaderIcon />
                                    </div>
                                </div> :
                                <>
                                    <p>{adminStatistic?.maleBiodata}<sup className="text-5xl">+</sup></p>
                                </>
                        }
                    </h1>
                    <p className="text-xl text-center py-5">Total Male Biodata </p>
                </div>
                <div className="w-80 shadow hover:shadow-lg border py-14 px-5 rounded-md">
                    <h1 className="text-7xl font-semibold text-center text-primary-normal">
                        {
                            isLoadingAdminStatistic ?
                                <div className="flex justify-center items-center py-6">
                                    <div>
                                        <LoaderIcon />
                                    </div>
                                </div> :
                                <>
                                    <p>{adminStatistic?.femaleBiodata}<sup className="text-5xl">+</sup></p>
                                </>
                        }
                    </h1>
                    <p className="text-xl text-center py-5">Total Female Biodata</p>
                </div>
                <div className="w-80 shadow hover:shadow-lg border py-14 px-5 rounded-md">
                    <h1 className="text-7xl font-semibold text-center text-primary-normal">
                        {
                            isLoadingAdminStatistic ?
                                <div className="flex justify-center items-center py-6">
                                    <div>
                                        <LoaderIcon />
                                    </div>
                                </div> :
                                <>
                                    <p>{adminStatistic?.premiumBiodata}<sup className="text-5xl">+</sup></p>
                                </>
                        }
                    </h1>
                    <p className="text-xl text-center py-5">Total Premium Biodata</p>
                </div>

            </div>

            <div>
                <AdminPieChart adminStatistic={adminStatistic}/>
            </div>

        </div>
    );
};

export default AdminDashboard;