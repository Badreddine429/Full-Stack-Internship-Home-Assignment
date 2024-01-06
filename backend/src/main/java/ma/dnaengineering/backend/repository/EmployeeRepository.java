package ma.dnaengineering.backend.repository;

import ma.dnaengineering.backend.entity.Employee;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EmployeeRepository extends JpaRepository<Employee, Long> {
}