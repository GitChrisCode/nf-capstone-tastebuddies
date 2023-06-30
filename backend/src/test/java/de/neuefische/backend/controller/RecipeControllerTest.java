package de.neuefische.backend.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import de.neuefische.backend.model.RecipeCollection;
import de.neuefische.backend.model.RecipeInformation;
import de.neuefische.backend.service.RecipeService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;

import static org.mockito.ArgumentMatchers.anyInt;
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
    @DirtiesContext
    @WithMockUser
    void testGetRecipes() throws Exception {
        // Given
        RecipeCollection recipeCollection;

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


        ObjectMapper objectMapper = new ObjectMapper();
        recipeCollection = objectMapper.readValue(apiResponse, RecipeCollection.class);

        // Mock the service method
        when(mockRecipeService.getRecipes(anyString(),anyString())).thenReturn(recipeCollection);

        // Perform the GET request and verify the response
        mockMvc.perform(get("/tb/user/recipesearch")
                        .param("includeIngredients", "apples")
                        .param("excludeIngredients", "garlic")
                        .contentType(MediaType.APPLICATION_JSON)
                        .with(csrf()))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.results").exists()); // Add additional assertions as needed
    }

    @Test
    @DirtiesContext
    @WithMockUser
    void testGetRecipeDetail_ForSpecificRecipeAndGetDetailInformation() throws Exception {
        // Mock data
        RecipeInformation recipeInformation;

        String apiResponse = """                
                {
                     "vegetarian": true,
                     "vegan": false,
                     "glutenFree": true,
                     "dairyFree": false,
                     "veryHealthy": false,
                     "cheap": false,
                     "veryPopular": false,
                     "sustainable": false,
                     "lowFodmap": false,
                     "weightWatcherSmartPoints": 10,
                     "gaps": "no",
                     "preparationMinutes": -1,
                     "cookingMinutes": -1,
                     "healthScore": 0,
                     "creditsText": "Foodista.com – The Cooking Encyclopedia Everyone Can Edit",
                     "license": "CC BY 3.0",
                     "sourceName": "Foodista",
                     "pricePerServing": 59.88,                     
                     "id": 1098248,
                     "title": "Caramel apples",
                     "servings": 8,                     
                     "image": "https://spoonacular.com/recipeImages/1098248-556x370.jpg",
                     "imageType": "jpg",                     
                     "cuisines": [],
                     "dishTypes": [
                         "dessert"
                     ],
                     "diets": [
                         "gluten free",
                         "lacto ovo vegetarian"
                     ],
                     "occasions": [
                         "halloween"
                     ],                     
                     "instructions": "<ol><li>Prepare baking sheet lined with parchment paper and set aside.</li><li>In a large saucepan melt sugar until it turns dark amber color and all of the crystals have melted.</li><li>Carefully add cream (it will bubble!) and stir until smooth.</li><li>Transfer caramel to small bowl (not too small, the apples must fit in) and leave for 5 minutes.</li><li>Insert candy apple sticks (if you don't have any, you can use popsicle sticks) 1 inch deep into each apple. </li><li>Dip apples into caramel, swirling to coat.</li><li>Transfer to sheet and let the caramel harden.</li><li>Caramel apples are best eaten the same day.</li></ol>"
                 }
                """;


        ObjectMapper objectMapper = new ObjectMapper();
        recipeInformation = objectMapper.readValue(apiResponse, RecipeInformation.class);

        // Mock the service method
        when(mockRecipeService.getRecipeDetail(anyInt())).thenReturn(recipeInformation);

        // Perform the GET request and verify the response
        mockMvc.perform(get("/tb/user/recipe/1098248")
                        .contentType(MediaType.APPLICATION_JSON)
                        .with(csrf()))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.instructions").exists());
    }

    @Test
    @DirtiesContext
    @WithMockUser
    void testGetRecipeDetail_WhenRecipeDetailIsNull_ReturnNotFound() throws Exception {

        when(mockRecipeService.getRecipeDetail(anyInt())).thenReturn(null);
        mockMvc.perform(get("/tb/user/recipe/1098248")
                        .contentType(MediaType.APPLICATION_JSON)
                        .with(csrf()))
                .andExpect(status().isNotFound());
    }

    @Test
    @DirtiesContext
    @WithMockUser
    void testGetRecipeDetail_WhenExceptionOccurs_ReturnInternalServerError() throws Exception {

        when(mockRecipeService.getRecipeDetail(anyInt())).thenThrow(new RuntimeException("Something went wrong"));
        mockMvc.perform(get("/tb/user/recipe/1098248")
                        .contentType(MediaType.APPLICATION_JSON)
                        .with(csrf()))
                .andExpect(status().isInternalServerError());
    }


}