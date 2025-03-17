import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LaptopType } from "@/types/laptop";
import { Microchip, Cpu, HardDrive, Monitor } from "lucide-react";

type LaptopSpecificationsProps = {
  laptop: LaptopType;
};

const LaptopSpecifications = ({ laptop }: LaptopSpecificationsProps) => {
  return (
    <section className="max-w-7xl mx-auto p-4 mb-8">
      <Tabs defaultValue="specs" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="specs">Specifications</TabsTrigger>
          <TabsTrigger value="manufacturer">Manufacturer</TabsTrigger>
        </TabsList>

        <TabsContent value="specs">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Processor */}
            <SpecCard
              title="Processor"
              icon={<Cpu className="h-5 w-5" />}
              specs={[
                { label: "Model", value: laptop.processor.name },
                {
                  label: "Manufacturer",
                  value: laptop.processor.manufacturer_manufacturer_id === 1 ? "AMD" : "Intel",
                },
                { label: "Cores", value: `${laptop.processor.core_count} cores` },
                { label: "Threads", value: `${laptop.processor.hyper_thread_count} threads` },
                { label: "TDP", value: `${laptop.processor.tdp}W` },
              ]}
            />

            <SpecCard
              title="Graphics"
              icon={<Microchip className="h-5 w-5" />}
              specs={[
                { label: "Model", value: laptop.gpu.name },
                {
                  label: "Manufacturer",
                  value: laptop.gpu.manufacturer_manufacturer_id === 2 ? "NVIDIA" : "AMD",
                },
                { label: "VRAM", value: `${laptop.gpu.vram}GB` },
                { label: "Type", value: laptop.gpu.type },
                { label: "TDP", value: `${laptop.gpu.tdp}W` },
              ]}
            />

            <SpecCard
              title="Display"
              icon={<Monitor className="h-5 w-5" />}
              specs={[
                { label: "Name", value: laptop.display.name },
                { label: "Size", value: `${laptop.display.size} inches` },
                {
                  label: "Resolution",
                  value: `${laptop.display.width} x ${laptop.display.height}`,
                },
                { label: "Type", value: laptop.display.type },
              ]}
            />

            <SpecCard
              title="Storage"
              icon={<HardDrive className="h-5 w-5" />}
              specs={[
                { label: "Name", value: laptop.storage.name },
                { label: "Type", value: laptop.storage.type.replace("_", " ") },
              ]}
            />
          </div>
        </TabsContent>

        <TabsContent value="manufacturer">
          <Card>
            <CardHeader>
              <CardTitle>{laptop.manufacturer.name}</CardTitle>
              <CardDescription>Manufacturer Information</CardDescription>
            </CardHeader>
            <CardContent>
              <p>{laptop.manufacturer.description || "No description available."}</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </section>
  );
};

type SpecCardProps = {
  title: string;
  icon: React.ReactNode;
  specs: Array<{ label: string; value: string | number }>;
};

const SpecCard = ({ title, icon, specs }: SpecCardProps) => (
  <Card>
    <CardHeader>
      <CardTitle className="flex items-center gap-2">
        {icon}
        {title}
      </CardTitle>
    </CardHeader>
    <CardContent>
      <dl className="space-y-4">
        {specs.map((spec, index) => (
          <div key={index}>
            <dt className="text-sm font-medium text-muted-foreground">{spec.label}</dt>
            <dd>{spec.value}</dd>
          </div>
        ))}
      </dl>
    </CardContent>
  </Card>
);

export default LaptopSpecifications;
