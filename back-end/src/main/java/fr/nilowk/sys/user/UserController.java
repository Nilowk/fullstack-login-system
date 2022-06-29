package fr.nilowk.sys.user;

import fr.nilowk.sys.utils.PasswordEncodeur;
import jdk.jshell.spi.ExecutionControlProvider;
import org.apache.catalina.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000", allowedHeaders = "*")
@RequestMapping("/api/v1/users")
public class UserController {

    private final UserService userService;
    @Value("${spring.mail.subject}")
    private String mailSubject;

    @Autowired
    public UserController(UserService userService) {

        this.userService = userService;

    }

    @GetMapping
    public List<UserModel> getUsers() {

        return userService.getUsers();

    }

    @GetMapping("/{email}")
    public UserModel getUser(@PathVariable("email") String email) {

        return userService.getUserByEmail(email);

    }

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @GetMapping("/{email}/login/{password}")
    public UserModel getUser(@PathVariable("email") String email, @PathVariable("password") String password) {

        if (userService.getUserByEmail(email) != null) {

            if (userService.getUserByEmail(email).getPassword().equalsIgnoreCase(PasswordEncodeur.encode(password))) {

                UserModel userModel = userService.getUserByEmail(email);
                userModel.setPassword(password);
                return userModel;

            }

        }

        return null;

    }

    @PostMapping("/create-user")
    public void createUser(@RequestBody UserModel user) {

        if (userService.getUserByEmail(user.getEmail()) == null) {

            user.setPassword(PasswordEncodeur.encode(user.getPassword()));

            userService.saveUser(user);
            userService.sendEmail(user.getEmail(), mailSubject, "verify at this link -> http://localhost:9000/api/v1/users/" + user.getEmail() + "/verify-user?password=" + PasswordEncodeur.decode(user.getPassword()));

        }

    }

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @GetMapping("/{email}/verify-user")
    public ModelAndView verifyUser(@PathVariable(value = "email") String email, @RequestParam(value = "password") String password) {

        UserModel user = userService.getUserByEmail(email);

        if (user != null && PasswordEncodeur.decode(user.getPassword()).equalsIgnoreCase(password) && !user.getVerify()) {

            user.setVerify(true);
            userService.saveUser(user);
            return new ModelAndView("redirect:" + "http://localhost:3000/login");

        }

        return new ModelAndView("redirect:" + "http://localhost:3000/register");

    }

    @PutMapping("/{email}")
    public void modifyUser(@PathVariable("email") String email, @RequestBody UserModel user) {

        if (userService.getUserByEmail(email) != null && user.getEmail().equalsIgnoreCase(email)) {

            user.setId(userService.getUserByEmail(email).getId());
            user.setPassword(PasswordEncodeur.encode(user.getPassword()));
            userService.saveUser(user);

        }

    }

    @DeleteMapping("/{email}/delete/{password}")
    public void deleteUser(@PathVariable("email") String email, @PathVariable("password") String password) {

        UserModel user = userService.getUserByEmail(email);

        if (user != null && PasswordEncodeur.decode(user.getPassword()).equalsIgnoreCase(password)) {

            userService.deleteUser(user);

        }

    }

}
