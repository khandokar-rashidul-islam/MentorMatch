import { useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { UploadCloud } from "lucide-react";

const StepThree = ({ onNext, onBack, isLast })=> {
  const {
    register,
    setValue,
    formState: { errors },
  } = useFormContext();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setValue("profileImage", file);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-primary">
        Additional Information
      </h2>

      <div className="grid grid-cols-2 gap-6">
        <div className=" flex flex-col gap-4">
          <Label>Gender *</Label>
          <Select
            onValueChange={(val) =>
              setValue("gender", val, { shouldValidate: true })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select your gender" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Male">Male</SelectItem>
              <SelectItem value="Female">Female</SelectItem>
              <SelectItem value="Other">Other</SelectItem>
            </SelectContent>
          </Select>
          <p className="text-red-500 text-sm">{errors.gender?.message}</p>
        </div>

        <div className="col-span-2  flex flex-col gap-4">
          <Label>Address *</Label>
          <Input
            {...register("address", { required: "Address is required" })}
            placeholder="Your full address"
          />
          <p className="text-red-500 text-sm">{errors.address?.message}</p>
        </div>

        <div className="col-span-2  flex flex-col gap-4">
          <Label>Profile Image (Optional)</Label>
          <div className="flex items-center gap-4 border border-dashed border-gray-300 p-4 rounded-md">
            <UploadCloud className="w-6 h-6 text-gray-500" />
            <input
              type="file"
              accept="image/png, image/jpeg"
              onChange={handleImageChange}
              className="text-sm"
            />
            <span className="text-gray-500 text-sm ml-auto">
              PNG, JPG up to 5MB
            </span>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center">
        <Button variant="outline" onClick={onBack}>
          Previous
        </Button>
        <Button>
          {isLast ? "Create Account" : "Continue"}
        </Button>
      </div>
    </div>
  );
}
export default StepThree;