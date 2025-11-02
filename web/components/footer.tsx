import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Facebook, Instagram, Leaf, Twitter, Youtube } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-muted py-12 px-4 md:px-6 lg:px-8">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <Link href="/" className="flex items-center gap-2 font-bold text-xl mb-4">
              <Leaf className="h-5 w-5" />
              EV Hub Nepal
            </Link>
            <p className="text-muted-foreground mb-4">
              Your one-stop destination for everything electric vehicles in Nepal - from buying and selling to the
              latest news and trends.
            </p>
            <div className="flex gap-4">
              <Button variant="ghost" size="icon" asChild>
                <Link href="#" aria-label="Facebook">
                  <Facebook className="h-5 w-5" />
                </Link>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <Link href="#" aria-label="Twitter">
                  <Twitter className="h-5 w-5" />
                </Link>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <Link href="#" aria-label="Instagram">
                  <Instagram className="h-5 w-5" />
                </Link>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <Link href="#" aria-label="YouTube">
                  <Youtube className="h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/marketplace" className="text-muted-foreground hover:text-foreground transition-colors">
                  Marketplace
                </Link>
              </li>
              <li>
                <Link href="/new-vehicles" className="text-muted-foreground hover:text-foreground transition-colors">
                  New Vehicles
                </Link>
              </li>
              <li>
                <Link href="/rentals" className="text-muted-foreground hover:text-foreground transition-colors">
                  Rent an EV
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-muted-foreground hover:text-foreground transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/sell" className="text-muted-foreground hover:text-foreground transition-colors">
                  Sell Your EV
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-foreground transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-foreground transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href="/charging-stations"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Charging Stations
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/charging-guide" className="text-muted-foreground hover:text-foreground transition-colors">
                  Charging Guide
                </Link>
              </li>
              <li>
                <Link href="/incentives" className="text-muted-foreground hover:text-foreground transition-colors">
                  Tax Incentives
                </Link>
              </li>
              <li>
                <Link href="/maintenance" className="text-muted-foreground hover:text-foreground transition-colors">
                  Maintenance Tips
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-muted-foreground hover:text-foreground transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/glossary" className="text-muted-foreground hover:text-foreground transition-colors">
                  EV Glossary
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Subscribe</h3>
            <p className="text-muted-foreground mb-4">
              Stay updated with the latest EV news and exclusive offers in Nepal.
            </p>
            <div className="flex flex-col gap-2">
              <Input placeholder="Your email address" type="email" />
              <Button>Subscribe</Button>
            </div>
            <div className="mt-4 relative h-24 rounded-md overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1526494631344-8c6fa6462b17?q=80&w=400&auto=format&fit=crop"
                alt="Kathmandu, Nepal"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>

        <div className="border-t pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} EV Hub Nepal. All rights reserved.
          </p>
          <div className="flex gap-4 text-sm">
            <Link href="/privacy" className="text-muted-foreground hover:text-foreground transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-muted-foreground hover:text-foreground transition-colors">
              Terms of Service
            </Link>
            <Link href="/cookies" className="text-muted-foreground hover:text-foreground transition-colors">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
