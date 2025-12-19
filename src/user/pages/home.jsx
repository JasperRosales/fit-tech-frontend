import PromotionBanner from './home/PromotionBanner';
import FeaturesSection from './home/FeaturesSection';
import RelatedProducts from './home/RelatedProducts'

const Home = () => {
  return (
    <div className="py-24 sm:py-32 bg-background">
      <PromotionBanner />
      <FeaturesSection />
      <RelatedProducts />
    </div>
  );
};

export default Home;

