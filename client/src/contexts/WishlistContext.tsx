import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { toast } from 'sonner';
import { useAuth } from './AuthContext';
import { apiRequest, getErrorMessage } from '../lib/api';
import type { Product } from '../types';
import { normalizeProduct } from '../utils/product';

interface WishlistResponse {
  products?: Product[];
}

interface WishlistContextValue {
  wishlistItems: Product[];
  isLoading: boolean;
  isFavorite: (productId: string) => boolean;
  isMutating: (productId: string) => boolean;
  toggleWishlist: (product: Product) => Promise<boolean>;
  removeFromWishlist: (productId: string) => Promise<void>;
}

const WishlistContext = createContext<WishlistContextValue | null>(null);

function mapWishlistProducts(response: WishlistResponse): Product[] {
  return (response.products ?? []).map((product) => normalizeProduct(product));
}

export function WishlistProvider({ children }: { children: ReactNode }) {
  const { token, isAuthenticated } = useAuth();

  const [wishlistItems, setWishlistItems] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [pendingIds, setPendingIds] = useState<string[]>([]);

  useEffect(() => {
    if (!token || !isAuthenticated) {
      setWishlistItems([]);
      setIsLoading(false);
      return;
    }

    let isCancelled = false;
    setIsLoading(true);

    apiRequest<WishlistResponse>('/api/wishlist', { token })
      .then((response) => {
        if (!isCancelled) {
          setWishlistItems(mapWishlistProducts(response));
        }
      })
      .catch(() => {
        if (!isCancelled) {
          setWishlistItems([]);
        }
      })
      .finally(() => {
        if (!isCancelled) {
          setIsLoading(false);
        }
      });

    return () => {
      isCancelled = true;
    };
  }, [isAuthenticated, token]);

  const favoriteIds = useMemo(
    () => new Set(wishlistItems.map((product) => product.id)),
    [wishlistItems]
  );

  const trackPendingState = useCallback((productId: string, isPending: boolean) => {
    setPendingIds((currentIds) => {
      if (isPending) {
        return currentIds.includes(productId)
          ? currentIds
          : [...currentIds, productId];
      }

      return currentIds.filter((id) => id !== productId);
    });
  }, []);

  const isFavorite = useCallback(
    (productId: string) => favoriteIds.has(productId),
    [favoriteIds]
  );

  const isMutating = useCallback(
    (productId: string) => pendingIds.includes(productId),
    [pendingIds]
  );

  const applyWishlistResponse = useCallback((response: WishlistResponse) => {
    setWishlistItems(mapWishlistProducts(response));
  }, []);

  const toggleWishlist = useCallback(
    async (product: Product) => {
      if (!token || !isAuthenticated) {
        toast('signin to add to wishlist');
        return false;
      }

      const productId = product.id;
      const wasFavorite = favoriteIds.has(productId);

      trackPendingState(productId, true);

      try {
        const response = wasFavorite
          ? await apiRequest<WishlistResponse>(
              `/api/wishlist/remove/${encodeURIComponent(productId)}`,
              {
                method: 'DELETE',
                token,
              }
            )
          : await apiRequest<WishlistResponse>('/api/wishlist/add', {
              method: 'POST',
              token,
              body: JSON.stringify({ productId }),
            });

        applyWishlistResponse(response);

        toast.success(
          wasFavorite
            ? `${product.name} removed from wishlist`
            : `${product.name} added to wishlist`
        );

        return !wasFavorite;
      } catch (error) {
        toast.error(getErrorMessage(error));
        return wasFavorite;
      } finally {
        trackPendingState(productId, false);
      }
    },
    [applyWishlistResponse, favoriteIds, isAuthenticated, token, trackPendingState]
  );

  const removeFromWishlist = useCallback(
    async (productId: string) => {
      if (!token || !isAuthenticated) {
        setWishlistItems([]);
        return;
      }

      trackPendingState(productId, true);

      try {
        const response = await apiRequest<WishlistResponse>(
          `/api/wishlist/remove/${encodeURIComponent(productId)}`,
          {
            method: 'DELETE',
            token,
          }
        );

        applyWishlistResponse(response);
      } catch (error) {
        toast.error(getErrorMessage(error));
      } finally {
        trackPendingState(productId, false);
      }
    },
    [applyWishlistResponse, isAuthenticated, token, trackPendingState]
  );

  const value = useMemo<WishlistContextValue>(
    () => ({
      wishlistItems,
      isLoading,
      isFavorite,
      isMutating,
      toggleWishlist,
      removeFromWishlist,
    }),
    [
      wishlistItems,
      isLoading,
      isFavorite,
      isMutating,
      toggleWishlist,
      removeFromWishlist,
    ]
  );

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);

  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider.');
  }

  return context;
}
