import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { supabase } from '@/lib/supabase';
import { useNavigate } from 'react-router-dom';
import { 
  Users, 
  FileText, 
  MessageCircle, 
  Image, 
  BookOpen, 
  TrendingUp,
  Calendar,
  Eye
} from 'lucide-react';

interface DashboardStats {
  volunteers: number;
  reports: number;
  contactMessages: number;
  galleryItems: number;
  blogPosts: number;
  recentVolunteers: any[];
  recentMessages: any[];
}

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<DashboardStats>({
    volunteers: 0,
    reports: 0,
    contactMessages: 0,
    galleryItems: 0,
    blogPosts: 0,
    recentVolunteers: [],
    recentMessages: []
  });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Fetch all counts in parallel
        const [
          volunteersResult,
          reportsResult,
          contactResult,
          galleryResult,
          blogResult
        ] = await Promise.all([
          supabase.from('volunteer_applications').select('*', { count: 'exact', head: true }),
          supabase.from('reports').select('*', { count: 'exact', head: true }),
          supabase.from('contact_messages').select('*', { count: 'exact', head: true }),
          supabase.from('gallery_items').select('*', { count: 'exact', head: true }),
          supabase.from('blog_posts').select('*', { count: 'exact', head: true })
        ]);

        // Fetch recent volunteers and messages
        const [recentVolunteersResult, recentMessagesResult] = await Promise.all([
          supabase.from('volunteer_applications').select('*').order('created_at', { ascending: false }).limit(5),
          supabase.from('contact_messages').select('*').order('created_at', { ascending: false }).limit(5)
        ]);

        setStats({
          volunteers: volunteersResult.count || 0,
          reports: reportsResult.count || 0,
          contactMessages: contactResult.count || 0,
          galleryItems: galleryResult.count || 0,
          blogPosts: blogResult.count || 0,
          recentVolunteers: recentVolunteersResult.data || [],
          recentMessages: recentMessagesResult.data || []
        });
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto py-8">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }
  return (
    <div className="container mx-auto py-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-primary mb-2">Admin Dashboard</h1>
        <p className="text-muted-foreground">Overview of your RABNI management system</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Volunteers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.volunteers}</div>
            <p className="text-xs text-muted-foreground">Total applications</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Reports</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.reports}</div>
            <p className="text-xs text-muted-foreground">Published reports</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Messages</CardTitle>
            <MessageCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.contactMessages}</div>
            <p className="text-xs text-muted-foreground">Contact inquiries</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Gallery</CardTitle>
            <Image className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.galleryItems}</div>
            <p className="text-xs text-muted-foreground">Media items</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Blog Posts</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.blogPosts}</div>
            <p className="text-xs text-muted-foreground">Published posts</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Volunteers */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Recent Volunteer Applications
            </CardTitle>
          </CardHeader>
          <CardContent>
            {stats.recentVolunteers.length > 0 ? (
              <div className="space-y-4">
                {stats.recentVolunteers.map((volunteer) => (
                  <div key={volunteer.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">{volunteer.full_name}</p>
                      <p className="text-sm text-muted-foreground">{volunteer.email}</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(volunteer.created_at).toLocaleDateString()}
                      </p>
                    </div>
                    <Badge variant="outline">{volunteer.skills || 'General'}</Badge>
                  </div>
                ))}
                <Button variant="outline" className="w-full" onClick={() => navigate('/admin/dashboard/volunteers')}>
                  View All Volunteers
                </Button>
              </div>
            ) : (
              <p className="text-muted-foreground text-center py-4">No volunteer applications yet</p>
            )}
          </CardContent>
        </Card>

        {/* Recent Messages */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageCircle className="h-5 w-5" />
              Recent Contact Messages
            </CardTitle>
          </CardHeader>
          <CardContent>
            {stats.recentMessages.length > 0 ? (
              <div className="space-y-4">
                {stats.recentMessages.map((message) => (
                  <div key={message.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">{message.sender_name}</p>
                      <p className="text-sm text-muted-foreground">{message.sender_email}</p>
                      <p className="text-xs text-muted-foreground truncate max-w-48">
                        {message.message}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(message.created_at).toLocaleDateString()}
                      </p>
                    </div>
                    <Badge variant="outline">{message.subject || 'General'}</Badge>
                  </div>
                ))}
                <Button variant="outline" className="w-full" onClick={() => navigate('/admin/dashboard/contact')}>
                  View All Messages
                </Button>
              </div>
            ) : (
              <p className="text-muted-foreground text-center py-4">No contact messages yet</p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button variant="outline" onClick={() => navigate('/admin/dashboard/volunteers')}>
              <Users className="h-4 w-4 mr-2" />
              Manage Volunteers
            </Button>
            <Button variant="outline" onClick={() => navigate('/admin/dashboard/reports')}>
              <FileText className="h-4 w-4 mr-2" />
              Manage Reports
            </Button>
            <Button variant="outline" onClick={() => navigate('/admin/dashboard/gallery')}>
              <Image className="h-4 w-4 mr-2" />
              Manage Gallery
            </Button>
            <Button variant="outline" onClick={() => navigate('/admin/dashboard/contact')}>
              <MessageCircle className="h-4 w-4 mr-2" />
              View Messages
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
