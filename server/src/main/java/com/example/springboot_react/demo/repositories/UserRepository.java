package com.example.springboot_react.demo.repositories;
import com.example.springboot_react.demo.models.User;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
    
}
