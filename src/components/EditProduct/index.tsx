/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useRef, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { ErrorToast } from "@/helper/ValidationHelper";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import BasicInfoForm from "./BasicForm";
import SectionManagerForm from "./SectionForm";
import ShippingManagerForm from "./ShipingForm";
import ReferenceForm, { type Reference } from "./ReferenceForm";

import type { IProductFormData } from "@/types/product.type";
import {
  useGetProductByIdQuery,
  useUpdateProductMutation,
} from "@/redux/features/product/productApi";
import { useGetBrandDropDownByYearQuery } from "@/redux/features/brand/brandApi";
import type { TOption } from "@/types/global.type";
import { Loader2 } from "lucide-react";
import UploadSingleImage from "./UploadImage";

const EditProductForm = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const formRef = useRef<HTMLFormElement | null>(null);

  const [formData, setFormData] = useState<IProductFormData>({
    brandId: "",
    categoryId: "",
    productName: "",
    description: "",
    price: "",
    discount: "",
    stock: "",
    isVisible: true,
    fitVehicles: [],
    sections: [],
    references: [],
    shipping: [],
  });

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [year, setYear] = useState<string>("");
  const [initialProductImageUrl, setInitialProductImageUrl] = useState<
    string | undefined
  >(undefined);
  const [brandOptions, setBrandOptions] = useState<TOption[]>([]);
  const [brandList, setBrandList] = useState<
    Array<{ id: string; name: string }>
  >([]);
  const [initialModelOption, setInitialModelOption] = useState<TOption | null>(
    null
  );
  const [isBasicDataLoaded, setIsBasicDataLoaded] = useState(false);
  const [areBrandsLoaded, setAreBrandsLoaded] = useState(false);

  // Fetch product data by ID
  const {
    data: productData,
    isLoading: isProductLoading,
    isError: isProductError,
  } = useGetProductByIdQuery(id!, {
    skip: !id,
  });

  // Fetch brands for selected year
  const { data: brandData, isLoading: brandLoading } =
    useGetBrandDropDownByYearQuery(year, {
      skip: !year,
    });

  // Product update mutation
  const [updateProduct, { isLoading: isUpdating }] = useUpdateProductMutation();

  // Step 1: Load product data immediately (don't wait for brands)
  useEffect(() => {
    if (productData?.data && !isBasicDataLoaded) {
      const product = productData.data;

      console.log("🔄 Loading product data...");
      console.log("📦 Full product data:", product);

      // Extract year from productionStartDate at root level
      const productionStartDate = product.productionStartDate;
      const yearFromProduct = productionStartDate
        ? new Date(productionStartDate).getFullYear().toString()
        : new Date().getFullYear().toString();

      console.log("📅 Year extracted:", yearFromProduct);

      // Store initial model info
      if (product.modelId && product.modelName) {
        setInitialModelOption({
          value: product.modelId,
          label: product.modelName,
        });
        console.log("🚗 Initial model:", product.modelName, product.modelId);
      }

      // Extract modelId from root level
      const modelId = product.modelId || "";

      // Transform sections data
      const transformedSections =
        product.sections?.map((section: any) => ({
          sectionName: section.sectionName || "",
          fields:
            section.fields?.map((field: any) => ({
              fieldName: field.fieldName || "",
              valueString: field.valueString || "",
              valueFloat: field.valueFloat || undefined,
            })) || [],
        })) || [];

      console.log("📋 Transformed Sections:", transformedSections);

      // Transform references data
      const transformedReferences =
        product.references?.map((ref: any) => ({
          type: ref.type || "OE",
          number: ref.number || "",
          brandId: ref.brandId || product.brandId || "",
        })) || [];

      console.log("📎 Transformed References:", transformedReferences);

      // Transform shipping data
      const transformedShipping =
        product.shippings?.map((ship: any) => ({
          countryCode: ship.countryCode || "",
          countryName: ship.countryName || "",
          carrier: ship.carrier || "",
          cost: ship.cost ?? "",
          deliveryMin: ship.deliveryMin ?? "",
          deliveryMax: ship.deliveryMax ?? "",
          isDefault: ship.isDefault || false,
        })) || [];

      console.log("🚢 Transformed Shipping:", transformedShipping);

      // Extract fitVehicles from engines array
      // API returns engines array with engine details
      const fitVehicles =
        product.engines?.map((engine: any) => {
          // The id field is the engineId
          return engine.id;
        }) || [];

      console.log("🚙 Engines from API:", product.engines);
      console.log("🚙 Fit Vehicles (Engine IDs):", fitVehicles);

      // Set ALL form data immediately
      setFormData({
        brandId: product.brandId || "",
        modelId: modelId,
        categoryId: product.categoryId || "",
        productName: product.productName || "",
        description: product.description || "",
        price: product.price ?? "",
        discount: product.discount ?? "",
        stock: product.stock ?? "",
        isVisible: product.isVisible ?? true,
        fitVehicles: fitVehicles,
        sections: transformedSections,
        references: transformedReferences,
        shipping: transformedShipping,
      });

      console.log("✅ Form data set:");
      console.log("  - Sections:", transformedSections.length);
      console.log("  - References:", transformedReferences.length);
      console.log("  - Shipping:", transformedShipping.length);
      console.log("  - Fit Vehicles:", fitVehicles.length);

      // Set product image
      if (product.productImages && product.productImages.length > 0) {
        setInitialProductImageUrl(product.productImages[0]);
      } else if (product.productImage) {
        setInitialProductImageUrl(product.productImage);
      }

      // Set year to trigger brand loading
      if (yearFromProduct) {
        setYear(yearFromProduct);
      }

      setIsBasicDataLoaded(true);
      console.log("✅ Basic product data loaded successfully");
    }
  }, [productData, isBasicDataLoaded]);

  // Step 2: Load brands when year is set
  useEffect(() => {
    if (brandData?.data) {
      const brands = brandData.data.map((b: any) => ({
        value: b.brandId,
        label: b.brandName,
      }));

      const brandListData = brandData.data.map((b: any) => ({
        id: b.brandId,
        name: b.brandName,
      }));

      console.log("🏢 Brands loaded:", brands.length);

      setBrandOptions(brands);
      setBrandList(brandListData);
      setAreBrandsLoaded(true);
    }
  }, [brandData]);

  // Step 3: Update references with brand list once brands are loaded
  useEffect(() => {
    if (
      areBrandsLoaded &&
      brandList.length > 0 &&
      formData.references.length > 0
    ) {
      // Check if any references have missing brandIds
      const needsUpdate = formData.references.some((ref) => !ref.brandId);

      if (needsUpdate) {
        const updatedReferences = formData.references.map((ref) => ({
          ...ref,
          brandId: ref.brandId || (brandList.length > 0 ? brandList[0].id : ""),
        }));

        console.log(
          "🔄 Updating references with default brandIds:",
          updatedReferences
        );

        setFormData((prev) => ({
          ...prev,
          references: updatedReferences,
        }));
      }
    }
  }, [areBrandsLoaded, brandList]);

  const isFormValid = () => {
    const hasBasicInfo =
      formData.brandId &&
      formData.categoryId &&
      formData.productName &&
      formData.description &&
      formData.price !== "" &&
      formData.stock !== "";

    const hasSections = formData.sections.length > 0;
    const hasReferences =
      formData.references.length > 0 &&
      formData.references.every((ref) => ref.type && ref.number && ref.brandId);
    const hasShipping = formData.shipping.length > 0;
    const hasFitVehicles = formData.fitVehicles.length > 0;

    console.log("🔍 Form Validation:", {
      hasBasicInfo,
      hasFitVehicles,
      hasSections,
      hasReferences,
      hasShipping,
      sectionsCount: formData.sections.length,
      referencesCount: formData.references.length,
      shippingCount: formData.shipping.length,
      fitVehiclesCount: formData.fitVehicles.length,
    });

    return (
      hasBasicInfo &&
      hasFitVehicles &&
      hasSections &&
      hasReferences &&
      hasShipping
    );
  };

  const handleBasicInfoChange = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleYearChange = (value: string) => {
    console.log("📅 Year changed to:", value);
    setYear(value);
    // Clear dependent fields when year changes
    setFormData((prev) => ({
      ...prev,
      brandId: "",
      modelId: "",
      fitVehicles: [],
    }));
    setBrandOptions([]);
    setBrandList([]);
    setAreBrandsLoaded(false);
    setInitialModelOption(null);
  };

  const handleFitVehiclesChange = (vehicleId: string) => {
    setFormData((prev) => ({
      ...prev,
      fitVehicles: prev.fitVehicles.includes(vehicleId)
        ? prev.fitVehicles.filter((id) => id !== vehicleId)
        : [...prev.fitVehicles, vehicleId],
    }));
  };

  const handleSectionsChange = (sections: IProductFormData["sections"]) => {
    console.log("📝 Sections changed:", sections);
    setFormData((prev) => ({
      ...prev,
      sections,
    }));
  };

  const handleReferencesChange = (
    references: IProductFormData["references"]
  ) => {
    console.log("📋 References updated:", references);
    setFormData((prev) => ({
      ...prev,
      references,
    }));
  };

  const handleShippingChange = (shipping: IProductFormData["shipping"]) => {
    console.log("🚢 Shipping updated:", shipping);
    setFormData((prev) => ({
      ...prev,
      shipping,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log("📤 Submitting form data:", formData);

    if (!isFormValid()) {
      ErrorToast("Please fill in all required fields");
      return;
    }

    if (
      formData?.discount === undefined ||
      formData?.discount === null ||
      formData?.discount === ""
    ) {
      ErrorToast("Please enter a product discount.");
      return;
    }

    if (formData.discount < 0 || formData.discount > 100) {
      ErrorToast("Discount must be a valid number between 0 and 100.");
      return;
    }

    const bodyForm = new FormData();
    bodyForm.append("bodyData", JSON.stringify(formData));

    if (selectedFile) {
      bodyForm.append("productImages", selectedFile);
    }

    try {
      await updateProduct({ id: id!, data: bodyForm as any }).unwrap();
      navigate("/products");
    } catch (err: any) {
      const message =
        err?.data?.message || err?.error || "Something went wrong";
      ErrorToast(message);
    }
  };

  if (isProductLoading) {
    return (
      <div className="flex justify-center items-center h-48">
        <Loader2 className="h-8 w-8 animate-spin" />
        <p className="ml-3 text-muted-foreground">Loading product data...</p>
      </div>
    );
  }

  if (isProductError) {
    return (
      <div className="text-center text-destructive">
        Failed to load product details.
      </div>
    );
  }

  if (!isBasicDataLoaded) {
    return (
      <div className="flex justify-center items-center h-48">
        <Loader2 className="h-8 w-8 animate-spin" />
        <p className="ml-3 text-muted-foreground">Processing product data...</p>
      </div>
    );
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
      {/* Basic Information */}
      <BasicInfoForm
        formData={formData}
        onBasicInfoChange={handleBasicInfoChange}
        onFitVehiclesChange={handleFitVehiclesChange}
        year={year}
        onYearChange={handleYearChange}
        brandOptions={brandOptions}
        brandLoading={brandLoading}
        initialModelOption={initialModelOption}
      />

      {/* Sections Manager */}
      <SectionManagerForm
        sections={formData.sections}
        onSectionsChange={handleSectionsChange}
      />

      {/* References Manager */}
      <ReferenceForm
        references={formData.references as Reference[]}
        brands={brandList}
        onReferencesChange={handleReferencesChange}
      />

      {/* Shipping Manager */}
      <ShippingManagerForm
        shipping={formData.shipping}
        onShippingChange={handleShippingChange}
      />

      {/* Product Image Uploader */}
      <UploadSingleImage
        selectedFile={selectedFile}
        setSelectedFile={setSelectedFile}
        label="Upload Product Image"
        initialImage={initialProductImageUrl}
      />

      {/* Submit Button */}
      <Card className="border-primary/20">
        <CardContent className="pt-6">
          <Button
            type="submit"
            disabled={!isFormValid() || isUpdating}
            className="w-full h-12 text-lg font-semibold"
          >
            {isUpdating
              ? "Updating..."
              : isFormValid()
              ? "Update Product"
              : "Complete all fields to update"}
          </Button>
          {!isFormValid() && (
            <p className="text-sm text-destructive mt-3 text-center">
              Please fill in all required fields
              <br />
              <span className="text-xs">
                Sections: {formData.sections.length}, References:{" "}
                {formData.references.length}, Shipping:{" "}
                {formData.shipping.length}, Vehicles:{" "}
                {formData.fitVehicles.length}
              </span>
            </p>
          )}
        </CardContent>
      </Card>
    </form>
  );
};

export default EditProductForm;
