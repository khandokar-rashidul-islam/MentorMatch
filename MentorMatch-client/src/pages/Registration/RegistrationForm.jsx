import { useForm, FormProvider } from "react-hook-form";
import { useState } from "react";
import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import StepThree from "./StepThree";
import StepRole from "./StepRole";

const steps = [StepRole, StepOne, StepTwo, StepThree]; // Add more as needed

export default function RegistrationForm() {
  const methods = useForm({ mode: "onTouched" });
  const [step, setStep] = useState(0);
  const CurrentStep = steps[step];
  const progress = ((step + 1) / steps.length) * 100;

  const nextStep = async () => {
    const valid = await methods.trigger();
    if (valid) setStep((s) => s + 1);
  };

  const prevStep = () => setStep((s) => s - 1);

  const onSubmit = methods.handleSubmit((data) => {
    console.log("Form Submitted:", data);
    alert("✅ Submitted!");
  });

  return (
    <FormProvider {...methods}>
      <div className="w-11/12 min-h-screen mx-auto flex justify-center items-center p-4">
        <form onSubmit={onSubmit} className="pt-35 pb-20 flex">
          {/* Sidebar */}
          <div className="w-11/12 lg:w-1/3 mx-auto bg-primary text-secondary p-10 flex flex-col justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-4">
                Professional Registration
              </h2>
              <p className="text-sm mb-6">
                Create your professional profile and join our community of
                experts
              </p>

              <div className="flex flex-col items-start relative pl-4 space-y-8 mt-4">
                {[
                  "Selecting Your Role",
                  "Personal Information",
                  "Professional Details",
                  "Additional Information",
                ].map((label, index) => {
                  const isCompleted = step > index;
                  const isActive = step === index;

                  return (
                    <div
                      key={index}
                      className="flex items-center z-10 relative"
                    >
                      {/* Step circle */}
               <div className={`h-6 w-6 rounded-full flex items-center justify-center border-2  text-xs font-medium
                ${
                  isCompleted
                    ? "bg-teal-600 border-teal-600 text-white"
                    : isActive
                    ? "bg-teal-600 border-teal-600 text-white"
                    : "bg-white border-red-600 text-muted-foreground"
                    }`}
                      >
                        {isCompleted ? "✓" : index + 1}
                      </div>

                      {/* Step label */}
                      <div
                        className={`ml-3 text-sm ${
                          isCompleted
                            ? "text-teal-600"
                            : isActive
                            ? "text-white font-semibold"
                            : "text-muted-foreground"
                        }`}
                      >
                        {label}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="mt-10">
              <div className="h-2 bg-secondary/50 rounded-full w-full overflow-hidden">
                <div
                  className="h-2 bg-secondary rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="text-sm mt-1">{Math.round(progress)}%</p>
            </div>
          </div>

          {/* Form */}
          <div className="w-11/12 mx-auto p-10 bg-background border">
            <CurrentStep
              onNext={nextStep}
              onBack={prevStep}
              isLast={step === steps.length - 1}
            />
          </div>
        </form>
      </div>
    </FormProvider>
  );
}
