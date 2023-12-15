import { useForm } from "react-hook-form"
import useAuth from "../../../hooks/useAuth";
import { useState } from "react";
import LoaderIcon from "../../Utils/LoaderIcon";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import useSelfBiodata from "../../../hooks/useSelfBiodata";

const EditBiodata_Backup = () => {
    const { user } = useAuth();
    const [loadingIcon, setLoadingIcon] = useState(false);
    const axiosSecure = useAxiosSecure();
    const { selfBiodata } = useSelfBiodata()

    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = (data) => {
        setLoadingIcon(true);

        const biodata = {
            age: data.age,
            birth: data.birth,
            email: data.email,
            height: data.height,
            img: data.img || data.type === 'Male' ? 'https://i.ibb.co/R6yVpqY/male.jpg' : 'https://i.ibb.co/cy4t8SN/female.jpg',
            inches: data.inches,
            mobile: data.mobile,
            mothersName: data.mothersName,
            name: data.name,
            occupation: data.occupation,
            race: data.race,
            religion: data.religion,
            type: data.type,
            weight: data.weight,
            permanentDivision: data.permanentDivision,
            presentDivision: data.presentDivision,
            expectedPartnerAge: data.expectedPartnerAge,
            expectedPartnerHeight: data.expectedPartnerHeight,
            expectedPartnerInches: data.expectedPartnerInches,
            expectedPartnerWeight: data.expectedPartnerWeight,
            fathersName: data.fathersName,
        }

        if (selfBiodata?.biodataId) {
            axiosSecure.put(`biodatas/${user?.email}`, biodata)
                .then(response => {
                    if (response.data.modifiedCount > 0) {
                        Swal.fire({
                            position: "center",
                            icon: "success",
                            title: `Biodata Updated Successfully`,
                            showConfirmButton: false,
                            timer: 5000
                        });
                    }
                    setLoadingIcon(false);
                    console.log('Updated', response.data);

                }).catch((error) => {
                    if (error.message) {
                        Swal.fire({
                            position: "center",
                            icon: "warning",
                            title: error.message,
                            showConfirmButton: false,
                            timer: 5000
                        });
                    }
                    setLoadingIcon(false);
                })
        } else {
            axiosSecure.post('/biodatas', biodata)
                .then(response => {
                    if (response.data.insertedId) {
                        Swal.fire({
                            position: "center",
                            icon: "success",
                            title: `Biodata Added Successfully`,
                            showConfirmButton: false,
                            timer: 5000
                        });
                    }
                    setLoadingIcon(false);
                    console.log('New added', response.data);

                }).catch((error) => {
                    if (error.message) {
                        Swal.fire({
                            position: "center",
                            icon: "warning",
                            title: error.message,
                            showConfirmButton: false,
                            timer: 5000
                        });
                    }
                    setLoadingIcon(false);
                })
        }

    }


    console.log('biodataId:', selfBiodata?.type);

    return (
        <>
            <div className="pb-8 px-4">
                <h1 className='text-3xl py-5'>Add/Edit Biodata</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 sm:gap-6">

                        <div className="w-full">
                            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 cursor-pointer"> Name*</label>
                            <input
                                type="text" id="name"  {...register("name", { required: true })}
                                placeholder="Full name" className="bg-gray-50 border border-gray-300 text-base rounded-lg block w-full p-2.5 text-gray-400"
                                defaultValue={user?.displayName}
                                readOnly
                            />
                            {errors?.name && <span className="text-red-500">Name is required</span>}
                        </div>

                        <div className="w-full">
                            <label htmlFor="type" className="block mb-2 text-sm font-medium text-gray-900 cursor-pointer"> Biodata Type*</label>
                            <select id="type" {...register("type", { required: true })}
                                className="bg-gray-50 border border-gray-300 text-base rounded-lg block w-full p-2.5"

                            >
                                <option value="">Select option</option>
                                <option value="Male">Male</option>
                                <option value="Female"> Female </option>
                            </select>
                            {errors?.type && <span className="text-red-500"> Biodata Type is required</span>}
                        </div>

                        <div className="w-full">
                            <label htmlFor="img" className="block mb-2 text-sm font-medium text-gray-900 cursor-pointer"> Profile Image Link*</label>
                            <input
                                type="url" id="img"  {...register("img")}
                                placeholder="https://placeholder.png" className="bg-gray-50 border border-gray-300 text-base rounded-lg block w-full p-2.5"
                                defaultValue={selfBiodata?.img}
                            />
                        </div>

                        <div className="w-full">
                            <label htmlFor="birth" className="block mb-2 text-sm font-medium text-gray-900 cursor-pointer"> Date of birth*</label>
                            <input
                                type="date" id="birth"  {...register("birth", { required: true })}
                                placeholder="Date of birth" className="bg-gray-50 border border-gray-300 text-base rounded-lg block w-full p-2.5"
                                defaultValue={selfBiodata?.birth}
                            />
                            {errors?.birth && <span className="text-red-500"> Date of birth is required</span>}
                        </div>

                        <div className="flex gap-3 items-center">
                            <div className="w-full">
                                <label htmlFor="height" className="block mb-2 text-sm font-medium text-gray-900 cursor-pointer">Height*</label>
                                <select id="height" {...register("height", { required: true })}
                                    className="bg-gray-50 border border-gray-300 text-base rounded-lg block w-full p-2.5"

                                >
                                    <option value="">Select option</option>
                                    <option value="4">4 ft</option>
                                    <option value="5">5 ft</option>
                                    <option value="6">6 ft</option>
                                    <option value="7">7 ft</option>
                                </select>
                                {errors?.height && <span className="text-red-500"> Height is required</span>}
                            </div>
                            <div className="w-full">
                                <label htmlFor="inches" className="block mb-2 text-sm font-medium text-gray-900 cursor-pointer">inches*</label>
                                <select id="inches" {...register("inches")}
                                    className="bg-gray-50 border border-gray-300 text-base rounded-lg block w-full p-2.5"

                                >
                                    <option value="">Select option</option>
                                    <option value="1">1 inc</option>
                                    <option value="2">2 inc</option>
                                    <option value="3">3 inc</option>
                                    <option value="4">4 inc</option>
                                    <option value="5">5 inc</option>
                                    <option value="6">6 inc</option>
                                    <option value="7">7 inc</option>
                                    <option value="8">8 inc</option>
                                    <option value="9">9 inc</option>
                                    <option value="10">10 inc</option>
                                    <option value="11">11 inc</option>
                                </select>
                            </div>
                        </div>

                        <div className="flex gap-3 items-center">
                            <div className="w-full">
                                <label htmlFor="weight" className="block mb-2 text-sm font-medium text-gray-900 cursor-pointer">Weight*</label>
                                <select id="weight" {...register("weight", { required: true })}
                                    className="bg-gray-50 border border-gray-300 text-base rounded-lg block w-full p-2.5"

                                >
                                    <option value="">Select option</option>
                                    <option value="30">30</option>
                                    <option value="35">35</option>
                                    <option value="40">40</option>
                                    <option value="45">45</option>
                                    <option value="50">50</option>
                                    <option value="55">55</option>
                                    <option value="60">60</option>
                                    <option value="65">65</option>
                                    <option value="70">70</option>
                                    <option value="75">75</option>
                                    <option value="80">80</option>
                                    <option value="85">85</option>
                                </select>
                                {errors?.weight && <span className="text-red-500"> Weight is required</span>}
                            </div>
                            <div className="w-full">
                                <label htmlFor="age" className="block mb-2 text-sm font-medium text-gray-900 cursor-pointer">Age*</label>
                                <select id="age" {...register("age", { required: true })}
                                    className="bg-gray-50 border border-gray-300 text-base rounded-lg block w-full p-2.5"

                                >
                                    <option value="">Select option</option>
                                    <option value="20">20</option>
                                    <option value="21">21</option>
                                    <option value="22">22</option>
                                    <option value="23">23</option>
                                    <option value="24">24</option>
                                    <option value="25">25</option>
                                    <option value="26">26</option>
                                    <option value="27">27</option>
                                    <option value="28">28</option>
                                    <option value="29">29</option>
                                    <option value="30">30</option>
                                    <option value="31">31</option>
                                    <option value="32">32</option>
                                    <option value="33">33</option>
                                    <option value="34">34</option>
                                    <option value="35">35</option>
                                    <option value="36">36</option>
                                    <option value="37">37</option>
                                    <option value="38">38</option>
                                    <option value="39">39</option>
                                    <option value="40">40</option>
                                    <option value="41">41</option>
                                    <option value="42">42</option>
                                    <option value="43">43</option>
                                    <option value="44">44</option>
                                    <option value="45">45</option>
                                    <option value="46">46</option>
                                    <option value="47">47</option>
                                    <option value="48">48</option>
                                    <option value="49">49</option>
                                    <option value="50">50</option>
                                    <option value="51">51</option>
                                    <option value="52">52</option>
                                    <option value="53">53</option>
                                    <option value="54">54</option>
                                    <option value="55">55</option>
                                </select>
                                {errors?.age && <span className="text-red-500"> Age is required</span>}
                            </div>
                        </div>

                        <div className="w-full">
                            <label htmlFor="occupation" className="block mb-2 text-sm font-medium text-gray-900 cursor-pointer"> Occupation*</label>
                            <select id="occupation" {...register("occupation", { required: true })}
                                className="bg-gray-50 border border-gray-300 text-base rounded-lg block w-full p-2.5"

                            >
                                <option value="">Select option</option>
                                <option value="Software">Software</option>
                                <option value="Teacher"> Teacher </option>
                                <option value="Business"> Business </option>
                                <option value="Doctor"> Doctor </option>
                                <option value="Engineer"> Engineer </option>
                                <option value="Artist"> Artist </option>
                                <option value="Banker"> Banker </option>
                                <option value="Artist"> Artist </option>
                            </select>
                            {errors?.occupation && <span className="text-red-500"> Occupation is required</span>}
                        </div>

                        <div className="w-full">
                            <label htmlFor="race" className="block mb-2 text-sm font-medium text-gray-900 cursor-pointer"> Race*</label>
                            <select id="race" {...register("race", { required: true })}
                                className="bg-gray-50 border border-gray-300 text-base rounded-lg block w-full p-2.5"

                            >
                                <option value="">Select option</option>
                                <option value="Bangali">Bangali</option>
                                <option value="Indian"> Indian </option>
                                <option value="Nepali"> Nepali </option>
                                <option value="Pakistani"> Pakistani </option>
                                <option value="Burmese"> Burmese </option>
                            </select>
                            {errors?.race && <span className="text-red-500"> Race is required</span>}
                        </div>

                        <div className="w-full">
                            <label htmlFor="religion" className="block mb-2 text-sm font-medium text-gray-900 cursor-pointer"> Religion*</label>
                            <select id="religion" {...register("religion", { required: true })}
                                className="bg-gray-50 border border-gray-300 text-base rounded-lg block w-full p-2.5"

                            >
                                <option value="">Select option</option>
                                <option value="Muslim">Muslim</option>
                                <option value="Christian"> Christian </option>
                                <option value="Hindu"> Hindu </option>
                            </select>
                            {errors?.religion && <span className="text-red-500"> Religion is required</span>}
                        </div>

                        <div className="w-full">
                            <label htmlFor="fathersName" className="block mb-2 text-sm font-medium text-gray-900 cursor-pointer"> Fathers name*</label>
                            <input
                                type="text" id="fathersName"  {...register("fathersName", { required: true })}
                                placeholder="Fathers name" className="bg-gray-50 border border-gray-300 text-base rounded-lg block w-full p-2.5"
                                defaultValue={selfBiodata?.fathersName}
                            />
                            {errors?.fathersName && <span className="text-red-500"> Fathers name is required</span>}
                        </div>

                        <div className="w-full">
                            <label htmlFor="mothersName" className="block mb-2 text-sm font-medium text-gray-900 cursor-pointer"> Mothers name*</label>
                            <input
                                type="text" id="mothersName"  {...register("mothersName", { required: true })}
                                placeholder="Mothers name" className="bg-gray-50 border border-gray-300 text-base rounded-lg block w-full p-2.5"
                                defaultValue={selfBiodata?.mothersName}
                            />
                            {errors?.mothersName && <span className="text-red-500"> Mothers name is required</span>}
                        </div>

                        <div className="w-full">
                            <label htmlFor="permanentDivision" className="block mb-2 text-sm font-medium text-gray-900 cursor-pointer"> Permanent Division*</label>
                            <select id="permanentDivision" {...register("permanentDivision", { required: true })}
                                className="bg-gray-50 border border-gray-300 text-base rounded-lg block w-full p-2.5"

                            >
                                <option value="">Select option</option>
                                <option value="Dhaka">Dhaka</option>
                                <option value="Chattagram"> Chattagram </option>
                                <option value="Maymansign"> Maymansign </option>
                                <option value="Rangpur"> Rangpur </option>
                                <option value="Barisal"> Barisal </option>
                                <option value="Khulna"> Khulna </option>
                                <option value="Sylhet"> Sylhet </option>
                            </select>
                            {errors?.permanentDivision && <span className="text-red-500"> Permanent Division is required</span>}
                        </div>

                        <div className="w-full">
                            <label htmlFor="presentDivision" className="block mb-2 text-sm font-medium text-gray-900 cursor-pointer"> Present Division*</label>
                            <select id="presentDivision" {...register("presentDivision", { required: true })}
                                className="bg-gray-50 border border-gray-300 text-base rounded-lg block w-full p-2.5"

                            >
                                <option value="">Select option</option>
                                <option value="Dhaka">Dhaka</option>
                                <option value="Chattagram"> Chattagram </option>
                                <option value="Maymansign"> Maymansign </option>
                                <option value="Rangpur"> Rangpur </option>
                                <option value="Barisal"> Barisal </option>
                                <option value="Khulna"> Khulna </option>
                                <option value="Sylhet"> Sylhet </option>
                            </select>
                            {errors?.presentDivision && <span className="text-red-500"> Present Division is required</span>}
                        </div>

                        <div className="flex gap-3 items-center">
                            <div className="w-full">
                                <label htmlFor="expectedPartnerHeight" className="block mb-2 text-xs font-medium text-gray-900 cursor-pointer">Expected partner height*</label>
                                <select id="expectedPartnerHeight" {...register("expectedPartnerHeight", { required: true })}
                                    className="bg-gray-50 border border-gray-300 text-base rounded-lg block w-full p-2.5"

                                >
                                    <option value="">Select option</option>
                                    <option value="4">4 ft</option>
                                    <option value="5">5 ft</option>
                                    <option value="6">6 ft</option>
                                    <option value="7">7 ft</option>
                                </select>
                                {errors?.expectedPartnerHeight && <span className="text-red-500 text-xs"> Expected partner height is required</span>}
                            </div>
                            <div className="w-full">
                                <label htmlFor="expectedPartnerInches" className="block mb-2 text-xs font-medium text-gray-900 cursor-pointer">Expected partner inches*</label>
                                <select id="expectedPartnerInches" {...register("expectedPartnerInches")}
                                    className="bg-gray-50 border border-gray-300 text-base rounded-lg block w-full p-2.5"

                                >
                                    <option value="">Select option</option>
                                    <option value="1">1 inc</option>
                                    <option value="2">2 inc</option>
                                    <option value="3">3 inc</option>
                                    <option value="4">4 inc</option>
                                    <option value="5">5 inc</option>
                                    <option value="6">6 inc</option>
                                    <option value="7">7 inc</option>
                                    <option value="8">8 inc</option>
                                    <option value="9">9 inc</option>
                                    <option value="10">10 inc</option>
                                    <option value="11">11 inc</option>
                                </select>
                            </div>
                        </div>

                        <div className="flex gap-3 items-center">
                            <div className="w-full">
                                <label htmlFor="expectedPartnerWeight" className="block mb-2 text-xs font-medium text-gray-900 cursor-pointer">Expected partner weight*</label>
                                <select id="expectedPartnerWeight" {...register("expectedPartnerWeight", { required: true })}
                                    className="bg-gray-50 border border-gray-300 text-base rounded-lg block w-full p-2.5"

                                >
                                    <option value="">Select option</option>
                                    <option value="30">30</option>
                                    <option value="35">35</option>
                                    <option value="40">40</option>
                                    <option value="45">45</option>
                                    <option value="50">50</option>
                                    <option value="55">55</option>
                                    <option value="60">60</option>
                                    <option value="65">65</option>
                                    <option value="70">70</option>
                                    <option value="75">75</option>
                                    <option value="80">80</option>
                                    <option value="85">85</option>
                                </select>
                                {errors?.expectedPartnerWeight && <span className="text-red-500 text-xs"> Expected partner weight is required</span>}
                            </div>
                            <div className="w-full">
                                <label htmlFor="expectedPartnerAge" className="block mb-2 text-xs font-medium text-gray-900 cursor-pointer">Expected partner age*</label>
                                <select id="expectedPartnerAge" {...register("expectedPartnerAge", { required: true })}
                                    className="bg-gray-50 border border-gray-300 text-base rounded-lg block w-full p-2.5"

                                >
                                    <option value="">Select option</option>
                                    <option value="20">20</option>
                                    <option value="21">21</option>
                                    <option value="22">22</option>
                                    <option value="23">23</option>
                                    <option value="24">24</option>
                                    <option value="25">25</option>
                                    <option value="26">26</option>
                                    <option value="27">27</option>
                                    <option value="28">28</option>
                                    <option value="29">29</option>
                                    <option value="30">30</option>
                                    <option value="31">31</option>
                                    <option value="32">32</option>
                                    <option value="33">33</option>
                                    <option value="34">34</option>
                                    <option value="35">35</option>
                                    <option value="36">36</option>
                                    <option value="37">37</option>
                                    <option value="38">38</option>
                                    <option value="39">39</option>
                                    <option value="40">40</option>
                                    <option value="41">41</option>
                                    <option value="42">42</option>
                                    <option value="43">43</option>
                                    <option value="44">44</option>
                                    <option value="45">45</option>
                                    <option value="46">46</option>
                                    <option value="47">47</option>
                                    <option value="48">48</option>
                                    <option value="49">49</option>
                                    <option value="50">50</option>
                                    <option value="51">51</option>
                                    <option value="52">52</option>
                                    <option value="53">53</option>
                                    <option value="54">54</option>
                                    <option value="55">55</option>
                                </select>
                                {errors?.expectedPartnerAge && <span className="text-red-500 text-xs"> Expected partner age is required</span>}
                            </div>
                        </div>

                        <div className="w-full">
                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 cursor-pointer"> Contact email*</label>
                            <input
                                type="text" id="email"  {...register("email", { required: true })}
                                placeholder="Contact email" className="bg-gray-50 border border-gray-300 text-base rounded-lg block w-full p-2.5 text-gray-400"
                                defaultValue={user?.email}
                                readOnly
                            />
                            {errors?.email && <span className="text-red-500"> Contact email is required</span>}
                        </div>

                        <div className="w-full">
                            <label htmlFor="mobile" className="block mb-2 text-sm font-medium text-gray-900 cursor-pointer"> Mobile number*</label>
                            <input
                                type="text" id="mobile"  {...register("mobile", { required: true })}
                                placeholder="Mobile number" className="bg-gray-50 border border-gray-300 text-base rounded-lg block w-full p-2.5"
                                defaultValue={selfBiodata?.mobile}
                            />
                            {errors?.mobile && <span className="text-red-500"> Mobile number is required</span>}
                        </div>

                    </div>

                    <div className="flex items-center gap-2 mt-10">
                        {
                            selfBiodata?.biodataId ?
                                <>
                                    <input
                                        value="Update Biodata"
                                        type="submit"
                                        className={`bg-primary-normal text-white cursor-pointer font-medium rounded-md text-sm px-5 py-2.5`}
                                    />
                                </> :
                                <>
                                    <input
                                        value="Save Biodata"
                                        type="submit"
                                        className={`bg-primary-normal text-white cursor-pointer font-medium rounded-md text-sm px-5 py-2.5`}
                                    />
                                </>
                        }
                        {loadingIcon && <LoaderIcon />}
                    </div>

                </form>
            </div>

        </>
    );
};

export default EditBiodata_Backup;