import Card from "../components/common/Card";
import BannerCategories from "../components/Home/BannerCategories";
import Carousels from "../components/Home/Carousel";
import Sale from "../components/Home/Sale";

export default function HomePage() {
  return (
    <>
      <BannerCategories />
      <Carousels />
      <Card />
      <Sale />
    </>
  );
}
