// src/ui/components/SecuritySettings.js

import React, { useState } from 'react';
import axios from 'axios';

const SecuritySettings = () => {
    const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
    const [newPassword, setNewPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleToggle2FA = async () => {
        try {
            const response = await axios.post('/api/security/two-factor', { enabled: !twoFactorEnabled });
            setTwoFactorEnabled(response.data.enabled);
            setMessage('Two-factor authentication updated successfully.');
        } catch (err) {
            setError('Failed to update security settings.');
        }
    };

    const handleChangePassword = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/api/security/change-password', { password: newPassword });
            setMessage('Password changed successfully.');
            setNewPassword('');
        } catch (err) {
            setError('Failed to change password.');
        }
    };

    return (
        <div className="security-settings">
            <h2>Security Settings</h2>
            <div>
                <label>
                    <input
                        type="checkbox"
                        checked={twoFactorEnabled}
                        onChange={handleToggle2FA}
                    />
                    Enable Two-Factor Authentication
                </label>
            </div>
            <form onSubmit={handleChangePassword}>
                <div>
                    <label>
                        New Password:
                        <input
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            required
                        />
                    </label>
                </div>
                <button type="submit">Change Password</button>
            </form>
            {message && <div className="message">{message}</div>}
            {error && <div className="error">{error}</div>}
        </div>
    );
};

export default SecuritySettings;
