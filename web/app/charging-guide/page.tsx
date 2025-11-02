import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Battery, BatteryCharging, Clock, ExternalLink, Gauge, MapPin, Zap } from "lucide-react"

export default function ChargingGuidePage() {
  return (
    <div className="container mx-auto py-8 px-4 md:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">EV Charging Guide</h1>
        <p className="text-muted-foreground">Everything you need to know about charging your electric vehicle</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {/* Hero Image */}
          <div className="relative w-full h-[300px] rounded-xl overflow-hidden mb-8">
            <Image src="/placeholder.svg?height=600&width=1200" alt="EV Charging" fill className="object-cover" />
          </div>

          {/* Introduction */}
          <div className="prose prose-lg dark:prose-invert max-w-none mb-8">
            <h2>Understanding EV Charging</h2>
            <p>
              Charging an electric vehicle is different from refueling a conventional car. Instead of filling up with
              liquid fuel, you're recharging a battery. The process is simple, but there are different charging levels,
              connector types, and considerations to be aware of.
            </p>
            <p>
              This guide will help you understand the basics of EV charging, the different types of chargers available,
              how to find charging stations, and tips for efficient charging.
            </p>
          </div>

          {/* Charging Levels */}
          <Tabs defaultValue="level1" className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Charging Levels Explained</h2>
            <TabsList className="w-full grid grid-cols-3 mb-4">
              <TabsTrigger value="level1">Level 1 Charging</TabsTrigger>
              <TabsTrigger value="level2">Level 2 Charging</TabsTrigger>
              <TabsTrigger value="dcfast">DC Fast Charging</TabsTrigger>
            </TabsList>
            <TabsContent value="level1" className="p-4 border rounded-md">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="md:w-1/3">
                  <div className="relative w-full h-[200px] rounded-md overflow-hidden">
                    <Image
                      src="/placeholder.svg?height=400&width=600"
                      alt="Level 1 Charging"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
                <div className="md:w-2/3">
                  <h3 className="text-xl font-semibold mb-2">Standard Household Outlet</h3>
                  <p className="text-muted-foreground mb-4">
                    Level 1 charging uses a standard 120-volt household outlet with a special charging cord that
                    typically comes with your EV.
                  </p>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="flex items-center gap-2">
                      <Zap className="h-5 w-5 text-primary" />
                      <span>120 volts / 12-16 amps</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Gauge className="h-5 w-5 text-primary" />
                      <span>1.3-1.9 kW power</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Battery className="h-5 w-5 text-primary" />
                      <span>2-5 miles per hour</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-5 w-5 text-primary" />
                      <span>20-40+ hours for full charge</span>
                    </div>
                  </div>
                  <p className="text-sm">
                    Best for: Overnight charging at home when you have limited daily driving needs or as a backup
                    option.
                  </p>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="level2" className="p-4 border rounded-md">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="md:w-1/3">
                  <div className="relative w-full h-[200px] rounded-md overflow-hidden">
                    <Image
                      src="/placeholder.svg?height=400&width=600"
                      alt="Level 2 Charging"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
                <div className="md:w-2/3">
                  <h3 className="text-xl font-semibold mb-2">Home and Public Charging Stations</h3>
                  <p className="text-muted-foreground mb-4">
                    Level 2 charging uses 240-volt power similar to what powers large home appliances. These can be
                    installed at home or found at public locations.
                  </p>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="flex items-center gap-2">
                      <Zap className="h-5 w-5 text-primary" />
                      <span>240 volts / 30-40 amps</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Gauge className="h-5 w-5 text-primary" />
                      <span>7.2-9.6 kW power</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Battery className="h-5 w-5 text-primary" />
                      <span>10-30 miles per hour</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-5 w-5 text-primary" />
                      <span>4-10 hours for full charge</span>
                    </div>
                  </div>
                  <p className="text-sm">
                    Best for: Primary home charging solution, workplace charging, and destination charging (shopping
                    centers, restaurants, etc.).
                  </p>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="dcfast" className="p-4 border rounded-md">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="md:w-1/3">
                  <div className="relative w-full h-[200px] rounded-md overflow-hidden">
                    <Image
                      src="/placeholder.svg?height=400&width=600"
                      alt="DC Fast Charging"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
                <div className="md:w-2/3">
                  <h3 className="text-xl font-semibold mb-2">Rapid Charging Stations</h3>
                  <p className="text-muted-foreground mb-4">
                    DC Fast Charging (sometimes called Level 3) provides high-powered direct current to your vehicle's
                    battery, bypassing the onboard charger for much faster charging.
                  </p>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="flex items-center gap-2">
                      <Zap className="h-5 w-5 text-primary" />
                      <span>400-900 volts DC</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Gauge className="h-5 w-5 text-primary" />
                      <span>50-350 kW power</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Battery className="h-5 w-5 text-primary" />
                      <span>3-20 miles per minute</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-5 w-5 text-primary" />
                      <span>20-60 minutes to 80%</span>
                    </div>
                  </div>
                  <p className="text-sm">
                    Best for: Road trips, emergency charging, and situations where you need to charge quickly.
                  </p>
                </div>
              </div>
            </TabsContent>
          </Tabs>

          {/* Connector Types */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">EV Connector Types</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="relative w-16 h-16 rounded-md overflow-hidden flex-shrink-0">
                      <Image
                        src="/placeholder.svg?height=100&width=100"
                        alt="J1772 Connector"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-semibold">J1772</h3>
                      <p className="text-sm text-muted-foreground">
                        Standard for Level 1 & 2 charging in North America
                      </p>
                    </div>
                  </div>
                  <p className="text-sm">
                    The J1772 connector is the standard for Level 1 and Level 2 charging in North America. Almost all
                    EVs sold in the US can use this connector, either directly or with an adapter.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="relative w-16 h-16 rounded-md overflow-hidden flex-shrink-0">
                      <Image
                        src="/placeholder.svg?height=100&width=100"
                        alt="CCS Connector"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-semibold">CCS (Combined Charging System)</h3>
                      <p className="text-sm text-muted-foreground">Standard for DC Fast Charging in North America</p>
                    </div>
                  </div>
                  <p className="text-sm">
                    CCS combines the J1772 connector with additional DC pins for fast charging. It's becoming the
                    standard for most new EVs in North America and Europe.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="relative w-16 h-16 rounded-md overflow-hidden flex-shrink-0">
                      <Image
                        src="/placeholder.svg?height=100&width=100"
                        alt="CHAdeMO Connector"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-semibold">CHAdeMO</h3>
                      <p className="text-sm text-muted-foreground">Japanese DC Fast Charging standard</p>
                    </div>
                  </div>
                  <p className="text-sm">
                    CHAdeMO is a DC fast charging standard developed in Japan. It's used by some Japanese EVs like the
                    Nissan Leaf, but is becoming less common in new vehicles.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="relative w-16 h-16 rounded-md overflow-hidden flex-shrink-0">
                      <Image
                        src="/placeholder.svg?height=100&width=100"
                        alt="Tesla Connector"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-semibold">Tesla NACS</h3>
                      <p className="text-sm text-muted-foreground">Tesla's proprietary connector</p>
                    </div>
                  </div>
                  <p className="text-sm">
                    Tesla uses its own connector for both Level 2 and DC fast charging (Superchargers). Tesla vehicles
                    in North America come with adapters to use J1772 chargers.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Charging Tips */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Charging Best Practices</h2>
            <div className="space-y-4">
              <div className="p-4 border rounded-md">
                <h3 className="font-semibold mb-2">Optimal Battery Range</h3>
                <p className="text-sm text-muted-foreground">
                  For everyday use, try to keep your battery between 20% and 80% charged. This range puts the least
                  stress on the battery and helps maintain its longevity. Only charge to 100% before long trips.
                </p>
              </div>
              <div className="p-4 border rounded-md">
                <h3 className="font-semibold mb-2">Charging Speed</h3>
                <p className="text-sm text-muted-foreground">
                  DC fast charging is convenient for road trips, but regular use can accelerate battery degradation. For
                  daily charging, use Level 1 or Level 2 charging when possible.
                </p>
              </div>
              <div className="p-4 border rounded-md">
                <h3 className="font-semibold mb-2">Temperature Considerations</h3>
                <p className="text-sm text-muted-foreground">
                  Extreme temperatures affect charging speed and efficiency. In cold weather, try to precondition your
                  battery before fast charging. In hot weather, try to avoid charging during the hottest part of the
                  day.
                </p>
              </div>
              <div className="p-4 border rounded-md">
                <h3 className="font-semibold mb-2">Planning for Road Trips</h3>
                <p className="text-sm text-muted-foreground">
                  Use apps like PlugShare, ChargePoint, or your vehicle's built-in navigation to plan charging stops.
                  It's often better to make several shorter charging stops than one long one, as charging speed
                  decreases as the battery fills up.
                </p>
              </div>
            </div>
          </div>

          {/* Home Charging Setup */}
          <div>
            <h2 className="text-2xl font-semibold mb-4">Setting Up Home Charging</h2>
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p>
                Home charging is the most convenient way to keep your EV charged. Here's what you need to know about
                setting up charging at home:
              </p>
              <h3>Level 1 Charging (120V)</h3>
              <p>
                The simplest option is to use the charging cord that came with your vehicle and plug it into a standard
                household outlet. This requires no installation but provides the slowest charging speed.
              </p>
              <h3>Level 2 Charging (240V)</h3>
              <p>
                For faster charging at home, you can install a Level 2 charging station (EVSE). This typically requires:
              </p>
              <ul>
                <li>A 240V electrical circuit (similar to what powers an electric dryer or oven)</li>
                <li>A dedicated 40-50 amp circuit breaker</li>
                <li>Professional installation by a licensed electrician</li>
                <li>A wall-mounted or portable charging unit</li>
              </ul>
              <p>
                Level 2 home chargers typically cost between $300-$700 for the unit, plus installation costs which can
                range from $300-$1,000 depending on your home's electrical setup.
              </p>
              <h3>Tax Incentives for Home Charging</h3>
              <p>
                Don't forget that there may be federal, state, or local incentives available for installing home
                charging equipment. Check our{" "}
                <Link href="/incentives" className="text-primary hover:underline">
                  Tax Incentives
                </Link>{" "}
                page for more information.
              </p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="sticky top-24 space-y-6">
            {/* Find Charging Stations */}
            <Card>
              <CardContent className="p-4">
                <h3 className="text-lg font-semibold mb-4">Find Charging Stations</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Use these popular apps and websites to locate charging stations near you or along your route.
                </p>
                <div className="space-y-3">
                  <Button variant="outline" className="w-full justify-start" asChild>
                    <Link
                      href="https://www.plugshare.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2"
                    >
                      <MapPin className="h-4 w-4" />
                      <span>PlugShare</span>
                      <ExternalLink className="h-3 w-3 ml-auto" />
                    </Link>
                  </Button>
                  <Button variant="outline" className="w-full justify-start" asChild>
                    <Link
                      href="https://www.chargepoint.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2"
                    >
                      <MapPin className="h-4 w-4" />
                      <span>ChargePoint</span>
                      <ExternalLink className="h-3 w-3 ml-auto" />
                    </Link>
                  </Button>
                  <Button variant="outline" className="w-full justify-start" asChild>
                    <Link
                      href="https://www.electrifyamerica.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2"
                    >
                      <MapPin className="h-4 w-4" />
                      <span>Electrify America</span>
                      <ExternalLink className="h-3 w-3 ml-auto" />
                    </Link>
                  </Button>
                  <Button variant="outline" className="w-full justify-start" asChild>
                    <Link
                      href="https://www.tesla.com/findus"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2"
                    >
                      <MapPin className="h-4 w-4" />
                      <span>Tesla Superchargers</span>
                      <ExternalLink className="h-3 w-3 ml-auto" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Charging Calculator */}
            <Card>
              <CardContent className="p-4">
                <h3 className="text-lg font-semibold mb-4">Charging Cost Calculator</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Estimate how much it costs to charge your EV at home.
                </p>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-1 block">Battery Size (kWh)</label>
                    <input type="number" defaultValue="75" className="w-full p-2 border rounded-md" />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1 block">Electricity Rate ($/kWh)</label>
                    <input type="number" defaultValue="0.15" step="0.01" className="w-full p-2 border rounded-md" />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1 block">Charging Efficiency (%)</label>
                    <input type="number" defaultValue="90" className="w-full p-2 border rounded-md" />
                  </div>
                  <Button className="w-full">Calculate</Button>
                  <div className="p-3 bg-muted rounded-md text-center">
                    <p className="text-sm text-muted-foreground">Estimated Cost</p>
                    <p className="text-xl font-bold">$12.50</p>
                    <p className="text-xs text-muted-foreground">For a full charge</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Related Resources */}
            <Card>
              <CardContent className="p-4">
                <h3 className="text-lg font-semibold mb-4">Related Resources</h3>
                <div className="space-y-3">
                  <Button variant="ghost" className="w-full justify-start" asChild>
                    <Link href="/incentives" className="flex items-center gap-2">
                      <BatteryCharging className="h-4 w-4" />
                      <span>EV Tax Incentives</span>
                    </Link>
                  </Button>
                  <Button variant="ghost" className="w-full justify-start" asChild>
                    <Link href="/maintenance" className="flex items-center gap-2">
                      <BatteryCharging className="h-4 w-4" />
                      <span>EV Maintenance Tips</span>
                    </Link>
                  </Button>
                  <Button variant="ghost" className="w-full justify-start" asChild>
                    <Link href="/blog" className="flex items-center gap-2">
                      <BatteryCharging className="h-4 w-4" />
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
