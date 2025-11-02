export interface Company {
  slug: string
  name: string
  logo: string
  description: string
  bannerVideo?: string
  bannerImage?: string
  vehicles: Vehicle[]
  promotionalVideo?: string
}

export interface Vehicle {
  id: string
  name: string
  image: string
  range: number
  power: number
  price: number
  description: string
  isTopSelling?: boolean
  category: VehicleCategory
}

export type VehicleCategory = "sedan" | "suv" | "truck" | "sports" | "compact" | "luxury"

const companiesData: Company[] = [
  {
    slug: "tesla",
    name: "Tesla",
    logo: "/placeholder.svg?height=100&width=200",
    description:
      "Tesla is accelerating the world's transition to sustainable energy with electric vehicles, solar panels, and integrated renewable energy solutions.",
    bannerVideo: "/videos/vecteezy_technology-electric-car-transportation-futuristic_40459657.mp4",
    vehicles: [
      {
        id: "model-3",
        name: "Model 3",
        image: "https://images.unsplash.com/photo-1560958089-b8a1929cea89?q=80&w=600&auto=format&fit=crop",
        range: 358,
        power: 283,
        price: 4299000,
        description: "The Tesla Model 3 is an electric four-door sedan with 358 miles of range.",
        isTopSelling: true,
        category: "sedan",
      },
      {
        id: "model-y",
        name: "Model Y",
        image: "https://images.unsplash.com/photo-1619317594067-3c1a2932de97?q=80&w=600&auto=format&fit=crop",
        range: 330,
        power: 384,
        price: 4799000,
        description: "The Tesla Model Y is a compact SUV built on the Model 3 platform.",
        isTopSelling: true,
        category: "suv",
      },
      {
        id: "model-s",
        name: "Model S",
        image: "https://images.unsplash.com/photo-1536700503339-1e4b06520771?q=80&w=600&auto=format&fit=crop",
        range: 405,
        power: 670,
        price: 7499000,
        description: "The Tesla Model S is a premium electric sedan with impressive performance and range.",
        category: "luxury",
      },
      {
        id: "model-x",
        name: "Model X",
        image: "https://images.unsplash.com/photo-1566055909643-a51b4271d2bf?q=80&w=600&auto=format&fit=crop",
        range: 351,
        power: 670,
        price: 7999000,
        description: "The Tesla Model X is a luxury electric SUV with falcon-wing doors and seating for up to seven.",
        category: "luxury",
      },
    ],
    promotionalVideo: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Replace with a real video URL
  },
  {
    slug: "ford",
    name: "Ford",
    logo: "/placeholder.svg?height=100&width=200",
    description:
      "Ford is an American automaker that has been producing vehicles for over 100 years. The Mustang Mach-E is Ford's first all-electric SUV.",
    bannerImage: "https://images.unsplash.com/photo-1593941707882-a5bfb1060f0d?q=80&w=1200&auto=format&fit=crop",
    vehicles: [
      {
        id: "mustang-mach-e",
        name: "Mustang Mach-E",
        image: "https://images.unsplash.com/photo-1593941707216-203bea592e5a?q=80&w=600&auto=format&fit=crop",
        range: 314,
        power: 346,
        price: 4599500,
        description:
          "The Mustang Mach-E is an all-electric SUV from Ford. It combines the iconic Mustang design elements with modern electric vehicle technology.",
        isTopSelling: true,
        category: "suv",
      },
      {
        id: "f-150-lightning",
        name: "F-150 Lightning",
        image: "https://images.unsplash.com/photo-1647166545674-ce28ce93bdca?q=80&w=600&auto=format&fit=crop",
        range: 320,
        power: 452,
        price: 5599000,
        description:
          "The Ford F-150 Lightning is an all-electric pickup truck with impressive towing capacity and range.",
        category: "truck",
      },
    ],
  },
]

export async function getCompanyBySlug(slug: string): Promise<Company | undefined> {
  return companiesData.find((company) => company.slug === slug)
}

export async function getAllCompanies(): Promise<Company[]> {
  return companiesData
}

export function getCategoryLabel(category: VehicleCategory): string {
  const labels: Record<VehicleCategory, string> = {
    sedan: "Sedan",
    suv: "SUV",
    truck: "Truck",
    sports: "Sports",
    compact: "Compact",
    luxury: "Luxury",
  }
  return labels[category]
}
