import { Upload, X } from "lucide-react";

export default function ProductImageUpload({ previews, isEditMode, onImageChange, onRemoveImage }) {
    return (
        <div>
            <div className="flex justify-between items-end mb-2">
                <label className="block text-sm font-medium text-gray-700">Product Images</label>
                {isEditMode && previews.length > 0 && (
                    <span className="text-xs text-amber-600 bg-amber-50 px-2 py-1 rounded">
                        Uploading new images will replace existing ones.
                    </span>
                )}
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                {previews.map((src, index) => (
                    <div key={index} className="relative aspect-square rounded-lg overflow-hidden border">
                        <img src={src} alt={`Preview ${index}`} className="w-full h-full object-cover" />
                        <button
                            type="button"
                            onClick={() => onRemoveImage(index)}
                            className="absolute top-1 right-1 bg-white/80 p-1 rounded-full text-red-500 hover:bg-white transition-colors"
                        >
                            <X size={16} />
                        </button>
                    </div>
                ))}

                <label className="flex flex-col items-center justify-center aspect-square border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
                    <div className="flex flex-col items-center justify-center p-4 text-center">
                        <Upload className="w-8 h-8 mb-2 text-gray-400" />
                        <span className="text-xs text-gray-500 font-medium">Add Image</span>
                    </div>
                    <input type="file" className="hidden" onChange={onImageChange} accept="image/*" multiple />
                </label>
            </div>
        </div>
    );
}
