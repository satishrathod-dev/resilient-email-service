// Status tracker utility
class StatusTracker {
  constructor() {
    this.sentEmails = new Set();
    this.failedEmails = new Set();
  }

  recordSent(emailId) {
    this.sentEmails.add(emailId);
  }

  recordFailed(emailId) {
    this.failedEmails.add(emailId);
  }

  isEmailSent(emailId) {
    return this.sentEmails.has(emailId);
  }

  isEmailFailed(emailId) {
    return this.failedEmails.has(emailId);
  }
}

module.exports = StatusTracker;
