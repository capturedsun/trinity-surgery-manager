"use client"
import { Button } from "@/app/components/Button";
import { Input, Textarea } from "@/app/components/Input";

// import {
//   AlertDialog,
//   AlertDialogAction,
//   AlertDialogCancel,
//   AlertDialogContent,
//   AlertDialogDescription,
//   AlertDialogFooter,
//   AlertDialogHeader,
//   AlertDialogTitle,
//   AlertDialogTrigger,
// } from "@/app/components/ui/alert-dialog"

import { useState } from "react";
// import { useAppDispatch } from '../lib/hooks'
// import { addSurgeryItemToStore} from '../lib/features/surgery/surgerySlice';

const date = new Date();
const formattedDate = `${('0' + (date.getMonth() + 1)).slice(-2)}/${('0' + date.getDate()).slice(-2)}/${date.getFullYear().toString().slice(-2)}`;


const initialFormData = {
  date: formattedDate,
  patientName: '',
  DOB: '',
  surgeon: 'NILSSON, JOEL B',
  surgicalProcedure: '',
  lengthOfSurgery: '',
  classification: '',
  preOpDiagnosis: '',
  anesthesiaType: '',
  assist: '',
  preAdmissionTesting: '',
  facility: '',
  postSurgicalDME: '',
  suppliesAndSpecialEquipment: '',
  scheduled: '',
  auth: '',
  anest: '',
  assist_2: '',
  txt: '',
}

export function ManifestForm() {
  const [date, setDate] = useState<Date>()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState(initialFormData)

  const handleChange = (event: any) => {
    setFormData({
      ...formData,
      [event.target.id]: event.target.value,
    });
  }

  const submitSurgeryForm = () => {
    return
    setIsSubmitting(true)
    fetch('/api/surgeries/surgery_letter_completed', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    })
      .then(response => response.json())
      .then(res => {
        if (res.data.acknowledged) {
          const newSurgeryId = res.data.insertedId;

          setFormData(initialFormData)
          setIsSubmitting(false)
          // dispatch(addSurgeryItemToStore(newSurgeryId))
          //   .then(() => {
          //     toast({
          //       title: "Success",
          //       description: "Surgery form submitted successfully!",
          //     });
          //   })
        }
      })
      .catch(error => {
        console.error('Error fetching patient data:', error);
        setIsSubmitting(false)
      });
  }

  return (
    <div className=" relativemy-2 max-w-sm space-y-6">
      <div className="space-y-4 mt-4">
        <div className="space-y-2">
          <Input id="date" placeholder="Date" onChange={handleChange} value={formData.date} disabled={isSubmitting} />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Input id="patientName" placeholder="Patient name" value={formData.patientName} onChange={handleChange} disabled={isSubmitting} />
          </div>
          <div className="space-y-2">
            <Input id="DOB" placeholder="DOB" value={formData.DOB} onChange={handleChange} disabled={isSubmitting} />
          </div>
        </div>
        <div className="space-y-2">
          <Input id="surgeon" placeholder="Surgeon" value={formData.surgeon} onChange={handleChange} disabled={isSubmitting} />
        </div>
        <div className="space-y-2">
          <Textarea id="surgicalProcedure" placeholder="Surgical procedure" value={formData.surgicalProcedure} onChange={handleChange} disabled={isSubmitting} />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Input id="lengthOfSurgery" placeholder="Length of surgery" value={formData.lengthOfSurgery} onChange={handleChange} disabled={isSubmitting} />
          </div>
          <div className="space-y-2">
            <Input id="classification" placeholder="Classification" value={formData.classification} onChange={handleChange} disabled={isSubmitting} />
          </div>
        </div>
        <div className="space-y-2">
          <Textarea
            value={formData.preOpDiagnosis}
            id="preOpDiagnosis"
            placeholder="Pre-op Diagnosis"
            className="col-span-3"
            onChange={handleChange}
            disabled={isSubmitting}
          ></Textarea>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Input id="anesthesiaType" placeholder="Anesthesia type" value={formData.anesthesiaType} onChange={handleChange} disabled={isSubmitting} />
          </div>
          <div className="space-y-2">
            <Input id="assist" placeholder="Assist" value={formData.assist} onChange={handleChange} disabled={isSubmitting} />
          </div>
        </div>
        <div className="space-y-2">
          <Input id="preAdmissionTesting" placeholder="Pre-Admission Testing" value={formData.preAdmissionTesting} onChange={handleChange} disabled={isSubmitting} />
        </div>
        <div className="space-y-2">
          <Input id="facility" placeholder="Facility" value={formData.facility} onChange={handleChange} disabled={isSubmitting} />
        </div>
        <div className="space-y-2">
          <Input id="postSurgicalDME" placeholder="Post-Surgerical DME" value={formData.postSurgicalDME} onChange={handleChange} disabled={isSubmitting} />
        </div>
        <div className="space-y-2">
          <Textarea
            id="suppliesAndSpecialEquipment"
            placeholder="Supplies / Special Equipment"
            value={formData.suppliesAndSpecialEquipment}
            className="col-span-3"
            onChange={handleChange}
            disabled={isSubmitting}
          ></Textarea>
        </div>
        <div className="space-y-2">
          <Input id="scheduled" placeholder="SCHEDULED" value={formData.scheduled} onChange={handleChange} disabled={isSubmitting} />
        </div>
        <div className="space-y-2">
          <Input id="auth" placeholder="AUTH" value={formData.auth} onChange={handleChange} disabled={isSubmitting} />
        </div>
        <div className="space-y-2">
          <Input id="assist_2" placeholder="ASSIST" value={formData.assist_2} onChange={handleChange} disabled={isSubmitting} />
        </div>
        <div className="space-y-2">
          <Input id="anest" placeholder="ANEST" value={formData.anest} onChange={handleChange} disabled={isSubmitting} />
        </div>
        <div className="space-y-2">
          <Input id="txt" placeholder="TXT" value={formData.txt} onChange={handleChange} disabled={isSubmitting} />
        </div>
        <Button className="sm:py-1">
          Apply
        </Button>
      </div>
    </div>
  )
}

//   <AlertDialog>
//     {
//       !isSubmitting ? (
//         <AlertDialogTrigger className="button-main">Submit</AlertDialogTrigger>
//       ) : (
//       <Button disabled>
//           {/* <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//           Submitting Event */}
//       </Button>
//       )
//     }
//   <AlertDialogContent >
//     <AlertDialogHeader>
//       <AlertDialogTitle>Confirm details are correct</AlertDialogTitle>
//       <AlertDialogDescription>
//         This action cannot be reverted. A new surgery item will be created.
//       </AlertDialogDescription>
//     </AlertDialogHeader>
//     <AlertDialogFooter>
//       <AlertDialogCancel>Cancel</AlertDialogCancel>
//       <AlertDialogAction onClick={submitSurgeryForm}>Confirm</AlertDialogAction>
//     </AlertDialogFooter>
//   </AlertDialogContent>
// </AlertDialog>