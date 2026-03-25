'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface FilterPanelProps {
  onFilterChange: (filters: Record<string, any>) => void;
  activeFilters: Record<string, any>;
}

const categories = [
  { value: 'sneakers', label: 'Sneakers' },
  { value: 'cards', label: 'Trading Cards' },
  { value: 'tech', label: 'Vintage Tech' },
  { value: 'apparel', label: 'Apparel' },
  { value: 'hats', label: 'Hats' },
];

const conditions = [
  { value: 'new', label: 'New' },
  { value: 'like_new', label: 'Like New' },
  { value: 'good', label: 'Good' },
  { value: 'fair', label: 'Fair' },
];

const priceRanges = [
  { label: 'Under $50', min: 0, max: 50 },
  { label: '$50 - $100', min: 50, max: 100 },
  { label: '$100 - $250', min: 100, max: 250 },
  { label: '$250 - $500', min: 250, max: 500 },
  { label: 'Over $500', min: 500, max: 999999 },
];

const sortOptions = [
  { value: 'newest', label: 'Newest' },
  { value: 'price_low', label: 'Price: Low to High' },
  { value: 'price_high', label: 'Price: High to Low' },
  { value: 'rating', label: 'Top Rated' },
];

export default function FilterPanel({ onFilterChange, activeFilters }: FilterPanelProps) {
  const [expandedSections, setExpandedSections] = useState({
    category: true,
    condition: true,
    price: true,
    sort: true,
  });

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const handleCategoryChange = (value: string) => {
    const newCategories = activeFilters.categories || [];
    const updated = newCategories.includes(value)
      ? newCategories.filter((c: string) => c !== value)
      : [...newCategories, value];
    onFilterChange({ ...activeFilters, categories: updated });
  };

  const handleConditionChange = (value: string) => {
    const newConditions = activeFilters.conditions || [];
    const updated = newConditions.includes(value)
      ? newConditions.filter((c: string) => c !== value)
      : [...newConditions, value];
    onFilterChange({ ...activeFilters, conditions: updated });
  };

  const handlePriceChange = (min: number, max: number) => {
    onFilterChange({ ...activeFilters, min_price: min, max_price: max });
  };

  const handleSortChange = (value: string) => {
    onFilterChange({ ...activeFilters, sort: value });
  };

  return (
    <div className="space-y-6">
      {/* Category Filter */}
      <div className="border-b pb-6">
        <button
          onClick={() => toggleSection('category')}
          className="flex items-center justify-between w-full text-left"
        >
          <h3 className="font-bold text-lg text-primary">Category</h3>
          <ChevronDown
            className={`w-5 h-5 transition-transform ${
              expandedSections.category ? 'rotate-180' : ''
            }`}
          />
        </button>
        {expandedSections.category && (
          <div className="mt-4 space-y-2">
            {categories.map((cat) => (
              <label key={cat.value} className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={
                    (activeFilters.categories || []).includes(cat.value)
                  }
                  onChange={() => handleCategoryChange(cat.value)}
                  className="w-4 h-4 text-accent rounded cursor-pointer"
                />
                <span className="text-gray-700">{cat.label}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Condition Filter */}
      <div className="border-b pb-6">
        <button
          onClick={() => toggleSection('condition')}
          className="flex items-center justify-between w-full text-left"
        >
          <h3 className="font-bold text-lg text-primary">Condition</h3>
          <ChevronDown
            className={`w-5 h-5 transition-transform ${
              expandedSections.condition ? 'rotate-180' : ''
            }`}
          />
        </button>
        {expandedSections.condition && (
          <div className="mt-4 space-y-2">
            {conditions.map((cond) => (
              <label key={cond.value} className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={
                    (activeFilters.conditions || []).includes(cond.value)
                  }
                  onChange={() => handleConditionChange(cond.value)}
                  className="w-4 h-4 text-accent rounded cursor-pointer"
                />
                <span className="text-gray-700">{cond.label}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Price Filter */}
      <div className="border-b pb-6">
        <button
          onClick={() => toggleSection('price')}
          className="flex items-center justify-between w-full text-left"
        >
          <h3 className="font-bold text-lg text-primary">Price</h3>
          <ChevronDown
            className={`w-5 h-5 transition-transform ${
              expandedSections.price ? 'rotate-180' : ''
            }`}
          />
        </button>
        {expandedSections.price && (
          <div className="mt-4 space-y-2">
            {priceRanges.map((range) => (
              <label
                key={range.label}
                className="flex items-center gap-3 cursor-pointer"
              >
                <input
                  type="radio"
                  name="price"
                  checked={
                    activeFilters.min_price === range.min &&
                    activeFilters.max_price === range.max
                  }
                  onChange={() => handlePriceChange(range.min, range.max)}
                  className="w-4 h-4 text-accent cursor-pointer"
                />
                <span className="text-gray-700">{range.label}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Sort Filter */}
      <div>
        <button
          onClick={() => toggleSection('sort')}
          className="flex items-center justify-between w-full text-left"
        >
          <h3 className="font-bold text-lg text-primary">Sort By</h3>
          <ChevronDown
            className={`w-5 h-5 transition-transform ${
              expandedSections.sort ? 'rotate-180' : ''
            }`}
          />
        </button>
        {expandedSections.sort && (
          <div className="mt-4 space-y-2">
            {sortOptions.map((option) => (
              <label key={option.value} className="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  name="sort"
                  checked={activeFilters.sort === option.value}
                  onChange={() => handleSortChange(option.value)}
                  className="w-4 h-4 text-accent cursor-pointer"
                />
                <span className="text-gray-700">{option.label}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Clear Filters */}
      {Object.values(activeFilters).some((v) => v) && (
        <button
          onClick={() =>
            onFilterChange({
              categories: [],
              conditions: [],
              min_price: undefined,
              max_price: undefined,
              sort: undefined,
            })
          }
          className="w-full btn btn-outline text-center"
        >
          Clear All Filters
        </button>
      )}
    </div>
  );
}
