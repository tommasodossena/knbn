import { useState } from "react";
import type { ReactNode } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface AddItemDialogProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  onSubmit: (value: string) => void;
  title: string;
  description: string;
  inputLabel: string;
  submitLabel: string;
  children?: ReactNode;
}

export function AddItemDialog({
  isOpen,
  setIsOpen,
  onSubmit,
  title,
  description,
  inputLabel,
  submitLabel,
  children,
}: AddItemDialogProps) {
  const [value, setValue] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(value);
    setIsOpen(false);
    setValue("");
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title">{inputLabel}</Label>
              <Input
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder={`Enter ${inputLabel.toLowerCase()}`}
              />
            </div>
            {children}
          </div>
          <DialogFooter>
            <Button type="submit" className="w-full" disabled={!value}>
              {submitLabel}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
