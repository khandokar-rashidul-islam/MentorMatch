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

const StepTwo = ({ onNext, onBack, isLast }) => {
  const {
    register,
    setValue,
    formState: { errors },
  } = useFormContext();

  return (
    <div>
      <h2 className="text-xl font-bold mb-6">Professional Details</h2>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>Profession *</Label>
          <Select
            onValueChange={(val) =>
              setValue("profession", val, { shouldValidate: true })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select profession" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Teacher">Teacher</SelectItem>
              <SelectItem value="Engineer">Engineer</SelectItem>
              <SelectItem value="Doctor">Doctor</SelectItem>
            </SelectContent>
          </Select>
          {errors.profession && (
            <p className="text-red-500 text-sm">{errors.profession.message}</p>
          )}
        </div>

        <div>
          <Label>Highest Education *</Label>
          <Select
            onValueChange={(val) =>
              setValue("education", val, { shouldValidate: true })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select education" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Bachelor">Bachelor</SelectItem>
              <SelectItem value="Masters">Masters</SelectItem>
              <SelectItem value="PhD">PhD</SelectItem>
            </SelectContent>
          </Select>
          {errors.education && (
            <p className="text-red-500 text-sm">{errors.education.message}</p>
          )}
        </div>

        <div className="col-span-2">
          <Label>Institute Name *</Label>
          <Input
            {...register("institute", {
              required: "Institute name is required",
            })}
          />
          {errors.institute && (
            <p className="text-red-500 text-sm">{errors.institute.message}</p>
          )}
        </div>

        <div className="col-span-2">
          <Label>Bank Account (Optional)</Label>
          <Input {...register("bank")} />
        </div>
      </div>
      <div className="mt-6 flex gap-4">
        <Button variant="outline" type="button" onClick={onBack}>
          Previous
        </Button>
        <Button type={isLast ? "submit" : "button"} onClick={onNext}>
          {isLast ? "Submit" : "Continue"}
        </Button>
      </div>
    </div>
  );
};

export default StepTwo;
