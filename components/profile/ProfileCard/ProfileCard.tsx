'use client';

import { useState } from 'react';
import { toast } from 'react-hot-toast';

import type { UserProfile, ProfileEditField } from '@/types/profile';

import { profileService } from '@/lib/services/profile.service';
import { useAuth } from '@/hooks/useAuth';

import ConfirmActionModal from '@/components/modals/ConfirmActionModal/ConfirmActionModal';
import ProfileAvatar from '@/components/profile/ProfileAvatar/ProfileAvatar';
import ProfileEditModal from '@/components/profile/ProfileEditModal/ProfileEditModal';
import ProfileField from '@/components/profile/ProfileField/ProfileField';

import css from './ProfileCard.module.css';

//===============================================================

type Props = {
  profile: UserProfile;
};

//===============================================================

function formatDate(value?: string): string {
  if (!value) return 'Not available';

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return 'Not available';
  }

  return new Intl.DateTimeFormat('en', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
}

//===============================================================

function ProfileCard({ profile }: Props) {
  const { user, updateUser, resetPassword } = useAuth();

  const [localProfile, setLocalProfile] = useState<UserProfile>(profile);
  const [editingField, setEditingField] = useState<ProfileEditField | null>(
    null
  );
  const [isDeletingPhone, setIsDeletingPhone] = useState(false);
  const [isDeletePhoneModalOpen, setIsDeletePhoneModalOpen] = useState(false);
  const [isSendingPasswordEmail, setIsSendingPasswordEmail] = useState(false);

  const phoneValue = localProfile.phone?.trim() || 'Not added yet';

  const openDeletePhoneModal = () => {
    setIsDeletePhoneModalOpen(true);
  };

  const closeDeletePhoneModal = () => {
    if (isDeletingPhone) return;

    setIsDeletePhoneModalOpen(false);
  };

  const getEditingDefaultValue = (): string => {
    if (!editingField) return '';

    if (editingField === 'name') return localProfile.name;
    if (editingField === 'email') return localProfile.email;
    if (editingField === 'phone') return localProfile.phone ?? '';

    return '';
  };

  const handleUpdateProfile = async (value: string) => {
    if (!editingField) return;

    try {
      const payload =
        editingField === 'name'
          ? { name: value }
          : editingField === 'email'
          ? { email: value }
          : { phone: value };

      const updatedUser = await profileService.updateCurrent(payload);

      updateUser(updatedUser);

      setLocalProfile((prev) => ({
        ...prev,
        ...updatedUser,
        favorites: prev.favorites,
      }));

      toast.success('Profile updated successfully.');
      setEditingField(null);
    } catch (error) {
      console.error(error);

      toast.error(
        error instanceof Error
          ? error.message
          : 'Failed to update profile. Please try again.'
      );
    }
  };

  const handleDeletePhone = async () => {
    try {
      setIsDeletingPhone(true);

      const updatedUser = await profileService.updateCurrent({
        phone: null,
      });

      updateUser(updatedUser);

      setLocalProfile((prev) => ({
        ...prev,
        phone: undefined,
        updatedAt: new Date().toISOString(),
      }));

      toast.success('Phone number deleted.');
      setIsDeletePhoneModalOpen(false);
    } catch (error) {
      console.error(error);
      toast.error('Failed to delete phone number. Please try again.');
    } finally {
      setIsDeletingPhone(false);
    }
  };

  const handleSendPasswordReset = async () => {
    const email = user?.email || localProfile.email;

    try {
      setIsSendingPasswordEmail(true);

      await resetPassword({ email });

      toast.success('Password reset email sent. Please check your inbox.');
    } catch (error) {
      console.error(error);
      toast.error('Failed to send password reset email. Please try again.');
    } finally {
      setIsSendingPasswordEmail(false);
    }
  };

  return (
    <>
      <div className={css.card}>
        <div className={css.avatarColumn}>
          <ProfileAvatar
            name={localProfile.name}
            avatarUrl={localProfile.avatarUrl}
            avatarPath={localProfile.avatarPath}
            onAvatarChange={(avatarUrl, avatarPath) => {
              setLocalProfile((prev) => ({
                ...prev,
                avatarUrl,
                avatarPath,
                updatedAt: new Date().toISOString(),
              }));
            }}
          />
        </div>

        <div className={css.infoColumn}>
          <div className={css.header}>
            <p className={css.kicker}>Personal account</p>
            <h2 className={css.title}>Profile details</h2>
            <p className={css.text}>
              Manage your personal information and keep your contact details up
              to date.
            </p>
          </div>

          <div className={css.fields}>
            <ProfileField
              label="Name"
              value={localProfile.name}
              actionLabel="Edit name"
              onAction={() => setEditingField('name')}
            />

            <ProfileField label="Email" value={localProfile.email} />

            <ProfileField
              label="Phone"
              value={phoneValue}
              actionLabel={localProfile.phone ? 'Edit phone' : 'Add phone'}
              dangerActionLabel={
                localProfile.phone && !isDeletingPhone
                  ? 'Delete phone'
                  : undefined
              }
              onAction={() => setEditingField('phone')}
              onDangerAction={openDeletePhoneModal}
            />

            <ProfileField
              label="Profile created"
              value={formatDate(localProfile.createdAt)}
            />

            <ProfileField
              label="Password"
              value="••••••••"
              actionLabel={
                isSendingPasswordEmail ? 'Sending...' : 'Change password'
              }
              onAction={handleSendPasswordReset}
            />
          </div>
        </div>
      </div>

      {editingField ? (
        <ProfileEditModal
          field={editingField}
          defaultValue={getEditingDefaultValue()}
          onClose={() => setEditingField(null)}
          onSubmit={handleUpdateProfile}
        />
      ) : null}

      {isDeletePhoneModalOpen ? (
        <ConfirmActionModal
          title="Delete phone"
          message="Are you sure you want to delete your phone number?"
          confirmLabel="Delete"
          cancelLabel="Cancel"
          isSubmitting={isDeletingPhone}
          onConfirm={handleDeletePhone}
          onCancel={closeDeletePhoneModal}
        />
      ) : null}
    </>
  );
}

export default ProfileCard;
