# Oplynk

**Oplynk** is a platform that allows users to create and manage two types of sessions:

1. **Fundraising Sessions**: Users can start a fundraising session where they can track donations, with a live update of the total amount raised.
2. **Topic-Based Sessions**: Users can create sessions based on a specific topic where others can contribute their thoughts or resources to the discussion.

The platform is built with **Next.js** (used for both frontend and backend functionality) and **Appwrite** (for backend services such as user authentication, session management, and data storage). 

The app is designed to handle real-time updates and ensures a smooth user experience while fundraising or collaborating on topic-based discussions.

## Key Features

- **Fundraising Sessions**: Create and track the progress of fundraising campaigns, with a display of the total amount raised. Users can donate in the form of **gifts** (virtual tokens or items).
  
- **Topic-Based Sessions**: Create sessions based on specific topics for collaborative discussion or contributions. Users can share thoughts, resources, and engage in real-time conversations.

- **User Authentication**: Users can create an account, log in, and manage their sessions securely.

- **Real-Time Data**: The platform ensures that the data, such as total funds raised or contributions to topics, is updated in real-time. This also includes live updates for the session chat and donation progress.

- **Session Chat**: Each Fundraising session includes a **chat feature**, allowing users to engage in live conversations, ask questions, and collaborate within the session.

- **Gift-Based Donations**: In Fundraising sessions, donations are made in the form of **gifts** (virtual tokens/items), adding a unique element to how users contribute to a session's goals. It is also possible to gift the creator of the topic-based session.

- **Appwrite Integration**: Appwrite is used for user management, database operations, and backend functions.


## Technologies Used
- **Frontend**:
  - Next.js (React framework) for building the frontend and backend with server-side rendering and static site generation.
- **Backend**:
  - Appwrite for user authentication, session data storage, and backend operations.
- **Database**:
  - Appwrite's built-in database to store session details, user data, and contributions.
- **Deployment**:
  - Vercel for frontend deployment (if applicable).
  - Appwrite instance for backend services.

## Installation Instructions

## Prerequisites

Make sure you have the following tools installed on your machine:

- **Node.js**
- **Next.js** (The project uses Next.js for both the frontend and backend)
- **Appwrite instance setup** (You need an Appwrite account and project for backend services)


### Setting up the Project Locally

1. **Clone the repository**:
    ```bash
    git clone https://github.com/yourusername/oplynk.git
    cd oplynk
    ```

2. **Install the necessary dependencies**:
    ```bash
    npm install
    ```

3. **Set up Appwrite**:
    - Create an Appwrite account and set up a project.
    - Configure Appwrite for your project (follow the [Appwrite setup guide](https://appwrite.io/docs/)).
    - Add your Appwrite credentials (API keys, project ID) in the `.env.local` file:
      ```plaintext
      NEXT_PUBLIC_APPWRITE_ENDPOINT=<Your Appwrite Endpoint>
      NEXT_PUBLIC_APPWRITE_PROJECT_ID=<Your Appwrite Project ID>
      NEXT_PUBLIC_APPWRITE_DATABASE_ID=<Your Appwrite Database ID>
      ```

4. **Run the project**:
    ```bash
    npm run dev
    ```
    Your app should now be running at `http://localhost:3000`.

## Usage

- **Create a Fundraising Session**: Click on "Create Session", select Group-Fund and enter the session details. Users can donate to the session, and the total amount will be displayed in real-time.
  
- **Create a Topic-Based Session**: Select "Create Session", select Topic-Based and specify the topic you want to discuss. Users can contribute to the discussion by adding their thoughts, and all contributions will be stored and displayed within the session.

## Contributing

We welcome contributions to **Oplynk**! If you'd like to contribute, please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Make your changes.
4. Submit a pull request with a detailed description of your changes.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
