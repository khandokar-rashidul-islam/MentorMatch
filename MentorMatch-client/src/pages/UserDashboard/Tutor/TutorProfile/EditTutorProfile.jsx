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
} from "lucide-react";

const defaultValues = {
  name: "Dr. Sarah Johnson",
  email: "sarah.johnson@mentormatch.com",
  phone: "+1 (555) 123-4567",
  location: "San Francisco, CA",
  specialization: "Computer Science & Mathematics",
  about:
    "Passionate educator with over 8 years of experience in computer science and mathematics. I specialize in making complex concepts accessible and engaging for students of all levels. My teaching philosophy focuses on building confidence through practical problem-solving and real-world applications.",
  skills: [
    "JavaScript",
    "Python",
    "React",
    "Node.js",
    "Machine Learning",
    "Data Structures",
    "Algorithms",
    "Mathematics",
    "Statistics",
    "Web Development",
  ],
  certifications: [
    {
      name: "Certified Computer Science Educator",
      organization: "IEEE Computer Society",
      year: "2023",
      credentialId: "CSE-2023-4567",
    },
    {
      name: "Machine Learning Professional Certificate",
      organization: "Stanford University",
      year: "2022",
      credentialId: "ML-PROF-2022-891",
    },
    {
      name: "Advanced Teaching Methods",
      organization: "Education Excellence Institute",
      year: "2021",
      credentialId: "ATM-2021-234",
    },
  ],
  education: [
    {
      degree: "Ph.D. in Computer Science",
      institution: "Stanford University",
      year: "2018",
      gpa: "3.9/4.0",
    },
    {
      degree: "M.S. in Computer Science",
      institution: "MIT",
      year: "2014",
      gpa: "3.8/4.0",
    },
    {
      degree: "B.S. in Computer Science & Mathematics",
      institution: "UC Berkeley",
      year: "2012",
      gpa: "3.9/4.0",
    },
  ],
  plans: {
    instant: {
      price: 25,
      description: "Quick problem-solving session",
      features: [
        "One-on-one session",
        "Immediate help",
        "30-60 minutes",
        "Screen sharing",
      ],
    },
    weekly: {
      basic: {
        price: 120,
        description: "Essential weekly support",
        features: [
          "2 sessions per week",
          "Homework help",
          "Progress tracking",
          "Email support",
        ],
      },
      intensive: {
        price: 200,
        description: "Comprehensive weekly program",
        features: [
          "4 sessions per week",
          "Custom study plan",
          "24/7 messaging",
          "Mock tests",
          "Video resources",
        ],
      },
    },
    monthly: {
      standard: {
        price: 450,
        description: "Complete monthly mentorship",
        features: [
          "8 sessions per month",
          "Personalized curriculum",
          "Progress reports",
          "Parent updates",
        ],
      },
      premium: {
        price: 750,
        description: "Premium monthly package",
        features: [
          "12 sessions per month",
          "Advanced projects",
          "Career guidance",
          "Certification prep",
          "Priority support",
        ],
      },
      elite: {
        price: 1200,
        description: "Elite comprehensive program",
        features: [
          "Unlimited sessions",
          "Personal study plan",
          "Interview prep",
          "Industry connections",
          "Guaranteed results",
          "24/7 priority support",
        ],
      },
    },
  },
  faqs: [
    {
      question: "How do I update my profile picture?",
      answer:
        "Click on the camera icon on your profile picture and select 'Upload New Photo'. We recommend using a square image of at least 400x400 pixels for the best quality.",
    },
    {
      question: "Can I edit my tutoring plans after publishing?",
      answer:
        "Yes, you can edit your tutoring plans at any time. Changes will be reflected immediately on your profile. However, existing bookings will maintain their original pricing.",
    },
    {
      question: "How many skills should I add to my profile?",
      answer:
        "We recommend adding 5-15 skills that best represent your expertise. Focus on the subjects and technologies you're most confident teaching.",
    },
    {
      question: "Are certifications required?",
      answer:
        "Certifications are not mandatory but highly recommended. They help build trust with students and can increase your booking rate significantly.",
    },
  ],
};

export default function EditTutorProfile() {
  const navigate = useNavigate();
  const {
    control,
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues,
  });

  // For skills, we'll use regular state since it's just strings
  const skills = watch("skills") || [];

  const addSkillToForm = (skill) => {
    if (skill.trim() && !skills.includes(skill.trim())) {
      setValue("skills", [...skills, skill.trim()]);
    }
  };

  const removeSkillFromForm = (index) => {
    setValue(
      "skills",
      skills.filter((_, i) => i !== index)
    );
  };

  const {
    fields: certificationFields,
    append: appendCertification,
    remove: removeCertification,
  } = useFieldArray({
    control,
    name: "certifications",
  });

  const {
    fields: educationFields,
    append: appendEducation,
    remove: removeEducation,
  } = useFieldArray({
    control,
    name: "education",
  });

  const {
    fields: faqFields,
    append: appendFaq,
    remove: removeFaq,
  } = useFieldArray({
    control,
    name: "faqs",
  });

  const watchedName = watch("name");

  const onSubmit = async (data) => {
    try {
      // In real app, this would make an API call
      console.log("Profile data:", data);

      // toast({
      //   title: "Profile Updated",
      //   description: "Your profile has been successfully updated.",
      // });

      navigate("/dashboard/mentor/mentor-profile/:id");
    } catch (error) {
      // toast({
      //   title: "Error",
      //   description: "Failed to update profile. Please try again.",
      //   variant: "destructive"
      // });
      console.log(error);
    }
  };

  const addFeatureToField = (path, feature) => {
    const currentFeatures = watch(path) || [];
    setValue(path, [...currentFeatures, feature]);
  };

  const removeFeatureFromField = (path, index) => {
    const currentFeatures = watch(path) || [];
    setValue(
      path,
      currentFeatures.filter((_, i) => i !== index)
    );
  };

  return (
    <div className="pt-28 w-11/12 mx-auto">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className=" space-y-6 animate-fade-in"
      >
        {/* Header Actions */}
        <div className="flex items-center justify-between flex-wrap gap-3">
          <NavLink to="/dashboard/mentor/mentor-profile/:id/edit">
            <Button
              type="button"
              variant="outline"
              //   onClick={() => navigate(`/dashboard/mentor/mentor-profile/${id}`)}
              onClick={() => navigate(-1)}
              className="hover:bg-muted"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Profile
            </Button>
          </NavLink>
          <Button
            type="submit"
            disabled={isSubmitting}
            className="gradient-primary hover:shadow-hover"
          >
            <Save className="h-4 w-4 mr-2" />
            {isSubmitting ? "Saving..." : "Save Changes"}
          </Button>
        </div>

        {/* Profile Picture Section */}
        <Card className="dashboard-card">
          <CardHeader>
            <CardTitle>Profile Picture</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-6 flex-wrap">
              <div className="relative">
                <Avatar className="h-24 w-24 ring-4 ring-primary/10">
                  <AvatarImage src="/placeholder.svg" alt="Profile" />
                  <AvatarFallback className="text-xl font-semibold bg-primary/10 text-primary">
                    {watchedName
                      ?.split(" ")
                      .map((n) => n[0])
                      .join("") || "U"}
                  </AvatarFallback>
                </Avatar>
                <Button
                  type="button"
                  size="icon"
                  className="absolute -bottom-1 -right-1 h-8 w-8 rounded-full gradient-primary"
                >
                  <Camera className="h-4 w-4" />
                </Button>
              </div>
              <div>
                <Button
                  type="button"
                  variant="outline"
                  className="hover:bg-muted"
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

        {/* Basic Information */}
        <Card className="dashboard-card">
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  {...register("name")}
                  className="bg-background"
                />
                {errors.name && (
                  <p className="text-sm text-destructive">
                    {errors.name.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  {...register("email")}
                  className="bg-background"
                />
                {errors.email && (
                  <p className="text-sm text-destructive">
                    {errors.email.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  {...register("phone")}
                  className="bg-background"
                />
                {errors.phone && (
                  <p className="text-sm text-destructive">
                    {errors.phone.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  {...register("location")}
                  className="bg-background"
                />
                {errors.location && (
                  <p className="text-sm text-destructive">
                    {errors.location.message}
                  </p>
                )}
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="specialization">Area of Specialization</Label>
              <Input
                id="specialization"
                {...register("specialization")}
                className="bg-background"
                placeholder="e.g., Computer Science & Mathematics, Physics & Engineering..."
              />
              {errors.specialization && (
                <p className="text-sm text-destructive">
                  {errors.specialization.message}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="about">About Me</Label>
              <Textarea
                id="about"
                {...register("about")}
                className="bg-background min-h-[120px]"
                placeholder="Tell students about your teaching style and experience..."
              />
              {errors.about && (
                <p className="text-sm text-destructive">
                  {errors.about.message}
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Skills Section */}
        <Card className="dashboard-card">
          <CardHeader>
            <CardTitle>Skills & Expertise</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Input
                placeholder="Add a skill..."
                className="bg-background"
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    const target = e.target;
                    addSkillToForm(target.value);
                    target.value = "";
                  }
                }}
              />
              <Button
                type="button"
                onClick={(e) => {
                  const input = e.target.parentElement?.querySelector("input");
                  if (input) {
                    addSkillToForm(input.value);
                    input.value = "";
                  }
                }}
                variant="outline"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
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
                    onClick={() => removeSkillFromForm(index)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              ))}
            </div>
            {errors.skills && (
              <p className="text-sm text-destructive">
                {errors.skills.message}
              </p>
            )}
          </CardContent>
        </Card>

        {/* Certifications Section */}
        <Card className="dashboard-card">
          <CardHeader>
            <div className="flex items-center justify-between gap-4 flex-wrap">
              <CardTitle>Certifications</CardTitle>
              <Button
                type="button"
                onClick={() =>
                  appendCertification({
                    name: "",
                    organization: "",
                    year: "",
                    credentialId: "",
                  })
                }
                variant="outline"
                size="sm"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Certification
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
                    onClick={() => removeCertification(index)}
                    className="text-destructive hover:bg-destructive/10"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <Label>Certification Name</Label>
                    <Input
                      {...register(`certifications.${index}.name`)}
                      className="bg-background"
                    />
                    {errors.certifications?.[index]?.name && (
                      <p className="text-sm text-destructive">
                        {errors.certifications[index]?.name?.message}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label>Organization</Label>
                    <Input
                      {...register(`certifications.${index}.organization`)}
                      className="bg-background"
                    />
                    {errors.certifications?.[index]?.organization && (
                      <p className="text-sm text-destructive">
                        {errors.certifications[index]?.organization?.message}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label>Year</Label>
                    <Input
                      {...register(`certifications.${index}.year`)}
                      className="bg-background"
                    />
                    {errors.certifications?.[index]?.year && (
                      <p className="text-sm text-destructive">
                        {errors.certifications[index]?.year?.message}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label>Credential ID</Label>
                    <Input
                      {...register(`certifications.${index}.credentialId`)}
                      className="bg-background"
                    />
                    {errors.certifications?.[index]?.credentialId && (
                      <p className="text-sm text-destructive">
                        {errors.certifications[index]?.credentialId?.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Education Section */}
        <Card className="dashboard-card">
          <CardHeader>
            <div className="flex items-center justify-between gap-4 flex-wrap">
              <CardTitle>Education Qualifications</CardTitle>
              <Button
                type="button"
                onClick={() =>
                  appendEducation({
                    degree: "",
                    institution: "",
                    year: "",
                    gpa: "",
                  })
                }
                variant="outline"
                size="sm"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Education
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
                      {...register(`education.${index}.degree`)}
                      className="bg-background"
                    />
                    {errors.education?.[index]?.degree && (
                      <p className="text-sm text-destructive">
                        {errors.education[index]?.degree?.message}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label>Institution</Label>
                    <Input
                      {...register(`education.${index}.institution`)}
                      className="bg-background"
                    />
                    {errors.education?.[index]?.institution && (
                      <p className="text-sm text-destructive">
                        {errors.education[index]?.institution?.message}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label>Year</Label>
                    <Input
                      {...register(`education.${index}.year`)}
                      className="bg-background"
                    />
                    {errors.education?.[index]?.year && (
                      <p className="text-sm text-destructive">
                        {errors.education[index]?.year?.message}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label>GPA</Label>
                    <Input
                      {...register(`education.${index}.gpa`)}
                      className="bg-background"
                    />
                    {errors.education?.[index]?.gpa && (
                      <p className="text-sm text-destructive">
                        {errors.education[index]?.gpa?.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Tutoring Plans Section */}
        <Card className="dashboard-card">
          <CardHeader>
            <CardTitle>Tutoring Plans</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Instant Plan */}
            <div className="p-4 bg-muted/30 rounded-lg border border-border/50 space-y-4">
              <h3 className="font-semibold text-lg text-primary">
                Instant Session
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Price ($)</Label>
                  <Controller
                    name="plans.instant.price"
                    control={control}
                    render={({ field }) => (
                      <Input
                        type="number"
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                        className="bg-background"
                      />
                    )}
                  />
                  {errors.plans?.instant?.price && (
                    <p className="text-sm text-destructive">
                      {errors.plans.instant.price.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label>Description</Label>
                  <Input
                    {...register("plans.instant.description")}
                    className="bg-background"
                  />
                  {errors.plans?.instant?.description && (
                    <p className="text-sm text-destructive">
                      {errors.plans.instant.description.message}
                    </p>
                  )}
                </div>
              </div>
              <div className="space-y-3">
                <Label>Features</Label>
                <div className="flex gap-2">
                  <Input
                    placeholder="Add a feature..."
                    className="bg-background"
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        const target = e.target;
                        if (target.value.trim()) {
                          addFeatureToField(
                            "plans.instant.features",
                            target.value
                          );
                          target.value = "";
                        }
                      }
                    }}
                  />
                  <Button
                    type="button"
                    onClick={(e) => {
                      const input =
                        e.target.parentElement?.querySelector("input");
                      if (input?.value.trim()) {
                        addFeatureToField(
                          "plans.instant.features",
                          input.value
                        );
                        input.value = "";
                      }
                    }}
                    variant="outline"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="space-y-2">
                  {watch("plans.instant.features")?.map((feature, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-2 bg-background rounded border"
                    >
                      <span className="text-sm">{feature}</span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() =>
                          removeFeatureFromField("plans.instant.features", idx)
                        }
                        className="text-destructive hover:bg-destructive/10"
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Weekly Plans */}
            <div className="space-y-4">
              <h3 className="font-semibold text-lg text-primary">
                Weekly Plans
              </h3>

              {/* Basic Weekly */}
              <div className="p-4 bg-muted/30 rounded-lg border border-border/50 space-y-4">
                <h4 className="font-medium">Basic Weekly</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Price ($)</Label>
                    <Controller
                      name="plans.weekly.basic.price"
                      control={control}
                      render={({ field }) => (
                        <Input
                          type="number"
                          {...field}
                          onChange={(e) =>
                            field.onChange(Number(e.target.value))
                          }
                          className="bg-background"
                        />
                      )}
                    />
                    {errors.plans?.weekly?.basic?.price && (
                      <p className="text-sm text-destructive">
                        {errors.plans.weekly.basic.price.message}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label>Description</Label>
                    <Input
                      {...register("plans.weekly.basic.description")}
                      className="bg-background"
                    />
                    {errors.plans?.weekly?.basic?.description && (
                      <p className="text-sm text-destructive">
                        {errors.plans.weekly.basic.description.message}
                      </p>
                    )}
                  </div>
                </div>
                {/* Features for Basic Weekly - similar pattern as instant */}
              </div>

              {/* Intensive Weekly */}
              <div className="p-4 bg-muted/30 rounded-lg border border-border/50 space-y-4">
                <h4 className="font-medium">Intensive Weekly</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Price ($)</Label>
                    <Controller
                      name="plans.weekly.intensive.price"
                      control={control}
                      render={({ field }) => (
                        <Input
                          type="number"
                          {...field}
                          onChange={(e) =>
                            field.onChange(Number(e.target.value))
                          }
                          className="bg-background"
                        />
                      )}
                    />
                    {errors.plans?.weekly?.intensive?.price && (
                      <p className="text-sm text-destructive">
                        {errors.plans.weekly.intensive.price.message}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label>Description</Label>
                    <Input
                      {...register("plans.weekly.intensive.description")}
                      className="bg-background"
                    />
                    {errors.plans?.weekly?.intensive?.description && (
                      <p className="text-sm text-destructive">
                        {errors.plans.weekly.intensive.description.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Monthly Plans */}
            <div className="space-y-4">
              <h3 className="font-semibold text-lg text-primary">
                Monthly Plans
              </h3>

              {["standard", "premium", "elite"].map((planKey) => (
                <div
                  key={planKey}
                  className="p-4 bg-muted/30 rounded-lg border border-border/50 space-y-4"
                >
                  <h4 className="font-medium capitalize">{planKey} Monthly</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Price ($)</Label>
                      <Controller
                        name={`plans.monthly.${planKey}.price`}
                        control={control}
                        render={({ field }) => (
                          <Input
                            type="number"
                            {...field}
                            onChange={(e) =>
                              field.onChange(Number(e.target.value))
                            }
                            className="bg-background"
                          />
                        )}
                      />
                      {errors.plans?.monthly?.[planKey]?.price && (
                        <p className="text-sm text-destructive">
                          {errors.plans.monthly[planKey]?.price?.message}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label>Description</Label>
                      <Input
                        {...register(`plans.monthly.${planKey}.description`)}
                        className="bg-background"
                      />
                      {errors.plans?.monthly?.[planKey]?.description && (
                        <p className="text-sm text-destructive">
                          {errors.plans.monthly[planKey]?.description?.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* FAQ Section */}
        <Card className="dashboard-card">
          <CardHeader>
            <div className="flex items-center justify-between gap-4 flex-wrap">
              <div className="flex items-center gap-2">
                <HelpCircle className="h-5 w-5 text-primary" />
                <CardTitle>Frequently Asked Questions</CardTitle>
              </div>
              <Button
                type="button"
                onClick={() => appendFaq({ question: "", answer: "" })}
                variant="outline"
                size="sm"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add FAQ
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
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
                      {...register(`faqs.${index}.question`)}
                      className="bg-background"
                      placeholder="Enter your frequently asked question..."
                    />
                    {errors.faqs?.[index]?.question && (
                      <p className="text-sm text-destructive">
                        {errors.faqs[index]?.question?.message}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label>Answer</Label>
                    <Textarea
                      {...register(`faqs.${index}.answer`)}
                      className="bg-background min-h-[80px]"
                      placeholder="Provide a helpful answer to this question..."
                    />
                    {errors.faqs?.[index]?.answer && (
                      <p className="text-sm text-destructive">
                        {errors.faqs[index]?.answer?.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
            {faqFields.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                <HelpCircle className="h-12 w-12 mx-auto mb-3 opacity-50" />
                <p>
                  No FAQs added yet. Click "Add FAQ" to create your first
                  question and answer.
                </p>
              </div>
            )}
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
            disabled={isSubmitting}
            className="gradient-primary hover:shadow-hover"
          >
            <Save className="h-4 w-4 mr-2" />
            {isSubmitting ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </form>
    </div>
  );
}
