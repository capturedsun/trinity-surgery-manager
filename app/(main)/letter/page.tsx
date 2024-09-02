import { ManifestForm } from "@/app/components/ui/letter/ManifestForm"

export default function Letter() {
  return (
    <>
      <section aria-labelledby="current-billing-cycle">
        <h1
          id="current-billing-cycle"
          className="scroll-mt-10 text-lg font-semibold text-gray-900 sm:text-xl dark:text-gray-50"
        >
          Surgery Letter
        </h1>
        <ManifestForm />
      </section>
    </>
  )
}
