'use server';

import APP_ENV from '@/env';

export const revalidateCake = async () => {
  const response = await fetch(APP_ENV.REVALIDATE_CAKE_URL!, {
    method: 'POST',
    body: JSON.stringify({
      secretKey: APP_ENV.REVALIDATE_CAKE_SECRET_KEY,
    }),
  });
  const data = (await response.json()) as { success: boolean };
  if (response.status !== 200 || !data.success) {
    return { error: 'Invalid' };
  }
  return data;
};
