import { fetchUsers } from "@/services/userService";

const columns = [
    { name: "ID", uid: "id", sortable: true },
    { name: "NAME", uid: "name", sortable: true },
    { name: "DOB", uid: "dob", sortable: true },
    { name: "CITY", uid: "city", sortable: true },
    { name: "COUNTRY", uid: "country", sortable: true },
    { name: "TIMEZONE", uid: "timezone" },
    { name: "GENDER", uid: "gender", sortable: true },
    { name: "SSN", uid: "ssn" },
    { name: "ACTIONS", uid: "actions" },
];

const statusOptions = [
    { name: "Male", uid: "male" },
    { name: "Female", uid: "female" },
    { name: "Other", uid: "other" },
];


let users: any[] = []; 

const initializeData = async () => {
    try {
        const fetchedData = await fetchUsers();
        users = fetchedData; 
    } catch (error) {
        console.error('Error fetching user data:', error);
        users = []; 
    }
};


initializeData();

export { columns, statusOptions, users };
