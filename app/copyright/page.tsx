import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Shield } from "lucide-react"

// Force static generation for this page
export const dynamic = 'force-static'

export const metadata: Metadata = {
  title: "Copyright Notice - NQESH Reviewer",
  description: "Copyright and intellectual property information for NQESH Reviewer Pro content and materials",
}

export default function CopyrightPage() {
  return (
    <div className="container max-w-4xl mx-auto py-8 px-4">
      <div className="flex items-center justify-center mb-8">
        <div className="bg-primary/10 p-3 rounded-full">
          <Shield className="h-8 w-8 text-primary" />
        </div>
      </div>
      
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">Copyright Notice</h1>
        <p className="text-muted-foreground">
          Intellectual property and usage information for NQESH Reviewer Pro
        </p>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Ownership Statement</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>
            All questions, answers, explanations, and other review materials presented on NQESH Reviewer Pro are the exclusive intellectual property of Mark Anthony Llego and Eduventure Web Development Services. These materials are protected by Philippine and international copyright laws and treaties.
          </p>
          <p className="font-semibold">
            © 2025 Mark Anthony Llego and Eduventure Web Development Services. All rights reserved.
          </p>
        </CardContent>
      </Card>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>License vs. Ownership</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>
            By purchasing access to NQESH Reviewer Pro, users are not purchasing copyright ownership of any content or materials. Users are purchasing a limited, non-transferable license to access and use the materials for personal educational purposes only.
          </p>
          
          <p>This license:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Does not transfer any intellectual property rights to the user</li>
            <li>Is restricted to a single user account and cannot be shared</li>
            <li>Permits personal use only for exam preparation purposes</li>
            <li>May be revoked for violation of these terms</li>
            <li>Expires according to the terms of your purchase or subscription</li>
          </ul>
          
          <p>
            Upon termination of your access, either through subscription expiration or account termination, you must cease all use of downloaded or saved materials and destroy any copies in your possession.
          </p>
        </CardContent>
      </Card>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Usage Restrictions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>Users of this website are explicitly prohibited from:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Copying, reproducing, or duplicating any content from NQESH Reviewer Pro</li>
            <li>Distributing, sharing, or transmitting content to unauthorized users</li>
            <li>Creating derivative works based on our review materials</li>
            <li>Selling, licensing, or commercially exploiting any content</li>
            <li>Scraping, data mining, or automated collection of content</li>
            <li>Removing any copyright notices or attributions</li>
            <li>Publicly displaying or performing content without permission</li>
            <li>Claiming ownership or authorship of the materials</li>
            <li>Using the materials to create competing products or services</li>
          </ul>
          
          <p>
            The content on NQESH Reviewer Pro is provided exclusively for personal, educational use by registered users. Access to and use of the content does not transfer any ownership rights or imply any license to use the content beyond personal study and preparation.
          </p>
        </CardContent>
      </Card>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Enforcement</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>
            Unauthorized use of our intellectual property may result in legal action, including but not limited to claims for copyright infringement, injunctive relief, and monetary damages. We actively monitor for unauthorized use of our materials and will vigorously defend our intellectual property rights.
          </p>
          <p>
            Violations may also result in immediate termination of access without refund, in addition to any legal remedies pursued.
          </p>
          <Separator className="my-4" />
          <p>
            For inquiries regarding licensing or permitted uses, please contact:
          </p>
          <p className="font-medium">support@nqesh.com</p>
          <p className="text-sm text-muted-foreground mt-6">
            This copyright notice was last updated on April 21, 2025
          </p>
        </CardContent>
      </Card>
    </div>
  )
}