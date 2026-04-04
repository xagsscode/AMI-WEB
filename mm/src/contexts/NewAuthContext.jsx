import { createContext, useContext, useState, useEffect } from "react";
import { auth, db, provider } from "../backend/firebase.config";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut as firebaseSignOut,
  sendPasswordResetEmail,
  updateProfile,
  onAuthStateChanged,
} from "firebase/auth";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import toast, { Toaster } from "react-hot-toast";

const NewAuthContext = createContext();

export const useNewAuth = () => {
  const ctx = useContext(NewAuthContext);
  if (!ctx) throw new Error("useNewAuth must be used within NewAuthProvider");
  return ctx;
};

const ADMIN_EMAIL = "admin@gmail.com";

const buildUserData = (firebaseUser, firestoreData = {}) => ({
  uid: firebaseUser.uid,
  email: firebaseUser.email?.toLowerCase() || "",
  name: firestoreData.name || firebaseUser.displayName || "",
  displayName: firebaseUser.displayName || firestoreData.name || "",
  photoURL: firebaseUser.photoURL || firestoreData.photoURL || "",
  provider: firestoreData.provider || "email",
  createdAt: firestoreData.createdAt || new Date().toISOString(),
  isAdmin: firebaseUser.email?.toLowerCase() === ADMIN_EMAIL,
});

export const NewAuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Restore session from localStorage on first load
  useEffect(() => {
    const stored = localStorage.getItem("ami_user");
    if (stored) {
      try { setUser(JSON.parse(stored)); } catch { localStorage.removeItem("ami_user"); }
    }
  }, []);

  // Firebase auth state listener
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const email = firebaseUser.email?.toLowerCase();
        let firestoreData = {};
        try {
          const snap = await getDoc(doc(db, "ami_users", email));
          if (snap.exists()) firestoreData = snap.data();
        } catch (err) {
          console.error("Firestore read error:", err);
        }
        const userData = buildUserData(firebaseUser, firestoreData);
        setUser(userData);
        localStorage.setItem("ami_user", JSON.stringify(userData));
      } else {
        setUser(null);
        localStorage.removeItem("ami_user");
      }
      setLoading(false);
    });
    return unsub;
  }, []);

  // ── Sign Up ──
  const signUpWithEmail = async ({ name, email, password }) => {
    try {
      if (!name?.trim() || !email?.trim() || !password) {
        throw new Error("Name, email and password are required");
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        throw new Error("Enter a valid email address");
      }
      if (password.length < 6) {
        throw new Error("Password must be at least 6 characters");
      }

      const normalizedEmail = email.trim().toLowerCase();
      const cred = await createUserWithEmailAndPassword(auth, normalizedEmail, password);

      await updateProfile(cred.user, { displayName: name });

      await setDoc(doc(db, "ami_users", normalizedEmail), {
        name,
        email: normalizedEmail,
        provider: "email",
        createdAt: serverTimestamp(),
      });

      toast.success(`Welcome, ${name}!`);
      setTimeout(() => { window.location.href = "/"; }, 800);
      return { success: true };
    } catch (err) {
      const msg = friendlyError(err);
      toast.error(msg);
      return { success: false, error: msg };
    }
  };

  // ── Sign In ──
  const signInWithEmail = async (email, password) => {
    try {
      const normalizedEmail = email.trim().toLowerCase();
      await signInWithEmailAndPassword(auth, normalizedEmail, password);
      toast.success("Welcome back!");
      const dest = normalizedEmail === ADMIN_EMAIL ? "/admin" : "/";
      setTimeout(() => { window.location.href = dest; }, 800);
      return { success: true };
    } catch (err) {
      const msg = friendlyError(err);
      toast.error(msg);
      return { success: false, error: msg };
    }
  };

  // ── Google Sign In ──
  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const firebaseUser = result.user;
      const email = firebaseUser.email?.toLowerCase();

      const userRef = doc(db, "ami_users", email);
      const snap = await getDoc(userRef);

      if (!snap.exists()) {
        await setDoc(userRef, {
          name: firebaseUser.displayName || "",
          email,
          photoURL: firebaseUser.photoURL || "",
          provider: "google",
          createdAt: serverTimestamp(),
        });
      }

      toast.success(`Welcome, ${firebaseUser.displayName || ""}!`);
      setTimeout(() => { window.location.href = "/"; }, 800);
      return { success: true };
    } catch (err) {
      const msg = friendlyError(err);
      toast.error(msg);
      return { success: false, error: msg };
    }
  };

  // ── Sign Out ──
  const signOut = async () => {
    try {
      await firebaseSignOut(auth);
      setUser(null);
      localStorage.removeItem("ami_user");
      toast.success("Signed out");
      window.location.href = "/";
    } catch (err) {
      toast.error("Sign out failed");
    }
  };

  // ── Reset Password ──
  const resetPassword = async (email) => {
    try {
      await sendPasswordResetEmail(auth, email.trim().toLowerCase());
      toast.success("Password reset email sent!");
      return { success: true };
    } catch (err) {
      const msg = friendlyError(err);
      toast.error(msg);
      return { success: false, error: msg };
    }
  };

  return (
    <NewAuthContext.Provider value={{
      user,
      loading,
      isAuthenticated: !!user,
      signUpWithEmail,
      signInWithEmail,
      signInWithGoogle,
      signOut,
      resetPassword,
    }}>
      <Toaster toastOptions={{ duration: 4000 }} />
      {children}
    </NewAuthContext.Provider>
  );
};

// ── Friendly error messages ──
const friendlyError = (err) => {
  switch (err.code) {
    case "auth/email-already-in-use": return "An account with this email already exists";
    case "auth/user-not-found": return "No account found with this email";
    case "auth/wrong-password":
    case "auth/invalid-credential": return "Incorrect email or password";
    case "auth/invalid-email": return "Invalid email address";
    case "auth/weak-password": return "Password should be at least 6 characters";
    case "auth/user-disabled": return "This account has been disabled";
    case "auth/too-many-requests": return "Too many attempts. Please try again later";
    case "auth/popup-closed-by-user": return "Google sign-in was cancelled";
    default: return err.message || "Something went wrong";
  }
};

export default NewAuthContext;
