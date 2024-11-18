// scripts/seedDatabase.js

const mongoose = require("mongoose");
const User = require("../src/models/User"); // Adjust the path to your User model
const Transaction = require("../src/models/Transaction"); // Adjust the path to your Transaction model
require("dotenv").config();

async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("MongoDB connected.");
    } catch (error) {
        console.error("MongoDB connection error:", error);
        process.exit(1);
    }
}

async function seedDatabase() {
    await User.deleteMany({});
    await Transaction.deleteMany({});

    const users = [
        { username: "user1", email: "user1@example.com", password: "password123" },
        { username: "user2", email: "user2@example.com", password: "password123" },
    ];

    const transactions = [
        { userId: "user1", amount: 100, description: "Initial deposit" },
        { userId: "user2", amount: 200, description: "Initial deposit" },
    ];

    await User.insertMany(users);
    await Transaction.insertMany(transactions);

    console.log("Database seeded successfully.");
}

async function main() {
    await connectDB();
    await seedDatabase();
    mongoose.connection.close();
 }

main()
    .then(() => console.log("Seeding completed."))
    .catch((error) => {
        console.error("Error seeding database:", error);
        mongoose.connection.close();
    });
