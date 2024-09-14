"use client";

import React, { useState, useEffect } from 'react';
import styles from '../styles/SearchBar.module.css';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = React.memo(({ onSearch }) => {
  const [active, setActive] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    // Load the search query from localStorage when the component mounts
    const savedQuery = localStorage.getItem('searchQuery');
    if (savedQuery) {
      setSearchQuery(savedQuery);
      onSearch(savedQuery);
    }
  }, [onSearch]);

  const handleSearchToggle = (event: React.MouseEvent<HTMLButtonElement> | React.MouseEvent<HTMLSpanElement>) => {
    event.preventDefault();
    if (active) {
      // If already active, remove the 'active' class and clear the input
      setActive(false);
      // Clear input
      const searchInput = document.querySelector<HTMLInputElement>(`.${styles.searchInput}`);
      if (searchInput) {
        searchInput.value = '';
        onSearch(''); // Clear search query
        localStorage.removeItem('searchQuery'); // Clear saved query from localStorage
      }
    } else {
      setActive(true);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setSearchQuery(query);
    onSearch(query);
    localStorage.setItem('searchQuery', query); // Save search query to localStorage
  };

  return (
    <div className={`${styles.searchWrapper} ${active ? styles.active : ''}`}>
      <div className={styles.inputHolder}>
        <input
          type="text"
          className={styles.searchInput}
          placeholder="Search"
          value={searchQuery}
          onChange={handleInputChange}
        />
        <button className={styles.searchIcon} onClick={handleSearchToggle}>
          <span></span>
        </button>
      </div>
    </div>
  );
});

export default SearchBar;
