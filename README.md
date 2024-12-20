# Oplynk

**Oplynk** is a platform that allows users to create and manage two types of sessions:

1. **Fundraising Sessions**: Users can start a fundraising session where they can track donations, with a live update of the total amount raised.
2. **Topic-Based Sessions**: Users can create sessions based on a specific topic where others can contribute their thoughts or resources to the discussion.

The platform is built with **Next.js** (used for both frontend and backend functionality) and **Appwrite** (for backend services such as user authentication, session management, and data storage). 

The app is designed to handle real-time updates and ensures a smooth user experience while fundraising or collaborating on topic-based discussions.

## Key Features
- **Fundraising Sessions**: Create and track the progress of fundraising campaigns, with a display of the total amount raised.
- **Topic-Based Sessions**: Create sessions based on specific topics for collaborative discussion or contributions.
- **User Authentication**: Users can create an account, log in, and manage their sessions securely.
- **Real-Time Data**: The platform ensures that the data, such as total funds raised or contributions to topics, is updated in real-time.
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

Installation Instructions
Prerequisites
Make sure you have the following tools installed on your machine:

Node.js (v14 or later)
Appwrite instance setup
Setting up the Project Locally
Clone the repository:

bash
Copy code
git clone https://github.com/yourusername/oplynk.git
cd oplynk
Install the necessary dependencies:

bash
Copy code
npm install
Set up Appwrite:

Create an Appwrite account and set up a project.
Configure Appwrite for your project (follow the Appwrite setup guide).
Make sure to add your Appwrite credentials (API keys, project ID) in the .env.local file:
plaintext
Copy code
NEXT_PUBLIC_APPWRITE_ENDPOINT=<Your Appwrite Endpoint>
NEXT_PUBLIC_APPWRITE_PROJECT_ID=<Your Appwrite Project ID>
NEXT_PUBLIC_APPWRITE_DATABASE_ID=<Your Appwrite Database ID>
Run the project:

bash
Copy code
npm run dev
Your app should now be running at http://localhost:3000.

Usage
Create a Fundraising Session: Click on "Create Fundraising" and enter the session details. Users can donate to the session, and the total amount will be displayed in real-time.

Create a Topic-Based Session: Select "Create Topic Session" and specify the topic you want to discuss. Users can contribute to the discussion by adding their thoughts or resources, and all contributions will be stored and displayed within the session.

Example Workflow
Creating a Fundraising Session
User clicks "Create Fundraising" and fills out the necessary details like title, goal amount, and description.
The platform tracks donations made towards the goal in real-time, updating the total amount raised.
Users can donate, and the progress bar will reflect the total amount raised.
Topic-Based Session
User clicks "Create Topic Session" and enters a topic title and description.
Other users can contribute to the topic by adding comments or resources.
All contributions are displayed in real-time.
Contributing
We welcome contributions to Oplynk! If you'd like to contribute, please follow these steps:

Fork the repository.
Create a new branch for your feature or bug fix.
Make your changes.
Submit a pull request with a detailed description of your changes.
License
This project is licensed under the MIT License - see the LICENSE file for details.
