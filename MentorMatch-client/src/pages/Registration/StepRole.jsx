import { useFormContext } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useState } from "react";

export default function StepRole({ onNext, isLast }) {
  const {
    register,
    setValue,
    formState: { errors },
  } = useFormContext();

  const [selectedRole, setSelectedRole] = useState("");

  const handleSelect = (role) => {
    setSelectedRole(role);
    setValue("role", role, { shouldValidate: true });
  };

  return (
    <div className="h-full w-full flex flex-col items-center justify-center gap-10 px-4 py-6">
      <div className="w-full max-w-xl">
        <h2 className="text-3xl font-bold text-primary text-center mb-8">
          How Would You Like to Join?
        </h2>

        <div className="flex flex-col md:flex-row justify-center items-center gap-6">
          {/* Learner */}
          <div
            onClick={() => handleSelect("learner")}
            className={`w-full md:w-1/2 text-center px-6 py-4 border rounded-xl font-medium cursor-pointer transition-colors duration-200
              ${
                selectedRole === "learner"
                  ? "bg-primary text-white border-primary"
                  : "bg-white text-gray-700 border-gray-300 hover:border-primary hover:text-primary"
              }`}
          >
            Learner
          </div>

          {/* Mentor */}
          <div
            onClick={() => handleSelect("mentor")}
            className={`w-full md:w-1/2 text-center px-6 py-4 border rounded-xl font-medium cursor-pointer transition-colors duration-200
              ${
                selectedRole === "mentor"
                  ? "bg-primary text-white border-primary"
                  : "bg-white text-gray-700 border-gray-300 hover:border-primary hover:text-primary"
              }`}
          >
            Mentor
          </div>
        </div>

        {/* Hidden input to register with react-hook-form */}
        <input
          type="hidden"
          value={selectedRole}
          {...register("role", { required: "Role is required" })}
        />
        {errors.role && (
          <p className="text-red-500 text-sm mt-2 text-center">
            {errors.role.message}
          </p>
        )}
      </div>

      <div className="w-full max-w-xl flex justify-end mt-8">
        <Button onClick={onNext}>
          {isLast ? "Create Account" : "Continue"}
        </Button>
      </div>
    </div>
  );
}
