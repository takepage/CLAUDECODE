import { Upload, Image, X } from 'lucide-react';

interface ImageUploadProps {
  uploadedImage: string | null;
  isAnalyzing: boolean;
  onImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemoveImage: () => void;
}

export default function ImageUpload({ uploadedImage, isAnalyzing, onImageUpload, onRemoveImage }: ImageUploadProps) {
  return (
    <div className="card p-4">
      <h3 className="text-sm font-semibold text-text-primary mb-3 flex items-center gap-2">
        <Image className="w-4 h-4" />
        이미지로 WOD 가져오기
      </h3>

      {!uploadedImage ? (
        <label className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-light-border rounded-xl cursor-pointer hover:border-primary hover:bg-primary-light/10 transition-all">
          <Upload className="w-8 h-8 text-text-tertiary mb-2" />
          <span className="text-sm text-text-secondary mb-1">이미지를 클릭하거나 드래그하여 업로드</span>
          <span className="text-xs text-text-tertiary">WOD 이미지를 자동으로 분석합니다</span>
          <input
            type="file"
            accept="image/*"
            onChange={onImageUpload}
            className="hidden"
          />
        </label>
      ) : (
        <div className="relative">
          <img src={uploadedImage} alt="Uploaded WOD" className="w-full rounded-lg border border-light-border" />
          <button
            onClick={onRemoveImage}
            className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-md hover:bg-red-50 transition-colors"
          >
            <X className="w-4 h-4 text-red-500" />
          </button>
          {isAnalyzing && (
            <div className="absolute inset-0 bg-white/90 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
                <p className="text-sm font-semibold text-text-primary">이미지 분석 중...</p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
