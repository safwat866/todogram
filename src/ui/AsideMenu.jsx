import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import AsideMenuItem from "./AsideMenuItem";
import { FaPlus } from "react-icons/fa";
import { db } from "../firebase";
import { collection, getDocs, doc , setDoc} from "firebase/firestore";
import { FaCheck } from "react-icons/fa";
import { MdEdit } from "react-icons/md";

const AsideMenu = ({ isMenuHidden, setIsMenuHidden, user }) => {
  const [categories, setCategories] = useState([]);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showCreateCategoryInput, setShowCreateCategoryInput] = useState(false);
  const [selectedEmojie, setSelectedEmojie] = useState(null);
  const [categoryInput, setCategoryInput] = useState("");

  useEffect(() => {
    if (!user) return;
    const fetchCategories = async () => {
      const snapshot = await getDocs(
        collection(db, "users", user.uid, "categories"),
      );
      console.log(snapshot.docs);
      setCategories(
        snapshot.docs.map((category) => ({
          id: category.id,
          ...category.data(),
        })),
      );
    };
    fetchCategories();
  }, [user]);

  const emojies = ["🛒", "🔒", "📚", "💻", "💭", "🛜", "🔗", "🤲"];

  const createCategoryHandler = () => {
    setShowCreateCategoryInput(prev => !prev);
    setSelectedEmojie(null);
  };

  const submitCategoryHandler = async () => {
    if (!categoryInput) return;
    setShowCreateCategoryInput(false);

    const newCategory = {
        categoryName: categoryInput,
        icon: selectedEmojie || "✏️",
      };

    setCategories((prev) => [...prev, newCategory]);
    // post category to db
    const categoriesRef = doc(collection(db, "users", user.uid, "categories"));
    await setDoc(categoriesRef, newCategory);
    // reset
    setCategoryInput("");
    setSelectedEmojie(null);
  }

  return (
    <>
      {/* Overlay */}
      <AnimatePresence>
        {!isMenuHidden && (
          <motion.div
            className="absolute inset-0 z-40 bg-black/60 backdrop-blur-sm transition-all duration-300 ease-in-out "
            onClick={setIsMenuHidden}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <div
        className={
          "absolute left-0 top-0 h-dvh w-70 bg-slate-800 shadow-2xl z-50 " +
          "transition-transform duration-300 ease-in-out  " +
          (isMenuHidden ? "-translate-x-full" : "translate-x-0")
        }
      >
        <div className="h-full overflow-y-auto text-white relative">
          <h2 className="p-4 border-b border-slate-600">Your Categories!</h2>
          <div className="p-2">
            {categories &&
              categories.map((category) => (
                <AsideMenuItem
                  key={category.id}
                  categ={category.categoryName}
                  icon={category.icon}
                  to={`/task/${category.id}`}
                />
              ))}
            {showCreateCategoryInput && (
              <div className="relative flex gap-2 p-1 mb-1 hover:bg-slate-700 rounded-lg text-sm font-bold">
                {showEmojiPicker && (
                  <div className="absolute top-12 left-0 w-fit bg-slate-500 p-1 flex rounded-lg gap-2 text-2xl cursor-pointer">
                    {emojies.map((emoji, index) => (
                      <span
                        onClick={(e) => {
                          setSelectedEmojie(emoji);
                        }}
                        key={index}
                      >
                        {emoji}
                      </span>
                    ))}
                  </div>
                )}
                <button
                  className="text-2xl text-amber-400"
                  onClick={() => {
                    setShowEmojiPicker(!showEmojiPicker);
                  }}
                >
                  {!selectedEmojie ? <MdEdit /> : selectedEmojie}
                </button>
                <input
                  type="text"
                  placeholder="Category Name"
                  className="border rounded flex-1 block p-1"
                  value={categoryInput}
                  onChange={(e) => {setCategoryInput(e.target.value)}}
                />
                <button onClick={submitCategoryHandler} className="text-xl bg-slate-500 px-1 rounded-lg">
                  <FaCheck />
                </button>
              </div>
            )}
            <button
              onClick={createCategoryHandler}
              className="w-full flex py-2 px-4 mb-1 hover:bg-slate-700 rounded-lg text-sm font-bold cursor-pointer"
            >
              <span className="pr-3 text-xl">
                <FaPlus className="text-orange-300" />
              </span>
              Create new category
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AsideMenu;
