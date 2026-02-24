"use client";

import React, { useState, useEffect } from 'react';
import { X, Loader2 } from 'lucide-react';

// Mock user data for frontend display
const MOCK_USER = {
  displayName: "Chef Guest",
  email: "guest@cookbook.com",
};

export default function ProfileModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    async function fetchUser() {
      setLoading(true);
      try {
        // Simulating a small delay to mimic a database fetch
        await new Promise((resolve) => setTimeout(resolve, 500));
        
        setUsername(MOCK_USER.displayName);
        setEmail(MOCK_USER.email);
      } catch (error) {
        console.error('Error fetching profile:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchUser();
  }, [isOpen]);

  const handleSave = async () => {
    if (!username.trim()) return alert("Username cannot be empty");
    
    setIsSaving(true);
    try {
      // Simulating an API call to save data
      await new Promise((resolve) => setTimeout(resolve, 1000));

      console.log("Profile updated to:", username.trim());
      alert("Profile updated successfully (Mock)!");
      onClose();
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile.");
    } finally {
      setIsSaving(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 relative animate-in zoom-in duration-200">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-1 hover:bg-gray-100 rounded-full transition-colors"
        >
          <X className="w-6 h-6 text-gray-500" />
        </button>

        <h2 className="text-2xl font-bold mb-6 text-gray-900">Edit Profile</h2>

        {loading ? (
          <div className="py-10 text-center flex flex-col items-center gap-2">
            <Loader2 className="animate-spin text-orange-500" />
            <p className="text-gray-600 text-sm">Loading details...</p>
          </div>
        ) : (
          <div className="space-y-4">
            <div>
              <label className="block text-gray-600 text-sm mb-1 font-medium">Username</label>
              <input 
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none text-gray-900"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your name"
              />
            </div>

            <div>
              <label className="block text-gray-600 text-sm mb-1 font-medium">Email (Locked)</label>
              <input
                type="email"
                value={email}
                disabled
                className="w-full text-gray-400 bg-gray-50 cursor-not-allowed px-4 py-2 rounded-lg border border-gray-200"
              />
            </div>

            <div className="pt-4 flex gap-3">
              <button 
                onClick={onClose}
                className="flex-1 px-4 py-2 border border-gray-200 rounded-xl font-medium text-gray-600 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={handleSave}
                disabled={isSaving}
                className="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 disabled:bg-orange-300"
              >
                {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : "Save Changes"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}