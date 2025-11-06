/* eslint-disable @typescript-eslint/no-explicit-any */

import type React from "react"
import { useState } from "react"
import { Controller } from "react-hook-form"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Upload, Trash2 } from "lucide-react"

type TProps = {
  label: string;
  name: string;
  control: any;
  placeholder?: string;
  disabled?: boolean;
  accept?: string;
  defaultPreviewUrl?:string;
}

const CustomImageUpload = ({
  label,
  name,
  control,
  placeholder = "Click or drag to upload image",
  disabled = false,
  accept = "image/jpeg,image/png,image/webp,image/jpg",
  defaultPreviewUrl=""
}: TProps) => {

  const [previewUrl, setPreviewUrl] = useState<string | null>(defaultPreviewUrl || null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (file: File | null, onChange: (value: File | null) => void) => {
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setPreviewUrl(e.target?.result as string)
      }
      reader.readAsDataURL(file)
      onChange(file)
    }
  }

  const handleDelete = (onChange: (value: File | null) => void) => {
    setPreviewUrl(null)
    onChange(null)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent, onChange: (value: File | null) => void) => {
    e.preventDefault()
    setIsDragging(false)
    const files = e.dataTransfer.files
    if (files.length > 0) {
      handleFileChange(files[0], onChange)
    }
  }

  return (
    <div className="space-y-2">
      <Label htmlFor={name} className="text-sm font-medium">
        {label}
      </Label>
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange }, fieldState: { error } }) => (
          <div className="space-y-3">
            {/* Preview Section */}
            {previewUrl && (
              <div className="relative w-full rounded-lg border border-border overflow-hidden bg-muted">
                <div className="relative h-48 w-full">
                  <img src={previewUrl || "/placeholder.svg"} alt="Preview" className="h-full w-full" />
                </div>
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDelete(onChange)}
                  disabled={disabled}
                  className="absolute top-2 right-2"
                >
                  <Trash2 className="h-4 w-4 mr-1" />
                  Delete
                </Button>
              </div>
            )}

            {/* Upload Area */}
            {!previewUrl && (
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={(e) => handleDrop(e, onChange)}
                className={`relative rounded-lg border-2 border-dashed bg-input transition-colors p-8 text-center cursor-pointer ${
                  isDragging ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
                } ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                <input
                  id={name}
                  type="file"
                  accept={accept}
                  onChange={(e) => handleFileChange(e.target.files?.[0] || null, onChange)}
                  disabled={disabled}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
                <div className="flex flex-col items-center justify-center gap-2">
                  <Upload className="h-8 w-8 text-muted-foreground" />
                  <p className="text-sm font-medium text-foreground">{placeholder}</p>
                  <p className="text-xs text-muted-foreground">JPG, PNG, or WebP up to 5MB</p>
                </div>
              </div>
            )}
            {/* Error Message */}
            {error && <p className="text-sm text-destructive">{error.message}</p>}
          </div>
        )}
      />
    </div>
  )
}

export default CustomImageUpload
