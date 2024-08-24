import { useState, useEffect } from "react";
import PropTypes from "prop-types";

export default function AreYouSureModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  id,
}) {
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    setModalOpen(isOpen);
  }, [isOpen]);

  const closeModal = () => {
    setModalOpen(false);
    onClose();
  };

  const handleConfirm = () => {
    closeModal();
    onConfirm(id);
  };

  return (
    <>
      {modalOpen && (
        <div className="fixed inset-0 z-50 overflow-auto bg-gray-700 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white w-full max-w-md p-6 rounded-md shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold">{title}</h2>
              <button
                className="text-paragraph-color hover:text-paragraph-color focus:outline-none"
                onClick={closeModal}
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
              </button>
            </div>
            <p>{message}</p>
            <div className="flex justify-end mt-4">
              <button
                className="mr-2 px-4  border font-Nunito py-2 bg-redtext-light rounded-md focus:outline-none"
                onClick={closeModal}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-red/50 font-Nunito text-light border  hover:bg-red rounded-md focus:outline-none"
                onClick={handleConfirm}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

AreYouSureModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};
