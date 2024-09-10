// // components/Card.tsx
// import React, { useRef, useEffect } from 'react';
// import styled from 'styled-components';

// const CardContainer = styled.div`
//   --flow-space: 0.5em;
//   --hsl: var(--hue), var(--saturation), var(--lightness);
//   flex: 1 1 14rem;
//   padding: 1.5em 2em;
//   display: grid;
//   grid-template-rows: auto auto auto 1fr;
//   align-items: start;
//   gap: 1.25em;
//   color: #eceff1;
//   background-color: #2b2b2b;
//   border: 1px solid #eceff133;
//   border-radius: 15px;
//   position: relative;
//   overflow: hidden;
//   transition: background 400ms ease;

//   &:hover {
//     --lightness: 95%;
//     background: hsla(var(--hsl), 0.1);
//   }
// `;

// const Cta = styled.a`
//   display: block;
//   align-self: end;
//   margin: 1em 0 0.5em 0;
//   text-align: center;
//   text-decoration: none;
//   color: #fff;
//   background-color: #0d0d0d;
//   padding: 0.7em;
//   border-radius: 10px;
//   font-size: 1rem;
//   font-weight: 600;
// `;

// const Card: React.FC<{ heading: string; price: string; bullets: string[]; ctaText: string }> = ({ heading, price, bullets, ctaText }) => {
//   const cardRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     const handlePointerMove = (e: MouseEvent) => {
//       const overlay = document.querySelector('.overlay') as HTMLElement;
//       if (overlay && cardRef.current) {
//         const x = e.pageX - cardRef.current.offsetLeft;
//         const y = e.pageY - cardRef.current.offsetTop;
//         overlay.style.setProperty('--x', `${x}px`);
//         overlay.style.setProperty('--y', `${y}px`);
//         overlay.style.setProperty('--opacity', '1');
//       }
//     };

//     document.body.addEventListener('pointermove', handlePointerMove);

//     return () => {
//       document.body.removeEventListener('pointermove', handlePointerMove);
//     };
//   }, []);

//   return (
//     <CardContainer ref={cardRef} className="card">
//       <h2 className="card__heading">{heading}</h2>
//       <p className="card__price">{price}</p>
//       <ul role="list" className="card__bullets">
//         {bullets.map((bullet, index) => (
//           <li key={index}>{bullet}</li>
//         ))}
//       </ul>
//       <Cta href={`#${ctaText.toLowerCase().replace(/\s+/g, '-')}`} className="card__cta">{ctaText}</Cta>
//     </CardContainer>
//   );
// };

// export default Card;
