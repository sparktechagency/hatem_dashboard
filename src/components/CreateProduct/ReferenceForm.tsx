import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Trash2 } from "lucide-react"

interface Reference {
  type: string
  number: string
  brandId?: string
}

interface ReferencesManagerProps {
  references: Reference[]
  brands: Array<{ id: string; name: string }>
  onReferencesChange: (references: Reference[]) => void
}

const ReferenceForm = ({ references, brands, onReferencesChange }: ReferencesManagerProps) => {
  const REFERENCE_TYPES = ["OE", "INTERNAL", "SUPPLIER", "ALTERNATIVE"]

  const isReferenceComplete = (reference: Reference): boolean => {
    return reference.type.trim() !== "" && reference.number.trim() !== ""
  }

  const canAddReference = (): boolean => {
    if (references.length === 0) return true
    return isReferenceComplete(references[references.length - 1])
  }

  const addReference = () => {
    onReferencesChange([
      ...references,
      {
        type: "OE",
        number: "",
        brandId: "",
      },
    ])
  }

  const removeReference = (index: number) => {
    onReferencesChange(references.filter((_, i) => i !== index))
  }

  const updateReference = (index: number, key: string, value: string) => {
    const updated = [...references]
    updated[index] = {
      ...updated[index],
      [key]: value,
    }
    onReferencesChange(updated)
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>References *</CardTitle>
            <CardDescription>Add OE and internal reference numbers</CardDescription>
          </div>
          <Button onClick={addReference} size="sm" variant="outline" disabled={!canAddReference()}>
            <Plus className="w-4 h-4 mr-2" />
            Add Reference
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {references.length === 0 ? (
          <p className="text-sm text-muted-foreground py-8 text-center">
            No references added yet. Click "Add Reference" to get started.
          </p>
        ) : (
          references.map((reference, index) => (
            <div key={index} className="border rounded-lg p-4 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor={`ref-type-${index}`}>Type *</Label>
                  <Select value={reference.type} onValueChange={(value) => updateReference(index, "type", value)}>
                    <SelectTrigger id={`ref-type-${index}`}>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {REFERENCE_TYPES.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`ref-number-${index}`}>Reference Number *</Label>
                  <Input
                    id={`ref-number-${index}`}
                    placeholder="e.g., OE-BMW-98765"
                    value={reference.number}
                    onChange={(e) => updateReference(index, "number", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`ref-brand-${index}`}>Brand</Label>
                  <Select
                    value={reference.brandId || ""}
                    onValueChange={(value) => updateReference(index, "brandId", value)}
                  >
                    <SelectTrigger id={`ref-brand-${index}`}>
                      <SelectValue placeholder="Select brand" />
                    </SelectTrigger>
                    <SelectContent>
                      {brands.map((brand) => (
                        <SelectItem key={brand.id} value={brand.id}>
                          {brand.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex justify-end">
                <Button onClick={() => removeReference(index)} size="sm" variant="destructive">
                  <Trash2 className="w-4 h-4 mr-2" />
                  Remove
                </Button>
              </div>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  )
}


export default ReferenceForm;