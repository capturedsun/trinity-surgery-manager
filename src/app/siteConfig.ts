export const siteConfig = {
  name: "Dashboard",
  url: "https://dashboard.tremor.so",
  description: "The only dashboard you will ever need.",
  baseLinks: {
    home: "/",
    overview: "/overview",
    patients: "/patients",
    letter:"/letter",
    settings: {
      general: "/settings/general",
      billing: "/settings/billing",
      users: "/settings/users",
      status: "/settings/status",
    },
  },
}

export type siteConfig = typeof siteConfig
