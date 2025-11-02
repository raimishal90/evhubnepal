import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Shield, Eye, Database, Cookie, Mail, Lock } from "lucide-react"

export default function PrivacyPage() {
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
          <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
          <p className="text-muted-foreground text-lg">
            Last updated: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
          </p>
        </div>
      </div>

      <div className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              1. Information We Collect
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              We collect information you provide directly to us, such as when you create an account, make a purchase, or
              contact us for support.
            </p>
            <div className="bg-muted p-4 rounded-lg">
              <h4 className="font-semibold mb-2">Personal Information includes:</h4>
              <ul className="list-disc list-inside space-y-1">
                <li>Name and contact information</li>
                <li>Email address and phone number</li>
                <li>Account credentials</li>
                <li>Payment information</li>
                <li>Vehicle preferences and search history</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Eye className="h-5 w-5" />
              2. How We Use Your Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>We use the information we collect to:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Provide, maintain, and improve our services</li>
              <li>Process transactions and send related information</li>
              <li>Send you technical notices and support messages</li>
              <li>Communicate with you about products, services, and events</li>
              <li>Monitor and analyze trends and usage</li>
              <li>Personalize your experience on our platform</li>
              <li>Detect, investigate, and prevent fraudulent transactions</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="h-5 w-5" />
              3. Information Sharing
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              We do not sell, trade, or otherwise transfer your personal information to third parties without your
              consent, except as described in this policy.
            </p>
            <p>We may share your information with:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>
                <strong>Vehicle Dealers:</strong> When you express interest in a specific vehicle
              </li>
              <li>
                <strong>Service Providers:</strong> Who assist us in operating our platform
              </li>
              <li>
                <strong>Legal Requirements:</strong> When required by law or to protect our rights
              </li>
              <li>
                <strong>Business Transfers:</strong> In connection with a merger or acquisition
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Cookie className="h-5 w-5" />
              4. Cookies and Tracking
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>We use cookies and similar tracking technologies to collect and use personal information about you.</p>
            <div className="bg-muted p-4 rounded-lg">
              <h4 className="font-semibold mb-2">We use cookies for:</h4>
              <ul className="list-disc list-inside space-y-1">
                <li>Authentication and security</li>
                <li>Preferences and settings</li>
                <li>Analytics and performance</li>
                <li>Advertising and marketing</li>
              </ul>
            </div>
            <p>
              You can control cookies through your browser settings, but disabling cookies may affect your experience on
              our platform.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lock className="h-5 w-5" />
              5. Data Security
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              We implement appropriate technical and organizational measures to protect your personal information
              against unauthorized access, alteration, disclosure, or destruction.
            </p>
            <div className="bg-muted p-4 rounded-lg">
              <h4 className="font-semibold mb-2">Security measures include:</h4>
              <ul className="list-disc list-inside space-y-1">
                <li>Encryption of data in transit and at rest</li>
                <li>Regular security assessments</li>
                <li>Access controls and authentication</li>
                <li>Secure hosting infrastructure</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>6. Your Rights</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>You have the right to:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>
                <strong>Access:</strong> Request copies of your personal information
              </li>
              <li>
                <strong>Rectification:</strong> Request correction of inaccurate information
              </li>
              <li>
                <strong>Erasure:</strong> Request deletion of your personal information
              </li>
              <li>
                <strong>Portability:</strong> Request transfer of your information
              </li>
              <li>
                <strong>Objection:</strong> Object to processing of your information
              </li>
              <li>
                <strong>Restriction:</strong> Request restriction of processing
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>7. Data Retention</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              We retain your personal information only for as long as necessary to fulfill the purposes outlined in this
              privacy policy.
            </p>
            <p>When we no longer need your information, we will securely delete or anonymize it.</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>8. Children's Privacy</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              Our service is not intended for children under 13 years of age. We do not knowingly collect personal
              information from children under 13.
            </p>
            <p>
              If you are a parent or guardian and believe your child has provided us with personal information, please
              contact us.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>9. Changes to Privacy Policy</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              We may update this privacy policy from time to time. We will notify you of any changes by posting the new
              policy on this page.
            </p>
            <p>Changes are effective when posted on this page.</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="h-5 w-5" />
              10. Contact Us
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>If you have any questions about this Privacy Policy, please contact us:</p>
            <div className="bg-muted p-4 rounded-lg">
              <p>
                <strong>Email:</strong> privacy@evhubnepal.com
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
