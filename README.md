https://github.com/YounesELHaimer/InternshipProcess-Application-Front/assets/92695955/e5bc8f53-7491-47a6-9eb9-239f2297a39a

## Backend (Spring Boot):

### CsvParserController:

- **Endpoints:**
  - `/api/csv/upload` (POST): Uploads a CSV file containing employee information. It uses `MultipartFile` for file upload.
  - `/api/csv/summary` (GET): Fetches the average salary summary for each job title.

- **Why:**
  - **Upload Endpoint:** To handle the file upload and parse the CSV data, saving it to the MySQL database.
  - **Summary Endpoint:** To calculate and provide the average salary summary by job title.

- **Connected to MySQL:**
  - The backend is connected to MySQL using XAMPP. The `Employee` entity is persisted to the database using Spring Data JPA through the `EmployeeRepository`.

- **Tested in Postman:**
  - Both endpoints have been tested in Postman to ensure they handle file uploads and return the expected data.

## Frontend (React):

### Home Component:

- **Components:**
  - **UploadButton:** Handles file selection for upload.
  - **ResultsTable:** Displays paginated tables for employee information and job summary.

- **API Calls:**
  - Utilizes `axios` to make HTTP requests to the backend.

- **Why:**
  - **Upload Button:** Allows users to select and upload CSV files for processing.
  - **Results Table:** Displays the paginated list of employees and the job summary.

- **CORS Configuration:**
  - Uses `@CrossOrigin` in the backend `CsvParserController` to allow cross-origin requests from `http://localhost:3000` (the frontend).

- **How It Works:**
  - User selects a CSV file using the "Upload" button.
  - Clicking "Process" triggers an HTTP POST request to the `/api/csv/upload` endpoint.
  - The processed data is displayed in paginated tables on the frontend.

## CORS (Cross-Origin Resource Sharing):

- **Why:**
  - Browsers have a security policy that prevents web pages from making requests to a different domain than the one that served the web page. CORS enables cross-origin requests.

- **Implementation:**
  - The `@CrossOrigin` annotation is used in the Spring Boot `CsvParserController` to specify that requests from `http://localhost:3000` are allowed.

## Overall Flow:

1. **File Upload:**
   - User uploads a CSV file through the frontend.
   - Frontend makes a request to the backend `/api/csv/upload` endpoint.

2. **Data Processing:**
   - Backend parses the CSV file, saves employee data to MySQL, and calculates job summary.

3. **Data Display:**
   - Processed data is sent back to the frontend.
   - Frontend displays paginated tables for employee information and job summary.

This architecture allows for separation of concerns, making the application scalable and maintainable.




------------------------------------------------------------------------------------------------------------
## DNA Engineering Full-Stack Assignment
Build a CSV Parser.

## Table of content
- [Prerequisites](#prerequisites)
- [Before We begin](#before-we-begin)
- [Assignment](#assignment)
- [What we expect](#what-we-expect)
- [Bonus points](#bonus-points)

## Prerequisites
- Java 17
- Node Js v20.10.0

## Before we begin
- In this assignment, you will be asked to write, and test your code.
- Make sure you respect clean code guidelines.
- Read the assignment carefully.

## Description
You are invited to create a CSV parser using Java/Spring Boot, and build UI to display results using Next.js/React.

## Assignment

### Backend (CSV Parser)

#### Tasks

- Write a service in Java that will read and process the attached CSV(comma separated values) file at `data/employees.csv`.

- This service should read, extract and process data in a suitable data structure.

- Process this data to return the list of employees and a summary indicating the average salary for each job title.

### Frontend

#### Tasks
Implement a simple user interface that will allow the user to upload the file and display the results of your processing.

#### Interfaces

Respect the following design flow:

![Frontend interfaces](./static/interfaces.png)

- **Interface-1**: Contain an upload button.
- **Interface-2**: The Process button is added when you choose a file.
- **Interface-3**: 2 Tables showing the processing results.

**Table 1**: Employee information, displays a paginated list of employees.

**Table 2**: Jobs summary, displays for each job title, the average salary for employees.

## What we expect
- Write a concise, easy to understand code.
- Use good practices.
- Write unit tests for your java code.
- Append to this README your approach and provide instructions to run your project.

## Bonus points
- Implement your own CSV file parser instead of using a library.
- Use design patterns.
