import { Button } from "@/app/components/Button"
import { ArrowAnimated } from "@/app/components/ui/icons/ArrowAnimated"
import Link from "next/link"
import { DatabaseLogo } from "../public/DatabaseLogo"
import { siteConfig } from "@/app/siteConfig"

export default function NotFound() {
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <Link href={siteConfig.baseLinks.home}>
        <DatabaseLogo className="mt-6 h-10" />
      </Link>
      <p className="mt-6 text-4xl font-semibold text-indigo-600 sm:text-5xl ">
        404
      </p>
      <h1 className="mt-4 text-2xl font-semibold text-gray-900 ">
        Page not found
      </h1>
      <p className="mt-2 text-sm text-gray-600 ">
        Sorry, we couldn’t find the page you’re looking for.
      </p>
      <Button asChild className="group mt-8" variant="light">
        <Link href={siteConfig.baseLinks.home}>
          Go to the home page
          <ArrowAnimated
            className="stroke-gray-900 "
            aria-hidden="true"
          />
        </Link>
      </Button>
    </div>
  )
}
