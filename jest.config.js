module.exports = {
  roots: ["src"],
  testMatch: ["**/?(*.)+(spec).+(ts)"],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
};
