'use client';

import { cn } from '@/lib/utils';
import { cva } from 'class-variance-authority';
import { Airplay, Moon, Sun } from 'lucide-react';
import { motion } from 'motion/react';
import { useTheme } from 'next-themes';
import { type HTMLAttributes, useLayoutEffect, useState } from 'react';

const themes = [
  { key: 'system', label: 'System', colors: ['#ffffff', '#1a1a1a'] },
  { key: 'light', label: 'Light', colors: ['#ffffff'] },
  { key: 'dark', label: 'Dark', colors: ['#1a1a1a'] },
];

const itemVariants = cva(
  'relative size-6.5 rounded-full p-1.5 text-fd-muted-foreground',
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
  mode = 'light-dark',
  ...props
}: HTMLAttributes<HTMLDivElement> & {
  mode?: 'light-dark' | 'light-dark-system';
}) {
  const { setTheme, theme: currentTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  const container = cn(
    'relative flex items-center rounded-md p-1 ring-1 ring-border',
    className,
  );

  useLayoutEffect(() => {
    setMounted(true);
  }, []);

  const handleChangeTheme = async (theme: Theme) => {
    function update() {
      setTheme(theme);
    }

    if (document.startViewTransition && theme !== resolvedTheme) {
      document.documentElement.style.viewTransitionName = 'theme-transition';
      await document.startViewTransition(update).finished;
      document.documentElement.style.viewTransitionName = '';
    } else {
      update();
    }
  };

  const value = mounted
    ? mode === 'light-dark'
      ? resolvedTheme
      : currentTheme
    : null;

  return (
    // biome-ignore lint/nursery/noStaticElementInteractions: <explanation>
    <div
      className={container}
      onClick={() => {
        if (mode !== 'light-dark') return;
        handleChangeTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
      }}
      data-theme-toggle=""
      aria-label={mode === 'light-dark' ? 'Toggle Theme' : undefined}
      {...props}
    >
      {themes.map(({ key, label }) => {
        const isActive = value === key;
        if (mode === 'light-dark' && key === 'system') return;

        return (
          <button
            type="button"
            key={key}
            className={itemVariants({ active: isActive })}
            onClick={() => {
              if (mode === 'light-dark') return;
              handleChangeTheme(key as Theme);
            }}
            aria-label={label}
          >
            {isActive && (
              <motion.div
                layoutId="activeTheme"
                className="absolute inset-0 rounded-full bg-accent"
                transition={{
                  type: 'spring',
                  duration: mode === 'light-dark' ? 1.5 : 1,
                }}
              />
            )}
          </button>
        );
      })}
    </div>
  );
}
