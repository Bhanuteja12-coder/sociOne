import { useState } from 'react';
import API from '../services/api';
import { useNavigate } from 'react-router-dom';

export default function Register() {
    const [formData, setFormData] = useState({
        username: '',
        name: '',
        email: '',
        phone_number: '',
        password: '',
        confirm_password: ''
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            await API.post('/auth/register/', formData);
            alert('Registration successful! Please login.');
            navigate('/login');
        } catch (err) {
            setError(err.response?.data ? JSON.stringify(err.response.data) : 'Registration failed.');
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Register</h2>
            {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
            <form onSubmit={handleSubmit} className="space-y-4">
                <input type="text" name="username" placeholder="Username" value={formData.username} onChange={handleChange} required className="w-full p-2 border rounded" /> <br/>
                <input type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} required className="w-full p-2 border rounded" /> <br/>
                <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required className="w-full p-2 border rounded" /> <br/>
                <input type="text" name="phone_number" placeholder="Phone Number" value={formData.phone_number} onChange={handleChange} className="w-full p-2 border rounded" /> <br/>
                <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required className="w-full p-2 border rounded" /> <br/>
                <input type="password" name="confirm_password" placeholder="Confirm Password" value={formData.confirm_password} onChange={handleChange} required className="w-full p-2 border rounded" /> <br/>
                <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">Register</button>
            </form>
        </div>
    );
}