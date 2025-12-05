import { useEffect } from 'react';
import '../styles/Toast.css';

export default function Toast({ message, type = 'success', duration = 3000, onClose }) {
    useEffect(() => {
        if (message) {
            const timer = setTimeout(() => {
                onClose();
            }, duration);
            return () => clearTimeout(timer);
        }
    }, [message, duration, onClose]);

    if (!message) return null;

    return (
        <div className={`bs-toast bs-toast-${type}`}>
            <span>{message}</span>
            <button className="bs-toast-close" onClick={onClose}>&times;</button>
        </div>
    );
}
