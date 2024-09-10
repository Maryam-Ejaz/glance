import React from 'react';
import { fetchUserById } from '../../../services/userService'; 

interface User {
  name: { first: string; last: string };
  email: string;
  dob: { age: number };
  location: { city: string; country: string };
}

const UserProfile = async ({ params }: { params: { id: string } }) => {
  const { id } = params;

  // Fetch the user data by ID
  const user = await fetchUserById(id);

  if (!user) {
    return <p>User not found</p>;
  }

  return (
    <div>
      <h1>{`HERE`}</h1>

    </div>
  );
};

export default UserProfile;
