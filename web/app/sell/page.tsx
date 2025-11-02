"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { CheckCircle2, Upload, Car, Bike, CalendarIcon } from "lucide-react"
import Link from "next/link"
import { getVehicleBrands } from "@/lib/vehicles"
import { cn } from "@/lib/utils"

export default function SellPage() {
  const [step, setStep] = useState(1)
  const [submitted, setSubmitted] = useState(false)
  const [brands, setBrands] = useState<string[]>([])
  const [listingType, setListingType] = useState<"sell" | "rent">("sell")
  const [vehicleType, setVehicleType] = useState<"four-wheeler" | "two-wheeler">("four-wheeler")
  const [date, setDate] = useState<Date>()

  const [formData, setFormData] = useState({
    make: "",
    model: "",
    year: "",
    trim: "",
    color: "",
    mileage: "",
    price: "",
    batteryHealth: 90,
    description: "",
    features: [] as string[],
    name: "",
    email: "",
    phone: "",
    location: "",
    preferredContact: "email",
    termsAgreed: false,
    // Rental specific fields
    rentalRate: {
      hourly: "",
      daily: "",
      weekly: "",
      monthly: "",
    },
    availableFrom: "",
    availableTo: "",
    minRentalPeriod: "1",
    securityDeposit: "",
    deliveryAvailable: false,
    deliveryFee: "",
  })

  // Fetch brands on component mount
  useState(() => {
    const fetchBrands = async () => {
      const brandsData = await getVehicleBrands()
      setBrands(brandsData)
    }

    fetchBrands()
  })

  const handleChange = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleRentalRateChange = (period: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      rentalRate: {
        ...prev.rentalRate,
        [period]: value,
      },
    }))
  }

  const handleFeatureToggle = (feature: string) => {
    setFormData((prev) => {
      const features = [...prev.features]

      if (features.includes(feature)) {
        return {
          ...prev,
          features: features.filter((f) => f !== feature),
        }
      } else {
        return {
          ...prev,
          features: [...features, feature],
        }
      }
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // In a real app, you would send the form data to your backend here
    console.log("Form submitted:", formData)

    // Show success message
    setSubmitted(true)
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const file = e.target.files?.[0]
    if (file) {
      // In a real app, you would handle file upload to your backend/storage here
      console.log(`File ${index} selected:`, file.name)
    }
  }

  // Get features based on vehicle type
  const getFeatures = () => {
    if (vehicleType === "four-wheeler") {
      return {
        exterior: ["Premium Wheels", "Panoramic Roof", "Tinted Windows", "Roof Rack", "Premium Paint"],
        interior: ["Leather Seats", "Heated Seats", "Ventilated Seats", "Premium Audio", "Rear Entertainment"],
        tech: ["Autopilot", "Full Self-Driving", "Premium Connectivity", "Home Charging Setup", "Software Updates"],
      }
    } else {
      return {
        exterior: ["Premium Wheels", "LED Lighting", "Custom Paint", "Windshield", "Storage Box"],
        interior: ["Digital Display", "USB Charging", "Bluetooth Connectivity", "Anti-theft Alarm", "Keyless Start"],
        tech: ["App Connectivity", "GPS Navigation", "Regenerative Braking", "Riding Modes", "Battery Swapping"],
      }
    }
  }

  const features = getFeatures()

  return (
    <div className="container mx-auto py-8 px-4 md:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2">List Your Electric Vehicle</h1>
          <p className="text-muted-foreground">
            Sell or rent your EV on our marketplace and connect with potential buyers or renters
          </p>
        </div>

        <Tabs
          defaultValue="sell"
          value={listingType}
          onValueChange={(value) => setListingType(value as "sell" | "rent")}
          className="mb-8"
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="sell" className="flex items-center gap-2">
              <Car className="h-4 w-4" />
              Sell Your EV
            </TabsTrigger>
            <TabsTrigger value="rent" className="flex items-center gap-2">
              <CalendarIcon className="h-4 w-4" />
              Rent Your EV
            </TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="mb-6">
          <h2 className="text-lg font-medium mb-2">Vehicle Type</h2>
          <div className="grid grid-cols-2 gap-4">
            <Button
              type="button"
              variant={vehicleType === "four-wheeler" ? "default" : "outline"}
              className="h-auto py-6 flex flex-col gap-2"
              onClick={() => setVehicleType("four-wheeler")}
            >
              <Car className="h-8 w-8" />
              <span>Four Wheeler</span>
              <span className="text-xs font-normal text-muted-foreground">Cars, SUVs, Vans</span>
            </Button>
            <Button
              type="button"
              variant={vehicleType === "two-wheeler" ? "default" : "outline"}
              className="h-auto py-6 flex flex-col gap-2"
              onClick={() => setVehicleType("two-wheeler")}
            >
              <Bike className="h-8 w-8" />
              <span>Two Wheeler</span>
              <span className="text-xs font-normal text-muted-foreground">Scooters, Motorcycles</span>
            </Button>
          </div>
        </div>

        {submitted ? (
          <Card className="text-center py-12">
            <CardContent>
              <div className="flex justify-center mb-4">
                <CheckCircle2 className="h-16 w-16 text-primary" />
              </div>
              <h2 className="text-2xl font-bold mb-2">Listing Submitted Successfully!</h2>
              <p className="text-muted-foreground mb-6">
                Thank you for listing your vehicle. Our team will review your submission and publish it soon.
              </p>
              <Button
                onClick={() => {
                  setSubmitted(false)
                  setStep(1)
                  setFormData({
                    make: "",
                    model: "",
                    year: "",
                    trim: "",
                    color: "",
                    mileage: "",
                    price: "",
                    batteryHealth: 90,
                    description: "",
                    features: [],
                    name: "",
                    email: "",
                    phone: "",
                    location: "",
                    preferredContact: "email",
                    termsAgreed: false,
                    rentalRate: {
                      hourly: "",
                      daily: "",
                      weekly: "",
                      monthly: "",
                    },
                    availableFrom: "",
                    availableTo: "",
                    minRentalPeriod: "1",
                    securityDeposit: "",
                    deliveryAvailable: false,
                    deliveryFee: "",
                  })
                }}
              >
                List Another Vehicle
              </Button>
            </CardContent>
          </Card>
        ) : (
          <>
            <div className="flex justify-between items-center mb-8">
              <div className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${step >= 1 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}
                >
                  1
                </div>
                <div className={`h-1 w-12 ${step >= 2 ? "bg-primary" : "bg-muted"}`}></div>
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${step >= 2 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}
                >
                  2
                </div>
                <div className={`h-1 w-12 ${step >= 3 ? "bg-primary" : "bg-muted"}`}></div>
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${step >= 3 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}
                >
                  3
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit}>
              {step === 1 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Vehicle Information</CardTitle>
                    <CardDescription>Tell us about your electric vehicle</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="make">Make</Label>
                        <Select value={formData.make} onValueChange={(value) => handleChange("make", value)} required>
                          <SelectTrigger id="make">
                            <SelectValue placeholder="Select make" />
                          </SelectTrigger>
                          <SelectContent>
                            {brands.length > 0 ? (
                              brands.map((brand) => (
                                <SelectItem key={brand} value={brand}>
                                  {brand}
                                </SelectItem>
                              ))
                            ) : (
                              <>
                                {vehicleType === "four-wheeler" ? (
                                  <>
                                    <SelectItem value="tesla">Tesla</SelectItem>
                                    <SelectItem value="ford">Ford</SelectItem>
                                    <SelectItem value="rivian">Rivian</SelectItem>
                                    <SelectItem value="lucid">Lucid</SelectItem>
                                    <SelectItem value="nissan">Nissan</SelectItem>
                                    <SelectItem value="other">Other</SelectItem>
                                  </>
                                ) : (
                                  <>
                                    <SelectItem value="ather">Ather</SelectItem>
                                    <SelectItem value="ola">Ola</SelectItem>
                                    <SelectItem value="tvs">TVS</SelectItem>
                                    <SelectItem value="bajaj">Bajaj</SelectItem>
                                    <SelectItem value="hero">Hero</SelectItem>
                                    <SelectItem value="other">Other</SelectItem>
                                  </>
                                )}
                              </>
                            )}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="model">Model</Label>
                        <Input
                          id="model"
                          placeholder={vehicleType === "four-wheeler" ? "e.g. Model 3" : "e.g. S1 Pro"}
                          value={formData.model}
                          onChange={(e) => handleChange("model", e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="year">Year</Label>
                        <Select value={formData.year} onValueChange={(value) => handleChange("year", value)} required>
                          <SelectTrigger id="year">
                            <SelectValue placeholder="Select year" />
                          </SelectTrigger>
                          <SelectContent>
                            {Array.from({ length: 10 }, (_, i) => (
                              <SelectItem key={i} value={(new Date().getFullYear() - i).toString()}>
                                {new Date().getFullYear() - i}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="trim">Trim/Variant</Label>
                        <Input
                          id="trim"
                          placeholder={vehicleType === "four-wheeler" ? "e.g. Long Range" : "e.g. Standard"}
                          value={formData.trim}
                          onChange={(e) => handleChange("trim", e.target.value)}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="color">Color</Label>
                        <Input
                          id="color"
                          placeholder="e.g. Pearl White"
                          value={formData.color}
                          onChange={(e) => handleChange("color", e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="mileage">Mileage (km)</Label>
                        <Input
                          id="mileage"
                          type="number"
                          placeholder="e.g. 15000"
                          value={formData.mileage}
                          onChange={(e) => handleChange("mileage", e.target.value)}
                          required
                        />
                      </div>

                      {listingType === "sell" ? (
                        <div className="space-y-2">
                          <Label htmlFor="price">Asking Price (NPR)</Label>
                          <Input
                            id="price"
                            type="number"
                            placeholder={vehicleType === "four-wheeler" ? "e.g. 3500000" : "e.g. 250000"}
                            value={formData.price}
                            onChange={(e) => handleChange("price", e.target.value)}
                            required
                          />
                        </div>
                      ) : (
                        <div className="space-y-2">
                          <Label htmlFor="securityDeposit">Security Deposit (NPR)</Label>
                          <Input
                            id="securityDeposit"
                            type="number"
                            placeholder={vehicleType === "four-wheeler" ? "e.g. 50000" : "e.g. 10000"}
                            value={formData.securityDeposit}
                            onChange={(e) => handleChange("securityDeposit", e.target.value)}
                            required={listingType === "rent"}
                          />
                        </div>
                      )}
                    </div>

                    {listingType === "rent" && (
                      <div className="space-y-4">
                        <h3 className="font-medium">Rental Rates (NPR)</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="hourlyRate">Hourly Rate</Label>
                            <Input
                              id="hourlyRate"
                              type="number"
                              placeholder={vehicleType === "four-wheeler" ? "e.g. 500" : "e.g. 200"}
                              value={formData.rentalRate.hourly}
                              onChange={(e) => handleRentalRateChange("hourly", e.target.value)}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="dailyRate">Daily Rate</Label>
                            <Input
                              id="dailyRate"
                              type="number"
                              placeholder={vehicleType === "four-wheeler" ? "e.g. 5000" : "e.g. 1500"}
                              value={formData.rentalRate.daily}
                              onChange={(e) => handleRentalRateChange("daily", e.target.value)}
                              required={listingType === "rent"}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="weeklyRate">Weekly Rate</Label>
                            <Input
                              id="weeklyRate"
                              type="number"
                              placeholder={vehicleType === "four-wheeler" ? "e.g. 30000" : "e.g. 8000"}
                              value={formData.rentalRate.weekly}
                              onChange={(e) => handleRentalRateChange("weekly", e.target.value)}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="monthlyRate">Monthly Rate</Label>
                            <Input
                              id="monthlyRate"
                              type="number"
                              placeholder={vehicleType === "four-wheeler" ? "e.g. 100000" : "e.g. 25000"}
                              value={formData.rentalRate.monthly}
                              onChange={(e) => handleRentalRateChange("monthly", e.target.value)}
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="minRentalPeriod">Minimum Rental Period (days)</Label>
                            <Select
                              value={formData.minRentalPeriod}
                              onValueChange={(value) => handleChange("minRentalPeriod", value)}
                            >
                              <SelectTrigger id="minRentalPeriod">
                                <SelectValue placeholder="Select minimum period" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="1">1 day</SelectItem>
                                <SelectItem value="2">2 days</SelectItem>
                                <SelectItem value="3">3 days</SelectItem>
                                <SelectItem value="7">1 week</SelectItem>
                                <SelectItem value="30">1 month</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="availability">Available From</Label>
                            <Popover>
                              <PopoverTrigger asChild>
                                <Button
                                  variant={"outline"}
                                  className={cn(
                                    "w-full justify-start text-left font-normal",
                                    !date && "text-muted-foreground",
                                  )}
                                >
                                  <CalendarIcon className="mr-2 h-4 w-4" />
                                  {date ? format(date, "PPP") : "Select date"}
                                </Button>
                              </PopoverTrigger>
                              <PopoverContent className="w-auto p-0">
                                <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                              </PopoverContent>
                            </Popover>
                          </div>
                        </div>

                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="deliveryAvailable"
                            checked={formData.deliveryAvailable}
                            onCheckedChange={(checked) => handleChange("deliveryAvailable", checked)}
                          />
                          <Label htmlFor="deliveryAvailable">Delivery available</Label>
                        </div>

                        {formData.deliveryAvailable && (
                          <div className="space-y-2">
                            <Label htmlFor="deliveryFee">Delivery Fee (NPR)</Label>
                            <Input
                              id="deliveryFee"
                              type="number"
                              placeholder="e.g. 1000"
                              value={formData.deliveryFee}
                              onChange={(e) => handleChange("deliveryFee", e.target.value)}
                            />
                          </div>
                        )}
                      </div>
                    )}

                    <div className="space-y-2">
                      <Label>Battery Health</Label>
                      <div className="pt-4 pb-2">
                        <Slider
                          defaultValue={[formData.batteryHealth]}
                          min={0}
                          max={100}
                          step={1}
                          onValueChange={(value) => handleChange("batteryHealth", value[0])}
                        />
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span>0%</span>
                        <span>{formData.batteryHealth}%</span>
                        <span>100%</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        placeholder="Describe your vehicle's condition, features, and any other relevant information"
                        rows={4}
                        value={formData.description}
                        onChange={(e) => handleChange("description", e.target.value)}
                        required
                      />
                    </div>

                    <div className="flex justify-end">
                      <Button type="button" onClick={() => setStep(2)}>
                        Continue
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}

              {step === 2 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Photos & Features</CardTitle>
                    <CardDescription>Upload photos and select features of your vehicle</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label>Upload Photos</Label>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {[1, 2, 3, 4, 5, 6].map((index) => (
                          <label
                            key={index}
                            className="border-2 border-dashed rounded-md p-6 flex flex-col items-center justify-center text-center cursor-pointer hover:border-primary"
                          >
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) => handleFileUpload(e, index)}
                            />
                            <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                            <p className="text-sm text-muted-foreground">
                              {index === 1 ? "Main Photo" : `Photo ${index}`}
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">Click to upload</p>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Features</Label>
                      <Tabs defaultValue="exterior">
                        <TabsList className="w-full grid grid-cols-3">
                          <TabsTrigger value="exterior">Exterior</TabsTrigger>
                          <TabsTrigger value="interior">Interior</TabsTrigger>
                          <TabsTrigger value="tech">Technology</TabsTrigger>
                        </TabsList>
                        <TabsContent value="exterior" className="space-y-4 pt-4">
                          <div className="grid grid-cols-2 gap-4">
                            {features.exterior.map((feature) => (
                              <div key={feature} className="flex items-center space-x-2">
                                <Checkbox
                                  id={feature.replace(/\s+/g, "-").toLowerCase()}
                                  checked={formData.features.includes(feature)}
                                  onCheckedChange={() => handleFeatureToggle(feature)}
                                />
                                <Label htmlFor={feature.replace(/\s+/g, "-").toLowerCase()}>{feature}</Label>
                              </div>
                            ))}
                          </div>
                        </TabsContent>
                        <TabsContent value="interior" className="space-y-4 pt-4">
                          <div className="grid grid-cols-2 gap-4">
                            {features.interior.map((feature) => (
                              <div key={feature} className="flex items-center space-x-2">
                                <Checkbox
                                  id={feature.replace(/\s+/g, "-").toLowerCase()}
                                  checked={formData.features.includes(feature)}
                                  onCheckedChange={() => handleFeatureToggle(feature)}
                                />
                                <Label htmlFor={feature.replace(/\s+/g, "-").toLowerCase()}>{feature}</Label>
                              </div>
                            ))}
                          </div>
                        </TabsContent>
                        <TabsContent value="tech" className="space-y-4 pt-4">
                          <div className="grid grid-cols-2 gap-4">
                            {features.tech.map((feature) => (
                              <div key={feature} className="flex items-center space-x-2">
                                <Checkbox
                                  id={feature.replace(/\s+/g, "-").toLowerCase()}
                                  checked={formData.features.includes(feature)}
                                  onCheckedChange={() => handleFeatureToggle(feature)}
                                />
                                <Label htmlFor={feature.replace(/\s+/g, "-").toLowerCase()}>{feature}</Label>
                              </div>
                            ))}
                          </div>
                        </TabsContent>
                      </Tabs>
                    </div>

                    <div className="flex justify-between">
                      <Button type="button" variant="outline" onClick={() => setStep(1)}>
                        Back
                      </Button>
                      <Button type="button" onClick={() => setStep(3)}>
                        Continue
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}

              {step === 3 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Contact Information</CardTitle>
                    <CardDescription>
                      Provide your contact details for potential {listingType === "sell" ? "buyers" : "renters"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                          id="name"
                          placeholder="Your full name"
                          value={formData.name}
                          onChange={(e) => handleChange("name", e.target.value)}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="Your email address"
                          value={formData.email}
                          onChange={(e) => handleChange("email", e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          placeholder="Your phone number"
                          value={formData.phone}
                          onChange={(e) => handleChange("phone", e.target.value)}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="location">Location</Label>
                        <Input
                          id="location"
                          placeholder="City, District"
                          value={formData.location}
                          onChange={(e) => handleChange("location", e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="preferred-contact">Preferred Contact Method</Label>
                      <Select
                        value={formData.preferredContact}
                        onValueChange={(value) => handleChange("preferredContact", value)}
                      >
                        <SelectTrigger id="preferred-contact">
                          <SelectValue placeholder="Select contact method" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="email">Email</SelectItem>
                          <SelectItem value="phone">Phone</SelectItem>
                          <SelectItem value="text">Text Message</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex items-center space-x-2 pt-4">
                      <Checkbox
                        id="terms"
                        checked={formData.termsAgreed}
                        onCheckedChange={(checked) => handleChange("termsAgreed", checked)}
                        required
                      />
                      <Label htmlFor="terms" className="text-sm">
                        I agree to the{" "}
                        <Link href="/terms" className="text-primary hover:underline">
                          Terms of Service
                        </Link>{" "}
                        and{" "}
                        <Link href="/privacy" className="text-primary hover:underline">
                          Privacy Policy
                        </Link>
                      </Label>
                    </div>

                    <div className="flex justify-between">
                      <Button type="button" variant="outline" onClick={() => setStep(2)}>
                        Back
                      </Button>
                      <Button type="submit" disabled={!formData.termsAgreed}>
                        Submit Listing
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </form>
          </>
        )}
      </div>
    </div>
  )
}
