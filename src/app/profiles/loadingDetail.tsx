import React from "react";
import styles from './styles/LoadingDetail.module.css';

const LoadingSkeleton = () => {
    return (
        <div className={styles.skeletonContainer}>
            <div className={styles.skeletonProfile}></div>
            <div className={styles.skeletonName}></div>
            <div className={styles.skeletonTab}></div>
            <div className={styles.skeletonText}></div>
        </div>
    );
};

export default LoadingSkeleton;
