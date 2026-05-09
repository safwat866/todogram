import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  getAuth,
  signInWithPopup,
  onAuthStateChanged,
} from "firebase/auth";
import { doc, setDoc, collection, addDoc } from "firebase/firestore";
import { db, auth, provider } from "./firebase";
import { useNavigate } from "react-router";

export default function AuthPage() {
  const [credentials, setCredentials] = useState({
    username: "",
    email: "",
    password: "",
    validation_error: "",
  });
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate("/task/init", { replace: true });
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const initUserDataWithCategory = async (uid, username) => {
    // store username
    await setDoc(doc(db, "users", uid), {
      username: username,
    });
    // after user authenticated successfuly create a new task category with id
    // and navigate user to this category
    const docRef = await setDoc(doc(db, "users", uid, "categories", "init"), {
      categoryName: "Inbox",
      icon: "📥",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password, username } = credentials;

    if (isLogin) {
      if (!email || !password) {
        setCredentials((prev) => ({
          ...prev,
          validation_error: "you have to enter email and password!",
        }));
        return;
      }
      try {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password,
        );
      } catch (err) {
        setCredentials((prev) => ({
          ...prev,
          validation_error: err.message,
        }));
      }
    } else {
      if (!username || !email || !password) {
        setCredentials((prev) => ({
          ...prev,
          validation_error: "you have to enter username email and password!",
        }));
        return;
      }

      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password,
        );

        const uid = userCredential.user.uid;

        initUserDataWithCategory(uid, username);
      } catch (err) {
        setCredentials((prev) => ({
          ...prev,
          validation_error: err.message,
        }));
      }
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, provider);
    } catch (err) {
      setCredentials((prev) => ({
        ...prev,
        validation_error: err.message,
      }));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900 transition-colors">
      <div className="w-full max-w-md mb-20 rounded-2xl p-8 transition-colors">
        {/* Title */}
        <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-10">
          Welcome Back
        </h2>

        {/* Form */}
        <form className="space-y-4" onSubmit={(e) => handleSubmit(e)}>
          {/* Username (only for register) */}
          {!isLogin && (
            <input
              type="text"
              placeholder="Username"
              onChange={(e) => {
                setCredentials((prev) => ({
                  ...prev,
                  username: e.target.value,
                  validation_error: "",
                }));
              }}
              value={credentials.username}
              className="w-full px-4 py-3 border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
            />
          )}

          {/* Email */}
          <input
            type="email"
            placeholder="Email"
            onChange={(e) => {
              setCredentials((prev) => ({
                ...prev,
                email: e.target.value,
                validation_error: "",
              }));
            }}
            value={credentials.email}
            className="w-full px-4 py-3 border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
          />

          {/* Password */}
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => {
              setCredentials((prev) => ({
                ...prev,
                password: e.target.value,
                validation_error: "",
              }));
            }}
            value={credentials.password}
            className="w-full px-4 py-3 border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
          />

          {/* Submit */}
          <button className="w-full bg-black dark:bg-white text-white dark:text-black py-3 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition block text-center">
            {isLogin ? "Login" : "Create Account"}
          </button>
          {credentials.validation_error && (
            <p className="text-red-500 text-center">
              {credentials.validation_error}
            </p>
          )}
        </form>

        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="flex-1 h-px bg-gray-300 dark:bg-gray-600"></div>
          <span className="px-3 text-gray-500 dark:text-gray-400 text-sm">
            or
          </span>
          <div className="flex-1 h-px bg-gray-300 dark:bg-gray-600"></div>
        </div>

        {/* Google Login */}
        <button
          onClick={handleGoogleSignIn}
          className="w-full border border-gray-300 dark:border-gray-600 py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-50 dark:hover:bg-gray-700 transition text-gray-800 dark:text-white"
        >
          <img
            src="https://www.svgrepo.com/show/355037/google.svg"
            className="w-5 h-5"
            alt="google"
          />
          Continue with Google
        </button>

        {/* Toggle */}
        <p className="text-center mt-6 text-sm text-gray-600 dark:text-gray-300">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <button
            type="button"
            onClick={() => setIsLogin(!isLogin)}
            className="text-black dark:text-white font-semibold hover:underline"
          >
            {isLogin ? "Sign up" : "Login"}
          </button>
        </p>
      </div>
    </div>
  );
}
