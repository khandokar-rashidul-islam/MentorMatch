import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";

const schema = z.object({
  username: z.string().min(2, "Name is required"),
  bio: z.string().optional(),
  email: z.string().email(),
  phone: z.string().min(10),
  birthdate: z.string(),
  nid: z.string(),
  bankAccount: z.string(),
  address: z.string(),
  gender: z.enum(["Male", "Female", "Other"]),
  about: z.string().optional(),
  education: z.string().optional(),
});

// Default learner data
const defaultLearner = {
  image: "https://i.pravatar.cc/150?img=12",
  username: "Suraiya Jahan",
  bio: "MERN Stack Enthusiast | Passionate Problem Solver",
  email: "suraiya@example.com",
  phone: "01712345678",
  birthdate: "2000-08-15",
  nid: "1234567890123",
  bankAccount: "9876543210",
  address: "Dhaka, Bangladesh",
  gender: "Female",
  about:
    "I am a passionate learner and developer with strong problem-solving skills and interest in full-stack development.",
  education:
    "B.Sc. in Computer Science & Engineering, 8th Semester, Example University",
};
const EditProfile = () => {
   const navigate = useNavigate();
  const [editable, setEditable] = useState(false);

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: defaultLearner,
  });

  const onSubmit = (data) => {
    console.log("Updated Data:", data);
    toast.success("Profile updated successfully!");
    setEditable(false);
  };
  return (
    <div className='min-h-screen pt-28 w-11/12 mx-auto'>
      <div className="max-w-4xl mx-auto pb-8 ">
      {/* Back Button */}
      <div className="flex items-center gap-2 mb-4">
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Profile
        </Button>
      </div>

      <Card className="shadow-lg rounded-2xl">
        <CardHeader className="flex justify-between items-center">
          <CardTitle className="text-xl font-bold">Edit Profile</CardTitle>
          {!editable ? (
            <Button variant="default" onClick={() => setEditable(true)}>
              Edit
            </Button>
          ) : (
            <Button variant="destructive" onClick={() => setEditable(false)}>
              Cancel
            </Button>
          )}
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="grid gap-6  md:grid-cols-2"
            >
              {/* Profile Image */}
              <div className="col-span-2 flex flex-col items-center gap-3">
                <img
                  src={defaultLearner.image}
                  alt="Profile"
                  className="w-32 h-32 rounded-full object-cover border"
                />
                {editable && <Input type="file" className="max-w-sm" />}
              </div>

              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input {...field} disabled={!editable} />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="bio"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Short Bio</FormLabel>
                    <FormControl>
                      <Input {...field} disabled={!editable} />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" {...field} disabled={!editable} />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone</FormLabel>
                    <FormControl>
                      <Input {...field} disabled={!editable} />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="birthdate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Birthdate</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} disabled={!editable} />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="nid"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>NID / Birth Certificate ID</FormLabel>
                    <FormControl>
                      <Input {...field} disabled={!editable} />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="bankAccount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bank Account Number</FormLabel>
                    <FormControl>
                      <Input {...field} disabled={!editable} />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address</FormLabel>
                    <FormControl>
                      <Input {...field} disabled={!editable} />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Gender</FormLabel>
                    <FormControl>
                      <Input {...field} disabled={!editable} />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="about"
                render={({ field }) => (
                  <FormItem className="col-span-2">
                    <FormLabel>About</FormLabel>
                    <FormControl>
                      <Textarea {...field} disabled={!editable} />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="education"
                render={({ field }) => (
                  <FormItem className="col-span-2">
                    <FormLabel>Education</FormLabel>
                    <FormControl>
                      <Textarea {...field} disabled={!editable} />
                    </FormControl>
                  </FormItem>
                )}
              />

              {editable && (
                <div className="col-span-2 flex justify-end">
                  <Button type="submit" className="px-6">
                    Save Changes
                  </Button>
                </div>
              )}
            </form>
          </Form>
        </CardContent>
      </Card>
    </div></div>
  )
}

export default EditProfile