"use client";

import { useEffect, useState } from "react";
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
import { Search, Eye, CheckCircle, XCircle, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useCollection, useFirestore, useMemoFirebase, updateDocumentNonBlocking } from "@/firebase";
import { collection, doc } from "firebase/firestore";
import { useToast } from "@/hooks/use-toast";

export default function AdminApplications() {
  const [mounted, setMounted] = useState(false);
  const db = useFirestore();
  const { toast } = useToast();
  const appsRef = useMemoFirebase(() => collection(db, "adoptionApplications"), [db]);
  const { data: applications, isLoading } = useCollection(appsRef);

  useEffect(() => {
    setMounted(true);
  }, []);

  const formatDate = (dateString: string) => {
    if (!mounted) return "...";
    try {
      return new Date(dateString).toLocaleDateString();
    } catch {
      return "N/A";
    }
  };

  const handleStatusChange = (id: string, newStatus: string) => {
    updateDocumentNonBlocking(doc(db, "adoptionApplications", id), {
      status: newStatus,
      lastUpdatedStatusDate: new Date().toISOString(),
    });
    toast({
      title: "Status Updated",
      description: `Application is now ${newStatus}.`,
    });
  };

  const stats = {
    new: applications?.filter(a => a.status === "New").length || 0,
    reviewing: applications?.filter(a => a.status === "Reviewing").length || 0,
    approved: applications?.filter(a => a.status === "Approved").length || 0,
  };

  return (
    <div className="space-y-8">
      <header className="space-y-1">
        <h1 className="text-2xl md:text-3xl font-headline font-bold text-foreground">Adoption Applications</h1>
        <p className="text-sm md:text-base text-muted-foreground">Review and process inquiries from prospective owners.</p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
        <Card className="rounded-2xl border-border bg-accent/5">
          <CardHeader className="pb-2">
            <CardTitle className="text-[10px] md:text-sm font-medium text-accent uppercase tracking-wider">New</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl md:text-3xl font-bold font-headline">{isLoading ? "..." : stats.new}</div>
          </CardContent>
        </Card>
        <Card className="rounded-2xl border-border bg-primary/5">
          <CardHeader className="pb-2">
            <CardTitle className="text-[10px] md:text-sm font-medium text-primary uppercase tracking-wider">Reviewing</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl md:text-3xl font-bold font-headline">{isLoading ? "..." : stats.reviewing}</div>
          </CardContent>
        </Card>
        <Card className="rounded-2xl border-border bg-primary/10">
          <CardHeader className="pb-2">
            <CardTitle className="text-[10px] md:text-sm font-medium text-primary uppercase tracking-wider">Approved</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl md:text-3xl font-bold font-headline">{isLoading ? "..." : stats.approved}</div>
          </CardContent>
        </Card>
      </div>

      <Card className="rounded-2xl border-border shadow-sm overflow-hidden">
        <div className="p-4 border-b border-border bg-muted/10 flex flex-col md:flex-row items-stretch md:items-center gap-4">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Filter applications by name..." className="pl-10 h-10 bg-white" />
          </div>
        </div>
        <CardContent className="p-0 overflow-x-auto">
          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : (
            <Table className="min-w-[700px]">
              <TableHeader className="bg-muted/5">
                <TableRow>
                  <TableHead>Applicant</TableHead>
                  <TableHead className="hidden lg:table-cell">Date Submitted</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {applications?.map((app) => (
                  <TableRow key={app.id} className="hover:bg-muted/5 transition-colors">
                    <TableCell>
                      <div className="space-y-0.5 min-w-0">
                        <p className="font-bold text-foreground truncate">{app.applicantName}</p>
                        <p className="text-[10px] md:text-xs text-muted-foreground truncate">{app.applicantEmail}</p>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm hidden lg:table-cell">
                      {formatDate(app.submissionDate)}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-accent/10 text-accent border-none font-bold text-[10px] md:text-xs">
                        {app.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-1">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-8 md:h-9 px-2 md:px-3 text-primary hover:bg-primary/10"
                          onClick={() => handleStatusChange(app.id, "Reviewing")}
                        >
                          <Eye className="h-4 w-4 md:mr-2" /> <span className="hidden md:inline">Review</span>
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-8 md:h-9 px-2 text-accent hover:bg-accent/10"
                          onClick={() => handleStatusChange(app.id, "Approved")}
                        >
                          <CheckCircle className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-8 md:h-9 px-2 text-destructive hover:bg-destructive/10"
                          onClick={() => handleStatusChange(app.id, "Rejected")}
                        >
                          <XCircle className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
