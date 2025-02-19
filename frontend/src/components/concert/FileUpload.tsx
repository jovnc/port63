import { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { FormControl, FormDescription, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { cn } from '@/lib/utils'
import { FileIcon } from 'lucide-react'


interface FileUploadProps {
  onChange: (file: File | null) => void
  value: File | null
  accept: string
}

export function FileUpload({ onChange, value, accept }: FileUploadProps) {
  const [preview, setPreview] = useState<string | null>(null)

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0]
    onChange(file)
    const reader = new FileReader()
    reader.onload = (e) => {
      setPreview(e.target?.result as string)
    }
    reader.readAsDataURL(file)
  }, [onChange])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { [accept]: ['.jpg', '.png', 'jpeg'] },
    maxFiles: 1,
  })

  return (
    <FormItem>
      <FormLabel>Image</FormLabel>
      <FormControl>
        <div className="flex space-x-4">
          <div
            {...getRootProps()}
            className={cn(
              "flex-1 flex items-center justify-center w-full p-6 border-2 border-dashed rounded-md cursor-pointer",
              isDragActive ? "border-primary" : "border-gray-300"
            )}
          >
            <input {...getInputProps()} />
            {value ? (
              <p className='text-xs text-muted-foreground'>{value.name}</p>
            ) : (
              <p className='text-xs text-muted-foreground'>Drag and drop an image file here, or click to select one</p>
            )}
          </div>
          {preview && (
            <div className="w-32 h-32 border rounded-md overflow-hidden flex items-center justify-center bg-gray-100">
              <div className="text-center">
                <FileIcon className="mx-auto h-12 w-12 text-gray-400" />
                <p className="mt-2 text-sm text-gray-500">JPG/PNG/JPEG</p>
              </div>
            </div>
          )}
        </div>
      </FormControl>
      <FormDescription>Upload a JPG/PNG/JEG file (max 4MB).</FormDescription>
      <FormMessage />
    </FormItem>
  )
}
