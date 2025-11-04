/* eslint-disable @typescript-eslint/no-explicit-any */

import { Controller } from "react-hook-form";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

type TProps = {
  label: string;
  name: string;
  control: any;
  options: {
    label: string;
    value: string;
  }[];
  disabled?:boolean,
  blankOption?: boolean
};

const CustomSelect = ({ label, name, control, options, disabled=false }: TProps) => {
  return (
    <>
      <div className="space-y-2">
         <Label htmlFor={name} className="text-sm font-medium">
          {label}
        </Label>
        <Controller
          control={control}
          name={name}
          render={({ field, fieldState: { error } }) => (
            <>
              <Select  
                onValueChange={field.onChange}
                value={field.value}
                disabled={disabled}
              >
                <SelectTrigger className="w-full bg-input">
                  <SelectValue placeholder="Select a fruit" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {options?.map(({value, label})=>(
                      <SelectItem key={value} value={value}>{label}</SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              {error && (
                <p className="text-red-600 text-sm mt-1">{error.message}</p>
              )}
            </>
          )}
        />
      </div>
    </>
  );
};

export default CustomSelect;
