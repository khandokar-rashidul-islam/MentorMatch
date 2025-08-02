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
import { useState } from "react";

export default function StepRole({ onNext, isLast }) {
  const {
    register,
    setValue,
    formState: { errors },
  } = useFormContext();

  const [selectedRole, setSelectedRole] = useState("");

  const handleChange = (val) => {
    setSelectedRole(val);
    setValue("role", val, { shouldValidate: true });
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold text-primary my-4">
        Select Your Role
      </h2>

      <div className="grid grid-cols-2 gap-6">
        <div className="col-span-2 flex flex-col gap-4">
          <Label>Role *</Label>
          <Select onValueChange={handleChange} value={selectedRole}>
            <SelectTrigger>
              <SelectValue placeholder="Select your role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Student">Learner</SelectItem>
              <SelectItem value="Mentor">Mentor</SelectItem>
            </SelectContent>
          </Select>
          {/* Registering the value manually via hidden input */}
          <input
            type="hidden"
            value={selectedRole}
            {...register("role", { required: "Role is required" })}
          />
          {errors.role && (
            <p className="text-red-500 text-sm">{errors.role.message}</p>
          )}
        </div>
      </div>

      <div className="flex justify-between items-center mt-4">
        <Button onClick={onNext}>
          {isLast ? "Create Account" : "Continue"}
        </Button>
      </div>
    </div>
  );
}
