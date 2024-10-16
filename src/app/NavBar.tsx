"use client";
import React from "react";

const Navbar: React.FC = () => {
  return (
    <div className="flex px-2">
      <div className="w-full border-b-2 border-blue-500 pt-4">
        <div className=" text-black dark:text-gray-200 bg-white">
          <div className=" p-4">
            <nav className="flex">
              <a
                className="px-4 py-2 mt-2 text-xl font-semibold bg-transparent rounded-lg dark:bg-transparent dark:hover:bg-gray-600 dark:focus:bg-gray-600 dark:focus:text-white dark:hover:text-white dark:text-gray-200 md:mt-0 md:ml-4 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
                href="/"
              >
                Page d'Accueil
              </a>
              <a
                className="px-4 py-2 mt-2 text-xl font-semibold bg-transparent rounded-lg dark:bg-transparent dark:hover:bg-gray-600 dark:focus:bg-gray-600 dark:focus:text-white dark:hover:text-white dark:text-gray-200 md:mt-0 md:ml-4 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
                href="/"
              >
                Page des Tâches
              </a>
              <a
                className="px-4 py-2 mt-2 text-xl font-semibold bg-transparent rounded-lg dark:bg-transparent dark:hover:bg-gray-600 dark:focus:bg-gray-600 dark:focus:text-white dark:hover:text-white dark:text-gray-200 md:mt-0 md:ml-4 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
                href="/"
              >
                Inscription et Connexion
              </a>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
