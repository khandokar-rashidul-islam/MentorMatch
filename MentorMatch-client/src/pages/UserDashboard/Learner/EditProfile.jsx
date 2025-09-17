import { useEffect, useState } from "react";
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
import { useEditActiveProfileMutation, useGetActiveProfileQuery } from "../../../redux/features/user/userApi";

const schema = z.object({
  profileImage: z.any(),
  name: z.string().min(2, "Name is required"),
  profession: z.string().optional(),
  phone: z.string().min(10),
  birthDate: z.string(),
  nidOrBirthCertId: z.string(),
  bankAccountNo: z.string(),
  address: z.string(),
  gender: z.any(),
  about: z.string().optional(),
  education: z.string().optional(),
  educationInstitute: z.string().optional()
});


const EditProfile = () => {
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(null);
  const [preview, setPreview] = useState(null);
  // fetch old data
  const { data, isLoading } = useGetActiveProfileQuery();
  console.log(data)
  const profile = data?.data?.user?.profile;
  console.log(profile)
  // mutation
  const [editProfile, { isLoading: isSaving }] = useEditActiveProfileMutation();
  const [editable, setEditable] = useState(false);

  const form = useForm({
    resolver: zodResolver(schema)
  });

  const onSubmit = async (data) => {
    const formData = new FormData();

    // Append text fields
    Object.keys(data).forEach((key) => {
      formData.append(key, data[key]);
    });

    // Append image if changed
    if (selectedImage) {
      formData.append("profileImage", selectedImage); // field name must match backend
    }


    await editProfile(formData).unwrap();
    console.log("Updated Data:", data);
    toast.success("Profile updated successfully!");
    setEditable(false);
  };

  useEffect(() => {
    if (profile) {
      form.reset({
        profileImage: profile.profileImage || "",
        name: profile.name || "",
        profession: profile.profession || "",
        phone: profile.phone || "",
        birthDate: profile.birthDate || "",
        nidOrBirthCertId: profile.nidOrBirthCertId || "",
        bankAccountNo: profile.bankAccountNo || "",
        address: profile.address || "",
        gender: profile.gender || "Other",
        about: profile.about || "",
        educationInstitute: profile.educationInstitute || "",
        education: profile.education || "",
      });
    }
  }, [profile, form]);
  useEffect(() => {
    if (!selectedImage) {
      setPreview(null);
      return;
    }
    const objectUrl = URL.createObjectURL(selectedImage);
    setPreview(objectUrl);

    // Cleanup
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedImage]);
  if (isLoading) {
    console.log("loading...")
    return <div className="pt-20 min-h-screen text-center">loading....</div>
  }
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
                    src={preview || profile.profileImage}
                    alt="Profile"
                    className="w-32 h-32 rounded-full object-cover border"
                  />
                  {editable && <>
                    <FormField
                      control={form.control}
                      name="profileImage"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input type="file" className="max-w-sm" accept="image/*"
                              onChange={(e) => {
                                if (e.target.files && e.target.files[0]) {
                                  setSelectedImage(e.target.files[0]);
                                }
                              }} />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                  </>}
                </div>

                <FormField
                  control={form.control}
                  name="name"
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
                  name="profession"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Short bio</FormLabel>
                      <FormControl>
                        <Input {...field} disabled={!editable} />
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
                  name="birthDate"
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
                  name="nidOrBirthCertId"
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
                  name="bankAccountNo"
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
                  name="education"
                  render={({ field }) => (
                    <FormItem className="col-span-2">
                      <FormLabel>Highest Completed Degree</FormLabel>
                      <FormControl>
                        <Input {...field} disabled={!editable} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="educationInstitute"
                  render={({ field }) => (
                    <FormItem className="col-span-2">
                      <FormLabel>Institution Name</FormLabel>
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

                {editable && (
                  <div className="col-span-2 flex justify-end">
                    <Button type="submit" className="px-6 cursor-pointer">
                      {isSaving ? "Saving..." : "Save Changes"}
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