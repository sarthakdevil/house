import { Account, Client } from "react-native-appwrite"

export const client = Client(context)
    .setEndpoint("https://cloud.appwrite.io/v1")
    .setProject("66b61304002acfa544c9")

export const account = new Account(client);