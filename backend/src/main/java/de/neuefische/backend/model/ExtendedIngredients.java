package de.neuefische.backend.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ExtendedIngredients {
    private String aisle;
    private Double amount;
    private String consitency;
    private Integer id;
    private String image;
    private Measures measures;
    private String name;
    private String original;
    private String originalName;
    private String unit;
    private String pairingText;
    private ProductMatches productMatches;
}