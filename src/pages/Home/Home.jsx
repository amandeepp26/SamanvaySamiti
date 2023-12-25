import Container from "../Utils/Container";
import Banner from "./Banner/Banner";
import useAdminStatistic from "../../hooks/useAdminStatistic";
import Search from "./Search/Search";
import Content from "./Content";

const Home = () => {
  const { adminStatistic, isLoadingAdminStatistic } = useAdminStatistic();
  return (
    <Container>
      <section>
        <Banner />
      </section>
      {/* Search */}
      {/* <section>
        <Search />
      </section> */}
      <section>
        <Content />
      </section>

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
      {/* <section className="pb-20">
        <SectionTitle
          colorTitle="Dating Tips "
          blackTitle="& Advices"
          subTitle="Celebrating Love Stories, Journeying Together Towards Everlasting Happiness"
        />
        <div>
          <Slider />
        </div>
      </section> */}
    </Container>
  );
};

export default Home;
