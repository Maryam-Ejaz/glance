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
  Chip,
  User,
  Pagination,
  Selection,
  ChipProps,
  SortDescriptor,
  image
} from "@nextui-org/react";
import { useRouter } from 'next/navigation';
import { VerticalDotsIcon } from "../icons/VerticalDotsIcon";
import { ChevronDownIcon } from "../icons/ChevronDownIcon";
import { SearchIcon } from "../icons/SearchIcon";
import { columns, users, statusOptions } from "../data/TableData";
import { capitalize } from "../utils/utils";

const statusColorMap: Record<string, ChipProps["color"]> = {
  male: "primary",
  female: "secondary",
  other: "success",
};

const INITIAL_VISIBLE_COLUMNS = ["name", "country", "dob", "gender", "actions"];

type User = typeof users[0];

export default function DemoTable() {
  const [filterValue, setFilterValue] = React.useState("");
  const [selectedKeys, setSelectedKeys] = React.useState<Selection>(new Set([]));
  const [visibleColumns, setVisibleColumns] = React.useState<Selection>(new Set(INITIAL_VISIBLE_COLUMNS));
  const [statusFilter, setStatusFilter] = React.useState<Selection>("all");
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [sortDescriptor, setSortDescriptor] = React.useState<SortDescriptor>({
    column: "name",
    direction: "ascending",
  });

  const [page, setPage] = React.useState(1);

  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = React.useMemo(() => {
    if (visibleColumns === "all") return columns;

    return columns.filter((column) => Array.from(visibleColumns).includes(column.uid));
  }, [visibleColumns]);

  const filteredItems = React.useMemo(() => {
    let filteredUsers = [...users];

    if (hasSearchFilter) {
      filteredUsers = filteredUsers.filter((user) =>
        user.name.first.toLowerCase().includes(filterValue.toLowerCase()),
      );
    }
    if (statusFilter !== "all" && Array.from(statusFilter).length !== statusOptions.length) {
      filteredUsers = filteredUsers.filter((user) =>
        Array.from(statusFilter).includes(user.gender),
      );
    }

    return filteredUsers;
  }, [users, filterValue, statusFilter]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);


  // Load state from local storage
  React.useEffect(() => {
    const savedState = localStorage.getItem('demoTableState');
    if (savedState) {
      const state = JSON.parse(savedState);
      console.log(state);
      setFilterValue(state.filterValue || "");
      setSelectedKeys(new Set(state.selectedKeys || []));
      setVisibleColumns(new Set(state.visibleColumns || INITIAL_VISIBLE_COLUMNS));
      setStatusFilter(state.statusFilter || "all");
      setRowsPerPage(state.rowsPerPage || 5);
      setSortDescriptor(state.sortDescriptor || { column: "name", direction: "ascending" });
      setPage(state.page || 1);
    }
  }, []);

  // Save state to local storage
  React.useEffect(() => {
    const state = {
      filterValue,
      selectedKeys: Array.from(selectedKeys),
      visibleColumns: Array.from(visibleColumns),
      statusFilter,
      rowsPerPage,
      sortDescriptor,
      page,
    };
    console.log(state);
    localStorage.setItem('demoTableState', JSON.stringify(state));
  }, [filterValue, selectedKeys, visibleColumns, statusFilter, rowsPerPage, sortDescriptor, page]);

  const router = useRouter();

  const handleClick = (uuid: string) => {
    // Navigate to the user detail page with the user's UUID
    router.push(`/profiles/${uuid}`);
  };


  // Perform Sorting of Columns
  const sortedItems = React.useMemo(() => {
    return [...items].sort((a: User, b: User) => {
      const column = sortDescriptor?.column ?? '';

      // Get field values for both 'a' and 'b' based on the column
      let first: any;
      let second: any;

      switch (column) {
        case "name":
          // Extract the full name for comparison
          first = `${a.name.first} ${a.name.last}`.toLowerCase();
          second = `${b.name.first} ${b.name.last}`.toLowerCase();
          break;
        case "country":
          // Compare based on the country name
          first = a.location.country.toLowerCase();
          second = b.location.country.toLowerCase();
          break;
        case "dob":
          // Convert the date of birth to a timestamp for comparison
          first = new Date(a.dob.date).getTime();
          second = new Date(b.dob.date).getTime();
          break;
        case "gender":
          // Compare based on gender
          first = a.gender.toLowerCase();
          second = b.gender.toLowerCase();
          break;
        default:
          // For other fields, fallback to comparing directly from the field
          first = a[column as keyof User];
          second = b[column as keyof User];

          // Ensure comparison for strings is case-insensitive
          if (typeof first === "string") first = first.toLowerCase();
          if (typeof second === "string") second = second.toLowerCase();
          break;
      }

      // Perform the comparison
      if (typeof first === "number" && typeof second === "number") {
        // Numeric comparison
        return sortDescriptor.direction === "descending" ? second - first : first - second;
      } else if (typeof first === "string" && typeof second === "string") {
        // String comparison
        return sortDescriptor.direction === "descending"
          ? second.localeCompare(first)
          : first.localeCompare(second);
      }

      // Default to no sorting if types do not match
      return 0;
    });
  }, [sortDescriptor, items]);

  const renderCell = React.useCallback((user: User, columnKey: React.Key): React.ReactNode => {


    const cellValue = user[columnKey as keyof User];

    switch (columnKey) {
      case "name":
        return (
          <User
            avatarProps={{ radius: "lg", src: user.picture.thumbnail, }}
            description={user.email}
            name={`${user.name.first} ${user.name.last}`}
          >
            {user.email}
          </User>
        );
      case "country":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">{user.location.country}</p>
          </div>
        );
      case "ssn":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">{user.id.value}</p>
          </div>
        );
      case "timezone":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">{user.location.timezone.offset}</p>
          </div>
        );
      case "id":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">{user.login.uuid}</p>
          </div>
        );
      case "city":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">{user.location.city}</p>
          </div>
        );
      case "dob":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">{new Date(user.dob.date).toLocaleDateString()}</p>
            <p className="text-bold text-tiny capitalize text-default-400">{`Age: ${user.dob.age}`}</p>
          </div>
        );
      case "gender":
        return (
          <Chip className="capitalize" color={statusColorMap[user.gender.toLowerCase()]} size="sm" variant="flat">
            {user.gender}
          </Chip>
        );
      case "actions":
        return (
          <div className="relative flex justify-end items-center gap-2">
            <Dropdown className="bg-color-[#2e2d2d]">
              <DropdownTrigger>
                <Button isIconOnly size="sm" variant="light">
                  <VerticalDotsIcon className="text-default-300" />
                </Button>
              </DropdownTrigger>
              <DropdownMenu>
                <DropdownItem onClick={() => handleClick(user.login.uuid)}>View</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        );
      default:
        // For other cases, ensure that cellValue is converted to a string or a ReactNode
        return typeof cellValue === 'string' || typeof cellValue === 'number' || React.isValidElement(cellValue)
          ? cellValue
          : JSON.stringify(cellValue); // Convert objects to a JSON string for display
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
    setFilterValue("")
    setPage(1)
  }, [])

  const topContent = React.useMemo(() => {
    return (
      <div className="flex flex-col gap-4 mt-[30px]">
        <div className="flex justify-between gap-3 items-end">
          <Input
            isClearable
            className="w-full sm:max-w-[44%]"
            placeholder="Search"
            startContent={<SearchIcon className=" mr-[10px]" />}
            value={filterValue}
            onClear={() => onClear()}
            onValueChange={onSearchChange}
          />
          <div className="flex gap-3">
            <Dropdown className="bg-color-[#2e2d2d]">
              <DropdownTrigger className="hidden sm:flex">
                <Button endContent={<ChevronDownIcon className="text-small" />} variant="flat">
                  Gender
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={statusFilter}
                selectionMode="multiple"
                onSelectionChange={setStatusFilter}
              >
                {statusOptions.map((status) => (
                  <DropdownItem key={status.uid} className="capitalize">
                    {capitalize(status.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <Dropdown className="bg-color-[#2e2d2d]">
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
                {columns.map((column) => (
                  <DropdownItem key={column.uid} className="capitalize">
                    {capitalize(column.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">Total {users.length} users</span>
          <label className="flex items-center text-default-400 text-small">
            Rows per page:
            <select
              className="outline-none text-default-400 text-small bg-color-[#171717]"
              onChange={onRowsPerPageChange}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
              <option value={users.length}>All</option>
            </select>
          </label>
        </div>
      </div>
    );
  }, [
    filterValue,
    statusFilter,
    visibleColumns,
    onSearchChange,
    onRowsPerPageChange,
    users.length,
    hasSearchFilter,
  ]);

  const bottomContent = React.useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-between items-center">
        <span className="w-[30%] text-small text-default-400">
          {selectedKeys === "all"
            ? "All items selected"
            : `${selectedKeys.size} of ${filteredItems.length} selected`}
        </span>
        <Pagination
          isCompact
          showControls
          showShadow
          color="default"
          page={page}
          total={pages}
          onChange={setPage}
        />
        <div className="hidden sm:flex w-[30%] justify-end gap-2">
          <Button isDisabled={pages === 1} size="sm" variant="flat" onPress={onPreviousPage}>
            Previous
          </Button>
          <Button isDisabled={pages === 1} size="sm" variant="flat" onPress={onNextPage}>
            Next
          </Button>
        </div>
      </div>
    );
  }, [selectedKeys, items.length, page, pages, hasSearchFilter]);

  return (
    <Table
      color="secondary"
      aria-label="Table"
      isHeaderSticky
      bottomContent={bottomContent}
      bottomContentPlacement="outside"
      classNames={{
        wrapper: "h-[60vh] bg-[#121212]",
      }}
      selectedKeys={selectedKeys}
      selectionMode="multiple"
      sortDescriptor={sortDescriptor}
      topContent={topContent}
      topContentPlacement="outside"
      onSelectionChange={setSelectedKeys}
      onSortChange={setSortDescriptor}
    >
      <TableHeader columns={headerColumns}>
        {(column) => (
          <TableColumn
            key={column.uid}
            align={column.uid === "actions" ? "center" : "start"}
            allowsSorting={column.sortable}
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody emptyContent={"No users found"} items={sortedItems}>
        {(item) => (
          <TableRow key={item.login.uuid}>
            {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
