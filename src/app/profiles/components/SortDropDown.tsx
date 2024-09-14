import React from 'react';
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from '@nextui-org/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSortAlphaDown, faSortAlphaUp, faSortNumericDown, faSortNumericUp } from '@fortawesome/free-solid-svg-icons';
import styles from '../styles/SortDropDown.module.css';

interface SortDropdownProps {
  onSort: (sortOption: string) => void;
  selectedSortOption: string;
}

const SortDropdown: React.FC<SortDropdownProps> = React.memo(({ onSort, selectedSortOption }) => {
  const [selectedKeys, setSelectedKeys] = React.useState<Set<string>>(new Set([selectedSortOption]));

  const selectedValue = React.useMemo(
    () => Array.from(selectedKeys).join(', ').replaceAll('_', ' '),
    [selectedKeys]
  );

  React.useEffect(() => {
    if (selectedSortOption && !selectedKeys.has(selectedSortOption)) {
      setSelectedKeys(new Set([selectedSortOption]));
    }
  }, [selectedSortOption]);

  return (
    <Dropdown className={styles.dropDown}>
      <DropdownTrigger>
        <Button variant="solid" className={styles.button}>
          <FontAwesomeIcon icon={faSortAlphaDown} /> Sort
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        aria-label="Sort users"
        variant="flat"
        disallowEmptySelection
        selectionMode="single"
        selectedKeys={selectedKeys}
        onSelectionChange={(keys) => {
          const selectedKey = Array.from(keys)[0] as string;
          setSelectedKeys(new Set([selectedKey]));
          onSort(selectedKey); // Notify the parent about the selected sort option
        }}
      >
        <DropdownItem key="nameAsc">
          <FontAwesomeIcon icon={faSortAlphaDown} /> Name Ascending
        </DropdownItem>
        <DropdownItem key="nameDesc">
          <FontAwesomeIcon icon={faSortAlphaUp} /> Name Descending
        </DropdownItem>
        <DropdownItem key="dobAsc">
          <FontAwesomeIcon icon={faSortNumericDown} /> DOB Ascending
        </DropdownItem>
        <DropdownItem key="dobDesc">
          <FontAwesomeIcon icon={faSortNumericUp} /> DOB Descending
        </DropdownItem>
        <DropdownItem key="cityAsc">
          <FontAwesomeIcon icon={faSortAlphaDown} /> City Ascending
        </DropdownItem>
        <DropdownItem key="cityDesc">
          <FontAwesomeIcon icon={faSortAlphaUp} /> City Descending
        </DropdownItem>
        <DropdownItem key="countryAsc">
          <FontAwesomeIcon icon={faSortAlphaDown} /> Country Ascending
        </DropdownItem>
        <DropdownItem key="countryDesc">
          <FontAwesomeIcon icon={faSortAlphaUp} /> Country Descending
        </DropdownItem>
        <DropdownItem key="genderAsc">
          <FontAwesomeIcon icon={faSortAlphaDown} /> Gender Ascending
        </DropdownItem>
        <DropdownItem key="genderDesc">
          <FontAwesomeIcon icon={faSortAlphaUp} /> Gender Descending
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
});

export default SortDropdown;
