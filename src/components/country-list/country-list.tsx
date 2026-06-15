import type { Country } from '../../types';
import { CountryCard } from '../country-card/country-card';
import { getPopulationForYear, createYearDataMap } from '../../utils/data-transformers';

import styles from './country-list.module.css';
import { memo, useCallback, useEffect, useMemo, useRef, useState, type UIEvent } from 'react';

type CountryListProps = {
  countries: Country[];
  searchQuery: string;
  selectedColumns: string[];
  selectedRegion: string;
  selectedYear: number;
  sortField: 'name' | 'population';
  sortOrder: 'asc' | 'desc';
};

const CARD_HEIGHT = 128;
const TABLE_ROW_HEIGHT = 34;
const CARD_HEIGHT_BUFFER = 32;
const COLUMNS_COUNT = 4;
const TABLE_ROW_HEIGHT_BUFFER = 4;
const TABLE_ROWS_BUFFER = 3;

export const CountryList = memo(function CountryList({
  countries,
  searchQuery,
  selectedColumns,
  selectedRegion,
  selectedYear,
  sortField,
  sortOrder,
}: CountryListProps) {
  const listRef = useRef<HTMLDivElement>(null);
  const [scrollTop, setScrollTop] = useState(0);
  const [viewportHeight, setViewportHeight] = useState(0);

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = 0;
      setScrollTop(0);
    }
  }, [searchQuery, selectedRegion]);

  const filteredCountries = useMemo(() => {
    const filtered = countries.filter((c) => {
      const matchesSearch = c.id.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesRegion = !selectedRegion || c.data.some((d) => d.region === selectedRegion);
      return matchesSearch && matchesRegion;
    });

    if (sortField === 'name') {
      return filtered.sort((a, b) =>
        sortOrder === 'asc' ? a.id.localeCompare(b.id) : b.id.localeCompare(a.id)
      );
    }

    const withPopulation = filtered.map((country) => {
      const yearDataMap = createYearDataMap(country.data);
      const population = getPopulationForYear(yearDataMap, selectedYear) || 0;
      return { country, population };
    });

    withPopulation.sort((a, b) =>
      sortOrder === 'asc' ? a.population - b.population : b.population - a.population
    );

    return withPopulation.map((item) => item.country);
  }, [countries, searchQuery, selectedRegion, selectedYear, sortField, sortOrder]);

  const itemHeight = useMemo(() => {
    const columnsCount = selectedColumns.length;
    return (
      CARD_HEIGHT +
      columnsCount * TABLE_ROW_HEIGHT +
      CARD_HEIGHT_BUFFER +
      (columnsCount - COLUMNS_COUNT) * TABLE_ROW_HEIGHT_BUFFER
    );
  }, [selectedColumns.length]);

  const totalHeight = filteredCountries.length * itemHeight;
  const visibleCount = Math.ceil(viewportHeight / itemHeight) + TABLE_ROWS_BUFFER * 2;
  const maxStartIndex = Math.max(filteredCountries.length - visibleCount, 0);

  const startIndex = Math.min(
    Math.max(Math.floor(scrollTop / itemHeight) - TABLE_ROWS_BUFFER, 0),
    maxStartIndex
  );
  const endIndex = Math.min(startIndex + visibleCount, filteredCountries.length);
  const visibleCountries = filteredCountries.slice(startIndex, endIndex);

  const handleScroll = useCallback((event: UIEvent<HTMLDivElement>) => {
    setScrollTop(event.currentTarget.scrollTop);
  }, []);

  useEffect(() => {
    const listElement = listRef.current;
    if (!listElement) return;

    const updateViewportHeight = () => {
      setViewportHeight(listElement.clientHeight);
    };

    updateViewportHeight();
    const resizeObserver = new ResizeObserver(updateViewportHeight);
    resizeObserver.observe(listElement);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <div ref={listRef} className={styles.countryList} onScroll={handleScroll}>
      <div className={styles.virtualSpacer} style={{ height: totalHeight }}>
        {visibleCountries.map((country, index) => {
          const actualIndex = startIndex + index;
          return (
            <div
              key={country.id}
              className={styles.virtualItem}
              style={{
                height: itemHeight,
                transform: `translateY(${actualIndex * itemHeight}px)`,
              }}
            >
              <CountryCard
                country={country}
                selectedYear={selectedYear}
                selectedColumns={selectedColumns}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
});
