package fr.nilowk.sys.utils;

import java.io.UnsupportedEncodingException;
import java.util.Base64;

public class PasswordEncodeur {

    public static String encode(String password) {

        try {

            String encoded = password;

            for (int i = 0; i < 4; i++) {

                Base64.Encoder encoder = Base64.getEncoder();
                encoded = encoder.encodeToString(encoded.getBytes("UTF-8"));

            }

            return encoded;

        } catch (UnsupportedEncodingException e) {

            e.printStackTrace();

        }

        return null;

    }

    public static String decode(String encoded) {

        String decoded = encoded;

        for (int i = 0; i < 4; i++) {

            Base64.Decoder decoder = Base64.getDecoder();
            decoded = new String(decoder.decode(decoded));

        }

        return decoded;

    }


}
