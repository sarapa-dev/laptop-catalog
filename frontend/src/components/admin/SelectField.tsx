import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";

type SelectFieldProps = {
  form: any;
  name: string;
  label: string;
  placeholder: string;
  options: any[];
  isLoading: boolean;
  idField: string;
  labelField: string;
};

const SelectField = ({
  form,
  name,
  label,
  placeholder,
  options,
  isLoading,
  idField,
  labelField,
}: SelectFieldProps) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          {isLoading ? (
            <Skeleton className="h-10 w-full" />
          ) : (
            <Select
              onValueChange={(value) => field.onChange(parseInt(value))}
              value={field.value ? field.value.toString() : undefined}
            >
              <FormControl>
                <SelectTrigger className="h-10">
                  <SelectValue placeholder={placeholder} />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {options.map((option) => (
                  <SelectItem key={option[idField]} value={option[idField].toString()}>
                    {option[labelField]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default SelectField;
