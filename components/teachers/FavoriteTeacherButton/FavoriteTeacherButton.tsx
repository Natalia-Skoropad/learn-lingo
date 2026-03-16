'use client';

import { toast } from 'react-hot-toast';

import type { Teacher } from '@/types/teacher';
import { useModal } from '@/hooks/useModal';
import { useAuth } from '@/hooks/useAuth';
import { useFavorites } from '@/hooks/useFavorites';

import FavoriteButton from '@/components/teachers/FavoriteButton/FavoriteButton';

//===============================================================

type Props = {
  teacher: Teacher;
  className?: string;
};

//===============================================================

function FavoriteTeacherButton({ teacher, className }: Props) {
  const { openModal } = useModal();
  const { isAuthenticated, isAuthReady } = useAuth();
  const { isFavorite, isUpdating, toggleFavorite } = useFavorites();

  const favoriteActive = isFavorite(teacher.id);
  const favoriteUpdating = isUpdating(teacher.id);

  const handleToggleFavorite = async () => {
    if (!isAuthReady) return;

    if (!isAuthenticated) {
      toast.error('This feature is available only for authorized users.');
      openModal('login');
      return;
    }

    try {
      const result = await toggleFavorite(teacher);

      if (result === 'added') {
        toast.success('Teacher added to favorites.');
      } else {
        toast.success('Teacher removed from favorites.');
      }
    } catch (error) {
      console.error(error);
      toast.error('Failed to update favorites. Please try again.');
    }
  };

  return (
    <FavoriteButton
      isActive={favoriteActive}
      onToggle={handleToggleFavorite}
      disabled={favoriteUpdating}
      className={className}
      size="lg"
    />
  );
}

export default FavoriteTeacherButton;
