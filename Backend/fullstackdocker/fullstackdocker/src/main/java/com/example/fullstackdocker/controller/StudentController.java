package com.example.fullstackdocker.controller;


import com.example.fullstackdocker.entity.Student;
import com.example.fullstackdocker.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/api/students")
@CrossOrigin(origins = "http://localhost:5173")
public class StudentController {
    @Autowired
    private StudentRepository repo;


    @GetMapping
    public List<Student> getAll() {
        return repo.findAll();
    }

    @PostMapping
    public Student save(@RequestBody Student student) {
        return repo.save(student);
    }
}
