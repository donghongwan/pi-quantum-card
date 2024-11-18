// src/utils/notification.js

const express = require('express');
const router = express.Router();

// In-memory storage for notifications (for demonstration purposes)
let notifications = [];

// Endpoint to create a new notification
router.post('/create', (req, res) => {
    const { title, message, userId } = req.body;

    if (!title || !message || !userId) {
        return res.status(400).json({ error: 'Title, message, and userId are required' });
    }

    const newNotification = {
        id: notifications.length + 1,
        title,
        message,
        userId,
        timestamp: new Date(),
        read: false,
    };

    notifications.push(newNotification);
    res.status(201).json(newNotification);
});

// Endpoint to retrieve notifications for a specific user
router.get('/user/:userId', (req, res) => {
    const { userId } = req.params;
    const userNotifications = notifications.filter(notification => notification.userId === userId);
    res.json(userNotifications);
});

// Endpoint to mark a notification as read
router.put('/read/:id', (req, res) => {
    const { id } = req.params;
    const notification = notifications.find(n => n.id === parseInt(id));

    if (!notification) {
        return res.status(404).json({ error: 'Notification not found' });
    }

    notification.read = true;
    res.json(notification);
});

// Endpoint to delete a notification
router.delete('/delete/:id', (req, res) => {
    const { id } = req.params;
    notifications = notifications.filter(n => n.id !== parseInt(id));
    res.status(204).send(); // No content
});

module.exports = router;
