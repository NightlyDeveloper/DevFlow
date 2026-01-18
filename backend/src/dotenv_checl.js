import 'dotenv/config';
import fs from 'fs';
import path from 'path';

console.log("--- DEBUGGING ENVIRONMENT ---");
console.log("1. Current Working Directory:", process.cwd());
console.log("2. Looking for .env file at:", path.join(process.cwd(), '.env'));

// Check if file physically exists
if (fs.existsSync(path.join(process.cwd(), '.env'))) {
    console.log("3. SUCCESS: .env file found!");
} else {
    console.log("3. ERROR: .env file NOT found. Check your file location.");
}

// Check if variable loads
console.log("4. Value of MONGO_URI:", process.env.MONGO_URI);
console.log("-----------------------------");