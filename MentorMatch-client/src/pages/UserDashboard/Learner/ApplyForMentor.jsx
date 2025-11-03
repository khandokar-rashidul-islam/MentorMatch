import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

// ✅ Validation schema
const formSchema = z.object({
    expertise: z.string().min(3, {
        message: "Please mention your expertise.",
    }),
    coverLetter: z.string().min(10, {
        message: "Cover letter must be at least 10 characters.",
    }),
    resume: z.any().optional(),
    certificates: z.array(z.any()).min(1, {
        message: "Please upload at least one academic/training certificate.",
    }),
    experiences: z.array(z.any()).optional(),
});

const ApplyForMentor = () => {
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            expertise: "",
            coverLetter: "",
            certificates: [],
            experiences: [],
        },
    });

    const [certificates, setCertificates] = useState([]);
    const [experiences, setExperiences] = useState([]);

    const onSubmit = (data) => {
        console.log("Form Data:", data);
        toast.success("🎉 Application submitted successfully!");
    };
    const handleFileChange = (e, setter, fieldName) => {
        if (e.target.files) {
            const newFiles = Array.from(e.target.files);
            setter((prev) => {
                const updated = [...prev, ...newFiles];
                form.setValue(fieldName, updated); // ✅ sync with RHF
                return updated;
            });
        }
    };

    const removeFile = (index, setter, fieldName) => {
        setter((prev) => {
            const updated = prev.filter((_, i) => i !== index);
            form.setValue(fieldName, updated); // ✅ sync with RHF
            return updated;
        });
    };
   // console.log("apply for mentor")

    return (
        <div className="py-20 min-h-screen w-11/12 md:w-9/12 lg:w-7/12 mx-auto">
            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-bold text-center mb-12 
        text-primary">
                Apply for Mentor
            </h1>

            {/* Form Container */}
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-8 bg-white dark:bg-secondary/30 
            p-8 md:p-10 rounded-2xl shadow-lg 
            border border-primary"
                >
                    {/* Resume Upload */}
                    <FormField
                        control={form.control}
                        name="resume"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-gray-800 dark:text-gray-200">
                                    Resume (Optional)
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        type="file"
                                        accept=".pdf,.doc,.docx"
                                        onChange={(e) => field.onChange(e.target.files?.[0])}
                                        className="file:bg-green-600 file:hover:bg-green-700 
                      file:text-white file:border-none file:px-4 
                      file:rounded-lg cursor-pointer
                      bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-600"
                                    />
                                </FormControl>
                                <FormDescription className="text-gray-500 dark:text-gray-400">
                                    Upload your latest resume in PDF/DOC format.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Certificates Upload (multiple) */}
                    <FormField
                        control={form.control}
                        name="certificates"
                        render={() => (
                            <FormItem>
                                <FormLabel className="text-gray-800 dark:text-gray-200">
                                    Academic / Training Certificates
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        type="file"
                                        accept=".pdf,.jpg,.png"
                                        multiple
                                        onChange={(e) => handleFileChange(e, setCertificates, "certificates")}
                                        className="file:bg-blue-600 file:hover:bg-blue-700 
            file:text-white file:border-none file:px-4 
            file:rounded-lg cursor-pointer
            bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-600"
                                    />
                                </FormControl>
                                <FormDescription className="text-gray-500 dark:text-gray-400">
                                    You can upload multiple certificates.
                                </FormDescription>

                                {/* Preview uploaded files */}
                                {certificates.length > 0 && (
                                    <ul className="mt-3 space-y-2 text-sm">
                                        {certificates.map((file, index) => (
                                            <li key={index} className="flex items-center justify-between bg-gray-100 dark:bg-gray-800 px-3 py-2 rounded-lg">
                                                <span className="truncate text-gray-800 dark:text-gray-200">{file.name}</span>
                                                <button
                                                    type="button"
                                                    onClick={() => removeFile(index, setCertificates, "certificates")}
                                                    className="text-red-500 hover:text-red-700"
                                                >
                                                    Remove
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                                <FormMessage /> {/* ✅ Now error messages will show */}
                            </FormItem>
                        )}
                    />


                    {/* Expertise */}
                    <FormField
                        control={form.control}
                        name="expertise"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-gray-800 dark:text-gray-200">
                                    Expertise
                                </FormLabel>
                                <FormControl>
                                    <Textarea
                                        placeholder="E.g. Web Development, Data Science, AI..."
                                        {...field}
                                        className="min-h-[50px] bg-gray-50 dark:bg-gray-800 
                      border-gray-300 dark:border-gray-600 
                      text-gray-900 dark:text-gray-100"
                                    />
                                </FormControl>
                                <FormDescription className="text-gray-500 dark:text-gray-400">
                                    Mention your primary areas of expertise.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Cover Letter */}
                    <FormField
                        control={form.control}
                        name="coverLetter"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-gray-800 dark:text-gray-200">
                                    Cover Letter
                                </FormLabel>
                                <FormControl>
                                    <Textarea
                                        placeholder="Why do you want to join as a mentor?"
                                        {...field}
                                        className="min-h-[100px] bg-gray-50 dark:bg-gray-800 
                      border-gray-300 dark:border-gray-600 
                      text-gray-900 dark:text-gray-100"
                                    />
                                </FormControl>
                                <FormDescription className="text-gray-500 dark:text-gray-400">
                                    Explain your motivation and goals.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Experience Certificates Upload (multiple) */}
                    <FormItem>
                        <FormLabel className="text-gray-800 dark:text-gray-200">
                            Experience Certificates (Optional)
                        </FormLabel>
                        <FormControl>
                            <Input
                                type="file"
                                accept=".pdf,.jpg,.png"
                                multiple
                                onChange={(e) => handleFileChange(e, setExperiences, "experiences")}
                                className="file:bg-purple-600 file:hover:bg-purple-700 
    file:text-white file:border-none file:px-4 
    file:rounded-lg cursor-pointer
    bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-600"
                            />

                        </FormControl>
                        <FormDescription className="text-gray-500 dark:text-gray-400">
                            You can upload multiple experience certificates.
                        </FormDescription>

                        {/* Preview uploaded experiences */}
                        {experiences.length > 0 && (
                            <ul className="mt-3 space-y-2 text-sm">
                                {experiences.map((file, index) => (
                                    <li
                                        key={index}
                                        className="flex items-center justify-between bg-gray-100 dark:bg-gray-800 px-3 py-2 rounded-lg"
                                    >
                                        <span className="truncate text-gray-800 dark:text-gray-200">
                                            {file.name}
                                        </span>
                                        <button
                                            type="button"
                                            onClick={() => removeFile(index, setCertificates, "certificates")}
                                            className="text-red-500 hover:text-red-700"
                                        >
                                            Remove
                                        </button>

                                    </li>
                                ))}
                            </ul>
                        )}
                    </FormItem>

                    {/* Submit Button */}
                    <div className="flex justify-center">
                        <Button
                            type="submit"
                            className="px-8 py-3 text-lg font-semibold 
                bg-green-600 hover:bg-green-700 
                text-white rounded-xl shadow-md"
                        >
                            Submit Application
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    );
};

export default ApplyForMentor;
