package de.neuefische.backend.controller;

import jakarta.servlet.http.HttpSession;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
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
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.*;

@SpringBootTest
@AutoConfigureMockMvc
class UserTasteBuddiesControllerTest {
    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private HttpSession httpSession;

    @DirtiesContext
    @Test
    void testRegisterUserTasteBuddies() throws Exception {
        //given
        String userName = "testUser";
        String userPassword = "testPassword";

        // when/then
        mockMvc.perform(post("/tb/user/registration").with(csrf())
                        .param("userName", userName)
                        .param("userPassword", userPassword)
                )
                .andExpect(status().isCreated())
                .andExpect(MockMvcResultMatchers.jsonPath("$.userName").value(userName));

    }
    @Test
    @DirtiesContext
    @WithMockUser(username = "testUser")
    void login_shouldReturnIsOK_andShouldReturnUsername() throws Exception {
        MvcResult result = mockMvc.perform(MockMvcRequestBuilders.post("/tb/user/login")
                        .contentType("application/json")
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

}