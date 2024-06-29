import { Client, Account, ID, Avatars, Databases } from 'react-native-appwrite';


export const config = {
    endpoint: 'https://cloud.appwrite.io/v1',
    platform: 'com.imanlangaran.aora',
    projectId: '66800667001781485e13',
    databaseId: '66800989001a82ce4e4b',
    userCollectionId: '668009d900326ead0f3e',
    videoCollectionId: '66800a16001a73178960',
    storageId: '66800ba40006bc7a58c8'
}

// Init your React Native SDK
const client = new Client();

client
    .setEndpoint(config.endpoint) // Your Appwrite Endpoint
    .setProject(config.projectId) // Your project ID
    .setPlatform(config.platform) // Your application ID or bundle ID.
    ;

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

export const createUser = async (email, password, userName) => {
    try {
        // console.log(password);
        const newAccount = await account.create(
            ID.unique(),
            email,
            password,
            userName
        );

        if (!newAccount) throw Error;

        const avatarUrl = avatars.getInitials(userName);

        await signIn(email, password);

        const newUser = await databases.createDocument(
            config.databaseId,
            config.userCollectionId,
            ID.unique(),
            {
                accountId: newAccount.$id,
                email,
                userName,
                avatar: avatarUrl
            }
        )

        return newUser;
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
}

export async function signIn(email, password) {
    try {
        const session = await account.createEmailPasswordSession(email, password);
        return session;
    } catch (error) {
        throw new Error(error);
    }
}