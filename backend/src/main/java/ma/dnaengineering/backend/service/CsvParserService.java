package ma.dnaengineering.backend.service;

import ma.dnaengineering.backend.entity.Employee;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import ma.dnaengineering.backend.repository.EmployeeRepository;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
public class CsvParserService {

    @Autowired
    private EmployeeRepository employeeRepository;

    public List<Employee> parseCSV(MultipartFile file) throws IOException {
        try (BufferedReader br = new BufferedReader(new InputStreamReader(file.getInputStream()))) {
            // Assuming CSV structure: id,employee_name,job_title,salary
            List<Employee> employees = br.lines()
                    .skip(1) // Skip header
                    .map(line -> {
                        String[] parts = line.split(",");
                        if (parts.length == 4) { // Ensure there are four parts (id, employee_name, job_title, salary)
                            Employee employee = new Employee();
                            employee.setId(Long.parseLong(parts[0]));
                            employee.setName(parts[1]);
                            employee.setJobTitle(parts[2]);
                            employee.setSalary(Double.parseDouble(parts[3]));
                            return employee;
                        } else {
                            // Log an error for rows with incorrect structure
                            System.err.println("Incorrect CSV structure for line: " + line);
                            return null;
                        }
                    })
                    .filter(Objects::nonNull) // Filter out null entries
                    .collect(Collectors.toList());

            // Save employees to the database
            employeeRepository.saveAll(employees);

            return employees;
        }
    }

    public Map<String, Double> calculateAverageSalaryByJobTitle() {
        return employeeRepository.findAll().stream()
                .collect(Collectors.groupingBy(Employee::getJobTitle,
                        Collectors.averagingDouble(Employee::getSalary)));
    }
}
