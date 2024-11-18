// src/core/analytics/userBehaviorAnalytics.js

class UserBehaviorAnalytics {
 ```javascript
// src/core/analytics/userBehaviorAnalytics.js

class UserBehaviorAnalytics {
    constructor(userData) {
        this.userData = userData;
    }

    getActiveUsers() {
        return this.userData.filter(user => user.lastActive > Date.now() - 30 * 24 * 60 * 60 * 1000).length; // Active in the last 30 days
    }

    getUser EngagementRate() {
        const totalUsers = this.userData.length;
        const engagedUsers = this.userData.filter(user => user.engagementScore > 0).length;
        return (engagedUsers / totalUsers) * 100;
    }

    getUser RetentionRate() {
        const retainedUsers = this.userData.filter(user => user.isRetained).length;
        return (retainedUsers / this.userData.length) * 100;
    }
}

module.exports = UserBehaviorAnalytics;
