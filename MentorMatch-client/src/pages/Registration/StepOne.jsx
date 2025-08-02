import { useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const StepOne = ({ onNext, onBack, isLast }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div>
      <h2 className="text-2xl font-semibold text-primary mb-6">
        Personal Information
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col gap-4">
          <Label>Username *</Label>
          <Input
            {...register("username", { required: "Username is required" })}
          />
          {errors.username && (
            <p className="text-red-500 text-sm">{errors.username.message}</p>
          )}
        </div>
        <div className="flex flex-col gap-4">
          <Label>Email Address *</Label>
          <Input
            type="email"
            {...register("email", { required: "Email is required" })}
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>
        <div className="flex flex-col gap-4">
          <Label>Phone Number *</Label>
          <Input {...register("phone", { required: "Phone is required" })} />
          {errors.phone && (
            <p className="text-red-500 text-sm">{errors.phone.message}</p>
          )}
        </div>
        <div className="flex flex-col gap-4">
          <Label>Birth Date *</Label>
          <Input
            type="date"
            {...register("birthDate", { required: "Birth date is required" })}
          />
          {errors.birthDate && (
            <p className="text-red-500 text-sm">{errors.birthDate.message}</p>
          )}
        </div>
        <div className="flex flex-col gap-4">
          <Label>Password *</Label>
          <Input
            type="password"
            {...register("password", { required: "Password is required" })}
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
        </div>
        <div className="flex flex-col gap-4">
          <Label>NID/Birth Certificate ID *</Label>
          <Input {...register("nid", { required: "ID is required" })} />
          {errors.nid && (
            <p className="text-red-500 text-sm">{errors.nid.message}</p>
          )}
        </div>
      </div>
      <div className="flex pt-6 justify-between items-center">
        <Button variant="outline" onClick={onBack}>
          Previous
        </Button>
        <Button onClick={onNext}>
          {isLast ? "Create Account" : "Continue"}
        </Button>
      </div>
    </div>
  );
};

export default StepOne;
