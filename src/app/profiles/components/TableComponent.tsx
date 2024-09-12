"use client"
import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Button,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  User,
  Pagination,
  Selection,
  SortDescriptor
} from "@nextui-org/react";
import { PlusIcon } from "../icons/PlusIcon";
import { VerticalDotsIcon } from "../icons/VerticalDotsIcon";
import { ChevronDownIcon } from "../icons/ChevronDownIcon";
import { SearchIcon } from "../icons/SearchIcon";
import { fetchUsers } from "../../../services/userService"; 

const INITIAL_VISIBLE_COLUMNS = ["name", "city", "country", "dob", "gender", "phone", "age", "ssn", "address"];

const columns = [
    { uid: 'name', label: 'Name' },
    { uid: 'city', label: 'City' },
    { uid: 'country', label: 'Country' },
    { uid: 'dob', label: 'Date of Birth' },
    { uid: 'gender', label: 'Gender' },
    { uid: 'phone', label: 'Phone' },
    { uid: 'age', label: 'Age' },
    { uid: 'ssn', label: 'SSN' },
    { uid: 'address', label: 'Address' }
  ];

type User = {
  gender: string;
  name: {
    title: string;
    first: string;
    last: string;
  };
  location: {
    street: {
      number: number;
      name: string;
    };
    city: string;
    state: string;
    country: string;
    postcode: string;
  };
  email: string;
  dob: {
    date: string;
    age: number;
  };
  phone: string;
  id: {
    name: string;
    value: string;
  };
  picture: {
    large: string;
    medium: string;
    thumbnail: string;
  };
};

export default function App() {
  const [users, setUsers] = React.useState<User[]>([]);
  const [filterValue, setFilterValue] = React.useState("");
  const [selectedKeys, setSelectedKeys] = React.useState<Selection>(new Set([]));
  const [visibleColumns, setVisibleColumns] = React.useState<Selection>(new Set(INITIAL_VISIBLE_COLUMNS));
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [sortDescriptor, setSortDescriptor] = React.useState<SortDescriptor>({
    column: "age",
    direction: "ascending",
  });
  const [page, setPage] = React.useState(1);

  React.useEffect(() => {
    const loadUsers = async () => {
      try {
        const fetchedUsers = await fetchUsers();
        setUsers(fetchedUsers);
      } catch (error) {
        console.error("Failed to fetch users:", error);
      }
    };
    loadUsers();
  }, []);

  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = React.useMemo(() => {
    if (visibleColumns === "all") return columns;

    return columns.filter((column) => Array.from(visibleColumns).includes(column.uid));
  }, [visibleColumns]);

  const filteredItems = React.useMemo(() => {
    let filteredUsers = [...users];

    if (hasSearchFilter) {
      filteredUsers = filteredUsers.filter((user) =>
        user.name.first.toLowerCase().includes(filterValue.toLowerCase()) ||
        user.name.last.toLowerCase().includes(filterValue.toLowerCase())
      );
    }

    return filteredUsers;
  }, [users, filterValue]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = React.useMemo(() => {
    return [...items].sort((a: User, b: User) => {
      const column = sortDescriptor.column as keyof User;
      const first = a[column];
      const second = b[column];
  
      // Handle number types
      if (typeof first === 'number' && typeof second === 'number') {
        const cmp = first < second ? -1 : first > second ? 1 : 0;
        return sortDescriptor.direction === "descending" ? -cmp : cmp;
      }
  
      // Handle string types
      if (typeof first === 'string' && typeof second === 'string') {
        const cmp = first.localeCompare(second);
        return sortDescriptor.direction === "descending" ? -cmp : cmp;
      }
  
      // Handle other types (e.g., objects) or return 0 if not sortable
      return 0;
    });
  }, [sortDescriptor, items]);
  

 // Assuming User is a component from your UI library
const User = ({ avatarProps, description, name, children }: any) => (
    <div>
      <img src={avatarProps.src} alt={name} />
      <div>{name}</div>
      <div>{description}</div>
      <div>{children}</div>
    </div>
  );
  
  const renderCell = React.useCallback((user: User, columnKey: React.Key) => {
    switch (columnKey) {
      case "name":
        return (
          <User
            avatarProps={{ radius: "lg", src: user.picture.medium }}
            description={user.email}
            name={`${user.name.first} ${user.name.last}`}
          >
            {user.email}
          </User>
        ) as React.ReactNode;
      case "city":
        return user.location.city as React.ReactNode;
      case "country":
        return user.location.country as React.ReactNode;
      case "dob":
        return new Date(user.dob.date).toLocaleDateString() as React.ReactNode;
      case "gender":
        return user.gender as React.ReactNode;
      case "phone":
        return user.phone as React.ReactNode;
      case "age":
        return user.dob.age as React.ReactNode;
      case "ssn":
        return user.id.value as React.ReactNode;
      case "address":
        return `${user.location.street.number} ${user.location.street.name}` as React.ReactNode;
      default:
        return user[columnKey as keyof User] as React.ReactNode;
    }
  }, []);

  const onNextPage = React.useCallback(() => {
    if (page < pages) {
      setPage(page + 1);
    }
  }, [page, pages]);

  const onPreviousPage = React.useCallback(() => {
    if (page > 1) {
      setPage(page - 1);
    }
  }, [page]);

  const onRowsPerPageChange = React.useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setRowsPerPage(Number(e.target.value));
    setPage(1);
  }, []);

  const onSearchChange = React.useCallback((value?: string) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue("");
    }
  }, []);

  const onClear = React.useCallback(() => {
    setFilterValue("");
    setPage(1);
  }, []);

  const topContent = React.useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex justify-between gap-3 items-end">
          <Input
            isClearable
            className="w-full sm:max-w-[44%]"
            placeholder="Search by name..."
            startContent={<SearchIcon />}
            value={filterValue}
            onClear={() => onClear()}
            onValueChange={onSearchChange}
          />
          <div className="flex gap-3">
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button endContent={<ChevronDownIcon className="text-small" />} variant="flat">
                  Columns
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={visibleColumns}
                selectionMode="multiple"
                onSelectionChange={setVisibleColumns}
              >
                {INITIAL_VISIBLE_COLUMNS.map((column) => (
                  <DropdownItem key={column} className="capitalize">
                    {column}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <Button color="primary" endContent={<PlusIcon />}>
              Add New
            </Button>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">Total {users.length} users</span>
          <label className="flex items-center text-default-400 text-small">
            Rows per page:
            <select
              className="bg-transparent outline-none text-default-400 text-small"
              onChange={onRowsPerPageChange}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
            </select>
          </label>
        </div>
      </div>
    );
  }, [filterValue, visibleColumns, onSearchChange, onClear, rowsPerPage, users.length, page, pages]);

  const bottomContent = React.useMemo(() => (
    <div className="flex justify-between items-center">
      <Pagination
        total={pages}
        page={page}
        onChange={setPage}
        // showPerPageSelect={false}
      />
      <div className="text-small">
        Page {page} of {pages}
      </div>
    </div>
  ), [pages, page]);

  return (
    <Table aria-label="Table" className="h-full">
        
      <TableHeader>
        {headerColumns.map((column) => (
          <TableColumn key={column.uid} className="capitalize">
            {column.label}
          </TableColumn>
        ))}
      </TableHeader>
      <TableBody>
        {sortedItems.map((user, index) => (
          <TableRow key={index}>
            {headerColumns.map((column) => (
              <TableCell key={column.uid}>{renderCell(user, column.uid)}</TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
      {/* <TableFooter>
        {topContent}
        {bottomContent}
      </TableFooter> */}
    </Table>
  );
}
