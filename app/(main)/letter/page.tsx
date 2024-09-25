import { ManifestForm } from "@/app/components/ui/letter/ManifestForm"
import Notice from "@/app/components/Notice"

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
        <Notice/>
      </section>
    </>
  )
}
