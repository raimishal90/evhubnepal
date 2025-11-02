import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Leaf, Mail, MapPin, Phone, Users, Zap } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="container mx-auto py-8 px-4 md:px-6 lg:px-8">
      {/* Hero Section */}
      <section className="relative w-full h-[400px] rounded-xl overflow-hidden mb-12">
        <Image
          src="/placeholder.svg?height=800&width=1600"
          alt="EV Hub Team"
          fill
          className="object-cover brightness-75"
        />
        <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
          <Badge className="mb-2 w-fit">About Us</Badge>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Driving the Electric Revolution</h1>
          <p className="text-white/90 mb-4 max-w-2xl">
            We're on a mission to accelerate the world's transition to sustainable transportation through electric
            vehicles.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="mb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6">Our Story</h2>
            <div className="space-y-4">
              <p className="text-muted-foreground">
                EV Hub was founded in 2020 by a group of electric vehicle enthusiasts and industry experts who
                recognized the need for a comprehensive platform dedicated to electric mobility. What started as a small
                blog sharing EV news and reviews has grown into a complete ecosystem for electric vehicle buyers,
                sellers, and enthusiasts.
              </p>
              <p className="text-muted-foreground">
                Our team combines decades of experience in automotive technology, renewable energy, and digital
                platforms. We're united by our passion for sustainable transportation and our belief that electric
                vehicles represent the future of mobility.
              </p>
              <p className="text-muted-foreground">
                Today, EV Hub serves thousands of users across the country, helping them discover, buy, and sell
                electric vehicles while staying informed about the latest developments in the rapidly evolving EV
                landscape.
              </p>
            </div>
          </div>
          <div className="relative h-[400px] rounded-xl overflow-hidden">
            <Image src="/placeholder.svg?height=800&width=800" alt="EV Hub Story" fill className="object-cover" />
          </div>
        </div>
      </section>

      {/* Our Mission */}
      <section className="mb-16 bg-muted/50 p-8 rounded-xl">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
          <p className="text-xl mb-8">
            To accelerate the adoption of electric vehicles by providing a trusted platform for information, commerce,
            and community.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Leaf className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Sustainability</h3>
              <p className="text-muted-foreground">
                Promoting sustainable transportation solutions to reduce carbon emissions and combat climate change.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Community</h3>
              <p className="text-muted-foreground">
                Building a supportive community of EV owners, enthusiasts, and industry professionals.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Zap className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Innovation</h3>
              <p className="text-muted-foreground">
                Embracing and promoting technological innovations that advance electric mobility.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Team */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-8">Meet Our Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {teamMembers.map((member) => (
            <Card key={member.name} className="overflow-hidden">
              <div className="relative h-64">
                <Image src={member.image || "/placeholder.svg"} alt={member.name} fill className="object-cover" />
              </div>
              <CardContent className="p-4">
                <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                <p className="text-primary mb-3">{member.role}</p>
                <p className="text-sm text-muted-foreground mb-4">{member.bio}</p>
                <div className="flex gap-2">
                  {member.social.map((social) => (
                    <Button key={social.platform} variant="ghost" size="icon" asChild>
                      <Link href={social.url} target="_blank" rel="noopener noreferrer">
                        <social.icon className="h-5 w-5" />
                        <span className="sr-only">{social.platform}</span>
                      </Link>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Our Impact */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-8">Our Impact</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="bg-muted/30 p-6 rounded-xl">
            <div className="text-4xl font-bold text-primary mb-2">10,000+</div>
            <h3 className="text-xl font-semibold mb-2">EV Transactions</h3>
            <p className="text-muted-foreground">Electric vehicles bought and sold through our platform</p>
          </div>
          <div className="bg-muted/30 p-6 rounded-xl">
            <div className="text-4xl font-bold text-primary mb-2">50,000+</div>
            <h3 className="text-xl font-semibold mb-2">Community Members</h3>
            <p className="text-muted-foreground">Active users in our EV community</p>
          </div>
          <div className="bg-muted/30 p-6 rounded-xl">
            <div className="text-4xl font-bold text-primary mb-2">15,000+</div>
            <h3 className="text-xl font-semibold mb-2">Tons of CO₂ Saved</h3>
            <p className="text-muted-foreground">Estimated carbon emissions reduction from EV adoption</p>
          </div>
        </div>
      </section>

      {/* Partners */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-8">Our Partners</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {partners.map((partner) => (
            <div key={partner.name} className="flex flex-col items-center text-center">
              <div className="relative w-32 h-32 mb-4">
                <Image src={partner.logo || "/placeholder.svg"} alt={partner.name} fill className="object-contain" />
              </div>
              <h3 className="font-semibold">{partner.name}</h3>
              <p className="text-sm text-muted-foreground">{partner.type}</p>
            </div>
          ))}
        </div>
        <div className="text-center mt-8">
          <Button asChild>
            <Link href="/contact" className="flex items-center gap-2">
              Become a Partner <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Contact Us */}
      <section className="mb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h2 className="text-3xl font-bold mb-6">Contact Us</h2>
            <p className="text-muted-foreground mb-8">
              Have questions, feedback, or partnership inquiries? We'd love to hear from you. Reach out to our team
              using any of the methods below.
            </p>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-primary mt-1" />
                <div>
                  <h3 className="font-semibold">Our Office</h3>
                  <p className="text-muted-foreground">123 Electric Avenue, San Francisco, CA 94103</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-primary mt-1" />
                <div>
                  <h3 className="font-semibold">Email</h3>
                  <p className="text-muted-foreground">info@evhub.com</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="h-5 w-5 text-primary mt-1" />
                <div>
                  <h3 className="font-semibold">Phone</h3>
                  <p className="text-muted-foreground">(555) 123-4567</p>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-muted/30 p-6 rounded-xl">
            <h3 className="text-xl font-semibold mb-4">Send Us a Message</h3>
            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-1 block">Name</label>
                  <input type="text" className="w-full p-2 border rounded-md" />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">Email</label>
                  <input type="email" className="w-full p-2 border rounded-md" />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Subject</label>
                <input type="text" className="w-full p-2 border rounded-md" />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Message</label>
                <textarea className="w-full p-2 border rounded-md h-32"></textarea>
              </div>
              <Button className="w-full">Send Message</Button>
            </form>
          </div>
        </div>
      </section>

      {/* Join Our Team */}
      <section>
        <div className="bg-primary/10 p-8 rounded-xl text-center">
          <h2 className="text-3xl font-bold mb-4">Join Our Team</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Passionate about electric vehicles and sustainability? We're always looking for talented individuals to join
            our mission. Check out our current openings or send us your resume.
          </p>
          <Button asChild>
            <Link href="/careers">View Open Positions</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}

// Sample data
const teamMembers = [
  {
    name: "Sarah Johnson",
    role: "CEO & Co-Founder",
    bio: "Former automotive executive with 15+ years of experience. Electric vehicle advocate and sustainability champion.",
    image: "/placeholder.svg?height=400&width=400",
    social: [
      { platform: "LinkedIn", icon: Users, url: "#" },
      { platform: "Twitter", icon: Users, url: "#" },
    ],
  },
  {
    name: "Michael Chen",
    role: "CTO & Co-Founder",
    bio: "Software engineer and EV enthusiast. Previously led engineering teams at major tech companies.",
    image: "/placeholder.svg?height=400&width=400",
    social: [
      { platform: "LinkedIn", icon: Users, url: "#" },
      { platform: "GitHub", icon: Users, url: "#" },
    ],
  },
  {
    name: "Elena Rodriguez",
    role: "Head of Content",
    bio: "Automotive journalist with a passion for electric mobility. Has reviewed over 100 electric vehicles.",
    image: "/placeholder.svg?height=400&width=400",
    social: [
      { platform: "LinkedIn", icon: Users, url: "#" },
      { platform: "Twitter", icon: Users, url: "#" },
    ],
  },
  {
    name: "David Kim",
    role: "Head of Partnerships",
    bio: "Business development expert with extensive experience in the automotive and clean energy sectors.",
    image: "/placeholder.svg?height=400&width=400",
    social: [
      { platform: "LinkedIn", icon: Users, url: "#" },
      { platform: "Twitter", icon: Users, url: "#" },
    ],
  },
]

const partners = [
  {
    name: "GreenCharge",
    type: "Charging Network",
    logo: "/placeholder.svg?height=200&width=200",
  },
  {
    name: "EcoMotors",
    type: "EV Manufacturer",
    logo: "/placeholder.svg?height=200&width=200",
  },
  {
    name: "SustainEnergy",
    type: "Renewable Energy",
    logo: "/placeholder.svg?height=200&width=200",
  },
  {
    name: "MobilityFuture",
    type: "Research Partner",
    logo: "/placeholder.svg?height=200&width=200",
  },
]
