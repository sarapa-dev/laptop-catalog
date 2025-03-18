import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Cpu, HardDrive, Monitor, Microchip } from "lucide-react";
import { LaptopType } from "@/types/laptop";

type ComparisonViewProps = {
  laptop1: LaptopType;
  laptop2: LaptopType;
};

const ComparisonView = ({ laptop1, laptop2 }: ComparisonViewProps) => {
  const isDifferent = (value1: any, value2: any) => {
    return value1 !== value2;
  };

  return (
    <Tabs defaultValue="overview" className="w-full">
      <TabsList className="mb-6">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="processor">Processor</TabsTrigger>
        <TabsTrigger value="graphics">Graphics</TabsTrigger>
        <TabsTrigger value="display">Display</TabsTrigger>
        <TabsTrigger value="storage">Storage</TabsTrigger>
      </TabsList>

      <TabsContent value="overview">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Laptop 1 */}
          <div>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-xl">{laptop1.name}</CardTitle>
                <Badge variant="outline" className="w-fit">
                  {laptop1.manufacturer.name}
                </Badge>
              </CardHeader>
              <CardContent>
                <div className="flex justify-center mb-6">
                  <img
                    src={laptop1.image_url || "/placeholder.webp"}
                    alt={laptop1.name}
                    className="h-48 object-contain"
                  />
                </div>
                <div className="space-y-4">
                  <SpecRow
                    icon={<Cpu className="h-4 w-4" />}
                    label="Processor"
                    value={laptop1.processor.name}
                  />
                  <SpecRow
                    icon={<Microchip className="h-4 w-4" />}
                    label="Graphics"
                    value={`${laptop1.gpu.name} ${laptop1.gpu.vram}GB`}
                  />
                  <SpecRow
                    icon={<Monitor className="h-4 w-4" />}
                    label="Display"
                    value={`${laptop1.display.size}" ${laptop1.display.type} (${laptop1.display.width}x${laptop1.display.height})`}
                  />
                  <SpecRow
                    icon={<HardDrive className="h-4 w-4" />}
                    label="Storage"
                    value={laptop1.storage.name}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Laptop 2 */}
          <div>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-xl">{laptop2.name}</CardTitle>
                <Badge variant="outline" className="w-fit">
                  {laptop2.manufacturer.name}
                </Badge>
              </CardHeader>
              <CardContent>
                <div className="flex justify-center mb-6">
                  <img
                    src={laptop2.image_url || "/placeholder.webp"}
                    alt={laptop2.name}
                    className="h-48 object-contain"
                  />
                </div>
                <div className="space-y-4">
                  <SpecRow
                    icon={<Cpu className="h-4 w-4" />}
                    label="Processor"
                    value={laptop2.processor.name}
                  />
                  <SpecRow
                    icon={<Microchip className="h-4 w-4" />}
                    label="Graphics"
                    value={`${laptop2.gpu.name} ${laptop2.gpu.vram}GB`}
                  />
                  <SpecRow
                    icon={<Monitor className="h-4 w-4" />}
                    label="Display"
                    value={`${laptop2.display.size}" ${laptop2.display.type} (${laptop2.display.width}x${laptop2.display.height})`}
                  />
                  <SpecRow
                    icon={<HardDrive className="h-4 w-4" />}
                    label="Storage"
                    value={laptop2.storage.name}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </TabsContent>

      <TabsContent value="processor">
        <ComparisonTable
          title="Processor Comparison"
          icon={<Cpu className="h-5 w-5" />}
          specs={[
            {
              label: "Model",
              value1: laptop1.processor.name,
              value2: laptop2.processor.name,
            },
            {
              label: "Cores",
              value1: `${laptop1.processor.core_count} cores`,
              value2: `${laptop2.processor.core_count} cores`,
              highlight: isDifferent(laptop1.processor.core_count, laptop2.processor.core_count),
            },
            {
              label: "Threads",
              value1: `${laptop1.processor.hyper_thread_count} threads`,
              value2: `${laptop2.processor.hyper_thread_count} threads`,
              highlight: isDifferent(
                laptop1.processor.hyper_thread_count,
                laptop2.processor.hyper_thread_count
              ),
            },
            {
              label: "TDP",
              value1: `${laptop1.processor.tdp}W`,
              value2: `${laptop2.processor.tdp}W`,
              highlight: isDifferent(laptop1.processor.tdp, laptop2.processor.tdp),
            },
          ]}
        />
      </TabsContent>

      <TabsContent value="graphics">
        <ComparisonTable
          title="Graphics Comparison"
          icon={<Microchip className="h-5 w-5" />}
          specs={[
            {
              label: "Model",
              value1: laptop1.gpu.name,
              value2: laptop2.gpu.name,
            },
            {
              label: "VRAM",
              value1: `${laptop1.gpu.vram}GB`,
              value2: `${laptop2.gpu.vram}GB`,
              highlight: isDifferent(laptop1.gpu.vram, laptop2.gpu.vram),
            },
            {
              label: "Type",
              value1: laptop1.gpu.type,
              value2: laptop2.gpu.type,
              highlight: isDifferent(laptop1.gpu.type, laptop2.gpu.type),
            },
            {
              label: "TDP",
              value1: `${laptop1.gpu.tdp}W`,
              value2: `${laptop2.gpu.tdp}W`,
              highlight: isDifferent(laptop1.gpu.tdp, laptop2.gpu.tdp),
            },
          ]}
        />
      </TabsContent>

      <TabsContent value="display">
        <ComparisonTable
          title="Display Comparison"
          icon={<Monitor className="h-5 w-5" />}
          specs={[
            {
              label: "Name",
              value1: laptop1.display.name,
              value2: laptop2.display.name,
            },
            {
              label: "Size",
              value1: `${laptop1.display.size} inches`,
              value2: `${laptop2.display.size} inches`,
              highlight: isDifferent(laptop1.display.size, laptop2.display.size),
            },
            {
              label: "Resolution",
              value1: `${laptop1.display.width} x ${laptop1.display.height}`,
              value2: `${laptop2.display.width} x ${laptop2.display.height}`,
              highlight:
                isDifferent(laptop1.display.width, laptop2.display.width) ||
                isDifferent(laptop1.display.height, laptop2.display.height),
            },
            {
              label: "Type",
              value1: laptop1.display.type,
              value2: laptop2.display.type,
              highlight: isDifferent(laptop1.display.type, laptop2.display.type),
            },
          ]}
        />
      </TabsContent>

      <TabsContent value="storage">
        <ComparisonTable
          title="Storage Comparison"
          icon={<HardDrive className="h-5 w-5" />}
          specs={[
            {
              label: "Name",
              value1: laptop1.storage.name,
              value2: laptop2.storage.name,
            },
            {
              label: "Type",
              value1: laptop1.storage.type.replace("_", " "),
              value2: laptop2.storage.type.replace("_", " "),
              highlight: isDifferent(laptop1.storage.type, laptop2.storage.type),
            },
          ]}
        />
      </TabsContent>
    </Tabs>
  );
};

const SpecRow = ({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) => (
  <div className="flex items-center gap-2">
    <div className="text-muted-foreground">{icon}</div>
    <div>
      <p className="text-sm font-medium">{label}</p>
      <p className="text-sm text-muted-foreground">{value}</p>
    </div>
  </div>
);

type ComparisonTableProps = {
  title: string;
  icon: React.ReactNode;
  specs: Array<{
    label: string;
    value1: string | number;
    value2: string | number;
    highlight?: boolean;
  }>;
};

const ComparisonTable = ({ title, icon, specs }: ComparisonTableProps) => (
  <Card>
    <CardHeader>
      <CardTitle className="flex items-center gap-2">
        {icon}
        {title}
      </CardTitle>
    </CardHeader>
    <CardContent>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left py-3 px-4 font-medium">Specification</th>
              <th className="text-left py-3 px-4 font-medium">Laptop 1</th>
              <th className="text-left py-3 px-4 font-medium">Laptop 2</th>
            </tr>
          </thead>
          <tbody>
            {specs.map((spec, index) => (
              <tr key={index} className={index % 2 === 0 ? "bg-muted/50" : ""}>
                <td className="py-3 px-4 font-medium">{spec.label}</td>
                <td className={`py-3 px-4 ${spec.highlight ? "text-primary font-medium" : ""}`}>
                  {spec.value1}
                </td>
                <td className={`py-3 px-4 ${spec.highlight ? "text-primary font-medium" : ""}`}>
                  {spec.value2}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </CardContent>
  </Card>
);

export default ComparisonView;
