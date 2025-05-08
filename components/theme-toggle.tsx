'use client';
import { cn } from '@/lib/utils';
import { cva } from 'class-variance-authority';
import { useTheme } from 'next-themes';
import { type HTMLAttributes, useEffect, useState } from 'react';
import {
  startTransition,
  unstable_ViewTransition as ViewTransition,
  unstable_addTransitionType as addTransitionType,
} from 'react';

const themes = [
  {
    key: 'system',
    label: 'System',
    colors: ['var(--background)', 'var(--foreground)'],
  },
  { key: 'light', label: 'Light', colors: ['#ffffff'] },
  { key: 'dark', label: 'Dark', colors: ['#1a1a1a'] },
];

const itemVariants = cva(
  'relative rounded-sm p-3 text-fd-muted-foreground grid',
  {
    variants: {
      active: {
        true: 'text-fd-accent-foreground',
        false: 'text-fd-muted-foreground',
      },
    },
  },
);

type Theme = 'light' | 'dark' | 'system';

export function ThemeToggle({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  const { setTheme, theme: currentTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const container = cn(
    'relative grid grid-cols-3 rounded-md p-0.5 ring-1 ring-border',
    className,
  );

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleChangeTheme = (theme: Theme) => {
    startTransition(() => {
      setTheme(theme);
    });
  };

  const value = mounted ? currentTheme : null;

  return (
    <div className={container} data-theme-toggle="" {...props}>
      {themes.map(({ key, colors, label }) => {
        const isActive = value === key;
        return (
          <button
            type="button"
            key={key}
            className={itemVariants({ active: isActive })}
            onClick={() => handleChangeTheme(key as Theme)}
            aria-label={label}
          >
            {isActive && (
              <ViewTransition name="active-theme-indicator">
                <div className="absolute inset-0 rounded-md bg-accent" />
              </ViewTransition>
            )}
            <div className="relative z-10 space-y-2">
              <div className="mb-2 flex space-x-1">
                {colors.map((color) => (
                  <div
                    key={color}
                    className="border-border h-4 w-4 rounded-full border"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
              <p className="text-left text-sm font-medium">{label}</p>
            </div>
          </button>
        );
      })}
    </div>
  );
}
