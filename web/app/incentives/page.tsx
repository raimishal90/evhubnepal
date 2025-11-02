import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { AlertCircle, Car, DollarSign, FileText, HelpCircle, Home, Leaf, MapPin } from "lucide-react"

export default function IncentivesPage() {
  return (
    <div className="container mx-auto py-8 px-4 md:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">EV Tax Incentives & Rebates</h1>
        <p className="text-muted-foreground">
          Learn about available financial incentives for electric vehicle purchases and charging equipment
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {/* Hero Image */}
          <div className="relative w-full h-[300px] rounded-xl overflow-hidden mb-8">
            <Image src="/placeholder.svg?height=600&width=1200" alt="EV Tax Incentives" fill className="object-cover" />
          </div>

          {/* Introduction */}
          <div className="prose prose-lg dark:prose-invert max-w-none mb-8">
            <h2>Save Money While Going Electric</h2>
            <p>
              Electric vehicles often have a higher upfront cost compared to conventional vehicles, but various
              government incentives can significantly reduce this cost. Additionally, the lower operating and
              maintenance costs of EVs can lead to substantial savings over the vehicle's lifetime.
            </p>
            <p>
              This guide covers the major federal, state, and local incentives available for electric vehicle purchases
              and charging infrastructure in the United States. Keep in mind that incentives change frequently, so
              always check the latest information before making a purchase decision.
            </p>
          </div>

          {/* Federal Incentives */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Federal Tax Credits & Incentives</h2>

            <Card className="mb-6">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <Car className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Clean Vehicle Tax Credit (IRC 30D)</h3>
                    <p className="text-muted-foreground mb-4">
                      Federal tax credit of up to $7,500 for new qualified electric vehicles.
                    </p>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium mb-1">Key Requirements:</h4>
                        <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                          <li>Final assembly must occur in North America</li>
                          <li>
                            Vehicle price caps: $80,000 for vans, SUVs, and pickup trucks; $55,000 for other vehicles
                          </li>
                          <li>
                            Income limits: $300,000 for married filing jointly, $225,000 for head of household, $150,000
                            for others
                          </li>
                          <li>Battery component and critical mineral requirements</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-medium mb-1">Eligible Vehicles (Partial List):</h4>
                        <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                          <li>Tesla Model 3 (certain trims)</li>
                          <li>Tesla Model Y</li>
                          <li>Ford Mustang Mach-E</li>
                          <li>Chevrolet Bolt EV and EUV</li>
                          <li>Volkswagen ID.4 (assembled in USA)</li>
                        </ul>
                        <p className="text-sm mt-2">
                          <Link
                            href="https://afdc.energy.gov/laws/electric-vehicles-for-tax-credit"
                            className="text-primary hover:underline"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            View full list of eligible vehicles
                          </Link>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="mb-6">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <Car className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Used Clean Vehicle Tax Credit (IRC 25E)</h3>
                    <p className="text-muted-foreground mb-4">
                      Federal tax credit of up to $4,000 (or 30% of the sale price, whichever is less) for qualified
                      used electric vehicles.
                    </p>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium mb-1">Key Requirements:</h4>
                        <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                          <li>Vehicle must be at least 2 years old</li>
                          <li>Sale price cannot exceed $25,000</li>
                          <li>
                            Income limits: $150,000 for married filing jointly, $112,500 for head of household, $75,000
                            for others
                          </li>
                          <li>Vehicle must be purchased from a dealer</li>
                          <li>Credit can only be claimed once per vehicle</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <Home className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Alternative Fuel Infrastructure Tax Credit</h3>
                    <p className="text-muted-foreground mb-4">Tax credit for installation of EV charging equipment.</p>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium mb-1">Key Details:</h4>
                        <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                          <li>
                            30% of the cost of hardware and installation, up to $1,000 for residential installations
                          </li>
                          <li>30% of the cost, up to $30,000 for commercial installations</li>
                          <li>Equipment must be new and placed in service during the tax year</li>
                          <li>Must be installed in the United States</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* State Incentives */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">State & Local Incentives</h2>

            <Tabs defaultValue="popular" className="mb-6">
              <TabsList className="w-full grid grid-cols-3 mb-4">
                <TabsTrigger value="popular">Popular States</TabsTrigger>
                <TabsTrigger value="all">All States</TabsTrigger>
                <TabsTrigger value="local">Local Incentives</TabsTrigger>
              </TabsList>

              <TabsContent value="popular" className="space-y-4">
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3 mb-2">
                      <MapPin className="h-5 w-5 text-primary" />
                      <h3 className="font-semibold">California</h3>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">
                        California offers the Clean Vehicle Rebate Project (CVRP) providing rebates up to $7,000 for
                        eligible zero-emission vehicles.
                      </p>
                      <ul className="list-disc list-inside text-sm text-muted-foreground">
                        <li>$2,000 for battery electric vehicles</li>
                        <li>$1,000 for plug-in hybrid vehicles</li>
                        <li>Additional $2,500 for low-income consumers</li>
                      </ul>
                      <p className="text-sm">
                        <Link
                          href="https://cleanvehiclerebate.org/"
                          className="text-primary hover:underline"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Learn more about CVRP
                        </Link>
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3 mb-2">
                      <MapPin className="h-5 w-5 text-primary" />
                      <h3 className="font-semibold">New York</h3>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">
                        The Drive Clean Rebate offers up to $2,000 for new electric vehicle purchases or leases.
                      </p>
                      <ul className="list-disc list-inside text-sm text-muted-foreground">
                        <li>Rebate amount based on vehicle electric range</li>
                        <li>Point-of-sale rebate applied at dealership</li>
                        <li>No income restrictions</li>
                      </ul>
                      <p className="text-sm">
                        <Link
                          href="https://www.nyserda.ny.gov/All-Programs/Drive-Clean-Rebate"
                          className="text-primary hover:underline"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Learn more about Drive Clean Rebate
                        </Link>
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3 mb-2">
                      <MapPin className="h-5 w-5 text-primary" />
                      <h3 className="font-semibold">Colorado</h3>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">
                        Colorado offers tax credits for electric vehicles and plug-in hybrids.
                      </p>
                      <ul className="list-disc list-inside text-sm text-muted-foreground">
                        <li>$2,000 tax credit for passenger electric vehicles (2023)</li>
                        <li>$1,500 for plug-in hybrid vehicles (2023)</li>
                        <li>Additional incentives for light/medium/heavy-duty trucks</li>
                      </ul>
                      <p className="text-sm">
                        <Link
                          href="https://energyoffice.colorado.gov/transportation/electric-vehicles/ev-tax-credits"
                          className="text-primary hover:underline"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Learn more about Colorado incentives
                        </Link>
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="all" className="space-y-4">
                <div className="p-4 border rounded-md">
                  <div className="flex items-center gap-2 mb-4">
                    <AlertCircle className="h-5 w-5 text-primary" />
                    <p className="text-sm font-medium">
                      State incentives change frequently. Always check official state websites for the most current
                      information.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Button variant="outline" className="justify-start" asChild>
                      <Link href="https://afdc.energy.gov/laws/state" target="_blank" rel="noopener noreferrer">
                        <MapPin className="h-4 w-4 mr-2" />
                        View All State Incentives
                      </Link>
                    </Button>
                    <Button variant="outline" className="justify-start" asChild>
                      <Link
                        href="https://pluginamerica.org/why-go-plug-in/state-federal-incentives/"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <DollarSign className="h-4 w-4 mr-2" />
                        Plug In America Incentives Map
                      </Link>
                    </Button>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="local" className="space-y-4">
                <Card>
                  <CardContent className="p-4">
                    <h3 className="font-semibold mb-2">Utility Company Incentives</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Many utility companies offer rebates for EV purchases and home charging equipment installation.
                    </p>
                    <ul className="list-disc list-inside text-sm text-muted-foreground space-y-2">
                      <li>Rebates for Level 2 charger purchases</li>
                      <li>Discounted electricity rates for EV charging</li>
                      <li>Bill credits for EV owners</li>
                      <li>Free or discounted charging equipment</li>
                    </ul>
                    <p className="text-sm mt-4">
                      Contact your local utility company or visit their website to learn about available incentives.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <h3 className="font-semibold mb-2">Municipal & County Incentives</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Some cities and counties offer additional incentives for EV adoption.
                    </p>
                    <ul className="list-disc list-inside text-sm text-muted-foreground space-y-2">
                      <li>Free or discounted parking for EVs</li>
                      <li>HOV lane access regardless of occupancy</li>
                      <li>Reduced vehicle registration fees</li>
                      <li>Rebates for home or workplace charging stations</li>
                      <li>Expedited permitting for charging infrastructure</li>
                    </ul>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Employer Incentives */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Employer & Workplace Incentives</h2>
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p>
                Many employers offer incentives to encourage employees to drive electric vehicles. These can include:
              </p>
              <ul>
                <li>Free workplace charging</li>
                <li>Preferred parking for electric vehicles</li>
                <li>Subsidies or rebates for EV purchases</li>
                <li>Commuter benefits for EV drivers</li>
              </ul>
              <p>
                Additionally, businesses can take advantage of tax incentives for installing workplace charging
                stations. The Alternative Fuel Infrastructure Tax Credit allows businesses to claim up to 30% of the
                cost (maximum $30,000) for installing EV charging stations.
              </p>
            </div>
          </div>

          {/* How to Claim */}
          <div>
            <h2 className="text-2xl font-semibold mb-4">How to Claim EV Tax Credits & Rebates</h2>

            <Accordion type="single" collapsible className="mb-6">
              <AccordionItem value="federal">
                <AccordionTrigger>Federal Tax Credits</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      To claim the federal tax credit for a new or used electric vehicle:
                    </p>
                    <ol className="list-decimal list-inside text-sm text-muted-foreground space-y-2">
                      <li>Confirm your vehicle qualifies using the Department of Energy's list of eligible vehicles</li>
                      <li>Purchase the vehicle from a qualified dealer</li>
                      <li>
                        File IRS Form 8936 (Qualified Plug-in Electric Drive Motor Vehicle Credit) with your tax return
                      </li>
                      <li>Keep all purchase documentation for your records</li>
                    </ol>
                    <div className="p-3 bg-muted rounded-md">
                      <p className="text-sm font-medium">Starting in 2024:</p>
                      <p className="text-sm text-muted-foreground">
                        You'll have the option to transfer the credit to the dealer at the time of purchase, effectively
                        receiving it as a point-of-sale discount.
                      </p>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="state">
                <AccordionTrigger>State Rebates & Incentives</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      The process for claiming state incentives varies by state:
                    </p>
                    <ul className="list-disc list-inside text-sm text-muted-foreground space-y-2">
                      <li>
                        <span className="font-medium">Point-of-sale rebates:</span> Applied at the time of purchase,
                        reducing the vehicle price
                      </li>
                      <li>
                        <span className="font-medium">Post-purchase rebates:</span> Require submitting an application
                        with proof of purchase after buying the vehicle
                      </li>
                      <li>
                        <span className="font-medium">Tax credits:</span> Claimed when filing your state tax return
                      </li>
                    </ul>
                    <p className="text-sm text-muted-foreground">
                      Visit your state's energy or environmental department website for specific instructions on
                      claiming available incentives.
                    </p>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="charging">
                <AccordionTrigger>Charging Equipment Incentives</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4">
                    <p className="text-sm text-muted-foreground">To claim incentives for home charging equipment:</p>
                    <ol className="list-decimal list-inside text-sm text-muted-foreground space-y-2">
                      <li>
                        For federal tax credits, file IRS Form 8911 (Alternative Fuel Vehicle Refueling Property Credit)
                        with your tax return
                      </li>
                      <li>For utility rebates, check your utility company's website for their application process</li>
                      <li>Keep all receipts and installation documentation</li>
                      <li>Take photos of the installed equipment</li>
                    </ol>
                    <p className="text-sm text-muted-foreground">
                      Some utility companies require using approved contractors for installation to qualify for rebates.
                    </p>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <div className="p-4 border rounded-md bg-muted/50">
              <div className="flex items-start gap-3">
                <FileText className="h-5 w-5 text-primary mt-1" />
                <div>
                  <h3 className="font-semibold mb-1">Documentation Checklist</h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    Keep these documents to support your incentive claims:
                  </p>
                  <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                    <li>Vehicle purchase agreement or lease contract</li>
                    <li>Vehicle identification number (VIN)</li>
                    <li>Proof of registration</li>
                    <li>Receipts for charging equipment and installation</li>
                    <li>Manufacturer's certification of vehicle eligibility (for federal tax credit)</li>
                    <li>Utility bills showing EV rate plans (if applicable)</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="sticky top-24 space-y-6">
            {/* Incentives Calculator */}
            <Card>
              <CardContent className="p-4">
                <h3 className="text-lg font-semibold mb-4">Incentives Calculator</h3>
                <p className="text-sm text-muted-foreground mb-4">Estimate potential savings from EV incentives.</p>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-1 block">Vehicle Type</label>
                    <select className="w-full p-2 border rounded-md">
                      <option>New Battery Electric Vehicle</option>
                      <option>New Plug-in Hybrid</option>
                      <option>Used Electric Vehicle</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1 block">Vehicle Price</label>
                    <input type="number" defaultValue="45000" className="w-full p-2 border rounded-md" />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1 block">State</label>
                    <select className="w-full p-2 border rounded-md">
                      <option>California</option>
                      <option>New York</option>
                      <option>Texas</option>
                      <option>Florida</option>
                      <option>Colorado</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1 block">Income Level</label>
                    <select className="w-full p-2 border rounded-md">
                      <option>Under $75,000</option>
                      <option>$75,000 - $150,000</option>
                      <option>Over $150,000</option>
                    </select>
                  </div>
                  <Button className="w-full">Calculate Savings</Button>
                  <div className="p-3 bg-muted rounded-md">
                    <div className="flex justify-between items-center mb-2">
                      <p className="text-sm">Federal Tax Credit:</p>
                      <p className="font-semibold">$7,500</p>
                    </div>
                    <div className="flex justify-between items-center mb-2">
                      <p className="text-sm">State Incentives:</p>
                      <p className="font-semibold">$2,000</p>
                    </div>
                    <div className="flex justify-between items-center mb-2">
                      <p className="text-sm">Utility Rebates:</p>
                      <p className="font-semibold">$500</p>
                    </div>
                    <div className="border-t pt-2 mt-2 flex justify-between items-center">
                      <p className="text-sm font-medium">Total Savings:</p>
                      <p className="text-xl font-bold text-primary">$10,000</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* FAQ */}
            <Card>
              <CardContent className="p-4">
                <h3 className="text-lg font-semibold mb-4">Frequently Asked Questions</h3>
                <div className="space-y-3">
                  <div className="space-y-1">
                    <h4 className="font-medium flex items-center gap-2">
                      <HelpCircle className="h-4 w-4 text-primary" />
                      Can I claim both federal and state incentives?
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Yes, you can typically claim both federal and state incentives for the same vehicle purchase.
                    </p>
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-medium flex items-center gap-2">
                      <HelpCircle className="h-4 w-4 text-primary" />
                      What if I lease instead of buy?
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      For leases, the federal tax credit typically goes to the leasing company, but they often pass the
                      savings to you through reduced lease payments.
                    </p>
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-medium flex items-center gap-2">
                      <HelpCircle className="h-4 w-4 text-primary" />
                      Do incentives apply to used EVs?
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      The federal government now offers a tax credit for used EVs. Some states also offer incentives for
                      used electric vehicles.
                    </p>
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-medium flex items-center gap-2">
                      <HelpCircle className="h-4 w-4 text-primary" />
                      What if I don't owe enough in taxes?
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      The federal EV tax credit is non-refundable, meaning you can only claim up to the amount you owe
                      in federal income tax. Starting in 2024, you can transfer the credit to the dealer for immediate
                      savings.
                    </p>
                  </div>
                  <Button variant="ghost" className="w-full" asChild>
                    <Link href="/faq">View More FAQs</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Related Resources */}
            <Card>
              <CardContent className="p-4">
                <h3 className="text-lg font-semibold mb-4">Related Resources</h3>
                <div className="space-y-3">
                  <Button variant="ghost" className="w-full justify-start" asChild>
                    <Link href="/charging-guide" className="flex items-center gap-2">
                      <Leaf className="h-4 w-4" />
                      <span>EV Charging Guide</span>
                    </Link>
                  </Button>
                  <Button variant="ghost" className="w-full justify-start" asChild>
                    <Link href="/maintenance" className="flex items-center gap-2">
                      <Leaf className="h-4 w-4" />
                      <span>EV Maintenance Tips</span>
                    </Link>
                  </Button>
                  <Button variant="ghost" className="w-full justify-start" asChild>
                    <Link href="/blog" className="flex items-center gap-2">
                      <Leaf className="h-4 w-4" />
                      <span>EV Blog Articles</span>
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
