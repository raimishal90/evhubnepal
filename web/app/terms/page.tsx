import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Shield, FileText, Users, AlertTriangle } from "lucide-react"

export default function TermsPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8">
        <Button variant="ghost" size="sm" asChild className="mb-4">
          <Link href="/login" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Login
          </Link>
        </Button>

        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">Terms of Service</h1>
          <p className="text-muted-foreground text-lg">
            Last updated: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
          </p>
        </div>
      </div>

      <div className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              1. Acceptance of Terms
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              By accessing and using EV Hub Nepal ("the Service"), you accept and agree to be bound by the terms and
              provision of this agreement.
            </p>
            <p>If you do not agree to abide by the above, please do not use this service.</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              2. User Accounts
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              When you create an account with us, you must provide information that is accurate, complete, and current
              at all times.
            </p>
            <p>
              You are responsible for safeguarding the password and for all activities that occur under your account.
            </p>
            <p>
              You agree not to disclose your password to any third party and to take sole responsibility for any
              activities or actions under your account.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              3. Vehicle Listings and Marketplace
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              EV Hub Nepal serves as a platform connecting buyers and sellers of electric vehicles. We do not own, sell,
              or manufacture the vehicles listed on our platform.
            </p>
            <p>
              All vehicle information, pricing, and availability are provided by third-party dealers and manufacturers.
              We strive to ensure accuracy but cannot guarantee the completeness or accuracy of all listings.
            </p>
            <p>
              Users are responsible for verifying vehicle details, conducting inspections, and completing transactions
              directly with sellers or authorized dealers.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              4. Prohibited Uses
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>You may not use our service:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>For any unlawful purpose or to solicit others to perform unlawful acts</li>
              <li>
                To violate any international, federal, provincial, or state regulations, rules, laws, or local
                ordinances
              </li>
              <li>
                To infringe upon or violate our intellectual property rights or the intellectual property rights of
                others
              </li>
              <li>To harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate</li>
              <li>To submit false or misleading information</li>
              <li>To upload or transmit viruses or any other type of malicious code</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>5. Charging Station Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              Charging station locations, availability, and pricing information are provided by third-party operators
              and may change without notice.
            </p>
            <p>We recommend verifying charging station status and availability before traveling to any location.</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>6. Limitation of Liability</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              In no event shall EV Hub Nepal, nor its directors, employees, partners, agents, suppliers, or affiliates,
              be liable for any indirect, incidental, punitive, consequential, or special damages.
            </p>
            <p>Our liability shall not exceed the amount paid by you, if any, for accessing our service.</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>7. Termination</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              We may terminate or suspend your account immediately, without prior notice or liability, for any reason
              whatsoever, including without limitation if you breach the Terms.
            </p>
            <p>Upon termination, your right to use the service will cease immediately.</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>8. Changes to Terms</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>We reserve the right, at our sole discretion, to modify or replace these Terms at any time.</p>
            <p>
              If a revision is material, we will try to provide at least 30 days notice prior to any new terms taking
              effect.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>9. Contact Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>If you have any questions about these Terms of Service, please contact us at:</p>
            <div className="bg-muted p-4 rounded-lg">
              <p>
                <strong>Email:</strong> legal@evhubnepal.com
              </p>
              <p>
                <strong>Address:</strong> Kathmandu, Nepal
              </p>
              <p>
                <strong>Phone:</strong> +977-1-XXXXXXX
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-12 text-center">
        <Button asChild>
          <Link href="/login">Return to Login</Link>
        </Button>
      </div>
    </div>
  )
}
