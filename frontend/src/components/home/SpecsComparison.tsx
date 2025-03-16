import { Button } from "../ui/button";

const SpecsComparison = () => {
  return (
    <section className="py-16 bg-muted">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-8 md:mb-0 md:pr-12">
            <h2 className="text-3xl font-bold mb-4">Compare Specs Side by Side</h2>
            <p className="text-muted-foreground mb-6">
              Our powerful comparison tool lets you evaluate multiple laptops at once. Compare
              processors, GPUs, displays, storage options, and more to find the perfect laptop for
              your needs.
            </p>
            <ul className="space-y-3 mb-8">
              {[
                "Detailed spec comparison",
                "Performance benchmarks",
                "Price analysis",
                "Component compatibility",
              ].map((feature, index) => (
                <li key={index} className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            <Button size="lg">Try Comparison Tool</Button>
          </div>
          <div className="md:w-1/2">
            <div className="bg-card p-6 rounded-xl shadow-md">
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="py-3 px-4 text-left">Specs</th>
                      <th className="py-3 px-4 text-left">Laptop A</th>
                      <th className="py-3 px-4 text-left">Laptop B</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { spec: "Processor", a: "Intel Core i7-12700H", b: "AMD Ryzen 9 5900HX" },
                      { spec: "GPU", a: "NVIDIA RTX 3070", b: "AMD Radeon RX 6800M" },
                      { spec: "RAM", a: "16GB DDR5", b: "32GB DDR4" },
                      { spec: "Storage", a: "1TB NVMe SSD", b: "2TB NVMe SSD" },
                      { spec: "Display", a: '15.6" QHD 165Hz', b: '16" 4K 60Hz' },
                    ].map((row, index) => (
                      <tr key={index} className={index % 2 === 0 ? "bg-muted/50" : ""}>
                        <td className="py-3 px-4 font-medium">{row.spec}</td>
                        <td className="py-3 px-4 text-muted-foreground">{row.a}</td>
                        <td className="py-3 px-4 text-muted-foreground">{row.b}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SpecsComparison;
