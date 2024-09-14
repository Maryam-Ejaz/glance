"use client";
import React from "react";
import styles from '../styles/Loading.module.css';
import LoadingSkeleton from './loadingDetail';

interface LoadingProps {
  visible: boolean;
}

const Loading: React.FC<LoadingProps> = ({ visible }) => {
  if (visible) {
    return (
      <div className={styles.container}>
        <div className={styles.actions}>
          {/* Search Button */}
          <button className={styles.searchButton}></button>

          {/* Sort Button */}
          <button className={styles.sortButton}></button>

          {/* Refresh Button */}
          <button className={styles.refreshButton}></button>
        </div>

        <div className={styles.grid}>
          {[...Array(8)].map((_, index) => (
            <div className={`${styles.card} ${styles.skeleton}`} key={index}>
              <div className={styles.skeletonCircle}></div>
              <div className={`${styles.skeletonLine} ${styles.short}`}></div>
              <div className={`${styles.skeletonLine} ${styles.medium}`}></div>
              <div className={`${styles.skeletonLine} ${styles.full}`}></div>
              <div className={`${styles.skeletonLine} ${styles.full}`}></div>
              <div className={`${styles.skeletonLine} ${styles.full}`}></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Render LoadingSkeleton when visible is false
  return <LoadingSkeleton />;
};

export default Loading;
