'use client';

import { useState, useEffect } from 'react';
import { AuthChangeEvent, Session } from '@supabase/supabase-js'; 
import Link from 'next/link';
import { LogIn, LogOut, X } from 'lucide-react';
import { setCookie, getCookie } from 'cookies-next'; 
import { supabase } from '@/app/utils/supabase/client'; 
// 🔑 IMPORT CONTEXT
import { useAuth } from '@/app/context/AuthContext'; 

const OLIVE_TONE = 'bg-[#e4f1d4]'; 

const showMessage = (setter: React.Dispatch<React.SetStateAction<string | null>>, message: string, duration: number = 4000) => {
    setter(message);
    setTimeout(() => setter(null), duration);
};

// -----------------------------------------------------------------
// Nested Component: LoginModal (State Synchronization Added)
// -----------------------------------------------------------------

const LoginModal = ({ isOpen, onClose, onSuccess }: { isOpen: boolean, onClose: () => void, onSuccess: () => void }) => {
    if (!isOpen) return null;
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isSigningUp, setIsSigningUp] = useState(false); 

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        
        if (isSigningUp) {
            const { error } = await supabase.auth.signUp({ email, password });
            if (error) {
                setError(error.message);
            } else {
                alert("Check your email for the confirmation link!");
                onClose();
            }
        } else {
            const { data, error } = await supabase.auth.signInWithPassword({ email, password });
            if (error) {
                setError(error.message);
            } else if (data.session) {
                
                // CRITICAL: Manually set a non-HTTP-only cookie
                setCookie('supabase-temp-token', data.session.access_token, { 
                    maxAge: data.session.expires_in, 
                    path: '/',
                    secure: process.env.NODE_ENV === 'production', 
                    sameSite: 'lax',
                });
                
                onSuccess(); 
            }
        }
    };

    return (
        // Modal JSX (unchanged)
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-[100] p-4">
            <form id="login-form" onSubmit={handleSubmit} className="flex flex-col items-center w-full max-w-xs sm:max-w-sm">
                <div className={`p-6 rounded-xl shadow-2xl w-full relative transform transition-all scale-100 ease-out duration-300 ${OLIVE_TONE} border border-gray-400`}>
                    <h2 className="text-2xl font-bold mb-6 text-gray-800">
                        {isSigningUp ? 'Admin Sign Up' : 'Admin Log In'}
                    </h2>
                    <button onClick={onClose} type="button" className="absolute top-4 right-4 text-gray-600 hover:text-red-500 transition">
                        <X size={24} />
                    </button>
                    {error && <p className="text-red-600 font-medium mb-4 text-sm border border-red-300 bg-red-100 p-2 rounded">{error}</p>}
                    <div className="inner-box-container space-y-4 mb-6">
                        <div className="w-full">
                            <input type="email" placeholder="User Email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-3 border border-gray-400 rounded-lg focus:ring-green-600 focus:border-green-600 text-gray-800 bg-white/80" required autoComplete="email"/>
                        </div>
                        <div className="w-full">
                            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full p-3 border border-gray-400 rounded-lg focus:ring-green-600 focus:border-green-600 text-gray-800 bg-white/80" required autoComplete={isSigningUp ? "new-password" : "current-password"}/>
                        </div>
                    </div>
                    <div className="text-center text-sm">
                        <button onClick={() => setIsSigningUp(!isSigningUp)} type="button" className="text-gray-700 hover:text-green-700 font-medium">
                            {isSigningUp ? 'Already an Admin? Log In' : 'First time setup? Sign Up'}
                        </button>
                    </div>
                </div>
                <button type="submit" className="w-full py-3 mt-4 bg-green-700 text-white font-bold rounded-xl hover:bg-green-800 transition shadow-lg">
                    {isSigningUp ? 'Sign Up' : 'Log In'}
                </button>
            </form>
        </div>
    );
};

// -----------------------------------------------------------------
// Parent Component: AdminAuthButton
// -----------------------------------------------------------------

export default function AdminAuthButton() {
    
    // 🔑 READ CONTEXT SETTER
    const { setLoggedInState } = useAuth(); 

    const [session, setSession] = useState<Session | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [authMessage, setAuthMessage] = useState<string | null>(null);
    
    const adminPanelPath = '/panel'; 

    useEffect(() => {
        // Initial state is handled by AuthContext. We only use the listener for real-time changes.

        const { data: { subscription } } = supabase.auth.onAuthStateChange(
            (event: AuthChangeEvent, session: Session | null) => { 
                
                if (event === 'SIGNED_IN') {
                    setIsModalOpen(false);
                    setSession({} as Session); 
                    setLoggedInState(true); // 🔑 SYNCHRONIZE GLOBAL STATE
                } else if (event === 'SIGNED_OUT') {
                    showMessage(setAuthMessage, "Logged out successfully.", 3000);
                    setSession(null); // Clear session state
                    setLoggedInState(false); // 🔑 SYNCHRONIZE GLOBAL STATE
                }
            }
        );

        return () => {
            subscription.unsubscribe();
        };
    }, []); 

    const handleLogout = async () => {
        const { error } = await supabase.auth.signOut();
        
        // Remove the manually set cookie upon sign out
        if (!error) {
            setCookie('supabase-temp-token', '', { maxAge: 0, path: '/' }); 
        }
        
        if (error) {
            showMessage(setAuthMessage, "Logout failed.", 3000);
        } 
    };

    return (
        <>
            {/* Toast Notification (JSX remains unchanged) */}
            {authMessage && (
                <div className={`fixed top-20 right-5 z-[200] px-6 py-3 rounded-lg shadow-xl ${authMessage.includes("successful") ? 'bg-green-500' : 'bg-red-500'} text-white font-semibold transition-opacity duration-300`}>
                    {authMessage}
                </div>
            )}

            {/* Note: We rely on the internal 'session' state for showing Log In/Log Out buttons */}
            {!session ? (
                // Login Button
                <button 
                    onClick={() => setIsModalOpen(true)} 
                    className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition duration-150 shadow-md"
                >
                    <LogIn size={18} className="mr-2" />
                    Log In
                </button>
            ) : (
                // Admin Panel & Logout Button
                <div className="flex items-center space-x-3">
                    <Link href={adminPanelPath} className="text-gray-700 font-semibold hover:text-green-700 transition underline-offset-4 hover:underline">
                        Admin Panel
                    </Link>
                    <button 
                        onClick={handleLogout} 
                        className="inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition duration-150 shadow-md"
                    >
                        <LogOut size={18} className="mr-2" />
                        Log Out
                    </button>
                </div>
            )}

            <LoginModal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)}
                onSuccess={() => {
                    showMessage(setAuthMessage, "Login successful!", 4000);
                    setIsModalOpen(false);
                    setLoggedInState(true); // 🔑 SYNCHRONIZE GLOBAL STATE IMMEDIATELY AFTER SUCCESS
                }}
            />
        </>
    );
}