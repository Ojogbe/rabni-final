import { useState, useEffect } from "react";
import { ArrowLeft, Play, Download, Calendar, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Expand, PlayCircle, Image as ImageIcon } from "lucide-react";
import heroImage from "@/assets/hero-education.jpg";
import communityImage from "@/assets/community-impact.jpg";
import FadeInOnScroll from "@/components/FadeInOnScroll";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

interface GalleryItem {
  id: string;
  title: string;
  description?: string;
  media_url: string;
  media_type: 'photo' | 'video';
  category: string;
  created_at: string;
  location?: string;
}

export default function GalleryPage() {
  const [categories, setCategories] = useState<string[]>(['All']);
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);

  useEffect(() => {
    fetchGalleryData();
  }, []);

  const fetchGalleryData = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('gallery_items')
      .select('*')
      .order('created_at', { ascending: false }); // Changed from uploaded_at to created_at

    if (error) {
      toast.error("Error fetching gallery items: " + error.message);
    } else {
      setGalleryItems(data || []);
      const uniqueCategories = Array.from(new Set(data?.map(item => item.category))) as string[];
      setCategories(['All', ...uniqueCategories]);
    }
    setLoading(false);
  };

  const filteredItems = selectedCategory === "All"
    ? galleryItems 
    : galleryItems.filter(item => item.category === selectedCategory);

  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-primary py-20 lg:py-32">
        <div className="container-padding max-w-7xl mx-auto text-center">
          <FadeInOnScroll>
            <h1 className="display-text text-primary-foreground mb-4">Gallery</h1>
            <p className="text-lg md:text-xl text-primary-foreground max-w-3xl mx-auto opacity-90">
              Witness the transformation happening in communities across Nigeria through our programs and initiatives.
            </p>
          </FadeInOnScroll>
        </div>
      </section>

      {/* Category Filter and Gallery Grid */}
      <section className="section-spacing">
        <div className="container-padding max-w-7xl mx-auto">
          <FadeInOnScroll delay={100}>
            <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full max-w-5xl mx-auto mb-12">
              <TabsList className="flex flex-wrap justify-center gap-2 bg-background p-1 rounded-md shadow-sm">
            {categories.map((category) => (
                  <TabsTrigger 
                    key={category} 
                    value={category} 
                    className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-sm rounded-md transition-all text-sm font-medium px-4 py-2"
                  >
                    {category}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </FadeInOnScroll>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {loading ? (
              <div className="col-span-full text-center text-muted-foreground">Loading gallery...</div>
            ) : filteredItems.length === 0 ? (
              <div className="col-span-full text-center text-muted-foreground">No items found in this category.</div>
            ) : (
              filteredItems.map((item, index) => (
                <FadeInOnScroll key={item.id} delay={index * 100}>
                  <Card className="ngo-card overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col h-full">
                    <CardContent className="p-0 flex-1 flex flex-col">
                      <div className="relative h-48 bg-muted group">
                        {item.media_type === 'photo' ? (
                          <img
                            src={item.media_url}
                            alt={item.title}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <video
                            src={item.media_url}
                            title={item.title}
                            className="w-full h-full object-cover"
                            preload="metadata"
                          />
                        )}
                        <Badge className="absolute top-2 left-2 bg-primary text-primary-foreground px-2 py-1 rounded-full text-xs font-semibold">
                          {item.category}
                  </Badge>
                        {item.media_type === 'video' && (
                          <PlayCircle className="absolute inset-0 m-auto h-16 w-16 text-white/80 group-hover:text-white transition-colors cursor-pointer" />
                        )}
                </div>
                      <div className="p-4 flex-1 flex flex-col">
                  <h3 className="text-lg font-semibold text-primary mb-2">{item.title}</h3>
                        <p className="text-sm text-muted-foreground mb-3 flex-1">{item.description}</p>
                        <div className="mt-auto flex justify-between items-center text-muted-foreground text-sm">
                          <div className="flex items-center space-x-1">
                            <Calendar className="h-4 w-4" />
                            <span>{new Date(item.created_at).toLocaleDateString()}</span>
                          </div>
                          {/* Placeholder for location if available in data, assuming it's dynamic */}
                          {item.location && (
                            <div className="flex items-center space-x-1">
                              <MapPin className="h-4 w-4" />
                              <span>{item.location}</span>
                    </div>
                          )}
                    </div>
                  </div>
                </CardContent>
              </Card>
                </FadeInOnScroll>
              ))
            )}
          </div>

          {/* Dialog for individual item view */}
          <Dialog open={!!selectedItem} onOpenChange={() => setSelectedItem(null)}>
            <DialogContent className="max-w-[90vw] h-[90vh] p-0 overflow-hidden">
              {selectedItem?.media_type === 'photo' ? (
                <img src={selectedItem.media_url} alt={selectedItem.title} className="w-full h-full object-contain" />
              ) : (
                <video src={selectedItem?.media_url} title={selectedItem?.title} controls className="w-full h-full object-contain" />
              )}
            </DialogContent>
          </Dialog>
        </div>
      </section>
    </>
  );
}