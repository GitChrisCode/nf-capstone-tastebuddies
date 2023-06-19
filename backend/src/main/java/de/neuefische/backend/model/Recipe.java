package de.neuefische.backend.model;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
@Data
@With
@Builder
@Document("Recipe")
@AllArgsConstructor
@NoArgsConstructor
public class Recipe {
    @Id
    private Integer id;
    private String title;
    private String image;
    private String imageType;
}
