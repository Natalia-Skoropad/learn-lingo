'use client';

import Image from 'next/image';
import { useRef, useState } from 'react';
import { toast } from 'react-hot-toast';

import { profileService } from '@/lib/services/profile.service';
import { useAuth } from '@/hooks/useAuth';

import ConfirmActionModal from '@/components/modals/ConfirmActionModal/ConfirmActionModal';

import css from './ProfileAvatar.module.css';

//===============================================================

type Props = {
  name: string;
  avatarUrl?: string;
  avatarPath?: string;
  onAvatarChange?: (avatarUrl?: string, avatarPath?: string) => void;
};

//===============================================================

function ProfileAvatar({ name, avatarUrl, avatarPath, onAvatarChange }: Props) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [isUploading, setIsUploading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const { updateUser } = useAuth();

  const trimmedName = name.trim() || 'User';
  const initial = trimmedName.charAt(0).toUpperCase();

  const hasAvatar = Boolean(avatarUrl);
  const isBusy = isUploading || isDeleting;

  const openFilePicker = () => {
    fileInputRef.current?.click();
  };

  const openDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    if (isDeleting) return;

    setIsDeleteModalOpen(false);
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    event.target.value = '';

    if (!file) return;

    try {
      setIsUploading(true);

      const updatedUser = await profileService.uploadAvatar(file);

      updateUser(updatedUser);

      onAvatarChange?.(updatedUser.avatarUrl, updatedUser.avatarPath);

      toast.success('Avatar updated successfully.');
    } catch (error) {
      console.error(error);

      toast.error(
        error instanceof Error
          ? error.message
          : 'Failed to update avatar. Please try again.'
      );
    } finally {
      setIsUploading(false);
    }
  };

  const handleDeleteAvatar = async () => {
    if (!avatarPath) return;

    try {
      setIsDeleting(true);

      const updatedUser = await profileService.deleteAvatar();

      updateUser(updatedUser);
      onAvatarChange?.(undefined, undefined);

      toast.success('Avatar deleted.');
      setIsDeleteModalOpen(false);
    } catch (error) {
      console.error(error);
      toast.error('Failed to delete avatar. Please try again.');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <div className={css.wrap}>
        <div className={css.avatarBox}>
          {avatarUrl ? (
            <Image
              src={avatarUrl}
              alt={`${trimmedName} avatar`}
              fill
              sizes="112px"
              className={css.image}
            />
          ) : (
            <span className={css.initial} aria-hidden="true">
              {initial}
            </span>
          )}
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          className="visually-hidden"
          onChange={handleFileChange}
        />

        <div className={css.actions}>
          <button
            type="button"
            className={css.actionBtn}
            onClick={openFilePicker}
            disabled={isBusy}
          >
            {hasAvatar ? 'Change avatar' : 'Upload avatar'}
          </button>

          {hasAvatar ? (
            <button
              type="button"
              className={css.dangerBtn}
              onClick={openDeleteModal}
              disabled={isBusy}
            >
              {isDeleting ? 'Deleting...' : 'Delete'}
            </button>
          ) : null}
        </div>

        {isUploading ? <p className={css.status}>Uploading...</p> : null}
      </div>

      {isDeleteModalOpen ? (
        <ConfirmActionModal
          title="Delete avatar"
          message="Are you sure you want to delete your avatar? This action cannot be undone."
          confirmLabel="Delete"
          cancelLabel="Cancel"
          isSubmitting={isDeleting}
          onConfirm={handleDeleteAvatar}
          onCancel={closeDeleteModal}
        />
      ) : null}
    </>
  );
}

export default ProfileAvatar;
