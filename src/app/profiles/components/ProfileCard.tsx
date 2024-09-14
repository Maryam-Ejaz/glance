import styles from '../styles/ProfileCard.module.css';
import { useRouter } from 'next/navigation';
import { cn } from '../utils/spot-light-utils'
import Image from 'next/image'
import React, { MouseEvent, useRef, useState } from 'react'

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

const ProfileCard: React.FC<ProfileCardProps> = React.memo(({ user }) => {

  const boxWrapper = useRef(null)
  const [isHovered, setIsHovered] = useState(false)
  const [mousePosition, setMousePosition] = React.useState({
    x: null,
    y: null,
  })
  React.useEffect(() => {
    const updateMousePosition = (ev: { clientX: any; clientY: any }) => {
      setMousePosition({ x: ev.clientX, y: ev.clientY })
    }
    window.addEventListener('mousemove', updateMousePosition)
    return () => {
      window.removeEventListener('mousemove', updateMousePosition)
    }
  }, [])

  const [overlayColor, setOverlayColor] = useState({ x: 0, y: 0 })
  const handleMouseMove: React.MouseEventHandler<HTMLDivElement> = (event) => {
    const { currentTarget, clientX, clientY } = event;

    // Calculate position within the target
    const { left, top } = currentTarget.getBoundingClientRect();
    const x = clientX - left;
    const y = clientY - top;

    setOverlayColor({ x, y });
  };

  const router = useRouter();

  const handleClick = () => {
    // Navigate to the user detail page with the user's UUID
    router.push(`/profiles/${user.login.uuid}`);
  };

  return (
    <div>
      <div
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        ref={boxWrapper}
        className={cn(
          'group relative rounded-2xl  p-[2px] bg-[#eeeeee15] overflow-hidden w-100% mx-auto'
        )}
      >
        {isHovered && (
          <div
            className="pointer-events-none absolute opacity-0 z-50 rounded-xl w-full h-full group-hover:opacity-100  transition duration-300 "
            style={{
              //     background: `
              //   radial-gradient(
              //     250px circle at ${overlayColor.x}px ${overlayColor.y}px,
              //     rgba(255, 255, 255, 0.137),
              //     transparent 100%
              //   )
              // `,
            }}
          />
        )}

        <div
          className="absolute inset-0 z-0  bg-fixed rounded-lg"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, #ffffff6e 0%,transparent 20%,transparent) fixed`,
          }}
        ></div>


        <div onClick={handleClick} className={styles.card}>
          {/* <Link href={`/${user.login.uuid}`}> */}
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
          {/* </Link> */}
        </div>
      </div>
    </div>

  );
});

export default ProfileCard;
