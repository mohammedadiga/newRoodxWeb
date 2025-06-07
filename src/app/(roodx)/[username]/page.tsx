'use client';

// Components
import { Card } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
// Modules

// Redux
import { RootState } from '@/store';
import { useAppSelector } from '@/store/hooks';
// Icons
import { FileText, Settings, User } from 'lucide-react';

export default function Profile() {
  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-xl font-bold mb-4">Profile</h1>
    </div>
  );
}
