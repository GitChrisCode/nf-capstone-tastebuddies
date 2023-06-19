package de.neuefische.backend.service;

import de.neuefische.backend.model.Recipe;
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

    public List<Recipe> getRecipes(String searchQuery) {
        List<Recipe> searchResult = new ArrayList<>();
        searchResult = Objects.requireNonNull(webClient.get())
                .uri("/complexsearch/" + search)
                .header(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
                .retrieve()
                .toEntity(s)


        return searchResult;
    }
}
