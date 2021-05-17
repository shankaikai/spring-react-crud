package com.example.springboot_react.demo.controllers;

import java.util.List;

import com.example.springboot_react.demo.models.User;
import com.example.springboot_react.demo.repositories.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "http://localhost:3000") // Needed if transferring data across ports
@RestController
@RequestMapping("/api")
public class UserController {
    @Autowired // Connect repository to private variable
    private UserRepository userRepository;

    @GetMapping("/")
    public List<User> getUsers() {
        return userRepository.findAll();
    }

    @GetMapping("/{id}")    
    public User getUser(@PathVariable Integer id) {
        return userRepository.findById(id).orElse(null);
    }

    @PostMapping("/{id}")
    public User postUser(@RequestBody User user) {
        // Passing a user object
        return userRepository.save(user);
    }

    @PutMapping("/")
    public User putUser(@RequestBody User user) {
        // Lombok will have the getters and setters added for you
        User oldUser = userRepository.findById(user.getId()).orElse(null);
        oldUser.setName(user.getName());
        oldUser.setEmail(user.getEmail());
        oldUser.setPassword(user.getPassword());
        return userRepository.save(oldUser);
    }

    @DeleteMapping("/{id}")
    public Integer deleteUser(@PathVariable Integer id) {
        userRepository.deleteById(id);
        return id;
    }

}
