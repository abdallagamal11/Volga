const PROXY_CONFIG = [
  {
    context: [
      "/",
    ],
    target: "https://localhost:7067/api",
    secure: false
  }
]

module.exports = PROXY_CONFIG;
