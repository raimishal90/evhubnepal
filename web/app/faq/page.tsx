import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { HelpCircle, Search } from "lucide-react"

export default function FAQPage() {
  return (
    <div className="container mx-auto py-8 px-4 md:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Frequently Asked Questions</h1>
          <p className="text-muted-foreground">
            Find answers to common questions about electric vehicles and our platform
          </p>
        </div>

        {/* Search */}
        <div className="relative mb-8">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search for questions..." className="pl-10" />
        </div>

        {/* FAQ Categories */}
        <Tabs defaultValue="general" className="mb-8">
          <TabsList className="w-full grid grid-cols-2 md:grid-cols-4">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="buying">Buying an EV</TabsTrigger>
            <TabsTrigger value="charging">Charging</TabsTrigger>
            <TabsTrigger value="ownership">Ownership</TabsTrigger>
          </TabsList>

          {/* General FAQs */}
          <TabsContent value="general" className="mt-6">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>What is an electric vehicle (EV)?</AccordionTrigger>
                <AccordionContent>
                  <p className="text-muted-foreground mb-2">
                    An electric vehicle (EV) is a vehicle that uses one or more electric motors for propulsion, powered
                    by electricity stored in rechargeable batteries. Unlike conventional vehicles with internal
                    combustion engines, EVs produce zero tailpipe emissions.
                  </p>
                  <p className="text-muted-foreground">There are several types of electric vehicles:</p>
                  <ul className="list-disc list-inside text-muted-foreground mt-2 space-y-1">
                    <li>Battery Electric Vehicles (BEVs): Fully electric vehicles with no gasoline engine</li>
                    <li>Plug-in Hybrid Electric Vehicles (PHEVs): Combine an electric motor with a gasoline engine</li>
                    <li>
                      Hybrid Electric Vehicles (HEVs): Use a gasoline engine with an electric motor that charges through
                      regenerative braking
                    </li>
                  </ul>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2">
                <AccordionTrigger>What are the main benefits of driving an electric vehicle?</AccordionTrigger>
                <AccordionContent>
                  <p className="text-muted-foreground mb-2">
                    Electric vehicles offer numerous benefits compared to conventional gasoline vehicles:
                  </p>
                  <ul className="list-disc list-inside text-muted-foreground space-y-1">
                    <li>
                      <span className="font-medium">Environmental Impact:</span> Zero tailpipe emissions, reducing air
                      pollution and greenhouse gases
                    </li>
                    <li>
                      <span className="font-medium">Lower Operating Costs:</span> Electricity is generally cheaper than
                      gasoline, and EVs require less maintenance
                    </li>
                    <li>
                      <span className="font-medium">Performance:</span> Instant torque for quick acceleration and
                      smooth, quiet operation
                    </li>
                    <li>
                      <span className="font-medium">Convenience:</span> Home charging means no more gas station visits
                      for daily driving
                    </li>
                    <li>
                      <span className="font-medium">Tax Incentives:</span> Federal, state, and local incentives can
                      reduce purchase costs
                    </li>
                    <li>
                      <span className="font-medium">Energy Independence:</span> Reduced reliance on imported petroleum
                    </li>
                  </ul>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3">
                <AccordionTrigger>How does EV Hub work?</AccordionTrigger>
                <AccordionContent>
                  <p className="text-muted-foreground mb-2">
                    EV Hub is a comprehensive platform for electric vehicle enthusiasts, buyers, and sellers. Our
                    platform offers several key services:
                  </p>
                  <ul className="list-disc list-inside text-muted-foreground space-y-1">
                    <li>
                      <span className="font-medium">Marketplace:</span> Browse, buy, and sell new and used electric
                      vehicles
                    </li>
                    <li>
                      <span className="font-medium">Information Hub:</span> Access guides, articles, and resources about
                      electric vehicles
                    </li>
                    <li>
                      <span className="font-medium">Community:</span> Connect with other EV owners and enthusiasts
                    </li>
                    <li>
                      <span className="font-medium">Tools:</span> Use our range calculators, charging station finders,
                      and other EV-specific tools
                    </li>
                  </ul>
                  <p className="text-muted-foreground mt-2">
                    To get started, you can{" "}
                    <Link href="/register" className="text-primary hover:underline">
                      create an account
                    </Link>{" "}
                    or browse our{" "}
                    <Link href="/marketplace" className="text-primary hover:underline">
                      marketplace
                    </Link>{" "}
                    and{" "}
                    <Link href="/blog" className="text-primary hover:underline">
                      blog
                    </Link>{" "}
                    without signing up.
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4">
                <AccordionTrigger>Is EV Hub available in my area?</AccordionTrigger>
                <AccordionContent>
                  <p className="text-muted-foreground mb-2">
                    EV Hub is currently available throughout the United States. Our marketplace listings, charging
                    station information, and educational resources are accessible nationwide.
                  </p>
                  <p className="text-muted-foreground">
                    We're actively expanding to more regions and plan to launch in Canada and Europe in the near future.
                    If you're outside our current service areas, you can still access our educational content and
                    guides.
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5">
                <AccordionTrigger>How do I contact EV Hub customer support?</AccordionTrigger>
                <AccordionContent>
                  <p className="text-muted-foreground mb-2">
                    There are several ways to reach our customer support team:
                  </p>
                  <ul className="list-disc list-inside text-muted-foreground space-y-1">
                    <li>
                      <span className="font-medium">Email:</span> support@evhub.com
                    </li>
                    <li>
                      <span className="font-medium">Phone:</span> (555) 123-4567 (Monday-Friday, 9am-5pm PT)
                    </li>
                    <li>
                      <span className="font-medium">Contact Form:</span> Visit our{" "}
                      <Link href="/contact" className="text-primary hover:underline">
                        Contact Page
                      </Link>
                    </li>
                    <li>
                      <span className="font-medium">Live Chat:</span> Available on our website during business hours
                    </li>
                  </ul>
                  <p className="text-muted-foreground mt-2">
                    For marketplace-related inquiries, please have your listing ID or transaction details ready when
                    contacting us.
                  </p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </TabsContent>

          {/* Buying an EV FAQs */}
          <TabsContent value="buying" className="mt-6">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>How much does an electric vehicle cost?</AccordionTrigger>
                <AccordionContent>
                  <p className="text-muted-foreground mb-2">
                    Electric vehicle prices vary widely based on make, model, features, and range. As of 2023, here's a
                    general price breakdown:
                  </p>
                  <ul className="list-disc list-inside text-muted-foreground space-y-1">
                    <li>
                      <span className="font-medium">Entry-level EVs:</span> $25,000-$35,000 (after incentives)
                    </li>
                    <li>
                      <span className="font-medium">Mid-range EVs:</span> $35,000-$50,000
                    </li>
                    <li>
                      <span className="font-medium">Premium/Luxury EVs:</span> $50,000-$100,000+
                    </li>
                  </ul>
                  <p className="text-muted-foreground mt-2">
                    Keep in mind that the total cost of ownership is often lower for EVs due to reduced fuel and
                    maintenance costs. Federal tax credits (up to $7,500) and state incentives can significantly reduce
                    the purchase price.
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2">
                <AccordionTrigger>What should I consider when buying an electric vehicle?</AccordionTrigger>
                <AccordionContent>
                  <p className="text-muted-foreground mb-2">
                    When shopping for an electric vehicle, consider these key factors:
                  </p>
                  <ul className="list-disc list-inside text-muted-foreground space-y-1">
                    <li>
                      <span className="font-medium">Range:</span> How far can the vehicle travel on a single charge?
                      Consider your daily driving needs.
                    </li>
                    <li>
                      <span className="font-medium">Charging:</span> Do you have access to home charging? What's the
                      charging infrastructure like in your area?
                    </li>
                    <li>
                      <span className="font-medium">Budget:</span> Consider purchase price, available incentives, and
                      total cost of ownership.
                    </li>
                    <li>
                      <span className="font-medium">Vehicle Type:</span> Sedan, SUV, truck, etc. based on your lifestyle
                      needs.
                    </li>
                    <li>
                      <span className="font-medium">Features:</span> Technology, comfort, and safety features important
                      to you.
                    </li>
                    <li>
                      <span className="font-medium">Battery Warranty:</span> Most EVs come with 8-10 year battery
                      warranties.
                    </li>
                    <li>
                      <span className="font-medium">Charging Speed:</span> Both AC (Level 2) and DC fast charging
                      capabilities.
                    </li>
                  </ul>
                  <p className="text-muted-foreground mt-2">
                    We recommend test driving multiple EVs to get a feel for their different driving characteristics and
                    features.
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3">
                <AccordionTrigger>Are there tax incentives for buying an electric vehicle?</AccordionTrigger>
                <AccordionContent>
                  <p className="text-muted-foreground mb-2">
                    Yes, there are various incentives available for EV purchases:
                  </p>
                  <ul className="list-disc list-inside text-muted-foreground space-y-1">
                    <li>
                      <span className="font-medium">Federal Tax Credit:</span> Up to $7,500 for new EVs and up to $4,000
                      for used EVs, subject to income limits and vehicle price caps.
                    </li>
                    <li>
                      <span className="font-medium">State Incentives:</span> Many states offer additional rebates, tax
                      credits, or incentives ranging from $1,000 to $5,000.
                    </li>
                    <li>
                      <span className="font-medium">Utility Rebates:</span> Some utility companies offer rebates for EV
                      purchases or home charger installation.
                    </li>
                    <li>
                      <span className="font-medium">Other Perks:</span> HOV lane access, reduced registration fees, and
                      free parking in some locations.
                    </li>
                  </ul>
                  <p className="text-muted-foreground mt-2">
                    Visit our{" "}
                    <Link href="/incentives" className="text-primary hover:underline">
                      EV Incentives Guide
                    </Link>{" "}
                    for detailed information about available incentives in your area.
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4">
                <AccordionTrigger>Should I buy a new or used electric vehicle?</AccordionTrigger>
                <AccordionContent>
                  <p className="text-muted-foreground mb-2">Both new and used EVs have their advantages:</p>
                  <div className="space-y-3">
                    <div>
                      <p className="font-medium">New EVs:</p>
                      <ul className="list-disc list-inside text-muted-foreground ml-4 space-y-1">
                        <li>Latest technology and longest range</li>
                        <li>Full manufacturer warranty</li>
                        <li>Eligible for the full federal tax credit (if qualifying)</li>
                        <li>More financing options</li>
                        <li>Higher initial cost</li>
                      </ul>
                    </div>
                    <div>
                      <p className="font-medium">Used EVs:</p>
                      <ul className="list-disc list-inside text-muted-foreground ml-4 space-y-1">
                        <li>Lower purchase price</li>
                        <li>Less depreciation</li>
                        <li>May still have remaining battery warranty</li>
                        <li>Used EV federal tax credit (up to $4,000) available for qualifying vehicles</li>
                        <li>Older technology and potentially less range</li>
                      </ul>
                    </div>
                  </div>
                  <p className="text-muted-foreground mt-2">
                    When buying a used EV, pay special attention to the battery health and remaining warranty. Most EV
                    batteries are warrantied for 8-10 years or 100,000+ miles.
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5">
                <AccordionTrigger>How do I sell my electric vehicle on EV Hub?</AccordionTrigger>
                <AccordionContent>
                  <p className="text-muted-foreground mb-2">Selling your EV on our platform is simple:</p>
                  <ol className="list-decimal list-inside text-muted-foreground space-y-1">
                    <li>Create an account or log in to your existing account</li>
                    <li>Click "Sell Your EV" in the navigation menu</li>
                    <li>Fill out the vehicle details form with accurate information</li>
                    <li>Upload high-quality photos of your vehicle</li>
                    <li>Set your asking price (our pricing tool can help with this)</li>
                    <li>Submit your listing for review</li>
                    <li>Once approved, your listing will be live on our marketplace</li>
                  </ol>
                  <p className="text-muted-foreground mt-2">
                    Our team reviews all listings to ensure quality and accuracy. This process typically takes 24-48
                    hours. Visit our{" "}
                    <Link href="/sell" className="text-primary hover:underline">
                      Sell Your EV
                    </Link>{" "}
                    page to get started.
                  </p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </TabsContent>

          {/* Charging FAQs */}
          <TabsContent value="charging" className="mt-6">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>How do I charge an electric vehicle?</AccordionTrigger>
                <AccordionContent>
                  <p className="text-muted-foreground mb-2">There are three main ways to charge an electric vehicle:</p>
                  <ul className="list-disc list-inside text-muted-foreground space-y-1">
                    <li>
                      <span className="font-medium">Level 1 Charging:</span> Using a standard 120V household outlet with
                      the charging cord that comes with your EV. This provides about 3-5 miles of range per hour of
                      charging.
                    </li>
                    <li>
                      <span className="font-medium">Level 2 Charging:</span> Using a 240V outlet (like those for dryers)
                      or a dedicated charging station at home or in public. This provides about 15-40 miles of range per
                      hour.
                    </li>
                    <li>
                      <span className="font-medium">DC Fast Charging:</span> High-powered stations that can charge an EV
                      to 80% in 20-40 minutes. These are typically found along highways and in commercial areas.
                    </li>
                  </ul>
                  <p className="text-muted-foreground mt-2">
                    The charging process is simple: plug the connector into your vehicle's charging port, and charging
                    begins automatically. Many EVs allow you to schedule charging and monitor progress through
                    smartphone apps.
                  </p>
                  <p className="text-muted-foreground mt-2">
                    For more detailed information, visit our{" "}
                    <Link href="/charging-guide" className="text-primary hover:underline">
                      EV Charging Guide
                    </Link>
                    .
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2">
                <AccordionTrigger>How long does it take to charge an electric vehicle?</AccordionTrigger>
                <AccordionContent>
                  <p className="text-muted-foreground mb-2">
                    Charging time depends on several factors: the vehicle's battery size, the charging method, and the
                    battery's current state of charge.
                  </p>
                  <ul className="list-disc list-inside text-muted-foreground space-y-1">
                    <li>
                      <span className="font-medium">Level 1 (120V):</span> 20-40+ hours for a full charge from empty
                    </li>
                    <li>
                      <span className="font-medium">Level 2 (240V):</span> 4-10 hours for a full charge from empty
                    </li>
                    <li>
                      <span className="font-medium">DC Fast Charging:</span> 20-60 minutes to charge to 80% (charging
                      slows after 80% to protect the battery)
                    </li>
                  </ul>
                  <p className="text-muted-foreground mt-2">
                    Most EV owners rarely charge from 0% to 100%. Instead, they top up regularly, much like charging a
                    smartphone. For daily driving, overnight charging at home is typically sufficient.
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3">
                <AccordionTrigger>How much does it cost to charge an electric vehicle?</AccordionTrigger>
                <AccordionContent>
                  <p className="text-muted-foreground mb-2">
                    Charging costs vary based on electricity rates and charging location:
                  </p>
                  <ul className="list-disc list-inside text-muted-foreground space-y-1">
                    <li>
                      <span className="font-medium">Home Charging:</span> The national average electricity rate is about
                      $0.15 per kWh. For a vehicle with a 60 kWh battery, a full charge would cost approximately $9.
                    </li>
                    <li>
                      <span className="font-medium">Public Level 2 Charging:</span> Costs range from free to about
                      $0.20-$0.30 per kWh, or sometimes a flat hourly rate of $1-$5.
                    </li>
                    <li>
                      <span className="font-medium">DC Fast Charging:</span> Typically $0.30-$0.60 per kWh, which means
                      $15-$30 for a full charge of a 60 kWh battery.
                    </li>
                  </ul>
                  <p className="text-muted-foreground mt-2">
                    Even at the higher end of charging costs, EVs are generally much cheaper to fuel than gasoline
                    vehicles. A typical EV costs $500-$800 per year to charge, compared to $1,500-$2,500 for gasoline in
                    a comparable vehicle.
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4">
                <AccordionTrigger>Do I need to install a home charging station?</AccordionTrigger>
                <AccordionContent>
                  <p className="text-muted-foreground mb-2">
                    While not strictly necessary, a home charging station (Level 2 charger) offers significant benefits:
                  </p>
                  <ul className="list-disc list-inside text-muted-foreground space-y-1">
                    <li>3-7 times faster charging than a standard outlet</li>
                    <li>More convenient for daily use</li>
                    <li>May include smart features like scheduling and energy monitoring</li>
                    <li>Can increase your home's value</li>
                  </ul>
                  <p className="text-muted-foreground mt-2">
                    Installation typically costs $500-$1,500 including the charger and labor. Many utilities offer
                    rebates, and there's a federal tax credit of 30% (up to $1,000) for home charger installation.
                  </p>
                  <p className="text-muted-foreground mt-2">
                    If you drive less than 30-40 miles per day, a standard outlet (Level 1) might be sufficient, as
                    overnight charging can provide enough range for your daily needs.
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5">
                <AccordionTrigger>How do I find public charging stations?</AccordionTrigger>
                <AccordionContent>
                  <p className="text-muted-foreground mb-2">
                    There are several ways to locate public charging stations:
                  </p>
                  <ul className="list-disc list-inside text-muted-foreground space-y-1">
                    <li>
                      <span className="font-medium">EV Hub Map:</span> Our platform includes a comprehensive charging
                      station finder
                    </li>
                    <li>
                      <span className="font-medium">Vehicle Navigation:</span> Most EVs have built-in charging station
                      locations in their navigation systems
                    </li>
                    <li>
                      <span className="font-medium">Smartphone Apps:</span> Popular apps include PlugShare, ChargePoint,
                      Electrify America, and EVgo
                    </li>
                    <li>
                      <span className="font-medium">Google Maps:</span> Shows charging stations when you search for "EV
                      charging"
                    </li>
                  </ul>
                  <p className="text-muted-foreground mt-2">
                    When planning a road trip, use your vehicle's trip planner (if available) or apps like ABRP (A
                    Better Route Planner) to map charging stops along your route.
                  </p>
                  <p className="text-muted-foreground mt-2">
                    Public charging networks continue to expand rapidly, with thousands of new stations being added each
                    year.
                  </p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </TabsContent>

          {/* Ownership FAQs */}
          <TabsContent value="ownership" className="mt-6">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>How long do electric vehicle batteries last?</AccordionTrigger>
                <AccordionContent>
                  <p className="text-muted-foreground mb-2">
                    Modern EV batteries are designed for longevity. Most manufacturers warranty their batteries for 8-10
                    years or 100,000-150,000 miles, but many batteries last significantly longer.
                  </p>
                  <p className="text-muted-foreground mb-2">
                    Studies show that most EV batteries retain 70-80% of their original capacity after 10 years of use.
                    This means that while range may gradually decrease, the vehicle remains fully functional for many
                    years.
                  </p>
                  <p className="text-muted-foreground">Factors that affect battery longevity include:</p>
                  <ul className="list-disc list-inside text-muted-foreground mt-2 space-y-1">
                    <li>Charging habits (keeping between 20-80% is optimal)</li>
                    <li>Climate (extreme temperatures can accelerate degradation)</li>
                    <li>Frequency of DC fast charging</li>
                    <li>Battery thermal management system quality</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2">
                <AccordionTrigger>What maintenance does an electric vehicle require?</AccordionTrigger>
                <AccordionContent>
                  <p className="text-muted-foreground mb-2">
                    EVs require significantly less maintenance than gasoline vehicles. Here's what you need to know:
                  </p>
                  <div className="space-y-3">
                    <div>
                      <p className="font-medium">Regular Maintenance:</p>
                      <ul className="list-disc list-inside text-muted-foreground ml-4 space-y-1">
                        <li>Tire rotation (every 6,000-8,000 miles)</li>
                        <li>Cabin air filter replacement (every 1-2 years)</li>
                        <li>Brake fluid check (every 2-3 years)</li>
                        <li>Coolant system check (every 4-5 years)</li>
                        <li>Wiper blade replacement (as needed)</li>
                      </ul>
                    </div>
                    <div>
                      <p className="font-medium">What EVs Don't Need:</p>
                      <ul className="list-disc list-inside text-muted-foreground ml-4 space-y-1">
                        <li>Oil changes</li>
                        <li>Transmission service</li>
                        <li>Spark plug replacement</li>
                        <li>Timing belt service</li>
                        <li>Fuel filter changes</li>
                      </ul>
                    </div>
                  </div>
                  <p className="text-muted-foreground mt-2">
                    Even brake pads last much longer in EVs due to regenerative braking, which reduces wear on friction
                    brakes. For more details, visit our{" "}
                    <Link href="/maintenance" className="text-primary hover:underline">
                      EV Maintenance Guide
                    </Link>
                    .
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3">
                <AccordionTrigger>What is the range of an electric vehicle?</AccordionTrigger>
                <AccordionContent>
                  <p className="text-muted-foreground mb-2">The range of electric vehicles varies widely by model:</p>
                  <ul className="list-disc list-inside text-muted-foreground space-y-1">
                    <li>
                      <span className="font-medium">Entry-level EVs:</span> 150-250 miles per charge
                    </li>
                    <li>
                      <span className="font-medium">Mid-range EVs:</span> 250-350 miles per charge
                    </li>
                    <li>
                      <span className="font-medium">Long-range EVs:</span> 350-500+ miles per charge
                    </li>
                  </ul>
                  <p className="text-muted-foreground mt-2">Actual range can be affected by several factors:</p>
                  <ul className="list-disc list-inside text-muted-foreground space-y-1">
                    <li>Driving speed (highway driving typically reduces range)</li>
                    <li>Temperature (cold weather can temporarily reduce range by 10-30%)</li>
                    <li>Use of climate control (heating and air conditioning)</li>
                    <li>Driving style (aggressive acceleration reduces efficiency)</li>
                    <li>Terrain (hilly routes use more energy)</li>
                  </ul>
                  <p className="text-muted-foreground mt-2">
                    Studies show that the average American drives less than 40 miles per day, meaning most modern EVs
                    can go several days between charges for typical use.
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4">
                <AccordionTrigger>Can I take road trips in an electric vehicle?</AccordionTrigger>
                <AccordionContent>
                  <p className="text-muted-foreground mb-2">
                    Yes, road trips in EVs are entirely feasible and becoming increasingly convenient as charging
                    infrastructure expands. Here are some tips for successful EV road trips:
                  </p>
                  <ul className="list-disc list-inside text-muted-foreground space-y-1">
                    <li>
                      <span className="font-medium">Plan Your Route:</span> Use your vehicle's built-in trip planner or
                      apps like PlugShare or A Better Route Planner to map charging stops
                    </li>
                    <li>
                      <span className="font-medium">Charging Strategy:</span> It's often more efficient to make several
                      shorter charging stops (20-30 minutes) than one long one
                    </li>
                    <li>
                      <span className="font-medium">Buffer Time:</span> Add 10-15% to your estimated travel time to
                      account for charging
                    </li>
                    <li>
                      <span className="font-medium">Amenities:</span> Many fast-charging stations are located near
                      restaurants, shops, or rest areas
                    </li>
                    <li>
                      <span className="font-medium">Backup Options:</span> Have alternative charging locations in mind
                      in case your planned stop is unavailable
                    </li>
                  </ul>
                  <p className="text-muted-foreground mt-2">
                    With proper planning, EV road trips can be enjoyable and stress-free. Many EV owners report that the
                    brief charging stops actually make long drives more pleasant by providing regular breaks.
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5">
                <AccordionTrigger>What happens if my electric vehicle runs out of charge?</AccordionTrigger>
                <AccordionContent>
                  <p className="text-muted-foreground mb-2">
                    Running out of charge (sometimes called "bricking") is similar to running out of gas, but it's
                    actually quite rare due to the extensive warnings EVs provide before the battery is depleted.
                  </p>
                  <p className="text-muted-foreground mb-2">If your EV does run out of charge:</p>
                  <ul className="list-disc list-inside text-muted-foreground space-y-1">
                    <li>The vehicle will give you multiple warnings and limit power before stopping completely</li>
                    <li>
                      When the battery is critically low, the car will enter a reduced power mode to help you reach a
                      safe stopping location
                    </li>
                    <li>Once fully depleted, the vehicle will need to be towed to a charging location</li>
                  </ul>
                  <p className="text-muted-foreground mt-2">
                    Many roadside assistance services now offer mobile charging for EVs. Some EV manufacturers also
                    include roadside assistance with new vehicle purchases.
                  </p>
                  <p className="text-muted-foreground mt-2">
                    The best approach is prevention: monitor your range, plan charging stops on longer trips, and heed
                    the vehicle's low-battery warnings.
                  </p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </TabsContent>
        </Tabs>

        {/* Still Have Questions */}
        <div className="bg-muted/30 p-6 rounded-xl text-center mt-12">
          <HelpCircle className="h-12 w-12 mx-auto text-primary mb-4" />
          <h2 className="text-2xl font-bold mb-2">Still Have Questions?</h2>
          <p className="text-muted-foreground mb-6">
            Can't find the answer you're looking for? Please contact our friendly team.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild>
              <Link href="/contact">Contact Us</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/blog">Read Our Blog</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
