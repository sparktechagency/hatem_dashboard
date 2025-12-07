/* eslint-disable @typescript-eslint/no-explicit-any */
import JoditEditor from "jodit-react";
import { useMemo } from "react";
import { Controller } from "react-hook-form";

type TProps = {
  label: string;
  name: string;
  height?: number;
  control: any;
  placeholder?: string;
};

const CustomQuilEditor = ({
  label,
  name,
  control,
  height = 200,
  placeholder = "Write here..",
}: TProps) => {
  // Memoize config to prevent re-renders and fix TS errors
  const config = useMemo(
    () => ({
      readonly: false,
      height: height,
      placeholder: placeholder,
      buttons: [
        "source",
        "|",
        "bold",
        "italic",
        "underline",
        "strikethrough",
        "|",
        "ul",
        "ol",
        "|",
        "font",
        "fontsize",
        "paragraph",
        "|",
        "table",
        "link",
        "|",
        "undo",
        "redo",
        "|",
        "hr",
        "eraser",
        "fullsize",
      ],
      // CSS/Visual settings
      toolbarAdaptive: false,
      showCharsCounter: false,
      showWordsCounter: false,
      showXPathInStatusbar: false,

      // Paste settings (The specific TS Fix is 'as any' or 'as const')
      askBeforePasteHTML: false,
      askBeforePasteFromWord: false,
      defaultActionOnPaste: "insert_as_html" as any,
    }),
    [height, placeholder]
  );

  return (
    <div className="w-full">
      <label
        htmlFor={name}
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {label}
      </label>

      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <div className="prose-editor-wrapper">
            <JoditEditor
              value={value || ""}
              config={config}
              // Using onBlur ensures performance and prevents cursor jumping
              onBlur={(newContent) => onChange(newContent)}
              onChange={() => {}}
            />
            {error && (
              <p className="text-red-600 text-sm mt-1">{error.message}</p>
            )}
          </div>
        )}
      />
    </div>
  );
};

export default CustomQuilEditor;
