"use client";
import { Button } from '@/app/components/Button';
import { Textarea } from '@/app/components/Textarea';
import { ActivityBlock } from '@/app/components/ui/surgery-order/ActivityBlock';
import { useCreateSurgeryOrderActivity, useSurgeryOrderActivity } from '@/app/hooks/useSurgeryOrderActivity';
import { useSurgeryOrder } from '@/app/hooks/useSurgeryOrders';
import { useUser } from '@/app/hooks/useUser';
import { SurgeryOrderActivity } from '@/src/entities/models/surgery-order-activity';
import { User } from '@/src/entities/models/user';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';

function handleSubmitComment(comment: string, user: User, orderId: string) {
  const newActivity: Partial<SurgeryOrderActivity> = {
    activity_type: 'comment',
    new_value: comment,
    created_by_user_id: user.id,
    surgery_order_id: orderId,
    created_by_user_name: user.first_name + ' ' + user.last_name
  };
  return newActivity
}

const PatientDetailsPage = () => {
  const [comment, setComment] = useState('')
  const router = useRouter()
  const params = useParams()
  const surgeryOrderId = params.id as string

  const { data: surgeryOrder } = useSurgeryOrder(surgeryOrderId)
  const { data: surgeryOrderActivity } = useSurgeryOrderActivity(surgeryOrderId)
  const { data: user } = useUser()
  const createSurgeryOrderActivity = useCreateSurgeryOrderActivity({
    onSuccess: (data) => {
      console.log('Activity created successfully:', data)
    },
    onError: (error) => {
      console.error('Error creating activity:', error)
    }
  })

  return (
    <>
      <div className="flex justify-between gap-4 transition duration-300">
        <h1 className="title flex items-center gap-2">
          <div onClick={() => router.back()} className="transition hover:bg-stone-100 hover:shadow-sm border-[.1px] border-transparent hover:border-stone-200 rounded-lg px-1 cursor-pointer">
            Surgery Orders
          </div>
          <div className="text-stone-500 font-medium">{surgeryOrder?.patient_name}</div>
        </h1>
      </div>
      <div className="h-full flex flex-col">
        {surgeryOrder?.created_at ? (
          <ActivityBlock>
            {new Date(surgeryOrder.created_at.toString()).toLocaleString()} - Surgery order created
          </ActivityBlock>
        ) : (
          <ActivityBlock className="animate-pulse">
            Loading...
          </ActivityBlock>
        )}
        <form className="mt-4" onSubmit={(e) => {
          e.preventDefault()
          if (user && comment) {
            createSurgeryOrderActivity(handleSubmitComment(comment, user, surgeryOrderId))
          }
        }}>
          <Textarea
            className="w-full p-2 border border-stone-300 rounded-lg"
            placeholder="Add your comments here..."
            rows={4}
            name="comments"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <Button
            className="mt-4"
            disabled={!user || !comment}
            variant="primary"
            type="submit"
          >
            Comment
          </Button>
        </form>
      </div>
    </>
  );
};

export default PatientDetailsPage;