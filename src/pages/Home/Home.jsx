import Container from "../Utils/Container";
import SectionTitle from "../Utils/SectionTitle";
import Banner from "./Banner/Banner";
import Slider from "./Slider/Slider";
import Button from "../Utils/Button";
import PremiumBiodata from "./PremiumBiodata";
import useAdminStatistic from "../../hooks/useAdminStatistic";
import Search from "./Search/Search";

const Home = () => {
  const { adminStatistic, isLoadingAdminStatistic } = useAdminStatistic();
  return (
    <Container>
      <section>
        <Banner />
      </section>

      {/* Search */}
      <section>
        <Search />
      </section>
      <div className="pt-10 bg-white px-5">
        <h1 className="text-xl pb-1 text-bold">
          लाडशाखीय वाणी समाज मंडळ समन्वय समिती ( मुंबई, ठाणे, रायगड)
        </h1>{" "}
        <h3 className="text-md pb-4">
          स्थापना - १९९९ नोंदणीकृत क्र. एफ ३८१२/१०-४-२००१
        </h3>
        <h2 className="pb-5">
          <span className="text-bold">समन्वय समिती - स्थापना उद्देश :</span>
        </h2>
        <h1>
          {" "}
          स्वातंत्र्यपूर्व काळानंतर सन 1948च्या पासुन पूर्व आणि पश्चिम खानदेश,
          बागलाण या परिसरातून लाड शाखीय वाणी समाजातील युवकांनी आपआपल्या गावातुन,
          प्राथमिक शिक्षण, तालुक्यातून माध्यमिक शिक्षण घेतल्यानंतर नोकरी
          व्यवसायानिमित्त मुंबई, पुणे आणि नाशिक शहराकडे मार्गक्रमित झालेत.
          मुंबईत घाटकोपर, प.उपनगरात अंधेरी, मालाड, विरार, ठाणे, डोंबिवली, कल्याण
          या ठिकाणी विविध उद्योग, नोकरी निमित्त स्थायिक होणा-यांची संख्या वाढु
          लागली. 1970 नंतर शासकीय, निमशासकीय आणि नॅशनालाईज्ड बँक्स, शैक्षणिक
          संस्था, आणि व्यवसायानिमित्त येणा-यांच्या संख्येत लक्षणीय वाढ झाली. या
          सर्व समाज बांधवांनी आपआपल्या विभागात सामाजिक एकोपा निर्माण करण्यासाठी
          एकत्रित कार्य सुरु केले. यामुळे साधारणतः 1975 नंतर विविध ठिकाणी
          सामाजिक मंडळे स्थापन झालीत. या सामाजिक मंडळांच्या स्थापनेतूनच,
          डोंबिवली येथे उदय शिक्षण प्रसारक संस्था, उदय क्रेडीट पतपेढी, स्वामी
          विवेकानंद सेवा मंडळ, ॐ क्रेडीट पतपेढी उल्हासनगर येथे उत्कर्ष क्रेडीट
          पतपेढी, या विविध संस्था उदयास येऊन, विभागीय महिला मंडळेही स्थापन
          झालीत. या मार्गक्रमणांत सन 1990 मध्ये संस्कार वाणी युवक संघटना आकारास
          येत होती. संस्कार वाणी युवक मंडळाने सन 1992, 1996, 1998 या तीन वर्षी
          युवक आणि सामाजिक संमेलने घेऊन सामाजिक एकत्रिकरणास एक वेगळा आकार दिला.
          संपुर्ण मुंबई, ठाणे आणि रायगड जिल्हयातील समाज बांधव सामाजिक
          कार्यक्रमासाठी एकत्रित येण्याची प्रक्रिया सुरु झाली. या माध्यमाचा लाभ
          घेत, सर्व विभागीय मंडळांची एक केंद्रिय कार्यकारीणी असावी या हेतूने
          प्रेरीत होऊन सन 1997 आणि 1998 मध्ये सर्व विभागीय मंडळे, सर्व संस्था
          यांची संस्कार वाणीच्या मार्फत एकत्रित बैठका होऊन, रविवार दि. 21 ऑगस्ट
          1999 रोजी, लाड शाखीय वाणी समाज मंडळ समन्वय समिती (मुंबई, ठाणे, रायगड)
          या नावाची संस्था, पनवेल येथे स्थापन करण्यात आली. समन्वय समितीच्या
          पहिल्याच बैठकीत उपवर - वधू परिचय संमेलन घ्यावे असे संस्कार वाणी युवक
          मंडळाने आग्रही प्रतिपादन केले, या मागणीस सर्व उपस्थित विभागीय मंडळ
          अध्यक्ष आणि पदाधिका-यांनी दुजोरा दिला.
        </h1>
      </div>
      {/* <section>
        <SectionTitle
          colorTitle="Premium"
          blackTitle="Members"
          subTitle="Discover Our Premium Members for Lasting Connections"
        />

        <PremiumBiodata />

        <div className="flex justify-center py-5 mt-14">
          <Button text="View All" link="/biodatas" />
        </div>
      </section> */}

      {/* <section>
        <SectionTitle
          colorTitle="How BiyeBari"
          blackTitle="works"
          subTitle="Get started in BiyeBari.com in 3 easy steps"
        />
        <div className="flex flex-col lg:flex-row gap-7 justify-between items-center">
          <div className="flex-1 text-center py-12 px-10 border bg-white">
            <img className="mx-auto" src={profile} alt="profile" />
            <h3 className="text-2xl font-medium py-5">Create Your Profile</h3>
            <p>
              Create your detail profile, add photos and describe your partner
              preference
            </p>
          </div>
          <div className="flex-1 text-center py-12 px-10 border bg-white">
            <img className="mx-auto" src={query} alt="profile" />
            <h3 className="text-2xl font-medium py-5">Search Your Partner</h3>
            <p>
              Search your preferred partner by location, education, interest and
              so on
            </p>
          </div>
          <div className="flex-1 text-center py-12 px-10 border bg-white">
            <img className="mx-auto" src={chat} alt="profile" />
            <h3 className="text-2xl font-medium py-5">Start Communication</h3>
            <p>
              Start communication with suitable profiles by sending message &
              emails
            </p>
          </div>
        </div>
      </section>

      <section>
        <SectionTitle
          colorTitle="Success"
          blackTitle="Counter"
          subTitle="Celebrating Love and Uniting Souls. Counting Happy Beginnings in Our Matrimonial Journey"
        />
        <div className="flex flex-col lg:flex-row gap-10">
          <div className="relative rounded-lg group cursor-pointer overflow-hidden transition-all duration-300">
            <img
              src={totalBoys}
              alt="Boys"
              className="transition-transform transform group-hover:scale-105"
            />
            <div className="rounded-lg absolute top-0 left-0 flex justify-center items-center bg-[#00000061] min-h-full min-w-full">
              <div className="text-center">
                <h1 className="text-3xl font-medium text-white py-2">
                  Total Boys
                </h1>
                <div>
                  {isLoadingAdminStatistic ? (
                    <div className="flex justify-center items-center py-2">
                      <div>
                        <LoaderIcon />
                      </div>
                    </div>
                  ) : (
                    <>
                      <p className="text-xl text-white py-2">
                        {adminStatistic?.maleBiodata}
                      </p>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="relative rounded-lg group cursor-pointer overflow-hidden transition-all duration-300">
            <img
              src={totalGirls}
              alt="Boys"
              className="transition-transform transform group-hover:scale-105"
            />
            <div className="rounded-lg absolute top-0 left-0 flex justify-center items-center bg-[#00000061] min-h-full min-w-full">
              <div className="text-center">
                <h1 className="text-3xl font-medium text-white py-2">
                  Total Girls
                </h1>
                <div>
                  {isLoadingAdminStatistic ? (
                    <div className="flex justify-center items-center py-2">
                      <div>
                        <LoaderIcon />
                      </div>
                    </div>
                  ) : (
                    <>
                      <p className="text-xl text-white py-2">
                        {adminStatistic?.femaleBiodata}
                      </p>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="relative rounded-lg group cursor-pointer overflow-hidden transition-all duration-300">
            <img
              src={totalMarrige}
              alt="Boys"
              className="transition-transform transform group-hover:scale-105"
            />
            <div className="rounded-lg absolute top-0 left-0 flex justify-center items-center bg-[#00000061] min-h-full min-w-full">
              <div className="text-center">
                <h1 className="text-3xl font-medium text-white py-2">
                  Total Marrige
                </h1>
                <div>
                  {isLoadingAdminStatistic ? (
                    <div className="flex justify-center items-center py-2">
                      <div>
                        <LoaderIcon />
                      </div>
                    </div>
                  ) : (
                    <>
                      <p className="text-xl text-white py-2">
                        {adminStatistic?.totalMarrige}
                      </p>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> */}

      <section className="pb-20">
        <SectionTitle
          colorTitle="Dating Tips "
          blackTitle="& Advices"
          subTitle="Celebrating Love Stories, Journeying Together Towards Everlasting Happiness"
        />
        <div>
          <Slider />
        </div>
      </section>
    </Container>
  );
};

export default Home;
