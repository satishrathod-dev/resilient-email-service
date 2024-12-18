// Email service class
const MockEmailProvider = require("./emailProviders");
const { sleep } = require("./utils");
const StatusTracker = require("./statusTracker");

const MAX_RETRIES = 5;
const RETRY_DELAY = 1000; // initial retry delay (in ms)
const RATE_LIMIT_WINDOW = 10000; // rate limit window in ms (10 seconds)

class EmailService {
  constructor() {
    this.provider1 = new MockEmailProvider("Provider1");
    this.provider2 = new MockEmailProvider("Provider2");
    this.statusTracker = new StatusTracker();
    this.emailQueue = {}; // for rate limiting
  }

  async sendEmail(to, subject, body) {
    const emailId = `${to}-${subject}-${body}`;
    console.log(emailId);

    // Rate limiting check
    const now = Date.now();
    if (
      !this.emailQueue[emailId] ||
      now - this.emailQueue[emailId] > RATE_LIMIT_WINDOW
    ) {
      this.emailQueue[emailId] = now;
    } else {
      console.log("Rate limit exceeded");
      return false;
    }

    // Duplication check
    if (this.statusTracker.isEmailSent(emailId)) {
      console.log("Email already sent, skipping...");
      return true;
    }

    // Start with Provider 1
    let result = await this.trySendWithRetries(
      this.provider1,
      to,
      subject,
      body
    );
    if (result === false) {
      console.log("Fallback to Provider 2");
      result = await this.trySendWithRetries(this.provider2, to, subject, body);
    }

    return result;
  }

  //  Helper method to try sending email with retries
  async trySendWithRetries(provider, to, subject, body) {
    let retries = 0;
    let success = false;

    while (retries < MAX_RETRIES) {
      try {
        console.log(
          `Attempt ${retries + 1}: Sending email via ${provider.name}`
        );
        success = await provider.sendEmail(to, subject, body);
        if (success) {
          this.statusTracker.recordSent(`${to}-${subject}-${body}`);
          console.log("Email sent successfully");
          return true;
        }
      } catch (error) {
        retries++;
        console.log(`Error sending email: ${error.message}. Retrying...`);
        await sleep(RETRY_DELAY * Math.pow(2, retries)); // Exponential backoff
      }
    }

    this.statusTracker.recordFailed(`${to}-${subject}-${body}`);
    console.log("Failed to send email after multiple retries");
    return false;
  }
}

module.exports = { EmailService };
