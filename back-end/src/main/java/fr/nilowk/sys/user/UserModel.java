package fr.nilowk.sys.user;

import javax.persistence.*;

@Entity
@Table(name = "users")
public class UserModel {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String email;
    private String password;
    private String pseudo;
    private boolean verify;

    public UserModel() {

    }

    public UserModel(Long id, String email, String password, String pseudo) {

        this.id = id;
        this.email = email;
        this.password = password;
        this.pseudo = pseudo;
        this.verify = false;

    }

    public UserModel(String email, String password, String pseudo) {

        this.email = email;
        this.password = password;
        this.pseudo = pseudo;
        this.verify = false;

    }

    public Long getId() {
        return id;
    }

    public String getEmail() {
        return email;
    }

    public String getPassword() {
        return password;
    }

    public String getPseudo() {
        return pseudo;
    }

    public boolean getVerify() {
        return verify;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setPseudo(String pseudo) {
        this.pseudo = pseudo;
    }

    public void setVerify(boolean verify) {
        this.verify = verify;
    }

    @Override
    public String toString() {
        return "UserModel{" +
                "id=" + id +
                ", email='" + email + '\'' +
                ", password='" + password + '\'' +
                ", pseudo='" + pseudo + '\'' +
                ", verify=" + verify +
                '}';
    }

}
