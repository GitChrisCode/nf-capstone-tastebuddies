package de.neuefische.backend.controller;

import de.neuefische.backend.model.UserTasteBuddies;
import de.neuefische.backend.service.UserTasteBuddiesDetailsService;
import jakarta.servlet.http.HttpSession;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.*;

@SpringBootTest
@AutoConfigureMockMvc
class UserTasteBuddiesControllerTest {
    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private HttpSession httpSession;

    @MockBean
    private UserTasteBuddiesDetailsService userDetailsService;


    @Test
    @WithMockUser(username = "testUser")
    public void testRegisterUserTasteBuddies() throws Exception {
        String userName = "JohnDoe";
        String userPassword = "password123";

        mockMvc.perform(post("/tb/user/registration").with(csrf())
                        .param("userName", userName)
                        .param("userPassword", userPassword)
                        .contentType(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(status().isCreated());
    }

    @Test
    @DirtiesContext
    @WithMockUser(username = "testUser")
    void login_shouldReturnIsOK_andShouldReturnUsername() throws Exception {
        MvcResult result = mockMvc.perform(post("/tb/user/login")
                        .with(csrf()))
                .andExpect(status().isOk())
                .andReturn();
        String response = result.getResponse().getContentAsString();
        assertEquals("testUser", response);
    }

    @Test
    @DirtiesContext
    @WithMockUser
    void logout_shouldInvalidateSessionAndClearContext() throws Exception {
        mockMvc.perform(get("/tb/user/logout"))
                .andExpect(status().isOk());
        assertNull(httpSession.getAttribute("SPRING_SECURITY_CONTEXT"));
        assertNull(SecurityContextHolder.getContext().getAuthentication());
    }

    @Test
    void testEditUserTasteBuddies_UpdatePasswordOnly() throws Exception {
        // Given
        String oldUserName = "existingUser";
        String newUserName = "";
        String newUserPassword = "newPassword";
        UserTasteBuddies updatedUser = new UserTasteBuddies("123", oldUserName, newUserPassword);

        // Mock the service method
        Mockito.when(userDetailsService.editUserTasteBuddies(oldUserName, newUserName, newUserPassword)).thenReturn(updatedUser);

        // When/Then
        mockMvc.perform(post("/tb/user/details").with(csrf())
                        .param("oldUserName", oldUserName)
                        .param("newUserName", newUserName)
                        .param("newUserPassword", newUserPassword)
                )
                .andExpect(status().isAccepted())
                .andExpect(jsonPath("$.userName").value(oldUserName))
                .andExpect(jsonPath("$.userPassword").value(newUserPassword));

    }

}