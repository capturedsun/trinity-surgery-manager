import { ManifestForm } from "@/app/components/ui/letter/ManifestForm"

export default function Letter() {
  return (
    <>
      <section aria-labelledby="current-billing-cycle">
        <h1
          id="current-billing-cycle"
          className="title"
        >
          Surgery Letter
        </h1>
        <ManifestForm />
      </section>
    </>
  )
}
