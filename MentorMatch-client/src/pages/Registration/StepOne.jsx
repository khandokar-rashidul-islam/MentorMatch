import { useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const StepOne = ({ onNext }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div>
      <h2 className="text-xl font-bold mb-6">Personal Information</h2>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>Username *</Label>
          <Input
            {...register("username", { required: "Username is required" })}
          />
          {errors.username && (
            <p className="text-red-500 text-sm">{errors.username.message}</p>
          )}
        </div>
        <div>
          <Label>Email Address *</Label>
          <Input
            type="email"
            {...register("email", { required: "Email is required" })}
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>
        <div>
          <Label>Phone Number *</Label>
          <Input {...register("phone", { required: "Phone is required" })} />
          {errors.phone && (
            <p className="text-red-500 text-sm">{errors.phone.message}</p>
          )}
        </div>
        <div>
          <Label>Birth Date *</Label>
          <Input
            type="date"
            {...register("birthDate", { required: "Birth date is required" })}
          />
          {errors.birthDate && (
            <p className="text-red-500 text-sm">{errors.birthDate.message}</p>
          )}
        </div>
        <div>
          <Label>Password *</Label>
          <Input
            type="password"
            {...register("password", { required: "Password is required" })}
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
        </div>
        <div>
          <Label>NID/Birth Certificate ID *</Label>
          <Input {...register("nid", { required: "ID is required" })} />
          {errors.nid && (
            <p className="text-red-500 text-sm">{errors.nid.message}</p>
          )}
        </div>
      </div>
      <Button className="mt-6" onClick={onNext}>
        Continue
      </Button>
    </div>
  );
};

export default StepOne;
