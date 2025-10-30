import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Plus, Trash2 } from "lucide-react"

interface Section {
  sectionName: string
  fields: Array<{
    fieldName: string
    valueString?: string
    valueFloat?: number
  }>
}

interface SectionsManagerProps {
  sections: Section[]
  onSectionsChange: (sections: Section[]) => void
}

const SectionForm = ({ sections, onSectionsChange }: SectionsManagerProps) => {

  const isSectionComplete = (section: Section): boolean => {
    if (!section.sectionName.trim()) return false
    if (section.fields.length === 0) return false
    return section.fields.every(
      (field) => field.fieldName.trim() && (field.valueString?.trim() || field.valueFloat !== undefined),
    )
  }

  const canAddSection = (): boolean => {
    if (sections.length === 0) return true
    return isSectionComplete(sections[sections.length - 1])
  }

  const addSection = () => {
    onSectionsChange([
      ...sections,
      {
        sectionName: "",
        fields: [],
      },
    ])
  }

  const removeSection = (index: number) => {
    onSectionsChange(sections.filter((_, i) => i !== index))
  }

  const updateSectionName = (index: number, name: string) => {
    const updated = [...sections]
    updated[index].sectionName = name
    onSectionsChange(updated)
  }

  const canAddField = (sectionIndex: number): boolean => {
    const section = sections[sectionIndex]
    if (!section.sectionName.trim()) return false
    if (section.fields.length === 0) return true
    return section.fields.every(
      (field) => field.fieldName.trim() && (field.valueString?.trim() || field.valueFloat !== undefined),
    )
  }

  const addField = (sectionIndex: number) => {
    const updated = [...sections]
    updated[sectionIndex].fields.push({
      fieldName: "",
      valueString: "",
    })
    onSectionsChange(updated)
  }

  const removeField = (sectionIndex: number, fieldIndex: number) => {
    const updated = [...sections]
    updated[sectionIndex].fields.splice(fieldIndex, 1)
    onSectionsChange(updated)
  }

  const updateField = (sectionIndex: number, fieldIndex: number, key: string, value: any) => {
    const updated = [...sections]
    updated[sectionIndex].fields[fieldIndex] = {
      ...updated[sectionIndex].fields[fieldIndex],
      [key]: value,
    }
    onSectionsChange(updated)
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Sections *</CardTitle>
            <CardDescription>Add product specifications and details sections</CardDescription>
          </div>
          <Button onClick={addSection} size="sm" variant="outline" disabled={!canAddSection()}>
            <Plus className="w-4 h-4 mr-2" />
            Add Section
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {sections.length === 0 ? (
          <p className="text-sm text-muted-foreground py-8 text-center">
            No sections added yet. Click "Add Section" to get started.
          </p>
        ) : (
          sections.map((section, sectionIndex) => (
            <div key={sectionIndex} className="border rounded-lg p-4 space-y-4">
              <div className="flex items-end gap-2">
                <div className="flex-1 space-y-2">
                  <Label htmlFor={`section-name-${sectionIndex}`}>Section Name *</Label>
                  <Input
                    id={`section-name-${sectionIndex}`}
                    placeholder="e.g., Specifications"
                    value={section.sectionName}
                    onChange={(e) => updateSectionName(sectionIndex, e.target.value)}
                  />
                </div>
                <Button onClick={() => removeSection(sectionIndex)} size="sm" variant="destructive">
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>

              {/* Fields */}
              <div className="space-y-3 pl-4 border-l-2 border-muted">
                {section.fields.map((field, fieldIndex) => (
                  <div key={fieldIndex} className="space-y-2">
                    <div className="flex items-end gap-2">
                      <div className="flex-1 space-y-2">
                        <Label htmlFor={`field-name-${sectionIndex}-${fieldIndex}`}>Field Name</Label>
                        <Input
                          id={`field-name-${sectionIndex}-${fieldIndex}`}
                          placeholder="e.g., Material"
                          value={field.fieldName}
                          onChange={(e) => updateField(sectionIndex, fieldIndex, "fieldName", e.target.value)}
                        />
                      </div>
                      <div className="flex-1 space-y-2">
                        <Label htmlFor={`field-value-${sectionIndex}-${fieldIndex}`}>Value</Label>
                        <Input
                          id={`field-value-${sectionIndex}-${fieldIndex}`}
                          placeholder="e.g., ABS Plastic"
                          value={field.valueString || ""}
                          onChange={(e) => updateField(sectionIndex, fieldIndex, "valueString", e.target.value)}
                        />
                      </div>
                      <Button onClick={() => removeField(sectionIndex, fieldIndex)} size="sm" variant="ghost">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              <Button
                onClick={() => addField(sectionIndex)}
                size="sm"
                variant="outline"
                className="w-full"
                disabled={!canAddField(sectionIndex)}
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Field
              </Button>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  )
}


export default SectionForm;