import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { publicApi } from '../../utils/api';
import { notify } from '../../utils/toast';
export const LoginPage = () => {
        const navigate=useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {

        e.preventDefault();
        setLoading(true);

        try {


            const res = await publicApi.post('/auth/login', {
                email,
                password

            })

            localStorage.setItem('token', res.data.token);
            localStorage.setItem('user', JSON.stringify(res.data.data.user));
            notify(res.data.statusCode, res.data.message);
            navigate('/dashboard');

        } catch (err) {
          const status = err.response?.data?.statusCode || 500
    const message = err.response?.data?.message || 'Something went wrong'
    notify(status, message) 
           
        } finally {
            setLoading(false);
        }

    }

    return (
        <div className="min-h-screen bg-[#f0fdff] flex items-center justify-center px-4">
            <div className="w-full max-w-md bg-white border border-[#a5f3fc] rounded-2xl p-10 shadow-sm">

                {/* Header */}
                <div className="mb-8">
                    <p className="text-[#0f2d3d] text-2xl font-semibold">Welcome back</p>
                    <p className="text-[#4a8fa8] text-sm mt-1">Sign in to your AskYourDoc account</p>
                </div>

                {/* Error message
                {error && (
                    <div className="mb-4 px-4 py-2.5 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
                        {error}
                    </div>
                )} */}

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-5">

                    <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-medium text-[#0e7490] uppercase tracking-wide">
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="you@example.com"
                            required
                            className="px-4 py-2.5 rounded-lg border border-[#a5f3fc] bg-[#f0fdff] text-[#0f4c5c] text-sm outline-none focus:border-[#0891b2] focus:ring-1 focus:ring-[#0891b2] transition"
                        />
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-medium text-[#0e7490] uppercase tracking-wide">
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            required
                            className="px-4 py-2.5 rounded-lg border border-[#a5f3fc] bg-[#f0fdff] text-[#0f4c5c] text-sm outline-none focus:border-[#0891b2] focus:ring-1 focus:ring-[#0891b2] transition"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-2.5 bg-[#0891b2] hover:bg-[#0e7490] text-white text-sm font-medium rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? 'Signing in...' : 'Sign in'}
                    </button>

                </form>

                {/* Footer */}
                <p className="text-center text-sm text-[#4a8fa8] mt-6">
                    No account?{' '}
                    <Link to="/register" className="text-[#0891b2] font-medium hover:underline">
                        Register
                    </Link>
                </p>

            </div>
        </div>
    )
}
