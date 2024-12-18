class MockEmailProvider {
  // Class for creating mock email providers
  constructor(name) {
    this.name = name;
  }

  sendEmail(to, subject, body) {
    const success = Math.random() > 0.5; // 50% chance of success or failure
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (success) {
          resolve(true);
        } else {
          reject(new Error(`Failed to send email using ${this.name}`));
        }
      }, 500);
    });
  }
}

module.exports = MockEmailProvider;
