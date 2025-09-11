import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Eye, Mail, Phone, User } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface ContactMessage {
  id: string;
  sender_name: string;
  sender_email: string;
  sender_phone?: string;
  subject: string;
  message: string;
  created_at: string;
}

export default function ContactMessagesPage() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [currentMessage, setCurrentMessage] = useState<ContactMessage | null>(null);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('contact_messages')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      toast.error('Error fetching contact messages: ' + error.message);
    } else {
      setMessages(data || []);
    }
    setLoading(false);
  };

  const openViewDialog = (message: ContactMessage) => {
    setCurrentMessage(message);
    setIsViewDialogOpen(true);
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold text-primary mb-6">Contact Messages</h1>

      {loading ? (
        <div>Loading messages...</div>
      ) : (messages.length === 0 ? (
        <p className="text-muted-foreground">No contact messages received yet.</p>
      ) : (
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Subject</TableHead>
                  <TableHead>Submitted At</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {messages.map((msg) => (
                  <TableRow key={msg.id}>
                    <TableCell className="font-medium">{msg.sender_name}</TableCell>
                    <TableCell>{msg.sender_email}</TableCell>
                    <TableCell>{msg.subject}</TableCell>
                    <TableCell>{new Date(msg.created_at).toLocaleDateString()}</TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => openViewDialog(msg)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
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
            <DialogTitle>Contact Message Details</DialogTitle>
            <DialogDescription>
              Full details of the message from {currentMessage?.sender_name}.
            </DialogDescription>
          </DialogHeader>
          {currentMessage && (
            <div className="grid gap-4 py-4 text-muted-foreground">
              <p><strong>Name:</strong> {currentMessage.sender_name}</p>
              <p><strong>Email:</strong> <a href={`mailto:${currentMessage.sender_email}`} className="text-primary hover:underline">{currentMessage.sender_email}</a></p>
              {currentMessage.sender_phone && <p><strong>Phone:</strong> {currentMessage.sender_phone}</p>}
              <p><strong>Subject:</strong> {currentMessage.subject}</p>
              <p><strong>Message:</strong> {currentMessage.message}</p>
              <p className="text-sm text-right text-gray-500">Submitted on: {new Date(currentMessage.created_at).toLocaleString()}</p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
