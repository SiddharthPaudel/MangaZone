import Header from "../components/Header";
import HeroSection from "../components/HeroSection";
import MangaCards from "../MangaCard/MangaCards"
import Daily from '../components/Daily';
import UpcomingManga from '../components/UpComing'
import AboutUs from "../components/AboutUs";

const HomePage = () => {
  return (
    <>
      <HeroSection />
      <MangaCards />
      <Daily />
      <UpcomingManga />
      <AboutUs />
    </>
  );
};
export default HomePage;
