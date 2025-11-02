import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { AlertCircle, Battery, Calendar, Check, Clock, FileText, Gauge, Leaf, Wrench } from "lucide-react"

export default function MaintenancePage() {
  return (
    <div className="container mx-auto py-8 px-4 md:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">EV Maintenance Guide</h1>
        <p className="text-muted-foreground">Learn how to keep your electric vehicle in optimal condition</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {/* Hero Image */}
          <div className="relative w-full h-[300px] rounded-xl overflow-hidden mb-8">
            <Image src="/placeholder.svg?height=600&width=1200" alt="EV Maintenance" fill className="object-cover" />
          </div>

          {/* Introduction */}
          <div className="prose prose-lg dark:prose-invert max-w-none mb-8">
            <h2>Simpler Maintenance, Fewer Headaches</h2>
            <p>
              One of the major benefits of electric vehicles is their simplified maintenance requirements. With fewer
              moving parts, no oil changes, and regenerative braking that reduces wear on brake components, EVs
              typically cost less to maintain than conventional vehicles.
            </p>
            <p>
              However, EVs still require regular care to ensure optimal performance, efficiency, and longevity. This
              guide covers the essential maintenance tasks for electric vehicle owners, from routine checks to long-term
              care.
            </p>
          </div>

          {/* Maintenance Schedule */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">EV Maintenance Schedule</h2>

            <Tabs defaultValue="monthly" className="mb-6">
              <TabsList className="w-full grid grid-cols-4 mb-4">
                <TabsTrigger value="monthly">Monthly</TabsTrigger>
                <TabsTrigger value="seasonal">Seasonal</TabsTrigger>
                <TabsTrigger value="annual">Annual</TabsTrigger>
                <TabsTrigger value="longterm">Long-Term</TabsTrigger>
              </TabsList>

              <TabsContent value="monthly" className="space-y-4">
                <Card>
                  <CardContent className="p-4">
                    <h3 className="font-semibold mb-2 flex items-center gap-2">
                      <Check className="h-5 w-5 text-primary" />
                      Tire Pressure Check
                    </h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      Proper tire inflation is crucial for safety, efficiency, and tire longevity. EVs are typically
                      heavier than gas vehicles, making tire maintenance even more important.
                    </p>
                    <div className="bg-muted p-3 rounded-md text-sm">
                      <p className="font-medium mb-1">How to check:</p>
                      <ol className="list-decimal list-inside space-y-1 text-muted-foreground">
                        <li>Check pressure when tires are cold</li>
                        <li>Follow manufacturer's recommended PSI (usually found on driver's door jamb)</li>
                        <li>Add air if pressure is low</li>
                        <li>Check for uneven wear patterns</li>
                      </ol>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <h3 className="font-semibold mb-2 flex items-center gap-2">
                      <Check className="h-5 w-5 text-primary" />
                      Windshield Washer Fluid
                    </h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      Keep your windshield washer fluid topped up for clear visibility in all conditions.
                    </p>
                    <div className="bg-muted p-3 rounded-md text-sm">
                      <p className="font-medium mb-1">How to check:</p>
                      <ol className="list-decimal list-inside space-y-1 text-muted-foreground">
                        <li>Locate the washer fluid reservoir (usually has a windshield/water symbol)</li>
                        <li>Check fluid level</li>
                        <li>Add appropriate washer fluid for your climate</li>
                        <li>Test sprayers to ensure proper function</li>
                      </ol>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <h3 className="font-semibold mb-2 flex items-center gap-2">
                      <Check className="h-5 w-5 text-primary" />
                      Wiper Blade Inspection
                    </h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      Functioning wiper blades are essential for safe driving in inclement weather.
                    </p>
                    <div className="bg-muted p-3 rounded-md text-sm">
                      <p className="font-medium mb-1">What to look for:</p>
                      <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                        <li>Cracks or splits in the rubber</li>
                        <li>Streaking or skipping during operation</li>
                        <li>Squeaking or chattering sounds</li>
                        <li>Replace blades that show signs of wear</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="seasonal" className="space-y-4">
                <Card>
                  <CardContent className="p-4">
                    <h3 className="font-semibold mb-2 flex items-center gap-2">
                      <Calendar className="h-5 w-5 text-primary" />
                      Seasonal Tire Changeover
                    </h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      If you live in an area with distinct winter conditions, consider seasonal tires for optimal
                      performance and safety.
                    </p>
                    <div className="bg-muted p-3 rounded-md text-sm">
                      <p className="font-medium mb-1">Seasonal tire tips:</p>
                      <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                        <li>Switch to winter tires when temperatures consistently fall below 45°F (7°C)</li>
                        <li>Winter tires provide better traction in snow, ice, and cold conditions</li>
                        <li>Return to all-season or summer tires in spring</li>
                        <li>Rotate tires during seasonal changes</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <h3 className="font-semibold mb-2 flex items-center gap-2">
                      <Calendar className="h-5 w-5 text-primary" />
                      Battery Care in Extreme Temperatures
                    </h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      EV batteries perform best in moderate temperatures. Extreme heat or cold can affect range and
                      battery health.
                    </p>
                    <div className="space-y-3">
                      <div className="bg-muted p-3 rounded-md text-sm">
                        <p className="font-medium mb-1">Cold weather tips:</p>
                        <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                          <li>Precondition the battery while plugged in before driving</li>
                          <li>Keep the vehicle plugged in when not in use</li>
                          <li>Park in a garage when possible</li>
                          <li>Expect 10-30% range reduction in very cold weather</li>
                        </ul>
                      </div>
                      <div className="bg-muted p-3 rounded-md text-sm">
                        <p className="font-medium mb-1">Hot weather tips:</p>
                        <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                          <li>Park in shade or covered areas when possible</li>
                          <li>Avoid charging to 100% during extreme heat</li>
                          <li>Use scheduled charging to avoid peak heat hours</li>
                          <li>Use climate control while plugged in to pre-cool the cabin</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <h3 className="font-semibold mb-2 flex items-center gap-2">
                      <Calendar className="h-5 w-5 text-primary" />
                      Cabin Air Filter Check
                    </h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      The cabin air filter keeps the air inside your vehicle clean. Check and replace it seasonally or
                      as recommended by the manufacturer.
                    </p>
                    <div className="bg-muted p-3 rounded-md text-sm">
                      <p className="font-medium mb-1">When to replace:</p>
                      <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                        <li>Every 15,000-30,000 miles (or as specified in your owner's manual)</li>
                        <li>When you notice reduced airflow from vents</li>
                        <li>If you detect unusual odors from the ventilation system</li>
                        <li>More frequently if you drive in dusty or polluted areas</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="annual" className="space-y-4">
                <Card>
                  <CardContent className="p-4">
                    <h3 className="font-semibold mb-2 flex items-center gap-2">
                      <Wrench className="h-5 w-5 text-primary" />
                      Brake System Inspection
                    </h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      While regenerative braking reduces wear on friction brakes, they still need regular inspection.
                    </p>
                    <div className="bg-muted p-3 rounded-md text-sm">
                      <p className="font-medium mb-1">What to check:</p>
                      <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                        <li>Brake pad thickness (replace when less than 3-4mm)</li>
                        <li>Brake fluid level and condition (replace every 2-3 years)</li>
                        <li>Brake rotor condition</li>
                        <li>Proper operation of regenerative braking</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <h3 className="font-semibold mb-2 flex items-center gap-2">
                      <Wrench className="h-5 w-5 text-primary" />
                      Tire Rotation
                    </h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      Regular tire rotation ensures even wear and extends tire life.
                    </p>
                    <div className="bg-muted p-3 rounded-md text-sm">
                      <p className="font-medium mb-1">Rotation schedule:</p>
                      <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                        <li>Every 6,000-8,000 miles</li>
                        <li>Follow the pattern recommended in your owner's manual</li>
                        <li>Check alignment at the same time</li>
                        <li>Consider tire balancing if you notice vibrations</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <h3 className="font-semibold mb-2 flex items-center gap-2">
                      <Wrench className="h-5 w-5 text-primary" />
                      Cooling System Check
                    </h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      EVs have cooling systems for the battery, motor, and electronics that need regular inspection.
                    </p>
                    <div className="bg-muted p-3 rounded-md text-sm">
                      <p className="font-medium mb-1">Maintenance tasks:</p>
                      <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                        <li>Check coolant levels</li>
                        <li>Inspect for leaks or damage to cooling lines</li>
                        <li>Ensure radiator and cooling fans are clean and unobstructed</li>
                        <li>Replace coolant as recommended (typically every 4-5 years)</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <h3 className="font-semibold mb-2 flex items-center gap-2">
                      <Wrench className="h-5 w-5 text-primary" />
                      Suspension and Steering Inspection
                    </h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      EVs are typically heavier than comparable gas vehicles, which can affect suspension components.
                    </p>
                    <div className="bg-muted p-3 rounded-md text-sm">
                      <p className="font-medium mb-1">What to inspect:</p>
                      <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                        <li>Shock absorbers and struts for leaks or damage</li>
                        <li>Control arm bushings for wear</li>
                        <li>Steering components for looseness</li>
                        <li>Wheel bearings for noise or play</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="longterm" className="space-y-4">
                <Card>
                  <CardContent className="p-4">
                    <h3 className="font-semibold mb-2 flex items-center gap-2">
                      <Battery className="h-5 w-5 text-primary" />
                      Battery Health Management
                    </h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      The battery is the most expensive component of your EV. Proper care can extend its lifespan
                      significantly.
                    </p>
                    <div className="space-y-3">
                      <div className="bg-muted p-3 rounded-md text-sm">
                        <p className="font-medium mb-1">Charging best practices:</p>
                        <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                          <li>For daily use, keep battery between 20-80% charge</li>
                          <li>Only charge to 100% before long trips</li>
                          <li>Avoid letting the battery sit at 0% or 100% for extended periods</li>
                          <li>Use DC fast charging sparingly (primarily for road trips)</li>
                        </ul>
                      </div>
                      <div className="bg-muted p-3 rounded-md text-sm">
                        <p className="font-medium mb-1">Long-term storage:</p>
                        <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                          <li>If storing for more than a month, leave battery at 50-60% charge</li>
                          <li>Store in moderate temperatures if possible</li>
                          <li>Check and charge to 50% every few months if stored long-term</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <h3 className="font-semibold mb-2 flex items-center gap-2">
                      <Gauge className="h-5 w-5 text-primary" />
                      Software Updates
                    </h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      Unlike traditional vehicles, EVs often improve over time through software updates.
                    </p>
                    <div className="bg-muted p-3 rounded-md text-sm">
                      <p className="font-medium mb-1">Update management:</p>
                      <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                        <li>Keep vehicle software up to date</li>
                        <li>Updates can improve range, charging speed, and add new features</li>
                        <li>Some updates require the vehicle to be parked and plugged in</li>
                        <li>Check manufacturer's app or website for available updates</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <h3 className="font-semibold mb-2 flex items-center gap-2">
                      <Clock className="h-5 w-5 text-primary" />
                      High-Voltage System Inspection
                    </h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      The high-voltage system should be inspected periodically by qualified technicians.
                    </p>
                    <div className="bg-muted p-3 rounded-md text-sm">
                      <p className="font-medium mb-1">Professional inspection:</p>
                      <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                        <li>Have the high-voltage system inspected every 2-3 years</li>
                        <li>Check for damage to orange high-voltage cables</li>
                        <li>Inspect battery connections for corrosion</li>
                        <li>Test insulation resistance of high-voltage components</li>
                      </ul>
                      <p className="text-xs mt-2 text-muted-foreground">
                        <AlertCircle className="h-3 w-3 inline mr-1" />
                        Never attempt to service high-voltage components yourself. Always use qualified technicians.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* DIY vs Professional */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">DIY vs. Professional Maintenance</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <Card>
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-3 text-center">DIY Maintenance</h3>
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <p className="text-sm">Tire pressure checks and inflation</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <p className="text-sm">Windshield washer fluid refills</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <p className="text-sm">Wiper blade replacement</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <p className="text-sm">Cabin air filter replacement (model dependent)</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <p className="text-sm">Software updates (if over-the-air capable)</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <p className="text-sm">Visual inspection of tires, brakes, and lights</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-3 text-center">Professional Maintenance</h3>
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <Wrench className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <p className="text-sm">Brake system service and fluid replacement</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <Wrench className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <p className="text-sm">Cooling system service</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <Wrench className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <p className="text-sm">High-voltage system inspection</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <Wrench className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <p className="text-sm">Suspension and steering system service</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <Wrench className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <p className="text-sm">Battery diagnostic testing</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <Wrench className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <p className="text-sm">Wheel alignment and tire balancing</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="p-4 border rounded-md bg-muted/50">
              <div className="flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-primary mt-1" />
                <div>
                  <h3 className="font-semibold mb-1">Safety First</h3>
                  <p className="text-sm text-muted-foreground">
                    Never attempt to service high-voltage components yourself. EVs operate at voltages that can be
                    lethal. Always consult a qualified technician for any work involving the high-voltage system,
                    battery, or drive unit.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Cost Comparison */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Maintenance Cost Comparison: EV vs. Gas Vehicle</h2>

            <div className="relative overflow-x-auto rounded-lg border mb-4">
              <table className="w-full text-sm">
                <thead className="bg-muted text-xs uppercase">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left">
                      Maintenance Item
                    </th>
                    <th scope="col" className="px-6 py-3 text-center">
                      Electric Vehicle
                    </th>
                    <th scope="col" className="px-6 py-3 text-center">
                      Gas Vehicle
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="px-6 py-4 font-medium">Oil Changes</td>
                    <td className="px-6 py-4 text-center">Not Required</td>
                    <td className="px-6 py-4 text-center">$30-80 every 3,000-7,500 miles</td>
                  </tr>
                  <tr className="border-b bg-muted/30">
                    <td className="px-6 py-4 font-medium">Brake Pads</td>
                    <td className="px-6 py-4 text-center">$150-300 every 30,000-50,000 miles</td>
                    <td className="px-6 py-4 text-center">$150-300 every 15,000-30,000 miles</td>
                  </tr>
                  <tr className="border-b">
                    <td className="px-6 py-4 font-medium">Transmission Service</td>
                    <td className="px-6 py-4 text-center">Not Required</td>
                    <td className="px-6 py-4 text-center">$80-250 every 30,000-60,000 miles</td>
                  </tr>
                  <tr className="border-b bg-muted/30">
                    <td className="px-6 py-4 font-medium">Cooling System</td>
                    <td className="px-6 py-4 text-center">$100-200 every 4-5 years</td>
                    <td className="px-6 py-4 text-center">$100-200 every 2-3 years</td>
                  </tr>
                  <tr className="border-b">
                    <td className="px-6 py-4 font-medium">Spark Plugs</td>
                    <td className="px-6 py-4 text-center">Not Required</td>
                    <td className="px-6 py-4 text-center">$50-200 every 30,000-100,000 miles</td>
                  </tr>
                  <tr className="border-b bg-muted/30">
                    <td className="px-6 py-4 font-medium">Timing Belt</td>
                    <td className="px-6 py-4 text-center">Not Required</td>
                    <td className="px-6 py-4 text-center">$500-1,000 every 60,000-100,000 miles</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 font-medium">Tire Rotation</td>
                    <td className="px-6 py-4 text-center">$20-50 every 6,000-8,000 miles</td>
                    <td className="px-6 py-4 text-center">$20-50 every 6,000-8,000 miles</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-sm text-muted-foreground">
              Note: Costs are estimates and can vary based on vehicle make, model, location, and service provider. The
              table illustrates the general maintenance cost difference between EVs and gas vehicles.
            </p>
          </div>

          {/* Finding a Qualified Technician */}
          <div>
            <h2 className="text-2xl font-semibold mb-4">Finding a Qualified EV Technician</h2>
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p>
                Not all auto technicians are trained to work on electric vehicles. When seeking service for your EV,
                consider these options:
              </p>
              <ul>
                <li>
                  <strong>Dealership Service Centers:</strong> Technicians at the manufacturer's dealerships are
                  specifically trained to work on their EVs.
                </li>
                <li>
                  <strong>EV-Certified Independent Shops:</strong> Some independent repair shops have technicians
                  certified to work on electric vehicles.
                </li>
                <li>
                  <strong>Mobile Service:</strong> Some EV manufacturers offer mobile service that comes to your
                  location for maintenance and minor repairs.
                </li>
              </ul>
              <h3>Questions to Ask When Choosing a Service Provider</h3>
              <ul>
                <li>Are your technicians specifically trained and certified to work on electric vehicles?</li>
                <li>How many EVs of my make and model have you serviced?</li>
                <li>Do you have the specialized tools and diagnostic equipment for EVs?</li>
                <li>Are you familiar with the latest software updates for my vehicle?</li>
              </ul>
              <p>
                Remember that proper maintenance by qualified technicians not only keeps your EV running optimally but
                also helps maintain your warranty coverage.
              </p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="sticky top-24 space-y-6">
            {/* Maintenance Checklist */}
            <Card>
              <CardContent className="p-4">
                <h3 className="text-lg font-semibold mb-4">EV Maintenance Checklist</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <input type="checkbox" id="check-tires" className="h-4 w-4 rounded border-gray-300" />
                    <label htmlFor="check-tires" className="text-sm">
                      Check tire pressure
                    </label>
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="checkbox" id="check-wipers" className="h-4 w-4 rounded border-gray-300" />
                    <label htmlFor="check-wipers" className="text-sm">
                      Inspect wiper blades
                    </label>
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="checkbox" id="check-washer" className="h-4 w-4 rounded border-gray-300" />
                    <label htmlFor="check-washer" className="text-sm">
                      Top up washer fluid
                    </label>
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="checkbox" id="check-lights" className="h-4 w-4 rounded border-gray-300" />
                    <label htmlFor="check-lights" className="text-sm">
                      Test all lights
                    </label>
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="checkbox" id="check-brakes" className="h-4 w-4 rounded border-gray-300" />
                    <label htmlFor="check-brakes" className="text-sm">
                      Check brake function
                    </label>
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="checkbox" id="check-cooling" className="h-4 w-4 rounded border-gray-300" />
                    <label htmlFor="check-cooling" className="text-sm">
                      Inspect cooling system
                    </label>
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="checkbox" id="check-software" className="h-4 w-4 rounded border-gray-300" />
                    <label htmlFor="check-software" className="text-sm">
                      Check for software updates
                    </label>
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="checkbox" id="check-cabin" className="h-4 w-4 rounded border-gray-300" />
                    <label htmlFor="check-cabin" className="text-sm">
                      Inspect cabin air filter
                    </label>
                  </div>
                  <Button className="w-full mt-2">Print Checklist</Button>
                </div>
              </CardContent>
            </Card>

            {/* Maintenance Tracker */}
            <Card>
              <CardContent className="p-4">
                <h3 className="text-lg font-semibold mb-4">Maintenance Tracker</h3>
                <p className="text-sm text-muted-foreground mb-4">Keep track of your EV's maintenance history.</p>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-1 block">Service Type</label>
                    <select className="w-full p-2 border rounded-md">
                      <option>Tire Rotation</option>
                      <option>Brake Inspection</option>
                      <option>Cabin Air Filter</option>
                      <option>Cooling System</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1 block">Date</label>
                    <input type="date" className="w-full p-2 border rounded-md" />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1 block">Mileage</label>
                    <input type="number" placeholder="Current mileage" className="w-full p-2 border rounded-md" />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1 block">Notes</label>
                    <textarea placeholder="Service details" className="w-full p-2 border rounded-md h-20"></textarea>
                  </div>
                  <Button className="w-full">Save Record</Button>
                </div>
              </CardContent>
            </Card>

            {/* FAQ */}
            <Card>
              <CardContent className="p-4">
                <h3 className="text-lg font-semibold mb-4">Common Questions</h3>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger className="text-sm">Do EVs need oil changes?</AccordionTrigger>
                    <AccordionContent className="text-sm text-muted-foreground">
                      No, electric vehicles don't have internal combustion engines and don't require oil changes. This
                      is one of the major maintenance advantages of EVs.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2">
                    <AccordionTrigger className="text-sm">How often should I rotate my EV's tires?</AccordionTrigger>
                    <AccordionContent className="text-sm text-muted-foreground">
                      EV tires should be rotated every 6,000-8,000 miles. Due to the instant torque and heavier weight
                      of EVs, tire wear can be accelerated compared to gas vehicles.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-3">
                    <AccordionTrigger className="text-sm">How long do EV batteries last?</AccordionTrigger>
                    <AccordionContent className="text-sm text-muted-foreground">
                      Most modern EV batteries are designed to last 10-20 years or 100,000-200,000 miles before
                      significant degradation. Many manufacturers offer 8-10 year warranties on their battery packs.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-4">
                    <AccordionTrigger className="text-sm">Do EVs need transmission fluid changes?</AccordionTrigger>
                    <AccordionContent className="text-sm text-muted-foreground">
                      Most EVs don't have traditional multi-speed transmissions and don't require transmission fluid
                      changes. Some EVs have a simple reduction gear that may have sealed lubrication.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-5">
                    <AccordionTrigger className="text-sm">How often do EV brakes need service?</AccordionTrigger>
                    <AccordionContent className="text-sm text-muted-foreground">
                      Due to regenerative braking, EV friction brakes typically last much longer than those in gas
                      vehicles. Many EV owners report their original brake pads lasting 100,000 miles or more.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
                <Button variant="ghost" className="w-full mt-4" asChild>
                  <Link href="/faq">View More FAQs</Link>
                </Button>
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
                    <Link href="/incentives" className="flex items-center gap-2">
                      <Leaf className="h-4 w-4" />
                      <span>EV Tax Incentives</span>
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

            {/* Download Maintenance Guide */}
            <Card>
              <CardContent className="p-4">
                <h3 className="text-lg font-semibold mb-4">Download Maintenance Guide</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Get our comprehensive EV maintenance guide to keep with your vehicle documents.
                </p>
                <Button className="w-full" asChild>
                  <Link href="#" className="flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    <span>Download PDF Guide</span>
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
