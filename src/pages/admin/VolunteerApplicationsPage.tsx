import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Eye, Download, Mail } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';

interface VolunteerApplication {
  id: string;
  full_name: string;
  email: string;
  phone?: string;
  skills: string;
  availability: string;
  why_interested: string;
  cv_url?: string;
  created_at: string;
}

export default function VolunteerApplicationsPage() {
  const [applications, setApplications] = useState<VolunteerApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [currentApplication, setCurrentApplication] = useState<VolunteerApplication | null>(null);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('volunteer_applications')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      toast.error('Error fetching volunteer applications: ' + error.message);
    } else {
      setApplications(data || []);
    }
    setLoading(false);
  };

  const openViewDialog = (application: VolunteerApplication) => {
    setCurrentApplication(application);
    setIsViewDialogOpen(true);
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold text-primary mb-6">Volunteer Applications</h1>

      {loading ? (
        <div>Loading applications...</div>
      ) : (applications.length === 0 ? (
        <p className="text-muted-foreground">No volunteer applications received yet.</p>
      ) : (
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Full Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Submitted At</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {applications.map((app) => (
                  <TableRow key={app.id}>
                    <TableCell className="font-medium">{app.full_name}</TableCell>
                    <TableCell>{app.email}</TableCell>
                    <TableCell>{new Date(app.created_at).toLocaleDateString()}</TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => openViewDialog(app)}
                        className="mr-2"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      {app.cv_url && (
                        <a href={app.cv_url} target="_blank" rel="noopener noreferrer">
                          <Button variant="ghost" size="sm">
                            <Download className="h-4 w-4" />
                          </Button>
                        </a>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      ))}

      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Volunteer Application Details</DialogTitle>
            <DialogDescription>
              Review the full application details submitted by {currentApplication?.full_name}.
            </DialogDescription>
          </DialogHeader>
          {currentApplication && (
            <div className="grid gap-4 py-4 text-muted-foreground">
              <p><strong>Full Name:</strong> {currentApplication.full_name}</p>
              <p><strong>Email:</strong> <a href={`mailto:${currentApplication.email}`} className="text-primary hover:underline">{currentApplication.email}</a></p>
              {currentApplication.phone && <p><strong>Phone:</strong> {currentApplication.phone}</p>}
              <p><strong>Skills:</strong> {currentApplication.skills}</p>
              <p><strong>Availability:</strong> {currentApplication.availability}</p>
              <p><strong>Why Interested:</strong> {currentApplication.why_interested}</p>
              {currentApplication.cv_url && (
                <p>
                  <strong>CV:</strong> <a href={currentApplication.cv_url} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline"><Download className="h-4 w-4 inline-block mr-2" /> Download CV</a>
                </p>
              )}
              <p className="text-sm text-right text-gray-500">Submitted on: {new Date(currentApplication.created_at).toLocaleString()}</p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
