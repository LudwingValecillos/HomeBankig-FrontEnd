// import React, { useState, cloneElement } from 'react';

// const VerticalCenteredModal = (props) => {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   console.log(isModalOpen);
  
//   console.log(props.open);


  
//   if(props.open){
//     setIsModalOpen(!isModalOpen)
//   }

//   const toggleModal = () => setIsModalOpen(!isModalOpen);

//   return (
//     <div>
//       {/* Botón para abrir modal centrado verticalmente */}
//       {props.img ? 
//         cloneElement(props.img, { onClick: toggleModal })
//       : ""
//       }

//       {/* Modal centrado verticalmente */}
//       {isModalOpen && (
//         <div
//           className="fixed left-0 top-0 z-[1055] flex h-full w-full items-center justify-center overflow-hidden outline-none"
//           tabIndex="-1"
//           role="dialog"
//           aria-modal="true"
//         >
//           <div className="relative w-full max-w-[500px] bg-white dark:bg-surface-dark rounded-md shadow-lg">
//             <div className="flex justify-between items-center p-4 border-b-2">
//               <h5 className="text-xl font-medium">{props.title}</h5>
//               <button
//                 type="button"
//                 className="text-neutral-500 dark:text-neutral-400"
//                 onClick={toggleModal}
//               >
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   strokeWidth="1.5"
//                   stroke="currentColor"
//                   className="h-6 w-6"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     d="M6 18L18 6M6 6l12 12"
//                   />
//                 </svg>
//               </button>
//             </div>
//             <div className="p-4">
//               <p>{props.content ? props.content : 'This is a vertically centered modal.'}</p>
//             </div>
//             <div className="flex justify-end p-4 border-t-2">
//               <button
//                 type="button"
//                 className="bg-primary-100 text-primary-700 px-6 pb-2 pt-2.5 rounded text-xs font-medium uppercase"
//                 onClick={toggleModal}
//               >
//                 Close
//               </button>
//               <button
//                 type="button"
//                 className="ml-2 bg-primary px-6 pb-2 pt-2.5 rounded text-xs font-medium uppercase"
//               >
//                 Save changes
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default VerticalCenteredModal;

import React, { useState, useEffect } from 'react';

const VerticalCenteredModal = ({ open, title, content, onClose }) => {
  // Estado interno para manejar si el modal está abierto o cerrado
  const [isModalOpen, setIsModalOpen] = useState(open);

  // Efecto para sincronizar el estado interno con la prop `open`
  useEffect(() => {
    setIsModalOpen(open);
  }, [open]);

  // Maneja el cierre del modal
  const handleClose = () => {
    setIsModalOpen(false);
    if (onClose) onClose(); // Llama a la función onClose si se proporciona
  };

  // Si el modal no está abierto, no renderiza nada
  if (!isModalOpen) return null;

  return (
    <div
      className="fixed left-0 top-0 z-[1055] flex h-full w-full items-center justify-center overflow-hidden outline-none"
      tabIndex="-1"
      role="dialog"
      aria-modal="true"
    >
      <div className="relative w-full max-w-[500px] bg-white dark:bg-surface-dark rounded-md shadow-lg">
        <div className="flex justify-between items-center p-4 border-b-2">
          <h5 className="text-xl font-medium">{title}</h5>
          <button
            type="button"
            className="text-neutral-500 dark:text-neutral-400"
            onClick={handleClose} // Cierra el modal al hacer clic en la "X"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div className="p-4">
          <p>{content || 'This is a vertically centered modal.'}</p>
        </div>
        <div className="flex justify-end p-4 border-t-2">
          <button
            type="button"
            className="bg-primary-100 text-primary-700 px-6 pb-2 pt-2.5 rounded text-xs font-medium uppercase"
            onClick={handleClose} // Cierra el modal al hacer clic en "Close"
          >
            Close
          </button>
          <button
            type="button"
            className="ml-2 bg-primary px-6 pb-2 pt-2.5 rounded text-xs font-medium uppercase"
          >
            I accept
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerticalCenteredModal;

