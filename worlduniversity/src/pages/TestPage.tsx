import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function TestPage() {
  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-4xl font-bold text-foreground">Tailwind Test Page</h1>
        
        <Card className="p-6">
          <CardHeader>
            <CardTitle>Color Test</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="h-20 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-semibold">Primary</span>
              </div>
              <div className="h-20 bg-secondary rounded-lg flex items-center justify-center">
                <span className="text-secondary-foreground font-semibold">Secondary</span>
              </div>
              <div className="h-20 bg-accent rounded-lg flex items-center justify-center">
                <span className="text-accent-foreground font-semibold">Accent</span>
              </div>
              <div className="h-20 bg-muted rounded-lg flex items-center justify-center">
                <span className="text-muted-foreground font-semibold">Muted</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="p-6">
          <CardHeader>
            <CardTitle>Button Test</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-wrap gap-4">
              <Button>Default Button</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="destructive">Destructive</Button>
              <Button variant="ghost">Ghost</Button>
            </div>
          </CardContent>
        </Card>

        <Card className="p-6">
          <CardHeader>
            <CardTitle>Gradient Test</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="h-32 bg-gradient-hero rounded-lg flex items-center justify-center">
                <span className="text-white font-semibold">Hero Gradient</span>
              </div>
              <div className="h-32 bg-gradient-ocean rounded-lg flex items-center justify-center">
                <span className="text-white font-semibold">Ocean Gradient</span>
              </div>
              <div className="h-32 bg-gradient-earth rounded-lg flex items-center justify-center">
                <span className="text-white font-semibold">Earth Gradient</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="p-6">
          <CardHeader>
            <CardTitle>Shadow Test</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="h-32 bg-card shadow-card rounded-lg flex items-center justify-center border">
                <span className="text-card-foreground font-semibold">Card Shadow</span>
              </div>
              <div className="h-32 bg-card shadow-hover rounded-lg flex items-center justify-center border">
                <span className="text-card-foreground font-semibold">Hover Shadow</span>
              </div>
              <div className="h-32 bg-card shadow-lg rounded-lg flex items-center justify-center border">
                <span className="text-card-foreground font-semibold">Large Shadow</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
