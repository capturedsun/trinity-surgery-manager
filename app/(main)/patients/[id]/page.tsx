"use client";
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { usage } from "@/app/data/data";
import { Textarea } from "@/app/components/Textarea";

interface Patient {
  referralNumber: string;
  name: string;
  patientDob: string;
  surgery: string;
}

const PatientDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const [patientData, setPatientData] = useState<Patient | null>(null);
  const [value, setValue] = useState<string>("");

  useEffect(() => {
    if (id) {
      const matchedPatient = usage.find(patient => patient.referralNumber === id);
      setPatientData(matchedPatient || null);
    } else {
      console.error("there is no id");
    }
  }, [id]);

  if (!patientData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col h-screen">
      <h1 className="text-2xl font-bold text-gray-900 sm:text-2xl ">
        {patientData.name}
      </h1>
      <p>DOB: {patientData.patientDob}</p>
      <p>Surgery: {patientData.surgery}</p>

      <div className="mt-10">
        <h1 className="text-xl font-bold mb-2 ml-2">Comments</h1>
        <Textarea
          onChange={(e) => setValue(e.target.value)}
          id="description"
          className="max-w-lg resize-none"
          placeholder="Start typing here..."
          rows={5}
          value={value}
        />
      </div>
    </div>
  );
};

export default PatientDetailsPage;