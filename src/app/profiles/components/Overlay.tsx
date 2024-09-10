// // components/Overlay.tsx
// import React, { useEffect } from 'react';
// import styled from 'styled-components';

// const OverlayContainer = styled.div`
//   position: absolute;
//   inset: 0;
//   pointer-events: none;
//   user-select: none;
//   opacity: var(--opacity, 0);
//   -webkit-mask: radial-gradient(
//     25rem 25rem at var(--x) var(--y),
//     #000 1%,
//     transparent 50%
//   );
//   mask: radial-gradient(
//     25rem 25rem at var(--x) var(--y),
//     #000 1%,
//     transparent 50%
//   );
//   transition: 400ms mask ease;
//   will-change: mask;
// `;

// const OverlayCard = styled.div`
//   background-color: hsla(var(--hsl), 0.15);
//   border-color: hsla(var(--hsl), 1);
//   box-shadow: 0 0 0 1px inset hsl(var(--hsl));
//   position: absolute;
//   inset: 0;
//   overflow: hidden;

//   .cta {
//     display: block;
//     grid-row: -1;
//     width: 100%;
//     background-color: hsl(var(--hsl));
//     box-shadow: 0 0 0 1px hsl(var(--hsl));
//   }
// `;

// const Overlay: React.FC<{ cards: HTMLDivElement[] }> = ({ cards }) => {
//   useEffect(() => {
//     const observer = new ResizeObserver((entries) => {
//       entries.forEach((entry) => {
//         const cardIndex = cards.indexOf(entry.target as HTMLDivElement);
//         if (cardIndex >= 0) {
//           const overlayCard = document.querySelectorAll('.overlay .card')[cardIndex] as HTMLElement;
//           if (overlayCard) {
//             const { width, height } = entry.contentRect;
//             overlayCard.style.width = `${width}px`;
//             overlayCard.style.height = `${height}px`;
//           }
//         }
//       });
//     });

//     cards.forEach(card => observer.observe(card));

//     return () => {
//       observer.disconnect();
//     };
//   }, [cards]);

//   return (
//     <OverlayContainer className="overlay cards__inner">
//       {cards.map((_, index) => (
//         <OverlayCard key={index} className="card">
//           <div className="cta">Get Started</div>
//         </OverlayCard>
//       ))}
//     </OverlayContainer>
//   );
// };

// export default Overlay;
