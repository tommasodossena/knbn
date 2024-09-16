import { useState, useRef, useEffect } from "react";
import { Input } from "./ui/input";
import { Text } from "@/components/ui/text";
import type { TypographyProps } from "@/components/ui/text";

interface EditableFieldProps {
  initialValue: string;
  onSave: (value: string) => void;
  isEditing: boolean;
  setIsEditing: (isEditing: boolean) => void;
  variant?: NonNullable<TypographyProps["variant"]>;
}

export function EditableField({
  initialValue,
  onSave,
  isEditing,
  setIsEditing,
  variant = "smallText",
}: EditableFieldProps) {
  const [value, setValue] = useState(initialValue);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus();
      inputRef.current?.select();
    }
  }, [isEditing]);

  const handleBlur = () => {
    setIsEditing(false);
    if (value !== initialValue) {
      onSave(value);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleBlur();
    } else if (e.key === "Escape") {
      setIsEditing(false);
      setValue(initialValue);
    }
  };

  return isEditing ? (
    <Input
      ref={inputRef}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
      className="h-fit"
    />
  ) : (
    <Text
      variant={variant}
      onClick={() => setIsEditing(true)}
      onKeyDown={(e) => e.key === "Enter" && setIsEditing(true)}
      tabIndex={0}
      role="button"
      className="w-full px-1 py-0.5 cursor-default border border-transparent"
    >
      {value}
    </Text>
  );
}
