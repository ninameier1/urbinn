'use client';

import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { useCallback } from 'react';
import { X } from 'lucide-react';

type SortOption = {
  value: string;
  label: string;
};

type SortBarProps = {
  sortOptions: SortOption[];
  defaultSort?: string;
  placeholder?: string;
};

export default function SortBar({ sortOptions, defaultSort = 'name_asc', placeholder = 'Zoeken...' }: SortBarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const current = searchParams.get('sort') ?? defaultSort;
  const query = searchParams.get('query') ?? '';

  const update = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) params.set(key, value);
      else params.delete(key);
      router.push(`${pathname}?${params.toString()}`);
    },
    [router, pathname, searchParams]
  );

  return (
    <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-between sm:items-center">
      <div className="relative w-full sm:w-64">
        <input
          type="search"
          placeholder={placeholder}
          defaultValue={query}
          onChange={(e) => update('query', e.target.value)}
          className="border border-stone-200 rounded-lg bg-white px-4 py-2 pr-10 text-sm w-full focus:outline-none focus:ring-2 focus:ring-accent"
        />
        {query && (
          <button
            type="button"
            onClick={() => update('query', '')}
            className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-red-700 hover:text-red-900 transition"
            aria-label="Zoekopdracht wissen"
          >
            <X size={14} />
          </button>
        )}
      </div>

      <select
        value={current}
        onChange={(e) => update('sort', e.target.value)}
        className="border border-stone-200 rounded-lg bg-white px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent"
      >
        {sortOptions.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}