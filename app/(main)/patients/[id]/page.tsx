"use client";
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { usage } from "@/app/data/data";
import { Textarea } from "@/app/components/Textarea";
import { useRouter } from 'next/navigation';
import { useSurgeryOrder } from '@/app/hooks/useSurgeryOrders';

const PatientDetailsPage = () => {
  const router = useRouter()
  const params = useParams()
  const surgeryOrderId = params.id as string

  const { data: surgeryOrder } = useSurgeryOrder(surgeryOrderId)
  console.log(surgeryOrder)
  return (
    <>
    <div className="flex justify-between gap-4 transition duration-300">
      <h1 className="title flex items-center gap-2">
        <div onClick={() => router.back()} className="transition  hover:bg-stone-100 hover:shadow-sm border-[.1px] border-transparent hover:border-stone-200 rounded-lg px-1 cursor-pointer">Surgery Orders</div>
        <div className="text-stone-500 font-medium"> {surgeryOrderId}</div>
      </h1>
    </div>
      <div className="mt-4 sm:mt-6 lg:mt-10">
      </div>
    </>
  );
};

export default PatientDetailsPage;