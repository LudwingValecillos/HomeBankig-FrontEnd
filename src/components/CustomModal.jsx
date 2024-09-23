import React, { useState } from 'react';
import { Modal, Ripple, initTWE } from 'tw-elements';

initTWE({ Modal, Ripple });

const CustomModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isScrollableModalOpen, setIsScrollableModalOpen] = useState(false);

  const toggleModal = () => setIsModalOpen(!isModalOpen);
  const toggleScrollableModal = () => setIsScrollableModalOpen(!isScrollableModalOpen);

  return (
    <div className="space-y-2">
      {/* Botón para abrir modal centrado verticalmente */}
      <button
        type="button"
        className="inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-primary-3 transition duration-150 ease-in-out hover:bg-primary-accent-300 focus:bg-primary-accent-300 focus:outline-none"
        onClick={toggleModal}
      >
        Vertically centered modal
      </button>

      {/* Botón para abrir modal centrado verticalmente con scroll */}
      <button
        type="button"
        className="inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-primary-3 transition duration-150 ease-in-out hover:bg-primary-accent-300 focus:bg-primary-accent-300 focus:outline-none"
        onClick={toggleScrollableModal}
      >
        Vertically centered scrollable modal
      </button>

      {/* Modal centrado verticalmente */}
      {isModalOpen && (
        <div
          className="fixed left-0 top-0 z-[1055] flex h-full w-full items-center justify-center overflow-hidden outline-none"
          tabIndex="-1"
          role="dialog"
          aria-modal="true"
        >
          <div className="relative w-full max-w-[500px] bg-white dark:bg-surface-dark rounded-md shadow-lg">
            <div className="flex justify-between items-center p-4 border-b-2">
              <h5 className="text-xl font-medium">Modal title</h5>
              <button
                type="button"
                className="text-neutral-500 dark:text-neutral-400"
                onClick={toggleModal}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-4">
              <p>This is a vertically centered modal.</p>
            </div>
            <div className="flex justify-end p-4 border-t-2">
              <button
                type="button"
                className="bg-primary-100 text-primary-700 px-6 pb-2 pt-2.5 rounded text-xs font-medium uppercase"
                onClick={toggleModal}
              >
                Close
              </button>
              <button
                type="button"
                className="ml-2 bg-primary text-white px-6 pb-2 pt-2.5 rounded text-xs font-medium uppercase"
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal centrado verticalmente con scroll */}
      {isScrollableModalOpen && (
        <div
          className="fixed left-0 top-0 z-[1055] flex h-full w-full items-center justify-center overflow-y-auto overflow-x-hidden outline-none"
          tabIndex="-1"
          role="dialog"
          aria-modal="true"
        >
          <div className="relative w-full max-w-[500px] bg-white dark:bg-surface-dark rounded-md shadow-lg">
            <div className="flex justify-between items-center p-4 border-b-2">
              <h5 className="text-xl font-medium">Modal title</h5>
              <button
                type="button"
                className="text-neutral-500 dark:text-neutral-400"
                onClick={toggleScrollableModal}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-4">
              <p>This is a vertically centered scrollable modal. Add more content here to trigger scrolling.</p>
              <br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
              <p>Just like that.</p>
            </div>
            <div className="flex justify-end p-4 border-t-2">
              <button
                type="button"
                className="bg-primary-100 text-primary-700 px-6 pb-2 pt-2.5 rounded text-xs font-medium uppercase"
                onClick={toggleScrollableModal}
              >
                Close
              </button>
              <button
                type="button"
                className="ml-2 bg-primary text-white px-6 pb-2 pt-2.5 rounded text-xs font-medium uppercase"
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomModal;
