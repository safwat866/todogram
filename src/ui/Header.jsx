import React, {useEffect, useState} from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import {getDoc, doc} from "firebase/firestore"
import {db} from '../firebase.js'

const Header = ({ toggleMenu, user, id }) => {
    const [categoryName, setCategoryName] = useState(null);

    useEffect( () => {
        if (!user) return;
        const getCategoryName = async () => {
            const categoryRef = doc(db, `users/${user.uid}/categories`, id);
            const categoryNameRef = await getDoc(categoryRef);
            setCategoryName(categoryNameRef.data().categoryName);
        }
        getCategoryName();
    }, [user, categoryName, id]);
  return (
    <div className="flex items-center justify-between px-5 py-3 shadow">
      <div className="flex gap-4 items-center">
        <RxHamburgerMenu
          className="text-2xl stroke-[.3px] cursor-pointer"
          onClick={toggleMenu}
        />
        <h2 className="select-none">{categoryName}</h2>
      </div>
      <div className="left-section">
        <div className="rounded-full bg-purple-500 w-10 h-10 text-white flex items-center justify-center cursor-pointer">
          <span>AS</span>
        </div>
      </div>
    </div>
  );
};

export default Header;
