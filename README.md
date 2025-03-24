

# TimeWise

**TimeWise** is a productivity-focused web application designed to help users manage their time effectively by using focus timers, break sessions, achievement tracking, streak management, and interactive charts. The app allows users to set and track focus sessions, take breaks, earn achievements, and visualize their productivity with statistics.

## Features
- **Focus Timer**: Start a focus session and a break timer, with customizable durations.
- **Achievements**: Unlock achievements after completing milestones like finishing focus sessions or maintaining streaks.
- **Streak Tracking**: Track consecutive days of focus sessions and display the current streak.
- **Notifications**: Get browser or in-app notifications when sessions are complete.
- **Charts**: Visualize your productivity and session statistics with interactive charts.

## Demo
You can view a live demo of the app (link to be added when hosted).

## Technologies Used
- **React** (Frontend)
- **Node.js** and **Express** (Backend)
- **MySQL** (Database)
- **Tailwind CSS** (UI Styling)
- **Recharts** (Charts & Graphs)
- **React Context API** (State Management)
- **LocalStorage** (Persisting Settings)
- **Notification API** (Browser Notifications)

## Installation

### Prerequisites
Before starting, make sure you have the following installed:
- **Node.js** (v16 or later)
- **npm** (v7 or later)
- **MySQL** (if setting up the backend with a database)

### Steps to Run the Project

1. **Clone the repository**:

   ```bash
   git clone https://github.com/your-username/timewise.git
   cd timewise
   ```

2. **Install dependencies**:

   - Frontend dependencies:
     ```bash
     cd frontend
     npm install
     ```

   - Backend dependencies:
     ```bash
     cd backend
     npm install
     ```

3. **Set up environment variables**:
   
   - Create a `.env` file in the backend folder and add your database connection details, for example:
     ```
     DB_HOST=localhost
     DB_USER=root
     DB_PASS=yourpassword
     DB_NAME=timewise
     ```

4. **Run the backend**:

   ```bash
   cd backend
   npm start
   ```

   The backend server will start, typically on `http://localhost:5000`.

5. **Run the frontend**:

   ```bash
   cd frontend
   npm start
   ```

   The frontend app will start, typically on `http://localhost:3000`.

### Running Tests

- **Frontend Tests**:
  ```bash
  cd frontend
  npm run test
  ```

- **Backend Tests**:
  ```bash
  cd backend
  npm run test
  ```

## Usage

Once the app is up and running, you can use the following features:

### Focus Timer
- Set the timer for your focus sessions and breaks.
- When the focus session is complete, you will receive a notification (either browser or in-app) and a sound alert.
- Track your progress and see how many sessions you've completed.

### Achievements
- Unlock achievements like "First Session", "Five Sessions", and "Seven Day Streak" as you reach milestones in your productivity.

### Streaks
- Keep track of consecutive days you complete focus sessions and challenge yourself to keep up the streak.

### Charts
- Visualize your session data with charts that show session counts, focus session durations, and streak data.

## Configuration

### Notification Settings
Users can enable or disable notifications and sound alerts for focus session completion. These preferences are stored in `localStorage`.

### Customize Session Lengths
You can adjust the duration of focus sessions and breaks by editing the respective settings in the app.

## Contributing

1. Fork the repository
2. Create your branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Create a new Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgements
- The design inspiration was inspired by modern productivity tools.
- **Poligonstudio** for the sound effect used in the app.

---
