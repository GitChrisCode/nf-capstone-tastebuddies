package de.neuefische.backend.model;
import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;


@Data
@With
@Builder
@Document("Menu")
@AllArgsConstructor
@NoArgsConstructor
public class Menu {
    @Id
    private String menuId;
    private String menuTitle;
    private Recipe[] menuRecipeList;
}

