const User = require("../models/userModel");
const cron = require("node-cron");
const axios = require("axios");

/**
 * Sends an email reminder using Brevo HTTP API
 */
const sendEmailReminder = async (
  email,
  contestId,
  platform,
  contestTime
) => {
  try {
    const response = await axios.post(
      "https://api.brevo.com/v3/smtp/email",
      {
        sender: {
          name: process.env.BREVO_SENDER_NAME,
          email: process.env.BREVO_SENDER_EMAIL,
        },
        to: [
          {
            email,
          },
        ],
        subject: `🚨 Reminder: Upcoming ${platform} Contest Starts Soon!`,
        htmlContent: `
          <div style="font-family: Arial, sans-serif; max-width:600px; margin:auto;">
              <h2>🚀 Contest Reminder</h2>

              <p>Hello Champion! 👋</p>

              <p>Your contest is about to begin.</p>

              <table cellpadding="8" cellspacing="0" border="1" style="border-collapse:collapse;">
                <tr>
                    <td><b>Platform</b></td>
                    <td>${platform}</td>
                </tr>
                <tr>
                    <td><b>Contest ID</b></td>
                    <td>${contestId}</td>
                </tr>
                <tr>
                    <td><b>Start Time</b></td>
                    <td>${contestTime}</td>
                </tr>
              </table>

              <br>

              <p>
              ✅ Check your internet connection<br>
              ✅ Login beforehand<br>
              ✅ Keep water nearby 😄
              </p>

              <h3>Best of luck! 🍀</h3>

              <p><b>Team AlgoTrack</b></p>
          </div>
        `,
      },
      {
        headers: {
          accept: "application/json",
          "api-key": process.env.BREVO_API_KEY,
          "content-type": "application/json",
        },
      }
    );

    console.log("📧 Reminder Email Sent");
    console.log(response.data);
  } catch (error) {
    console.error(
      "❌ Reminder Email Error:",
      error.response?.data || error.message
    );
  }
};

/**
 * Processes all reminders
 */
const processReminders = async () => {
  console.log("🔔 Running reminder cron job...");

  const nowIST = new Date(
    new Date().toLocaleString("en-US", {
      timeZone: "Asia/Kolkata",
    })
  );

  try {
    const users = await User.find({
      reminderPreferences: {
        $exists: true,
      },
    });

    for (const user of users) {
      for (const reminder of [...user.reminderPreferences]) {
        const {
          contestId,
          platform,
          method,
          timeBefore,
          contestTime,
        } = reminder;

        if (!contestTime) continue;

        const contestTimeIST = new Date(
          new Date(contestTime).toLocaleString("en-US", {
            timeZone: "Asia/Kolkata",
          })
        );

        const reminderTimeIST = new Date(contestTimeIST);
        reminderTimeIST.setMinutes(
          reminderTimeIST.getMinutes() - timeBefore
        );

        if (
          nowIST >= reminderTimeIST &&
          nowIST < contestTimeIST
        ) {
          console.log(
            `Sending reminder to ${user.email}`
          );

          if (method === "email" && user.email) {
            await sendEmailReminder(
              user.email,
              contestId,
              platform,
              contestTimeIST
            );
          }

          user.reminderPreferences =
            user.reminderPreferences.filter(
              (r) => r.contestId !== contestId
            );

          await user.save();

          console.log(
            `Reminder removed for contest ${contestId}`
          );
        }
      }
    }

    console.log("✅ Reminders processed successfully.");
  } catch (err) {
    console.error(
      "❌ Reminder Processing Error:",
      err.message
    );
  }
};

cron.schedule("* * * * *", () => {
  processReminders();
});

module.exports = {
  processReminders,
};