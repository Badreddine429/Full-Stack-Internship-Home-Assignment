package ma.dnaengineering.backend.controller;

import ma.dnaengineering.backend.entity.Employee;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import ma.dnaengineering.backend.service.CsvParserService;

import java.io.IOException;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/csv")
@CrossOrigin(origins = "http://localhost:3000")
public class CsvParserController {

    @Autowired
    private CsvParserService csvParserService;

    @PostMapping("/upload")
    public ResponseEntity<List<Employee>> uploadCSV(@RequestPart("file") MultipartFile file) {
        try {
            // Parse CSV and return employees
            List<Employee> employees = csvParserService.parseCSV(file);

            // You can also save the file if needed
            // Path filePath = Paths.get("uploads/" + file.getOriginalFilename());
            // Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

            return ResponseEntity.ok().body(employees);
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body(null); // Handle the error as needed
        }
    }


    @GetMapping("/summary")
    public Map<String, Double> getSalarySummary() {
        // Calculate and return average salary by job title
        return csvParserService.calculateAverageSalaryByJobTitle();
    }
}
