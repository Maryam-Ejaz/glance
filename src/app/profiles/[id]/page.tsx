'use client';

import React, { useEffect, useState } from 'react';
import { fetchUserById } from '../../../services/userService';
import styles from '../styles/UserProfile.module.css';
import TabMenu from '../components/TabMenu';
import { MapProvider } from '../providers/MapProvider';
import { MapComponent } from '../components/Map';
import "/node_modules/flag-icons/css/flag-icons.min.css";
import Loading from '../loading';

interface UserProfileProps {
    params: { id: string };
}

const UserProfile: React.FC<UserProfileProps> = ({ params }) => {
    const { id } = params;
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [activeTab, setActiveTab] = useState<number>(0);

    useEffect(() => {
        const getUser = async () => {
            try {
                const userData = await fetchUserById(id);
                if (userData) {
                    setUser(userData);
                } else {
                    setError('User not found');
                }
            } catch (err) {
                setError('Failed to fetch user data');
            } finally {
                setLoading(false);
            }
        };

        getUser();
    }, [id]);

    const handleTabChange = (index: number) => {
        setActiveTab(index);
    };

    if (loading) return <Loading visible={false} />;
    if (error) return <p>{error}</p>;

    const countryCode = user?.nat?.toLowerCase();

    const tabContents = [
        <div key="personal-info">
            <div><p className={styles.label}>Name: </p><p className={styles.value}>{user?.name?.title} {user?.name?.first} {user?.name?.last}</p></div>
            <div><p className={styles.label}>Title: </p><p className={styles.value}>{user?.name?.title}</p></div>
            <div><p className={styles.label}>Gender: </p><p className={styles.value}>{user?.gender}</p></div>
            <div><p className={styles.label}>Nationality: </p><p className={styles.value}>{user?.nat}</p></div>
            <div><p className={styles.label}>SSN: </p><p className={styles.value}>{user?.id?.value}</p></div>
        </div>,
        <div key="email-info">
            <div><p className={styles.label}>Email: </p><p className={styles.value}>{user?.email}</p></div>
        </div>,
        <div key="phone-info">
            <div><p className={styles.label}>Phone: </p><p className={styles.value}>{user?.phone}</p></div>
            <div><p className={styles.label}>Cell: </p><p className={styles.value}>{user?.cell}</p></div>
        </div>,
        <div key="location-info">
            <div><p className={styles.label}>Location: </p><p className={styles.value}>{user?.location?.street.number} {user?.location?.street.name}, {user?.location?.city}, {user?.location?.state}, {user?.location?.country} {user?.location?.postcode}</p></div>
            <div><p className={styles.label}>Coordinates: </p><p className={styles.value}>{user?.location?.coordinates.latitude}, {user?.location?.coordinates.longitude}</p></div>
            <div><p className={styles.label}>Timezone: </p><p className={styles.value}>{user?.location?.timezone?.description}</p></div>
            {/* Map */}
            <MapProvider>
                <MapComponent center={{
                    lat: parseFloat(user?.location?.coordinates.latitude),
                    lng: parseFloat(user?.location?.coordinates.longitude)
                }} />
            </MapProvider>
        </div>,
        <div key="dob-info">
            <div><p className={styles.label}>Date of Birth: </p><p className={styles.value}>{new Date(user?.dob?.date).toLocaleDateString()}</p></div>
            <div><p className={styles.label}>Age: </p><p className={styles.value}>{user?.dob?.age}</p></div>
        </div>,
        <div key="registration-info">
            <div><p className={styles.label}>Registered: </p><p className={styles.value}>{new Date(user?.registered?.date).toLocaleDateString()}</p></div>
            <div><p className={styles.label}>Years Registered: </p><p className={styles.value}>{new Date().getFullYear() - new Date(user?.registered?.date).getFullYear()}</p></div>
        </div>
    ];

    return (
        <div className={styles.container}>
            {loading ? (
                <Loading visible={false} /> // Display loading state
            ) : (
                <div className={styles.content}>
                    {user ? (
                        <>
                            {user.picture?.large ? (
                                <div className={styles.profileContainer}>
                                    {/* Display the flag above the profile picture */}
                                    {countryCode && (
                                        <span
                                            className={`fi fis fi-${countryCode} flag-icon-squared ${styles.flagIcon}`}
                                        ></span>
                                    )}
                                    <img
                                        src={user.picture.large}
                                        alt={`${user.name?.first} ${user.name?.last}`}
                                        className={styles.profileImage}
                                    />
                                </div>
                            ) : (
                                <p>No profile picture available</p>
                            )}
                            <div className={styles.nameContainer}>
                                <h2>{`${user.name?.title} ${user.name?.first} ${user.name?.last}`}</h2>
                                <TabMenu activeTab={activeTab} onTabChange={handleTabChange} />
                            </div>

                            <div className={styles.textContainer}>
                                {tabContents[activeTab]}
                            </div>
                        </>
                    ) : (
                        <p>User data not available</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default UserProfile;
