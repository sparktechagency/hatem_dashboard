import {
   Card,
   CardContent,
   CardDescription,
   CardHeader,
   CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Plus, Trash2 } from "lucide-react";

interface ShippingOption {
   countryCode: string;
   countryName: string;
   carrier: string;
   cost: number | "";
   deliveryMin: number | "";
   deliveryMax: number | "";
   isDefault?: boolean;
}

interface ShippingManagerProps {
   shipping: ShippingOption[];
   onShippingChange: (shipping: ShippingOption[]) => void;
}

const ShippingForm = ({ shipping, onShippingChange }: ShippingManagerProps) => {
   const COUNTRIES = [
      { code: "US", name: "United States" },
      { code: "DE", name: "Germany" },
      { code: "UK", name: "United Kingdom" },
      { code: "FR", name: "France" },
      { code: "IT", name: "Italy" },
      { code: "ES", name: "Spain" },
   ];

   const isShippingComplete = (option: ShippingOption): boolean => {
      return (
         option.countryCode.trim() !== "" &&
         option.carrier.trim() !== "" &&
         option.cost !== "" &&
         option.deliveryMin !== "" &&
         option.deliveryMax !== ""
      );
   };

   const canAddShipping = (): boolean => {
      if (shipping.length === 0) return true;
      return isShippingComplete(shipping[shipping.length - 1]);
   };

   const addShipping = () => {
      onShippingChange([
         ...shipping,
         {
            countryCode: "",
            countryName: "",
            carrier: "",
            cost: "",
            deliveryMin: "",
            deliveryMax: "",
            isDefault: false,
         },
      ]);
   };

   const removeShipping = (index: number) => {
      onShippingChange(shipping.filter((_, i) => i !== index));
   };

   const updateShipping = (index: number, key: string, value: any) => {
      const updated = [...shipping];
      updated[index] = {
         ...updated[index],
         [key]: value,
      };
      onShippingChange(updated);
   };

   const handleCountryChange = (index: number, countryCode: string) => {
      const country = COUNTRIES.find((c) => c.code === countryCode);
      const updatedShipping = [...shipping];
      if (country) {
         updatedShipping[index] = {
            ...updatedShipping[index],
            countryCode: country.code,
            countryName: country.name,
         };
      } else {
         updatedShipping[index] = {
            ...updatedShipping[index],
            countryCode: "",
            countryName: "",
         };
      }
      onShippingChange(updatedShipping);
   };

   return (
      <Card>
         <CardHeader>
            <div className="flex items-center justify-between">
               <div>
                  <CardTitle>Shipping Options *</CardTitle>
                  <CardDescription>
                     Configure shipping for different countries
                  </CardDescription>
               </div>
               <Button
                  onClick={addShipping}
                  size="sm"
                  variant="outline"
                  disabled={!canAddShipping()}
               >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Shipping
               </Button>
            </div>
         </CardHeader>
         <CardContent className="space-y-4">
            {shipping.length === 0 ? (
               <p className="text-sm text-muted-foreground py-8 text-center">
                  No shipping options added yet. Click "Add Shipping" to get
                  started.
               </p>
            ) : (
               shipping.map((option, index) => (
                  <div key={index} className="border rounded-lg p-4 space-y-4">
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                           <Label htmlFor={`ship-country-${index}`}>
                              Country *
                           </Label>
                           <select
                              id={`ship-country-${index}`}
                              className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                              value={option.countryCode}
                              onChange={(e) =>
                                 handleCountryChange(index, e.target.value)
                              }
                           >
                              <option value="">Select country</option>
                              {COUNTRIES.map((country) => (
                                 <option
                                    key={country.code}
                                    value={country.code}
                                 >
                                    {country.name}
                                 </option>
                              ))}
                           </select>
                        </div>

                        <div className="space-y-2">
                           <Label htmlFor={`ship-carrier-${index}`}>
                              Carrier *
                           </Label>
                           <Input
                              id={`ship-carrier-${index}`}
                              placeholder="e.g., UPS, DHL"
                              value={option.carrier}
                              onChange={(e) =>
                                 updateShipping(
                                    index,
                                    "carrier",
                                    e.target.value
                                 )
                              }
                           />
                        </div>
                     </div>

                     <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                           <Label htmlFor={`ship-cost-${index}`}>
                              Cost ($) *
                           </Label>
                           <Input
                              id={`ship-cost-${index}`}
                              type="number"
                              placeholder="25.50"
                              step="0.01"
                              value={option.cost}
                              onChange={(e) =>
                                 updateShipping(
                                    index,
                                    "cost",
                                    e.target.value
                                       ? Number.parseFloat(e.target.value)
                                       : ""
                                 )
                              }
                           />
                        </div>

                        <div className="space-y-2">
                           <Label htmlFor={`ship-min-${index}`}>
                              Min Days *
                           </Label>
                           <Input
                              id={`ship-min-${index}`}
                              type="number"
                              placeholder="4"
                              value={option.deliveryMin}
                              onChange={(e) =>
                                 updateShipping(
                                    index,
                                    "deliveryMin",
                                    e.target.value
                                       ? Number.parseInt(e.target.value)
                                       : ""
                                 )
                              }
                           />
                        </div>

                        <div className="space-y-2">
                           <Label htmlFor={`ship-max-${index}`}>
                              Max Days *
                           </Label>
                           <Input
                              id={`ship-max-${index}`}
                              type="number"
                              placeholder="8"
                              value={option.deliveryMax}
                              onChange={(e) =>
                                 updateShipping(
                                    index,
                                    "deliveryMax",
                                    e.target.value
                                       ? Number.parseInt(e.target.value)
                                       : ""
                                 )
                              }
                           />
                        </div>
                     </div>

                     <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                           <Checkbox
                              id={`ship-default-${index}`}
                              checked={option.isDefault || false}
                              onCheckedChange={(checked) =>
                                 updateShipping(index, "isDefault", checked)
                              }
                           />
                           <Label
                              htmlFor={`ship-default-${index}`}
                              className="font-normal cursor-pointer"
                           >
                              Set as default
                           </Label>
                        </div>

                        <Button
                           onClick={() => removeShipping(index)}
                           size="sm"
                           variant="destructive"
                        >
                           <Trash2 className="w-4 h-4 mr-2" />
                           Remove
                        </Button>
                     </div>
                  </div>
               ))
            )}
         </CardContent>
      </Card>
   );
};

export default ShippingForm;
