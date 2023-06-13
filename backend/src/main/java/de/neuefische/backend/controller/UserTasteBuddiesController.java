package de.neuefische.backend.controller;

import de.neuefische.backend.model.UserTasteBuddies;
import de.neuefische.backend.service.UserTasteBuddiesDetailsService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/tb/user")
@RequiredArgsConstructor
public class UserTasteBuddiesController {
    private final UserTasteBuddiesDetailsService service;

    @PostMapping("/registration")
    @ResponseStatus(HttpStatus.CREATED)
    public UserTasteBuddies registerUserTasteBuddies(@RequestParam String userName,@RequestParam String userPassword) {
        return service.registerUserTasteBuddies(userName, userPassword);
    }
}
