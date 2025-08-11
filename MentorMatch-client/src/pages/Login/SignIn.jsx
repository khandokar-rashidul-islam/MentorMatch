import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router";

const SignIn = () => {
  const { register, handleSubmit } = useForm();
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className="min-h-screen flex items-center justify-center ">
      <Card className="w-full max-w-md shadow-lg border mt-35 mb-20 ">
        <CardContent className="p-6">
          <h2 className="text-2xl font-bold text-center mb-2 text-primary">Welcome Back</h2>
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
              Sign In
            </Button>
          </form>
          <p className="text-center text-sm mt-4">
            Don’t have an account?{" "}
            <Link to="/dashboard/mentor/overview" className="text-primary hover:underline">
              Sign up here
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignIn;
