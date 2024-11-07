"use client";
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { usage } from "@/app/data/data";
import { Textarea } from "@/app/components/Textarea";

const PatientDetailsPage = () => {
  const params = useParams()
  const surgeryOrderId = params.id as string

  return (
    <>
    <div className="flex justify-between gap-4">
      <h1 className="title">
        Surgery Order - {surgeryOrderId}
      </h1>
    </div>
      <div className="mt-4 sm:mt-6 lg:mt-10">
      </div>
    </>
  );
};

export default PatientDetailsPage;