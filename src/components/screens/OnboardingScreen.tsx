import { useState } from 'react';
import { motion } from 'framer-motion';
import { FileUp, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useToast } from '../../hooks/use-toast';

interface OnboardingScreenProps {
  onComplete: () => void;
}

export function OnboardingScreen({ onComplete }: OnboardingScreenProps) {
  const [progress, setProgress] = useState(0);
  const { toast } = useToast();
  const [uploadedDocs, setUploadedDocs] = useState({
    id: false,
    proof: false,
    employment: false,
  });

  const handleFileUpload = (docType: keyof typeof uploadedDocs) => {
    setUploadedDocs((prev) => ({ ...prev, [docType]: true }));
    setProgress((prev) => prev + 33.33);
    
    toast({
      title: "Document uploaded successfully",
      description: "We'll verify your documents shortly.",
    });

    if (Object.values(uploadedDocs).filter(Boolean).length === 2) {
      setTimeout(onComplete, 1500);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="w-[420px] shadow-xl">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold">
              Document Verification
            </CardTitle>
            <Progress value={progress} className="h-2" />
          </CardHeader>
          <CardContent className="space-y-4">
            <DocumentUploadCard
              title="ID Verification"
              description="Upload a valid government ID"
              isUploaded={uploadedDocs.id}
              onUpload={() => handleFileUpload('id')}
            />
            <DocumentUploadCard
              title="Proof of Income"
              description="Last 3 months bank statements"
              isUploaded={uploadedDocs.proof}
              onUpload={() => handleFileUpload('proof')}
            />
            <DocumentUploadCard
              title="Employment Verification"
              description="Employment contract or pay stubs"
              isUploaded={uploadedDocs.employment}
              onUpload={() => handleFileUpload('employment')}
            />
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}

interface DocumentUploadCardProps {
  title: string;
  description: string;
  isUploaded: boolean;
  onUpload: () => void;
}

function DocumentUploadCard({
  title,
  description,
  isUploaded,
  onUpload,
}: DocumentUploadCardProps) {
  return (
    <div className="flex items-center justify-between p-4 border rounded-lg">
      <div className="space-y-1">
        <h3 className="font-medium">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      {isUploaded ? (
        <CheckCircle2 className="h-5 w-5 text-green-500" />
      ) : (
        <Button
          size="sm"
          variant="outline"
          onClick={onUpload}
          className="flex items-center gap-2"
        >
          <FileUp className="h-4 w-4" />
          Upload
        </Button>
      )}
    </div>
  );
}