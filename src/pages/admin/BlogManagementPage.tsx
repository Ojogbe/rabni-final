import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Pencil, Trash2, PlusCircle } from 'lucide-react';

interface BlogPost {
  id: string;
  title: string;
  content: string;
  featured_featured_image_url?: string;
  published_at: string;
}

export default function BlogManagementPage() {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentPost, setCurrentPost] = useState<Partial<BlogPost> | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  useEffect(() => {
    fetchBlogPosts();
  }, []);

  const fetchBlogPosts = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .order('published_at', { ascending: false });

    if (error) {
      toast.error('Error fetching blog posts: ' + error.message);
    } else {
      setBlogPosts(data || []);
    }
    setLoading(false);
  };

  const handleSavePost = async () => {
    if (!currentPost?.title || !currentPost?.content) {
      toast.error('Title and content are required.');
      return;
    }

    setIsUploading(true); // Set loading state to true
    let error = null;

    try {
      if (currentPost.id) {
        // Update existing post
        const { error: updateError } = await supabase
          .from('blog_posts')
          .update({
            title: currentPost.title,
            content: currentPost.content,
            featured_image_url: currentPost.featured_image_url,
          })
          .eq('id', currentPost.id);
        error = updateError;
      } else {
        // Create new post
        const { error: insertError } = await supabase
          .from('blog_posts')
          .insert({
            title: currentPost.title,
            content: currentPost.content,
            featured_image_url: currentPost.featured_image_url,
            published_at: new Date().toISOString(),
          });
        error = insertError;
      }

      if (error) {
        toast.error('Error saving blog post: ' + error.message);
      } else {
        toast.success('Blog post saved successfully.');
        setIsDialogOpen(false);
        setCurrentPost(null);
        fetchBlogPosts();
      }
    } finally {
      setIsUploading(false); // Reset loading state in finally block
    }
  };

  const handleDeletePost = async (id: string) => {
    if (!confirm('Are you sure you want to delete this blog post?')) return;

    setLoading(true);
    const { error } = await supabase
      .from('blog_posts')
      .delete()
      .eq('id', id);

    if (error) {
      toast.error('Error deleting blog post: ' + error.message);
    } else {
      toast.success('Blog post deleted successfully.');
      fetchBlogPosts();
    }
    setLoading(false);
  };

  const openEditDialog = (post: BlogPost) => {
    setCurrentPost(post);
    setIsDialogOpen(true);
  };

  const openCreateDialog = () => {
    setCurrentPost({});
    setIsDialogOpen(true);
  };

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-primary">Blog Post Management</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={openCreateDialog} className="btn-hero">
              <PlusCircle className="mr-2 h-4 w-4" /> Add New Post
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[800px]">
            <DialogHeader>
              <DialogTitle>{currentPost?.id ? 'Edit Blog Post' : 'Create New Blog Post'}</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <Input
                placeholder="Title"
                value={currentPost?.title || ''}
                onChange={(e) => setCurrentPost({ ...currentPost, title: e.target.value })}
              />
              <Textarea
                placeholder="Body"
                value={currentPost?.content || ''}
                onChange={(e) => setCurrentPost({ ...currentPost, content: e.target.value })}
                className="min-h-[200px]"
              />
              <Input
                placeholder="Image URL (optional)"
                value={currentPost?.featured_image_url || ''}
                onChange={(e) => setCurrentPost({ ...currentPost, featured_image_url: e.target.value })}
              />
            </div>
            <DialogFooter>
              <Button onClick={() => setIsDialogOpen(false)} variant="outline">Cancel</Button>
              <Button onClick={handleSavePost} disabled={loading || isUploading} className="btn-hero">
                {isUploading ? 'Saving...' : 'Save Post'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {loading ? (
        <div>Loading blog posts...</div>
      ) : (blogPosts.length === 0 ? (
        <p className="text-muted-foreground">No blog posts found. Add a new one!</p>
      ) : (
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Published At</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {blogPosts.map((post) => (
                  <TableRow key={post.id}>
                    <TableCell className="font-medium">{post.title}</TableCell>
                    <TableCell>{new Date(post.published_at).toLocaleDateString()}</TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => openEditDialog(post)}
                        className="mr-2"
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeletePost(post.id)}
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
