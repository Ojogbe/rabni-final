import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Pencil, Trash2, PlusCircle, FileText, Download } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface Report {
  id: string;
  title: string;
  report_type: string; // Use report_type, not type
  file_url: string;
  publish_date: string; // date only, YYYY-MM-DD
  created_at: string;
}

const reportTypes = ['Annual Report', 'Financial Report', 'MEL Framework'];

export default function ReportsManagementPage() {
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentReport, setCurrentReport] = useState<Partial<Report> | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('reports')
      .select('*')
      .order('publish_date', { ascending: false });

    if (error) {
      toast.error('Error fetching reports: ' + error.message);
    } else {
      setReports(data || []);
    }
    setLoading(false);
  };

  const handleFileUpload = async (reportTitle: string) => {
    if (!file) return undefined; // No new file to upload

    const fileExt = file.name.split('.').pop();
    const filePath = `reports/${reportTitle.replace(/\s/g, '-').toLowerCase()}-${Math.random()}.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from('reports')
      .upload(filePath, file);

    if (uploadError) {
      throw uploadError;
    }

    const { data: publicUrlData } = supabase.storage
      .from('reports')
      .getPublicUrl(filePath);

    return publicUrlData.publicUrl;
  };

  const handleSaveReport = async () => {
    console.log("handleSaveReport initiated.");

    if (!currentReport?.title || !currentReport?.report_type) {
      toast.error('Title and report type are required.');
      console.log("Validation failed: Missing title or type.");
      return;
    }
    if (!currentReport.id && !file) {
      toast.error('File is required for new reports.');
      return;
    }

    setIsUploading(true); // Set loading state to true
    try {
      let file_url = currentReport.file_url;
      if (file) {
        console.log("File found for upload:", file.name, file.type, file.size);
        const file_name = `${Date.now()}-${file.name}`;
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('reports')
          .upload(file_name, file);

        if (uploadError) {
          throw uploadError;
        }
        file_url = `${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/reports/${uploadData.path}`;
        console.log("File uploaded successfully, new file_url:", file_url);
      } else {
        console.log("No new file to upload. Using existing file_url:", file_url);
      }

      let error = null;

      if (currentReport.id) {
        // Update existing report
        const { error: updateError } = await supabase
          .from('reports')
          .update({
            title: currentReport.title,
            report_type: currentReport.report_type,
            file_url: file_url,
            publish_date: (currentReport.publish_date || new Date().toISOString()).slice(0, 10),
          })
          .eq('id', currentReport.id);
        error = updateError;
      } else {
        // Create new report
        const { error: insertError } = await supabase
          .from('reports')
          .insert({
            title: currentReport.title,
            report_type: currentReport.report_type,
            file_url: file_url,
            publish_date: new Date().toISOString().slice(0, 10),
          });
        error = insertError;
      }

      if (error) {
        toast.error('Error saving report: ' + error.message);
      } else {
        toast.success('Report saved successfully.');
        setIsDialogOpen(false);
        setCurrentReport(null);
        setFile(null);
        fetchReports();
      }
    } catch (err: any) {
      toast.error('Error handling file upload: ' + err.message);
      console.error("Upload/Save error:", err);
    } finally {
      setIsUploading(false); // Reset loading state in finally block
      console.log("handleSaveReport finished. isUploading set to false.");
    }
  };

  const handleDeleteReport = async (id: string, fileUrl: string) => {
    if (!confirm('Are you sure you want to delete this report? This will also delete the file from storage.')) return;

    setLoading(true);
    try {
      const filePath = fileUrl.split('reports/')[1]; // Adjust this based on your Supabase storage path structure
      
      const { error: deleteFileError } = await supabase.storage
        .from('reports')
        .remove([filePath]);

      if (deleteFileError) {
        throw deleteFileError;
      }

      const { error: deleteItemError } = await supabase
        .from('reports')
        .delete()
        .eq('id', id);

      if (deleteItemError) {
        throw deleteItemError;
      }

      toast.success('Report and file deleted successfully.');
      fetchReports();
    } catch (err: any) {
      toast.error('Error deleting report: ' + err.message);
    }
    setLoading(false);
  };

  const openEditDialog = (report: Report) => {
    setCurrentReport(report);
    setFile(null);
    setIsDialogOpen(true);
  };

  const openCreateDialog = () => {
    setCurrentReport({ report_type: '', publish_date: new Date().toISOString().slice(0, 10) });
    setFile(null);
    setIsDialogOpen(true);
  };

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-primary">Reports Management</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={openCreateDialog} className="btn-hero">
              <PlusCircle className="mr-2 h-4 w-4" /> Upload New Report
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[800px]">
            <DialogHeader>
              <DialogTitle>{currentReport?.id ? 'Edit Report' : 'Upload New Report'}</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <Input
                placeholder="Report Title"
                value={currentReport?.title || ''}
                onChange={(e) => setCurrentReport({ ...currentReport, title: e.target.value })}
                required
              />
              <Select
                value={currentReport?.report_type || ''}
                onValueChange={(value: string) => setCurrentReport({ ...currentReport, report_type: value })}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Report Type" />
                </SelectTrigger>
                <SelectContent>
                  {reportTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              {!currentReport?.id && (
                <div>
                  <label htmlFor="file-upload" className="block text-sm font-medium text-muted-foreground mb-2">Upload PDF File</label>
                  <Input
                    id="file-upload"
                    type="file"
                    accept=".pdf"
                    onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
                    className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20"
                    required={!currentReport?.id}
                  />
                  {file && <p className="mt-2 text-sm text-muted-foreground">Selected file: {file.name}</p>}
                </div>
              )}
              {currentReport?.file_url && !file && (
                <div className="text-sm text-muted-foreground">
                  Current File: <a href={currentReport.file_url} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">View Current File</a>
                </div>
              )}
            </div>
            <DialogFooter>
              <Button onClick={() => setIsDialogOpen(false)} variant="outline">Cancel</Button>
              <Button onClick={handleSaveReport} disabled={loading} className="btn-hero">
                {loading ? 'Saving...' : 'Save Report'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {loading ? (
        <div>Loading reports...</div>
      ) : (reports.length === 0 ? (
        <p className="text-muted-foreground">No reports found. Upload a new one!</p>
      ) : (
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Published Date</TableHead>
                  <TableHead>File</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {reports.map((report) => (
                  <TableRow key={report.id}>
                    <TableCell className="font-medium">{report.title}</TableCell>
                    <TableCell>{report.report_type}</TableCell>
                    <TableCell>{new Date(report.publish_date).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <a href={report.file_url} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                        <Download className="h-4 w-4 inline-block mr-2" />
                        Download
                      </a>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => openEditDialog(report)}
                        className="mr-2"
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteReport(report.id, report.file_url)}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
