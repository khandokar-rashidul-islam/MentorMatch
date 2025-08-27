import { useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

const StepOne = ({ onNext, onBack, isLast }) => {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const password = watch("password");

  return (
    <div>
      <h2 className="text-2xl font-semibold text-primary mb-6">
        Personal Information
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Username */}
        <div className="flex flex-col gap-4">
          <Label>Username *</Label>
          <Input
            {...register("username", { required: "Username is required" })}
          />
          {errors.username && (
            <p className="text-red-500 text-sm">{errors.username.message}</p>
          )}
        </div>

        {/* Email */}
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

        {/* Phone */}
        <div className="flex flex-col gap-4">
          <Label>Phone Number *</Label>
          <Input {...register("phone", { required: "Phone is required" })} />
          {errors.phone && (
            <p className="text-red-500 text-sm">{errors.phone.message}</p>
          )}
        </div>

        {/* Birth Date */}
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

        {/* Password */}
        <div className="relative flex flex-col gap-4">
          <Label>Password *</Label>
          <Input
            type={showPassword ? "text" : "password"}
            {...register("password", { required: "Password is required" })}
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 top-[38px] text-muted-foreground"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
        </div>

        {/* Confirm Password */}
        <div className="relative flex flex-col gap-4">
          <Label>Confirm Password *</Label>
          <Input
            type={showConfirmPassword ? "text" : "password"}
            {...register("confirmPassword", {
              required: "Please confirm your password",
              validate: (value) =>
                value === password || "Passwords do not match",
            })}
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword((prev) => !prev)}
            className="absolute right-3 top-[38px] text-muted-foreground"
          >
            {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        {/* NID */}
        <div className="flex flex-col gap-4">
          <Label>NID/Birth Certificate ID *</Label>
          <Input {...register("nid", { required: "ID is required" })} />
          {errors.nid && (
            <p className="text-red-500 text-sm">{errors.nid.message}</p>
          )}
        </div>
      </div>

      {/* Navigation Buttons */}
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
