package de.neuefische.backend.model;
import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document("Users")
public class UserTasteBuddies {
    @Id
    private String userID;
    private String userName;
    private String userPassword;
}
