"use client";

import React, { useEffect, useState } from 'react';
import { Pagination } from '@nextui-org/pagination';
import { fetchUsers } from '../../services/userService';
import ProfileCard from './components/ProfileCard';
import styles from './styles/Profiles.module.css';

const ITEMS_PER_PAGE = 24; // Define how many items per page

const Profiles: React.FC = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const userData = await fetchUsers();
        setUsers(userData);
        setTotalPages(Math.ceil(userData.length / ITEMS_PER_PAGE));
      } catch (error) {
        setError("Failed to load user data");
      } finally {
        setLoading(false);
      }
    };

    getUsers();
  }, []);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentUsers = users.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <div>
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
