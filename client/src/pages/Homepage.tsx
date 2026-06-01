import Hero from "../components/Hero";
import FeaturedCategories from "../components/FeaturedCategories";
import TrendingProducts from "../components/TrendingProducts";
import CTASection from "../components/CTASection";

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
