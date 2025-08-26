import { useForm, FormProvider } from "react-hook-form";
import { useEffect, useState } from "react";
import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import StepThree from "./StepThree";
import StepRole from "./StepRole";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { useTheme } from "next-themes";

const steps = [StepRole, StepOne, StepTwo, StepThree]; // Add more as needed

export default function RegistrationForm() {
  const [init, setInit] = useState(false);
  const { theme } = useTheme();
  const methods = useForm({ mode: "onTouched" });
  const [step, setStep] = useState(0);
  const CurrentStep = steps[step];
  const progress = ((step + 1) / steps.length) * 100;

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const nextStep = async () => {
    const valid = await methods.trigger();
    if (valid) setStep((s) => s + 1);
  };

  const prevStep = () => setStep((s) => s - 1);

  // Shared fields between learner & mentor
  const CommonFields = (data) => ({
    name: data.username,
    phone: data.phone,
    birthDate: data.birthDate,
    gender: data.gender,
    address: data.address,
    education: data.education,
    educationInstitute: data.institute,
    profession: data.profession,
    profileImage: "", // uploaded URL
    nidOrBirthCertId: data.nid,
    bankAccountNo: data.bank,
  });

  // Mentor profile
  const MentorProfile = (data) => ({
    ...CommonFields(data),
    expertiseAreas:
      data.expertiseAreas?.split?.(",").map((s) => s.trim()) || [],
    bio: data.bio || "",
    experienceYears: Number(data.experienceYears) || 0,
  });

  // Learner profile
  const LearnerProfile = (data) => ({
    ...CommonFields(data),
  });

  // onSubmit function
  const onSubmit = methods.handleSubmit(async (data) => {
    const payload = {
      role: data.role,
      user: {
        email: data.email,
        password: data.password,
      },
    };

    if (data.role === "mentor") {
      payload.mentorProfile = MentorProfile(data);
    } else if (data.role === "learner") {
      payload.learnerProfile = LearnerProfile(data);
    }

    console.log("Final Payload:", payload);

    try {
      const res = await fetch(`http://localhost:5000/api/v1/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to register user");
      }

      const result = await res.json();
      console.log("User created successfully:", result);
      alert("User registered successfully!");
    } catch (err) {
      console.error("Error creating user:", err);
      alert(` Registration failed: ${err.message}`);
    }
  });

  return (
    <FormProvider {...methods}>
      <div className="w-11/12 min-h-screen mx-auto flex flex-col justify-center items-center p-4">
        <div className="grok-bg fixed inset-0 -z-5 dark:opacity-8 opacity-20"></div>
        <div className="fixed inset-0 -z-8 ">
          <Particles
            id="tsparticles"
            init={init}
            options={{
              background: {
                //
              },
              fpsLimit: 60,
              interactivity: {},
              particles: {
                number: {
                  value: 120, // how many stars
                  density: {
                    enable: true,
                    area: 800,
                  },
                },
                color: { value: theme === "dark" ? "#36b1e5" : "#076086" }, // star color
                shape: { type: "circle" },
                opacity: {
                  value: 0.8,
                  random: true,
                  animation: {
                    enable: true,
                    speed: 0.5,
                    minimumValue: 0.2,
                  },
                },
                size: {
                  value: { min: 1, max: 3 }, // random star sizes
                },
                move: {
                  enable: true,
                  speed: 1, // slow drift like stars
                  direction: "none",
                  random: true,
                  straight: false,
                  outModes: {
                    default: "out",
                  },
                },
              },
              detectRetina: true,
            }}
          />
        </div>

        <form
          onSubmit={onSubmit}
          className="pt-35 pb-20 flex flex-col lg:flex-row "
        >
          {/* Sidebar */}
          <div className=" lg:w-[45%] lg:rounded-l-xl bg-primary text-secondary p-10 flex flex-col justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-4">
                Professional Registration
              </h2>
              <p className="text-sm mb-6">
                Create your professional profile and join our community of
                experts
              </p>

              <div className="flex flex-col items-start relative  space-y-8 mt-4">
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
                      <div
                        className={`h-6 w-6 rounded-full flex items-center justify-center border-2  text-xs font-medium
                ${
                  isCompleted
                    ? "bg-teal-900 border-teal-500 text-teal-500 dark:text-teal-300"
                    : isActive
                    ? "bg-white border-teal-300 text-teal-800 dark:text-teal-800 dark:border-teal-800"
                    : "bg-white border-red-600 text-red-500"
                }`}
                      >
                        {isCompleted ? "✓" : index + 1}
                      </div>

                      {/* Step label */}
                      <div
                        className={`ml-3 text-sm ${
                          isCompleted
                            ? "text-teal-500 dark:text-teal-900"
                            : isActive
                            ? "text-white font-semibold"
                            : "text-gray-400 dark:text-gray-600 font-semibold"
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
          <div className="w-full mx-auto p-10 bg-background border lg:rounded-r-xl">
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
