import type { Metadata } from "next"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BookOpen, Brain, Building, Users } from "lucide-react"

export const metadata: Metadata = {
  title: "NQESH Reviewer for Aspiring School Heads",
  description: "Professional reviewer application for the National Qualifying Examination for School Heads (NQESH)",
  keywords: ["NQESH", "school heads", "education", "reviewer", "examination", "professional development"],
}

const categories = [
  {
    id: "school-leadership",
    title: "School Leadership",
    description: "Review questions about leadership styles, management, and school governance",
    icon: Building,
    questionCount: 25,
  },
  {
    id: "instructional-leadership",
    title: "Instructional Leadership",
    description: "Questions on curriculum implementation, teaching methodologies, and assessment",
    icon: BookOpen,
    questionCount: 30,
  },
  {
    id: "personal-and-professional-development",
    title: "Personal & Professional Development",
    description: "Topics on continuous improvement, ethics, and professional growth",
    icon: Brain,
    questionCount: 20,
  },
  {
    id: "human-resource-management",
    title: "Human Resource Management",
    description: "Questions about staff development, conflict resolution, and team building",
    icon: Users,
    questionCount: 15,
  },
]

export default function Home() {
  return (
    <div className="container max-w-4xl mx-auto py-6 px-4">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">NQESH Reviewer for Aspiring School Heads</h1>
        <p className="text-muted-foreground">
          Select a category below to start reviewing for your National Qualifying Examination
        </p>
      </div>

      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 mt-8">
        {categories.map((category) => (
          <Card key={category.id} className="overflow-hidden">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2">
                <category.icon className="h-5 w-5" />
                {category.title}
              </CardTitle>
              <CardDescription>{category.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{category.questionCount} questions to review</p>
            </CardContent>
            <CardFooter>
              <Link href={`/reviewer/${category.id}`} className="w-full">
                <Button className="w-full">Start Reviewing</Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
