import React from 'react';
import { fetchUserById } from '../../../services/userService'; 


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
