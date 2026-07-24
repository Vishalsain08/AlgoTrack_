const axios = require("axios");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "your_secret_key";

/**
 * Generates a temporary JWT token valid for 10 minutes
 */
const generateTempToken = (email) => {
  return jwt.sign({ email }, JWT_SECRET, { expiresIn: "10m" });
};

/**
 * Class to manage OTP generation, storage, and verification
 */
class OTPManager {
  constructor() {
    this.otpStore = new Map();

    // Cleanup expired OTPs every 5 minutes
    this.cleanupInterval = setInterval(() => {
      const now = Date.now();

      for (const [email, value] of this.otpStore.entries()) {
        if (now > value.expiresAt) {
          this.otpStore.delete(email);
        }
      }
    }, 5 * 60 * 1000);
  }

  generateOTP() {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  storeOTP(email, otp) {
    this.otpStore.set(email, {
      otp,
      expiresAt: Date.now() + 5 * 60 * 1000,
    });
  }

  verifyOTP(email, otp) {
    const otpEntry = this.otpStore.get(email);

    if (!otpEntry) return false;

    if (
      otpEntry.otp === otp &&
      Date.now() <= otpEntry.expiresAt
    ) {
      this.otpStore.delete(email);
      return true;
    }

    return false;
  }
}

const otpManager = new OTPManager();

class OTPController {
  /**
   * Send OTP
   */
  static async sendOTP(req, res) {
    try {
      const { email } = req.body;

      if (!email) {
        return res.status(400).json({
          message: "Email is required",
        });
      }

      const otp = otpManager.generateOTP();
      otpManager.storeOTP(email, otp);

      console.log("Sending OTP to:", email);

      const response = await axios.post(
        "https://api.brevo.com/v3/smtp/email",
        {
          sender: {
            name: process.env.BREVO_SENDER_NAME,
            email: process.env.BREVO_SENDER_EMAIL,
          },

          to: [
            {
              email: email,
            },
          ],

          subject: "Your OTP for Email Verification",

          htmlContent: `
            <div style="font-family: Arial, sans-serif; max-width:600px; margin:auto;">
                <h2>OTP Verification</h2>

                <p>Your One-Time Password (OTP) is:</p>

                <h1 style="letter-spacing:8px; color:#007bff;">
                    ${otp}
                </h1>

                <p>This OTP will expire in <b>5 minutes</b>.</p>

                <p>Team AlgoTrack 🚀</p>
            </div>
          `,
        },
        {
          headers: {
            accept: "application/json",
            "content-type": "application/json",
            "api-key": process.env.BREVO_API_KEY,
          },
        }
      );

      console.log("✅ OTP Email Sent");
      console.log(response.data);

      return res.status(200).json({
        message: "OTP sent successfully",
      });
    } catch (error) {
      console.log("========== BREVO ERROR ==========");

      if (error.response) {
        console.log("Status:", error.response.status);
        console.log("Data:", error.response.data);
      } else {
        console.log(error.message);
      }

      console.log("================================");

      return res.status(500).json({
        message: "Failed to send OTP",
      });
    }
  }

  /**
   * Verify OTP
   */
  static async verifyOTP(req, res) {
    try {
      const { email, otp } = req.body;

      if (!otp) {
        return res.status(400).json({
          message: "OTP is required",
        });
      }

      const isValid = otpManager.verifyOTP(email, otp);

      if (!isValid) {
        return res.status(400).json({
          message: "Invalid or expired OTP",
        });
      }

      const emailVerificationToken =
        generateTempToken(email);

      return res.status(200).json({
        message: "OTP verified successfully",
        emailVerificationToken,
      });
    } catch (error) {
      console.error(error);

      return res.status(500).json({
        message: "OTP verification failed",
      });
    }
  }
}

module.exports = OTPController;