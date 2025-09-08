import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Link, useNavigate } from "react-router";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { useTheme } from "next-themes";
import { useLoginMutation } from "../../redux/features/auth/authApi";
import { toast } from "sonner";

const SignIn = () => {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm({
    defaultValues: {
      email: "ifarabiislam@example.com",
      password: "pass1234",
    },
  });
  const [init, setInit] = useState(false);
  // RTK Query login mutation
  const [login, { isLoading }] = useLoginMutation();

  const { theme } = useTheme();
  const [showPassword, setShowPassword] = useState(false);
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const onSubmit = async (data) => {
    try {
      // call login mutation
      const result = await login({
        email: data.email,
        password: data.password,
      }).unwrap();

      const user = result?.data?.user;

      if (!user) throw new Error("Login failed: missing user or token");

      toast.success("Logged in successfully!");

      // Navigate based on role
      const role = user.activeRole;
      if (role === "mentor") navigate("/dashboard/mentor/overview");
      else if (role === "learner") navigate("/dashboard/learner/all-gigs");
      else navigate("/");
    } catch (err) {
      console.error("Login failed:", err);
      toast.error(err?.data?.message || err.message || "Login failed");
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center ">
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
      <Card className="w-full max-w-md shadow-lg border mt-35 mb-20 relative z-10">
        <CardContent className="p-6">
          <h2 className="text-2xl font-bold text-center mb-2 text-primary">
            Welcome Back
          </h2>
          <p className="text-sm text-center text-muted-foreground mb-6">
            Sign in to access your professional dashboard
          </p>

          <Button variant="outline" className="w-full mb-4">
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="Google"
              className="w-5 h-5 mr-2"
            />
            Continue with Google
          </Button>

          <div className="flex items-center my-4">
            <Separator className="flex-1" />
            <span className="px-2 text-sm text-muted-foreground">OR</span>
            <Separator className="flex-1" />
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="flex flex-col gap-4">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="your.email@example.com"
                {...register("email", { required: true })}
              />
            </div>

            <div className="relative flex flex-col gap-4">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                {...register("password", { required: true })}
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-[38px] text-muted-foreground"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="remember"
                  className="accent-primary"
                />
                <label htmlFor="remember">Remember me</label>
              </div>
              <a href="#" className="text-primary hover:underline">
                Forgot password?
              </a>
            </div>

            <Button
              type="submit"
              className="w-full bg-primary hover:bg-primary"
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>
          </form>
          <p className="text-center text-sm mt-4">
            Don’t have an account?{" "}
            <Link to="/registration" className="text-primary hover:underline">
              Sign up here
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignIn;
