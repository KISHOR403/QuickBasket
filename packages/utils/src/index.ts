/**
 * Formats a number to Indian Rupee (INR) string.
 * e.g. 149 => "₹149", 1250 => "₹1,250"
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Formats estimated time in minutes into a human-readable string.
 * e.g. 12 => "12 mins", 45 => "45 mins", 65 => "1 hr 5 mins"
 */
export function formatEta(minutes: number): string {
  if (minutes < 60) {
    return `${minutes} mins`;
  }
  const hrs = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return mins > 0 ? `${hrs} hr ${mins} mins` : `${hrs} hr`;
}

/**
 * Convert string to URL-safe slug
 */
export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/[^\w\-]+/g, '') // Remove all non-word chars
    .replace(/\-\-+/g, '-'); // Replace multiple - with single -
}

/**
 * Calculate discount percentage from MRP and Selling Price
 */
export function calculateDiscount(price: number, mrp: number): number {
  if (mrp <= price || mrp === 0) return 0;
  return Math.round(((mrp - price) / mrp) * 100);
}
