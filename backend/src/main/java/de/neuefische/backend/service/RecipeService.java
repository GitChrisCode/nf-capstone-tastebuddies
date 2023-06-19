package de.neuefische.backend.service;

import de.neuefische.backend.model.Recipe;
import de.neuefische.backend.model.RecipeCollection;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Service
@RequiredArgsConstructor
@Data
public class RecipeService {

    WebClient webClient = WebClient.create("https://api.spoonacular.com");

    public RecipeCollection getRecipes(String searchQuery) {
        RecipeCollection result = Objects.requireNonNull(webClient.get())
                .uri("/complexsearch/" + searchQuery)
                .header(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
                .retrieve()
                .toEntity(RecipeCollection.class)
                .block()
                .getBody();


        return result;
    }
}
