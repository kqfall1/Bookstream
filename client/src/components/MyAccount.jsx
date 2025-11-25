import { useEffect, useState } from "react";
import auth from '../../lib/auth.helpers.js';
import { useNavigate } from 'react-router-dom';
import "../styles/components.css";
import profilePhoto from '../assets/profilephoto.jpeg';

export default function MyAccount() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editForm, setEditForm] = useState({ name: '', email: '', username: '' });

    useEffect(() => {
        if (!auth.isAuthenticated()) {
            navigate('/signin');
            return;
        }

        const userData = auth.getUser();
        setUser(userData);
        setEditForm({
            name: userData.name || '',
            email: userData.email || '',
            username: userData.username || ''
        });
    }, [navigate]);

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleCancelEdit = () => {
        setIsEditing(false);
        setEditForm({
            name: user.name || '',
            email: user.email || '',
            username: user.username || ''
        });
    };

    const handleSaveEdit = () => {
        // Update user data
        const updatedUser = { ...user, ...editForm };
        auth.setUser(updatedUser);
        setUser(updatedUser);
        setIsEditing(false);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditForm(prev => ({ ...prev, [name]: value }));
    };

    if (!user) {
        return (
            <div className="bs-form-centered">
                <h2>Loading...</h2>
            </div>
        );
    }

    return (
        <div className="bs-account-page">
            <h2 className="bs-section-heading">{user.username || user.name || 'My'}'s Profile</h2>

            <div className="bs-account-grid">
                <div className="bs-profile-column">
                    <div className="bs-profile-photo">
                        <img src={profilePhoto} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '6px' }} />
                    </div>
                    <div className="bs-account-actions">
                        <button className="bs-hero-cta primary" onClick={handleEditClick}>Edit Profile</button>
                        <button className="bs-hero-cta" onClick={() => navigate('/orders')}>View Orders</button>
                    </div>
                </div>

                <div className="bs-details-column">
                    <p className="bs-profile-desc">User profile details, including date joined, email, first name, last name, censored payment info, phone number, etc.</p>

                    <div className="bs-account-section">
                        <h3>Account Details</h3>
                        {!isEditing ? (
                            <>
                                <div className="bs-account-field"><strong>Name:</strong> {user.name || 'N/A'}</div>
                                <div className="bs-account-field"><strong>Email:</strong> {user.email || 'N/A'}</div>
                                {user.username && <div className="bs-account-field"><strong>Username:</strong> {user.username}</div>}
                            </>
                        ) : (
                            <div className="bs-edit-form">
                                <label className="bs-form-label">
                                    <strong>Name:</strong>
                                    <input
                                        type="text"
                                        name="name"
                                        value={editForm.name}
                                        onChange={handleInputChange}
                                        className="bs-form-input"
                                    />
                                </label>
                                <label className="bs-form-label">
                                    <strong>Email:</strong>
                                    <input
                                        type="email"
                                        name="email"
                                        value={editForm.email}
                                        onChange={handleInputChange}
                                        className="bs-form-input"
                                    />
                                </label>
                                <label className="bs-form-label">
                                    <strong>Username:</strong>
                                    <input
                                        type="text"
                                        name="username"
                                        value={editForm.username}
                                        onChange={handleInputChange}
                                        className="bs-form-input"
                                    />
                                </label>
                                <div className="bs-edit-actions">
                                    <button className="bs-btn" onClick={handleSaveEdit}>Save Changes</button>
                                    <button className="bs-btn secondary" onClick={handleCancelEdit}>Cancel</button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
