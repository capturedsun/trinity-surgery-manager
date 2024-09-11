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

  const textareaStyle = {
    width: '100%',
    padding: '10px',
    border: 'none',
    borderBottom: '1px solid #FFFFFF33',
    outline: 'none',
    resize: 'none',
    boxShadow: 'none'
  };

  return (
    <div className="flex flex-col h-screen">
      <h1 className="text-2xl font-bold text-gray-900 sm:text-2xl dark:text-gray-50">
        {patientData.name}
      </h1>
      <p>DOB: {patientData.patientDob}</p>
      <p>Surgery: {patientData.surgery}</p>

      <div className="mt-10">
        <h1 className="text-xl font-bold mb-2 ml-2">Comments</h1>
        <Textarea
            onChange={(e) => setValue(e.target.value)}
            id="description"
            style={textareaStyle}
            placeholder="Start typing here..."
            rows={1}
            value={value}
          />

      </div>
    </div>
  );
};

export default PatientDetailsPage;