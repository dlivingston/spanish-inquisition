'use client'

import React, { useState } from 'react';

const borrowers = [
  { id: 1, name: "Odessa Goodwyn" },
  { id: 2, name: "Myra Chunkle" },
  { id: 3, name: "Gladys Overnow" }
];

export default function Home() {
  const [formData, setFormData] = useState<{
    name: string;
    category: string;
    escrowStatus: string;
    borrowers: string[];
  }>({
    name: '',
    category: '',
    escrowStatus: '',
    borrowers: []
  });

  const [validationMessage, setValidationMessage] = useState('');

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleCheckboxChange = (e) => {
    const { id, checked } = e.target;
    setFormData((prevState) => {
      const newBorrowers = checked
        ? [...prevState.borrowers, id]
        : prevState.borrowers.filter((borrowerId) => borrowerId !== id);
      return { ...prevState, borrowers: newBorrowers };
    });
  };

  const handleRadioChange = (e) => {
    const { id } = e.target;
    setFormData({ ...formData, escrowStatus: id });
  };

  const handleCancel = () => {
    setFormData({
      name: '',
      category: '',
      escrowStatus: '',
      borrowers: []
    });
    setValidationMessage('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, category, escrowStatus, borrowers } = formData;
    if (name && category && escrowStatus && borrowers.length > 0) {
      console.log("Successfully Submitted");
      setValidationMessage('');
    } else {
      setValidationMessage('Please fill out all fields correctly.');
    }
  };

  return (
    <div className="bg-slate-200 flex flex-col items-center justify-start min-h-screen gap-66 font-[family-name:var(--font-geist-sans)]">
      <header className="bg-white row-start-1 flex items-center justify-between px-6 w-full">
        <h3 className="text-xl font-semibold my-6">Nobody Expects The Spanish Inquisition</h3>
        <button
            className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-36"
            type="button"
            onClick={handleCancel}
          >
            Cancel
          </button>
      </header>
      <main className="bg-white mt-6 rounded-md flex flex-col w-full min-w-[560px] max-w-[880px] p-8">
        <h2 className="text-2xl mb-4">Our Chief Weapon is Surprise</h2>
        <form className="w-full">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Select all borrowers that were impacted by the disaster
            </label>
            {borrowers.map((borrower) => (
              <div key={borrower.id} className="flex items-center mb-2">
                <input
                  className="mr-2 leading-tight"
                  type="checkbox"
                  id={borrower.id.toString()}
                  name="borrowers"
                  checked={formData.borrowers.includes(borrower.id.toString())}
                  onChange={handleCheckboxChange}
                />
                <label className="text-gray-700" htmlFor={borrower.id.toString()}>
                  {borrower.name}
                </label>
              </div>
            ))}
          </div>
          <div className="flex grow gap-4 items-start flex-col lg:flex-row">
            <div className="flex-auto w-full lg:max-w-50 mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                Name
              </label>
              <input
                className="lock w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                id="name"
                type="text"
                value={formData.name}
                onChange={handleInputChange}
              />
              <p className="mt-3 text-sm/6 text-gray-600">Please fill out the payee&apos;s full name</p>
            </div>
            <div className="flex-auto w-full lg:max-w-50 mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="category">
                Category
              </label>
              <div className="grid grid-cols-1">
                <select
                  className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pl-3 pr-8 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  id="category"
                  value={formData.category}
                  onChange={handleInputChange}
                >
                  <option value="">Select a category</option>
                  <option value="category1">Category 1</option>
                  <option value="category2">Category 2</option>
                  <option value="category3">Category 3</option>
                </select>
                <svg className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" data-slot="icon">
                  <path fillRule="evenodd" d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Escrow Status
            </label>
            <div className="flex items-center">
              <input
                className="mr-2 leading-tight"
                type="radio"
                id="status1"
                name="escrowStatus"
                checked={formData.escrowStatus === 'status1'}
                onChange={handleRadioChange}
              />
              <label className="text-gray-700" htmlFor="status1">
                Escrowed
              </label>
            </div>
            <div className="flex items-center">
              <input
                className="mr-2 leading-tight"
                type="radio"
                id="status2"
                name="escrowStatus"
                checked={formData.escrowStatus === 'status2'}
                onChange={handleRadioChange}
              />
              <label className="text-gray-700" htmlFor="status2">
                Non-escrowed
              </label>
            </div>
          </div>
        </form>
        {validationMessage && (
          <div className="mb-4 text-red-500">
            {validationMessage}
          </div>
        )}
      </main>
      <footer className="row-start-3 mt-auto self-end flex gap-6 flex-wrap items-center justify-end w-full px-6 py-4 bg-white">
        <button
          className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-36"
          type="button"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </footer>
    </div>
  );
}
