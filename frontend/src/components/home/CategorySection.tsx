import { useState, useEffect } from "react";
import { Card, CardContent, CardFooter } from "../ui/card";
import { axiosInstance } from "@/lib/axios";
import { Link } from "react-router";

type CategoryCardProps = {
  title: string;
  count: number;
  icon: React.ReactNode;
};

const CategoryCard = ({ title, count, icon }: CategoryCardProps) => {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="pt-6 flex flex-col items-center text-center">
        <div className="text-primary mb-4">{icon}</div>
        <Link to={`/categories/${title.toLowerCase()}`} className="text-lg font-semibold mb-2">
          {title}
        </Link>
      </CardContent>
      <CardFooter className="justify-center pb-6">
        <p className="text-muted-foreground">{count} models</p>
      </CardFooter>
    </Card>
  );
};

const CategorySection = ({ isHome }: { isHome: boolean }) => {
  const [categories, setCategories] = useState<CategoryCardProps[]>([]);

  const categoryIcons: Record<string, React.ReactNode> = {
    Gaming: "🎮",
    Business: "💼",
    Macbook: "💻",
  };

  useEffect(() => {
    const getCategories = async () => {
      try {
        const res = await axiosInstance.get("/category");
        const data = res.data;

        const formattedCategories = data.map((category: any) => ({
          title: category.name,
          count: category.laptopCount,
          icon: categoryIcons[category.name] || "🖥️",
        }));

        setCategories(formattedCategories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    getCategories();
  }, []);

  return (
    <section className={`py-16 ${isHome ? "bg-muted" : ""}`}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Browse by Category</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Find the perfect laptop for your specific needs, whether you're gaming, working, or
            creating.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, index) => (
            <CategoryCard
              key={index}
              title={category.title}
              count={category.count}
              icon={<span className="text-3xl">{category.icon}</span>}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
