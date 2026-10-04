import "server-only";
import { createClient } from "@supabase/supabase-js";

/** Public bucket holding every room photo, under `rooms/<roomId>/`. */
export const ROOM_IMAGES_BUCKET = "rooms-images";

/**
 * Service-role Supabase client for Storage. Uses the secret key, so it must
 * only run on the server, and only after `getAdmin()` has passed.
 */
export function createStorageClient() {
  return createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SECRET_KEY!, {
    auth: { persistSession: false, autoRefreshToken: false },
  }).storage.from(ROOM_IMAGES_BUCKET);
}

/** Recovers the object path (`rooms/1/abc.jpg`) from a stored public URL. */
export function storagePathFromUrl(url: string): string | null {
  const marker = `/storage/v1/object/public/${ROOM_IMAGES_BUCKET}/`;
  const index = url.indexOf(marker);
  return index === -1 ? null : decodeURIComponent(url.slice(index + marker.length));
}
