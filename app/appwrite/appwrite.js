import { Client, Account,Storage, Databases } from 'react-native-appwrite';

// Initialize the Client
export const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('66b61304002acfa544c9');

// Initialize the Account
export const account = new Account(client);
export const storage = new Storage(client);
export const database = new Databases(client)