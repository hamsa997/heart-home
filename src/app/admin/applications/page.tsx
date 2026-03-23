"use client";

import { useEffect, useState } from "react";
import { INITIAL_APPLICATIONS } from "@/app/lib/mock-data";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Search, Eye, CheckCircle, XCircle } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function AdminApplications() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const formatDate = (dateString: string) => {
    if (!mounted) return "...";
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <div className="space-y-8">
      <header className="space-y-1">
        <h1 className="text-3xl font-headline font-bold">Adoption Applications</h1>
        <p className="text-muted-foreground">Review and process inquiries from prospective owners.</p>
      </header>

      <div className="grid md:grid-cols-3 gap-6">
        <Card className="rounded-2xl border-border bg-accent/5">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-accent uppercase tracking-wider">New</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold font-headline">1</div>
          </CardContent>
        </Card>
        <Card className="rounded-2xl border-border bg-primary/5">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-primary uppercase tracking-wider">Reviewing</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold font-headline">2</div>
          </CardContent>
        </Card>
        <Card className="rounded-2xl border-border bg-primary/10">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-primary uppercase tracking-wider">Approved</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold font-headline">8</div>
          </CardContent>
        </Card>
      </div>

      <Card className="rounded-2xl border-border shadow-sm overflow-hidden">
        <div className="p-4 border-b border-border bg-muted/10 flex items-center gap-4">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Filter applications by name or pet..." className="pl-10 h-10 bg-white" />
          </div>
        </div>
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-muted/5">
              <TableRow>
                <TableHead>Applicant</TableHead>
                <TableHead>Pet Interested In</TableHead>
                <TableHead>Date Submitted</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {INITIAL_APPLICATIONS.map((app) => (
                <TableRow key={app.id} className="hover:bg-muted/5 transition-colors">
                  <TableCell>
                    <div className="space-y-0.5">
                      <p className="font-bold text-foreground">{app.fullName}</p>
                      <p className="text-xs text-muted-foreground">{app.email}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="text-xs font-bold text-primary">{app.petName[0]}</span>
                      </div>
                      <span className="font-medium">{app.petName}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm">
                    {formatDate(app.submittedAt)}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="bg-accent/10 text-accent border-none font-bold">
                      {app.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-1">
                      <Button variant="ghost" size="sm" className="h-9 px-3 text-primary hover:bg-primary/10">
                        <Eye className="h-4 w-4 mr-2" /> View
                      </Button>
                      <Button variant="ghost" size="sm" className="h-9 px-3 text-accent hover:bg-accent/10">
                        <CheckCircle className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="h-9 px-3 text-destructive hover:bg-destructive/10">
                        <XCircle className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
