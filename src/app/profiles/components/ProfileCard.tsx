import React from 'react';
import styles from '../styles/ProfileCard.module.css';
import { useRouter } from 'next/navigation';

interface ProfileCardProps {
  user: {
    gender: string;
    name: { title: string; first: string; last: string };
    location: {
      street: { number: number; name: string };
      city: string;
      state: string;
      country: string;
      postcode: number;
      coordinates: { latitude: string; longitude: string };
      timezone: { offset: string; description: string };
    };
    email: string;
    login: {
      uuid: string;
      username: string;
      password: string;
      salt: string;
      md5: string;
      sha1: string;
      sha256: string;
    };
    dob: { date: string; age: number };
    registered: { date: string; age: number };
    phone: string;
    cell: string;
    id: { name: string; value: string };
    picture: {
      large: string;
      medium: string;
      thumbnail: string;
    };
    nat: string;
  };
}

const ProfileCard: React.FC<ProfileCardProps> = ({ user }) => {
  const router = useRouter();

  const handleClick = () => {
    // Navigate to the user detail page with the user's UUID
    router.push(`/profiles/${user.login.uuid}`);
  };

  return (
    <div onClick={handleClick} className={styles.card}>
      <div className={styles.cardCover} style={{ backgroundImage: `url(${user.picture.large})` }}></div>
      <div className={styles.cardContent}>
        <img
          className={styles.avatar}
          src={user.picture.large}
          alt={`${user.name.first} ${user.name.last}`}
        />
        <div className={styles.infoWrapper}>
          <h2 className={styles.name}>
            {`${user.name.first} ${user.name.last}`}
          </h2>
          <p className={styles.info}>{user.location.country}</p>
        </div>
      </div>
      <div className={styles.additionalInfo}>
        <p className={styles.info}>{user.email}</p>
        <p className={styles.info}>{user.dob.age} years old</p>
        <p className={styles.info}>{user.phone}</p>
      </div>
    </div>
  );
};

export default ProfileCard;
