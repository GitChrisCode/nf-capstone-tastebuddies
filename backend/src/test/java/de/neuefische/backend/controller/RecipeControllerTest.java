package de.neuefische.backend.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import de.neuefische.backend.model.RecipeCollection;
import de.neuefische.backend.service.RecipeService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.when;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
class RecipeControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private RecipeService mockRecipeService;

    @Test
    @WithMockUser
    void testGetRecipes() throws Exception {
        // Mock data
        RecipeCollection recipeCollection = new RecipeCollection();

        String apiResponse = """                
                {
                    "results": [
                        {
                            "id": 1098248,
                            "title": "Caramel apples",
                            "image": "https://spoonacular.com/recipeImages/1098248-312x231.jpg",
                            "imageType": "jpg"
                        },
                        {
                            "id": 157111,
                            "title": "Vegan Baked Apples with Oat Crumble",
                            "image": "https://spoonacular.com/recipeImages/157111-312x231.jpg",
                            "imageType": "jpg"
                        },
                        {
                            "id": 649942,
                            "title": "Lentils and Apples with Acorn Squash",
                            "image": "https://spoonacular.com/recipeImages/649942-312x231.jpg",
                            "imageType": "jpg"
                        },
                        {
                            "id": 656738,
                            "title": "Pork chops with apples and onions",
                            "image": "https://spoonacular.com/recipeImages/656738-312x231.jpg",
                            "imageType": "jpg"
                        },
                        {
                            "id": 715522,
                            "title": "Chicken Salad with Apples and Celery",
                            "image": "https://spoonacular.com/recipeImages/715522-312x231.jpg",
                            "imageType": "jpg"
                        },
                        {
                            "id": 658418,
                            "title": "Roast Chicken with Apples and Rosemary",
                            "image": "https://spoonacular.com/recipeImages/658418-312x231.jpg",
                            "imageType": "jpg"
                        },
                        {
                            "id": 639487,
                            "title": "Cinnamon Sugar Fried Apples",
                            "image": "https://spoonacular.com/recipeImages/639487-312x231.jpg",
                            "imageType": "jpg"
                        },
                        {
                            "id": 656323,
                            "title": "Pita Pizzas with Sautéed Apples and Bacon",
                            "image": "https://spoonacular.com/recipeImages/656323-312x231.jpg",
                            "imageType": "jpg"
                        },
                        {
                            "id": 633538,
                            "title": "Baked Chicken with Cinnamon Apples",
                            "image": "https://spoonacular.com/recipeImages/633538-312x231.jpg",
                            "imageType": "jpg"
                        },
                        {
                            "id": 656729,
                            "title": "Pork Chop with Honey, Mustard and Apples",
                            "image": "https://spoonacular.com/recipeImages/656729-312x231.jpg",
                            "imageType": "jpg"
                        }
                    ],
                    "offset": 0,
                    "number": 10,
                    "totalResults": 385
                }
                """;

        String searchQuery = "apples";

        ObjectMapper objectMapper = new ObjectMapper();
        recipeCollection = objectMapper.readValue(apiResponse, RecipeCollection.class);

        // Mock the service method
        when(mockRecipeService.getRecipes(anyString())).thenReturn(recipeCollection);

        // Perform the GET request and verify the response
        mockMvc.perform(get("/tb/user/recipesearch")
                        .param("query", "apples")
                        .contentType(MediaType.APPLICATION_JSON)
                        .with(csrf()))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.results").exists()); // Add additional assertions as needed
    }
}