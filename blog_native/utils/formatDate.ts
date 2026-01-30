export function formatDate(date: string): string {
  let d = new Date(date);

  return `${d.toISOString().substring(0, 10)} ${d.toISOString().substring(11, 16)}`;
}
