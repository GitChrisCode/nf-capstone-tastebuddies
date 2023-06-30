package de.neuefische.backend.service;

import de.neuefische.backend.controller.UserTasteBuddiesController;
import de.neuefische.backend.model.UserTasteBuddies;
import de.neuefische.backend.repository.MongoUserTasteBuddiesRepo;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

class UserTasteBuddiesDetailsServiceTest {
    MongoUserTasteBuddiesRepo userRepo = mock(MongoUserTasteBuddiesRepo.class);
    PasswordEncoder passwordEncoder = mock(PasswordEncoder.class);
    UUIDService uuidService = mock(UUIDService.class);
    UserTasteBuddiesDetailsService service = new UserTasteBuddiesDetailsService(userRepo, passwordEncoder, uuidService);

    @Test
    void testRegisterUserTasteBuddies_isUserRegistrationSuccessful() {

        UserTasteBuddiesDetailsService mockService = mock(UserTasteBuddiesDetailsService.class);

        UserTasteBuddies expectedUser = new UserTasteBuddies();
        expectedUser.setUserName("testUser");
        expectedUser.setUserPassword("testPassword");
        when(mockService.registerUserTasteBuddies(anyString(), anyString())).thenReturn(expectedUser);

        UserTasteBuddiesController controller = new UserTasteBuddiesController(mockService);
        UserTasteBuddies resultUser = controller.registerUserTasteBuddies("TestUser", "TestPassword");


        assertEquals(expectedUser, resultUser);
    }

    @Test
    void testLoadUserByName() {
        String username = "noUser";

        when(userRepo.findUserByUserName(username)).thenReturn(Optional.empty());

        assertThrows(UsernameNotFoundException.class, () ->
                service.loadUserByUsername(username)
        );

        Mockito.verify(userRepo).findUserByUserName(username);
    }

    @Test
    void testLoadUserByUsername_UserFound() {
        // Given
        String username = "testUser";
        String password = "testPassword";
        UserTasteBuddies user = new UserTasteBuddies("123", username, password);

        Mockito.when(userRepo.findUserByUserName(username)).thenReturn(Optional.of(user));

        // When
        UserDetails userDetails = service.loadUserByUsername(username);

        // Then
        assertNotNull(userDetails);
        assertEquals(username, userDetails.getUsername());
        assertEquals(password, userDetails.getPassword());
        assertTrue(userDetails.getAuthorities().isEmpty());

        Mockito.verify(userRepo, Mockito.times(1)).findUserByUserName(username);
    }

    @Test
    void testLoadUserByUsername_UserNotFound() {
        // Given
        String username = "nonExistingUser";

        Mockito.when(userRepo.findUserByUserName(username)).thenReturn(Optional.empty());

        // When/Then
        assertThrows(UsernameNotFoundException.class,
                () -> service.loadUserByUsername(username),
                "User with username: nonExistingUser not found");

        Mockito.verify(userRepo, Mockito.times(1)).findUserByUserName(username);
    }
    @Test
    void testRegisterUserTasteBuddies_UserAlreadyExists() {
        // Given
        String userName = "existingUser";
        String userPassword = "password";

        UserTasteBuddies existingUser = new UserTasteBuddies();
        existingUser.setUserName(userName);

        when(userRepo.findUserByUserName(userName)).thenReturn(Optional.of(existingUser));

        // When/Then
        assertThrows(IllegalArgumentException.class, () ->
                service.registerUserTasteBuddies(userName, userPassword)
        );

        Mockito.verify(userRepo).findUserByUserName(userName);
    }
}