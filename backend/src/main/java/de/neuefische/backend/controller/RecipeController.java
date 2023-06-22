package de.neuefische.backend.controller;

import de.neuefische.backend.model.RecipeCollection;
import de.neuefische.backend.model.RecipeInformation;
import de.neuefische.backend.service.RecipeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/tb/user")
@RequiredArgsConstructor
public class RecipeController {

    private final RecipeService service;

    @GetMapping("/recipesearch")
    public RecipeCollection getRecipes(@RequestParam("query") String searchQuery) {
        return service.getRecipes(searchQuery);
    }

    @GetMapping("/recipe/{id}")
    public ResponseEntity<RecipeInformation> getRecipeDetail(@PathVariable("id") Integer id) {
        try {
            RecipeInformation recipeDetail = service.getRecipeDetail(id);
            if (recipeDetail != null) {
                return ResponseEntity.ok(recipeDetail);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
