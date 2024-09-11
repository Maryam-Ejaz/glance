"use client";

import React, { useState } from 'react';
import styles from '../styles/SearchBar.module.css';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [active, setActive] = useState<boolean>(false);

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
      }
    } else {
      setActive(true);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(event.target.value);
  };

  return (
    <div className={`${styles.searchWrapper} ${active ? styles.active : ''}`}>
      <div className={styles.inputHolder}>
        <input
          type="text"
          className={styles.searchInput}
          placeholder="Type to search"
          onChange={handleInputChange}
        />
        <button className={styles.searchIcon} onClick={handleSearchToggle}>
          <span></span>
        </button>
      </div>
      {/* <span className={styles.close} onClick={handleSearchToggle}></span> */}
    </div>
  );
};

export default SearchBar;
