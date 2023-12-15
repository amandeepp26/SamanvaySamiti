import { Link, useParams } from "react-router-dom";
import LoaderIcon from "../Utils/LoaderIcon";
import { useEffect } from "react";
import useTypeBiodatas from "../../hooks/useTypeBiodatas";
import useSingleBiodataById from "../../hooks/useSingleBiodataById";
import { MdFavoriteBorder } from "react-icons/md";
import useStoreFavorite from "../../hooks/useStoreFavorite";
import useSelfUser from "../../hooks/useSelfUser";
import BiodataCard from "../Utils/biodatas/biodataCard";

const BiodataDetails = () => {
    const { id } = useParams();
    const [singleBiodata, , isSingleBiodataLoading] = useSingleBiodataById(id);
    const [typeBiodatas, refetchTypeBiodatas, isTypeBiodataLoading] = useTypeBiodatas(singleBiodata?.type);

    const { selfUser, refetchSelfUser } = useSelfUser();

    const handleStoreFavorite = useStoreFavorite()

    useEffect(() => {
        refetchTypeBiodatas()
    }, [singleBiodata?.type, refetchTypeBiodatas, refetchSelfUser])



    return (
        <div className="container mx-auto px-5 grid lg:grid-cols-4 lg:gap-3">

            <div className="border-b-2 lg:border-b-0 lg:border-r bg-[#ffffffc2] pb-8">

                <div className="p-2">
                    <div className="w-48 mx-auto relative mt-5">
                        <img className=" w-full" src={singleBiodata?.img} alt={singleBiodata?.name} />
                        <div className=" group absolute top-3 right-1">
                            <button onClick={() => handleStoreFavorite(singleBiodata)} className="md:block mr-3 p-2 rounded-full text-primary-normal text-lg border border-primary-normal hover:bg-primary-normal hover:text-white">
                                <MdFavoriteBorder />
                            </button>
                            <div className="absolute hidden bg-gray-800 text-white text-xs p-1 rounded-md -mt-[66px] -ml-3 group-hover:block">
                                Favorite
                            </div>
                        </div>
                    </div>
                    <h1 className="font-medium text-xl py-2 border-b border-primary-normal text-center"><span className="font-bold">ID: </span> #0{singleBiodata?.biodataId}</h1>

                    <p className="py-1 pt-3"><span className="font-medium">Age :</span> {singleBiodata?.age}</p>
                    <p className="py-1"><span className="font-medium">Date Of Birth :</span> {singleBiodata?.birth}</p>
                    <p className="py-1"><span className="font-medium">Gender :</span> {singleBiodata?.type}</p>
                    <p className="py-1"><span className="font-medium">Occupation :</span> {singleBiodata?.occupation}</p>
                    <p className="py-1"><span className="font-medium">Religion :</span> {singleBiodata?.religion}</p>
                    <p className="py-1"><span className="font-medium">Race :</span> {singleBiodata?.race}</p>
                    <p className="py-1"><span className="font-medium">Height :</span> {singleBiodata?.height}ft  {singleBiodata?.inches}in</p>
                    <p className="py-1"><span className="font-medium">Weight :</span> {singleBiodata?.weight} kg</p>
                    <p className="py-1"><span className="font-medium">Fathers name :</span> {singleBiodata?.fathersName} kg</p>
                    <p className="py-1"><span className="font-medium">Mothers name :</span> {singleBiodata?.mothersName} kg</p>
                    <p className="py-1"><span className="font-medium">Permanent Division :</span> {singleBiodata?.permanentDivision}</p>
                    <p className="py-1"><span className="font-medium">Present Division :</span> {singleBiodata?.presentDivision}</p>

                    <h1 className="text-base font-medium text-primary-normal border-t border-b py-2 mt-6 mb-2">Expected Partner</h1>

                    <p className="py-1"><span className="font-medium">Expected Partner Age :</span> {singleBiodata?.expectedPartnerAge}</p>
                    <p className="py-1"><span className="font-medium">Expected Partner Height :</span> {singleBiodata?.expectedPartnerHeight}ft  {singleBiodata?.expectedPartnerInches}in</p>
                    <p className="py-1"><span className="font-medium">Expected Partner Age :</span> {singleBiodata?.expectedPartnerAge}</p>
                    <p className="py-1"><span className="font-medium">Expected Partner Weight :</span> {singleBiodata?.expectedPartnerWeight}</p>

                    <h1 className="text-base font-medium text-primary-normal border-t border-b py-2 mt-6 mb-2">Contact Info</h1>



                    {
                        selfUser.isPro === 'Premium' ?
                            <>
                                <p className="py-1"><span className="font-medium">Name :</span> {singleBiodata?.name}</p>
                                <p className="py-1"><span className="font-medium">Mobile :</span> {singleBiodata?.mobile}</p>
                                <p className="py-1"><span className="font-medium">Email :</span> {singleBiodata?.email}</p>
                            </> :
                            <>
                                <Link to={`/checkout/${singleBiodata?._id}`}>
                                    <button className="py-2 px-3 mt-5 text-sm rounded bg-primary-normal text-white">Request for contact info</button>
                                </Link>
                            </>
                    }



                </div>


            </div>

            <div className="lg:col-span-3">
                <h1 className="text-2xl text-left pt-5 flex gap-2 items-center">
                    Similar Biodatas {isTypeBiodataLoading ? <div className="w-5 h-5 mt-1"><LoaderIcon /></div> : typeBiodatas?.length}
                </h1>

                {
                    isSingleBiodataLoading || isTypeBiodataLoading ?
                        <>
                            <div className="h-96 w-full flex items-center justify-center">
                                <LoaderIcon />
                            </div>
                        </> :
                        <>
                            <div className="custom-media-query grid grid-cols-1 lg:grid-cols-2 gap-4 py-6">
                                {
                                    typeBiodatas.map(item => <BiodataCard key={item._id} item={item} />)
                                }
                            </div>
                        </>
                }
            </div>
        </div>
    );
};

export default BiodataDetails;