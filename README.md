# Rehearsal Scheduler App

A comprehensive web application designed to simplify band rehearsal scheduling, track attendance, and optimize rehearsal times based on member availability.

## Features

- **User Authentication & Management**
  - Create accounts and join bands
  - Manage band members and roles
  - Multi-band membership support

- **Rehearsal Scheduling**
  - Create and schedule rehearsals with location, date, and time
  - View rehearsals on an interactive calendar
  - Set up recurring rehearsals

- **Availability Management**
  - Indicate available/unavailable time slots
  - Set extended absence periods
  - View availability heatmaps

- **Attendance Tracking**
  - Confirm attendance status
  - Track historical attendance records
  - View attendance statistics

- **Smart Scheduling**
  - Receive suggestions for optimal rehearsal times
  - Consider historical attendance data when scheduling

- **Rehearsal Content**
  - Create setlists for specific rehearsals
  - Attach notes, sheet music, or recordings
  - View rehearsal plans for preparation

- **Notifications & Reminders**
  - Get alerts for upcoming rehearsals
  - Receive notifications for schedule changes
  - Customize notification preferences

- **Calendar Integration**
  - Sync with personal calendars (Google, Apple, Outlook)
  - View conflicts with other events

## Technology Stack

### Frontend
- React.js with TypeScript
- Redux for state management
- Material-UI components
- FullCalendar.js for calendar views
- Formik with Yup for forms
- Axios for API requests
- CSS-in-JS with styled-components

### Backend
- Node.js with Express.js
- RESTful API design
- JWT authentication
- PostgreSQL database
- Sequelize/Prisma ORM
- Redis caching

### DevOps
- Docker containerization
- GitHub Actions for CI/CD
- AWS hosting (EC2, RDS, S3)
- Sentry error tracking

## Getting Started

### Prerequisites
- Node.js 18.x or higher
- npm or yarn
- PostgreSQL 14.x or higher
- Redis (optional, for performance)

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/dxaginfo/rehearsal-scheduler-app.git
   cd rehearsal-scheduler-app
   ```

2. Install dependencies
   ```bash
   # Install backend dependencies
   cd server
   npm install
   
   # Install frontend dependencies
   cd ../client
   npm install
   ```

3. Set up environment variables
   ```bash
   # In server directory
   cp .env.example .env
   # Edit .env with your database credentials and JWT secret
   ```

4. Run database migrations
   ```bash
   cd server
   npm run migrate
   ```

5. Start development servers
   ```bash
   # Start backend server
   cd server
   npm run dev
   
   # In another terminal, start frontend
   cd client
   npm start
   ```

6. Open your browser and navigate to `http://localhost:3000`

## Deployment

### Docker Deployment

1. Build the Docker images
   ```bash
   docker-compose build
   ```

2. Start the containers
   ```bash
   docker-compose up -d
   ```

### Manual Deployment

See the [deployment guide](docs/deployment.md) for detailed instructions on deploying to AWS.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Thanks to all the musicians who provided feedback during the development process
- Inspired by the challenges faced by bands in coordinating rehearsal schedules
- Built with ❤️ for the music community