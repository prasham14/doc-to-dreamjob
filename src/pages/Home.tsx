import { useState, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Upload, FileText, ArrowRight, Briefcase } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { storage } from '@/utils/storage';

interface HomeProps {
  onNavigate: (tab: 'jobs') => void;
}

export const Home = ({ onNavigate }: HomeProps) => {
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [userProfile, setUserProfile] = useState(storage.getUserProfile());
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.type === 'application/pdf' || file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
        setResumeFile(file);
      } else {
        toast({
          title: "Invalid File Type",
          description: "Please upload a PDF or DOCX file.",
          variant: "destructive",
        });
      }
    }
  };

  const handleUpload = async () => {
    if (!resumeFile) return;

    setIsUploading(true);
    try {
      // In a real app, this would parse the resume and extract information
      // For now, we'll simulate this with mock data
      const mockUserData = {
        name: "John Doe",
        email: "john.doe@email.com",
        title: "Software Developer",
        location: "San Francisco, CA",
        skills: ["React", "TypeScript", "Node.js", "Python"],
        resumeUrl: URL.createObjectURL(resumeFile)
      };

      storage.saveUserProfile(mockUserData);
      setUserProfile(mockUserData);

      toast({
        title: "Resume Uploaded Successfully! 🎉",
        description: "We've analyzed your resume and found matching jobs.",
      });

      // Auto-navigate to jobs after successful upload
      setTimeout(() => {
        onNavigate('jobs');
      }, 2000);

    } catch (error) {
      toast({
        title: "Upload Failed",
        description: "There was an error processing your resume. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const triggerFileSelect = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/30 flex items-center justify-center p-4 pb-20">
      <div className="w-full max-w-md space-y-8">
        {/* Hero Section */}
        <div className="text-center space-y-4">
          <div className="w-20 h-20 mx-auto hero-gradient rounded-full flex items-center justify-center">
            <Briefcase className="w-10 h-10 text-white" />
          </div>
          <div className="space-y-2">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              TinCareer
            </h1>
            <p className="text-muted-foreground">
              Swipe your way to your dream job
            </p>
          </div>
        </div>

        {/* Upload Section */}
        {!userProfile ? (
          <Card className="card-swipe p-6 space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-xl font-bold">Upload Your Resume</h2>
              <p className="text-muted-foreground text-sm">
                We'll analyze your resume and find matching job opportunities
              </p>
            </div>

            {!resumeFile ? (
              <div 
                className="border-2 border-dashed border-border rounded-lg p-8 text-center cursor-pointer hover:border-primary transition-colors"
                onClick={triggerFileSelect}
              >
                <Upload className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground mb-2">
                  Click to upload your resume
                </p>
                <p className="text-xs text-muted-foreground">
                  Supports PDF and DOCX files
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-4 bg-secondary rounded-lg">
                  <FileText className="w-8 h-8 text-primary" />
                  <div className="flex-1">
                    <p className="font-medium text-sm">{resumeFile.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {(resumeFile.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" onClick={triggerFileSelect} className="flex-1">
                    Change File
                  </Button>
                  <Button 
                    onClick={handleUpload} 
                    disabled={isUploading}
                    className="flex-1 hero-gradient text-white"
                  >
                    {isUploading ? "Processing..." : "Upload & Start"}
                  </Button>
                </div>
              </div>
            )}

            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,.docx"
              onChange={handleFileSelect}
              className="hidden"
            />
          </Card>
        ) : (
          <Card className="card-swipe p-6 space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-xl font-bold">Welcome back, {userProfile.name}!</h2>
              <p className="text-muted-foreground text-sm">
                Ready to find your next opportunity?
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3 p-4 bg-secondary rounded-lg">
                <FileText className="w-8 h-8 text-success" />
                <div className="flex-1">
                  <p className="font-medium text-sm">Resume Ready</p>
                  <p className="text-xs text-muted-foreground">
                    {userProfile.title} • {userProfile.location}
                  </p>
                </div>
              </div>

              <Button 
                onClick={() => onNavigate('jobs')} 
                className="w-full hero-gradient text-white"
                size="lg"
              >
                Start Swiping Jobs
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>

              <Button 
                variant="outline" 
                onClick={triggerFileSelect}
                className="w-full"
              >
                Update Resume
              </Button>
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,.docx"
              onChange={handleFileSelect}
              className="hidden"
            />
          </Card>
        )}

        {/* Features */}
        <div className="grid grid-cols-2 gap-4 text-center">
          <div className="space-y-2">
            <div className="w-12 h-12 mx-auto bg-success/10 rounded-full flex items-center justify-center">
              <ArrowRight className="w-6 h-6 text-success" />
            </div>
            <p className="text-sm font-medium">Smart Matching</p>
            <p className="text-xs text-muted-foreground">AI-powered job recommendations</p>
          </div>
          <div className="space-y-2">
            <div className="w-12 h-12 mx-auto bg-accent/10 rounded-full flex items-center justify-center">
              <Upload className="w-6 h-6 text-accent" />
            </div>
            <p className="text-sm font-medium">Easy Apply</p>
            <p className="text-xs text-muted-foreground">One swipe application</p>
          </div>
        </div>
      </div>
    </div>
  );
};