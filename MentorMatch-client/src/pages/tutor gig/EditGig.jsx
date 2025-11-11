import React, { useEffect} from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { toast } from "sonner";
import { useNavigate, useParams } from "react-router";

import {
  PlusCircle,
  HelpCircle,
  Trash2,
  Sparkles,
  Calendar,
  Award,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import CreateGigsPlans from "../UserDashboard/Tutor/TutorDashboard/CreateGigsPlans";
import { useGetGigByIdQuery, useUpdateGigMutation } from "../../redux/features/mentor/mentor.api";
import { TagInput } from "../UserDashboard/Tutor/TutorDashboard/CreateGigs";


export default function EditGig() {
  const navigate = useNavigate();
  const { gigId } = useParams(); // route: /dashboard/mentor/gig-edit/:gigId

  const { data, isLoading: isFetching } = useGetGigByIdQuery(gigId);
  const [updateGig, { isLoading: isUpdating }] = useUpdateGigMutation();

  const {
    register,
    handleSubmit,
    control,
    reset,
    setValue,
    getValues,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      gigTitle: "",
      relatedTopics: [],
      aboutGig: "",
      services: [],
      keywords: [],
      plans: {
        instant: { price: 0, description: "", features: [] },
        weekly: {
          basic: { price: 0, description: "", features: [] },
          intensive: { price: 0, description: "", features: [] },
        },
        monthly: {
          standard: { price: 0, description: "", features: [] },
          premium: { price: 0, description: "", features: [] },
          elite: { price: 0, description: "", features: [] },
        },
      },
      faqs: [],
    },
  });

  // field arrays
  const relatedTopicsFA = useFieldArray({ control, name: "relatedTopics" });
  const keywordsFA = useFieldArray({ control, name: "keywords" });
  const servicesFA = useFieldArray({ control, name: "services" });
  const faqsFA = useFieldArray({ control, name: "faqs" });

  // populate form when gig data arrives
  useEffect(() => {
    if (data?.data) {
      const gig = data.data;

      reset({
        gigTitle: gig.gigTitle || "",
        aboutGig: gig.aboutGig || "",
        relatedTopics: gig.relatedTopics?.map((v) => ({ value: v })) || [],
        keywords: gig.keywords?.map((v) => ({ value: v })) || [],
        services: gig.services?.map((v) => ({ value: v })) || [],
        plans: gig.plans || {},
        faqs: gig.faqs || [],
      });
    }
  }, [data, reset]);

  // helpers for plan features
  const addFeatureToField = (fieldName, feature) => {
    const current = getValues(fieldName) || [];
    setValue(fieldName, [...current, feature]);
  };

  const removeFeatureFromField = (fieldName, index) => {
    const current = getValues(fieldName) || [];
    setValue(
      fieldName,
      current.filter((_, i) => i !== index)
    );
  };

  const onSubmit = async (formData) => {
    try {
      const payload = {
        ...formData,
        relatedTopics: formData.relatedTopics.map((t) => t.value),
        keywords: formData.keywords.map((k) => k.value),
        services: formData.services.map((s) => s.value),
      };

      await updateGig({ id: gigId, gigData: payload }).unwrap();
      toast.success("Gig updated successfully!");
      navigate("/dashboard/mentor/my-gigs");
    } catch (err) {
      toast.error(err?.data?.message || "Failed to update gig");
    }
  };

  if (isFetching)
    return <p className="text-center mt-10">Loading gig details...</p>;

  return (
    <div className="w-11/12 mx-auto min-h-screen bg-gradient-secondary pt-20 mb-8">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* Basic Info */}
        <Card>
          <CardHeader className="bg-gradient-primary rounded-t-lg">
            <CardTitle className="text-2xl font-bold text-primary">
              Edit Gig Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <Label className="font-bold">Title</Label>
              <Input {...register("gigTitle", { required: true })} />
            </div>

            <div className="space-y-4">
              <Label className="font-bold">About This Gig</Label>
              <Textarea {...register("aboutGig", { required: true })} />
            </div>

            {/* Related Topics */}
            <TagInput
              label="Related Topics"
              fieldArray={relatedTopicsFA.fields}
              append={relatedTopicsFA.append}
              remove={relatedTopicsFA.remove}
              placeholder="Add a topic"
              suggestions={["React", "Tailwind", "Next.js"]}
            />

            {/* Keywords */}
            <TagInput
              label="Keywords"
              fieldArray={keywordsFA.fields}
              append={keywordsFA.append}
              remove={keywordsFA.remove}
              placeholder="Add keyword"
              suggestions={["JavaScript", "Frontend", "UI"]}
            />
          </CardContent>
        </Card>

        {/* Services */}
        <Card>
          <CardHeader className="flex items-center justify-between">
            <CardTitle>Services</CardTitle>
            <Button
              type="button"
              variant="outline"
              onClick={() => servicesFA.append({ value: "" })}
            >
              <PlusCircle className="w-4 h-4 mr-2" /> Add
            </Button>
          </CardHeader>
          <CardContent className="space-y-3">
            {servicesFA.fields.length === 0 && (
              <p className="text-sm text-muted-foreground">
                No services added.
              </p>
            )}
            {servicesFA.fields.map((field, idx) => (
              <div key={field.id} className="flex items-center gap-2">
                <Input
                  {...register(`services.${idx}.value`, { required: true })}
                  placeholder={`Service ${idx + 1}`}
                />
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => servicesFA.remove(idx)}
                  className="text-destructive"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Plans */}
        <Card>
          <CardHeader>
            <CardTitle>Plans</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="instant">
              <TabsList className="grid grid-cols-3">
                <TabsTrigger value="instant">
                  <Sparkles className="h-4 w-4 mr-1" /> Instant
                </TabsTrigger>
                <TabsTrigger value="weekly">
                  <Calendar className="h-4 w-4 mr-1" /> Weekly
                </TabsTrigger>
                <TabsTrigger value="monthly">
                  <Award className="h-4 w-4 mr-1" /> Monthly
                </TabsTrigger>
              </TabsList>

              {/* Instant */}
              <TabsContent value="instant">
                <CreateGigsPlans
                  title="Instant Session"
                  planPath="plans.instant"
                  control={control}
                  register={register}
                  errors={errors}
                  watch={watch}
                  addFeature={addFeatureToField}
                  removeFeature={removeFeatureFromField}
                />
              </TabsContent>

              {/* Weekly */}
              <TabsContent value="weekly" className="space-y-6">
                {["basic", "intensive"].map((k) => (
                  <CreateGigsPlans
                    key={k}
                    title={`${k.charAt(0).toUpperCase() + k.slice(1)} Weekly`}
                    planPath={`plans.weekly.${k}`}
                    control={control}
                    register={register}
                    errors={errors}
                    watch={watch}
                    addFeature={addFeatureToField}
                    removeFeature={removeFeatureFromField}
                  />
                ))}
              </TabsContent>

              {/* Monthly */}
              <TabsContent value="monthly" className="space-y-6">
                {["standard", "premium", "elite"].map((k) => (
                  <CreateGigsPlans
                    key={k}
                    title={`${k.charAt(0).toUpperCase() + k.slice(1)} Monthly`}
                    planPath={`plans.monthly.${k}`}
                    control={control}
                    register={register}
                    errors={errors}
                    watch={watch}
                    addFeature={addFeatureToField}
                    removeFeature={removeFeatureFromField}
                  />
                ))}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* FAQs */}
        <Card>
          <CardHeader className="flex items-center justify-between">
            <CardTitle>FAQs</CardTitle>
            <Button
              type="button"
              variant="outline"
              onClick={() => faqsFA.append({ question: "", answer: "" })}
            >
              <PlusCircle className="h-4 w-4 mr-2" /> Add FAQ
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            {faqsFA.fields.map((field, idx) => (
              <div key={field.id} className="p-3 border rounded space-y-2">
                <Input
                  {...register(`faqs.${idx}.question`, { required: true })}
                  placeholder="Question"
                />
                <Textarea
                  {...register(`faqs.${idx}.answer`, { required: true })}
                  placeholder="Answer"
                />
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => faqsFA.remove(idx)}
                  className="text-destructive"
                >
                  <Trash2 className="h-4 w-4" /> Remove
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button type="submit" disabled={isUpdating}>
            {isUpdating ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </form>
    </div>
  );
}
