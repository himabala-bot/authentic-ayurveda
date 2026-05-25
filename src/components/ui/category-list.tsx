"use client";
import React, { useState } from 'react';
import { cn } from '@/lib/utils';

// Define the type for a single category item
export interface Category {
  id: string | number;
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  featured?: boolean;
}

// Define the props for the CategoryList component
export interface CategoryListProps {
  title: string;
  subtitle?: string;
  categories: Category[];
  headerIcon?: React.ReactNode;
  className?: string;
}

export const CategoryList = ({
  title,
  subtitle,
  categories,
  headerIcon,
  className,
}: CategoryListProps) => {
  const [hoveredItem, setHoveredItem] = useState<string | number | null>(null);

  return (
    <div className={cn("w-full bg-background text-foreground py-20 px-6", className)}>
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12 md:mb-16">
          {headerIcon && (
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6 text-primary">
              {headerIcon}
            </div>
          )}
          <h2 
            className="text-3xl sm:text-4xl md:text-5xl font-semibold mb-2 tracking-[-0.02em]"
            style={{ fontFamily: 'var(--font-serif)' }}
          >
            {title}
          </h2>
          {subtitle && (
            <p className="text-xl text-muted-foreground font-medium">{subtitle}</p>
          )}
        </div>

        {/* Categories List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {categories.map((category) => (
            <div
              key={category.id}
              className="relative group flex flex-col"
              onMouseEnter={() => setHoveredItem(category.id)}
              onMouseLeave={() => setHoveredItem(null)}
              onClick={category.onClick}
            >
              <div
                className={cn(
                  "relative overflow-hidden border bg-card transition-all duration-500 ease-[0.16,1,0.3,1] cursor-pointer rounded-2xl h-full flex flex-col justify-center min-h-[5.5rem] sm:min-h-[7.5rem]",
                  // Hover state styles
                  hoveredItem === category.id
                    ? 'border-primary shadow-[0_20px_40px_-15px_rgba(106,143,60,0.15)] bg-primary/[0.02]'
                    : 'border-border'
                )}
              >
                {/* Content */}
                <div className="flex items-center justify-between h-full px-4 sm:px-6 md:px-8 py-4">
                  <div className="flex-1">
                    <h3
                      className={cn(
                        "text-lg md:text-xl font-semibold transition-colors duration-500",
                        hoveredItem === category.id ? 'text-primary' : 'text-foreground'
                      )}
                      style={{ fontFamily: 'var(--font-serif)', letterSpacing: '-0.02em' }}
                    >
                      {category.title}
                    </h3>
                    {category.subtitle && (
                      <p
                        className={cn(
                          "mt-1 transition-colors duration-500 text-sm md:text-base font-medium",
                           hoveredItem === category.id ? 'text-foreground/80' : 'text-muted-foreground'
                        )}
                      >
                        {category.subtitle}
                      </p>
                    )}
                  </div>

                  {/* Icon appears on the right on hover */}
                  {category.icon && (
                    <div className={cn(
                      "transition-all duration-500",
                      hoveredItem === category.id ? "text-primary opacity-100 translate-x-0" : "text-muted-foreground/30 opacity-0 translate-x-4"
                    )}>
                      {category.icon}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
