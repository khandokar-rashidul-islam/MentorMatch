import { useForm, FormProvider } from "react-hook-form";
import { useState } from "react";
import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import StepThree from "./StepThree";

const steps = [StepOne, StepTwo, StepThree]; // Add more as needed

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
      <form onSubmit={onSubmit} className=" py-20 flex ">
        {/* Sidebar */}
        <div className=" w-1/3 bg-primary text-white p-10 flex flex-col justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-4">
              Professional Registration
            </h2>
            <p className="text-sm mb-6">
              Create your professional profile and join our community of experts
            </p>

            <ol className="space-y-4 text-base font-medium">
              <li
                className={`${
                  step === 0 ? "text-white font-bold" : "text-white/70"
                }`}
              >
                1. Personal Information
              </li>
              <li
                className={`${
                  step === 1 ? "text-white font-bold" : "text-white/70"
                }`}
              >
                2. Professional Details
              </li>
              <li
                className={`${
                  step === 2 ? "text-white font-bold" : "text-white/70"
                }`}
              >
                3. Additional Information
              </li>
            </ol>
          </div>

          <div className="mt-10">
            <div className="h-2 bg-white/30 rounded-full w-full overflow-hidden">
              <div
                className="h-2 bg-white rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-sm mt-1">{Math.round(progress)}%</p>
          </div>
        </div>

        {/* Form */}
        <div className="w-2/3 p-10 bg-gray-100">
          <CurrentStep
            onNext={nextStep}
            onBack={prevStep}
            isLast={step === steps.length - 1}
          />
        </div>
      </form>
    </FormProvider>
  );
}
