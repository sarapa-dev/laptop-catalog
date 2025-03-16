import { LaptopMinimal } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-card text-card-foreground border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <LaptopMinimal className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold">LaptopCatalog</span>
            </div>
            <p className="text-muted-foreground mb-4">
              Your comprehensive resource for laptop specifications.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Categories</h3>
            <ul className="space-y-2">
              {["Gaming", "Business", "Ultrabooks", "Workstations", "Budget"].map(
                (category, index) => (
                  <li key={index}>
                    <a
                      href="#"
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {category}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Manufacturers</h3>
            <ul className="space-y-2">
              {["Dell", "HP", "Lenovo", "Apple", "ASUS", "MSI", "Acer"].map((brand, index) => (
                <li key={index}>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {brand}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              {["Comparison Tool", "Buying Guide", "Latest Reviews", "Tech News", "Support"].map(
                (resource, index) => (
                  <li key={index}>
                    <a
                      href="#"
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {resource}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-muted-foreground mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} LaptopCatalog. All rights reserved.
          </p>
          <div className="flex space-x-6">
            {["Terms", "Privacy", "Cookies"].map((link, index) => (
              <a
                key={index}
                href="#"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                {link}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
