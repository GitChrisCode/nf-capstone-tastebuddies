package de.neuefische.backend.model;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
@Data
@AllArgsConstructor
@NoArgsConstructor
public class RecipeInfo {
    private Integer offset;
    private Integer number;
    private Integer totalResults;
}
