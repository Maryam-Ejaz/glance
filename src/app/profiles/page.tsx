"use client";

import React, { useEffect, useState } from 'react';
import { Pagination } from '@nextui-org/pagination';
import { fetchUsers } from '../../services/userService';
import ProfileCard from './components/ProfileCard';
import styles from './styles/Profiles.module.css';
import SearchBar from './components/SearchBar';
import SortDropdown from './components/SortDropDown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRefresh } from '@fortawesome/free-solid-svg-icons';


const ITEMS_PER_PAGE = 24;

const Profiles: React.FC = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>(''); 
  const [sortOption, setSortOption] = useState<string>('');   

  const [rowsPerPage, setRowsPerPage] = useState<number>(ITEMS_PER_PAGE);

  // Fetch users on component mount
  useEffect(() => {
    const getUsers = async () => {
      try {
        const userData = await fetchUsers();
        setUsers(userData);
        setCurrentPage(1);
        setFilteredUsers(userData); // Initialize filtered users with full list
        setTotalPages(Math.ceil(userData.length / ITEMS_PER_PAGE));
      } catch (error) {
        setError('Failed to load user data');
      } finally {
        setLoading(false);
      }
    };

    getUsers();
  }, []);

  // Load state from localStorage when the component mounts
  useEffect(() => {
    const savedPage = parseInt(localStorage.getItem('currentPage') || '1', 10);
    const savedSearchQuery = localStorage.getItem('searchQuery') || '';
    const savedSortOption = localStorage.getItem('sortOption') || '';

    setCurrentPage(savedPage);
    setSearchQuery(savedSearchQuery);
    setSortOption(savedSortOption);
    console.log(`saved ${savedSortOption}`);
    console.log(`saved ${savedSearchQuery}`);
  }, []);

  // Apply search query to filter the list of users
  useEffect(() => {
    if (!searchQuery) {
      setFilteredUsers(users);
      setTotalPages(Math.ceil(users.length / ITEMS_PER_PAGE));
      return;
    }

    const filtered = users.filter((user) =>
      user.name.first.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.name.last.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.location.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.location.country.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredUsers(filtered);
    setTotalPages(Math.ceil(filtered.length / ITEMS_PER_PAGE));
    setCurrentPage(1); 
    localStorage.setItem('searchQuery', searchQuery); // Save search query to localStorage
  }, [searchQuery, users]);

  // Apply sorting
  useEffect(() => {
    console.log(`in sort ${sortOption}`);
    let sortedUsers = [...filteredUsers];
    switch (sortOption) {
      case 'nameAsc':
        sortedUsers.sort((a, b) => a.name.first.localeCompare(b.name.first));
        break;
      case 'nameDesc':
        sortedUsers.sort((a, b) => b.name.first.localeCompare(a.name.first));
        break;
      case 'dobAsc':
        sortedUsers.sort((a, b) => new Date(a.dob.date).getTime() - new Date(b.dob.date).getTime());
        break;
      case 'dobDesc':
        sortedUsers.sort((a, b) => new Date(b.dob.date).getTime() - new Date(a.dob.date).getTime());
        break;
      case 'cityAsc':
        sortedUsers.sort((a, b) => a.location.city.localeCompare(b.location.city));
        break;
      case 'cityDesc':
        sortedUsers.sort((a, b) => b.location.city.localeCompare(a.location.city));
        break;
      case 'countryAsc':
        sortedUsers.sort((a, b) => a.location.country.localeCompare(b.location.country));
        break;
      case 'countryDesc':
        sortedUsers.sort((a, b) => b.location.country.localeCompare(a.location.country));
        break;
      case 'genderAsc':
        sortedUsers.sort((a, b) => a.gender.localeCompare(b.gender));
        break;
      case 'genderDesc':
        sortedUsers.sort((a, b) => b.gender.localeCompare(a.gender));
        break;
      default:
        break;
    }
    setFilteredUsers(sortedUsers);
    localStorage.setItem('sortOption', sortOption); // Save sort option to localStorage
  }, [sortOption]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    localStorage.setItem('currentPage', page.toString()); // Save current page to localStorage
  };

  const handleSort = (option: string) => {
    setSortOption(option);
  };

    // Refresh button handler
    const handleRefresh = () => {
      setFilteredUsers(users);
      setSortOption('');
      setSearchQuery('');
      setCurrentPage(1);
      localStorage.removeItem('searchQuery');
      localStorage.removeItem('sortOption');
    };

    const handleRowsPerPageChange = (rows: number) => {
      setRowsPerPage(rows);
      setTotalPages(Math.ceil(filteredUsers.length / rows));
    };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentUsers = filteredUsers.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <div className={styles.container}>
      <div className={styles.actions}>
        <SearchBar onSearch={setSearchQuery} />
        <SortDropdown onSort={handleSort} selectedSortOption={sortOption} /> 
        <button className={styles.refreshButton} onClick={handleRefresh}>
        <FontAwesomeIcon icon={faRefresh} className={styles.icon}/>
          </button>
      </div>
      <div className={styles.grid}>
        {currentUsers.map((user) => (
          <ProfileCard key={user.login.uuid} user={user} />
        ))}
      </div>
      <Pagination
        variant="light"
        size="lg"
        loop
        showControls
        color="default"
        total={totalPages}
        page={currentPage}
        onChange={handlePageChange}
        className={styles.pagination}
      />
    </div>
  );
};

export default Profiles;
