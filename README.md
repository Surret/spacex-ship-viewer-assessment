# SpaceX Ship Viewer & Missing Attribute Tracker (Full-Stack Assessment)

This full-stack web application fetches **SpaceX ship data** to display on a website. It allows users to view information for each ship, including its linked missions, and click on a ship's name for more details. Crucially, it also features a custom backend that identifies and tracks **missing essential attributes** for each vessel.

### Technologies Used

* `Next.js 15` (App Router, Server Components)
* `React`
* `Tailwind CSS` (for styling)
* `Apollo Client` (for GraphQL integration)
* `Node.js`
* `Express` (for the backend framework)
* `PostgreSQL` (for the database)
* `Sequelize ORM` (for database interaction)
* `Docker` (for containerisation)
* `GraphQL` (for SpaceX API consumption)
* `REST API` (for custom backend services)

### How to Run Locally

To get this project up and running on your local machine, follow these steps:

1.  **Install Docker:**
    Ensure Docker Desktop is installed and running on your system. This project relies on Docker for its database and other services.

2.  **Clone the Repository:**
    ```bash
    git clone [YOUR_GITHUB_REPO_URL] # Replace with your actual repository URL
    cd spacex-ship-viewer-assessment # Or whatever your exact repository name is
    ```

3.  **Set Up Environment Variables:**
    This project uses environment variables (e.g., for database connection and API URLs).
    * Navigate to the `backend` directory: `cd backend`
    * Create a `.env` file based on an example (if you have one, e.g., `cp .env.example .env`). You will need to populate this file with your database connection string and any other necessary secrets for the backend.
    * Navigate back to the project root: `cd ..`
    * *(If your frontend also has environment variables, you may need to add similar instructions for the `frontend` directory.)*

4.  **Start Docker Services:**
    The Docker Compose configuration (`common.yml`) and a `start.sh` script are located in the `backend/infrastructure` directory.
    First, navigate to that directory, and then execute the script:
    ```bash
    cd backend/infrastructure
    ./start.sh
    ```
    *(This script uses `docker compose` to build and start your services, including the the PostgreSQL database, as defined in `common.yml`.)*

    **Important:** After running `./start.sh`, you will be in the `backend/infrastructure` directory. You must navigate back to the main project root to proceed with installing dependencies for the frontend and backend:
    ```bash
    cd ../.. # This command will take you back to the root of your project
    ```

5.  **Install Backend Dependencies & Populate Database:**
    Navigate to the `backend` directory and install the required packages. Then, run the script to populate the database with initial data:
    ```bash
    cd backend
    yarn install # or npm install (use the package manager you prefer)
    yarn populate-app # This command populates your database with necessary initial data
    ```

6.  **Install Frontend Dependencies & Configure Backend Connection:**
    Navigate to the `frontend` directory and install the required packages:
    ```bash
    cd ../frontend
    yarn install # or npm install (use the package manager you prefer)
    ```
    Ensure your frontend is configured to connect to your local backend. This is typically done via an environment variable (e.g., `NEXT_PUBLIC_BACKEND_URL`) in your frontend's `.env` file, pointing to your local backend's address (e.g., `http://localhost:5000` or the appropriate Docker service name if your frontend also runs within the Docker network).

7.  **Run the Applications:**
    * **Start the Backend (if not already running through Docker, or if you need to restart it after code changes):**
        ```bash
        cd backend
        yarn dev # or npm run dev / npm start (use the command defined in your package.json)
        ```
    * **Start the Frontend:**
        Open a **new terminal window**, navigate to the `frontend` directory, and start the Next.js development server:
        ```bash
        cd frontend
        yarn dev # or npm run dev (use the command defined in your package.json)
        ```

8.  **Access the Application:**
    Once both the backend and frontend are running, open your web browser and go to `http://localhost:3000` (or whatever port your Next.js application runs on).

### Challenges & Learnings

Throughout this project, I encountered and successfully navigated several key technical challenges, which significantly deepened my understanding of full-stack development. This section highlights some of those hurdles and the valuable lessons learned:

* **Consuming and Integrating External GraphQL API Data for Database Population:**
    * **The Problem:** Updating the populate script involved fetching extensive ship data from the SpaceX GraphQL API. A key challenge was efficiently consuming this external GraphQL API and then transforming its varied structure to fit my custom PostgreSQL database schema, especially when dealing with nested data and potentially incomplete records.
    * **My Approach/Solution:** I designed the populate script to systematically query the GraphQL endpoint, map the incoming data fields to my **Sequelize models**, and perform data validation/sanitisation before persisting it. This involved careful consideration of data types and ensuring efficient bulk inserts where possible using **Sequelize's functionalities**.
    * **Key Learning:** This experience significantly enhanced my skills in interacting with external GraphQL APIs, performing robust data transformation and mapping, and optimising database population scripts, particularly when working with **Sequelize ORM**.

* **Establishing Randomised Data Relationships (Missions to Ships):**
    * **The Problem:** A specific requirement was to create mission data and link it to *random* ships within the database. This introduced a logical challenge in the populate script: ensuring valid, non-duplicate, and consistent relationships were established programmatically without manual intervention.
    * **My Approach/Solution:** I implemented logic within the populate script to first fetch existing ship IDs using **Sequelize**, then generate a randomised selection for mission assignments, ensuring referential integrity via **Sequelize's association methods**.
    * **Key Learning:** This refined my understanding of database relationship management within an ORM like **Sequelize**, and my ability to write complex data manipulation scripts that simulate real-world data linking requirements.

* **Systematic Frontend Debugging and Data Integrity:**
    * **The Problem:** I encountered persistent frontend errors where components would fail or display incorrectly due to missing or unexpected data from the GraphQL queries. It wasn't immediately clear which specific part of the data or rendering logic was causing the issue.
    * **My Approach/Solution:** To pinpoint the root cause, I employed a methodical **'divide and conquer' debugging strategy**. This involved systematically removing sections of code, piece by piece, until the error disappeared, thereby isolating the problematic logic or data access pattern. I then rebuilt the section with refined error handling and conditional rendering, ensuring graceful degradation when data was unavailable.
    * **Key Learning:** This hands-on experience drastically improved my debugging capabilities, teaching me the value of systematic code isolation and the importance of anticipating and gracefully handling data inconsistencies on the frontend for a robust user experience.

    ### Future Enhancements

This project serves as a robust foundation, and there are several exciting avenues for future development:

* **Advanced Filtering & Search:** Implement comprehensive search functionality and various filtering options for ships (e.g., by type, port, or status).
* **User Authentication & Personalisation:** Introduce user accounts to allow for personalised features, such as marking favourite ships or tracking custom notes.
* **Enhanced UI/UX:** Refine the user interface with more sophisticated styling, animations, and potentially a dark mode option.
* **Cloud Deployment:** Deploy the application to a cloud provider (e.g., Vercel for the frontend, and a service like Render or AWS for the backend/database) to make it publicly accessible.
* **Expanded Test Coverage:** Increase unit and integration test coverage for both the frontend and backend to ensure long-term stability and maintainability.