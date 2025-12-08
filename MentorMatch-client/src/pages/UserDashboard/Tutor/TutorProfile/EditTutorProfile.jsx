import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { NavLink, useNavigate } from "react-router";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import {
  Save,
  ArrowLeft,
  Upload,
  X,
  Plus,
  Trash2,
  Camera,
  HelpCircle,
  PlusCircleIcon,
} from "lucide-react";
import {
  useEditActiveProfileMutation,
  useGetActiveProfileQuery,
} from "../../../../redux/features/user/userApi";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import EditPlan from "./EditPlan";

export default function EditTutorProfile() {
  const navigate = useNavigate();

  // fetch old data
  const { data, isLoading } = useGetActiveProfileQuery();
  const profile = data?.data?.user?.profile;

  // mutation
  const [editProfile, { isLoading: isSaving }] = useEditActiveProfileMutation();

  // local preview state for image
  const [previewImage, setPreviewImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  const WEEK_DAYS = [
  "Saturday",
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
 ];

  const {
    control,
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      phone: "",
      birthDate: "",
      nidOrBirthCertId: "",
      bankAccountNo: "",
      gender: "",
      address: "",
      education: "",
      educationInstitute: "",
      profession: "",
      expertiseAreas: [],
      bio: "",
      experienceYears: "",
      about: "",
      skills: [],
      certifications: [],
      availability: [],
      educationDetails: [],
      plans: {
        instant: {
          price: 0,
          description: "",
          durationSessions: 0,
          durationPerSessionMinutes: 0,
          features: [],
        },
        weekly: {
          basic: {
            price: 0,
            description: "",
            durationSessions: 0,
            durationPerSessionMinutes: 0,
            features: [],
          },
          intensive: {
            price: 0,
            description: "",
            durationSessions: 0,
            durationPerSessionMinutes: 0,
            features: [],
          },
        },
        monthly: {
          standard: {
            price: 0,
            description: "",
            durationSessions: 0,
            durationPerSessionMinutes: 0,
            features: [],
          },
          premium: {
            price: 0,
            description: "",
            durationSessions: 0,
            durationPerSessionMinutes: 0,
            features: [],
          },
          elite: {
            price: 0,
            description: "",
            durationSessions: 0,
            durationPerSessionMinutes: 0,
            features: [],
          },
        },
      },
      faqs: [],
    },
  });

  // hydrate form with old data
  useEffect(() => {
    if (profile) {
      reset(profile);
      setPreviewImage(profile.profileImage);
    }
  }, [profile, reset]);


//skills
const skills = watch("skills") || [];

const addSkill = (value) => {
  if (value && !skills.includes(value)) {
    setValue("skills", [...skills, value], { shouldValidate: true });
  }
};

const removeSkill = (index) => {
  const updated = [...skills];
  updated.splice(index, 1);
  setValue("skills", updated, { shouldValidate: true });
};

  // dynamic fields

  const {
    fields: certificationFields,
    append: addCert,
    remove: removeCert,
  } = useFieldArray({ control, name: "certifications" });

  const {
    fields: educationFields,
    append: addEducation,
    remove: removeEducation,
  } = useFieldArray({ control, name: "educationDetails" });

  const {
    fields: faqFields,
    append: addFaq,
    remove: removeFaq,
  } = useFieldArray({ control, name: "faqs" });

const {
  fields: availabilityFields,
  append: addAvailability,
  remove: removeAvailability,
} = useFieldArray({
  control,
  name: "availability",
});

  // image handling
  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const watchedName = watch("name");

  // Add feature to a field
  const addFeatureToField = (fieldName, feature) => {
    const current = getValues(fieldName) || [];
    setValue(fieldName, [...current, feature], {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  // Remove feature from a field
  const removeFeatureFromField = (fieldName, index) => {
    const current = getValues(fieldName) || [];
    const updated = current.filter((_, i) => i !== index);
    setValue(fieldName, updated, { shouldValidate: true, shouldDirty: true });
  };

  const onSubmit = async (formData) => {
    try {
      const body = new FormData();

      // attach JSON fields
      body.append("data", JSON.stringify(formData));

      // attach image if changed
      if (imageFile) {
        body.append("profileImage", imageFile);
      }

      await editProfile(body).unwrap();

      toast.success("Profile updated successfully");
      navigate("/dashboard/mentor/mentor-profile");
    } catch (err) {
      toast.error("Failed to update profile");
      console.error(err);
    }
  };

  if (isLoading) return <p>Loading profile...</p>;
  return (
    <div className="pt-28 w-11/12 mx-auto mb-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className=" space-y-6 animate-fade-in"
      >
        {/*-------------------Header Actions------------------------------ */}
        <div className="flex items-center justify-between flex-wrap gap-3">
          <NavLink to="/dashboard/mentor/mentor-profile/:id/edit">
            <Button
              type="button"
              variant="outline"
              // onClick={() => navigate(`/dashboard/mentor/mentor-profile`)}
              onClick={() => navigate(-1)}
              className="hover:bg-muted"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Profile
            </Button>
          </NavLink>
          <Button
            type="submit"
            disabled={isSaving}
            className="gradient-primary hover:shadow-hover"
          >
            <Save className="h-4 w-4 mr-2" />
            {isSaving ? "Saving..." : "Save Changes"}
          </Button>
        </div>

        {/*-------------------- Profile Picture Section -----------------*/}

        <Card className="dashboard-card">
          <CardHeader>
            <CardTitle className="text-primary font-bold text-2xl">
              Profile Picture
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-6 flex-wrap">
              <div className="relative">
                <Avatar className="h-24 w-24 ring-4 ring-primary/10">
                  <AvatarImage
                    src={
                      previewImage ||
                      profile?.profileImage ||
                      "/placeholder.svg"
                    }
                    alt="Profile"
                  />
                  <AvatarFallback className="text-xl font-semibold bg-primary/10 text-primary">
                    {watchedName
                      ?.split(" ")
                      .map((n) => n[0])
                      .join("") || "U"}
                  </AvatarFallback>
                </Avatar>

                {/* Camera button triggers file input click */}
                <input
                  type="file"
                  accept="image/*"
                  id="profileImageInput"
                  className="hidden"
                  onChange={handleImageChange}
                />
                <Button
                  type="button"
                  size="icon"
                  className="absolute -bottom-1 -right-1 h-8 w-8 rounded-full gradient-primary"
                  onClick={() =>
                    document.getElementById("profileImageInput").click()
                  }
                >
                  <Camera className="h-4 w-4" />
                </Button>
              </div>
              <div>
                <Button
                  type="button"
                  variant="outline"
                  className="hover:bg-muted"
                  onClick={() =>
                    document.getElementById("profileImageInput").click()
                  }
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Upload New Photo
                </Button>
                <p className="text-sm text-muted-foreground mt-2">
                  Recommended: Square image, at least 400x400px
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/*--------------- Basic Information -------------------*/}
        <Card className="dashboard-card">
          <CardHeader>
            <CardTitle className="text-primary font-bold text-2xl">
              Basic Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { id: "name", label: "Full Name", type: "text" },
                { id: "phone", label: "Phone", type: "text" },
                { id: "birthDate", label: "Birthdate", type: "date" },
                {
                  id: "nidOrBirthCertId",
                  label: "N_ID/Birth_ID",
                  type: "text",
                },
                {
                  id: "bankAccountNo",
                  label: "Bank Account No.",
                  type: "text",
                },
                { id: "gender", label: "Gender", type: "text" },
                { id: "address", label: "Address", type: "text" },
                {
                  id: "education",
                  label: "Highest education",
                  type: "text",
                },
                {
                  id: "educationInstitute",
                  label: "Education Institute",
                  type: "text",
                },
                { id: "profession", label: "Profession", type: "text" },
              ].map((field) => (
                <div key={field.id} className="space-y-2">
                  <Label htmlFor={field.id}>{field.label}</Label>
                  <Input
                    id={field.id}
                    type={field.type}
                    {...register(field.id)}
                    className="bg-background"
                  />
                  {errors[field.id] && (
                    <p className="text-sm text-destructive">
                      {errors[field.id].message}
                    </p>
                  )}
                </div>
              ))}
            </div>
            <div className="space-y-2">
              <Label htmlFor="expertiseAreas">Area of Specialization</Label>
              <Input
                id="expertiseAreas"
                {...register("expertiseAreas", {
                  setValueAs: (val) => {
                    if (typeof val === "string") {
                      return val
                        .split(",")
                        .map((s) => s.trim())
                        .filter(Boolean); // return array
                    }
                    return Array.isArray(val) ? val : []; // fallback if val is already array or undefined
                  },
                })}
                placeholder="e.g., Math, Physics, Web Development..."
                className="bg-background"
              />
              {errors.expertiseAreas && (
                <p className="text-sm text-destructive">
                  {errors.expertiseAreas.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio">About Me</Label>
              <Textarea
                id="bio"
                {...register("bio")}
                placeholder="Tell students about your teaching style and experience..."
                className="bg-background min-h-[120px]"
              />
              {errors.bio && (
                <p className="text-sm text-destructive">{errors.bio.message}</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/*------------------ Skills and Expertise Section------------------------ */}
        <Card className="dashboard-card">
          <CardHeader>
            <CardTitle className="text-primary font-bold text-2xl">
              Skills & Expertise
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Input
                placeholder="Add a skill..."
                className="bg-background"
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    const value = e.target.value.trim();
                    if (value) {
                      addSkill(value);
                      e.target.value = "";
                    }
                  }
                }}
              />
              <Button
                type="button"
                variant="outline"
                onClick={(e) => {
                  const input = e.target.parentElement.querySelector("input");
                  const value = input?.value.trim();
                  if (value) {
                    addSkill(value);
                    input.value = "";
                  }
                }}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>

            {/* Skill badges */}
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="bg-primary/10 text-primary hover:bg-primary/20 transition-colors pr-1"
                >
                  {skill}
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="h-4 w-4 p-0 ml-1 hover:bg-destructive/20"
                    onClick={() => removeSkill(index)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              ))}
            </div>

            {/* Error message */}
            {errors.skills && (
              <p className="text-sm text-destructive mt-1">
                {errors.skills.message}
              </p>
            )}
          </CardContent>
        </Card>

        {/*------------------------- Certifications Section-------------------- */}
        <Card className="dashboard-card">
          <CardHeader>
            <div className="flex items-center justify-between gap-4 flex-wrap">
              <CardTitle className="text-primary font-bold text-2xl">
                Certifications
              </CardTitle>
              <Button
                type="button"
                onClick={() =>
                  addCert({
                    name: "",
                    organization: "",
                    year: "",
                    credentialId: "",
                  })
                }
                variant="outline"
                size="sm"
              >
                <Plus className="h-4 w-4 mr-2" /> Add Certification
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {certificationFields.map((field, index) => (
              <div
                key={field.id}
                className="p-4 bg-muted/30 rounded-lg border border-border/50 space-y-3"
              >
                <div className="flex justify-between items-start">
                  <h3 className="font-medium">Certification {index + 1}</h3>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeCert(index)}
                    className="text-destructive hover:bg-destructive/10"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <Label>Certification Name</Label>
                    <Input
                      {...register(`certifications.${index}.name`, {
                        required: "Name is required",
                      })}
                      className="bg-background"
                    />
                    {errors.certifications?.[index]?.name && (
                      <p className="text-sm text-destructive">
                        {errors.certifications[index].name.message}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label>Organization</Label>
                    <Input
                      {...register(`certifications.${index}.organization`, {
                        required: "Organization is required",
                      })}
                      className="bg-background"
                    />
                    {errors.certifications?.[index]?.organization && (
                      <p className="text-sm text-destructive">
                        {errors.certifications[index].organization.message}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label>Year</Label>
                    <Input
                      {...register(`certifications.${index}.year`, {
                        required: "Year is required",
                      })}
                      className="bg-background"
                    />
                    {errors.certifications?.[index]?.year && (
                      <p className="text-sm text-destructive">
                        {errors.certifications[index].year.message}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label>Credential ID</Label>
                    <Input
                      {...register(`certifications.${index}.credentialId`, {
                        required: "Credential ID is required",
                      })}
                      className="bg-background"
                    />
                    {errors.certifications?.[index]?.credentialId && (
                      <p className="text-sm text-destructive">
                        {errors.certifications[index].credentialId.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/*-------------------------- Education Section -------------------------*/}
        <Card className="dashboard-card">
          <CardHeader>
            <div className="flex items-center justify-between gap-4 flex-wrap">
              <CardTitle className="text-primary font-bold text-2xl">
                Education Details
              </CardTitle>
              <Button
                type="button"
                onClick={() =>
                  addEducation({
                    degree: "",
                    institution: "",
                    year: "",
                    gpa: "",
                  })
                }
                variant="outline"
                size="sm"
              >
                <Plus className="h-4 w-4 mr-2" /> Add Education
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {educationFields.map((field, index) => (
              <div
                key={field.id}
                className="p-4 bg-muted/30 rounded-lg border border-border/50 space-y-3"
              >
                <div className="flex justify-between items-start">
                  <h3 className="font-medium">Education {index + 1}</h3>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeEducation(index)}
                    className="text-destructive hover:bg-destructive/10"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <Label>Degree</Label>
                    <Input
                      {...register(`educationDetails.${index}.degree`, {
                        required: "Degree is required",
                      })}
                      className="bg-background"
                    />
                    {errors.educationDetails?.[index]?.degree && (
                      <p className="text-sm text-destructive">
                        {errors.educationDetails[index].degree.message}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label>Institution</Label>
                    <Input
                      {...register(`educationDetails.${index}.institution`, {
                        required: "Institution is required",
                      })}
                      className="bg-background"
                    />
                    {errors.educationDetails?.[index]?.institution && (
                      <p className="text-sm text-destructive">
                        {errors.educationDetails[index].institution.message}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label>Year</Label>
                    <Input
                      {...register(`educationDetails.${index}.year`, {
                        required: "Year is required",
                      })}
                      className="bg-background"
                    />
                    {errors.educationDetails?.[index]?.year && (
                      <p className="text-sm text-destructive">
                        {errors.educationDetails[index].year.message}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label>GPA</Label>
                    <Input
                      {...register(`educationDetails.${index}.gpa`, {
                        required: "GPA is required",
                      })}
                      className="bg-background"
                    />
                    {errors.educationDetails?.[index]?.gpa && (
                      <p className="text-sm text-destructive">
                        {errors.educationDetails[index].gpa.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
        {/* ----------------- Weekly Availability ----------------- */}
        <Card className="dashboard-card">
          <CardHeader>
            <CardTitle className="text-primary font-bold text-2xl">
              Weekly Availability
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            {/* Render Rows */}
            {availabilityFields.map((field, index) => (
              <div
                key={field.id}
                className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center border p-4 rounded-lg"
              >
                {/* Day Dropdown */}
                <div className="space-y-3">
                  <Label>Day</Label>
                  <select
                    {...register(`availability.${index}.day`)}
                    className="border bg-muted/30 rounded-md px-3 py-1.5 w-full"
                  >
                    <option value="">Select day</option>

                    {WEEK_DAYS.map((day) => (
                      <option
                        key={day}
                        value={day}
                        disabled={
                          // Prevent selecting a day already used (except current row)
                          availabilityFields
                            .filter((_, i) => i !== index)
                            .some((s) => s.day === day)
                        }
                      >
                        {day}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Time Input */}
                <div className="space-y-3 ">
                  <Label>Time</Label>
                  <Input
                    {...register(`availability.${index}.time`)}
                    className="bg-background"
                    placeholder="9:00 AM - 6:00 PM"
                  />
                </div>

                {/* Delete Row */}
                <div className="flex justify-end">
                  <Button
                    type="button"
                    variant="destructive"
                    onClick={() => removeAvailability(index)}
                  >
                    Remove
                  </Button>
                </div>
              </div>
            ))}

            {/* Add Button */}
            <Button
              type="button"
              variant="outline"
              className="w-full"
              disabled={availabilityFields.length >= 7}
              onClick={() => {
                const usedDays = availabilityFields.map((s) => s.day);
                const nextDay =
                  WEEK_DAYS.find((d) => !usedDays.includes(d)) || "";

                addAvailability({
                  day: nextDay,
                  time: "",
                });
              }}
            >
              <PlusCircleIcon /> Add Day
            </Button>
          </CardContent>
        </Card>
        {/*----------- Tutoring Plans Section -------------------------------------*/}
        <Card className="dashboard-card">
          <CardHeader>
            <CardTitle className="text-primary font-bold text-2xl">
              Tutoring Plans
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* --- Instant Plan --- */}
            <div className="space-y-4">
              <h3 className="font-semibold text-primary">Instant Plans</h3>
              <EditPlan
                title="Instant Session"
                planPath="plans.instant"
                control={control}
                register={register}
                errors={errors}
                watch={watch}
                addFeature={addFeatureToField}
                removeFeature={removeFeatureFromField}
              />
            </div>
            {/* --- Weekly Plans --- */}
            <div className="space-y-4">
              <h3 className="font-semibold text-primary">Weekly Plans</h3>

              {["basic", "intensive"].map((key) => (
                <EditPlan
                  key={key}
                  title={key.charAt(0).toUpperCase() + key.slice(1) + " Weekly"}
                  planPath={`plans.weekly.${key}`}
                  control={control}
                  register={register}
                  errors={errors}
                  watch={watch}
                  addFeature={addFeatureToField}
                  removeFeature={removeFeatureFromField}
                />
              ))}
            </div>

            {/* --- Monthly Plans --- */}
            <div className="space-y-4">
              <h3 className="font-semibold text-primary">Monthly Plans</h3>
              {["standard", "premium", "elite"].map((key) => (
                <EditPlan
                  key={key}
                  title={
                    key.charAt(0).toUpperCase() + key.slice(1) + " Monthly"
                  }
                  planPath={`plans.monthly.${key}`}
                  control={control}
                  register={register}
                  errors={errors}
                  watch={watch}
                  addFeature={addFeatureToField}
                  removeFeature={removeFeatureFromField}
                />
              ))}
            </div>
          </CardContent>
        </Card>

        {/*----------------------- FAQ Section -----------------------------------------*/}
        <Card className="dashboard-card">
          <CardHeader>
            <div className="flex items-center justify-between gap-4 flex-wrap">
              <div className="flex items-center gap-2">
                <HelpCircle className="h-5 w-5 text-primary" />
                <CardTitle className="text-primary font-bold text-2xl">
                  Frequently Asked Questions
                </CardTitle>
              </div>
              <Button
                type="button"
                onClick={() => addFaq({ question: "", answer: "" })}
                variant="outline"
                size="sm"
              >
                <Plus className="h-4 w-4 mr-2" /> Add FAQ
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {faqFields.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                <HelpCircle className="h-12 w-12 mx-auto mb-3 opacity-50" />
                <p>
                  No FAQs added yet. Click "Add FAQ" to create your first
                  question and answer.
                </p>
              </div>
            )}
            {faqFields.map((field, index) => (
              <div
                key={field.id}
                className="p-4 bg-muted/30 rounded-lg border border-border/50 space-y-3"
              >
                <div className="flex justify-between items-start">
                  <h3 className="font-medium">FAQ {index + 1}</h3>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeFaq(index)}
                    className="text-destructive hover:bg-destructive/10"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                <div className="space-y-3">
                  <div className="space-y-2">
                    <Label>Question</Label>
                    <Input
                      {...register(`faqs.${index}.question`, {
                        required: "Question is required",
                      })}
                      className="bg-background"
                      placeholder="Enter your frequently asked question..."
                    />
                    {errors.faqs?.[index]?.question && (
                      <p className="text-sm text-destructive">
                        {errors.faqs[index].question.message}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label>Answer</Label>
                    <Textarea
                      {...register(`faqs.${index}.answer`, {
                        required: "Answer is required",
                      })}
                      className="bg-background min-h-[80px]"
                      placeholder="Provide a helpful answer..."
                    />
                    {errors.faqs?.[index]?.answer && (
                      <p className="text-sm text-destructive">
                        {errors.faqs[index].answer.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Save Actions */}
        <div className="flex items-center justify-end gap-3 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate("/profile")}
            className="hover:bg-muted"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={isSaving}
            className="gradient-primary hover:shadow-hover"
          >
            <Save className="h-4 w-4 mr-2" />
            {isSaving ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </form>
    </div>
  );
}
