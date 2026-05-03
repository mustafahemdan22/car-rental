'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { FiUploadCloud, FiCheck, FiX, FiTrash2 } from 'react-icons/fi';
import type { AddCarFormData, Messages, CloudinaryImage, UploadStatus } from '@/types';
import { t } from '@/lib/i18n';
import { FormInput } from '@/components/ui/FormInput';
import { FormSelect } from '@/components/ui/FormSelect';
import { mockUploadToCloudinary } from '@/lib/cloudinary';

interface AddCarFormProps {
  messages: Messages;
}

export function AddCarForm({ messages }: AddCarFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const [coverImage, setCoverImage] = useState<CloudinaryImage | null>(null);
  const [galleryImages, setGalleryImages] = useState<CloudinaryImage[]>([]);
  const [uploadStatus, setUploadStatus] = useState<UploadStatus>('idle');

  const { register, handleSubmit, setValue, formState: { errors, isSubmitting } } = useForm<AddCarFormData>({
    defaultValues: {
      coverImage: null,
      galleryImages: [],
    }
  });

  const onSubmit = async (data: AddCarFormData) => {
    if (!coverImage) {
      toast.error('Please upload a cover image');
      return;
    }

    await new Promise((r) => setTimeout(r, 1500));
    toast.success(t(messages, 'addCar.success'));
    setSubmitted(true);
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>, type: 'cover' | 'gallery') => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    setUploadStatus('uploading');

    try {
      if (type === 'cover') {
        const file = files[0];
        const res = await mockUploadToCloudinary(file, 'cars/featured');
        if (res.success && res.image) {
          setCoverImage(res.image);
          setValue('coverImage', res.image);
          setUploadStatus('success');
          toast.success('Cover image uploaded!');
        } else {
          setUploadStatus('error');
          toast.error(res.error || 'Failed to upload image');
        }
      } else {
        // Upload multiple gallery images
        const uploaded: CloudinaryImage[] = [...galleryImages];
        for (let i = 0; i < files.length; i++) {
          if (uploaded.length >= 4) {
            toast.error('Maximum 4 gallery images allowed');
            break;
          }
          const res = await mockUploadToCloudinary(files[i], 'cars/gallery');
          if (res.success && res.image) {
            uploaded.push(res.image);
          }
        }
        setGalleryImages(uploaded);
        setValue('galleryImages', uploaded);
        setUploadStatus('success');
        toast.success('Gallery images uploaded!');
      }
    } catch {
      setUploadStatus('error');
      toast.error('Error uploading image');
    }
  };

  const removeCoverImage = () => {
    setCoverImage(null);
    setValue('coverImage', null);
    setUploadStatus('idle');
  };

  const removeGalleryImage = (index: number) => {
    const updated = galleryImages.filter((_, i) => i !== index);
    setGalleryImages(updated);
    setValue('galleryImages', updated);
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center py-16 text-center">
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-success/10">
          <FiCheck className="h-8 w-8 text-success" />
        </div>
        <h3 className="mb-2 text-xl font-bold text-warm-900 dark:text-warm-50">
          {t(messages, 'addCar.success')}
        </h3>
        <p className="max-w-md text-sm text-warm-500 dark:text-warm-400">
          {t(messages, 'addCar.successMessage')}
        </p>
      </div>
    );
  }

  const typeOptions = ['sedan', 'suv', 'sports', 'luxury', 'economy', 'van'].map((v) => ({
    value: v, label: t(messages, `cars.${v}`),
  }));
  const fuelOptions = ['petrol', 'diesel', 'electric', 'hybrid'].map((v) => ({
    value: v, label: t(messages, `cars.${v}`),
  }));

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      {/* Car Information */}
      <section>
        <h3 className="mb-4 text-lg font-semibold text-warm-900 dark:text-warm-50">
          {t(messages, 'addCar.carInfo')}
        </h3>
        <div className="grid gap-4 sm:grid-cols-2">
          <FormInput label={t(messages, 'addCar.carName')} required register={register('carName', { required: t(messages, 'addCar.required') })} error={errors.carName} />
          <FormInput label={t(messages, 'addCar.brand')} required register={register('brand', { required: t(messages, 'addCar.required') })} error={errors.brand} />
          <FormInput label={t(messages, 'addCar.year')} type="number" required register={register('year', { required: t(messages, 'addCar.required'), valueAsNumber: true })} error={errors.year} />
          <FormSelect label={t(messages, 'addCar.type')} options={typeOptions} required register={register('type', { required: t(messages, 'addCar.required') })} error={errors.type} />
          <FormInput label={t(messages, 'addCar.seats')} type="number" required register={register('seats', { required: t(messages, 'addCar.required'), valueAsNumber: true })} error={errors.seats} />
          <FormSelect label={t(messages, 'addCar.fuelType')} options={fuelOptions} required register={register('fuelType', { required: t(messages, 'addCar.required') })} error={errors.fuelType} />
          <FormInput label={t(messages, 'addCar.pricePerKm')} type="number" step="0.01" required register={register('pricePerKm', { required: t(messages, 'addCar.required'), valueAsNumber: true })} error={errors.pricePerKm} />
        </div>
        <div className="mt-4">
          <label className="mb-1.5 block text-sm font-medium text-warm-700 dark:text-warm-300">{t(messages, 'addCar.description')}</label>
          <textarea
            {...register('description')}
            rows={3}
            placeholder={t(messages, 'addCar.descriptionPlaceholder')}
            className="w-full rounded-lg border border-warm-200 bg-white px-3 py-2.5 text-sm placeholder:text-warm-400 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 dark:border-warm-700 dark:bg-warm-800 dark:text-warm-100"
          />
        </div>
      </section>

      {/* Cloudinary Upload Requirement Component */}
      <section>
        <h3 className="mb-4 text-lg font-semibold text-warm-900 dark:text-warm-50">
          {t(messages, 'addCar.uploadImages')}
        </h3>

        <div className="grid gap-6 sm:grid-cols-2">
          {/* Cover Image Upload (Cloudinary Ready) */}
          <div className="flex flex-col gap-3">
            <label className="text-sm font-semibold text-warm-700 dark:text-warm-200">
              Cover Image (16:9 recommended)
            </label>
            {coverImage ? (
              <div className="relative aspect-video overflow-hidden rounded-xl border border-warm-200 bg-warm-100 dark:border-warm-800 dark:bg-warm-800/60 flex items-center justify-center group">
                <span className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full cursor-pointer opacity-0 group-hover:opacity-100 transition duration-200" onClick={removeCoverImage}>
                  <FiTrash2 className="h-4 w-4" />
                </span>
                <span className="text-xs font-semibold px-3 py-1 bg-primary-500 text-white rounded-full absolute bottom-3 left-3 shadow">Cover Image</span>
                <p className="text-xs text-warm-500 dark:text-warm-400">Cover uploaded: {coverImage.publicId}</p>
              </div>
            ) : (
              <label className="flex flex-col items-center justify-center aspect-video rounded-xl border-2 border-dashed border-warm-300 bg-warm-50 p-4 text-center cursor-pointer hover:border-primary-400 transition-colors dark:border-warm-700 dark:bg-warm-800/40">
                <FiUploadCloud className="mb-2 h-8 w-8 text-warm-400 group-hover:text-primary-500" />
                <span className="text-xs font-medium text-warm-600 dark:text-warm-300">
                  {uploadStatus === 'uploading' ? 'Uploading...' : 'Upload Cover'}
                </span>
                <input type="file" accept="image/*" className="hidden" onChange={(e) => handleFileUpload(e, 'cover')} />
              </label>
            )}
          </div>

          {/* Gallery Images Upload (Cloudinary Ready) */}
          <div className="flex flex-col gap-3">
            <label className="text-sm font-semibold text-warm-700 dark:text-warm-200">
              Gallery Images (up to 4)
            </label>
            <div className="grid grid-cols-2 gap-3 h-full max-h-[160px] sm:max-h-full">
              {galleryImages.map((img, i) => (
                <div key={i} className="relative aspect-video overflow-hidden rounded-xl border border-warm-200 bg-warm-100 dark:border-warm-800 dark:bg-warm-800/60 flex items-center justify-center group">
                  <span className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full cursor-pointer opacity-0 group-hover:opacity-100 transition duration-200" onClick={() => removeGalleryImage(i)}>
                    <FiX className="h-3 w-3" />
                  </span>
                  <p className="text-[10px] text-warm-500 dark:text-warm-400">Gallery image #{i + 1}</p>
                </div>
              ))}
              {galleryImages.length < 4 && (
                <label className="flex flex-col items-center justify-center aspect-video rounded-xl border-2 border-dashed border-warm-300 bg-warm-50 text-center cursor-pointer hover:border-primary-400 transition-colors dark:border-warm-700 dark:bg-warm-800/40">
                  <FiUploadCloud className="mb-1 h-6 w-6 text-warm-400 group-hover:text-primary-500" />
                  <span className="text-[10px] font-medium text-warm-600 dark:text-warm-300">Add Image</span>
                  <input type="file" accept="image/*" multiple className="hidden" onChange={(e) => handleFileUpload(e, 'gallery')} />
                </label>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section>
        <h3 className="mb-4 text-lg font-semibold text-warm-900 dark:text-warm-50">
          {t(messages, 'addCar.contactInfo')}
        </h3>
        <div className="grid gap-4 sm:grid-cols-2">
          <FormInput label={t(messages, 'addCar.ownerName')} required register={register('ownerName', { required: t(messages, 'addCar.required') })} error={errors.ownerName} />
          <FormInput label={t(messages, 'addCar.ownerPhone')} type="tel" required register={register('ownerPhone', { required: t(messages, 'addCar.required') })} error={errors.ownerPhone} />
          <FormInput label={t(messages, 'addCar.ownerEmail')} type="email" required register={register('ownerEmail', { required: t(messages, 'addCar.required') })} error={errors.ownerEmail} />
          <FormInput label={t(messages, 'addCar.city')} required register={register('city', { required: t(messages, 'addCar.required') })} error={errors.city} />
        </div>
      </section>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-lg bg-primary-500 py-3 text-sm font-semibold text-white transition-all hover:bg-primary-600 disabled:opacity-60 active:scale-[0.99]"
      >
        {isSubmitting ? t(messages, 'common.loading') : t(messages, 'addCar.submit')}
      </button>
    </form>
  );
}
