import { useFormContext } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

export default function StepRole({ onNext, isLast }) {
  const {
    setValue,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="">
      <h2 className="text-2xl font-semibold text-blue-800">Select Your Role</h2>

      <div className="grid grid-cols-2 gap-6">
        <div className="col-span-2">
          <Label>Role *</Label>
          <Select
            onValueChange={(val) =>
              setValue("role", val, { shouldValidate: true })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select your role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Mentor">Mentor</SelectItem>
              <SelectItem value="Student">Student</SelectItem>
              <SelectItem value="Admin">Admin</SelectItem>
            </SelectContent>
          </Select>
          <p className="text-red-500 text-sm">{errors.role?.message}</p>
        </div>
      </div>

      <div className="flex justify-between items-center">
        <Button onClick={onNext}>
          {isLast ? "Create Account" : "Continue"}
        </Button>
      </div>
    </div>
  );
}
