"use client"
import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Pagination } from '@nextui-org/pagination';
import { fetchUsers } from '../../services/userService';
import ProfileCard from './components/ProfileCard';
import styles from './styles/Profiles.module.css';
import SearchBar from './components/SearchBar';
import SortDropdown from './components/SortDropDown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRefresh } from '@fortawesome/free-solid-svg-icons';
import Loading from './loading';

const ITEMS_PER_PAGE = 24;

const Profiles: React.FC = React.memo(() => {
  const router = useRouter();

  const [users, setUsers] = useState<any[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortOption, setSortOption] = useState<string>('nameAsc');
  const [rowsPerPage, setRowsPerPage] = useState<number>(ITEMS_PER_PAGE);

  // Store and restore state using localStorage
  useEffect(() => {
    const savedPage = localStorage.getItem('currentPage');
    const savedQuery = localStorage.getItem('searchQuery');
    const savedSortOption = localStorage.getItem('sortOption');
    const savedUsers = localStorage.getItem('users');

    // Debug statements
    console.log('Current Page:', savedPage);
    console.log('Search Query:', savedQuery);
    console.log('Sort Option:', savedSortOption);

    if (savedPage) setCurrentPage(parseInt(savedPage));
    if (savedQuery) setSearchQuery(savedQuery);
    if (savedSortOption) setSortOption(savedSortOption);
    if (savedUsers) {
      const parsedUsers = JSON.parse(savedUsers);
      setUsers(parsedUsers);
      setFilteredUsers(parsedUsers);
      setTotalPages(Math.ceil(parsedUsers.length / ITEMS_PER_PAGE));
      setLoading(false);
    }
    // Debug statements
    console.log('Current Page:', filteredUsers);
    console.log('Search Query:', searchQuery);
    console.log('Sort Option:', sortOption);

  }, []);

  useEffect(() => {
    localStorage.setItem('currentPage', currentPage.toString());
    localStorage.setItem('searchQuery', searchQuery);
    localStorage.setItem('sortOption', sortOption);

    // Debug statements
    console.log('Current Page:', currentPage);
    console.log('Search Query:', searchQuery);
    console.log('Sort Option:', sortOption);
  }, [currentPage, searchQuery, sortOption]);

  // Fetch users on component mount or load from localStorage
  useEffect(() => {
    const getUsers = async () => {
      const cachedUsers = localStorage.getItem('users');
      if (cachedUsers) {
        const parsedUsers = JSON.parse(cachedUsers);
        setUsers(parsedUsers);
        setFilteredUsers(parsedUsers);
        setTotalPages(Math.ceil(parsedUsers.length / ITEMS_PER_PAGE));
        setLoading(false);
      } else {
        try {
          const userData = await fetchUsers();
          setUsers(userData);
          setFilteredUsers(userData);
          setTotalPages(Math.ceil(userData.length / ITEMS_PER_PAGE));
          localStorage.setItem('users', JSON.stringify(userData)); // Store users in localStorage
        } catch (error) {
          setError('Failed to load user data');
        } finally {
          setLoading(false);
        }
      }
    };

    getUsers();
  }, []);

  // Update URL query params when state changes
  useEffect(() => {
    const url = new URL(window.location.href);
    url.pathname = '/';
    url.searchParams.set('page', currentPage.toString());
    url.searchParams.set('searchQuery', searchQuery);
    url.searchParams.set('sortOption', sortOption);
    router.push(url.toString());
  }, [currentPage, searchQuery, sortOption]);

  // Apply search query to filter the list of users
  useEffect(() => {
    if (!searchQuery) {
      setFilteredUsers(users);
      setTotalPages(Math.ceil(users.length / ITEMS_PER_PAGE));
      localStorage.setItem('filteredUsers', JSON.stringify(users)); // Store the filtered result
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
    localStorage.setItem('filteredUsers', JSON.stringify(filtered)); // Store filtered users in localStorage

    // Debug statement
    console.log('Filtered Users Count:', filtered.length);
  }, [searchQuery, users]);

  // Apply sorting
  useEffect(() => {
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
    localStorage.setItem('filteredUsers', JSON.stringify(sortedUsers)); // Store sorted users in localStorage

    // Debug statement
    console.log('Sort Option:', sortOption);
  }, [sortOption]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Debug statement
    console.log('Page Changed:', page);
  };

  const handleSort = (option: string) => {
    setSortOption(option);
    // Debug statement
    console.log('Sort Option Changed:', option);
  };

  // Refresh button handler
  const handleRefresh = () => {
    setFilteredUsers(users);
    setSortOption('nameAsc');
    setSearchQuery('');
    setCurrentPage(1);
    const url = new URL(window.location.href);
    url.pathname = '/';
    url.searchParams.set('page', '1');
    url.searchParams.set('searchQuery', '');
    url.searchParams.set('sortOption', 'nameAsc');
    router.push(url.toString());
    localStorage.removeItem('filteredUsers'); // Clear the stored data on refresh
  };

  const handleRowsPerPageChange = (rows: number) => {
    setRowsPerPage(rows);
    setTotalPages(Math.ceil(filteredUsers.length / rows));
    // Debug statement
    console.log('Rows Per Page Changed:', rows);
  };

  if (loading) return <Loading visible={true} />;
  if (error) return <p>{error}</p>;

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentUsers = filteredUsers.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <div className={styles.container}>
      <div className={styles.actions}>
        <SearchBar onSearch={setSearchQuery} />
        <SortDropdown onSort={handleSort} selectedSortOption={sortOption} />
        <button className={styles.refreshButton} onClick={handleRefresh}>
          <FontAwesomeIcon icon={faRefresh} className={styles.icon} />
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
});

export default Profiles;
