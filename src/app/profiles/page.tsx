"use client";

import React, { useEffect, useState } from 'react';
import { Pagination } from '@nextui-org/pagination';
import { fetchUsers } from '../../services/userService';
import ProfileCard from './components/ProfileCard';
import styles from './styles/Profiles.module.css';
import SearchBar from './components/SearchBar';

const ITEMS_PER_PAGE = 24; 

const Profiles: React.FC = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    const getUsers = async () => {
      try {
        const userData = await fetchUsers();
        setUsers(userData);
        setFilteredUsers(userData);
        setTotalPages(Math.ceil(userData.length / ITEMS_PER_PAGE));
      } catch (error) {
        setError("Failed to load user data");
      } finally {
        setLoading(false);
      }
    };

    getUsers();
  }, []);

  useEffect(() => {
    const searchUsers = () => {
      const query = searchQuery.toLowerCase();
      const filtered = users.filter(user =>
        user.name.first.toLowerCase().includes(query) ||
        user.name.last.toLowerCase().includes(query) ||
        user.location.city.toLowerCase().includes(query) ||
        user.location.country.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query) ||
        user.login.uuid.toLowerCase().includes(query)
      );
      setFilteredUsers(filtered);
      setTotalPages(Math.ceil(filtered.length / ITEMS_PER_PAGE));
    };

    searchUsers();
  }, [searchQuery, users]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentUsers = filteredUsers.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <div className={styles.container}>
      <SearchBar onSearch={(query) => setSearchQuery(query)} />
      <div className={styles.grid}>
        {currentUsers.map(user => (
          <ProfileCard key={user.login.uuid} user={user} />
        ))}
      </div>
      <Pagination
        variant='bordered'
        size='lg'
        loop
        showControls
        color="success"
        total={totalPages}
        page={currentPage}
        onChange={handlePageChange}
        className={styles.pagination}
      />
    </div>
  );
};

export default Profiles;
