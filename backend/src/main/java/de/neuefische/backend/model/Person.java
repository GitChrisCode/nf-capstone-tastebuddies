package de.neuefische.backend.model;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Data
@With
@Builder
@Document("Person")
@AllArgsConstructor
@NoArgsConstructor
public class Person {
    @Id
    private String personId;
    private String personName;
    private List<String> tastePreferences;
    private List<String> tasteDislikes;
}
