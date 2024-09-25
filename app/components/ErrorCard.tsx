interface ErrorProps {
  error: string
}

export default function ErrorCard({ error }: ErrorProps) {
  return (
    <div className="text-[0.8125rem] leading-[1.38462] flex items-center gap-[.375rem] w-full  rounded-md border px-2.5 py-2.5 shadow-sm outline-none transition sm:text-sm border-red-300 text-red-900  bg-red-50 ">
      <svg width="20" height="20" viewBox="0 0 23 22" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10.5 10.9961C10.5 11.5484 10.9477 11.9961 11.5 11.9961C12.0523 11.9961 12.5 11.5484 12.5 10.9961V6.99609C12.5 6.44379 12.0523 5.99609 11.5 5.99609C10.9477 5.99609 10.5 6.44379 10.5 6.99609V10.9961Z" fill="#ED0000"/>
        <path d="M11.5 14C10.9477 14 10.5 14.4477 10.5 15C10.5 15.5523 10.9477 16 11.5 16C12.0523 16 12.5 15.5523 12.5 15C12.5 14.4477 12.0523 14 11.5 14Z" fill="#ED0000"/>
        <circle cx="11.5" cy="11" r="10.25" stroke="#ED0000" strokeWidth="1.5"/>
      </svg>

      <div className="text-rose-600">{error}</div>
    </div>
  )
}
