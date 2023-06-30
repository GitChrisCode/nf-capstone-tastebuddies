package de.neuefische.backend.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document("Guests")
public class Guest {
    @Id
    private String guestID;
    private String userName;
    private String guestName;
    private String[] includeIngredients;
    private String[] excludeIngredients;
}
