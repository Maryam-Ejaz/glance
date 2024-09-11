"use client";

import React from 'react';
import { motion } from 'framer-motion';
import styles from '../styles/UserProfile.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faPhone, faMapMarkerAlt, faBirthdayCake, faFlag } from '@fortawesome/free-solid-svg-icons';

interface TabMenuProps {
    activeTab: number;
    onTabChange: (index: number) => void;
}

const tabs = [
    { icon: faUser, title: 'Profile' },
    { icon: faEnvelope, title: 'Contact' },
    { icon: faPhone, title: 'Phone' },
    { icon: faMapMarkerAlt, title: 'Location' },
    { icon: faBirthdayCake, title: 'Birthday' },
    { icon: faFlag, title: 'Nationality' }
];

const iconVariants = {
    active: {
        scale: 1.2,
        color: '#9c47fc', // Purple color
        transition: {
            duration: 0.4,
            ease: 'easeInOut',
        },
    },
    inactive: {
        scale: 1,
        color: '#575656', // Default color
        transition: {
            duration: 0.4,
            ease: 'easeInOut',
        },
    },
};

const TabMenu: React.FC<TabMenuProps> = ({ activeTab, onTabChange }) => (
    <div className={styles.containerTab}>
        <div className={styles.tabMenu}>
            {tabs.map((tab, index) => (
                <motion.button
                    key={index}
                    className={`${styles.tab} ${activeTab === index ? styles.active : ''}`}
                    onClick={() => onTabChange(index)}
                    initial={false}
                    animate={activeTab === index ? 'active' : 'inactive'}
                    variants={iconVariants}
                    transition={{ duration: 0.4 }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                >
                    <motion.div
                        initial={false}
                        animate={{ color: activeTab === index ? '#9c47fc' : '#575656' }}
                        transition={{
                            duration: 0.4,
                            ease: 'easeInOut',
                        }}
                    >
                        <FontAwesomeIcon icon={tab.icon} />
                    </motion.div>
                </motion.button>
            ))}
        </div>
    </div>
);

export default TabMenu;
