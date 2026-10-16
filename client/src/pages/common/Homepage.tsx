import Hero from "../../components/common/Hero";
import FeaturedCategories from "../../components/common/FeaturedCategories";
import TrendingProducts from "../../components/common/TrendingProducts";
import CTASection from "../../components/common/CTASection";

function Homepage() {
  return (
    <>
      <Hero />
      <FeaturedCategories />
      <TrendingProducts />
      <CTASection />
    </>
  );
}

export default Homepage;
