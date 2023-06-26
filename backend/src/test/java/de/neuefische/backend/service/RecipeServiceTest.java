package de.neuefische.backend.service;

import com.fasterxml.jackson.databind.ObjectMapper;

import de.neuefische.backend.model.RecipeCollection;
import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import org.springframework.test.web.reactive.server.WebTestClient;


import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;


@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@AutoConfigureMockMvc
class RecipeServiceTest {


    @Autowired
    WebTestClient webTestClient;

    @MockBean
    RecipeService mockRecipeService;

    @Test
    void when_getRecipes_CompareEquality() throws Exception {

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

        String includeIngredients = "apples";
        String excludeIngredients = "garlic";

        ObjectMapper objectMapper = new ObjectMapper();
        RecipeCollection responseObject = objectMapper.readValue(apiResponse, RecipeCollection.class);

        when(mockRecipeService.getRecipes(includeIngredients, excludeIngredients)).thenReturn(responseObject);

        RecipeCollection actual = mockRecipeService.getRecipes(includeIngredients, excludeIngredients);

        assertEquals(responseObject, actual);
    }
}