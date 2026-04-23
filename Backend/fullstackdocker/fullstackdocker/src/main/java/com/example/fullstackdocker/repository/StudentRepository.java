package com.example.fullstackdocker.repository;

import com.example.fullstackdocker.entity.Student;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StudentRepository extends JpaRepository<Student, Long> { }
