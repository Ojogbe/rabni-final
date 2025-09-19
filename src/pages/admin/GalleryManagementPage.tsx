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
  const [files, setFiles] = useState<File[]>([]);
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

  const handleFileUploads = async (files: File[], category: string, title: string) => {
    const uploadedUrls: string[] = [];
    for (const file of files) {
      const fileExt = file.name.split('.').pop();
      const safeTitle = (title || 'item').toLowerCase().trim().replace(/[^a-z0-9\-\s_]/g, '').replace(/\s+/g, '-');
      const fileName = `${safeTitle}-${Math.random().toString(36).substring(2, 9)}`;
      const filePath = `${category}/${fileName}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('gallery')
        .upload(filePath, file);

      if (uploadError) {
        console.error('Upload error for', file.name, uploadError);
        throw uploadError;
      }

      const { data: publicUrlData } = supabase.storage
        .from('gallery')
        .getPublicUrl(filePath);

      uploadedUrls.push(publicUrlData.publicUrl);
    }
    return uploadedUrls;
  };

  const handleSaveGalleryItem = async () => {
    if (!currentGalleryItem?.title || !currentGalleryItem?.media_type || !currentGalleryItem?.category) {
      toast.error('Title, media type, and category are required.');
      return;
    }
    if (!currentGalleryItem.id && files.length === 0) {
      toast.error('At least one file is required for new gallery items.');
      return;
    }

    console.log('Selected files count:', files.length, files.map(f => f.name));
    setIsUploading(true);
    try {
      if (files.length > 0) {
        const mediaUrls = await handleFileUploads(
          files,
          currentGalleryItem.category,
          currentGalleryItem.title
        );
        console.log('Uploaded URLs:', mediaUrls);

        // Insert one row per file sequentially to avoid any batching issues
        for (const media_url of mediaUrls) {
          const { error: insertError } = await supabase
            .from('gallery_items')
            .insert({
              title: currentGalleryItem.title,
              description: currentGalleryItem.description,
              media_url,
              media_type: currentGalleryItem.media_type,
              category: currentGalleryItem.category,
              created_at: new Date().toISOString(),
            });
          if (insertError) {
            console.error('Insert error for media_url', media_url, insertError);
            throw insertError;
          }
        }

        toast.success(`${files.length} files uploaded successfully.`);
      } else if (currentGalleryItem.id) {
        const { error: updateError } = await supabase
          .from('gallery_items')
          .update({
            title: currentGalleryItem.title,
            description: currentGalleryItem.description,
            media_type: currentGalleryItem.media_type,
            category: currentGalleryItem.category,
          })
          .eq('id', currentGalleryItem.id);

        if (updateError) {
          console.error('Update error', updateError);
          throw updateError;
        }

        toast.success('Gallery item updated successfully.');
      }

      setIsDialogOpen(false);
      setCurrentGalleryItem(null);
      setFiles([]);
      fetchGalleryItems();
    } catch (err: any) {
      console.error('Save error', err);
      toast.error('Error: ' + (err?.message || 'Failed to save gallery items'));
    } finally {
      setIsUploading(false);
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
    setFiles([]);
    setIsDialogOpen(true);
  };

  const openCreateDialog = () => {
    setCurrentGalleryItem({ created_at: new Date().toISOString() });
    setFiles([]);
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
                  <label htmlFor="file-upload" className="block text-sm font-medium text-muted-foreground mb-2">
                    Upload Files (Multiple files can be selected)
                  </label>
                  <Input
                    id="file-upload"
                    type="file"
                    multiple
                    onChange={(e) => {
                      const list = e.target.files ? Array.from(e.target.files) : [];
                      console.log('File input changed, count =', list.length, list.map(f => f.name));
                      // Append to previously selected files so admins can pick in multiple rounds
                      setFiles(prev => {
                        const combined = [...prev, ...list];
                        // Optional: de-duplicate by name+size to avoid exact duplicates
                        const seen = new Set<string>();
                        const deduped: File[] = [];
                        for (const f of combined) {
                          const key = `${f.name}-${f.size}`;
                          if (!seen.has(key)) {
                            seen.add(key);
                            deduped.push(f);
                          }
                        }
                        return deduped;
                      });
                    }}
                    className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20"
                    required={!currentGalleryItem?.id && files.length === 0}
                  />
                  {files.length > 0 && (
                    <div className="mt-2 space-y-2">
                      <div className="flex items-center justify-between">
                        <p className="text-sm text-muted-foreground">Selected files: {files.length}</p>
                        <Button type="button" size="sm" variant="outline" onClick={() => setFiles([])}>Clear all</Button>
                      </div>
                      <ul className="text-xs text-muted-foreground list-disc pl-5 space-y-1 max-h-40 overflow-auto">
                        {files.map((file, index) => (
                          <li key={`${file.name}-${file.size}-${index}`} className="flex items-center gap-2">
                            <span className="truncate">{file.name}</span>
                            <Button
                              type="button"
                              size="sm"
                              variant="ghost"
                              onClick={() => setFiles(prev => prev.filter((_, i) => i !== index))}
                            >Remove</Button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
              {currentGalleryItem?.media_url && files.length === 0 && (
                <div className="text-sm text-muted-foreground">
                  Current File: <a href={currentGalleryItem.media_url} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">View Current File</a>
                </div>
              )}
            </div>
            <DialogFooter>
              <Button onClick={() => setIsDialogOpen(false)} variant="outline">Cancel</Button>
              <Button onClick={handleSaveGalleryItem} disabled={isUploading} className="btn-hero">
                {isUploading ? 'Uploading...' : `Save ${files.length > 0 ? `(${files.length}) Items` : 'Item'}`}
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
