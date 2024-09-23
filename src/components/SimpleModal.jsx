import React, { useState } from 'react';

const SimpleModal = (props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  props.toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  }
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <>
      {isModalOpen && (
        <div
          className="static left-0 top-0 z-[1055] block h-full w-full overflow-y-auto overflow-x-hidden outline-none"
          tabIndex="-1"
          aria-labelledby="exampleModalComponentsLabel"
          aria-hidden="true"
        >
          <div className="relative w-auto min-[576px]:mx-auto min-[576px]:my-7 min-[576px]:max-w-[500px] transition-all duration-300 ease-in-out">
            <div className="relative flex w-full flex-col rounded-md border-none bg-white shadow-4 text-current outline-none dark:bg-surface-dark">
              <div className="flex items-center justify-between p-4 border-b-2 border-neutral-100 dark:border-white/10">
                <h5 className="text-xl font-medium text-surface dark:text-white" id="exampleModalComponentsLabel">
                  Modal title
                </h5>
                <button
                  type="button"
                  className="text-neutral-500 dark:text-neutral-400 hover:text-neutral-800 focus:text-neutral-800 dark:hover:text-neutral-300 dark:focus:text-neutral-300"
                  onClick={toggleModal}
                >
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="h-6 w-6"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </span>
                </button>
              </div>
              <div className="relative flex-auto p-4">
                Modal body text goes here.
              </div>
              <div className="flex items-center justify-end p-4 border-t-2 border-neutral-100 dark:border-white/10">
                <button
                  type="button"
                  className="rounded bg-primary-100 px-6 pb-2 pt-2.5 text-xs font-medium uppercase text-primary-700 transition duration-150 ease-in-out hover:bg-primary-accent-200 focus:bg-primary-accent-200 focus:outline-none"
                  onClick={toggleModal}
                >
                  Close
                </button>
                <button
                  type="button"
                  className="ml-1 rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase text-white shadow-primary-3 transition duration-150 ease-in-out hover:bg-primary-accent-300 focus:bg-primary-accent-300 active:bg-primary-600"
                >
                  Save changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SimpleModal;
