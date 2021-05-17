package com.example.springboot_react.demo.models;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class User {
    @Id // Primary key
    @GeneratedValue 
    private int id;

    private String Name;
    private String Email;
    private String Password;

}
