import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Award } from "lucide-react";

const Certifications = ({ certifications }) => {
    return (
        <Card className="p-2 ">
            <div className="w-full py-10 px-4">
                <h2 className="text-lg font-bold  mb-8">Certifications</h2>

                <div className="grid gap-3 md:grid-cols-2 ">
                    {certifications?.map((cert) => (
                        <Card
                            key={cert._id}
                            className="rounded-2xl shadow-lg hover:shadow-2xl transition duration-300"
                        >
                            <CardHeader className="flex items-center space-x-3">
                                <div className="p-2 rounded-full border border-primary ">
                                    <Award className="w-4 h-4 text-primary" />
                                </div>
                                <CardTitle className="text-base font-semibold">
                                    {cert.name}
                                </CardTitle>
                            </CardHeader>

                            <CardContent className="text-muted-foreground text-sm">
                                <p className='flex gap-1 flex-wrap'>
                                    <span className="font-medium text-primary/50">Organization: </span>
                                    {cert.organization}
                                </p>
                                <p className='flex gap-1 flex-wrap'>
                                    <span className="font-medium  text-primary/50">Credential Id: </span>
                                    {cert.credentialId}
                                </p>
                                <p>
                                    <span className="font-medium  text-primary/50">Year: </span>
                                    {cert.year}
                                </p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </Card>
    )
}

export default Certifications