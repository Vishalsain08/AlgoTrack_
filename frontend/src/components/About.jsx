import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const About = () => {
  const navigate = useNavigate();

  // Authentication state
  const { token, user } = useSelector((state) => state.auth);

  const isAuthenticated = !!token;

  // Feature Cards
  const features = [
    {
      icon: "📅",
      title: "Upcoming Contest Tracking",
      description:
        "Fetch and view upcoming coding contests from multiple competitive programming platforms in one place.",
    },
    {
      icon: "⭐",
      title: "Bookmark Contests",
      description:
        "Save your favorite contests and quickly access them whenever you want without searching again.",
    },
    {
      icon: "⏰",
      title: "Email Reminders",
      description:
        "Never miss a contest by setting email reminders before the contest begins.",
    },
    {
      icon: "📝",
      title: "Contest Notes",
      description:
        "Maintain personal notes, strategies, observations and learning points for every contest.",
    },
    {
      icon: "🔐",
      title: "Secure Authentication",
      description:
        "JWT based authentication with OTP email verification keeps your account secure.",
    },
    {
      icon: "🎥",
      title: "Solution Videos",
      description:
        "Quickly search YouTube solutions after contests to learn different approaches and improve.",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 pb-12">

      {/* ================= HERO SECTION ================= */}

{/* ================= HERO SECTION ================= */}

<section className="mb-16">

  <div className="bg-gray-800/40 border border-gray-700 rounded-3xl p-8 md:p-12 shadow-xl">

    <p className="text-blue-400 font-semibold uppercase tracking-widest text-sm mb-4">
      About AlgoTrack
    </p>

    <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight">

      Welcome
      <span className="text-blue-400">
        {" "}
        {isAuthenticated && user
          ? user.username
          : "Competitive Programmer"}
      </span>

    </h1>

    <p className="mt-6 text-gray-300 text-lg leading-8 max-w-3xl">

      AlgoTrack is a centralized coding contest management platform designed
      for competitive programmers. Discover contests from multiple coding
      platforms, bookmark important events, receive reminder notifications,
      maintain contest notes, and improve your programming journey—all from a
      single dashboard.

    </p>

    <div className="flex flex-wrap gap-4 mt-10">

      {!isAuthenticated ? (
        <>
          <button
            onClick={() => navigate("/login")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-7 py-3 rounded-xl font-semibold transition"
          >
            Login
          </button>

          <button
            onClick={() => navigate("/signup")}
            className="border border-gray-600 hover:border-blue-500 hover:bg-gray-700 px-7 py-3 rounded-xl font-semibold transition"
          >
            Create Account
          </button>
        </>
      ) : (
        <button
          onClick={() => navigate("/")}
          className="bg-blue-600 hover:bg-blue-700 text-white px-7 py-3 rounded-xl font-semibold transition"
        >
          Explore Contests
        </button>
      )}

    </div>

  </div>

  <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mt-10">

  <div className="bg-gray-800/40 rounded-xl border border-gray-700 p-5 text-center">
    <h3 className="text-blue-400 text-2xl font-bold">3</h3>
    <p className="text-gray-400 mt-2 text-sm">
      Coding Platforms
    </p>
  </div>

  <div className="bg-gray-800/40 rounded-xl border border-gray-700 p-5 text-center">
    <h3 className="text-green-400 text-2xl font-bold">6+</h3>
    <p className="text-gray-400 mt-2 text-sm">
      Productivity Features
    </p>
  </div>

  <div className="bg-gray-800/40 rounded-xl border border-gray-700 p-5 text-center">
    <h3 className="text-yellow-400 text-2xl font-bold">JWT</h3>
    <p className="text-gray-400 mt-2 text-sm">
      Secure Authentication
    </p>
  </div>

  <div className="bg-gray-800/40 rounded-xl border border-gray-700 p-5 text-center">
    <h3 className="text-purple-400 text-2xl font-bold">OTP</h3>
    <p className="text-gray-400 mt-2 text-sm">
      Email Verification
    </p>
  </div>

</div>

</section>

      {/* ================= ABOUT ================= */}

      <section className="mt-16">

        <div className="text-center mb-12">

          <h2 className="text-4xl font-bold text-white">
            What is <span className="text-blue-400">AlgoTrack?</span>
          </h2>

          <div className="w-28 h-1 bg-blue-500 mx-auto rounded-full mt-4 mb-8"></div>

          <p className="max-w-4xl mx-auto text-gray-300 text-lg leading-8">

            AlgoTrack is a centralized coding contest management platform
            developed for competitive programmers. Instead of visiting multiple
            websites every day, users can view upcoming contests from different
            coding platforms, bookmark important contests, receive reminder
            notifications, maintain personal contest notes, and securely manage
            their account using JWT authentication with OTP email verification.

          </p>

        </div>
      </section>

      {/* ================= FEATURES ================= */}

      <section className="mt-20">

        <div className="text-center mb-12">

          <h2 className="text-4xl font-bold text-white">
            Powerful Features
          </h2>

          <p className="text-gray-400 mt-4 text-lg">
            Everything you need to stay ahead in competitive programming.
          </p>

        </div>

        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8">

          {features.map((feature, index) => (

            <div
              key={index}
              className="bg-gray-800/50 border border-gray-700 rounded-2xl p-8 hover:border-blue-500 hover:-translate-y-2 transition-all duration-300 shadow-xl group"
            >

              <div className="text-5xl mb-6 group-hover:scale-110 transition">
                {feature.icon}
              </div>

              <h3 className="text-2xl font-bold text-white mb-4">

                {feature.title}

              </h3>

              <p className="text-gray-300 leading-7">

                {feature.description}

              </p>

            </div>

          ))}

        </div>

      </section>

      {/* ================= CTA ================= */}

      <section className="mt-24">

        <div className="bg-gradient-to-r from-gray-800 to-gray-900 border border-blue-700 rounded-3xl p-10 text-center shadow-xl">

          <h2 className="text-4xl font-bold text-white">

            Ready to Start Your Competitive Programming Journey?

          </h2>

          <p className="text-gray-300 text-lg mt-6 max-w-3xl mx-auto">

            Organize your contests, receive timely reminders, bookmark your
            favorites, maintain contest notes, and improve your problem-solving
            journey using one simple platform.

          </p>

          <div className="flex flex-wrap justify-center gap-5 mt-10">

            {!isAuthenticated ? (
              <>
                <button
                  onClick={() => navigate("/signup")}
                  className="px-8 py-3 bg-blue-600 hover:bg-blue-700 rounded-xl text-white font-bold transition"
                >
                  Get Started
                </button>

                <button
                  onClick={() => navigate("/login")}
                  className="px-8 py-3 border border-blue-500 rounded-xl hover:bg-blue-600 transition font-semibold"
                >
                  Login
                </button>
              </>
            ) : (
              <button
                onClick={() => navigate("/contest")}
                className="px-8 py-3 bg-blue-600 hover:bg-blue-700 rounded-xl text-white font-bold transition"
              >
                View Contests
              </button>
            )}

          </div>

        </div>

      </section>
      {/* ================= HOW IT WORKS ================= */}

      <section className="mt-24">

        <div className="text-center mb-12">

          <h2 className="text-4xl font-bold text-white">
            How It Works
          </h2>

          <p className="text-gray-400 mt-4 text-lg">
            Get started in just a few simple steps.
          </p>

        </div>

        <div className="grid md:grid-cols-4 gap-6">

          {[
            {
              number: "01",
              title: "Create Account",
              description:
                "Register using your email and verify your account through OTP verification.",
            },
            {
              number: "02",
              title: "Explore Contests",
              description:
                "Browse upcoming coding contests collected from multiple competitive programming platforms.",
            },
            {
              number: "03",
              title: "Stay Organized",
              description:
                "Bookmark contests, create reminders and save personal notes for every contest.",
            },
            {
              number: "04",
              title: "Keep Improving",
              description:
                "Watch solution videos after contests and continue improving your problem-solving skills.",
            },
          ].map((step) => (
            <div
              key={step.number}
              className="bg-gray-800/50 border border-gray-700 rounded-2xl p-8 hover:border-blue-500 transition duration-300"
            >
              <div className="text-5xl font-black text-blue-500 mb-6">
                {step.number}
              </div>

              <h3 className="text-2xl font-bold text-white mb-4">
                {step.title}
              </h3>

              <p className="text-gray-300 leading-7">
                {step.description}
              </p>
            </div>
          ))}

        </div>

      </section>

      {/* ================= SUPPORTED PLATFORMS ================= */}

      <section className="mt-24">

        <div className="text-center mb-12">

          <h2 className="text-4xl font-bold text-white">
            Supported Platforms
          </h2>

          <p className="text-gray-400 mt-4 text-lg">
            Stay updated with contests from popular competitive programming
            websites.
          </p>

        </div>

        <div className="grid md:grid-cols-3 gap-8">

          <div className="bg-gray-800/50 border border-gray-700 rounded-2xl p-10 text-center hover:border-blue-500 transition duration-300">

            <div className="text-6xl mb-6">⚡</div>

            <h3 className="text-3xl font-bold text-yellow-400">
              Codeforces
            </h3>

            <p className="text-gray-300 mt-4 leading-7">
              Follow regular Div.1, Div.2, Div.3 and Educational contests with
              countdown timers.
            </p>

          </div>

          <div className="bg-gray-800/50 border border-gray-700 rounded-2xl p-10 text-center hover:border-blue-500 transition duration-300">

            <div className="text-6xl mb-6">💻</div>

            <h3 className="text-3xl font-bold text-orange-400">
              LeetCode
            </h3>

            <p className="text-gray-300 mt-4 leading-7">
              Keep track of Weekly and Biweekly contests while preparing for
              coding interviews.
            </p>

          </div>

          <div className="bg-gray-800/50 border border-gray-700 rounded-2xl p-10 text-center hover:border-blue-500 transition duration-300">

            <div className="text-6xl mb-6">🏆</div>

            <h3 className="text-3xl font-bold text-blue-400">
              CodeChef
            </h3>

            <p className="text-gray-300 mt-4 leading-7">
              Participate in Starters, Long Challenges and other coding
              competitions with ease.
            </p>

          </div>

        </div>

      </section>

      {/* ================= WHY ALGOTRACK ================= */}

      <section className="mt-24">

        <div className="text-center mb-12">

          <h2 className="text-4xl font-bold text-white">
            Why Choose AlgoTrack?
          </h2>

        </div>

        <div className="grid md:grid-cols-2 gap-8">

          {[
            "✔ View contests from multiple coding platforms in one dashboard.",
            "✔ Bookmark important contests for quick access.",
            "✔ Receive email reminders before contests begin.",
            "✔ Save contest notes and learning strategies.",
            "✔ Secure JWT authentication with OTP verification.",
            "✔ Clean, responsive and user-friendly interface.",
          ].map((point, index) => (
            <div
              key={index}
              className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 text-lg text-gray-200 hover:border-green-500 transition duration-300"
            >
              {point}
            </div>
          ))}

        </div>

      </section>

      {/* ================= TECH STACK ================= */}

      <section className="mt-24">

        <div className="text-center mb-12">

          <h2 className="text-4xl font-bold text-white">
            Built With
          </h2>

          <p className="text-gray-400 mt-4 text-lg">
            Modern technologies powering AlgoTrack.
          </p>

        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

          {[
            "React",
            "Redux",
            "Tailwind CSS",
            "Node.js",
            "Express.js",
            "MongoDB",
            "JWT",
            "REST API",
          ].map((tech) => (
            <div
              key={tech}
              className="bg-blue-500/10 border border-blue-500 rounded-xl py-6 text-center text-xl font-semibold hover:bg-blue-500/20 transition duration-300"
            >
              {tech}
            </div>
          ))}

        </div>

      </section>

      {/* ================= FINAL CTA ================= */}

      <section className="mt-24">

        <div className="rounded-3xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 p-12 text-center shadow-2xl">

          <h2 className="text-4xl md:text-5xl font-bold text-white">

            Start Tracking.
            <br />
            Start Improving.

          </h2>

          <p className="mt-6 text-lg text-blue-100 max-w-3xl mx-auto leading-8">

            AlgoTrack keeps every important contest, reminder, bookmark,
            learning note and coding journey organized so that you can focus on
            what matters the most — solving problems and becoming a better
            programmer.

          </p>

          <div className="flex justify-center flex-wrap gap-5 mt-10">

            {!isAuthenticated ? (
              <>
                <button
                  onClick={() => navigate("/signup")}
                  className="bg-white text-blue-700 px-8 py-3 rounded-xl font-bold hover:scale-105 transition"
                >
                  Join AlgoTrack
                </button>

                <button
                  onClick={() => navigate("/login")}
                  className="border-2 border-white px-8 py-3 rounded-xl text-white font-bold hover:bg-white hover:text-blue-700 transition"
                >
                  Login
                </button>
              </>
            ) : (
              <button
                onClick={() => navigate("/contest")}
                className="bg-white text-blue-700 px-8 py-3 rounded-xl font-bold hover:scale-105 transition"
              >
                Explore Contests
              </button>
            )}

          </div>

        </div>

      </section>

    </div>
  );
};

export default About;      