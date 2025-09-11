import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Pencil, Trash2, PlusCircle, UploadCloud, Video, Image as ImageIcon } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface GalleryItem {
  id: string;
  title: string;
  description: string;
  media_url: string;
  media_type: 'photo' | 'video';
  category: 'Programs' | 'Events' | 'Bootcamps' | 'Outreach';
  created_at: string;
}

const categories = ['Programs', 'Events', 'Bootcamps', 'Outreach'];

export default function GalleryManagementPage() {
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentGalleryItem, setCurrentGalleryItem] = useState<Partial<GalleryItem> | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  useEffect(() => {
    fetchGalleryItems();
  }, []);

  const fetchGalleryItems = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('gallery_items')
      .select('*')
      .order('created_at', { ascending: false }); // Changed from uploaded_at to created_at

    if (error) {
      toast.error('Error fetching gallery items: ' + error.message);
    } else {
      setGalleryItems(data || []);
    }
    setLoading(false);
  };

  const handleFileUpload = async (item: Partial<GalleryItem>) => {
    if (!file) return item.media_url; // No new file to upload, return existing URL

    const fileExt = file.name.split('.').pop();
    const filePath = `${item.category}/${item.title}-${Math.random()}.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from('gallery')
      .upload(filePath, file);

    if (uploadError) {
      throw uploadError;
    }

    const { data: publicUrlData } = supabase.storage
      .from('gallery')
      .getPublicUrl(filePath);

    return publicUrlData.publicUrl;
  };

  const handleSaveGalleryItem = async () => {
    if (!currentGalleryItem?.title || !currentGalleryItem?.media_type || !currentGalleryItem?.category) {
      toast.error('Title, media type, and category are required.');
      return;
    }
    if (!currentGalleryItem.id && !file) {
      toast.error('File is required for new gallery items.');
      return;
    }

    setIsUploading(true); // Set loading state to true
    try {
      let media_url = currentGalleryItem.media_url;
      if (file) {
        media_url = await handleFileUpload(currentGalleryItem);
      }

      let error = null;

      if (currentGalleryItem.id) {
        // Update existing item
        const { error: updateError } = await supabase
          .from('gallery_items')
          .update({
            title: currentGalleryItem.title,
            description: currentGalleryItem.description,
            media_url: media_url,
            media_type: currentGalleryItem.media_type,
            category: currentGalleryItem.category,
          })
          .eq('id', currentGalleryItem.id);
        error = updateError;
      } else {
        // Create new item
        const { error: insertError } = await supabase
          .from('gallery_items')
          .insert({
            title: currentGalleryItem.title,
            description: currentGalleryItem.description,
            media_url: media_url,
            media_type: currentGalleryItem.media_type,
            category: currentGalleryItem.category,
            created_at: new Date().toISOString(), // Changed from uploaded_at to created_at
          });
        error = insertError;
      }

      if (error) {
        toast.error('Error saving gallery item: ' + error.message);
      } else {
        toast.success('Gallery item saved successfully.');
        setIsDialogOpen(false);
        setCurrentGalleryItem(null);
        setFile(null);
        fetchGalleryItems();
      }
    } catch (err: any) {
      toast.error('Error handling file upload: ' + err.message);
    } finally {
      setIsUploading(false); // Reset loading state in finally block
    }
  };

  const handleDeleteGalleryItem = async (id: string, fileUrl: string) => {
    if (!confirm('Are you sure you want to delete this gallery item? This will also delete the file from storage.')) return;

    setLoading(true);
    try {
      // Extract file path from public URL
      const filePath = fileUrl.split('gallery/')[1]; // Adjust this based on your Supabase storage path structure
      
      const { error: deleteFileError } = await supabase.storage
        .from('gallery')
        .remove([filePath]);

      if (deleteFileError) {
        throw deleteFileError;
      }

      const { error: deleteItemError } = await supabase
        .from('gallery_items')
        .delete()
        .eq('id', id);

      if (deleteItemError) {
        throw deleteItemError;
      }

      toast.success('Gallery item and file deleted successfully.');
      fetchGalleryItems();
    } catch (err: any) {
      toast.error('Error deleting gallery item: ' + err.message);
    }
    setLoading(false);
  };

  const openEditDialog = (item: GalleryItem) => {
    setCurrentGalleryItem(item);
    setFile(null);
    setIsDialogOpen(true);
  };

  const openCreateDialog = () => {
    setCurrentGalleryItem({ created_at: new Date().toISOString() }); // Changed from uploaded_at to created_at
    setFile(null);
    setIsDialogOpen(true);
  };

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-primary">Gallery Management</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={openCreateDialog} className="btn-hero">
              <PlusCircle className="mr-2 h-4 w-4" /> Add New Item
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[800px]">
            <DialogHeader>
              <DialogTitle>{currentGalleryItem?.id ? 'Edit Gallery Item' : 'Create New Gallery Item'}</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <Input
                placeholder="Title"
                value={currentGalleryItem?.title || ''}
                onChange={(e) => setCurrentGalleryItem({ ...currentGalleryItem, title: e.target.value })}
                required
              />
              <Textarea
                placeholder="Description (optional)"
                value={currentGalleryItem?.description || ''}
                onChange={(e) => setCurrentGalleryItem({ ...currentGalleryItem, description: e.target.value })}
                className="min-h-[100px]"
              />
              <Select
                value={currentGalleryItem?.category || ''}
                onValueChange={(value) => setCurrentGalleryItem({ ...currentGalleryItem, category: value as GalleryItem['category'] })}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select
                value={currentGalleryItem?.media_type || ''}
                onValueChange={(value: 'photo' | 'video') => setCurrentGalleryItem({ ...currentGalleryItem, media_type: value })}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Media Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="photo">Photo</SelectItem>
                  <SelectItem value="video">Video</SelectItem>
                </SelectContent>
              </Select>
              
              {!currentGalleryItem?.id && (
                <div>
                  <label htmlFor="file-upload" className="block text-sm font-medium text-muted-foreground mb-2">Upload File</label>
                  <Input
                    id="file-upload"
                    type="file"
                    onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
                    className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20"
                    required={!currentGalleryItem?.id}
                  />
                  {file && <p className="mt-2 text-sm text-muted-foreground">Selected file: {file.name}</p>}
                </div>
              )}
              {currentGalleryItem?.media_url && !file && (
                <div className="text-sm text-muted-foreground">
                  Current File: <a href={currentGalleryItem.media_url} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">View Current File</a>
                </div>
              )}
            </div>
            <DialogFooter>
              <Button onClick={() => setIsDialogOpen(false)} variant="outline">Cancel</Button>
              <Button onClick={handleSaveGalleryItem} disabled={isUploading} className="btn-hero">
                {isUploading ? 'Saving...' : 'Save Item'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {loading ? (
        <div>Loading gallery items...</div>
      ) : (galleryItems.length === 0 ? (
        <p className="text-muted-foreground">No gallery items found. Add a new one!</p>
      ) : (
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>File</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {galleryItems.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.title}</TableCell>
                    <TableCell>{item.category}</TableCell>
                    <TableCell>
                      {item.media_type === 'photo' ? <ImageIcon className="h-4 w-4" /> : <Video className="h-4 w-4" />}
                    </TableCell>
                    <TableCell>
                      <a href={item.media_url} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                        {item.media_url.split('/').pop()}
                      </a>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => openEditDialog(item)}
                        className="mr-2"
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteGalleryItem(item.id, item.media_url)}
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
