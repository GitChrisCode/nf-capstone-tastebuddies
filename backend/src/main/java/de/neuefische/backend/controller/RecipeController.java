package de.neuefische.backend.controller;

import de.neuefische.backend.model.Recipe;
import de.neuefische.backend.model.RecipeCollection;
import de.neuefische.backend.service.RecipeService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/tb/user")
@RequiredArgsConstructor
public class RecipeController {
    private final RecipeService service;

    @GetMapping("/recipesearch/{searchQuery}")
    public RecipeCollection getRecipes(@PathVariable String searchQuery) {
        return service.getRecipes(searchQuery);
    }
}
