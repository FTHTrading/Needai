import { redirect } from 'next/navigation';

// Active storm event: April 2026 Wisconsin — redirect to live campaign
export default function StormPage() {
  redirect('/storm/wisconsin');
}
