import React, { useState, useRef } from 'react';
import { useToast } from '@/hooks/use-toast';

interface ImageUploaderProps {
  onImageUploaded: (imageUrl: string) => void;
  currentImage?: string;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageUploaded, currentImage }) => {
  const [isUploading, setIsUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(currentImage || null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  // Detect if we're running on Netlify
  const isNetlify = window.location.hostname.includes('.netlify.app') || 
                   window.location.hostname.includes('.netlify.com');

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Create preview
    const reader = new FileReader();
    reader.onload = (event) => {
      setPreview(event.target?.result as string);
    };
    reader.readAsDataURL(file);

    setIsUploading(true);
    
    try {
      if (isNetlify) {
        // Wait for preview to be set
        setTimeout(() => {
          // For Netlify, use the preview directly (contains base64 image data)
          if (preview) {
            onImageUploaded(preview);
            toast({
              title: 'Image Ready',
              description: 'The image has been processed and is ready to use.',
            });
          } else {
            toast({
              title: 'Processing Image',
              description: 'The image is being processed. Please wait a moment.',
            });
            
            // Give time for preview to update, then try again
            setTimeout(() => {
              const currentPreview = document.querySelector('img[alt="Preview"]')?.getAttribute('src');
              if (currentPreview) {
                onImageUploaded(currentPreview);
                toast({
                  title: 'Image Ready',
                  description: 'The image has been processed and is ready to use.',
                });
              } else {
                toast({
                  title: 'Processing Failed',
                  description: 'Failed to process the image. Please try again.',
                  variant: 'destructive',
                });
              }
            }, 500);
          }
          setIsUploading(false);
        }, 300); // Small delay to allow preview to update
      } else {
        // Local development - upload to server
        try {
          const formData = new FormData();
          formData.append('image', file);
          
          const response = await fetch('/api/upload', {
            method: 'POST',
            body: formData,
          });

          if (!response.ok) {
            throw new Error('Upload failed');
          }

          const data = await response.json();
          
          if (data && data.success) {
            onImageUploaded(data.filePath || data.fullUrl);
            toast({
              title: 'Image Uploaded',
              description: 'The image has been uploaded successfully.',
            });
          } else {
            throw new Error((data && data.error) || 'Upload failed');
          }
        } catch (error) {
          console.error('Server upload error:', error);
          
          // If server upload fails, use the preview as fallback
          if (preview) {
            onImageUploaded(preview);
            toast({
              title: 'Using Local Version',
              description: 'Server upload failed, using local image instead.',
            });
          } else {
            toast({
              title: 'Upload Failed',
              description: error instanceof Error ? error.message : 'An unknown error occurred',
              variant: 'destructive',
            });
          }
        } finally {
          setIsUploading(false);
        }
      }
    } catch (error) {
      console.error('Image processing error:', error);
      toast({
        title: 'Upload Failed',
        description: error instanceof Error ? error.message : 'An unknown error occurred',
        variant: 'destructive',
      });
      // Reset preview if upload failed
      setPreview(currentImage || null);
      setIsUploading(false);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-3">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />
      
      <div 
        onClick={triggerFileInput}
        className="border-2 border-dashed border-gray-300 rounded-md p-4 text-center cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors relative"
      >
        {preview ? (
          <div className="relative">
            <img 
              src={preview} 
              alt="Preview" 
              className="max-h-48 mx-auto object-contain" 
            />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity bg-black bg-opacity-50 text-white">
              Click to change
            </div>
          </div>
        ) : (
          <div className="py-8">
            <i className="fas fa-cloud-upload-alt text-3xl text-gray-400 mb-2"></i>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Click to upload an image
            </p>
            <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
              JPG, PNG, GIF up to 5MB
            </p>
          </div>
        )}
        
        {isUploading && (
          <div className="absolute inset-0 flex items-center justify-center bg-white dark:bg-gray-800 bg-opacity-75 dark:bg-opacity-75">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-wine-red"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageUploader;