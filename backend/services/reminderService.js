const User = require("../models/userModel");
const nodemailer = require("nodemailer");
const cron = require("node-cron");

/**
 * Environment variables for email authentication
 */
const userEmail = process.env.EMAIL_USER;
const userPass = process.env.EMAIL_PASS;

/**
 * Nodemailer transport configuration
 * Uses Gmail as the email service provider
 */

console.log("EMAIL_USER:", process.env.EMAIL_USER);
console.log("EMAIL_PASS exists:", !!process.env.EMAIL_PASS);

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

transporter.verify(function (error, success) {
  if (error) {
    console.log(error);
  } else {
    console.log("SMTP Connected Successfully");
  }
});

/**
 * Sends an email reminder to a user about an upcoming contest
 * @param {string} email - Recipient's email address
 * @param {string} contestId - Unique identifier for the contest
 * @param {string} platform - The platform hosting the contest (e.g., CodeForces, LeetCode)
 * @param {Date} contestTime - Start time of the contest
 */
const sendEmailReminder = async (email, contestId, platform, contestTime) => {
  const mailOptions = {
    from: userEmail,
    to: email,
    subject: `🚨 Reminder: Upcoming ${platform} Contest (ID: ${contestId}) Starts Soon!`,
    text: `Hello Champion! 🎯
  
  This is a reminder that your contest on **${platform}** (Contest ID: ${contestId}) is scheduled to begin at:
  
  🕒 **Date & Time:** ${contestTime}
  
  Make sure you're ready to give it your best shot! 💡
  
  ✅ **Pro Tip:** Double-check your internet connection and login credentials before the contest starts.
  
  Best of luck! 🍀
  Team AlgoTrack
  `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(
      `📧 Email sent successfully to ${email} for contest ${contestId}`
    );
  } catch (error) {
    console.error(`❌ Error sending email to ${email}:`, error.message);
  }
};

/**
 * Main function to process reminders for all users
 * Runs periodically to check and send reminders based on user preferences
 */
const processReminders = async () => {
  console.log("🔔 Running reminder cron job...");

  // Get current time in IST (Indian Standard Time)
  const nowIST = new Date(
    new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" })
  );

  try {
    // Fetch all users who have reminder preferences set
    const users = await User.find({ reminderPreferences: { $exists: true } });

    // Iterate through each user
    for (const user of users) {
      // Iterate over a copy of reminders
      for (const reminder of [...user.reminderPreferences]) {
        const { contestId, platform, method, timeBefore, contestTime } =
          reminder;

        // Skip if contest time is not set
        if (!contestTime) continue;

        // Convert contest time to IST
        const contestTimeIST = new Date(
          new Date(contestTime).toLocaleString("en-US", {
            timeZone: "Asia/Kolkata",
          })
        );

        // Calculate reminder time
        const reminderTimeIST = new Date(contestTimeIST);
        reminderTimeIST.setMinutes(reminderTimeIST.getMinutes() - timeBefore);

        // Check whether reminder should be sent
        if (nowIST >= reminderTimeIST && nowIST < contestTimeIST) {
          console.log(`✅ Time to send reminder to ${user.username}`);

          // Email reminder
          if (method === "email" && user.email) {
            await sendEmailReminder(
              user.email,
              contestId,
              platform,
              contestTimeIST
            );
          }

          // SMS reminder (future implementation)
          else if (method === "sms" && user.phoneNumber) {
            await sendSMSReminder(
              user.phoneNumber,
              contestId,
              platform,
              contestTimeIST
            );
          }

          // Remove reminder after it has been sent
          user.reminderPreferences = user.reminderPreferences.filter(
            (r) => r.contestId !== contestId
          );

          // Save updated user
          await user.save();

          console.log(
            `🗑️ Reminder for contest ${contestId} removed from ${user.username}`
          );
        }
      }
    }

    console.log("✅ Reminders processed successfully.");
  } catch (error) {
    console.error("❌ Error processing reminders:", error.message);
  }
};

/**
 * Cron job configuration
 * Runs every minute to check and send reminders
 * Pattern: * * * * *
 * Format: Minute Hour Day Month WeekDay
 */
cron.schedule("* * * * *", () => {
  processReminders();
});

module.exports = { processReminders };
