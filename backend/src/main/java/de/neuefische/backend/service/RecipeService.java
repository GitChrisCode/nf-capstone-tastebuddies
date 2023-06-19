package de.neuefische.backend.service;

import de.neuefische.backend.model.RecipeCollection;
import lombok.Data;
import lombok.RequiredArgsConstructor;
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

    WebClient webClient = WebClient.create("https://api.spoonacular.com");

    public RecipeCollection getRecipes(String searchQuery) {

        String apiKey = System.getenv("SPOONACULAR_API_KEY");
        String uri = UriComponentsBuilder
                .fromUriString("/recipes/complexSearch")
                .queryParam("query", searchQuery)
                .queryParam("apiKey", apiKey)
                .toUriString();

        return Objects.requireNonNull(Objects.requireNonNull(webClient.get())
                        .uri(uri)
                        .header(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
                        .retrieve()
                        .toEntity(RecipeCollection.class)
                        .block())
                .getBody();
    }
}
