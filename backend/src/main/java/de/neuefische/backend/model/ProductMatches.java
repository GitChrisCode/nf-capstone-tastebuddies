package de.neuefische.backend.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProductMatches {
    private Integer id;
    private String title;
    private String description;
    private String price;
    private String imageUrl;
    private Double averageRating;
    private Double ratingCount;
    private Double score;
    private String link;
}
