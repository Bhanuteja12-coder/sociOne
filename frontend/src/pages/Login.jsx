import { useState } from 'react';
import API from '../services/api';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const [formData, setFormData] = useState({ username: '', password: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const response = await API.post('/auth/login/', formData);
            // SimpleJWT returns { access: '...', refresh: '...' }
            localStorage.setItem('access_token', response.data.access);
            localStorage.setItem('refresh_token', response.data.refresh);
            alert('Login successful!');
            navigate('/dashboard'); // Change to your protected route
        } catch (err) {
            setError('Invalid username or password.');
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Login</h2>
            {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
            <form onSubmit={handleSubmit} className="space-y-4">
                <input type="text" name="username" placeholder="Username" value={formData.username} onChange={handleChange} required className="w-full p-2 border rounded" /> <br/>
                <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required className="w-full p-2 border rounded" /> <br/>
                <button type="submit" className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700">Login</button>
            </form>
        </div>
    );
}