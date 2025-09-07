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

// eslint-disable-next-line no-unused-vars
const StepThree = ({ onBack, isLast, setProfileImage, isLoading }) => {
  const {
    register,
    setValue,
    formState: { errors },
  } = useFormContext();

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setProfileImage(e.target.files[0]);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-primary">
        Additional Information
      </h2>

      <div className="grid grid-cols-2 ">
        <div className="flex flex-col gap-4">
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

        <div className="col-span-2 flex flex-col gap-4">
          <Label>Address *</Label>
          <Input
            {...register("address", { required: "Address is required" })}
            placeholder="Your full address"
          />
          <p className="text-red-500 text-sm">{errors.address?.message}</p>
        </div>

        <div className="col-span-2 flex flex-col gap-4">
          <Label>Profile Image (Optional)</Label>
          <div className="flex flex-col md:flex-row flex-wrap  items-center justify-center gap-4 border border-dashed border-gray-300 p-4 rounded-md">
            <UploadCloud className="w-6 h-6 text-gray-500" />
            <div className="flex justify-center w-full ">
              <input
                type="file"
                accept="image/png, image/jpeg"
                onChange={handleImageChange}
                className="text-sm w-1/3 mx-auto border border-dashed "
              />
            </div>

            <span className="text-gray-500 text-sm ">PNG, JPG up to 5MB</span>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center">
        <Button variant="outline" onClick={onBack}>
          Previous
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Registering..." : "Register"}
        </Button>
      </div>
    </div>
  );
};
export default StepThree;