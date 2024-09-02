"use client";
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { usage } from "@/app/data/data"
import { Textarea } from "@/app/components/Textarea"

const PatientDetailsPage = () => {
  const { id } = useParams();
  const [patientData, setPatientData] = useState<any>(null);
  const [value, setValue] = useState("");
  // Simulate data fetching based on the id
  useEffect(() => {
    if (id) {
      console.log(usage)
      const matchedPatient = usage.find(patient => patient.referralNumber === id);
      setPatientData(matchedPatient);
    } else {
      console.error("there is no id")
    }
  }, [id]);

  if (!patientData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col h-screen">
      <h1 className="text-lg font-semibold text-gray-900 sm:text-xl dark:text-gray-50">
        {patientData.name}
      </h1>
      <p>DOB: {patientData.patientDob}</p>
      <p>Surgery: {patientData.surgery}</p>

      <div className="mt-10">
        <h1 className="text-2xl font-bold">Comments</h1>
        <Textarea
            onChange={(e) => setValue(e.target.value)}
            id="description"
            className="max-w-sm"
            placeholder="Start typing here..."
            rows={6}
            value={value}
          />

      </div>
    </div>
  );
};

export default PatientDetailsPage;