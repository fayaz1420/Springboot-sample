# Spring Boot Ecommerce with React Banking UI

A full-stack application featuring a Spring Boot backend with REST APIs and two frontend options: Thymeleaf for server-side rendering and React for a modern SPA experience.

## 🚀 Features

### Backend (Spring Boot)
- RESTful APIs for Country and Account management
- Spring Data JPA for database operations
- MySQL database integration
- Service layer with transaction management
- Cross-origin support for frontend applications
- Thymeleaf template engine support

### Frontend Options

#### 1. Thymeleaf UI
- Server-side rendered pages
- Interactive Country management interface
- Real-time form submission and data display

#### 2. React Banking UI
- Modern single-page application
- Account dashboard with statistics
- Full CRUD operations for banking accounts
- Responsive design with gradient styling
- Real-time balance calculations

## 📋 Prerequisites

- **Java 11** or higher
- **Maven 3.6+**
- **MySQL 8.0+**
- **Node.js 14+** and **npm 6+** (for React UI)
- **Eclipse IDE** (optional, for development)

## 🛠️ Installation & Setup

### 1. Database Setup

Create a MySQL database:

```sql
CREATE DATABASE ecommerce;
CREATE USER 'appuser'@'localhost' IDENTIFIED BY 'App@123';
GRANT ALL PRIVILEGES ON ecommerce.* TO 'appuser'@'localhost';
FLUSH PRIVILEGES;
```

### 2. Backend Setup

#### Using Maven Command Line

```bash
# Navigate to project directory
cd /path/to/Springboot-sample

# Install dependencies
mvn clean install

# Run the application
mvn spring-boot:run
```

The backend will start on `http://localhost:8081`

#### Using Eclipse

1. **Import Project:**
   - File → Import → Maven → Existing Maven Projects
   - Select the project root directory
   - Click Finish

2. **Run Application:**
   - Right-click on `SpringBootEcommerceApplication.java`
   - Select "Run As" → "Spring Boot App"
   
   OR
   
   - Right-click on project → Run As → Maven build...
   - Goals: `spring-boot:run`
   - Click Run

3. **Debug Application:**
   - Set breakpoints in your code
   - Right-click on `SpringBootEcommerceApplication.java`
   - Select "Debug As" → "Spring Boot App"

#### Build JAR and Run

```bash
# Build the JAR
mvn clean package

# Run the JAR
java -jar target/spring-boot-ecommerce-0.0.1-SNAPSHOT.jar
```

### 3. React Banking UI Setup

```bash
# Navigate to React app directory
cd banking-ui

# Install dependencies
npm install

# Start development server
npm start
```

The React app will start on `http://localhost:3000`

#### Build for Production

```bash
# Build optimized production bundle
npm run build

# The build folder can be copied to src/main/resources/static
# to serve from Spring Boot
```

## 🌐 API Endpoints

### Country Endpoints

- `GET /api/countries` - Get all countries
- `GET /api/countries/{id}` - Get country by ID
- `POST /api/countries` - Create new country

**Example Request Body:**
```json
{
  "code": "USA",
  "name": "United States"
}
```

### Account Endpoints

- `GET /api/accounts` - Get all accounts
- `GET /api/accounts/{id}` - Get account by ID
- `POST /api/accounts` - Create new account
- `PUT /api/accounts/{id}` - Update account
- `DELETE /api/accounts/{id}` - Delete account

**Example Request Body:**
```json
{
  "accountNumber": "ACC001",
  "holderName": "John Doe",
  "accountType": "SAVINGS",
  "balance": 1000.00
}
```

### Health Check

- `GET /` - Backend health check
- `GET /health` - Application health status

## 🖥️ Frontend Access

### Thymeleaf UI
- Countries Page: `http://localhost:8081/countries`

### React Banking UI
- Dashboard: `http://localhost:3000`

## 🔧 Configuration

### Backend Configuration
Located in `src/main/resources/application.properties`:

```properties
# Database
spring.datasource.url=jdbc:mysql://127.0.0.1:3306/ecommerce
spring.datasource.username=appuser
spring.datasource.password=App@123

# Server
server.port=8081

# API Base Path
spring.data.rest.base-path=/api
```

### React Configuration
Create a `.env` file in `banking-ui/`:

```
REACT_APP_API_BASE=http://localhost:8081/api
```

## 📁 Project Structure

```
Springboot-sample/
├── src/
│   ├── main/
│   │   ├── java/com/fatihhernn/ecommerce/
│   │   │   ├── config/          # Configuration classes
│   │   │   ├── controller/      # REST & Web controllers
│   │   │   ├── dao/             # Repository interfaces
│   │   │   ├── entities/        # JPA entities
│   │   │   ├── service/         # Service layer
│   │   │   └── SpringBootEcommerceApplication.java
│   │   └── resources/
│   │       ├── templates/       # Thymeleaf templates
│   │       ├── static/          # Static resources
│   │       └── application.properties
│   └── test/                    # Test classes
├── banking-ui/                  # React application
│   ├── public/
│   ├── src/
│   │   ├── components/         # React components
│   │   ├── api.js              # API service
│   │   ├── App.js              # Main App component
│   │   ├── index.js            # Entry point
│   │   └── styles.css          # Styles
│   └── package.json
├── pom.xml
└── README.md
```

## 🧪 Testing

### Backend Tests

```bash
# Run all tests
mvn test

# Run specific test
mvn test -Dtest=ClassName#methodName
```

### React Tests

```bash
cd banking-ui
npm test
```

## 🐛 Troubleshooting

### Common Issues

1. **"Unsupported primitive id type int!" Error**
   - Fixed: Entity IDs now use wrapper types (Integer, Long) instead of primitives

2. **Database Connection Failed**
   - Ensure MySQL is running
   - Verify credentials in `application.properties`
   - Check database exists

3. **Port Already in Use**
   - Backend: Change `server.port` in `application.properties`
   - React: React will prompt to use different port

4. **CORS Issues**
   - Controllers are configured with `@CrossOrigin`
   - Allowed origins: `http://localhost:4200`, `http://localhost:3000`

5. **React Can't Connect to Backend**
   - Verify backend is running on port 8081
   - Check `REACT_APP_API_BASE` in `.env`

## 📝 Development Tips

### Hot Reload

- **Backend**: Use Spring Boot DevTools (already included)
- **React**: Runs with hot reload by default

### Eclipse Tips

1. **Terminal in Eclipse:**
   - Window → Show View → Terminal
   - Use terminal to run React: `cd banking-ui && npm start`

2. **Maven Update:**
   - Right-click project → Maven → Update Project

3. **Clean Build:**
   - Project → Clean → Select project → OK

## 🔐 Security Notes

- Current setup allows HTTP methods for development
- For production, implement:
  - Spring Security
  - JWT authentication
  - HTTPS
  - Input validation
  - Rate limiting

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👥 Authors

- Fatih Hern - Initial work

## 🙏 Acknowledgments

- Spring Boot team
- React team
- MySQL community
