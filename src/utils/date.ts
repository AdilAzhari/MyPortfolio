const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

// Formats an ISO date (YYYY-MM-DD) as "15 Sep 2026". Deliberately locale-free so the
// prerendered HTML and the hydrated client produce identical text.
export const formatDate = (iso: string) => {
  const [year, month, day] = iso.split('-').map(Number);
  return `${day} ${MONTHS[month - 1]} ${year}`;
};
