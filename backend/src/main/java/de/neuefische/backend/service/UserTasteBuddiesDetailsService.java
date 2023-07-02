package de.neuefische.backend.service;
import de.neuefische.backend.model.UserTasteBuddies;
import de.neuefische.backend.repository.MongoUserTasteBuddiesRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserTasteBuddiesDetailsService implements UserDetailsService {

    private final MongoUserTasteBuddiesRepo repo;
    private final PasswordEncoder passwordEncoder;
    private final UUIDService uuidService;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        UserTasteBuddies user = repo.findUserByUserName(username)
                .orElseThrow(() -> new UsernameNotFoundException("User with username:" + username + " not found"));
        return new User(user.getUserName(), user.getUserPassword(), List.of()) {
        };
    }

    public UserTasteBuddies registerUserTasteBuddies(String userName, String userPassword) {
        Optional<UserTasteBuddies> existingUser = repo.findUserByUserName(userName);
        if (existingUser.isPresent()) {
            throw new IllegalArgumentException("User with username '" + userName + "' already exists");
        }

        String encodedPassword = passwordEncoder.encode(userPassword);
        UserTasteBuddies newUserTasteBuddies = new UserTasteBuddies(uuidService.generateUUID(), userName, encodedPassword);
        return repo.save(newUserTasteBuddies);
    }

    public UserTasteBuddies editUserTasteBuddies(String oldUserName, String newUserName, String newUserPassword) {
        Optional<UserTasteBuddies> existingUser = repo.findUserByUserName(oldUserName);

        if (existingUser.isPresent()) {
            UserTasteBuddies userToUpdate = existingUser.get();

            if (newUserName != null && !newUserName.isEmpty()) {
                userToUpdate.setUserName(newUserName);
            }

            if (newUserPassword != null && !newUserPassword.isEmpty()) {
                String encodedPassword = passwordEncoder.encode(newUserPassword);
                userToUpdate.setUserPassword(encodedPassword);
            }

            return repo.save(userToUpdate);
        }

        throw new IllegalArgumentException("Der alte Benutzername existiert nicht");
    }


}