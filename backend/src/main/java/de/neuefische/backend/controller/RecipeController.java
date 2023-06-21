package de.neuefische.backend.controller;

import de.neuefische.backend.model.RecipeCollection;
import de.neuefische.backend.service.RecipeService;
import lombok.RequiredArgsConstructor;
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
}
