// Components
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Filter, MapPin, Briefcase, DollarSign } from 'lucide-react';

const TabTriggerItem = ({ value, label }: { value: string; label: string }) => (
  <TabsTrigger value={value} className="relative px-4 py-2 flex flex-col items-center justify-center rounded-lg text-sm font-medium transition-all duration-200 group">
    <span className="text-muted-foreground group-hover:text-primary group-data-[state=active]:text-primary">{label}</span>
  </TabsTrigger>
);

export default function Job() {
  return (
    <Tabs defaultValue="findJob" className="w-full space-y-6">
      <TabsList className="grid w-full grid-cols-3 bg-transparent border px-6 h-16">
        <TabTriggerItem value="findJob" label="Find job" />
        <TabTriggerItem value="applied" label="Applied" />
        <TabTriggerItem value="savedJobs" label="Saved jobs" />
      </TabsList>

      <TabsContent value="findJob">
        <div className="space-y-4">
          {/* Search and Filter Section */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search for jobs, companies, or keywords" className="pl-9" />
                </div>
                <Button variant="outline" className="gap-2">
                  <Filter className="h-4 w-4" />
                  Filters
                </Button>
                <Button>Search</Button>
              </div>

              {/* Quick Filters */}
              <div className="flex flex-wrap gap-2 mt-4">
                <Button variant="outline" className="gap-2">
                  <MapPin className="h-4 w-4" />
                  Remote
                </Button>
                <Button variant="outline" className="gap-2">
                  <Briefcase className="h-4 w-4" />
                  Full-time
                </Button>
                <Button variant="outline" className="gap-2">
                  <DollarSign className="h-4 w-4" />
                  $50k+
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Job Listings */}
          <div className="grid gap-4">
            {/* Job Card Example */}
            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center">
                      <Briefcase className="text-gray-500" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold">Frontend Developer</h3>
                    <p className="text-sm text-muted-foreground">TechCorp • San Francisco, CA • Remote</p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">React</span>
                      <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">TypeScript</span>
                      <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">TailwindCSS</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <p className="font-medium">$90k - $120k</p>
                    <p className="text-sm text-muted-foreground">Full-time</p>
                    <Button variant="outline" size="sm" className="mt-2">
                      Apply
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Another Job Card */}
            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center">
                      <Briefcase className="text-gray-500" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold">UX Designer</h3>
                    <p className="text-sm text-muted-foreground">DesignHub • New York, NY • Hybrid</p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      <span className="px-2 py-1 text-xs rounded-full bg-purple-100 text-purple-800">Figma</span>
                      <span className="px-2 py-1 text-xs rounded-full bg-purple-100 text-purple-800">User Research</span>
                      <span className="px-2 py-1 text-xs rounded-full bg-purple-100 text-purple-800">Prototyping</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <p className="font-medium">$80k - $110k</p>
                    <p className="text-sm text-muted-foreground">Contract</p>
                    <Button variant="outline" size="sm" className="mt-2">
                      Apply
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </TabsContent>

      {/* Other tabs content */}
      <TabsContent value="applied">
        <Card>
          <CardHeader className="text-lg font-semibold">Applied Jobs</CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Your applied jobs will appear here</p>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="savedJobs">
        <Card>
          <CardHeader className="text-lg font-semibold">Saved Jobs</CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Your saved jobs will appear here</p>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
