import { Button } from "../ui/button";

const Hero = () => {
  return (
    <section>
      <div className="container mx-auto px-4 py-16 md:py-24 flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 mb-8 md:mb-0">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Find Your Perfect Laptop</h1>
          <p className="text-lg md:text-xl mb-8 opacity-90">
            Browse laptops by specs, prices, and features across all major brands.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg">Browse Catalog</Button>
          </div>
        </div>
        <div className="md:w-1/2 flex justify-center">
          <img src="asus.png" alt="Laptop showcase" className="max-w-full" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
