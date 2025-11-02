import Link from "next/link"
import Image from "next/image"
import { getAllCompanies } from "@/lib/companies"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export default async function CompaniesPage() {
  const companies = await getAllCompanies()

  return (
    <div className="container mx-auto py-12 px-4 md:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Electric Vehicle Manufacturers</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Explore the leading electric vehicle manufacturers and their latest models
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {companies.map((company) => (
          <Link key={company.slug} href={`/companies/${company.slug}`} className="block group">
            <div className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 h-full flex flex-col">
              <div className="relative h-48 bg-gray-100">
                {company.bannerImage ? (
                  <Image
                    src={company.bannerImage || "/placeholder.svg"}
                    alt={company.name}
                    fill
                    className="object-cover object-center"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <Image
                      src={company.logo || "/placeholder.svg"}
                      alt={company.name}
                      width={160}
                      height={80}
                      className="object-contain p-4"
                    />
                  </div>
                )}
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-semibold">{company.name}</h2>
                  <span className="text-sm text-muted-foreground">{company.vehicles.length} models</span>
                </div>
                <p className="text-muted-foreground mb-6 flex-grow line-clamp-3">{company.description}</p>
                <Button className="w-full group-hover:bg-primary/90 transition-colors">
                  <span>View Details</span>
                  <ArrowRight size={16} className="ml-2" />
                </Button>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
