package fr.nilowk.sys.user;

import fr.nilowk.sys.utils.EmailSenderService;
import org.apache.catalina.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    private UserRepository userRepository;
    private EmailSenderService emailSenderService;

    @Autowired
    public UserService(UserRepository userRepository, EmailSenderService emailSenderService) {

        this.userRepository = userRepository;
        this.emailSenderService = emailSenderService;

    }

    public List<UserModel> getUsers() {

        return userRepository.findAll();

    }

    public UserModel getUserByEmail(String email) {

        return userRepository.findByEmail(email);

    }

    public void saveUser(UserModel user) {

        userRepository.save(user);

    }

    public void deleteUser(UserModel user) {

        userRepository.delete(user);

    }

    public void sendEmail(String toEmail, String subject, String body) {

        emailSenderService.sendEmail(toEmail, subject, body);

    }

}
