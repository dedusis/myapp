import mongoose from "mongoose";
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import readline from 'readline';
import Driver from './src/driver/model.js';

dotenv.config();

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout      
});

const askPassword = (question) => {
    return new Promise((resolve) => {
        rl.question(question, (answer) => {
            resolve(answer);
        });
    });
};

const seedAdmin = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_URL);

        const existingAdmin = await Driver.findOne({ username: 'admin' });
        if (existingAdmin) {
            console.log('Admin already exists.');
            process.exit(0);
        }

        const password = await askPassword('Enter admin password: ');
        rl.close();


        const adminUser = new Driver({
            name: 'admin',
            lastname:'admin',
            username:'admin',
            password: password,
            role:'admin'
        });

        await adminUser.save();
        console.log('Admin user created successfully');
        process.exit(0);

    } catch (error) {
        console.error('Failed to seed admin user:', error);
        process.exit(1);
    }
};

seedAdmin();