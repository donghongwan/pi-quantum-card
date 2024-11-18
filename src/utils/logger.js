// src/utils/logger.js

class Logger {
  constructor() {
    this.enableRemoteLogging = true; // Set to false to disable remote logging
    this.remoteLoggingUrl = 'https://api.example.com/logs'; // Replace with your actual logging endpoint
  }

  log(message, level = 'info') {
    const timestamp = new Date().toISOString();
    const logMessage = `[${timestamp}] [${level.toUpperCase()}]: ${message}`;
    
    console.log(logMessage);
    
    if (this.enableRemoteLogging) {
      this.sendToRemote(logMessage, level);
    }
  }

  info(message) {
    this.log(message, 'info');
  }

  warn(message) {
    this.log(message, 'warn');
  }

  error(message) {
    this.log(message, 'error');
  }

  async sendToRemote(logMessage, level) {
    try {
      await fetch(this.remoteLoggingUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: logMessage, level }),
      });
    } catch (error) {
      console.error('Failed to send log to remote:', error);
    }
  }
}

const logger = new Logger();
export default logger;
