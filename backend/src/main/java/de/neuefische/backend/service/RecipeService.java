package de.neuefische.backend.service;

import de.neuefische.backend.model.RecipeCollection;
import de.neuefische.backend.model.RecipeInformation;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.Objects;

@Service
@RequiredArgsConstructor
@Data
public class RecipeService {

    @Value("${api-key}")
    private String apiKey;

    WebClient webClient = WebClient.create("https://api.spoonacular.com");

    public RecipeCollection getRecipes(String includeIngredients, String excludeIngredients) {
        String uri = UriComponentsBuilder
                .fromUriString("/recipes/complexSearch")
                .queryParam("apiKey", apiKey)
                .queryParam("includeIngredients", includeIngredients)
                .queryParam("excludeIngredients", excludeIngredients)
                .queryParam("number", "24")
                .toUriString();

        return Objects.requireNonNull(Objects.requireNonNull(webClient.get())
                        .uri(uri)
                        .header(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
                        .retrieve()
                        .toEntity(RecipeCollection.class)
                        .block())
                .getBody();
    }

    public RecipeInformation getRecipeDetail(Integer id) {
        String uri = UriComponentsBuilder
                .fromUriString("/recipes/" + id + "/information")
                .queryParam("apiKey", apiKey)
                .queryParam("includeNutrition", true)
                .toUriString();

        return Objects.requireNonNull(Objects.requireNonNull(webClient.get())
                        .uri(uri)
                        .header(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
                        .retrieve()
                        .toEntity(RecipeInformation.class)
                        .block())
                .getBody();
    }
}
